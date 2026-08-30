/**
 * Creates a per-user Razorpay checkout and redirects to it.
 *
 * The app opens /pricing?uid=…; the pricing page's buttons hit
 *   /api/create-payment?uid=<uid>&tier=standard|creator          (subscription)
 *   /api/create-payment?uid=<uid>&courseId=<id>&amount=<paise>   (course)
 * A per-user Subscription or Payment Link is created with the uid in notes,
 * so the webhook can attribute the payment. Responds with a 302 to Razorpay.
 *
 * Vercel env vars required:
 *   RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET
 *   RAZORPAY_PLAN_STANDARD / RAZORPAY_PLAN_CREATOR  (plan_… ids)
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

const RZP = 'https://api.razorpay.com/v1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return res.status(503).json({ error: 'not configured' });
  const auth = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const uid = String(req.query.uid ?? '');
  if (!uid) return res.status(400).json({ error: 'uid required' });

  const tier = String(req.query.tier ?? '');
  const courseId = String(req.query.courseId ?? '');

  // One-time purchases that are not courses: annual plan and streak freeze.
  const product = String(req.query.product ?? '');
  if (product === 'standard-annual' || product === 'freeze') {
    const amount = product === 'freeze' ? 2900 : 69900;
    const r = await fetch(`${RZP}/payment_links`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        description:
          product === 'freeze'
            ? 'Knowgraph streak freeze'
            : 'Knowgraph Standard - 1 year',
        notes: { uid, product },
      }),
    });
    const link = await r.json();
    if (!r.ok || !link.short_url) return res.status(502).json({ error: link });
    return res.redirect(302, link.short_url);
  }

  if (tier === 'standard' || tier === 'creator') {
    const plan =
      tier === 'creator'
        ? process.env.RAZORPAY_PLAN_CREATOR
        : process.env.RAZORPAY_PLAN_STANDARD;
    if (!plan) return res.status(503).json({ error: `no plan configured for ${tier}` });
    const r = await fetch(`${RZP}/subscriptions`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan_id: plan,
        total_count: 12,
        customer_notify: 1,
        notes: { uid, tier },
      }),
    });
    const sub = await r.json();
    if (!r.ok || !sub.short_url) return res.status(502).json({ error: sub });
    return res.redirect(302, sub.short_url);
  }

  if (courseId) {
    const amount = Number(req.query.amount ?? 0);
    if (!amount) return res.status(400).json({ error: 'amount (paise) required' });
    const r = await fetch(`${RZP}/payment_links`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        description: `Knowgraph course: ${courseId}`,
        notes: { uid, courseId },
      }),
    });
    const link = await r.json();
    if (!r.ok || !link.short_url) return res.status(502).json({ error: link });
    return res.redirect(302, link.short_url);
  }

  return res.status(400).json({ error: 'tier or courseId required' });
}
