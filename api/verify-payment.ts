/**
 * Verifies a Standard Checkout payment signature and, for course orders,
 * forwards the unlock to the Worker (same bridge as razorpay-webhook.ts —
 * the webhook remains the source of truth; this makes the unlock instant).
 *
 * POST { razorpay_order_id, razorpay_payment_id, razorpay_signature } →
 *   200 { verified: true }  only when HMAC-SHA256(order|payment, secret)
 *   matches; 400 otherwise. A mismatch is NEVER marked as paid.
 *
 * Vercel env vars required: RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET
 * Optional (instant course unlock): KG_PAYMENT_SECRET, KG_API_URL
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

const RZP = 'https://api.razorpay.com/v1';

// Courses that live on the LMS (courses.knowgraphapp.com) — a verified
// payment for one of these also provisions LMS access by payment email.
const LMS_SLUGS = new Set([
  'ai', 'ai-bootcamp', 'autonomous-driving-adas', 'autonomous-driving',
  'vehicle-control', 'motion-prediction-planning', 'motion-planning',
  'cicd-autonomous-systems',
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
  const mac = createHmac('sha256', opts.kgSecret).update(body).digest('hex');
  try {
    const r = await fetch(`${lmsApi}/api/payment-grant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Signature': mac },
      body,
    });
    return r.ok;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.RAZORPAY_API_KEY;
  const keySecret = process.env.RAZORPAY_KEY_SECRET ?? process.env.RAZORPAY_API_SECRET;
  if (!keyId || !keySecret) return res.status(503).json({ error: 'not configured' });

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    (req.body ?? {}) as Record<string, string>;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
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

  // Signature is good. If the order carries {uid, courseId} notes, unlock now.
  let forwarded = false;
  const kgSecret = process.env.KG_PAYMENT_SECRET;
  const kgApi = process.env.KG_API_URL ?? 'https://knowgraph-api.greenlifeai.workers.dev';
  if (kgSecret) {
    try {
      const auth = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const r = await fetch(`${RZP}/orders/${razorpay_order_id}`, {
        headers: { Authorization: auth },
      });
      const order = await r.json();
      const uid = order?.notes?.uid;
      const courseId = order?.notes?.courseId;
      // the payer's email is the access key for guest (website) checkouts
      let email: string | undefined;
      try {
        const pr = await fetch(`${RZP}/payments/${razorpay_payment_id}`, {
          headers: { Authorization: auth },
        });
        const payment = await pr.json();
        if (pr.ok && typeof payment.email === 'string') email = payment.email;
      } catch {
        // email stays undefined; app users are matched by uid anyway
      }
      if (r.ok && uid && courseId) {
        const body = JSON.stringify({
          type: 'course',
          userId: uid,
          courseId,
          amountCents: order.amount ?? 0,
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
      if (r.ok && courseId && email && LMS_SLUGS.has(String(courseId))) {
        await grantLmsAccess({
          kgSecret, email, courseSlug: String(courseId),
          amountCents: order.amount ?? 0, paymentId: razorpay_payment_id,
        });
      }
    } catch {
      // webhook path will still deliver the unlock
    }
  }

  return res.status(200).json({ verified: true, forwarded });
}
