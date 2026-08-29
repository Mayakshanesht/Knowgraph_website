/**
 * Stripe → Knowgraph payment bridge (Vercel serverless).
 *
 * Stripe calls this on checkout completion; we verify Stripe's signature,
 * translate the event, and forward it — signed with our own HMAC — to the
 * Knowgraph Worker, which unlocks the tier or course enrollment.
 *
 * Vercel env vars required:
 *   STRIPE_WEBHOOK_SECRET  – from the Stripe webhook endpoint (whsec_…)
 *   KG_PAYMENT_SECRET      – PAYMENT_WEBHOOK_SECRET from the Worker
 *   KG_API_URL             – https://knowgraph-api.greenlifeai.workers.dev
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

function verifyStripe(payload: string, header: string, secret: string): boolean {
  // Stripe-Signature: t=<ts>,v1=<hmac_sha256(`${ts}.${payload}`)>
  const parts = Object.fromEntries(
    header.split(',').map((kv) => kv.split('=') as [string, string]),
  );
  if (!parts.t || !parts.v1) return false;
  const expected = createHmac('sha256', secret)
    .update(`${parts.t}.${payload}`)
    .digest('hex');
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v1));
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const kgSecret = process.env.KG_PAYMENT_SECRET;
  const kgApi = process.env.KG_API_URL ?? 'https://knowgraph-api.greenlifeai.workers.dev';
  if (!stripeSecret || !kgSecret) return res.status(503).json({ error: 'not configured' });

  const payload = await rawBody(req);
  const signature = (req.headers['stripe-signature'] as string) ?? '';
  if (!verifyStripe(payload, signature, stripeSecret)) {
    return res.status(401).json({ error: 'bad signature' });
  }

  const event = JSON.parse(payload);
  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ ignored: event.type });
  }

  const session = event.data.object;
  // client_reference_id carries the Knowgraph user id; metadata says what
  // was bought (set on the Payment Link / Checkout Session).
  const userId = session.client_reference_id;
  const meta = session.metadata ?? {};
  if (!userId) return res.status(200).json({ ignored: 'no user id' });

  const body = JSON.stringify(
    meta.courseId
      ? {
          type: 'course',
          userId,
          courseId: meta.courseId,
          amountCents: session.amount_total ?? 0,
        }
      : {
          type: 'subscription',
          userId,
          tier: meta.tier === 'creator' ? 'creator' : 'standard',
          amountCents: session.amount_total ?? 0,
          months: 1,
        },
  );
  const mac = createHmac('sha256', kgSecret).update(body).digest('hex');
  const upstream = await fetch(`${kgApi}/v1/webhooks/payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Signature': mac },
    body,
  });
  return res.status(upstream.ok ? 200 : 502).json({ forwarded: upstream.ok });
}
