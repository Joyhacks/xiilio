import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Clock,
  Users,
  ArrowRight,
  Loader2,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// Avatar imports
import juliaAvatar from "@/assets/avatars/julia-receptionist.png";
import kateAvatar from "@/assets/avatars/kate-assistant.png";
import halleAvatar from "@/assets/avatars/halle-legal.png";
import georgeAvatar from "@/assets/avatars/george-social.png";
import arnieAvatar from "@/assets/avatars/arnie-writer.png";
import bradAvatar from "@/assets/avatars/brad-sales.png";
import samAvatar from "@/assets/avatars/sam-coach.png";
import jerryAvatar from "@/assets/avatars/jerry-finance.png";

const agentMeta: Record<string, { name: string; role: string; avatar: string; color: string }> = {
  julia: { name: "Receptionist Julia", role: "Front Desk", avatar: juliaAvatar, color: "receptionist" },
  kate: { name: "Executive Assistant Kate", role: "Executive Support", avatar: kateAvatar, color: "assistant" },
  halle: { name: "Legal Associate Halle", role: "Legal & Compliance", avatar: halleAvatar, color: "legal" },
  george: { name: "Social Media Manager George", role: "Social Media", avatar: georgeAvatar, color: "social" },
  arnie: { name: "Blog Writer Arnie", role: "Content & SEO", avatar: arnieAvatar, color: "writer" },
  brad: { name: "Sales Associate Brad", role: "Sales & Leads", avatar: bradAvatar, color: "sales" },
  sam: { name: "Life Coach Sam", role: "Motivation", avatar: samAvatar, color: "coach" },
  jerry: { name: "Financial Planner Jerry", role: "Finance", avatar: jerryAvatar, color: "finance" },
};

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

interface ActivityItem {
  id: string;
  agent_slug: string;
  activity_type: string;
  summary: string;
  details: Record<string, unknown> | null;
  created_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch all user activity to determine which agents they've used
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["user-all-activity", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("agent_activity_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      return data as ActivityItem[];
    },
    enabled: !!user,
  });

  // Fetch user profile for personalized greeting
  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from("user_profiles")
        .select("full_name, company_name")
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  // Get unique agents the user has interacted with
  const usedAgentSlugs = [...new Set(activities?.map((a) => a.agent_slug) || [])];
  const usedAgents = usedAgentSlugs
    .filter((slug) => agentMeta[slug])
    .map((slug) => ({
      slug,
      ...agentMeta[slug],
      lastActivity: activities?.find((a) => a.agent_slug === slug)?.created_at,
      interactionCount: activities?.filter((a) => a.agent_slug === slug).length || 0,
    }));

  // Recent activity (last 10)
  const recentActivity = activities?.slice(0, 10) || [];

  // Stats
  const totalConversations = activities?.filter((a) => a.activity_type === "chat_completed").length || 0;
  const activeAgents = usedAgentSlugs.length;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const greeting = profile?.full_name ? `Welcome back, ${profile.full_name.split(" ")[0]}!` : "Welcome back!";

  return (
    <>
      <SEO
        title="Dashboard"
        description="View your AI agents, conversation history, and manage your account settings."
        canonical="/dashboard"
        noindex
      />
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-6 py-12 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <LayoutDashboard className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl font-bold text-foreground">{greeting}</h1>
                </div>
                <p className="text-muted-foreground">
                  {profile?.company_name
                    ? `Managing AI agents for ${profile.company_name}`
                    : "Your AI agent command center"}
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/settings")} className="gap-2">
                <Settings className="w-4 h-4" />
                Account Settings
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-6 rounded-2xl bg-gradient-card border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{activeAgents}</p>
                    <p className="text-sm text-muted-foreground">Active Agents</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-card border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalConversations}</p>
                    <p className="text-sm text-muted-foreground">Conversations</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-card border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{activities?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Total Activities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Your Agents */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Your Agents
                  </h2>
                  <Link to="/#agents">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {activitiesLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : usedAgents.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-card border border-border/50 text-center">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Agents Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start chatting with an AI agent to see them here.
                    </p>
                    <Button asChild>
                      <Link to="/#agents">Explore Agents</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {usedAgents.map((agent) => (
                      <Link
                        key={agent.slug}
                        to={`/agent/${agent.slug}`}
                        className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className={cn("w-14 h-14 ring-2", `ring-agent-${agent.color}/30`)}>
                            <AvatarImage src={agent.avatar} alt={agent.name} />
                            <AvatarFallback>{agent.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                              {agent.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{agent.role}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Badge variant="secondary" className="text-xs">
                                {agent.interactionCount} interactions
                              </Badge>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </h2>

                <div className="p-4 rounded-2xl bg-card border border-border/50 space-y-4 max-h-[500px] overflow-y-auto">
                  {activitiesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : recentActivity.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-sm text-muted-foreground">No activity yet</p>
                    </div>
                  ) : (
                    recentActivity.map((activity) => {
                      const IconComponent = activityIcons[activity.activity_type] || Zap;
                      const colorClass = activityColors[activity.activity_type] || "text-muted-foreground bg-muted";
                      const agent = agentMeta[activity.agent_slug];

                      return (
                        <div key={activity.id} className="flex gap-3">
                          <div
                            className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                              colorClass
                            )}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">{activity.summary}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {agent && (
                                <span className="text-xs text-muted-foreground">{agent.name.split(" ")[0]}</span>
                              )}
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quick Links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2" asChild>
                      <Link to="/settings">
                        <Settings className="w-4 h-4" />
                        Account Settings
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2" asChild>
                      <Link to="/pricing">
                        <TrendingUp className="w-4 h-4" />
                        View Plans
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2" asChild>
                      <Link to="/docs">
                        <MessageSquare className="w-4 h-4" />
                        Documentation
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}