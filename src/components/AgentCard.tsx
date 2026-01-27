import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AgentCardProps {
  name: string;
  description: string;
  icon?: LucideIcon;
  avatar?: string;
  status: "active" | "idle" | "configuring";
  tasksCompleted: number;
  color: "booking" | "calls" | "email" | "reminder" | "tasks" | "analytics" | "receptionist" | "assistant" | "legal" | "social" | "writer" | "sales" | "coach" | "finance";
  features: string[];
  slug?: string;
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
  receptionist: {
    bg: "bg-agent-receptionist/10",
    border: "border-agent-receptionist/30",
    text: "text-agent-receptionist",
    glow: "agent-glow-receptionist",
  },
  assistant: {
    bg: "bg-agent-assistant/10",
    border: "border-agent-assistant/30",
    text: "text-agent-assistant",
    glow: "agent-glow-assistant",
  },
  legal: {
    bg: "bg-agent-legal/10",
    border: "border-agent-legal/30",
    text: "text-agent-legal",
    glow: "agent-glow-legal",
  },
  social: {
    bg: "bg-agent-social/10",
    border: "border-agent-social/30",
    text: "text-agent-social",
    glow: "agent-glow-social",
  },
  writer: {
    bg: "bg-agent-writer/10",
    border: "border-agent-writer/30",
    text: "text-agent-writer",
    glow: "agent-glow-writer",
  },
  sales: {
    bg: "bg-agent-sales/10",
    border: "border-agent-sales/30",
    text: "text-agent-sales",
    glow: "agent-glow-sales",
  },
  coach: {
    bg: "bg-agent-coach/10",
    border: "border-agent-coach/30",
    text: "text-agent-coach",
    glow: "agent-glow-coach",
  },
  finance: {
    bg: "bg-agent-finance/10",
    border: "border-agent-finance/30",
    text: "text-agent-finance",
    glow: "agent-glow-finance",
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
  avatar,
  status,
  tasksCompleted,
  color,
  features,
  slug,
}: AgentCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={cn(
        "group relative p-6 rounded-2xl glass-card transition-all duration-500",
        "hover:border-primary/30 hover:scale-[1.02]",
        "hover:shadow-[0_20px_60px_hsl(210_40%_70%/0.15)]",
        status === "active" && colors.glow
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        {avatar ? (
          <Avatar className={cn(
            "w-16 h-16 ring-2 transition-transform duration-300 group-hover:scale-110",
            colors.border.replace("border-", "ring-")
          )}>
            <AvatarImage src={avatar} alt={name} className="object-cover" />
            <AvatarFallback className={cn(colors.bg, colors.text)}>
              {name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
        ) : Icon ? (
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
        ) : null}
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
        {slug ? (
          <Button variant="agent" size="sm" asChild>
            <Link to={`/agent/${slug}`}>Chat Now</Link>
          </Button>
        ) : (
          <Button variant="agent" size="sm">
            Configure
          </Button>
        )}
      </div>
    </div>
  );
}
