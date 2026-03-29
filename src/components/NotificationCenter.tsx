import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  agentSlug?: string;
}

export function NotificationCenter() {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // Show sample notifications for non-auth users
      setNotifications([
        {
          id: "1",
          title: "Welcome to 24TWELVE",
          message: "Sign in to get personalized agent notifications.",
          time: "Just now",
          read: false,
        },
      ]);
      return;
    }

    // Fetch recent activity for authenticated users
    const fetchActivity = async () => {
      const { data } = await supabase
        .from("agent_activity_history")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (data && data.length > 0) {
        setNotifications(
          data.map((item) => ({
            id: item.id,
            title: `${item.agent_slug} — ${item.activity_type}`,
            message: item.summary,
            time: new Date(item.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            read: false,
            agentSlug: item.agent_slug,
          }))
        );
      } else {
        setNotifications([
          {
            id: "empty",
            title: "No activity yet",
            message: "Start chatting with an agent to see notifications here.",
            time: "",
            read: true,
          },
        ]);
      }
    };

    fetchActivity();
  }, [isAuthenticated]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full min-h-0">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-sm text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "px-4 py-3 border-b border-border/50 last:border-0 transition-colors",
                !notification.read && "bg-primary/5"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {notification.message}
                  </p>
                </div>
                {notification.time && (
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {notification.time}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
