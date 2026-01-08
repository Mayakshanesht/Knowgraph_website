import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { HeroCanvasAnimation } from "@/components/HeroCanvasAnimation";
import { LearningChallenges } from "@/components/LearningChallenges";
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
  TrendingUp,
  CheckCircle,
  Zap,
  Target
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

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
  const [interestedPlans, setInterestedPlans] = useState<Record<string, boolean>>({});

  const handlePlanInterest = async (planName: string) => {
    // Mark as interested locally
    setInterestedPlans(prev => ({ ...prev, [planName]: true }));

    try {
      await supabase
        .from("beta_signups")
        .insert({
          name: "Interested User",
          email: `interested_${planName.toLowerCase().replace(/\s+/g, '_')}@knowgraph.app`,
          role: "interested",
          interested_plans: [planName.toLowerCase().replace(/\s+/g, '-')],
          source_page: "Pricing",
        });

      toast({
        title: "Interest noted!",
        description: `We'll keep you updated about the ${planName} plan.`,
      });
    } catch (error) {
      console.error("Error storing interest:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section - Canvas Animation Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
        {/* Canvas Animation Background - full screen, positioned at top */}
        <div className="absolute inset-0">
          <HeroCanvasAnimation />
        </div>
        
        {/* Content overlay - positioned much lower to give animation more space */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 mt-64 md:mt-72 lg:mt-80">
          <div className="max-w-4xl mx-auto text-center">
            <p 
              className="text-2xl md:text-3xl lg:text-4xl text-foreground font-bold mb-6"
              style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2s forwards', opacity: 0 }}
            >
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Learn complex systems, one Capsule at a time.</span>
            </p>
            
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{ animation: 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.2s forwards', opacity: 0 }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-2 border-primary/30">
                <Link to="/app-demo">
                  Try KnowGraph App
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10">
                <span>
                  View Pricing
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Learning Challenges - Real Problems, Real Solutions */}
      <LearningChallenges />

      {/* How KnowGraph Works - Clear Solution Fit */}
      <Section className="py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              From Confusion to Clarity, One Capsule at a Time
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Structured, connected learning for a world where knowledge changes daily.</span>
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              KnowGraph transforms overwhelming information into structured, connected understanding that actually sticks.
            </p>
          </div>
          
          {/* Three-Step Process */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Start with Your Goal</h3>
              <p className="text-muted-foreground mb-4">
                Choose what you want to master—exam prep, career skills, or new domains
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <CheckCircle className="w-4 h-4" />
                <span>Personalized learning path created</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-violet/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-violet" />
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-violet text-violet-foreground flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Learn in Focused Capsules</h3>
              <p className="text-muted-foreground mb-4">
                5-10 minute targeted lessons that build on each other perfectly
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-violet">
                <CheckCircle className="w-4 h-4" />
                <span>Each capsule: 40 sec - 1.5 min focused learning</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-teal" />
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-teal text-teal-foreground flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">See Your Knowledge Grow</h3>
              <p className="text-muted-foreground mb-4">
                Watch your understanding expand through visual knowledge graphs
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-teal">
                <CheckCircle className="w-4 h-4" />
                <span>Connected understanding that lasts</span>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              The Result? Learning That Actually Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">3x</div>
                <p className="text-muted-foreground">Faster concept mastery</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-violet mb-2">87%</div>
                <p className="text-muted-foreground">Better retention rates</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal mb-2">92%</div>
                <p className="text-muted-foreground">Feel more confident</p>
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
      <Section id="pricing" className="py-24 md:py-32 bg-background">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Plans & Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            KnowGraph uses credits. 1 credit ≈ 1 Capsule.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft card-hover flex flex-col">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Explorer
            </h3>
            <div className="mb-4">
              <span className="text-2xl font-bold text-foreground">₹0</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mb-4"
              onClick={() => handlePlanInterest("Explorer")}
              disabled={interestedPlans["Explorer"]}
            >
              {interestedPlans["Explorer"] ? "Interest noted ✓" : "I'm interested"}
            </Button>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft card-hover flex flex-col">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Learner
            </h3>
            <div className="mb-4">
              <span className="text-2xl font-bold text-foreground">₹999 / month</span>
              <span className="text-sm text-muted-foreground ml-2">(€13 / month)</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mb-4"
              onClick={() => handlePlanInterest("Learner")}
              disabled={interestedPlans["Learner"]}
            >
              {interestedPlans["Learner"] ? "Interest noted ✓" : "I'm interested"}
            </Button>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft card-hover flex flex-col">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Professional
            </h3>
            <div className="mb-4">
              <span className="text-2xl font-bold text-foreground">₹2,499 / month</span>
              <span className="text-sm text-muted-foreground ml-2">(€25 / month)</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mb-4"
              onClick={() => handlePlanInterest("Professional")}
              disabled={interestedPlans["Professional"]}
            >
              {interestedPlans["Professional"] ? "Interest noted ✓" : "I'm interested"}
            </Button>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft card-hover flex flex-col">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Student Pro
            </h3>
            <div className="mb-4">
              <span className="text-2xl font-bold text-foreground">₹4,999 / month</span>
              <span className="text-sm text-muted-foreground ml-2">(€49 / month)</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mb-4"
              onClick={() => handlePlanInterest("Student Pro")}
              disabled={interestedPlans["Student Pro"]}
            >
              {interestedPlans["Student Pro"] ? "Interest noted ✓" : "I'm interested"}
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground text-center mt-8">
          No payment collected yet. We're validating demand during beta.
        </p>
      </Section>

      {/* Beta CTA */}
      <Section className="py-20 bg-deep-indigo">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-deep-indigo-foreground/90 mb-8 leading-relaxed">
            KnowGraph is opening gradually to early users who care about understanding, not just consumption.
          </p>
          <Button asChild size="xl" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 border-2 border-primary/30">
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
