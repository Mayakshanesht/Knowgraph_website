import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const roles = [
  { value: "student", label: "Student" },
  { value: "researcher", label: "Researcher" },
  { value: "engineer", label: "Engineer" },
  { value: "educator", label: "Educator" },
  { value: "other", label: "Other" },
];

const interests = [
  { value: "ai", label: "AI" },
  { value: "autonomous-driving", label: "Autonomous Driving" },
  { value: "robotics", label: "Robotics" },
  { value: "controls", label: "Controls" },
  { value: "other", label: "Other" },
];

const planInterests = [
  { value: "free", label: "Free Explorer" },
  { value: "learner", label: "Learner" },
  { value: "professional", label: "Professional" },
  { value: "student-pro", label: "Student Pro" },
  { value: "creator", label: "Creator (notify me)" },
  { value: "enterprise", label: "Enterprise (talk to us)" },
];

export default function Try() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    interest: "",
    plan: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission - in production, this would connect to a backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Request submitted",
      description: "We'll be in touch soon with beta access details.",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <Layout>
        <Section className="pt-32 md:pt-40 min-h-[70vh] flex items-center">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-teal" />
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              You're on the list
            </h1>
            <p className="text-muted-foreground">
              Thank you for your interest in KnowGraph. We're onboarding early users in small batches and will be in touch soon.
            </p>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 bg-hero-gradient animate-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 animate-float-up">
              Join the Beta
            </h1>
            <p className="text-lg text-white/80 animate-float-up delay-200">
              Be among the first to experience graph-based learning for complex systems.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Form */}
      <Section className="py-16">
        <div className="max-w-lg mx-auto">
          <div className="p-8 rounded-3xl bg-card border border-border shadow-elevated">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">Primary Interest Area</Label>
                <Select
                  value={formData.interest}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, interest: value }))
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select your interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {interests.map((interest) => (
                      <SelectItem key={interest.value} value={interest.value}>
                        {interest.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Which plan interests you?</Label>
                <Select
                  value={formData.plan}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, plan: value }))
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {planInterests.map((plan) => (
                      <SelectItem key={plan.value} value={plan.value}>
                        {plan.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your learning goals..."
                  rows={3}
                  className="bg-background"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Join the Beta"}
              </Button>
            </form>
          </div>

          <div className="text-center mt-8 space-y-2">
            <p className="text-sm text-muted-foreground">
              No payment required. Free during beta.
            </p>
            <p className="text-sm text-muted-foreground">
              We're onboarding early users in small batches.
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
