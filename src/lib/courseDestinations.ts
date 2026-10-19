// Course identifiers match the storefront aliases in api/_prices.ts.
// Payment amounts continue to be resolved by the checkout API.
const LMS_COURSES: Record<string, string> = {
  'autonomous-driving-adas': '9078b1a0-fc12-4808-ad21-98ed4e94b70c',
  adas: '9078b1a0-fc12-4808-ad21-98ed4e94b70c',
  ai: '64c67e86-4327-42e1-bef3-7841c70719d6',
  'ai-bootcamp': '64c67e86-4327-42e1-bef3-7841c70719d6',
  'vehicle-control': 'dd0ce657-1483-4984-9f80-fbb81e41622d',
  'perception-lab': '190adb5e-be9a-4bd5-9d34-19dd6bc23e9b',
  'motion-prediction-planning': 'ff819242-209a-4105-b598-afe6561ef1e9',
  'cicd-foundations': '699a4120-587c-48a6-bda6-570ba0b29377',
  'cicd-for-robotics': '699a4120-587c-48a6-bda6-570ba0b29377',
};

export const LMS_COURSE_CATALOG = 'https://courses.knowgraphapp.com/courses';

export function courseCouponDestination(slug: string | undefined): string {
  const courseId = slug && Object.prototype.hasOwnProperty.call(LMS_COURSES, slug) ? LMS_COURSES[slug] : undefined;
  return courseId ? `${LMS_COURSE_CATALOG}/${courseId}` : LMS_COURSE_CATALOG;
}
