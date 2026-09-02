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
import { COURSE_PRICES } from './_prices.js';

const RZP = 'https://api.razorpay.com/v1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.RAZORPAY_API_KEY;
  const keySecret = process.env.RAZORPAY_KEY_SECRET ?? process.env.RAZORPAY_API_SECRET;
  if (!keyId || !keySecret) return res.status(503).json({ error: 'not configured' });
  const auth = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const uid = String(req.query.uid ?? '');
  if (!uid) return res.status(400).json({ error: 'uid required' });

  const tier = String(req.query.tier ?? '');
  const courseId = String(req.query.courseId ?? '');

  // One-time purchases that are not courses: annual plan and streak freeze.
  const product = String(req.query.product ?? '');
  // Annual = ten months' price (routes around RBI e-mandate renewal
  // failures on recurring cards); freeze is a one-off.
  const ANNUAL: Record<string, number> = {
    'learner-annual': 199000,
    'pro-annual': 399000,
    'creator-annual': 999000,
    'standard-annual': 199000, // legacy alias -> learner
  };
  if (product === 'freeze' || ANNUAL[product] !== undefined) {
    const amount = product === 'freeze' ? 2900 : ANNUAL[product];
    const r = await fetch(`${RZP}/payment_links`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        description:
          product === 'freeze'
            ? 'Knowgraph streak freeze'
            : `Knowgraph ${product.replace('-annual', '')} - 1 year`,
        notes: { uid, product },
        callback_url: `https://www.knowgraphapp.com/payment-success?kind=${product === 'freeze' ? 'freeze' : 'plan'}`,
        callback_method: 'get',
      }),
    });
    const link = await r.json();
    if (!r.ok || !link.short_url) return res.status(502).json({ error: link });
    return res.redirect(302, link.short_url);
  }

  // Abroad, INR subscriptions fail (RBI e-mandate is India-only) — an
  // international buyer gets a one-time EUR yearly link instead.
  const intl = String(req.query.intl ?? '') === '1';
  if (intl && ['learner', 'pro', 'creator', 'standard'].includes(tier)) {
    const EUR_ANNUAL: Record<string, number> = {
      learner: 2200, standard: 2200, pro: 4400, creator: 11000, // cents
    };
    const r = await fetch(`${RZP}/payment_links`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: EUR_ANNUAL[tier],
        currency: 'EUR',
        description: `Knowgraph ${tier === 'standard' ? 'learner' : tier} — 1 year`,
        notes: { uid, product: `${tier === 'standard' ? 'learner' : tier}-annual` },
        callback_url: 'https://www.knowgraphapp.com/payment-success?kind=plan',
        callback_method: 'get',
      }),
    });
    const link = await r.json();
    if (!r.ok || !link.short_url) return res.status(502).json({ error: link });
    return res.redirect(302, link.short_url);
  }

  if (['learner', 'pro', 'creator', 'standard'].includes(tier)) {
    const plan = {
      learner: process.env.RAZORPAY_PLAN_LEARNER,
      standard: process.env.RAZORPAY_PLAN_LEARNER, // legacy alias
      pro: process.env.RAZORPAY_PLAN_PRO,
      creator: process.env.RAZORPAY_PLAN_CREATOR,
    }[tier];
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
    const amount = COURSE_PRICES[courseId];
    if (!amount) return res.status(400).json({ error: 'unknown course' });
    const r = await fetch(`${RZP}/payment_links`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        description: `Knowgraph course: ${courseId}`,
        notes: { uid, courseId },
        callback_url: `https://www.knowgraphapp.com/payment-success?kind=course&id=${encodeURIComponent(courseId)}`,
        callback_method: 'get',
      }),
    });
    const link = await r.json();
    if (!r.ok || !link.short_url) return res.status(502).json({ error: link });
    return res.redirect(302, link.short_url);
  }

  return res.status(400).json({ error: 'tier or courseId required' });
}
