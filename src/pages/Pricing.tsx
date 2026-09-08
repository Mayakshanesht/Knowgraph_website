import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Building2, Users } from "lucide-react";
import { PRICING } from "@/pricing.generated";

/**
 * The plans come from pricing.generated.ts, written from pipeline/pricing.py.
 *
 * They used to be typed out here: five tiers with EUR4.99/EUR9.99/EUR29.99
 * literals, while the app rendered the generated table and D1 held a third
 * set. A visitor could be shown one price on the site and charged another at
 * checkout, which costs trust rather than money.
 */
type Plan = {
  name: string;
  tier: string;
  description: string;
  price: string;
  priceEur: string | null;
  annual: string | null;
  annualPrice: string | null;
  credits: string;
  features: readonly string[];
  color: string;
  highlight?: boolean;
  contactOnly: boolean;
};

const COLOR: Record<string, string> = {
  free: "border-border",
  pro: "border-primary/50",
  team: "border-teal/50",
  enterprise: "border-amber/50",
  create_free: "border-border",
  creator: "border-violet/50",
  studio: "border-amber/50",
};

const inr = (n: number) => `\u20b9${n.toLocaleString("en-IN")}`;

/** The shape both books share, without the `as const` literal types. */
type Tier = {
  key: string;
  name: string;
  eurMonth: number | null;
  eurYear: number | null;
  inrMonth: number | null;
  inrYear: number | null;
  generations: number | null;
  blurb: string;
  features: readonly string[];
  seatMin: number;
  contactOnly: boolean;
};

function toPlan(t: Tier): Plan {
  const paid = !t.contactOnly && (t.inrMonth ?? 0) > 0;
  const seats = t.seatMin > 1 ? ` \u00b7 min ${t.seatMin} seats` : "";
  return {
    name: t.name,
    // A tier with no self-serve price is quoted, never checked out.
    tier: paid ? t.key : "",
    description: t.blurb,
    price: t.contactOnly
      ? "Let's talk"
      : (t.inrMonth ?? 0) > 0
        ? `${inr(t.inrMonth as number)} / month${seats}`
        : "Free",
    priceEur:
      t.contactOnly || !(t.eurMonth ?? 0) ? null : `\u20ac${t.eurMonth} / month`,
    annual: (t.inrYear ?? 0) > 0 ? `${t.key}-annual` : null,
    annualPrice:
      (t.inrYear ?? 0) > 0 ? `${inr(t.inrYear as number)} / year` : null,
    credits:
      typeof t.generations === "number"
        ? `${t.generations} generations / month`
        : "Unlimited watching",
    features: t.features,
    contactOnly: t.contactOnly,
    color: COLOR[t.key] ?? "border-border",
    highlight: t.key === "pro" || t.key === "creator",
  };
}

const LEARN_PLANS: Plan[] = (PRICING.learn as readonly Tier[]).map(toPlan);
const CREATE_PLANS: Plan[] = (PRICING.create as readonly Tier[]).map(toPlan);

// Recurring INR billing only works with Indian payment methods; everyone
// else subscribes monthly in EUR on dedicated plans.
const IS_INTL = !(
  (navigator.language || "").toUpperCase().endsWith("-IN") ||
  Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Calcutta" ||
  Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Kolkata"
);

function PlanCard({ plan, uid }: { plan: Plan; uid: string }) {
  // Anyone can subscribe from the website. A visitor without the app pays as
  // a guest: the webhook parks the plan against their payment email and the
  // first sign-in with that email claims it — the same path course buyers use.
  const buyer = uid || "web-guest";
  const shown = IS_INTL && plan.priceEur ? plan.priceEur : plan.price;
  return (
    <div
      className={`p-6 rounded-2xl bg-card border-2 ${plan.color} shadow-soft ${plan.highlight ? "shadow-elevated ring-2 ring-primary/20" : ""}`}
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
        <span className="text-2xl font-bold text-foreground">{shown}</span>
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
        <div className="space-y-2">
          <Button asChild variant={plan.highlight ? "default" : "outline"} size="sm" className="w-full">
            <a href={`/api/create-payment?uid=${encodeURIComponent(buyer)}&tier=${plan.tier}${IS_INTL ? "&intl=1" : ""}`}>
              Subscribe — {shown}
            </a>
          </Button>
          {!IS_INTL && plan.annual && (
            <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
              <a href={`/api/create-payment?uid=${encodeURIComponent(buyer)}&product=${plan.annual}`}>
                {plan.annualPrice}
              </a>
            </Button>
          )}
          {!uid && (
            <p className="text-[11px] text-muted-foreground text-center leading-snug">
              Pay with any email — your plan unlocks when you sign in to the
              app with it.
            </p>
          )}
        </div>
      ) : plan.contactOnly ? (
        <Button asChild variant="outline" size="sm" className="w-full">
          <a href="/contact">Talk to us</a>
        </Button>
      ) : (
        <Button asChild variant="outline" size="sm" className="w-full">
          <a href="/app/">Start free in the browser</a>
        </Button>
      )}
    </div>
  );
}

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

        {/* Learn */}
        <Section className="py-20">
          <SectionHeader
            title="Learn"
            description="Watch, practise and follow structured paths. Free forever to watch."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {LEARN_PLANS.map((plan) => (
              <PlanCard key={plan.name} plan={plan} uid={uid} />
            ))}
          </div>
        </Section>

        {/* Create */}
        <Section className="py-20">
          <SectionHeader
            title="Create"
            description="Generate your own reels and courses, and export them to any LMS."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CREATE_PLANS.map((plan) => (
              <PlanCard key={plan.name} plan={plan} uid={uid} />
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
