/**
 * Cancels a Razorpay subscription at the end of the paid period.
 *
 * Called ONLY by the Worker (which authenticated the user and owns the
 * uid → subscription mapping); the body is HMAC-signed with the shared
 * payment secret. cancel_at_cycle_end keeps access until what was paid
 * for runs out — stopping is never punitive.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const config = { api: { bodyParser: false } };

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
  if (!keyId || !keySecret || !kgSecret) {
    return res.status(503).json({ error: 'not configured' });
  }

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

  const { subscriptionId } = JSON.parse(payload) as { subscriptionId?: string };
  if (!subscriptionId) return res.status(400).json({ error: 'subscriptionId required' });

  const auth = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  const r = await fetch(
    `https://api.razorpay.com/v1/subscriptions/${encodeURIComponent(subscriptionId)}/cancel`,
    {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ cancel_at_cycle_end: 1 }),
    },
  );
  const out = await r.json();
  if (!r.ok) return res.status(502).json({ error: out });
  return res.status(200).json({ ok: true, status: out.status });
}
