import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  color?: string;
}

export function FeatureCard({ icon: Icon, title, description, className, color }: FeatureCardProps) {
  const iconColor = color || "bg-primary/10 text-primary";
  
  return (
    <div
      className={cn(
        "group p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300",
        className
      )}
    >
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors", iconColor)}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
