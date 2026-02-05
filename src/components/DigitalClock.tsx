import { useState, useEffect } from "react";
import { WorldClock } from "@/components/WorldClock";

interface DigitalClockProps {
  compact?: boolean;
}

export function DigitalClock({ compact = false }: DigitalClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getTimezone = () => {
    const shortTz = new Date().toLocaleTimeString("en-US", { timeZoneName: "short" }).split(" ").pop();
    return shortTz || "Local";
  };

  if (compact) {
    return (
      <WorldClock>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
          <span className="text-sm font-mono font-semibold text-foreground tabular-nums">
            {formatTime(time)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(time)}
          </span>
        </button>
      </WorldClock>
    );
  }

  return (
    <WorldClock>
      <button className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
        <span className="text-lg font-mono font-semibold text-foreground tabular-nums">
          {formatTime(time)}
        </span>
        <span className="text-sm text-muted-foreground font-medium">
          {formatDate(time)}
        </span>
        <span className="text-sm text-muted-foreground/70">
          {getTimezone()}
        </span>
      </button>
    </WorldClock>
  );
}
