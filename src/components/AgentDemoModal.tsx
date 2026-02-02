import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Play,
  Users,
  ArrowRight,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  ListTodo,
  Zap,
  Mic,
  Volume2,
  Loader2,
} from "lucide-react";

// Avatar imports
import juliaAvatar from "@/assets/avatars/julia-receptionist.png";
import nicoleAvatar from "@/assets/avatars/nicole-assistant.png";
import halleAvatar from "@/assets/avatars/halle-legal.png";
import georgeAvatar from "@/assets/avatars/george-social.png";
import arnieAvatar from "@/assets/avatars/arnie-writer.png";
import bradAvatar from "@/assets/avatars/brad-sales.png";
import samAvatar from "@/assets/avatars/sam-coach.png";
import jerryAvatar from "@/assets/avatars/jerry-finance.png";

interface AgentInfo {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  description: string;
  capabilities: string[];
  useCases: string[];
  collaboratesWith: string[];
}

const agents: AgentInfo[] = [
  {
    id: "julia",
    name: "Julia",
    role: "Receptionist",
    avatar: juliaAvatar,
    color: "hsl(38, 92%, 50%)",
    description:
      "Your warm and welcoming first point of contact. Julia manages all front desk operations, visitor check-ins, and ensures every interaction starts with a smile.",
    capabilities: [
      "Visitor management & check-in",
      "Call routing & message taking",
      "Appointment scheduling",
      "Package & mail handling",
      "Emergency protocol guidance",
      "Daily briefings & updates",
    ],
    useCases: [
      "Greeting and logging visitors",
      "Directing calls to the right team member",
      "Coordinating meeting room bookings",
      "Sending welcome emails to new visitors",
    ],
    collaboratesWith: ["nicole", "brad", "george"],
  },
  {
    id: "nicole",
    name: "Nicole",
    role: "Executive Assistant",
    avatar: nicoleAvatar,
    color: "hsl(270, 70%, 60%)",
    description:
      "The orchestrator of your business operations. Nicole coordinates across all agents, manages complex workflows, and ensures nothing falls through the cracks.",
    capabilities: [
      "Multi-agent orchestration",
      "Calendar & schedule management",
      "Email drafting & management",
      "Task prioritization",
      "Meeting preparation",
      "Project tracking",
    ],
    useCases: [
      "Coordinating product launch campaigns",
      "Managing client onboarding processes",
      "Scheduling executive meetings",
      "Preparing briefing documents",
    ],
    collaboratesWith: ["julia", "george", "arnie", "brad", "halle", "jerry"],
  },
  {
    id: "halle",
    name: "Halle",
    role: "Legal Associate",
    avatar: halleAvatar,
    color: "hsl(220, 70%, 50%)",
    description:
      "Your fierce protector of legal interests. Halle reviews contracts, ensures compliance, and safeguards your business with precision and expertise.",
    capabilities: [
      "Contract review & drafting",
      "Compliance monitoring",
      "Legal research",
      "Risk assessment",
      "Policy documentation",
      "GDPR & data protection",
    ],
    useCases: [
      "Reviewing vendor agreements",
      "Ensuring regulatory compliance",
      "Drafting NDAs and contracts",
      "Managing data protection policies",
    ],
    collaboratesWith: ["nicole", "brad", "jerry"],
  },
  {
    id: "george",
    name: "George",
    role: "Social Media Manager",
    avatar: georgeAvatar,
    color: "hsl(160, 60%, 45%)",
    description:
      "Your charismatic brand voice across all platforms. George crafts engaging content, monitors trends, and builds your online community with charm.",
    capabilities: [
      "Content creation & scheduling",
      "Social media analytics",
      "Community engagement",
      "Trend monitoring",
      "Competitor analysis",
      "Campaign planning",
    ],
    useCases: [
      "Creating viral-worthy posts",
      "Responding to customer comments",
      "Tracking engagement metrics",
      "Planning seasonal campaigns",
    ],
    collaboratesWith: ["nicole", "arnie", "brad"],
  },
  {
    id: "arnie",
    name: "Arnie",
    role: "Blog Writer",
    avatar: arnieAvatar,
    color: "hsl(0, 70%, 50%)",
    description:
      "Your powerhouse content creator. Arnie pumps out authoritative blog content that builds your brand, drives traffic, and establishes thought leadership.",
    capabilities: [
      "Topic research & ideation",
      "SEO-optimized writing",
      "Content calendar management",
      "Editing & proofreading",
      "Visual content suggestions",
      "Performance tracking",
    ],
    useCases: [
      "Writing in-depth industry articles",
      "Creating how-to guides",
      "Developing content strategies",
      "Optimizing posts for search",
    ],
    collaboratesWith: ["nicole", "george", "brad"],
  },
  {
    id: "brad",
    name: "Brad",
    role: "Sales Associate",
    avatar: bradAvatar,
    color: "hsl(45, 90%, 50%)",
    description:
      "Your star closer with irresistible charm. Brad nurtures leads, builds relationships, and drives revenue with a winning personality.",
    capabilities: [
      "Lead generation & qualification",
      "Sales pipeline management",
      "Customer communication",
      "Product demonstrations",
      "Proposal creation",
      "CRM updates",
    ],
    useCases: [
      "Following up with warm leads",
      "Scheduling product demos",
      "Creating personalized proposals",
      "Tracking sales metrics",
    ],
    collaboratesWith: ["nicole", "julia", "halle", "george"],
  },
  {
    id: "sam",
    name: "Sam",
    role: "Life Coach",
    avatar: samAvatar,
    color: "hsl(280, 60%, 50%)",
    description:
      "Your motivational powerhouse. Sam helps you set goals, stay focused, and unlock your full potential with intensity and inspiration.",
    capabilities: [
      "Goal setting & planning",
      "Motivational coaching",
      "Time management",
      "Stress management",
      "Habit building",
      "Work-life balance",
    ],
    useCases: [
      "Creating personal development plans",
      "Daily motivation and affirmations",
      "Overcoming obstacles",
      "Celebrating achievements",
    ],
    collaboratesWith: ["nicole", "jerry"],
  },
  {
    id: "jerry",
    name: "Jerry",
    role: "Financial Planner",
    avatar: jerryAvatar,
    color: "hsl(200, 70%, 50%)",
    description:
      "Your witty financial guide. Jerry makes money matters entertaining while delivering sharp insights on budgeting, investments, and planning.",
    capabilities: [
      "Budget creation & tracking",
      "Investment guidance",
      "Retirement planning",
      "Tax optimization",
      "Debt management",
      "Financial education",
    ],
    useCases: [
      "Creating monthly budgets",
      "Planning for major purchases",
      "Analyzing spending patterns",
      "Setting savings goals",
    ],
    collaboratesWith: ["nicole", "halle", "sam"],
  },
];

