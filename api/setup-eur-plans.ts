/**
 * One-time (idempotent) creation of the EUR monthly subscription plans.
 *
 * Razorpay plans are permanent objects that must exist before a
 * subscription can reference them. This endpoint creates the three EUR
 * plans if absent — matched by item name, so calling it twice never
 * duplicates — and returns their ids. HMAC-protected with the shared
 * payment secret; plan ids themselves are public identifiers.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const config = { api: { bodyParser: false } };

const RZP = 'https://api.razorpay.com/v1';

const EUR_PLANS = [
  { tier: 'learner', name: 'Knowgraph Learner (EUR)', amount: 499 },
  { tier: 'pro', name: 'Knowgraph Pro (EUR)', amount: 999 },
  { tier: 'creator', name: 'Knowgraph Creator (EUR)', amount: 2999 },
  // Enterprise: seats for a department or a cohort, generation pooled
  // across the team, private courses and certificates under their brand.
  { tier: 'enterprise', name: 'Knowgraph Enterprise (EUR)', amount: 19900 },
];

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

  const out: Record<string, string> = {};
  for (const plan of EUR_PLANS) {
    const found = byName.get(plan.name);
    if (found) {
      out[plan.tier] = found;
      continue;
    }
    const r = await fetch(`${RZP}/plans`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        period: 'monthly',
        interval: 1,
        item: {
          name: plan.name,
          amount: plan.amount, // EUR cents
          currency: 'EUR',
          description: `Knowgraph ${plan.tier} — monthly (international)`,
        },
      }),
    });
    const created = await r.json();
    if (!r.ok || !created.id) return res.status(502).json({ error: created, tier: plan.tier });
    out[plan.tier] = created.id;
  }
  return res.status(200).json({ plans: out });
}
