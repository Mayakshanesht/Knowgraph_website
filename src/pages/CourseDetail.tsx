import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { openCourseCheckout } from "@/lib/razorpay";

const LMS_URL = "https://courses.knowgraphapp.com/";

// Kept in sync with api/_prices.ts (the server is authoritative at charge time).
const LMS_COURSE_PRICES: Record<string, number> = {
  "vehicle-control": 1599900,
  "autonomous-driving-adas": 3699900,
  "ai": 2099900,
  "motion-prediction-planning": 2099900,
};

type CourseDetailContent = {
  slug: string;
  title: string;
  subtitle: string;
  overview: string[];
  learnAndBuildTitle: string;
  learnAndBuildItems: string[];
  note?: string;
};

const courseDetails: CourseDetailContent[] = [
  {
    slug: "vehicle-control",
    title: "Modern Vehicle Control Course — PID → LQR → MPC",
    subtitle: "Advanced vehicle dynamics and control for ADAS & autonomous driving",
    overview: [
      "This course is built around vehicle-dynamics–driven control design, which sits at the core of real ADAS features.",
    ],
    learnAndBuildTitle: "What you’ll learn & build",
    learnAndBuildItems: [
      "Longitudinal vehicle dynamics, forces, and stability",
      "PID control design, tuning",
      "Project I: Adaptive Cruise Control (ACC)",
      "Lateral dynamics, bicycle model, yaw control, state estimation",
      "Project II: Electronic Stability Control (ESC)",
      "Project III: LQR",
      "Optimal control and constrained MPC",
      "Project IV: MPC-based trajectory tracking",
    ],
    note: "The course connects PID → LQR → MPC as a unified control framework, not disconnected techniques.",
  },
  {
    slug: "autonomous-driving-adas",
    title: "Autonomous Driving & ADAS Course",
    subtitle: "End-to-end ADAS and autonomous driving engineering",
    overview: [
      "This course focuses on how ADAS systems are actually built, from perception and ML to control and functional safety.",
    ],
    learnAndBuildTitle: "What you’ll learn & build",
    learnAndBuildItems: [
      "ADAS vs autonomy, SAE levels, and system architectures",
      "Traditional ML, Deep Learning, and Reinforcement Learning",
      "Perception systems, sensor fusion, and localization",
      "Motion prediction, planning, and control",
      "Functional safety concepts (ISO 26262) and V-model development",
      "5 Projects & Capstone project",
      "Project 1: ML-based Automatic Emergency Braking (AEB)",
      "Project 2: CNN-based traffic sign classification",
      "Project 3: 4D Perception",
      "Project 4: RL-based vehicle control in simulation",
      "Project 5: Rule-based planning and control pipelines",
      "Capstone: Full ADAS feature development using Model-Based Design / V-Model (Requirements → Architecture → Control → MIL/SIL validation in Simulink)",
    ],
    note: "These are deep, structured courses, designed for engineers who want to move beyond theory and build feature-level ADAS and control systems using industry-style workflows.",
  },
  {
    slug: "ai",
    title: "AI Course — ML → LLMs → Generative AI",
    subtitle: "Foundations → system-level thinking → deployable autonomy projects",
    overview: [
      "This bootcamp is designed for engineers who want to build real AI systems for autonomous driving, rather than studying isolated algorithms.",
    ],
    learnAndBuildTitle: "What it covers",
    learnAndBuildItems: [
      "Machine Learning foundations",
      "Deep Learning and Reinforcement Learning",
      "Computer Vision and 3D perception",
      "Vision–Language and Generative AI",
      "Multiple hands-on, recruiter-ready projects aligned with industry roles",
    ],
  },
  {
    slug: "motion-prediction-planning",
    title: "Motion Prediction & Planning",
    subtitle: "Planning, prediction, and decision-making projects for autonomous driving",
    overview: [
      "This course focuses on building practical planning and prediction systems through a structured sequence of projects.",
    ],
    learnAndBuildTitle: "What you’ll learn & build",
    learnAndBuildItems: [
      "Traditional motion planning project",
      "Global planning",
      "Behavior planning with FSM",
      "Local planning with a lattice planner",
      "End-to-end motion planning with an RL PPO agent",
      "Closed-loop ML-based planners",
      "Motion prediction",
      "MPDM",
    ],
  },
];

export default function CourseDetail() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const course = courseDetails.find((c) => c.slug === courseSlug);
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const price = courseSlug ? LMS_COURSE_PRICES[courseSlug] : undefined;

  const buyCourse = async () => {
    if (!courseSlug) return;
    setPaying(true);
    setPayError("");
    const uid =
      new URLSearchParams(window.location.search).get("uid") ?? "web-guest";
    try {
      const result = await openCourseCheckout({
        courseId: courseSlug,
        uid,
        title: course?.title,
      });
      if (result.status === "paid") {
        navigate(
          `/payment-success?kind=course&id=${encodeURIComponent(courseSlug)}`,
        );
      } else if (result.status === "failed") {
        setPayError(result.error ?? "Payment failed — you have not been charged.");
      }
    } catch {
      setPayError("Checkout could not open — please try again.");
    } finally {
      setPaying(false);
    }
  };

  if (!course) {
    return (
      <Layout>
        <Section className="py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
              Course not found
            </h1>
            <p className="text-muted-foreground mb-8">
              This course page doesn’t exist.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/courses">
                <ArrowLeft className="w-5 h-5" />
                Back to Courses
              </Link>
            </Button>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative pt-28 md:pt-36 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Button asChild variant="hero-white" size="default">
                <Link to="/courses">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Courses
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 animate-float-up">
                {course.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 animate-float-up delay-200">
                {course.subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            <div className="p-8 rounded-2xl bg-card border border-border shadow-soft">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {course.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {course.note && (
                  <p className="text-foreground font-medium">{course.note}</p>
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {price && (
                  <Button
                    size="lg"
                    onClick={buyCourse}
                    disabled={paying}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-2 border-primary/30"
                  >
                    {paying
                      ? "Opening secure checkout…"
                      : `Buy course — ₹${(price / 100).toLocaleString("en-IN")}`}
                  </Button>
                )}
                <Button asChild variant={price ? "outline" : "default"} size="lg">
                  <a href={LMS_URL} target="_blank" rel="noopener noreferrer">
                    Go to LMS
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </Button>

              </div>
              {payError && (
                <p className="text-sm text-destructive mt-3">{payError}</p>
              )}
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border shadow-soft">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-6">
                {course.learnAndBuildTitle}
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                {course.learnAndBuildItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
