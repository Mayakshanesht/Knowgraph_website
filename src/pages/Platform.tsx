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
  Brain,
  Bot,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  Gift,
  Trophy,
  Star,
  PlayCircle,
  Navigation,
  BrainCircuit,
  FileCheck,
  MessageCircle,
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

const aiAgents = [
  {
    icon: Brain,
    title: "Research Agents",
    description: "Automatically discover and extract key concepts from any learning material using advanced AI research methodologies.",
    features: [
      "Intelligent concept extraction",
      "Cross-reference validation", 
      "Source credibility assessment",
      "Knowledge gap identification"
    ],
    color: "bg-gradient-to-br from-blue-500 to-purple-600 text-white",
  },
  {
    icon: Bot,
    title: "Reasoning Agents",
    description: "Apply logical reasoning to structure concepts, identify prerequisites, and build optimal learning paths.",
    features: [
      "Prerequisite relationship mapping",
      "Learning path optimization",
      "Difficulty level assessment",
      "Personalized adaptation"
    ],
    color: "bg-gradient-to-br from-green-500 to-teal-600 text-white",
  },
];

const howYouLearnFeatures = [
  {
    icon: PlayCircle,
    title: "Short, focused capsules",
    description: "Like reels, but purposeful—40-second micro-learning experiences that build real understanding.",
    color: "bg-blue/10 text-blue",
  },
  {
    icon: Navigation,
    title: "Visual navigation",
    description: "Navigate through containers and clusters with intuitive visual connections between concepts.",
    color: "bg-violet/10 text-violet",
  },
  {
    icon: BrainCircuit,
    title: "Higher retention",
    description: "Learn via abstraction and visuals that stick, not just rote memorization.",
    color: "bg-teal/10 text-teal",
  },
  {
    icon: FileCheck,
    title: "Quizzes and analytics",
    description: "Validate your understanding with targeted quizzes and track progress with detailed analytics.",
    color: "bg-green/10 text-green",
  },
  {
    icon: MessageCircle,
    title: "Personal AI tutor",
    description: "Get instant clarification on doubts from your AI tutor, available 24/7.",
    color: "bg-orange/10 text-orange",
  },
];

const storytellingFeatures = [
  {
    icon: Sparkles,
    title: "AI Storytelling",
    description: "Transform complex concepts into engaging narratives that enhance memory retention and understanding.",
    color: "bg-purple/10 text-purple",
  },
  {
    icon: BookOpen,
    title: "Interactive Capsules",
    description: "40-second micro-learning experiences with rich storytelling and contextual examples.",
    color: "bg-blue/10 text-blue",
  },
  {
    icon: Target,
    title: "Contextual Learning",
    description: "Every concept wrapped in relevant stories and real-world applications for deeper comprehension.",
    color: "bg-green/10 text-green",
  },
];

const studentPerks = [
  {
    icon: Trophy,
    title: "Achievement System",
    description: "Earn badges and certificates as you master concepts and complete learning paths.",
    color: "bg-yellow/10 text-yellow",
  },
  {
    icon: Gift,
    title: "Premium Content",
    description: "Access exclusive capsules, advanced topics, and expert-created learning materials.",
    color: "bg-purple/10 text-purple",
  },
  {
    icon: Zap,
    title: "Study Groups",
    description: "Join collaborative learning sessions and study with peers from around the world.",
    color: "bg-blue/10 text-blue",
  },
  {
    icon: Star,
    title: "Personalized Coaching",
    description: "Get 1-on-1 guidance from AI tutor for difficult concepts.",
    color: "bg-green/10 text-green",
  },
];

export default function Platform() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 hero-gradient overflow-hidden">
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

      {/* AI Agents Section */}
      <Section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <SectionHeader
          title="AI-Powered Learning Intelligence"
          description="Advanced research and reasoning agents that transform how you learn"
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {aiAgents.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.title}
                className="p-8 rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${agent.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  {agent.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {agent.description}
                </p>
                <ul className="space-y-3">
                  {agent.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Storytelling Section */}
      <Section className="py-20">
        <SectionHeader
          title="Storytelling-Driven Learning"
          description="Transform complex concepts into memorable learning experiences"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {storytellingFeatures.map((feature, i) => {
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

      {/* How You Learn Section */}
      <Section className="py-20 bg-gradient-to-b from-background via-primary/[0.02] to-background">
        <SectionHeader
          title="How You Learn with KnowGraph"
          description="Experience a new way of learning that adapts to your needs"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {howYouLearnFeatures.map((feature, i) => {
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

      {/* Student Perks Section */}
      <Section className="py-20 bg-gradient-to-r from-primary/5 via-violet/5 to-teal/5">
        <SectionHeader
          title="Exclusive Student Perks"
          description="Unlock premium features and benefits to accelerate your learning journey"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentPerks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-soft hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${perk.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {perk.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Platform Features */}
      <Section className="py-20">
        <SectionHeader
          title="Core Platform Features"
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

      {/* Bring Your Own Content Section */}
      <Section className="py-20 bg-gradient-to-b from-background via-primary/[0.02] to-background">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Bring Your Own Content"
            description="Transform your existing materials into structured learning experiences"
          />
          
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground mb-8">
              Upload your own:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-blue/10 text-blue flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Research Papers</h4>
              </div>
              
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-violet/10 text-violet flex items-center justify-center mx-auto mb-3">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">PDFs</h4>
              </div>
              
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Lecture Notes</h4>
              </div>
              
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-green/10 text-green flex items-center justify-center mx-auto mb-3">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Videos</h4>
              </div>
            </div>
            
            <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/5 via-violet/5 to-teal/5 border border-primary/20">
              <p className="text-lg font-medium text-foreground mb-2">
                KnowGraph automatically builds structured learning containers and delivers them in a personalized learning feed.
              </p>
              <p className="text-sm text-muted-foreground">
                Save hours of manual organization. Let AI do the heavy lifting while you focus on learning.
              </p>
            </div>
          </div>
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
