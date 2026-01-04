import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { 
  Layers, 
  Network, 
  BarChart3, 
  BookOpen, 
  GraduationCap, 
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target
} from "lucide-react";
import knowgraphLogo from "@/assets/knowgraph-logo.png";

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

const differentiators = [
  {
    icon: Network,
    title: "Structure-first learning",
    description: "Knowledge graphs instead of playlists.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Target,
    title: "Concept-level mastery",
    description: "Learn ideas, not just watch content.",
    color: "bg-violet/10 text-violet",
  },
  {
    icon: Zap,
    title: "No doomscrolling",
    description: "Every Capsule has a purpose.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: Layers,
    title: "Built for complex domains",
    description: "Designed for systems like AI, robotics, and autonomy.",
    color: "bg-accent/10 text-accent",
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

const problems = [
  "Long lectures are hard to retain",
  "Short videos lack structure",
  "Platforms don't show what to learn first",
  "No visibility into knowledge gaps",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section with Gradient */}
      <section className="relative pt-24 md:pt-32 pb-20 md:pb-32 bg-hero-gradient animate-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-4 bg-white/95 rounded-2xl shadow-elevated mb-8 animate-fade-in">
              <img 
                src={knowgraphLogo} 
                alt="KnowGraph" 
                className="h-12 md:h-16 w-auto"
              />
            </div>
            <p className="text-xl md:text-2xl text-white/95 font-heading font-medium mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Learn complex systems, one Capsule at a time.
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Understand complex topics through short, connected explanations — designed to help you learn with structure, not endless scrolling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild variant="hero-white" size="xl">
                <a href="https://app.knowgraph.ai" target="_blank" rel="noopener noreferrer">
                  Try KnowGraph
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button asChild variant="hero-outline" size="xl" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <Link to="/learning-paths">Explore Learning Paths</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Problem Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Learning Complex Topics Is Broken
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Traditional learning approaches fail when topics get complex.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {problems.map((problem, index) => (
              <div 
                key={problem}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border shadow-soft"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-foreground font-medium pt-2">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Solution Section */}
      <Section className="bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            KnowGraph Brings Structure to Learning
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            Complex subjects are broken into Capsules, connected via knowledge graphs. 
            Learners move step-by-step, intentionally — not through algorithmic scrolling.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </Section>

      {/* What Makes Different Section */}
      <Section>
        <SectionHeader
          title="What Makes KnowGraph Different"
          description="Built from the ground up for intentional, structured learning"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-card transition-shadow text-center"
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Domain Agnostic Section */}
      <Section className="bg-primary-gradient text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
            Built for Any Domain. Starting with Technical Systems.
          </h2>
          <p className="text-white/80 leading-relaxed mb-8">
            KnowGraph is domain-agnostic by design — the platform can structure knowledge in any field where concepts build on each other. Our initial focus is on technical subjects where explicit structure and prerequisites matter most.
          </p>
        </div>
      </Section>

      {/* Current Focus */}
      <Section>
        <SectionHeader
          title="What You Can Learn"
          description="Current focus areas on the platform"
        />
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {domains.map((domain, index) => {
            const colors = [
              "border-primary/30 bg-primary/5",
              "border-violet/30 bg-violet/5",
              "border-teal/30 bg-teal/5",
              "border-accent/30 bg-accent/5",
              "border-green/30 bg-green/5",
            ];
            return (
              <span
                key={domain}
                className={`px-5 py-2.5 rounded-full text-sm font-medium text-foreground border ${colors[index % colors.length]} shadow-soft`}
              >
                {domain}
              </span>
            );
          })}
        </div>
      </Section>

      {/* Two Ways to Learn */}
      <Section className="bg-card">
        <SectionHeader
          title="Two Ways to Learn"
          description="Choose the learning format that works best for you"
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-xl bg-background border-2 border-primary/20 shadow-card hover:border-primary/40 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Learning Paths
            </h3>
            <p className="text-sm text-primary font-medium mb-3">Subscription-based</p>
            <p className="text-muted-foreground mb-6">
              Curated sequences of Capsules designed to help you master entire domains. Progress tracking, quizzes, and structured learning.
            </p>
            <Button asChild variant="default">
              <Link to="/learning-paths">
                Explore Paths
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="p-8 rounded-xl bg-background border-2 border-violet/20 shadow-card hover:border-violet/40 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-violet/10 flex items-center justify-center mb-5">
              <GraduationCap className="w-7 h-7 text-violet" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Recorded Courses
            </h3>
            <p className="text-sm text-violet font-medium mb-3">One-time purchase</p>
            <p className="text-muted-foreground mb-6">
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
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join learners mastering complex technical systems through structured, graph-based learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <a href="https://app.knowgraph.ai" target="_blank" rel="noopener noreferrer">
                Try KnowGraph
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button asChild variant="hero-outline" size="lg">
              <Link to="/try">
                Request Beta Access
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
