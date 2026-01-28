import { forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Loader2, MessageSquare, Settings, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityHistoryProps {
  agentSlug: string;
}

interface ActivityItem {
  id: string;
  agent_slug: string;
  activity_type: string;
  summary: string;
  details: Record<string, unknown> | null;
  created_at: string;
}

const activityIcons: Record<string, typeof MessageSquare> = {
  chat_completed: MessageSquare,
  configuration_updated: Settings,
  task_executed: Zap,
};

const activityColors: Record<string, string> = {
  chat_completed: "text-emerald-400 bg-emerald-500/20",
  configuration_updated: "text-blue-400 bg-blue-500/20",
  task_executed: "text-amber-400 bg-amber-500/20",
};

export const ActivityHistory = forwardRef<HTMLDivElement, ActivityHistoryProps>(
  function ActivityHistory({ agentSlug }, ref) {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["agent-activity", agentSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agent_activity_history")
        .select("*")
        .eq("agent_slug", agentSlug)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as ActivityItem[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
        <h4 className="text-lg font-semibold text-foreground mb-2">No Activity Yet</h4>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Activity will appear here as you interact with this agent. Start a chat or update
          settings to see the history.
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {activities.length} events
        </span>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const IconComponent = activityIcons[activity.activity_type] || Zap;
            const colorClass = activityColors[activity.activity_type] || "text-muted-foreground bg-muted";

            return (
              <div key={activity.id} className="relative flex gap-4 pl-2">
                {/* Icon */}
                <div
                  className={cn(
                    "relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                    colorClass
                  )}
                >
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "flex-1 p-4 rounded-lg bg-card border border-border/50",
                    index === 0 && "ring-1 ring-primary/20"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-foreground">{activity.summary}</p>
                      {activity.details && Object.keys(activity.details).length > 0 && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          {activity.activity_type === "configuration_updated" &&
                            activity.details.changes && (
                              <span>
                                Updated:{" "}
                                {Object.keys(activity.details.changes as Record<string, unknown>).join(", ")}
                              </span>
                            )}
                          {activity.activity_type === "chat_completed" && (
                            <span>
                              Messages: {(activity.details as { messageCount?: number }).messageCount || "N/A"}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
);

ActivityHistory.displayName = "ActivityHistory";
