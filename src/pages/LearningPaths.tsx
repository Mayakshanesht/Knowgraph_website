import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Route, Target, TrendingUp } from "lucide-react";

const examplePaths = [
  {
    title: "AI Foundations → Deep Learning → LLMs",
    description: "Build from fundamental ML concepts to understanding large language models.",
  },
  {
    title: "Autonomous Driving Systems",
    description: "Comprehensive coverage of perception, prediction, planning, and control.",
  },
  {
    title: "Perception & Sensor Fusion",
    description: "From individual sensors to multi-modal perception systems.",
  },
  {
    title: "Motion Prediction & Planning",
    description: "Predicting behavior and planning safe trajectories.",
  },
  {
    title: "Control Systems",
    description: "From PID to LQR to MPC — modern vehicle control techniques.",
  },
  {
    title: "Robotics & Physical AI",
    description: "Understanding embodied intelligence and robotic systems.",
  },
];

const pathBenefits = [
  {
    icon: Route,
    title: "Curated Sequences",
    description: "Learning Paths are carefully designed sequences of Capsules, not random playlists. Every step builds on the previous one.",
  },
  {
    icon: Target,
    title: "Structured Progression",
    description: "Move through concepts in the right order. Prerequisites are explicit, so you never feel lost.",
  },
  {
    icon: TrendingUp,
    title: "Domain Mastery",
    description: "Learning Paths are designed to help you master entire domains, not just individual topics.",
  },
];

export default function LearningPaths() {
  return (
    <Layout>
      {/* Hero */}
      <Section className="pt-24 md:pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Learning Paths
          </h1>
          <p className="text-lg text-muted-foreground">
            Curated sequences of Capsules designed to help you master entire domains. Structured progression instead of random playlists.
          </p>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-secondary/30">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {pathBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Example Paths */}
      <Section>
        <SectionHeader
          title="Example Learning Paths"
          description="Current paths available on the platform"
        />
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {examplePaths.map((path) => (
            <div
              key={path.title}
              className="p-6 rounded-xl bg-card border border-border shadow-soft"
            >
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {path.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {path.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Start a Learning Path
          </h2>
          <p className="text-muted-foreground mb-6">
            Choose a domain and begin your structured learning journey.
          </p>
          <Button asChild variant="hero" size="lg">
            <a href="https://app.knowgraph.ai" target="_blank" rel="noopener noreferrer">
              Start a Learning Path
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
