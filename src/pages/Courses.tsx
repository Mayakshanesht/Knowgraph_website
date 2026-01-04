import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";

const courses = [
  {
    title: "AI Course — ML → LLMs → Generative AI",
    description:
      "Comprehensive journey from machine learning fundamentals through deep learning to large language models and generative AI applications.",
    link: "https://sites.google.com/cloudbeerobotics-ai.com/home/courses/ai-bootcamp",
  },
  {
    title: "Autonomous Driving Systems",
    description:
      "Complete coverage of autonomous driving technology including perception, sensor fusion, prediction, planning, and control systems.",
    link: "https://sites.google.com/cloudbeerobotics-ai.com/home/courses/advanced-driver-assistance-systems-development-bootcamp",
  },
  {
    title: "Modern Vehicle Control — PID → LQR → MPC",
    description:
      "From classical PID control through optimal control theory to model predictive control for autonomous vehicles.",
    link: "https://sites.google.com/cloudbeerobotics-ai.com/home/courses/advanced-controls-bootcamp-for-autonomous-driving",
  },
  {
    title: "Motion Prediction & Planning for Autonomous Driving",
    description:
      "Understanding and implementing motion prediction and trajectory planning systems for autonomous vehicles.",
    link: "https://sites.google.com/cloudbeerobotics-ai.com/home/courses/motion-prediction-planning-for-autonomous-driving-bootcamp",
  },
];

export default function Courses() {
  return (
    <Layout>
      {/* Hero */}
      <Section className="pt-24 md:pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Recorded Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Recorded courses delivered using KnowGraph Capsules and structured learning paths. Course content is hosted externally and linked below.
          </p>
        </div>
      </Section>

      {/* Note */}
      <Section className="py-8">
        <div className="max-w-3xl mx-auto">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-sm text-muted-foreground text-center">
              Courses are delivered by CloudBee Robotics using the KnowGraph platform.
            </p>
          </div>
        </div>
      </Section>

      {/* Course Cards */}
      <Section>
        <SectionHeader
          title="Available Courses"
          description="Structured learning delivered through KnowGraph Capsules"
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.title}
              className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-2">
                    Powered by KnowGraph Capsules
                  </span>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {course.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {course.description}
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href={course.link} target="_blank" rel="noopener noreferrer">
                  View Course
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Want to Create Your Own Course?
          </h2>
          <p className="text-muted-foreground mb-6">
            Use KnowGraph to structure and deliver your educational content.
          </p>
          <Button asChild variant="hero-outline" size="lg">
            <a href="mailto:contact@knowgraph.ai">
              Get in Touch
            </a>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
