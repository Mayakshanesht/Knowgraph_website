import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Network,
  BarChart3,
  CheckCircle,
  Code,
  Calculator,
  Upload,
  Users,
  ArrowRight,
} from "lucide-react";

const platformFeatures = [
  {
    icon: Layers,
    title: "Capsule-Based Learning",
    description:
      "Each Capsule covers one concept in approximately 40 seconds. Short, focused, and designed for intentional learning.",
  },
  {
    icon: Network,
    title: "Knowledge Graph Visualization",
    description:
      "See how concepts connect to each other. Understand prerequisites and navigate your learning journey visually.",
  },
  {
    icon: BarChart3,
    title: "Prerequisite-Aware Progression",
    description:
      "The platform guides you through concepts in the right order, ensuring you have the foundations before advancing.",
  },
  {
    icon: CheckCircle,
    title: "Concept-Level Mastery Tracking",
    description:
      "Track your understanding at the concept level, not just course completion. See exactly what you know and what gaps remain.",
  },
  {
    icon: Code,
    title: "Interactive Exercises",
    description:
      "Quizzes, coding exercises, and problem-solving activities integrated directly into your learning path.",
  },
  {
    icon: Calculator,
    title: "Math Problem Solving",
    description:
      "Work through mathematical concepts with structured problems and step-by-step solutions.",
  },
  {
    icon: Upload,
    title: "Upload Your Own Material",
    description:
      "Create private Capsules from your own learning materials. Structure your personal knowledge base.",
  },
  {
    icon: Users,
    title: "Public Capsules",
    description:
      "Contribute to and learn from publicly shared Capsules. Build knowledge together.",
  },
];

export default function Platform() {
  return (
    <Layout>
      {/* Hero */}
      <Section className="pt-24 md:pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            The KnowGraph Platform
          </h1>
          <p className="text-lg text-muted-foreground">
            A structured learning environment that helps you understand complex systems through knowledge graphs, prerequisite-aware progression, and concept-level mastery tracking.
          </p>
        </div>
      </Section>

      {/* Platform Features */}
      <Section>
        <SectionHeader
          title="Platform Features"
          description="Everything you need to master complex technical subjects"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Section>

      {/* Domain Note */}
      <Section className="bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            While KnowGraph is domain-agnostic by design, it is currently optimized for technically complex subjects where explicit structure and prerequisites are essential for understanding.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Experience Graph-Based Learning
          </h2>
          <p className="text-muted-foreground mb-6">
            See how structured learning can accelerate your understanding of complex systems.
          </p>
          <Button asChild variant="hero" size="lg">
            <a href="https://app.knowgraph.ai" target="_blank" rel="noopener noreferrer">
              Try KnowGraph
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
