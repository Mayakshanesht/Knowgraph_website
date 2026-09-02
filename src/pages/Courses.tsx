import { useState } from "react";
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

const courses = [
  {
    slug: "ai",
    title: "AI Course — ML → LLMs → Generative AI",
    description: "Foundations → system-level thinking → deployable autonomy projects.",
    color: "border-t-primary",
    bgColor: "bg-primary/5",
  },
  {
    slug: "autonomous-driving-adas",
    title: "Autonomous Driving & ADAS Course",
    description: "End-to-end ADAS and autonomous driving engineering.",
    color: "border-t-violet",
    bgColor: "bg-violet/5",
  },
  {
    slug: "vehicle-control",
    title: "Modern Vehicle Control — PID → LQR → MPC",
    description: "Advanced vehicle dynamics and control for ADAS & autonomous driving.",
    color: "border-t-teal",
    bgColor: "bg-teal/5",
  },
  {
    slug: "motion-prediction-planning",
    title: "Motion Prediction & Planning",
    description: "Planning, prediction, and decision-making projects for autonomous driving.",
    color: "border-t-accent",
    bgColor: "bg-accent/5",
  },
];

const domains = [
  "AI",
  "Autonomous Driving",
  "Perception & Computer Vision",
  "Control Systems",
  "Robotics",
];

const COURSE_PRICES: Record<string, number> = {
  "computer-vision-generative-ai": 99900,
  "physical-ai-robotics": 79900,
};

export default function Courses() {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid") ?? "";
  const courseId = params.get("course") ?? "";
  const amount = COURSE_PRICES[courseId];
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  const enroll = async () => {
    setPaying(true);
    setPayError("");
    try {
      const result = await openCourseCheckout({ courseId, uid });
      if (result.status === "paid") {
        navigate(`/payment-success?kind=course&id=${encodeURIComponent(courseId)}`);
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
          description="Structured learning delivered through KnowGraph Capsules"
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
              <div className="flex gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={`/courses/${course.slug}`}>
                    View Course
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="default" className="flex-1">
                  <Link to="/try">
                    Join Beta to Access
                  </Link>
                </Button>
              </div>
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
