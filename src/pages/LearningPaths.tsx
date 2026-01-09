import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Route, Target, TrendingUp, Lightbulb, Package, FolderOpen, Network, Globe } from "lucide-react";

const examplePaths = [
  {
    title: "AI Foundations → Deep Learning → LLMs",
    description: "Build from fundamental ML concepts to understanding large language models.",
    color: "border-l-primary bg-primary/5",
  },
  {
    title: "Autonomous Driving Systems",
    description: "Comprehensive coverage of perception, prediction, planning, and control.",
    color: "border-l-violet bg-violet/5",
  },
  {
    title: "Perception & Sensor Fusion",
    description: "From individual sensors to multi-modal perception systems.",
    color: "border-l-teal bg-teal/5",
  },
  {
    title: "Motion Prediction & Planning",
    description: "Predicting behavior and planning safe trajectories.",
    color: "border-l-accent bg-accent/5",
  },
  {
    title: "Control Systems",
    description: "From PID to LQR to MPC — modern vehicle control techniques.",
    color: "border-l-cyan bg-cyan/5",
  },
  {
    title: "Robotics & Physical AI",
    description: "Understanding embodied intelligence and robotic systems.",
    color: "border-l-green bg-green/5",
  },
];

const pathBenefits = [
  {
    icon: Route,
    title: "Curated Sequences",
    description: "Learning Paths are carefully designed sequences of Capsules. Every step builds on the previous.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Target,
    title: "Structured Progression",
    description: "Move through concepts in the right order. Prerequisites are explicit, so you never feel lost.",
    color: "bg-violet/10 text-violet",
  },
  {
    icon: TrendingUp,
    title: "Domain Mastery",
    description: "Designed to help you master entire domains, not just individual topics.",
    color: "bg-teal/10 text-teal",
  },
];

export default function LearningPaths() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-float-up">
              Learning Paths
            </h1>
            <p className="text-lg md:text-xl text-white/80 animate-float-up delay-200">
              Curated sequences of Capsules designed to help you master entire domains. Structured progression instead of random playlists.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Benefits */}
      <Section className="py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {pathBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="text-center p-6 rounded-2xl bg-card border border-border shadow-soft card-hover">
                <div className={`w-14 h-14 rounded-xl ${benefit.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-7 h-7" />
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

      {/* Why KnowGraph Exists */}
      <Section className="py-20 bg-gradient-to-b from-background via-primary/[0.02] to-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
            Why KnowGraph Exists
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              KnowGraph was built to solve a personal problem.
            </p>
            <p>
              Keeping up with the latest research in AI and autonomous driving isn't practical anymore.
              Reading every paper doesn't scale. Skimming abstracts doesn't build understanding. Videos fragment context.
            </p>
            <p>
              I needed a tool that could understand research, break it into key ideas, convert it into reel-style learning, and show it in my feed—so learning could happen daily.
            </p>
            <p className="text-foreground font-medium">
              That tool didn't exist. So I built it.
            </p>
          </div>
        </div>
      </Section>

      {/* Example Paths */}
      <Section className="py-20 bg-gradient-to-b from-background via-primary/[0.02] to-background">
        <SectionHeader
          title="Example Learning Paths"
          description="Current paths available on the platform"
        />
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {examplePaths.map((path) => (
            <div
              key={path.title}
              className={`p-6 rounded-2xl border border-border border-l-4 ${path.color} shadow-soft card-hover`}
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

      {/* How KnowGraph Works */}
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="How KnowGraph Works"
            description="A Simple Knowledge Hierarchy"
          />
          
          <div className="space-y-6">
            {/* Knowledge Hierarchy Flow */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-8">
              {/* Key Ideas */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Key Ideas</h4>
                <p className="text-sm text-muted-foreground max-w-[120px]">
                  distilled insights from papers, PDFs, notes, or videos
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-primary">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="md:hidden text-primary rotate-90">
                <ArrowRight className="w-6 h-6" />
              </div>

              {/* Capsules */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Package className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Capsules</h4>
                <p className="text-sm text-muted-foreground max-w-[120px]">
                  each key idea becomes a short, visual learning unit
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-primary">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="md:hidden text-primary rotate-90">
                <ArrowRight className="w-6 h-6" />
              </div>

              {/* Containers */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Containers</h4>
                <p className="text-sm text-muted-foreground max-w-[120px]">
                  related capsules form a topic or short course
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-primary">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="md:hidden text-primary rotate-90">
                <ArrowRight className="w-6 h-6" />
              </div>

              {/* Clusters */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Network className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Clusters</h4>
                <p className="text-sm text-muted-foreground max-w-[120px]">
                  containers connect across domains
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-primary">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="md:hidden text-primary rotate-90">
                <ArrowRight className="w-6 h-6" />
              </div>

              {/* Global Knowledge Graph */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Global Knowledge Graph</h4>
                <p className="text-sm text-muted-foreground max-w-[120px]">
                  a living, connected map of knowledge
                </p>
              </div>
            </div>

            {/* Footer Line */}
            <div className="text-center pt-6 border-t border-border">
              <p className="text-lg font-medium text-foreground">
                You don't just consume content—you see how concepts relate.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Start a Learning Path
          </h2>
          <p className="text-muted-foreground mb-8">
            Choose a domain and begin your structured learning journey.
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
