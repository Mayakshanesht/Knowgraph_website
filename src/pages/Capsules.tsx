import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Focus, Network, Zap } from "lucide-react";

const capsuleFeatures = [
  {
    icon: Clock,
    title: "Short and Focused",
    description: "Each Capsule takes approximately 40 seconds, designed for concentrated learning without overwhelming information.",
  },
  {
    icon: Focus,
    title: "One Concept Per Capsule",
    description: "Every Capsule covers exactly one concept. No mixing, no tangents — just clear, focused explanations.",
  },
  {
    icon: Network,
    title: "Part of a Larger Graph",
    description: "Each Capsule is a node in a knowledge graph. See how it connects to prerequisites and related concepts.",
  },
  {
    icon: Zap,
    title: "Designed for Intentional Learning",
    description: "Built to help you learn deliberately, not scroll endlessly. Every Capsule has a purpose.",
  },
];

export default function Capsules() {
  return (
    <Layout>
      {/* Hero */}
      <Section className="pt-24 md:pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            What Are Capsules?
          </h1>
          <p className="text-lg text-muted-foreground">
            Capsules are the fundamental units of learning on KnowGraph. Each one covers a single concept in a focused, structured format designed for intentional learning.
          </p>
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-secondary/30">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {capsuleFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
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
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Built to Avoid Doomscrolling
          </h2>
          <p className="text-muted-foreground mb-8">
            Unlike social feeds and endless content streams, Capsules are designed with clear boundaries. You learn what you need, then move on. Each Capsule has explicit prerequisites and outcomes, so you always know where you are in your learning journey.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-secondary/30">
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
