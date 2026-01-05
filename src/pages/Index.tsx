import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  Users,
  GraduationCap,
  Briefcase,
  FlaskConical,
  BookOpen,
  Building2,
  Sparkles,
  TrendingUp,
  BarChart3,
  Eye
} from "lucide-react";
import knowgraphLogo from "@/assets/knowgraph-logo.png";

const personas = [
  { icon: GraduationCap, label: "Students", description: "Preparing for courses" },
  { icon: Briefcase, label: "Professionals", description: "Upskilling for work" },
  { icon: Users, label: "Engineers", description: "Onboarding at companies" },
  { icon: FlaskConical, label: "Researchers", description: "Exploring new domains" },
  { icon: BookOpen, label: "Educators", description: "Teaching with structure" },
  { icon: Building2, label: "Institutions", description: "Scaling learning" },
];

const plans = [
  {
    name: "Free Explorer",
    color: "border-primary/30 bg-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    features: ["Public Capsules", "Read-only graphs", "Light progress tracking"],
  },
  {
    name: "Learner",
    color: "border-violet/30 bg-violet/5",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
    features: ["Full learning paths", "Quizzes & exercises", "Personal learning guide"],
  },
  {
    name: "Professional",
    color: "border-accent/30 bg-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    features: ["Faster recommendations", "Deeper analytics", "Designed for upskilling"],
  },
  {
    name: "Student Pro",
    color: "border-cyan/30 bg-cyan/5",
    iconBg: "bg-cyan/10",
    iconColor: "text-cyan",
    features: ["Deep mastery tracking", "Exam alignment", "Long-term learning"],
  },
];

