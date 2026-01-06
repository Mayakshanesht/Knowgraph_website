import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const roles = [
  { value: "student", label: "Student" },
  { value: "researcher", label: "Researcher" },
  { value: "engineer", label: "Engineer" },
  { value: "educator", label: "Educator" },
  { value: "professional", label: "Professional" },
  { value: "other", label: "Other" },
];

const planOptions = [
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
    message: "",
  });
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("beta_signups")
        .insert({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          interested_plans: selectedPlans,
          message: formData.message || null,
        });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Email already registered",
            description: "You're already on our beta list!",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        setIsSubmitting(false);
        return;
      }

      // Call edge function to send notification email
      try {
        await supabase.functions.invoke("send-beta-notification", {
          body: {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            interested_plans: selectedPlans,
            message: formData.message,
          },
        });
      } catch (emailError) {
        // Don't fail the submission if email fails
        console.error("Failed to send notification email:", emailError);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Request submitted",
        description: "We'll be in touch soon with beta access details.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlanToggle = (planValue: string) => {
    setSelectedPlans((prev) =>
      prev.includes(planValue)
        ? prev.filter((p) => p !== planValue)
        : [...prev, planValue]
    );
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
      <section className="relative pt-28 md:pt-36 pb-16 bg-deep-indigo overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-deep-indigo-foreground mb-6 animate-float-up">
              Join the Beta
            </h1>
            <p className="text-lg text-deep-indigo-foreground/80 animate-float-up delay-200">
              Be among the first to experience graph-based learning for complex systems.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <Section className="py-16">
        <div className="max-w-lg mx-auto">
          <div className="p-8 rounded-3xl bg-card border border-border shadow-elevated">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
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
                <Label htmlFor="email">Email Address *</Label>
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
                <Label htmlFor="role">Role *</Label>
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

              <div className="space-y-3">
                <Label>Which plans interest you?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {planOptions.map((plan) => (
                    <div
                      key={plan.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={plan.value}
                        checked={selectedPlans.includes(plan.value)}
                        onCheckedChange={() => handlePlanToggle(plan.value)}
                      />
                      <label
                        htmlFor={plan.value}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {plan.label}
                      </label>
                    </div>
                  ))}
                </div>
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
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
