import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Focus, Network, Zap } from "lucide-react";

const capsuleFeatures = [
  {
    icon: Clock,
    title: "Short and Focused",
    description: "Each Capsule takes approximately 40 seconds, designed for concentrated learning without overwhelming information.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Focus,
    title: "One Concept Per Capsule",
    description: "Every Capsule covers exactly one concept. No mixing, no tangents — just clear, focused explanations.",
    color: "bg-violet/10 text-violet",
  },
  {
    icon: Network,
    title: "Part of a Larger Graph",
    description: "Each Capsule is a node in a knowledge graph. See how it connects to prerequisites and related concepts.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: Zap,
    title: "Designed for Intentional Learning",
    description: "Built to help you learn deliberately, not scroll endlessly. Every Capsule has a purpose.",
    color: "bg-accent/10 text-accent",
  },
];

export default function Capsules() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 bg-hero-gradient animate-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              What Are Capsules?
            </h1>
            <p className="text-lg text-white/80">
              Capsules are the fundamental units of learning on KnowGraph. Each one covers a single concept in a focused, structured format designed for intentional learning.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {capsuleFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-4 p-6 rounded-xl bg-card border border-border shadow-soft">
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* No Doomscrolling */}
      <Section className="bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Built to Avoid Doomscrolling
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Unlike social feeds and endless content streams, Capsules are designed with clear boundaries. You learn what you need, then move on. Each Capsule has explicit prerequisites and outcomes, so you always know where you are in your learning journey.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Start Exploring Capsules
          </h2>
          <p className="text-muted-foreground mb-6">
            Browse the knowledge graph and find concepts that interest you.
          </p>
          <Button asChild variant="hero" size="lg">
            <a href="https://app.knowgraph.ai/explore" target="_blank" rel="noopener noreferrer">
              Explore Capsules in the App
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
