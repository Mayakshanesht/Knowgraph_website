/**
 * Razorpay → Knowgraph payment bridge (Vercel serverless).
 *
 * Handles both recurring subscriptions (subscription.charged) and one-time
 * payment links (payment_link.paid). Verifies Razorpay's signature, then
 * forwards a Knowgraph-signed event to the Worker, which unlocks the tier or
 * course enrollment.
 *
 * Vercel env vars required:
 *   RAZORPAY_WEBHOOK_SECRET – set when creating the webhook in the dashboard
 *   KG_PAYMENT_SECRET       – PAYMENT_WEBHOOK_SECRET from the Worker
 *   KG_API_URL              – https://knowgraph-api.greenlifeai.workers.dev
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
  const rzpSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const kgSecret = process.env.KG_PAYMENT_SECRET;
  const kgApi = process.env.KG_API_URL ?? 'https://knowgraph-api.greenlifeai.workers.dev';
  if (!rzpSecret || !kgSecret) return res.status(503).json({ error: 'not configured' });

  const payload = await rawBody(req);
  const signature = (req.headers['x-razorpay-signature'] as string) ?? '';
  const expected = createHmac('sha256', rzpSecret).update(payload).digest('hex');
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
      return res.status(401).json({ error: 'bad signature' });
    }
  } catch {
    return res.status(401).json({ error: 'bad signature' });
  }

  const event = JSON.parse(payload);
  // notes {uid, tier?, courseId?} ride on the subscription or payment link.
  let notes: Record<string, string> | undefined;
  let amount = 0;
  if (event.event === 'subscription.charged') {
    notes = event.payload?.subscription?.entity?.notes;
    amount = event.payload?.payment?.entity?.amount ?? 0; // paise
  } else if (event.event === 'payment_link.paid') {
    notes = event.payload?.payment_link?.entity?.notes;
    amount = event.payload?.payment?.entity?.amount ?? 0;
  } else {
    return res.status(200).json({ ignored: event.event });
  }

  const uid = notes?.uid;
  if (!uid) return res.status(200).json({ ignored: 'no uid in notes' });

  const body = JSON.stringify(
    notes?.courseId
      ? { type: 'course', userId: uid, courseId: notes.courseId, amountCents: amount }
      : notes?.product === 'freeze'
        ? { type: 'freeze', userId: uid, quantity: 1 }
        : notes?.product === 'standard-annual'
          ? {
              type: 'subscription',
              userId: uid,
              tier: 'standard',
              amountCents: amount,
              months: 12,
            }
          : {
              type: 'subscription',
              userId: uid,
              tier: notes?.tier === 'creator' ? 'creator' : 'standard',
              amountCents: amount,
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
