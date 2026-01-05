import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Layers, Network, ArrowRight } from "lucide-react";

const courses = [
  {
    title: "AI Course — ML → LLMs → Generative AI",
    description: "Comprehensive journey from machine learning fundamentals through deep learning to large language models and generative AI.",
    link: "https://sites.google.com/cloudbeerobotics-ai.com/home/courses/ai-bootcamp",
    color: "border-t-primary",
    bgColor: "bg-primary/5",
  },
  {
    title: "Autonomous Driving Systems",
    description: "Complete coverage of autonomous driving technology including perception, sensor fusion, prediction, planning, and control.",
    link: "https://sites.google.com/cloudbeerobotics-ai.com/home/courses/advanced-driver-assistance-systems-development-bootcamp",
    color: "border-t-violet",
    bgColor: "bg-violet/5",
  },
  {
    title: "Modern Vehicle Control — PID → LQR → MPC",
    description: "From classical PID control through optimal control theory to model predictive control for autonomous vehicles.",
    link: "https://sites.google.com/cloudbeerobotics-ai.com/home/courses/advanced-controls-bootcamp-for-autonomous-driving",
    color: "border-t-teal",
    bgColor: "bg-teal/5",
  },
  {
    title: "Motion Prediction & Planning",
    description: "Understanding and implementing motion prediction and trajectory planning systems for autonomous vehicles.",
    link: "https://sites.google.com/cloudbeerobotics-ai.com/home/courses/motion-prediction-planning-for-autonomous-driving-bootcamp",
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

export default function Courses() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 bg-hero-gradient animate-gradient overflow-hidden">
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
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    View Course
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost" className="flex-1">
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
      <Section className="py-20 bg-hero-gradient">
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
