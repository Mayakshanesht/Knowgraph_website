/**
 * Creates a Razorpay Order for Standard Web Checkout (the on-site modal).
 *
 * POST { courseId?, amount?, currency?, receipt?, notes? } →
 *   { order_id, amount, currency, key_id }
 *
 * When courseId is present the amount comes from the server-side price
 * table — a client amount is ignored. key_id is returned so the frontend
 * needs no env plumbing (it is the public half of the key pair).
 *
 * Vercel env vars required: RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { COURSE_PRICES } from './_prices.js';

const RZP = 'https://api.razorpay.com/v1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET ?? process.env.RAZORPAY_API_SECRET;
  if (!keyId || !keySecret) return res.status(503).json({ error: 'not configured' });
  const auth = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const body = (req.body ?? {}) as Record<string, unknown>;
  const notes = (body.notes && typeof body.notes === 'object'
    ? body.notes
    : {}) as Record<string, string>;
  const courseId = String(body.courseId ?? notes.courseId ?? '');

  let amount = Number(body.amount);
  if (courseId) {
    const priced = COURSE_PRICES[courseId];
    if (!priced) return res.status(400).json({ error: 'unknown course' });
    amount = priced;
    notes.courseId = courseId;
  }
  if (!Number.isInteger(amount) || amount < 100) {
    return res.status(400).json({ error: 'amount must be an integer >= 100 paise' });
  }

  const currency = typeof body.currency === 'string' ? body.currency : 'INR';
  const receipt =
    typeof body.receipt === 'string' && body.receipt
      ? body.receipt.slice(0, 40)
      : `kg_${Date.now()}`;

  const r = await fetch(`${RZP}/orders`, {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency, receipt, notes }),
  });
  const order = await r.json();
  if (r.status === 401) return res.status(401).json({ error: 'razorpay auth failed' });
  if (!r.ok || !order.id) return res.status(500).json({ error: order });

  return res.status(200).json({
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    key_id: keyId,
  });
}
