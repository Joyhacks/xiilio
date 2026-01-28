import { AgentCard } from "@/components/AgentCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Phone,
  Mail,
  Bell,
  CheckSquare,
  BarChart3,
} from "lucide-react";

const agents = [
  {
    name: "Booking Agent",
    description:
      "Automatically schedules appointments, manages calendars, and handles rescheduling with clients.",
    icon: Calendar,
    status: "active" as const,
    tasksCompleted: 2847,
    color: "booking" as const,
    features: ["Calendar Sync", "Auto-Schedule", "Reminders"],
  },
  {
    name: "Call Agent",
    description:
      "Handles inbound and outbound calls, transcribes conversations, and manages follow-ups.",
    icon: Phone,
    status: "active" as const,
    tasksCompleted: 1523,
    color: "calls" as const,
    features: ["Voice AI", "Transcription", "Call Routing"],
  },
  {
    name: "Email Agent",
    description:
      "Drafts, sends, and responds to emails automatically while maintaining your brand voice.",
    icon: Mail,
    status: "active" as const,
    tasksCompleted: 5291,
    color: "email" as const,
    features: ["Auto-Reply", "Templates", "Scheduling"],
  },
  {
    name: "Reminder Agent",
    description:
      "Sets and manages reminders, sends notifications, and ensures nothing falls through the cracks.",
    icon: Bell,
    status: "idle" as const,
    tasksCompleted: 892,
    color: "reminder" as const,
    features: ["Smart Alerts", "Multi-Channel", "Priority"],
  },
  {
    name: "Task Agent",
    description:
      "Creates, assigns, and tracks tasks across your team with intelligent prioritization.",
    icon: CheckSquare,
    status: "configuring" as const,
    tasksCompleted: 1104,
    color: "tasks" as const,
    features: ["Auto-Assign", "Dependencies", "Deadlines"],
  },
  {
    name: "Analytics Agent",
    description:
      "Monitors performance, generates reports, and provides actionable insights for your business.",
    icon: BarChart3,
    status: "active" as const,
    tasksCompleted: 456,
    color: "analytics" as const,
    features: ["Real-time", "Custom Reports", "Predictions"],
  },
];

export function AgentsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section className="relative py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Your <span className="text-gradient">AI Workforce</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six specialized agents working together to automate every aspect of
            your business operations.
          </p>
        </div>

        {/* Agents grid */}
        <div
          ref={gridRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-out delay-150",
            gridVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          )}
        >
          {agents.map((agent) => (
            <AgentCard key={agent.name} {...agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