const domains = [
  "AI",
  "Autonomous Driving",
  "Perception",
  "Control Systems",
  "Robotics",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section - Massive Logo */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-hero-gradient animate-gradient overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08)_0%,transparent_40%)]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Large Logo */}
          <div className="mb-8" style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            <div className="inline-block p-6 md:p-8 bg-white/95 rounded-3xl shadow-elevated">
              <img 
                src={knowgraphLogo} 
                alt="KnowGraph" 
                className="h-20 md:h-28 lg:h-36 w-auto mx-auto"
              />
            </div>
          </div>
          
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-white/95 font-heading font-medium mb-4"
            style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards', opacity: 0 }}
          >
            Learn complex systems, one Capsule at a time.
          </p>
          
          <p 
            className="text-lg text-white/70 max-w-2xl mx-auto mb-10"
            style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards', opacity: 0 }}
          >
            Structured, connected learning for a world that updates every day.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards', opacity: 0 }}
          >
            <Button asChild variant="hero-white" size="xl">
              <Link to="/try">
                Join the Beta
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
          
          <p 
            className="text-sm text-white/50 mt-6"
            style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards', opacity: 0 }}
          >
            Launching in a few weeks. Free during beta.
          </p>
        </div>
        </div>
        
        {/* Smooth gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </section>

      {/* The Attention Problem - Visual Contrast */}
      <Section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              We consume more content than ever.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-heading">
              We understand less.
            </p>
          </div>
          
          {/* Visual representation of the problem */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-muted/50 border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 rounded-full border-4 border-destructive/40 border-t-destructive animate-spin" />
              </div>
              <p className="text-sm text-muted-foreground">Endless scrolling</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/50 border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <div className="flex gap-1">
                  <div className="w-2 h-6 bg-destructive/40 rounded" />
                  <div className="w-2 h-4 bg-destructive/30 rounded" />
                  <div className="w-2 h-8 bg-destructive/50 rounded" />
                  <div className="w-2 h-3 bg-destructive/25 rounded" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Fragmented videos</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/50 border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold text-destructive/50">?</div>
              </div>
              <p className="text-sm text-muted-foreground">No clear path</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Visual Explanation - The Infographic */}
      <Section className="py-20 md:py-28 bg-gradient-to-b from-background via-primary/[0.03] to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              KnowGraph transforms how you learn
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From fragmented content to connected understanding
            </p>
          </div>
          
          {/* Infographic-style visual */}
          <div className="relative">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Problem side */}
              <div className="p-8 rounded-3xl bg-card border border-border shadow-card">
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive text-sm font-medium rounded-full mb-4">
                    The Problem
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-destructive text-lg">1h+</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Long lectures overwhelm</p>
                      <p className="text-sm text-muted-foreground">Hard to retain, easy to zone out</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <div className="flex gap-0.5">
                        <div className="w-1.5 h-3 bg-destructive/60 rounded-sm" />
                        <div className="w-1.5 h-5 bg-destructive/40 rounded-sm" />
                        <div className="w-1.5 h-2 bg-destructive/50 rounded-sm" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Short videos fragment</p>
                      <p className="text-sm text-muted-foreground">No connection between ideas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-destructive text-lg">?</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">No prerequisites shown</p>
                      <p className="text-sm text-muted-foreground">Where do you even start?</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Solution side */}
              <div className="p-8 rounded-3xl bg-card border border-primary/20 shadow-elevated">
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                    The Solution
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm font-bold">40s</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">One concept per Capsule</p>
                      <p className="text-sm text-muted-foreground">Focused, intentional learning</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-violet/5 border border-violet/10">
                    <div className="w-10 h-10 rounded-lg bg-violet/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="18" cy="6" r="3" />
                        <circle cx="12" cy="18" r="3" />
                        <path d="M8.5 7.5L10.5 15.5M15.5 7.5L13.5 15.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Connected by knowledge graphs</p>
                      <p className="text-sm text-muted-foreground">See how ideas relate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-teal/5 border border-teal/10">
                    <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Clear learning paths</p>
                      <p className="text-sm text-muted-foreground">Know what to learn next</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Arrow between */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border items-center justify-center shadow-lg">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </Section>

      {/* Beta CTA */}
      <Section className="py-16 bg-hero-gradient">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            KnowGraph is opening gradually to early users who care about understanding, not just consumption.
          </p>
          <Button asChild variant="hero-white" size="xl">
            <Link to="/try">
              Join the Beta
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-sm text-white/60 mt-4">
            No payment required. Help shape the platform.
          </p>
        </div>
      </Section>

      {/* Who This Is For - Visual Personas */}
      <Section className="py-20 md:py-28">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            One platform. Many learning journeys.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {personas.map((persona, i) => {
            const Icon = persona.icon;
            const colors = [
              "bg-primary/10 text-primary",
              "bg-violet/10 text-violet",
              "bg-teal/10 text-teal",
              "bg-accent/10 text-accent",
              "bg-cyan/10 text-cyan",
              "bg-green/10 text-green",
            ];
            return (
              <div 
                key={persona.label}
                className="p-5 rounded-2xl bg-card border border-border shadow-soft text-center card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${colors[i]} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="font-medium text-foreground text-sm mb-1">{persona.label}</p>
                <p className="text-xs text-muted-foreground">{persona.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Choose How You Learn - Interest Signals */}
      <Section className="py-20 md:py-28 bg-gradient-to-b from-background via-violet/[0.02] to-background">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Choose how you learn
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            KnowGraph uses a credit-based system. During beta, we're learning what users value most.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`p-6 rounded-2xl border-2 ${plan.color} bg-card shadow-soft card-hover`}
            >
              <div className={`w-12 h-12 rounded-xl ${plan.iconBg} flex items-center justify-center mb-4`}>
                <Sparkles className={`w-6 h-6 ${plan.iconColor}`} />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                {plan.name}
              </h3>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">-</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/try">I'm interested</Link>
              </Button>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground text-center mt-8">
          During beta, access is free and limited.
        </p>
      </Section>

      {/* Learning Analytics */}
      <Section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                See what you know. Find what's missing.
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                KnowGraph tracks understanding at the concept level — revealing what you know, what you don't, and what matters next.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">Highlighted weak nodes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-violet" />
                  </div>
                  <span className="text-foreground">Progress paths filling in</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-teal" />
                  </div>
                  <span className="text-foreground">Mastery indicators</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 italic">
                Inspired by the best learning systems, built for complex subjects.
              </p>
            </div>
            
            {/* Visual graph representation */}
            <div className="relative p-8 rounded-3xl bg-card border border-border shadow-elevated">
              <svg className="w-full h-64" viewBox="0 0 300 200">
                {/* Connections */}
                <line x1="150" y1="100" x2="70" y2="50" stroke="hsl(var(--primary))" strokeWidth="2" strokeOpacity="0.3" />
                <line x1="150" y1="100" x2="230" y2="50" stroke="hsl(var(--violet))" strokeWidth="2" strokeOpacity="0.3" />
                <line x1="150" y1="100" x2="70" y2="150" stroke="hsl(var(--teal))" strokeWidth="2" strokeOpacity="0.3" />
                <line x1="150" y1="100" x2="230" y2="150" stroke="hsl(var(--accent))" strokeWidth="2" strokeOpacity="0.3" />
                <line x1="70" y1="50" x2="70" y2="150" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4" />
                <line x1="230" y1="50" x2="230" y2="150" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4" />
                
                {/* Nodes */}
                <circle cx="150" cy="100" r="20" fill="hsl(var(--primary))" />
                <circle cx="70" cy="50" r="14" fill="hsl(var(--teal))" />
                <circle cx="230" cy="50" r="14" fill="hsl(var(--violet))" />
                <circle cx="70" cy="150" r="14" fill="hsl(var(--accent))" opacity="0.5" />
                <circle cx="230" cy="150" r="14" fill="hsl(var(--muted))" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="3" />
                
                {/* Labels */}
                <text x="150" y="145" textAnchor="middle" className="fill-muted-foreground text-[10px]">Core concept</text>
                <text x="70" y="30" textAnchor="middle" className="fill-teal text-[10px]">Mastered</text>
                <text x="230" y="30" textAnchor="middle" className="fill-violet text-[10px]">In progress</text>
                <text x="70" y="175" textAnchor="middle" className="fill-muted-foreground text-[10px]">Weak area</text>
                <text x="230" y="175" textAnchor="middle" className="fill-muted-foreground text-[10px]">Not started</text>
              </svg>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="py-20 md:py-28 bg-hero-gradient">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to learn with structure?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join early users mastering complex systems through connected, intentional learning.
          </p>
          <Button asChild variant="hero-white" size="xl">
            <Link to="/try">
              Join the Beta
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Domains Footer */}
      <Section className="py-12 bg-card border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">Current focus areas</p>
          <div className="flex flex-wrap justify-center gap-3">
            {domains.map((domain) => (
              <span 
                key={domain}
                className="px-4 py-1.5 text-sm text-foreground bg-muted/50 rounded-full"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </Layout>
  );
}
