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

export default function Try() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    interest: "",
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
        <Section className="pt-24 md:pt-32 min-h-[60vh] flex items-center">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Request Received
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
      <Section className="pt-24 md:pt-32">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Request Beta Access
          </h1>
          <p className="text-lg text-muted-foreground">
            Join early users exploring graph-based learning for complex technical systems.
          </p>
        </div>
      </Section>

      {/* Form */}
      <Section className="pt-8">
        <div className="max-w-lg mx-auto">
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
                <SelectTrigger>
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
                <SelectTrigger>
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
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your learning goals..."
                rows={4}
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Beta Access"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            We're onboarding early users in small batches.
          </p>
        </div>
      </Section>

      {/* Admin Note */}
      <Section className="bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Beta requests are viewable through a secure admin dashboard.
          </p>
        </div>
      </Section>
    </Layout>
  );
}
