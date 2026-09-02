/**
 * Diagnostic: which payment-related env vars exist in this deployment.
 * Reports NAMES ONLY — never values. Safe to leave deployed.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const names = Object.keys(process.env)
    .filter((k) => k.includes('RAZORPAY') || k.startsWith('KG_'))
    .sort();
  return res.status(200).json({
    present: names,
    env: process.env.VERCEL_ENV ?? 'unknown',
  });
}
