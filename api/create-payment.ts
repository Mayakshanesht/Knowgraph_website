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
import { KNOWN_COURSES, COURSE_ALIASES, livePriceInPaise } from './_prices.js';
import { PRICING } from './pricing.generated.js';
import { planName } from './setup-plans.js';

/**
 * Monthly-subscribable tiers, keyed by every name a caller might send.
 *
 * Derived from the price book so a tier added there is purchasable without a
 * second edit here — Team and Studio shipped in the app while this file still
 * listed learner|pro|creator|standard|enterprise, so both fell through to the
 * course branch and could not be bought at all. Legacy aliases stay: links in
 * the wild and older app builds still say `learner`/`standard` for Pro.
 */
const MONTHLY_TIER: Record<string, {
  key: string; eurMinor: number; inrMinor: number;
}> = (() => {
  const map: Record<string, { key: string; eurMinor: number; inrMinor: number }> = {};
  for (const t of [...PRICING.learn, ...PRICING.create]) {
    if (t.contactOnly) continue;
    const eurMinor = Math.round((t.eurMonth ?? 0) * 100);
    const inrMinor = Math.round((t.inrMonth ?? 0) * 100);
    if (!eurMinor && !inrMinor) continue;  // Free has nothing to charge
    map[t.key] = { key: t.key, eurMinor, inrMinor };
  }
  if (map.pro) {
    map.learner = map.pro;
    map.standard = map.pro;
  }
  return map;
})();

/** Razorpay plan id for an exact plan name, or null. Plans are few. */
async function findPlan(auth: string, name: string): Promise<string | null> {
  const r = await fetch(`${RZP}/plans?count=100`, { headers: { Authorization: auth } });
  if (!r.ok) return null;
  const j = await r.json();
  for (const plan of j.items ?? []) {
    if (plan?.item?.name === name) return plan.id as string;
  }
  return null;
}

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
  // came from the mobile app? the success page bounces back via deep link
  const fromApp = String(req.query.from ?? '') === 'app' ? '&from=app' : '';
  // Annual = ten months' price (routes around RBI e-mandate renewal
  // failures on recurring cards); freeze is a one-off.
  // Amounts come from the generated table, never a literal here. This map
  // held Rs3,990 for Pro while the app showed EUR9.99 and D1 carried a third
  // number: a learner could be SHOWN one price and CHARGED another, which
  // costs trust rather than money. Legacy aliases stay so links already in
  // the wild, and older app builds, keep resolving.
  const ANNUAL: Record<string, number> = Object.fromEntries(
    [...PRICING.learn, ...PRICING.create]
      // contactOnly tiers are quoted, never checked out: Enterprise would
      // otherwise appear as a self-serve Rs12,00,000 payment link.
      .filter((x) => !x.contactOnly)
      .filter((x) => typeof x.inrYear === 'number' && (x.inrYear as number) > 0)
      .map((x) => [`${x.key}-annual`, (x.inrYear as number) * 100]),
  );
  ANNUAL['learner-annual'] = ANNUAL['pro-annual'];
  ANNUAL['standard-annual'] = ANNUAL['pro-annual'];
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
        callback_url: `https://www.knowgraphapp.com/payment-success?kind=${product === 'freeze' ? 'freeze' : 'plan'}${fromApp}`,
        callback_method: 'get',
      }),
    });
    const link = await r.json();
    if (!r.ok || !link.short_url) return res.status(502).json({ error: link });
    return res.redirect(302, link.short_url);
  }

  // International buyers subscribe monthly in EUR on dedicated plans
  // (created by /api/setup-eur-plans; ids are public identifiers).
  const intl = String(req.query.intl ?? '') === '1';
  const monthly = MONTHLY_TIER[tier];
  if (monthly) {
    // The plan is resolved by a name that CONTAINS the amount, so a plan
    // created at an older price can never satisfy a newer one. Env-var plan
    // ids did exactly that: RAZORPAY_PLAN_PRO still pointed at the EUR9.99
    // plan after the book moved to EUR12, and Creator was charging EUR29.99
    // against an advertised EUR29. Fail closed instead of charging a number
    // the learner was never shown.
    const currency = intl ? 'EUR' : 'INR';
    const amount = intl ? monthly.eurMinor : monthly.inrMinor;
    if (!amount) {
      return res.status(503).json({ error: `${tier} has no ${currency} price` });
    }
    const planId = await findPlan(auth, planName(monthly.key, currency, amount));
    if (!planId) {
      return res.status(503).json({
        error: `no ${currency} plan provisioned for ${tier} at ${amount}`,
        hint: 'run POST /api/setup-plans',
      });
    }
    const r = await fetch(`${RZP}/subscriptions`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan_id: planId,
        total_count: 12,
        customer_notify: 1,
        notes: { uid, tier: monthly.key },
      }),
    });
    const sub = await r.json();
    if (!r.ok || !sub.short_url) return res.status(502).json({ error: sub });
    return res.redirect(302, sub.short_url);
  }

  if (courseId) {
    // Same rule as create-order: the live LMS price, or no payment link at
    // all. This is the fallback path a blocked checkout script lands on, so
    // it charged from the same stale table and would have been wrong in
    // exactly the same way.
    const amount = await livePriceInPaise(courseId);
    if (amount === null) {
      const known = KNOWN_COURSES.has(COURSE_ALIASES[courseId] ?? courseId);
      return res.status(known ? 503 : 400).json({
        error: known
          ? 'Could not confirm the price right now — please try again.'
          : 'unknown course',
      });
    }
    const r = await fetch(`${RZP}/payment_links`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        description: `Knowgraph course: ${courseId}`,
        notes: { uid, courseId },
        callback_url: `https://www.knowgraphapp.com/payment-success?kind=course&id=${encodeURIComponent(courseId)}${fromApp}`,
        callback_method: 'get',
      }),
    });
    const link = await r.json();
    if (!r.ok || !link.short_url) return res.status(502).json({ error: link });
    return res.redirect(302, link.short_url);
  }

  return res.status(400).json({ error: 'tier or courseId required' });
}
