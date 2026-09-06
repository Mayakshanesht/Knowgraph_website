import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Layers, Network, ArrowRight } from "lucide-react";
import { openCourseCheckout } from "@/lib/razorpay";

const LMS_URL = "https://courses.knowgraphapp.com/";

const APP_URL =
  "https://knowgraph-api.greenlifeai.workers.dev/v1/media/app/knowgraph-latest.apk";

// Reel courses that live in the Knowgraph app: enroll happens in-app, with
// chapter 1 free as a preview in the feed.
const appCourses = [
  {
    title: "Computer Vision & Generative AI",
    description:
      "91 micro-reels across 8 chapters — camera models to diffusion. Chapter 1 free in the app. \u20B9999",
    color: "border-t-primary",
    bgColor: "bg-primary/5",
  },
  {
    title: "Physical AI & Robotics",
    description:
      "From sensing to locomotion and manipulation, with AI-generated concept demos. Chapter 1 free in the app. \u20B9799",
    color: "border-t-teal",
    bgColor: "bg-teal/5",
  },
  {
    title: "CI/CD Foundations",
    description:
      "The delivery pipeline one concept at a time — 40 reels, the written course and the hands-on project — one course.",
    color: "border-t-violet",
    bgColor: "bg-violet/5",
  },
];

// The LMS is where these are taught, enrolled in and paid for. This page
// used to offer "View Course" and "Buy Course", which forked the buyer into
// a second checkout on a second site with its own prices — the fork that let
// ADAS advertise ₹9,999 here and charge ₹36,999 there. One destination now.
const LMS = "https://courses.knowgraphapp.com/courses";

const courses = [
  {
    lmsId: "64c67e86-4327-42e1-bef3-7841c70719d6",
    title: "AI Bootcamp — ML → LLMs → Generative AI",
    description: "Foundations → system-level thinking → deployable autonomy projects.",
    color: "border-t-primary",
    bgColor: "bg-primary/5",
  },
  {
    lmsId: "9078b1a0-fc12-4808-ad21-98ed4e94b70c",
    title: "Autonomous Driving & ADAS",
    description: "End-to-end ADAS and autonomous driving engineering.",
    color: "border-t-violet",
    bgColor: "bg-violet/5",
  },
  {
    lmsId: "dd0ce657-1483-4984-9f80-fbb81e41622d",
    title: "Modern Vehicle Control — PID → LQR → MPC",
    description: "Advanced vehicle dynamics and control for ADAS & autonomous driving.",
    color: "border-t-teal",
    bgColor: "bg-teal/5",
  },
  {
    lmsId: "ff819242-209a-4105-b598-afe6561ef1e9",
    title: "Motion Prediction & Planning",
    description: "Planning, prediction, and decision-making projects for autonomous driving.",
    color: "border-t-accent",
    bgColor: "bg-accent/5",
  },
  {
    lmsId: "190adb5e-be9a-4bd5-9d34-19dd6bc23e9b",
    title: "Perception Lab for Computer Vision",
    description: "Perception playground — camera to 3D to generative vision.",
    color: "border-t-cyan",
    bgColor: "bg-cyan/5",
  },
  {
    lmsId: "699a4120-587c-48a6-bda6-570ba0b29377",
    title: "CI/CD Foundations — Git to Kubernetes",
    description: "The delivery pipeline end to end: Git, Jenkins, Docker, Kubernetes.",
    color: "border-t-primary",
    bgColor: "bg-primary/5",
  },
];

const domains = [
  "AI",
  "Autonomous Driving",
  "Perception & Computer Vision",
  "Control Systems",
  "Robotics",
];

// Display only. The charge amount is resolved server-side from the LMS row
// (api/_prices.ts livePriceInPaise) — this table exists so the page can show
// a number before the modal opens, and drifting from it is how CI/CD came to
// advertise ₹499 for a ₹3,999 course.
const COURSE_PRICES: Record<string, number> = {
  "computer-vision-generative-ai": 99900,
  "physical-ai-robotics": 79900,
  "cicd-foundations": 399900,
  "autonomous-driving-adas": 999900,
  "ai": 999900,
  "vehicle-control": 499900,
  "motion-prediction-planning": 499900,
  "perception-lab": 99900,
};

