/**
 * Server-owned course prices (paise). A client-supplied amount is the #1
 * tampering vector (Razorpay's own integration guidance) — every endpoint
 * that charges for a course resolves the amount from this table.
 */
export const COURSE_PRICES: Record<string, number> = {
  'computer-vision-generative-ai': 99900,
  'cv': 99900,
  'physical-ai-robotics': 79900,
  'physical-ai': 79900,
  'cicd-for-robotics': 49900,
  // LMS courses — OWNER: placeholder ₹999 each, set the real prices here.
  'vehicle-control': 99900,
  'autonomous-driving-adas': 99900,
  'ai': 99900,
  'motion-prediction-planning': 99900,
};
