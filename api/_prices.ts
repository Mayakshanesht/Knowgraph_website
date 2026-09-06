/**
 * Course prices, resolved from the LMS.
 *
 * A client-supplied amount is the #1 tampering vector (Razorpay's own
 * guidance), so the server owns the number. It used to own it as a literal
 * table — and that table drifted badly from the catalogue the owner actually
 * edits: ADAS was listed at ₹36,999 against ₹9,999 in the LMS, the AI
 * Bootcamp at ₹20,999 against ₹9,999, and CI/CD at ₹499 against ₹3,999. Two
 * of those overcharge by 2-4x and one undercharges by eight. Nobody edited
 * the table because nobody remembers it exists.
 *
 * So the price comes from the same row the storefront renders. The static
 * map below is now only an ALIAS table: the app deep-links with slugs, the
 * LMS keys by uuid, and that mismatch is why the two could drift without
 * either looking wrong.
 */

/// Slugs the app and older links use → the LMS course they mean.
export const COURSE_ALIASES: Record<string, string> = {
  'autonomous-driving-adas': '9078b1a0-fc12-4808-ad21-98ed4e94b70c',
  'adas': '9078b1a0-fc12-4808-ad21-98ed4e94b70c',
  'ai': '64c67e86-4327-42e1-bef3-7841c70719d6',
  'ai-bootcamp': '64c67e86-4327-42e1-bef3-7841c70719d6',
  'vehicle-control': 'dd0ce657-1483-4984-9f80-fbb81e41622d',
  'perception-lab': '190adb5e-be9a-4bd5-9d34-19dd6bc23e9b',
  'motion-prediction-planning': 'ff819242-209a-4105-b598-afe6561ef1e9',
  'cicd-foundations': '699a4120-587c-48a6-bda6-570ba0b29377',
  'cicd-for-robotics': '699a4120-587c-48a6-bda6-570ba0b29377',
};

/** Last known good prices, in paise. Kept only so a checkout can tell an
 *  unknown course from an unreachable database — never used to charge. */
export const KNOWN_COURSES = new Set(Object.values(COURSE_ALIASES));

/**
 * The live price in paise, or null when it cannot be confirmed.
 *
 * Returns null rather than a guess. A checkout that fails is annoying and
 * recoverable; charging the wrong amount is neither, and this file has
 * already been wrong by ₹27,000 in one direction and ₹3,500 in the other.
 */
export async function livePriceInPaise(
  courseId: string,
): Promise<number | null> {
  const id = COURSE_ALIASES[courseId] ?? courseId;
  const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const r = await fetch(
      `${url}/rest/v1/courses?id=eq.${encodeURIComponent(id)}` +
        `&select=price_india,is_published`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!r.ok) return null;
    const rows = (await r.json()) as
      | { price_india: number | string | null; is_published: boolean }[]
      | null;
    const row = rows?.[0];
    if (!row || !row.is_published) return null;
    const rupees = Number(row.price_india);
    if (!Number.isFinite(rupees) || rupees <= 0) return null;
    return Math.round(rupees * 100);
  } catch {
    return null;
  }
}
