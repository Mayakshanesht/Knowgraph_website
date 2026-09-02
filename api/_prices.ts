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
  // LMS courses — real prices from the LMS catalogue (know-path-weaver
  // src/data/courses.ts), in paise.
  'vehicle-control': 1599900,
  'autonomous-driving-adas': 3699900,
  'ai': 2099900,
  'motion-prediction-planning': 2099900,
};
