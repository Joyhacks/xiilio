import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type LiveStatus = "online" | "busy" | "offline";

const statusConfig: Record<LiveStatus, { label: string; dotClass: string; pulseClass: string }> = {
  online: {
    label: "Online",
    dotClass: "bg-emerald-500",
    pulseClass: "bg-emerald-400",
  },
  busy: {
    label: "Busy",
    dotClass: "bg-amber-500",
    pulseClass: "bg-amber-400",
  },
  offline: {
    label: "Offline",
    dotClass: "bg-muted-foreground/50",
    pulseClass: "",
  },
};

interface AgentStatusIndicatorProps {
  slug?: string;
  className?: string;
}

export function useAgentLiveStatus(slug?: string): LiveStatus {
  const [status, setStatus] = useState<LiveStatus>("online");

  useEffect(() => {
    // Simulate live status — most agents online, occasionally busy
    const statuses: LiveStatus[] = ["online", "online", "online", "busy"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setStatus(randomStatus);

    const interval = setInterval(() => {
      const s = statuses[Math.floor(Math.random() * statuses.length)];
      setStatus(s);
    }, 30000 + Math.random() * 30000); // change every 30-60s

    return () => clearInterval(interval);
  }, [slug]);

  return status;
}

export function AgentStatusIndicator({ slug, className }: AgentStatusIndicatorProps) {
  const status = useAgentLiveStatus(slug);
  const config = statusConfig[status];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="relative flex h-2.5 w-2.5">
        {status !== "offline" && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              config.pulseClass
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-2.5 w-2.5",
            config.dotClass
          )}
        />
      </span>
      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
        {config.label}
      </span>
    </div>
  );
}
