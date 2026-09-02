import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Building2, Users } from "lucide-react";

const plans = [
  {
    name: "Free",
    tier: "",
    description: "Learn every day, free forever",
    price: "₹0",
    priceUsd: "$0",
    credits: "5 generations / month",
    color: "border-border",
    features: [
      "Unlimited feed — always free, every tier",
      "20 playground runs a day",
      "Enroll in any free course",
    ],
  },
  {
    name: "Learner",
    tier: "learner",
    priceEur: "€4.99 / month",
    annual: "learner-annual",
    description: "For active learners",
    price: "₹199 / month",
    priceUsd: "$6",
    annualPrice: "₹1,990 / year (2 months free)",
    credits: "30 generations / month",
    color: "border-primary/50",
    highlight: true,
    features: [
      "Everything in Free",
      "100 playground runs a day",
      "Offline courses, streak freezes, certificates",
    ],
  },
  {
    name: "Pro",
    tier: "pro",
    priceEur: "€9.99 / month",
    annual: "pro-annual",
    description: "For heavy daily use",
    price: "₹399 / month",
    priceUsd: "$15",
    annualPrice: "₹3,990 / year (2 months free)",
    credits: "100 generations / month",
    color: "border-teal/50",
    features: [
      "Everything in Learner",
      "300 playground runs a day",
      "Priority generation queue",
    ],
  },
  {
    name: "Creator",
    tier: "creator",
    priceEur: "€29.99 / month",
    annual: "creator-annual",
    description: "Build and sell your own courses",
    price: "₹999 / month",
    priceUsd: "$39",
    annualPrice: "₹9,990 / year (2 months free)",
    credits: "250 generations / month",
    color: "border-violet/50",
    features: [
      "Everything in Pro",
      "Create & publish courses: AI-generated or your own videos",
      "70% revenue share on paid enrollments",
    ],
  },
];

// Recurring INR billing only works with Indian payment methods; everyone
// else subscribes monthly in EUR on dedicated plans.
const IS_INTL = !(
  (navigator.language || "").toUpperCase().endsWith("-IN") ||
  Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Calcutta" ||
  Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Kolkata"
);

export default function Pricing() {
  const uid = new URLSearchParams(window.location.search).get("uid") ?? "";
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 animate-float-up">
              Pricing
            </h1>
            <p className="text-lg text-white/80 animate-float-up delay-200">
              Credit-based plans designed for different learning journeys.
              <br />
              <span className="text-white font-medium">Each capsule: 40 seconds to 1.5 minutes</span>
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
              <p className="text-lg font-heading font-semibold text-foreground mb-1">Card, UPI &amp; international</p>
              <p className="text-sm text-muted-foreground">Secure payments via Razorpay</p>
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
              <div className="mb-4">
                <span className="text-2xl font-bold text-foreground">{IS_INTL && plan.priceEur ? plan.priceEur : plan.price}</span>
                {plan.priceUsd && (
                  <span className="text-sm text-muted-foreground ml-2">({plan.priceUsd})</span>
                )}
              </div>
              <p className="text-sm font-medium text-primary mb-4">{plan.credits}</p>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {plan.tier ? (
                uid ? (
                  <div className="space-y-2">
                    <Button asChild variant={plan.highlight ? "default" : "outline"} size="sm" className="w-full">
                      <a href={`/api/create-payment?uid=${encodeURIComponent(uid)}&tier=${plan.tier}${IS_INTL ? "&intl=1" : ""}`}>
                        Subscribe — {IS_INTL && plan.priceEur ? plan.priceEur : plan.price}
                      </a>
                    </Button>
                    {!IS_INTL && (
                      <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
                        <a href={`/api/create-payment?uid=${encodeURIComponent(uid)}&product=${plan.annual}`}>
                          {plan.annualPrice}
                        </a>
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Open from the Knowgraph app to subscribe
                  </Button>
                )
              ) : (
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href="/app/">Start free in the browser</a>
                </Button>
              )}
            </div>
          ))}
        </div>
      </Section>



      {/* Final CTA */}
      <Section className="py-20 hero-gradient">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-4">
            Start learning today
          </h2>
          <p className="text-white/80 mb-8">
            Start free — upgrade any time for the full catalogue and courses.
          </p>
          <Button asChild variant="default" size="lg" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-2 border-primary/30">
            <a href="/app/">
              Open Knowgraph — free
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
