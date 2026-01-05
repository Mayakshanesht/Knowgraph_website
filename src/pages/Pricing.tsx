import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Building2, Users } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Explore the platform",
    credits: "Limited credits",
    color: "border-border",
    features: ["Public Capsules", "Read-only graphs", "Light progress tracking"],
  },
  {
    name: "Learner",
    description: "For active learners",
    credits: "Monthly credits",
    color: "border-primary/50",
    highlight: true,
    features: ["Full learning paths", "Quizzes & exercises", "Personal learning guide", "Progress analytics"],
  },
  {
    name: "Professional",
    description: "For career growth",
    credits: "More credits",
    color: "border-violet/50",
    features: ["Faster recommendations", "Deeper analytics", "Priority support", "Designed for upskilling"],
  },
  {
    name: "Student Pro",
    description: "For serious students",
    credits: "Maximum credits",
    color: "border-teal/50",
    features: ["Deep mastery tracking", "Exam alignment", "Curriculum mapping", "Long-term learning"],
  },
];

export default function Pricing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 bg-hero-gradient animate-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-float-up">
              Pricing
            </h1>
            <p className="text-lg md:text-xl text-white/80 animate-float-up delay-200">
              Credit-based plans designed for different learning journeys.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* How Credits Work */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
            How credits work
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl font-heading font-bold text-primary mb-1">1 credit</p>
              <p className="text-sm text-muted-foreground">= 1 Capsule</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-lg font-heading font-semibold text-foreground mb-1">Top up anytime</p>
              <p className="text-sm text-muted-foreground">Credits can be added later</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-lg font-heading font-semibold text-foreground mb-1">Free during beta</p>
              <p className="text-sm text-muted-foreground">No charges yet</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing Cards */}
      <Section className="py-20">
        <SectionHeader
          title="Choose your plan"
          description="All plans include access to the full KnowGraph platform"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`p-6 rounded-2xl bg-card border-2 ${plan.color} shadow-soft ${plan.highlight ? 'shadow-elevated ring-2 ring-primary/20' : ''}`}
            >
              {plan.highlight && (
                <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
              <p className="text-sm font-medium text-primary mb-4">{plan.credits}</p>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button asChild variant={plan.highlight ? "hero" : "outline"} size="sm" className="w-full">
                <Link to="/try">I'm interested</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Creator & Enterprise */}
      <Section className="py-20 bg-gradient-to-b from-background via-violet/[0.02] to-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Creator */}
            <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
              <div className="w-14 h-14 rounded-xl bg-violet/10 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-violet" />
              </div>
              <span className="inline-block px-3 py-1 text-xs font-medium text-violet bg-violet/10 rounded-full mb-4">
                Coming Soon
              </span>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Creator
              </h3>
              <p className="text-muted-foreground mb-6">
                For educators and content creators
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-violet mt-0.5 flex-shrink-0" />
                  Create Capsules
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-violet mt-0.5 flex-shrink-0" />
                  Host courses
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-violet mt-0.5 flex-shrink-0" />
                  See engagement & learning impact
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/try">
                  Notify me when creator access opens
                </Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7 text-accent" />
              </div>
              <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full mb-4">
                Early Access
              </span>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Enterprise / Institutions
              </h3>
              <p className="text-muted-foreground mb-6">
                For organizations at scale
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  Employee onboarding
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  University courses
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  LMS integrations
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/try">
                  Talk to us (early access)
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="py-20 bg-hero-gradient">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-4">
            No payment required during beta
          </h2>
          <p className="text-white/80 mb-8">
            Help shape the platform while learning for free.
          </p>
          <Button asChild variant="hero-white" size="lg">
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
