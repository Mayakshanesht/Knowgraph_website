/**
 * Verifies a Standard Checkout payment signature and, for course orders,
 * forwards the unlock to the Worker (same bridge as razorpay-webhook.ts —
 * the webhook remains the source of truth; this makes the unlock instant).
 *
 * POST { razorpay_order_id, razorpay_payment_id, razorpay_signature } →
 *   200 { verified: true } only after a valid HMAC and a captured, unrefunded
 *   gateway payment matching the order, amount and currency. An authorization
 *   alone never grants access; a failed unlock can still arrive by webhook.
 *
 * Vercel env vars required: RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET
 * Optional (instant course unlock): KG_PAYMENT_SECRET, KG_API_URL
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

const RZP = 'https://api.razorpay.com/v1';

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

// Courses that live on the LMS (courses.knowgraphapp.com) — a verified
// payment for one of these also provisions LMS access by payment email.
const LMS_SLUGS = new Set([
  'ai', 'ai-bootcamp', 'autonomous-driving-adas', 'autonomous-driving',
  'vehicle-control', 'motion-prediction-planning', 'motion-planning',
  'cicd-autonomous-systems', 'cicd-for-robotics',
  'cv', 'computer-vision-generative-ai', 'physical-ai', 'physical-ai-robotics',
]);

export async function grantLmsAccess(opts: {
  kgSecret: string; email: string; courseSlug: string;
  amountCents: number; paymentId: string;
}): Promise<boolean> {
  const lmsApi = process.env.LMS_API_URL ?? 'https://courses.knowgraphapp.com';
  const body = JSON.stringify({
    email: opts.email, courseSlug: opts.courseSlug,
    amountCents: opts.amountCents, paymentId: opts.paymentId,
  });
  // The LMS may hold either shared secret in its KG_PAYMENT_SECRET slot —
  // sign with each we know until one lands; both are ours and equally strong.
  const secrets = [
    opts.kgSecret,
    process.env.RAZORPAY_WEBHOOK_SECRET?.trim(),
  ].filter((x): x is string => !!x);
  for (const secret of secrets) {
    const mac = createHmac('sha256', secret).update(body).digest('hex');
    try {
      const r = await fetch(`${lmsApi}/api/payment-grant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Signature': mac },
        body,
      });
      if (r.ok) return true;
      if (r.status !== 401) return false;
    } catch {
      return false;
    }
  }
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.RAZORPAY_API_KEY;
  const keySecret = process.env.RAZORPAY_KEY_SECRET ?? process.env.RAZORPAY_API_SECRET;
  if (!keyId || !keySecret) return res.status(503).json({ error: 'not configured' });

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    (req.body ?? {}) as Record<string, unknown>;
  if (typeof razorpay_order_id !== 'string' || !razorpay_order_id ||
      typeof razorpay_payment_id !== 'string' || !razorpay_payment_id ||
      typeof razorpay_signature !== 'string' || !razorpay_signature) {
    return res.status(400).json({ error: 'missing fields' });
  }

  const expected = createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');
  let ok = false;
  try {
    ok = timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
  } catch {
    ok = false;
  }
  if (!ok) return res.status(400).json({ verified: false, error: 'signature mismatch' });

  // A valid checkout signature proves the callback, not that money was captured.
  // Always confirm the actual payment, even when instant unlocking is disabled.
  let order: Record<string, unknown>;
  let payment: Record<string, unknown>;
  try {
    const auth = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const [orderResponse, paymentResponse] = await Promise.all([
      fetch(`${RZP}/orders/${encodeURIComponent(razorpay_order_id)}`, {
        headers: { Authorization: auth },
      }),
      fetch(`${RZP}/payments/${encodeURIComponent(razorpay_payment_id)}`, {
        headers: { Authorization: auth },
      }),
    ]);
    if (!orderResponse.ok || !paymentResponse.ok) throw new Error('gateway lookup failed');
    const [orderValue, paymentValue] = await Promise.all([
      orderResponse.json(), paymentResponse.json(),
    ]);
    const fetchedOrder = asRecord(orderValue);
    const fetchedPayment = asRecord(paymentValue);
    if (!fetchedOrder || !fetchedPayment) throw new Error('invalid gateway response');
    order = fetchedOrder;
    payment = fetchedPayment;
  } catch {
    return res.status(502).json({
      verified: false,
      error: 'Unable to confirm payment with Razorpay. Please retry verification.',
    });
  }

  if (order.id !== razorpay_order_id || payment.id !== razorpay_payment_id ||
      payment.order_id !== razorpay_order_id) {
    return res.status(400).json({
      verified: false, error: 'Gateway payment does not match the submitted order.',
    });
  }
  if (payment.status !== 'captured' || payment.captured !== true) {
    return res.status(409).json({
      verified: false, error: 'Payment has not been captured yet. Please retry verification shortly.',
    });
  }
  if (typeof payment.amount !== 'number' || !Number.isSafeInteger(payment.amount) ||
      payment.amount <= 0 || typeof order.amount !== 'number' ||
      !Number.isSafeInteger(order.amount) || payment.amount !== order.amount ||
      typeof payment.currency !== 'string' || !/^[A-Z]{3}$/.test(payment.currency) ||
      payment.currency !== order.currency) {
    return res.status(400).json({
      verified: false, error: 'Payment amount or currency does not match its order.',
    });
  }
  if (payment.amount_refunded !== 0 || payment.refund_status != null) {
    return res.status(400).json({
      verified: false, error: 'Refunded payments cannot grant course access.',
    });
  }

  // Only a confirmed capture may cross the signed Worker/LMS unlock bridges.
  let forwarded = false;
  const kgSecret = process.env.KG_PAYMENT_SECRET;
  const kgApi = process.env.KG_API_URL ?? 'https://knowgraph-api.greenlifeai.workers.dev';
  const notes = asRecord(order.notes);
  const uid = typeof notes?.uid === 'string' ? notes.uid : undefined;
  const courseId = typeof notes?.courseId === 'string' ? notes.courseId : undefined;
  // The gateway payer email is the access key for guest website checkouts.
  const email = typeof payment.email === 'string' ? payment.email.trim() : undefined;
  if (kgSecret) {
    try {
      if (uid && courseId) {
        const body = JSON.stringify({
          type: 'course',
          userId: uid,
          courseId,
          amountCents: payment.amount,
          ...(email ? { email } : {}),
        });
        const mac = createHmac('sha256', kgSecret).update(body).digest('hex');
        const upstream = await fetch(`${kgApi}/v1/webhooks/payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Signature': mac },
          body,
        });
        forwarded = upstream.ok;
      }
    } catch {
      // webhook path will still deliver the unlock
    }
    if (courseId && email && LMS_SLUGS.has(courseId)) {
      await grantLmsAccess({
        kgSecret, email, courseSlug: courseId,
        amountCents: payment.amount, paymentId: razorpay_payment_id,
      });
    }
  }

  return res.status(200).json({ verified: true, forwarded });
}