export default function Courses() {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid") ?? "";
  const courseId = params.get("course") ?? "";
  const amount = COURSE_PRICES[courseId];
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  // The app deep-links here with autopay=1: open the Razorpay modal
  // immediately so in-app enrollment is one tap.
  const autoFired = useRef(false);
  useEffect(() => {
    if (
      params.get("autopay") === "1" &&
      uid &&
      courseId &&
      amount &&
      !autoFired.current
    ) {
      autoFired.current = true;
      void enroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enroll = async () => {
    setPaying(true);
    setPayError("");
    try {
      const result = await openCourseCheckout({ courseId, uid });
      if (result.status === "paid") {
        const from = params.get("from") ?? "";
        navigate(
          `/payment-success?kind=course&id=${encodeURIComponent(courseId)}${from ? `&from=${encodeURIComponent(from)}` : ""}`,
        );
      } else if (result.status === "failed") {
        setPayError(result.error ?? "Payment failed — you have not been charged.");
      }
    } catch {
      // modal unavailable (blocked script, old browser): hosted checkout
      window.location.href = `/api/create-payment?uid=${encodeURIComponent(uid)}&courseId=${encodeURIComponent(courseId)}`;
    } finally {
      setPaying(false);
    }
  };
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-float-up">
              Courses
            </h1>
            <p className="text-lg md:text-xl text-white/80 animate-float-up delay-200">
              Structured, recorded learning — powered by the KnowGraph platform.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {uid && courseId && (
        <Section className="py-10">
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-primary/10 border border-primary/40 text-center">
            <h3 className="font-heading font-semibold text-lg mb-2">
              Complete your enrollment
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {amount
                ? `Unlock the full course — ₹${(amount / 100).toLocaleString("en-IN")}, one-time. After payment, head back to the app: everything unlocks automatically.`
                : "This course is free — open it in the app and start learning."}
            </p>
            {amount ? (
              <>
                <Button size="lg" onClick={enroll} disabled={paying}>
                  {paying ? "Opening secure checkout…" : "Enroll now"}
                </Button>
                {payError && (
                  <p className="text-sm text-destructive mt-3">{payError}</p>
                )}
              </>
            ) : (
              <Button asChild size="lg"><a href="/app/">Open the app</a></Button>
            )}
          </div>
        </Section>
      )}

      {/* LMS CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Start Your Learning Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Access our comprehensive courses on the new KnowGraph Learning Management System
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-2 border-primary/30"
            >
              <a 
                href={LMS_URL} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Enroll & Start Learning on the KnowGraph LMS
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* How Courses Work */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium text-foreground mb-1">Courses are made of Capsules</p>
              <p className="text-sm text-muted-foreground">Short, focused concepts</p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center">
              <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mx-auto mb-4">
                <Network className="w-6 h-6 text-violet" />
              </div>
              <p className="font-medium text-foreground mb-1">Capsules form learning paths</p>
              <p className="text-sm text-muted-foreground">Structured progression</p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-teal" />
              </div>
              <p className="font-medium text-foreground mb-1">Reusable knowledge graphs</p>
              <p className="text-sm text-muted-foreground">Connected understanding</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Domains */}
      <Section className="py-12 bg-gradient-to-r from-primary/5 via-violet/5 to-teal/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">Current course domains</p>
          <div className="flex flex-wrap justify-center gap-3">
            {domains.map((domain) => (
              <span 
                key={domain}
                className="px-4 py-1.5 text-sm text-foreground bg-card rounded-full border border-border"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* In-app reel courses */}
      <Section className="py-20">
        <SectionHeader
          title="Reel Courses — in the Knowgraph App"
          description="Cinema-grade micro-reels with AI concept demos, quizzes and streaks. Download the app to preview chapter 1 of every course free."
        />
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          {appCourses.map((course) => (
            <div
              key={course.title}
              className={`p-6 rounded-2xl bg-card border border-border border-t-4 ${course.color} ${course.bgColor} shadow-soft flex flex-col`}
            >
              <h3 className="font-heading font-semibold text-foreground mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {course.description}
              </p>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href={APP_URL}>
                    Get the app <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href="/app/">Use in browser</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Course Cards */}
      <Section className="py-20">
        <SectionHeader
          title="Available Courses"
          description="Taught, enrolled and paid for in the KnowGraph LMS"
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.title}
              className={`p-6 rounded-2xl bg-card border border-border border-t-4 ${course.color} shadow-card card-hover`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${course.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-2">
                    Powered by KnowGraph Capsules
                  </span>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {course.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {course.description}
              </p>
              <Button asChild variant="default" className="w-full">
                <a
                  href={`${LMS}/${course.lmsId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to course
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-20 hero-gradient">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-4">
            Want to create your own course?
          </h2>
          <p className="text-white/80 mb-8">
            Use KnowGraph to structure and deliver your educational content.
          </p>
          <Button asChild variant="hero-white" size="lg">
            <Link to="/try">
              Notify Me When Creator Access Opens
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
