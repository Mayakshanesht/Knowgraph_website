import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const learnerFeatures = [
  "Access to all public Capsules",
  "All learning paths",
  "Progress tracking & analytics",
  "Quizzes and exercises",
  "Knowledge graph visualization",
  "Mastery tracking",
];

const creatorFeatures = [
  "Create Capsules",
  "Build private or public learning paths",
  "Deliver courses using KnowGraph",
  "Learner analytics and insights",
  "Custom branding options",
  "Priority support",
];

export default function Pricing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 bg-hero-gradient animate-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Pricing
            </h1>
            <p className="text-lg text-white/80">
              Simple, transparent pricing for learners and creators.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Learner Plan */}
          <div className="p-8 rounded-2xl bg-card border-2 border-primary shadow-elevated relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary-gradient" />
            <div className="mb-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Learner Subscription
              </h3>
              <p className="text-sm text-muted-foreground">
                Full access to all learning features
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-heading font-bold text-foreground">$10</span>
                <span className="text-muted-foreground">/ month</span>
              </div>
              <p className="text-sm text-muted-foreground">International pricing</p>
              <p className="text-sm text-primary font-medium mt-2">
                ₹499 / month for India
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {learnerFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild variant="hero" className="w-full">
              <a href="#" onClick={(e) => e.preventDefault()}>
                Subscribe via Razorpay
              </a>
            </Button>
          </div>

          {/* Creator Plan */}
          <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
            <div className="mb-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Creator / Instructor Plan
              </h3>
              <p className="text-sm text-muted-foreground">
                For educators, bootcamps, and organizations
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-heading font-semibold text-foreground">Custom Pricing</span>
              </div>
              <p className="text-sm text-muted-foreground">Tailored to your needs</p>
            </div>

            <ul className="space-y-3 mb-8">
              {creatorFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-violet" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" className="w-full">
              <Link to="/try">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-card">
        <SectionHeader
          title="Questions?"
          description="Get in touch to learn more about our plans"
        />
        <div className="max-w-2xl mx-auto text-center">
          <Button asChild variant="hero-outline" size="lg">
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
