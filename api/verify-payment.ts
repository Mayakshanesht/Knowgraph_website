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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
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
      if (r.ok && uid && courseId) {
        const body = JSON.stringify({
          type: 'course',
          userId: uid,
          courseId,
          amountCents: order.amount ?? 0,
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
  }

  return res.status(200).json({ verified: true, forwarded });
}