// Collaboration workflow visualization
const collaborationWorkflows = [
  {
    title: "Product Launch Campaign",
    description: "Watch how your AI team collaborates to launch a new product",
    steps: [
      { agent: "nicole", action: "Orchestrates the campaign and assigns tasks" },
      { agent: "arnie", action: "Creates blog content and product guides" },
      { agent: "george", action: "Develops social media strategy and posts" },
      { agent: "brad", action: "Prepares sales materials and follows up with leads" },
      { agent: "halle", action: "Reviews marketing claims for compliance" },
    ],
  },
  {
    title: "Client Onboarding",
    description: "Seamless client onboarding with multi-agent coordination",
    steps: [
      { agent: "julia", action: "Welcomes new client and gathers information" },
      { agent: "nicole", action: "Creates onboarding timeline and coordinates team" },
      { agent: "halle", action: "Prepares contracts and legal documents" },
      { agent: "jerry", action: "Sets up billing and financial arrangements" },
      { agent: "brad", action: "Ensures smooth handoff and client satisfaction" },
    ],
  },
];

interface AgentDemoModalProps {
  trigger?: React.ReactNode;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Agent voice mapping
const agentVoiceMap: Record<string, string> = {
  julia: "EXAVITQu4vr4xnSDxMaL", // Sarah
  kate: "FGY2WhTYpPnrIDTdsKH5", // Laura
  halle: "pFZP5JQG7iQjIQuC4Bku", // Lily
  george: "JBFqnCBsd6RMkjVDRZzb", // George
  arnie: "nPczCjzI2devNBz1zQrb", // Brian
  brad: "TX3LPaxmHKxFdv7VOQHJ", // Liam
  sam: "onwK4e9ZLuTAKqWW03F9", // Daniel
  jerry: "cjVigY5qzO86Huf0OWal", // Eric
};

// Demo greetings for each agent
const agentGreetings: Record<string, string> = {
  julia: "Hello! I'm Julia, your AI receptionist. I'm here to welcome visitors and manage front desk operations.",
  nicole: "Hi there! I'm Nicole, your executive assistant. I coordinate schedules, meetings, and help you stay organized.",
  halle: "Greetings. I'm Halle, your legal associate. I review contracts and ensure compliance with precision.",
  george: "Hey! I'm George, your social media manager. Let me help you build an amazing online presence.",
  arnie: "What's up! I'm Arnie, your content writer. I create powerful blog posts that drive traffic.",
  brad: "Hey there! I'm Brad from sales. I'm here to help you close deals and grow your business.",
  sam: "Hello! I'm Sam, your life coach. I'm here to help you set goals and unlock your potential.",
  jerry: "Hi! I'm Jerry, your financial planner. Let me help you make smart money decisions.",
};

export function AgentDemoModal({ trigger }: AgentDemoModalProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo>(agents[1]); // Nicole as default
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [workflowStep, setWorkflowStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceState, setVoiceState] = useState<"idle" | "loading" | "speaking">("idle");
  const [overviewVoiceState, setOverviewVoiceState] = useState<"idle" | "loading" | "speaking">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const overviewAudioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup audio on unmount or agent change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (overviewAudioRef.current) {
        overviewAudioRef.current.pause();
        overviewAudioRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Stop audio when agent changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setVoiceState("idle");
  }, [selectedAgent]);

