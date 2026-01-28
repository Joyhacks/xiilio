import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  BarChart3,
  MessageSquare,
  Mic,
  Clock,
  ArrowLeft,
  TrendingUp,
  Users,
  Calendar,
  Loader2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";

interface ActivityData {
  agent_slug: string;
  activity_type: string;
  summary: string;
  created_at: string;
  details: Record<string, unknown> | null;
}

interface StatsCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

const AGENT_COLORS: Record<string, string> = {
  "julia": "hsl(350, 65%, 55%)",
  "kate": "hsl(270, 60%, 60%)",
  "halle": "hsl(220, 70%, 55%)",
  "george": "hsl(200, 75%, 55%)",
  "arnie": "hsl(180, 60%, 50%)",
  "brad": "hsl(210, 65%, 60%)",
  "sam": "hsl(260, 60%, 55%)",
  "jerry": "hsl(170, 60%, 45%)",
};

const AGENT_NAMES: Record<string, string> = {
  "julia": "Julia",
  "kate": "Kate",
  "halle": "Halle",
  "george": "George",
  "arnie": "Arnie",
  "brad": "Brad",
  "sam": "Sam",
  "jerry": "Jerry",
};

export default function Analytics() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "all">("week");
  const [activities, setActivities] = useState<ActivityData[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load activity data
  useEffect(() => {
    async function loadData() {
      if (!user) return;

      try {
        let query = supabase
          .from("agent_activity_history")
          .select("*")
          .order("created_at", { ascending: false });

        // Filter by time range
        if (timeRange === "week") {
          const weekAgo = subDays(new Date(), 7).toISOString();
          query = query.gte("created_at", weekAgo);
        } else if (timeRange === "month") {
          const monthAgo = subDays(new Date(), 30).toISOString();
          query = query.gte("created_at", monthAgo);
        }

        const { data, error } = await query.limit(500);

        if (error) throw error;
        setActivities((data as ActivityData[]) || []);
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadData();
    }
  }, [user, timeRange]);

  // Calculate statistics
  const stats = {
    totalConversations: activities.filter((a) => a.activity_type === "conversation").length,
    messagesExchanged: activities.filter((a) => a.activity_type === "message").length,
    voiceInteractions: activities.filter((a) => a.activity_type === "voice").length,
    avgResponseTime: "1.2s",
  };

  // Agent usage breakdown
  const agentUsage = Object.entries(
    activities.reduce((acc, activity) => {
      const slug = activity.agent_slug;
      acc[slug] = (acc[slug] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([slug, count]) => ({
      name: AGENT_NAMES[slug] || slug,
      value: count,
      color: AGENT_COLORS[slug] || "hsl(var(--primary))",
    }))
    .sort((a, b) => b.value - a.value);

  // Daily activity chart data
  const dailyActivity = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    const dateStr = format(date, "yyyy-MM-dd");
    const dayActivities = activities.filter(
      (a) => format(new Date(a.created_at), "yyyy-MM-dd") === dateStr
    );
    return {
      date: format(date, "EEE"),
      messages: dayActivities.filter((a) => a.activity_type === "message").length,
      voice: dayActivities.filter((a) => a.activity_type === "voice").length,
    };
  });

  const statsCards: StatsCard[] = [
    {
      title: t("analytics.totalConversations"),
      value: stats.totalConversations,
      icon: <Users className="w-5 h-5" />,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: t("analytics.messagesExchanged"),
      value: stats.messagesExchanged,
      icon: <MessageSquare className="w-5 h-5" />,
      change: "+8%",
      changeType: "positive",
    },
    {
      title: t("analytics.voiceInteractions"),
      value: stats.voiceInteractions,
      icon: <Mic className="w-5 h-5" />,
      change: "+23%",
      changeType: "positive",
    },
    {
      title: t("analytics.avgResponseTime"),
      value: stats.avgResponseTime,
      icon: <Clock className="w-5 h-5" />,
      change: "-0.3s",
      changeType: "positive",
    },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-8 h-8 text-primary" />
                  {t("analytics.title")}
                </h1>
                <p className="text-muted-foreground">{t("analytics.subtitle")}</p>
              </div>
            </div>

            <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
              <TabsList>
                <TabsTrigger value="week">{t("analytics.thisWeek")}</TabsTrigger>
                <TabsTrigger value="month">{t("analytics.thisMonth")}</TabsTrigger>
                <TabsTrigger value="all">{t("analytics.allTime")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">{stat.icon}</div>
                  {stat.change && (
                    <span
                      className={`text-xs font-medium flex items-center gap-1 ${
                        stat.changeType === "positive"
                          ? "text-green-500"
                          : stat.changeType === "negative"
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Daily Activity Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-card border border-border/50"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Daily Activity
              </h3>
              {dailyActivity.some((d) => d.messages > 0 || d.voice > 0) ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dailyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Bar dataKey="messages" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="voice" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  {t("analytics.noData")}
                </div>
              )}
            </motion.div>

            {/* Agent Usage Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-card border border-border/50"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {t("analytics.agentUsage")}
              </h3>
              {agentUsage.length > 0 ? (
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="60%" height={250}>
                    <PieChart>
                      <Pie
                        data={agentUsage}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                      >
                        {agentUsage.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {agentUsage.slice(0, 5).map((agent) => (
                      <div key={agent.name} className="flex items-center gap-2 text-sm">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: agent.color }}
                        />
                        <span className="text-foreground">{agent.name}</span>
                        <span className="text-muted-foreground">({agent.value})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  {t("analytics.noData")}
                </div>
              )}
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-card border border-border/50"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t("analytics.recentActivity")}
            </h3>
            {activities.length > 0 ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {activities.slice(0, 10).map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{
                        backgroundColor: AGENT_COLORS[activity.agent_slug] || "hsl(var(--primary))",
                      }}
                    >
                      {AGENT_NAMES[activity.agent_slug]?.charAt(0) || "A"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.summary}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {AGENT_NAMES[activity.agent_slug]} •{" "}
                        {format(new Date(activity.created_at), "MMM d, h:mm a")}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.activity_type === "voice"
                          ? "bg-accent/20 text-accent"
                          : activity.activity_type === "message"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {activity.activity_type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                {t("analytics.noData")}
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
