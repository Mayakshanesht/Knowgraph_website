import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { HeroCanvasAnimation } from "@/components/HeroCanvasAnimation";
import { AttentionParadox } from "@/components/AttentionParadox";
import { LearningAnalytics } from "@/components/LearningAnalytics";
import { 
  ArrowRight,
  Users,
  GraduationCap,
  Briefcase,
  FlaskConical,
  BookOpen,
  Building2,
  Sparkles,
  TrendingUp
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
    credits: "30 credits / month",
    price: "₹0",
    priceUsd: "Free",
    color: "border-primary/30 bg-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    features: ["Public Capsules", "Read-only graphs", "Basic analytics"],
  },
  {
    name: "Learner",
    credits: "150 credits / month",
    price: "₹499 / month",
    priceUsd: "$10",
    color: "border-violet/30 bg-violet/5",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
    features: ["Learning paths", "Quizzes", "Learning analytics"],
  },
  {
    name: "Professional",
    credits: "500 credits / month",
    price: "₹1,499 / month",
    priceUsd: "$25",
    color: "border-accent/30 bg-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    features: ["Advanced analytics", "Faster recommendations", "Priority support"],
  },
  {
    name: "Student Pro",
    credits: "1,200 credits / month",
    price: "₹2,999 / month",
    priceUsd: "$49",
    color: "border-cyan/30 bg-cyan/5",
    iconBg: "bg-cyan/10",
    iconColor: "text-cyan",
    features: ["Deep mastery analytics", "Exam alignment", "Curriculum tracking"],
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
      {/* Hero Section - Canvas Animation Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
        {/* Canvas Animation Background - positioned higher */}
        <div className="absolute inset-0 flex items-start justify-center pt-8">
          <div className="w-full h-[80vh] max-h-[700px]">
            <HeroCanvasAnimation />
          </div>
        </div>
        
        {/* Content overlay */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Text Logo */}
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6"
              style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2s forwards', opacity: 0 }}
            >
              KnowGraph
            </h1>
            
            <p 
              className="text-xl md:text-2xl lg:text-3xl text-foreground font-medium mb-4"
              style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.15s forwards', opacity: 0 }}
            >
              Learn complex systems, one Capsule at a time.
            </p>
            
            <p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
              style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.25s forwards', opacity: 0 }}
            >
              Structured, connected learning for a world where knowledge changes daily.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.35s forwards', opacity: 0 }}
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/try">
                  Join the Beta
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/platform">
                  Explore the Platform
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Attention Paradox - Visual-First Section */}
      <AttentionParadox />

      {/* Core Product Explanation - Visual Infographic */}
      <Section className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              KnowGraph transforms how you learn
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From fragmented content to connected understanding
            </p>
          </div>
          
          {/* Infographic-style visual */}
          <div className="relative">
            <div className="grid lg:grid-cols-3 gap-6 items-start">
              {/* Problem: Long lectures */}
              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                  <span className="text-destructive text-lg font-bold">1h+</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">Long lectures</h3>
                <p className="text-sm text-muted-foreground">Overwhelm. Hard to retain. Easy to zone out.</p>
              </div>

              {/* Problem: Short videos */}
              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20">
                <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-4 bg-destructive/60 rounded-sm" />
                    <div className="w-2 h-6 bg-destructive/40 rounded-sm" />
                    <div className="w-2 h-3 bg-destructive/50 rounded-sm" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">Short videos</h3>
                <p className="text-sm text-muted-foreground">Fragmentation. No connections between ideas.</p>
              </div>

              {/* Solution: Capsules */}
              <div className="p-6 rounded-2xl bg-primary/5 border-2 border-primary/30">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="18" cy="6" r="3" />
                    <circle cx="12" cy="18" r="3" />
                    <path d="M8.5 7.5L10.5 15.5M15.5 7.5L13.5 15.5" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">Capsules + Knowledge Graphs</h3>
                <p className="text-sm text-muted-foreground">One concept at a time. Connected. Clear paths forward.</p>
              </div>
            </div>

            {/* Arrow flow */}
            <div className="hidden lg:flex justify-center items-center mt-8">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Problems</span>
                <ArrowRight className="w-5 h-5 text-primary" />
                <span className="text-sm text-primary font-medium">Solution</span>
                <ArrowRight className="w-5 h-5 text-teal" />
                <span className="text-sm text-teal font-medium">Learning Paths</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Learning Analytics */}
      <LearningAnalytics />

      {/* Who This Is For - Visual Personas */}
      <Section className="py-20 md:py-28 bg-muted/30">
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

      {/* Plans & Pricing - Visible on Home */}
      <Section className="py-24 md:py-32 bg-background">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Plans & Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            KnowGraph uses credits. One credit ≈ one Capsule.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`p-6 rounded-2xl border-2 ${plan.color} bg-card shadow-soft card-hover flex flex-col`}
            >
              <div className={`w-12 h-12 rounded-xl ${plan.iconBg} flex items-center justify-center mb-4`}>
                <Sparkles className={`w-6 h-6 ${plan.iconColor}`} />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{plan.credits}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                {plan.priceUsd !== "Free" && (
                  <span className="text-sm text-muted-foreground ml-2">({plan.priceUsd})</span>
                )}
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="space-y-2">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/try">Join Beta</Link>
                </Button>
                {plan.price !== "₹0" && (
                  <Button asChild size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to="/try">Pay</Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground text-center mt-8">
          Beta access is free. Paid plans help support development.
        </p>
      </Section>

      {/* Beta CTA */}
      <Section className="py-20 bg-deep-indigo">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-deep-indigo-foreground/90 mb-8 leading-relaxed">
            KnowGraph is opening gradually to early users who care about understanding, not just consumption.
          </p>
          <Button asChild size="xl" className="bg-background text-foreground hover:bg-background/90">
            <Link to="/try">
              Join the Beta
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-sm text-deep-indigo-foreground/60 mt-4">
            No payment required. Help shape the platform.
          </p>
        </div>
      </Section>

      {/* Domains Footer */}
      <Section className="py-16 bg-muted/30">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">Current focus domains</p>
          <div className="flex flex-wrap justify-center gap-3">
            {domains.map((domain) => (
              <span 
                key={domain}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground"
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
