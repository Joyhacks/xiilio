import { useState, useEffect } from "react";
import { Globe, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TimeZone {
  id: string;
  label: string;
  city: string;
  offset: string;
}

const TIMEZONES: TimeZone[] = [
  { id: "America/New_York", label: "EST", city: "New York", offset: "-5" },
  { id: "America/Los_Angeles", label: "PST", city: "Los Angeles", offset: "-8" },
  { id: "America/Chicago", label: "CST", city: "Chicago", offset: "-6" },
  { id: "Europe/London", label: "GMT", city: "London", offset: "0" },
  { id: "Europe/Paris", label: "CET", city: "Paris", offset: "+1" },
  { id: "Europe/Berlin", label: "CET", city: "Berlin", offset: "+1" },
  { id: "Asia/Tokyo", label: "JST", city: "Tokyo", offset: "+9" },
  { id: "Asia/Shanghai", label: "CST", city: "Shanghai", offset: "+8" },
  { id: "Asia/Dubai", label: "GST", city: "Dubai", offset: "+4" },
  { id: "Australia/Sydney", label: "AEDT", city: "Sydney", offset: "+11" },
  { id: "Asia/Singapore", label: "SGT", city: "Singapore", offset: "+8" },
  { id: "Asia/Mumbai", label: "IST", city: "Mumbai", offset: "+5:30" },
];

function getTimeInTimezone(timezone: string): string {
  try {
    return new Date().toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "--:--";
  }
}

function getDateInTimezone(timezone: string): string {
  try {
    return new Date().toLocaleDateString("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

interface WorldClockProps {
  children: React.ReactNode;
}

export function WorldClock({ children }: WorldClockProps) {
  const [times, setTimes] = useState<Record<string, { time: string; date: string }>>({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, { time: string; date: string }> = {};
      TIMEZONES.forEach((tz) => {
        newTimes[tz.id] = {
          time: getTimeInTimezone(tz.id),
          date: getDateInTimezone(tz.id),
        };
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get local timezone
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const localDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden glass-luxury border-primary/20">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Globe className="w-5 h-5 text-primary" />
            World Clock
          </DialogTitle>
        </DialogHeader>
        
        {/* Local Time - Featured */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Your Local Time</p>
              <p className="text-sm font-medium text-foreground truncate max-w-[180px]">
                {localTimezone.split("/").pop()?.replace(/_/g, " ")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-mono font-bold text-primary tabular-nums">
                {localTime}
              </p>
              <p className="text-xs text-muted-foreground">{localDate}</p>
            </div>
          </div>
        </div>

        {/* World Timezones Grid */}
        <div className="overflow-y-auto max-h-[45vh] pr-1 space-y-2">
          {TIMEZONES.map((tz) => (
            <div
              key={tz.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-primary/10 hover:bg-primary/5 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{tz.city}</p>
                <p className="text-xs text-muted-foreground">
                  {tz.label} (UTC{tz.offset})
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-mono font-semibold text-foreground tabular-nums">
                  {times[tz.id]?.time || "--:--"}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {times[tz.id]?.date || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
