import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { Layers, Network, BarChart3, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Capsules",
    description:
      "Short, concept-level explanations designed for focused learning. Each Capsule covers one idea in approximately 40 seconds.",
  },
  {
    icon: Network,
    title: "Knowledge Graphs",
    description:
      "Explicit structure and prerequisites. See how concepts connect and understand what you need to learn first.",
  },
  {
    icon: BarChart3,
    title: "Mastery Tracking",
    description:
      "See your knowledge gaps and next steps. Track progress across interconnected concepts.",
  },
];

const domains = [
  "AI & Machine Learning",
  "Autonomous Driving",
  "Perception & Computer Vision",
  "Motion Prediction & Planning",
  "Control Systems",
  "Robotics & Physical AI",
  "CI/CD for Autonomous Systems",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <Section className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 animate-fade-in">
            KnowGraph
          </h1>
          <p className="text-xl md:text-2xl text-primary font-heading font-medium mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Learn complex systems, one Capsule at a time.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A graph-based learning platform for understanding complex systems — starting with technical domains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="hero" size="xl">
              <a href="https://app.knowgraph.ai" target="_blank" rel="noopener noreferrer">
                Try KnowGraph
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/platform">Learn More</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Domain Agnostic Section */}
      <Section className="bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Built for Any Domain. Starting with Technical Systems.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            KnowGraph is domain-agnostic by design — the platform can structure knowledge in any field where concepts build on each other. Our initial focus is on technical subjects where explicit structure and prerequisites matter most. As the platform evolves, we plan to expand into additional domains.
          </p>
        </div>
      </Section>

      {/* How Learning Works */}
      <Section>
        <SectionHeader
          title="How Learning Works"
          description="A structured approach to mastering complex systems"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Section>

      {/* Current Focus */}
      <Section className="bg-secondary/30">
        <SectionHeader
          title="What You Can Learn"
          description="Current focus areas on the platform"
        />
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {domains.map((domain) => (
            <span
              key={domain}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground shadow-soft"
            >
              {domain}
            </span>
          ))}
        </div>
      </Section>

      {/* Two Ways to Learn */}
      <Section>
        <SectionHeader
          title="Two Ways to Learn"
          description="Choose the learning format that works best for you"
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-xl bg-card border border-border shadow-card">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Learning Paths
            </h3>
            <p className="text-sm text-muted-foreground mb-1">Subscription-based</p>
            <p className="text-muted-foreground mb-4">
              Curated sequences of Capsules designed to help you master entire domains. Progress tracking, quizzes, and structured learning.
            </p>
            <Button asChild variant="outline">
              <Link to="/learning-paths">
                Explore Paths
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="p-8 rounded-xl bg-card border border-border shadow-card">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Recorded Courses
            </h3>
            <p className="text-sm text-muted-foreground mb-1">One-time purchase</p>
            <p className="text-muted-foreground mb-4">
              Comprehensive courses delivered using KnowGraph Capsules. Hosted externally with structured content and full access.
            </p>
            <Button asChild variant="outline">
              <Link to="/courses">
                View Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join learners mastering complex technical systems through structured, graph-based learning.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/try">
              Request Beta Access
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
