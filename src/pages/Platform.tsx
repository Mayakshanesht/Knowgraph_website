import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
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
    description: "Each Capsule covers one concept in ~40 seconds. Short, focused, intentional.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Network,
    title: "Knowledge Graph Visualization",
    description: "See how concepts connect. Understand prerequisites visually.",
    color: "bg-violet/10 text-violet",
  },
  {
    icon: BarChart3,
    title: "Prerequisite-Aware Progression",
    description: "Learn in the right order. Foundations before advancement.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: CheckCircle,
    title: "Concept-Level Mastery",
    description: "Track understanding at the concept level, not just completion.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Code,
    title: "Interactive Exercises",
    description: "Quizzes, coding exercises, and problems integrated into paths.",
    color: "bg-cyan/10 text-cyan",
  },
  {
    icon: Calculator,
    title: "Math Problem Solving",
    description: "Structured problems with step-by-step solutions.",
    color: "bg-green/10 text-green",
  },
  {
    icon: Upload,
    title: "Upload Your Own Material",
    description: "Create private Capsules from your learning materials.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Public Capsules",
    description: "Learn from and contribute to shared knowledge.",
    color: "bg-violet/10 text-violet",
  },
];

export default function Platform() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 bg-hero-gradient animate-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-float-up">
              The Platform
            </h1>
            <p className="text-lg md:text-xl text-white/80 animate-float-up delay-200">
              A structured learning environment for understanding complex systems through knowledge graphs, prerequisite-aware progression, and concept-level mastery.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Platform Features */}
      <Section className="py-20">
        <SectionHeader
          title="Platform Features"
          description="Everything you need to master complex technical subjects"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Domain Note */}
      <Section className="py-12 bg-gradient-to-r from-primary/5 via-violet/5 to-teal/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-foreground">
            While KnowGraph is domain-agnostic by design, it is currently optimized for technically complex subjects where explicit structure and prerequisites are essential.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Experience graph-based learning
          </h2>
          <p className="text-muted-foreground mb-8">
            See how structured learning can accelerate your understanding.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/try">
              Join the Beta
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
