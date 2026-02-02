import { useState, useEffect } from "react";

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

  const getTimezone = () => {
    const shortTz = new Date().toLocaleTimeString("en-US", { timeZoneName: "short" }).split(" ").pop();
    return shortTz || "Local";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 border border-primary/20">
        <span className="text-sm font-mono font-semibold text-foreground tabular-nums">
          {formatTime(time)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20">
      <span className="text-base font-mono font-semibold text-foreground tabular-nums">
        {formatTime(time)}
      </span>
      <span className="text-sm text-muted-foreground font-medium">
        {getTimezone()}
      </span>
    </div>
  );
}
