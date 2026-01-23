import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AgentCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  status: "active" | "idle" | "configuring";
  tasksCompleted: number;
  color: "booking" | "calls" | "email" | "reminder" | "tasks" | "analytics";
  features: string[];
}

const colorClasses = {
  booking: {
    bg: "bg-agent-booking/10",
    border: "border-agent-booking/30",
    text: "text-agent-booking",
    glow: "agent-glow-booking",
  },
  calls: {
    bg: "bg-agent-calls/10",
    border: "border-agent-calls/30",
    text: "text-agent-calls",
    glow: "agent-glow-calls",
  },
  email: {
    bg: "bg-agent-email/10",
    border: "border-agent-email/30",
    text: "text-agent-email",
    glow: "agent-glow-email",
  },
  reminder: {
    bg: "bg-agent-reminder/10",
    border: "border-agent-reminder/30",
    text: "text-agent-reminder",
    glow: "agent-glow-reminder",
  },
  tasks: {
    bg: "bg-agent-tasks/10",
    border: "border-agent-tasks/30",
    text: "text-agent-tasks",
    glow: "agent-glow-tasks",
  },
  analytics: {
    bg: "bg-agent-analytics/10",
    border: "border-agent-analytics/30",
    text: "text-agent-analytics",
    glow: "agent-glow-analytics",
  },
};

const statusStyles = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  idle: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  configuring: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export function AgentCard({
  name,
  description,
  icon: Icon,
  status,
  tasksCompleted,
  color,
  features,
}: AgentCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={cn(
        "group relative p-6 rounded-2xl bg-gradient-card border border-border/50 transition-all duration-500",
        "hover:border-border hover:scale-[1.02]",
        status === "active" && colors.glow
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
            colors.bg,
            colors.border,
            "border"
          )}
        >
          <Icon className={cn("w-7 h-7", colors.text)} />
        </div>
        <Badge variant="outline" className={cn("text-xs", statusStyles[status])}>
          {status === "active" && "● "}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-6">
        {features.slice(0, 3).map((feature) => (
          <span
            key={feature}
            className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div>
          <div className={cn("text-2xl font-display font-bold", colors.text)}>
            {tasksCompleted.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Tasks completed</div>
        </div>
        <Button variant="agent" size="sm">
          Configure
        </Button>
      </div>
    </div>
  );
}
