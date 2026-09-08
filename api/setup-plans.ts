/**
 * Idempotent creation of the monthly subscription plans, in both currencies.
 *
 * Razorpay plans are PERMANENT: the amount on a plan can never be edited, so
 * a price change means a new plan. That is the whole reason this file exists
 * and the whole reason it is generated rather than typed. The previous version
 * hardcoded €4.99/€9.99/€29.99/€199 and matched existing plans by a name that
 * did not mention the price — so after the price book moved to €12/€18/€29/€249
 * it kept returning the OLD plan for the same tier, and the app advertised one
 * number while Razorpay charged another. Creator was the bad direction: shown
 * €29, charged €29.99.
 *
 * So the plan NAME carries the amount. A price change cannot resolve to a
 * stale plan, because the name it looks for no longer exists and gets created.
 * Amounts come from pricing.generated.ts, which is written from
 * pipeline/pricing.py — the same table the website, app and Worker render.
 *
 * HMAC-protected with the shared payment secret; plan ids are public.
 * Creating a plan is a live billing object, so this is never called
 * automatically — an operator runs it, and it only ever ADDS.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { PRICING } from './pricing.generated.js';

export const config = { api: { bodyParser: false } };

const RZP = 'https://api.razorpay.com/v1';

export type PlanSpec = {
  tier: string;
  currency: 'EUR' | 'INR';
  /** minor units: EUR cents, INR paise */
  amount: number;
  name: string;
};

/** The plan name is the contract between this file and create-payment. */
export function planName(tier: string, currency: string, amount: number): string {
  return `Knowgraph ${tier} — ${currency} ${amount}/mo`;
}

/**
 * Every tier that can be subscribed to monthly, in both currencies.
 *
 * Free tiers have nothing to charge and contactOnly tiers are quoted — an
 * Enterprise plan here would appear as a self-serve payment link, which is
 * the same mistake the annual map already guards against.
 */
export function planSpecs(): PlanSpec[] {
  const out: PlanSpec[] = [];
  for (const t of [...PRICING.learn, ...PRICING.create]) {
    if (t.contactOnly) continue;
    for (const [currency, major] of [
      ['EUR', t.eurMonth],
      ['INR', t.inrMonth],
    ] as const) {
      if (typeof major !== 'number' || major <= 0) continue;
      const amount = Math.round(major * 100);
      out.push({
        tier: t.key,
        currency,
        amount,
        name: planName(t.key, currency, amount),
      });
    }
  }
  return out;
}

function rawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.RAZORPAY_API_KEY;
  const keySecret = process.env.RAZORPAY_KEY_SECRET ?? process.env.RAZORPAY_API_SECRET;
  const kgSecret = process.env.KG_PAYMENT_SECRET?.trim();
  if (!keyId || !keySecret || !kgSecret) return res.status(503).json({ error: 'not configured' });

  const payload = await rawBody(req);
  const signature = (req.headers['x-signature'] as string) ?? '';
  const expected = createHmac('sha256', kgSecret).update(payload).digest('hex');
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
      return res.status(401).json({ error: 'bad signature' });
    }
  } catch {
    return res.status(401).json({ error: 'bad signature' });
  }

  const auth = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  const existing = await fetch(`${RZP}/plans?count=100`, {
    headers: { Authorization: auth },
  }).then((r) => r.json());
  const byName = new Map<string, string>(
    (existing.items ?? []).map(
      (p: { id: string; item?: { name?: string } }) => [p.item?.name ?? '', p.id],
    ),
  );

  const created: Record<string, string> = {};
  const reused: Record<string, string> = {};
  for (const spec of planSpecs()) {
    const key = `${spec.tier}:${spec.currency}`;
    const found = byName.get(spec.name);
    if (found) {
      reused[key] = found;
      continue;
    }
    const r = await fetch(`${RZP}/plans`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        period: 'monthly',
        interval: 1,
        item: {
          name: spec.name,
          amount: spec.amount,
          currency: spec.currency,
          description: `Knowgraph ${spec.tier} — monthly (${spec.currency})`,
        },
        notes: { tier: spec.tier, currency: spec.currency },
      }),
    });
    const made = await r.json();
    if (!r.ok || !made.id) return res.status(502).json({ error: made, spec });
    created[key] = made.id;
  }
  // Nothing to copy into env vars: create-payment resolves plans by the same
  // name this built, so provisioning is the only step.
  return res.status(200).json({ created, reused });
}