  const playAgentVoice = async (agent: AgentInfo) => {
    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setVoiceState("loading");
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            text: agentGreetings[agent.id] || `Hi, I'm ${agent.name}. How can I help you today?`,
            agentType: agent.id,
          }),
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error("TTS request failed");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setVoiceState("speaking");
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setVoiceState("idle");
        audioRef.current = null;
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        setVoiceState("idle");
        audioRef.current = null;
      };

      await audio.play();
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Voice playback error:", error);
      }
      setVoiceState("idle");
    }
  };

  const stopVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setVoiceState("idle");
  };

  const toggleVoice = () => {
    if (voiceState === "speaking" || voiceState === "loading") {
      stopVoice();
    } else {
      playAgentVoice(selectedAgent);
    }
  };

  // Team Overview voiceover text
  const teamOverviewText = `Your 24Twelve AI Team consists of 8 specialized agents working together around the clock. Julia greets visitors and manages the front desk. Nicole orchestrates all operations and coordinates tasks across the team. Brad drives sales and nurtures leads. Halle handles legal reviews and compliance. George manages your social media presence. Arnie creates powerful blog content. Sam provides motivation and life coaching. Jerry guides your financial planning. Together, they form a cohesive unit, handling product launches, client onboarding, content creation, and more as a unified team.`;

  const playTeamOverview = () => {
    // Stop any existing overview audio
    if (overviewAudioRef.current) {
      overviewAudioRef.current.pause();
      overviewAudioRef.current = null;
    }

    // Use Web Speech API for TTS
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      setOverviewVoiceState("speaking");
      const utterance = new SpeechSynthesisUtterance(teamOverviewText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onend = () => setOverviewVoiceState("idle");
      utterance.onerror = () => setOverviewVoiceState("idle");
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopTeamOverview = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (overviewAudioRef.current) {
      overviewAudioRef.current.pause();
      overviewAudioRef.current = null;
    }
    setOverviewVoiceState("idle");
  };

  const toggleTeamOverview = () => {
    if (overviewVoiceState === "speaking") {
      stopTeamOverview();
    } else {
      playTeamOverview();
    }
  };

  const playWorkflow = () => {
    setIsPlaying(true);
    setWorkflowStep(0);
    const workflow = collaborationWorkflows[activeWorkflow];
    
    const interval = setInterval(() => {
      setWorkflowStep((prev) => {
        if (prev >= workflow.steps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const getAgentById = (id: string) => agents.find((a) => a.id === id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="hero" size="lg" className="gap-2">
            <Play className="w-5 h-5" />
            Explore Demo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[92vw] max-w-5xl max-h-[80vh] p-0 overflow-hidden bg-card border-border mx-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogHeader className="p-4 md:p-6 pb-0">
          <DialogTitle className="font-display text-lg md:text-2xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            Meet Your AI Team
          </DialogTitle>
          {/* Voiceover Summary */}
          <div className="mt-2 md:mt-4 p-2 md:p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <h3 className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="hidden sm:inline">Team </span>Overview
              </h3>
              <button
                onClick={toggleTeamOverview}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all",
                  overviewVoiceState === "speaking"
                    ? "bg-primary text-primary-foreground animate-pulse"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
                title={overviewVoiceState === "speaking" ? "Stop voiceover" : "Play voiceover"}
              >
                {overviewVoiceState === "speaking" ? (
                  <>
                    <Volume2 className="w-3 h-3" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    Listen
                  </>
                )}
              </button>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">
              <strong>Your 24Twelve AI Team</strong> consists of 8 specialized agents working together around the clock. 
              <span className="hidden md:inline">
                <strong> Julia</strong> greets visitors and manages the front desk. 
                <strong> Nicole</strong> orchestrates all operations and coordinates tasks across the team. 
                <strong> Brad</strong> drives sales and nurtures leads.
                <strong> Halle</strong> handles legal reviews and compliance. 
                <strong> George</strong> manages your social media presence. 
                <strong> Arnie</strong> creates powerful blog content. 
                <strong> Sam</strong> provides motivation and life coaching. 
                <strong> Jerry</strong> guides your financial planning. 
              </span>
              Together, they form a cohesive unit—handling product launches, client onboarding, content creation, and more as a unified team.
            </p>
          </div>
        </DialogHeader>

        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="w-full justify-start px-3 md:px-6 bg-transparent border-b border-border rounded-none h-auto py-0 flex-wrap gap-0">
            <TabsTrigger
              value="agents"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 md:py-3 text-xs md:text-sm px-2 md:px-4"
            >
              <Users className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Agent </span>Profiles
            </TabsTrigger>
            <TabsTrigger
              value="collaboration"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 md:py-3 text-xs md:text-sm px-2 md:px-4"
            >
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Collaboration </span>Demo
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 md:py-3 text-xs md:text-sm px-2 md:px-4"
            >
              <ListTodo className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="handoff"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 md:py-3 text-xs md:text-sm px-2 md:px-4"
            >
              <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Live </span>Handoff
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="mt-0">
            <div className="flex flex-col md:flex-row h-[280px] md:h-[420px]">
              {/* Agent List */}
              <ScrollArea className="w-full md:w-44 border-b md:border-b-0 md:border-r border-border max-h-[100px] md:max-h-none">
                <div className="p-1.5 md:p-2 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
                  {agents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className={cn(
                        "flex-shrink-0 flex items-center gap-2 md:gap-3 p-2 rounded-lg transition-all",
                        "md:w-full",
                        selectedAgent.id === agent.id
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-muted"
                      )}
                    >
                      <Avatar className="w-8 h-8 md:w-10 md:h-10">
                        <AvatarImage src={agent.avatar} alt={agent.name} />
                        <AvatarFallback>{agent.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-left hidden md:block">
                        <p className="text-sm font-medium">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {agent.role}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>

              <ScrollArea className="flex-1 p-3 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedAgent.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-4 md:mb-6">
                      <div className="relative">
                        <Avatar
                          className="w-16 h-16 md:w-24 md:h-24 ring-4 cursor-pointer"
                          style={{
                            ["--tw-ring-color" as string]: selectedAgent.color,
                          }}
                          onClick={toggleVoice}
                        >
                          <AvatarImage
                            src={selectedAgent.avatar}
                            alt={selectedAgent.name}
                          />
                          <AvatarFallback>{selectedAgent.name[0]}</AvatarFallback>
                        </Avatar>
                        {/* Voice indicator overlay */}
                        <button
                          onClick={toggleVoice}
                          className={cn(
                            "absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center transition-all",
                            voiceState === "speaking" 
                              ? "bg-primary text-primary-foreground animate-pulse" 
                              : voiceState === "loading"
                                ? "bg-muted text-muted-foreground"
                                : "bg-card border border-border text-foreground hover:bg-muted"
                          )}
                          title={voiceState === "speaking" ? "Stop" : "Hear agent voice"}
                        >
                          {voiceState === "loading" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : voiceState === "speaking" ? (
                            <Volume2 className="w-4 h-4" />
                          ) : (
                            <Mic className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="font-display text-xl md:text-2xl font-bold">
                          {selectedAgent.name}
                        </h3>
                        <Badge
                          style={{ backgroundColor: selectedAgent.color }}
                          className="text-white mb-2"
                        >
                          {selectedAgent.role}
                        </Badge>
                        <p className="text-sm md:text-base text-muted-foreground max-w-lg">
                          {selectedAgent.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 flex items-center gap-2">
                          <CheckCircle2
                            className="w-4 h-4"
                            style={{ color: selectedAgent.color }}
                          />
                          Core Capabilities
                        </h4>
                        <ul className="space-y-2">
                          {selectedAgent.capabilities.map((cap, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: selectedAgent.color }}
                              />
                              {cap}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Sparkles
                            className="w-4 h-4"
                            style={{ color: selectedAgent.color }}
                          />
                          Example Use Cases
                        </h4>
                        <ul className="space-y-2">
                          {selectedAgent.useCases.map((use, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <ArrowRight className="w-3 h-3" />
                              {use}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" style={{ color: selectedAgent.color }} />
                        Collaborates With
                      </h4>
                      <div className="flex gap-2">
                        {selectedAgent.collaboratesWith.map((id) => {
                          const collaborator = getAgentById(id);
                          if (!collaborator) return null;
                          return (
                            <button
                              key={id}
                              onClick={() => setSelectedAgent(collaborator)}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                            >
                              <Avatar className="w-6 h-6">
                                <AvatarImage
                                  src={collaborator.avatar}
                                  alt={collaborator.name}
                                />
                                <AvatarFallback>
                                  {collaborator.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{collaborator.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* Collaboration Demo Tab */}
          <TabsContent value="collaboration" className="mt-0 p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                {collaborationWorkflows.map((workflow, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveWorkflow(i);
                      setWorkflowStep(0);
                      setIsPlaying(false);
                    }}
                    className={cn(
                      "flex-1 p-4 rounded-lg border transition-all text-left",
                      activeWorkflow === i
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <h4 className="font-semibold">{workflow.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {workflow.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="bg-muted/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold">Workflow Visualization</h4>
                  <Button
                    onClick={playWorkflow}
                    disabled={isPlaying}
                    size="sm"
                    className="gap-2"
                  >
                    <Play className="w-4 h-4" />
                    {isPlaying ? "Playing..." : "Play Demo"}
                  </Button>
                </div>

                <div className="space-y-4">
                  {collaborationWorkflows[activeWorkflow].steps.map((step, i) => {
                    const agent = getAgentById(step.agent);
                    if (!agent) return null;
                    const isActive = i <= workflowStep;
                    const isCurrent = i === workflowStep;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.5 }}
                        animate={{
                          opacity: isActive ? 1 : 0.5,
                          scale: isCurrent ? 1.02 : 1,
                        }}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border transition-all",
                          isActive
                            ? "border-primary/50 bg-card"
                            : "border-border/50"
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {i + 1}
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={agent.avatar} alt={agent.name} />
                          <AvatarFallback>{agent.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">
                            {agent.name} ({agent.role})
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {step.action}
                          </p>
                        </div>
                        {isActive && (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Task Assignment Tab */}
          <TabsContent value="tasks" className="mt-0 p-6">
            <TaskAssignmentUI agents={agents} />
          </TabsContent>

          {/* Live Handoff Tab */}
          <TabsContent value="handoff" className="mt-0 p-6">
            <LiveHandoffDemo agents={agents} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Task Assignment Component
function TaskAssignmentUI({ agents }: { agents: AgentInfo[] }) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [taskDescription, setTaskDescription] = useState("");

  const toggleAgent = (id: string) => {
    setSelectedAgents((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Create a Task</h4>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Describe your task... (e.g., 'Launch our new product on social media with blog support')"
          className="w-full h-24 p-3 rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <h4 className="font-semibold mb-3">Assign to Agents</h4>
        <div className="grid grid-cols-4 gap-3">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => toggleAgent(agent.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                selectedAgents.includes(agent.id)
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              )}
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback>{agent.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{agent.name}</span>
              <span className="text-xs text-muted-foreground">{agent.role}</span>
            </button>
          ))}
        </div>
      </div>

      <Button
        disabled={!taskDescription || selectedAgents.length === 0}
        className="w-full"
      >
        <ListTodo className="w-4 h-4 mr-2" />
        Assign Task to {selectedAgents.length} Agent
        {selectedAgents.length !== 1 ? "s" : ""}
      </Button>

      {selectedAgents.length > 1 && (
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>
              <strong>Kate</strong> will automatically coordinate between selected agents
              for optimal task distribution.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

// Live Handoff Demo Component
function LiveHandoffDemo({ agents }: { agents: AgentInfo[] }) {
  const [currentAgent, setCurrentAgent] = useState<AgentInfo>(agents[0]); // Julia
  const [messages, setMessages] = useState([
    {
      agent: "julia",
      text: "Welcome! How can I help you today?",
    },
  ]);

  const handoffTo = (agentId: string) => {
    const newAgent = agents.find((a) => a.id === agentId);
    if (!newAgent) return;

    setMessages((prev) => [
      ...prev,
      {
        agent: currentAgent.id,
        text: `Let me connect you with ${newAgent.name}, our ${newAgent.role}. They can help you better with this!`,
      },
      {
        agent: agentId,
        text: `Hi there! ${currentAgent.name} brought me up to speed. How can I assist you?`,
      },
    ]);
    setCurrentAgent(newAgent);
  };

  const getAgentById = (id: string) => agents.find((a) => a.id === id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={currentAgent.avatar} alt={currentAgent.name} />
            <AvatarFallback>{currentAgent.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Chatting with {currentAgent.name}</p>
            <p className="text-sm text-muted-foreground">{currentAgent.role}</p>
          </div>
        </div>
        <Badge variant="outline" className="border-primary text-primary">
          Live Demo
        </Badge>
      </div>

      <div className="h-64 bg-muted/30 rounded-lg p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => {
          const agent = getAgentById(msg.agent);
          if (!agent) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback>{agent.name[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-card rounded-lg p-3 max-w-md">
                <p className="text-sm font-medium mb-1">{agent.name}</p>
                <p className="text-sm text-muted-foreground">{msg.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Transfer conversation to:
        </p>
        <div className="flex gap-2 flex-wrap">
          {agents
            .filter((a) => a.id !== currentAgent.id)
            .slice(0, 5)
            .map((agent) => (
              <Button
                key={agent.id}
                variant="outline"
                size="sm"
                onClick={() => handoffTo(agent.id)}
                className="gap-2"
              >
                <Avatar className="w-5 h-5">
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback>{agent.name[0]}</AvatarFallback>
                </Avatar>
                {agent.name}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
