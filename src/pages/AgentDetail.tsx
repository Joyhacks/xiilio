import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, MessageSquare, Settings, Clock, Mic } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgentChat } from "@/components/AgentChat";
import { AgentConfigPanel } from "@/components/AgentConfigPanel";
import { ActivityHistory } from "@/components/ActivityHistory";
import { VoiceChat } from "@/components/VoiceChat";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface AgentData {
  name: string;
  role: string;
  description: string;
  avatar: string;
  color: string;
  capabilities: string[];
  edgeFunction: string;
  suggestedPrompts: { category: string; prompts: string[] }[];
}

const agents: Record<string, AgentData> = {
  julia: {
    name: "Receptionist Julia",
    role: "Front Desk & Visitor Management",
    description:
      "Warmly greets visitors, manages front desk operations, and directs inquiries with a radiant smile. Julia handles all visitor-related tasks with charm and efficiency.",
    avatar: juliaAvatar,
    color: "receptionist",
    capabilities: [
      "Visitor check-in and badge management",
      "Appointment scheduling and confirmations",
      "Phone call handling and message taking",
      "Directions and event information",
      "Email correspondence",
      "Package and mail management",
      "Daily briefings and task checklists",
      "Emergency protocol guidance",
      "Team communication",
      "Feedback collection",
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Visitor Management",
        prompts: [
          "Log the arrival of John Smith and notify Sarah from Sales.",
          "Check in visitor Emma Watson and provide them with a visitor badge.",
        ],
      },
      {
        category: "Appointment Scheduling",
        prompts: [
          "Schedule an appointment for Mike Johnson with Brad from Sales on Friday at 2pm.",
          "Confirm the appointment for Lisa Chen and send a calendar invite.",
        ],
      },
      {
        category: "Phone Call Handling",
        prompts: [
          "Take a message for Kate from David regarding the quarterly report.",
          "Transfer the call to extension 205 and provide them with the caller's details.",
        ],
      },
      {
        category: "Information Desk",
        prompts: [
          "Provide directions to the nearest conference room.",
          "What are today's events scheduled in the lobby?",
        ],
      },
      {
        category: "Email Correspondence",
        prompts: [
          "Draft a welcome email for new visitors, including our office policies.",
          "Respond to the inquiry about office hours with a polite message.",
        ],
      },
      {
        category: "Package Management",
        prompts: [
          "Log the incoming package for Jerry and notify them.",
          "Track the status of the outgoing mail to New York office.",
        ],
      },
      {
        category: "Daily Briefing",
        prompts: [
          "Summarize today's visitor schedule and any special instructions.",
          "Provide a checklist of tasks to complete by the end of the day.",
        ],
      },
      {
        category: "Team Communication",
        prompts: [
          "Send a quick message to the team about potential visitor delays.",
          "Notify staff about a scheduled fire drill on Thursday at 3pm.",
        ],
      },
    ],
  },
  kate: {
    name: "Executive Assistant Kate",
    role: "Executive Support & Coordination",
    description:
      "Elegantly manages executive schedules, coordinates meetings, and handles high-level correspondence with royal precision.",
    avatar: kateAvatar,
    color: "assistant",
    capabilities: [
      "Calendar management",
      "Travel arrangements",
      "Meeting coordination",
      "Document preparation",
      "Correspondence handling",
      "Task prioritization",
      "Reminder scheduling",
      "Resource access",
      "Progress tracking",
      "Learning & development",
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "General Assistance",
        prompts: [
          "What can you do for me today?",
          "Help me with organizing my weekly priorities.",
        ],
      },
      {
        category: "Task Management",
        prompts: [
          "Create a new task titled 'Project Review' and set a deadline for Friday.",
          "Organize my tasks by priority and due date.",
        ],
      },
      {
        category: "Scheduling & Calendar",
        prompts: [
          "Schedule a meeting with the leadership team on Thursday at 10am.",
          "Check my calendar for availability next week.",
        ],
      },
      {
        category: "Communication",
        prompts: [
          "Draft an email to the team about the upcoming deadline.",
          "Send a follow-up message regarding yesterday's discussion.",
        ],
      },
      {
        category: "Information Retrieval",
        prompts: [
          "Summarize the key points from the quarterly report.",
          "Search for articles related to productivity best practices.",
        ],
      },
      {
        category: "Progress Tracking",
        prompts: [
          "Show me my progress toward Q4 goals.",
          "Review my achievements for the past month.",
        ],
      },
      {
        category: "Continuous Improvement",
        prompts: [
          "Suggest ways to enhance my productivity.",
          "What are the best practices for using this app?",
        ],
      },
    ],
  },
  halle: {
    name: "Legal Associate Halle",
    role: "Legal & Compliance",
    description:
      "Reviews contracts, manages legal documentation, and ensures compliance with fierce precision and unwavering attention to detail.",
    avatar: halleAvatar,
    color: "legal",
    capabilities: [
      "Contract review",
      "Compliance monitoring",
      "Legal documentation",
      "Risk assessment",
      "Policy drafting",
      "Data protection",
      "Security awareness",
      "User rights management",
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Contract Review",
        prompts: [
          "Review the vendor agreement for compliance issues.",
          "Summarize the key terms of the NDA.",
        ],
      },
      {
        category: "Compliance & Regulations",
        prompts: [
          "Review how we comply with GDPR and other data protection regulations.",
          "Understand your rights regarding data access and deletion under applicable laws.",
        ],
      },
      {
        category: "Security Awareness",
        prompts: [
          "Learn about our data protection policies and how we keep information secure.",
          "Explore tips on creating strong passwords for your accounts.",
        ],
      },
      {
        category: "Security Settings",
        prompts: [
          "Enable two-factor authentication to enhance account security.",
          "Check account activity for any unauthorized access.",
        ],
      },
      {
        category: "Data Management",
        prompts: [
          "Request to delete your account and all associated data.",
          "Manage consent settings for data sharing with third parties.",
        ],
      },
      {
        category: "Reporting & Safe Usage",
        prompts: [
          "Report suspicious activity or potential security breaches.",
          "Avoid sharing login credentials and use secure networks.",
        ],
      },
    ],
  },
  george: {
    name: "Social Media Manager George",
    role: "Social Media & Brand",
    description:
      "Crafts engaging social content, manages brand presence, and charms audiences across all platforms with Hollywood-level charisma.",
    avatar: georgeAvatar,
    color: "social",
    capabilities: [
      "Content creation",
      "Community engagement",
      "Analytics tracking",
      "Campaign management",
      "Brand voice",
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Content Creation",
        prompts: [
          "Draft a Twitter post announcing our new product launch.",
          "Create an engaging Instagram caption for our team photo.",
        ],
      },
      {
        category: "Analytics",
        prompts: [
          "What's our engagement rate this month?",
          "Which posts performed best last week?",
        ],
      },
    ],
  },
  arnie: {
    name: "Blog Writer Arnie",
    role: "Content & SEO Writing",
    description:
      "Pumps out powerful blog content that builds authority and drives traffic with unstoppable force and determination.",
    avatar: arnieAvatar,
    color: "writer",
    capabilities: [
      "SEO-optimized writing",
      "Research & analysis",
      "Content strategy",
      "Topic ideation",
      "Editorial calendar",
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Content Writing",
        prompts: [
          "Write an outline for a blog post about AI in business.",
          "Generate 5 headline ideas for our product announcement.",
        ],
      },
      {
        category: "SEO Strategy",
        prompts: [
          "What keywords should we target for lead generation?",
          "How can we improve our blog's search ranking?",
        ],
      },
    ],
  },
  brad: {
    name: "Sales Associate Brad",
    role: "Sales & Lead Nurturing",
    description:
      "Closes deals with irresistible charm, nurtures leads, and drives revenue with star quality and natural charisma.",
    avatar: bradAvatar,
    color: "sales",
    capabilities: [
      "Lead generation & qualification",
      "Sales reporting & analytics",
      "Customer communication",
      "Follow-up automation",
      "Pipeline tracking",
      "Appointment scheduling",
      "Market research",
      "Sales strategy development",
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Lead Generation",
        prompts: [
          "Identify potential leads based on our target market criteria.",
          "Compile a list of recent inquiries and categorize them by lead quality.",
        ],
      },
      {
        category: "Follow-Up Tasks",
        prompts: [
          "Create a follow-up schedule for leads interested in our AI services.",
          "Draft a follow-up email for leads who attended our recent webinar.",
        ],
      },
      {
        category: "Sales Reporting",
        prompts: [
          "Generate a weekly report on sales performance with conversion rates.",
          "Analyze sales data and identify trends over the past quarter.",
        ],
      },
      {
        category: "Customer Communication",
        prompts: [
          "Draft a personalized introduction email for new leads.",
          "Create a script for phone calls to introduce our AI agent offerings.",
        ],
      },
      {
        category: "Market Research",
        prompts: [
          "Research competitors' offerings and summarize their strengths.",
          "Identify industry trends that could impact our sales strategy.",
        ],
      },
    ],
  },
  sam: {
    name: "Life Coach Sam",
    role: "Motivation & Goal Setting",
    description:
      "Delivers powerful motivation, sets goals with intensity, and coaches clients to unlock their potential with passion.",
    avatar: samAvatar,
    color: "coach",
    capabilities: [
      "Goal setting",
      "Motivation coaching",
      "Progress tracking",
      "Habit formation",
      "Accountability",
      "Wellness guidance",
      "Self-reflection exercises",
      "Achievement tracking",
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Goal Setting",
        prompts: [
          "Help me set SMART goals for this quarter.",
          "What are some strategies for achieving my career goals?",
        ],
      },
      {
        category: "Motivation",
        prompts: [
          "I'm feeling stuck. Can you help motivate me?",
          "Provide me with daily affirmations to stay positive.",
        ],
      },
      {
        category: "Wellness & Self-Care",
        prompts: [
          "Guide me through a mindfulness exercise.",
          "Help me reflect on my goals with a self-assessment.",
        ],
      },
      {
        category: "Learning & Development",
        prompts: [
          "Provide tips on improving my communication skills.",
          "Recommend books or resources about personal growth.",
        ],
      },
      {
        category: "Progress Tracking",
        prompts: [
          "What are my recent achievements?",
          "Track my progress on my monthly wellness goals.",
        ],
      },
      {
        category: "Interactive Features",
        prompts: [
          "Try our AI-powered mood tracker! Share how you're feeling today.",
          "Complete this challenge to unlock a productivity badge!",
        ],
      },
    ],
  },
  jerry: {
    name: "Financial Planner Jerry",
    role: "Finance & Planning",
    description:
      "Makes financial planning surprisingly entertaining while delivering sharp insights on money matters and budgeting.",
    avatar: jerryAvatar,
    color: "finance",
    capabilities: [
      "Budget analysis",
      "Investment guidance",
      "Tax planning",
      "Financial reports",
      "Expense tracking",
      "Financial goal tracking",
      "Spending optimization",
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Budgeting",
        prompts: [
          "Help me create a monthly budget for my department.",
          "Track my financial spending this week.",
        ],
      },
      {
        category: "Financial Planning",
        prompts: [
          "What should we prioritize in next year's budget?",
          "Analyze our spending trends for this quarter.",
        ],
      },
      {
        category: "Investment Monitoring",
        prompts: [
          "Check the performance of our investments and market trends.",
          "What are the best investment strategies for this quarter?",
        ],
      },
      {
        category: "Expense Tracking",
        prompts: [
          "Categorize our recent expenses by department.",
          "Identify areas where we can reduce costs.",
        ],
      },
      {
        category: "Financial Reports",
        prompts: [
          "Generate a financial summary for the board meeting.",
          "Compare our revenue performance vs. last quarter.",
        ],
      },
    ],
  },
};

export default function AgentDetail() {
  const { agentId } = useParams<{ agentId: string }>();
  const agent = agentId ? agents[agentId] : null;

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Agent Not Found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all agents
        </Link>

        {/* Agent Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 p-6 rounded-2xl bg-gradient-card border border-border/50">
          <Avatar
            className={cn(
              "w-24 h-24 ring-4 shrink-0",
              `ring-agent-${agent.color}/30`
            )}
          >
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>{agent.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="font-display text-3xl font-bold text-foreground">
                {agent.name}
              </h1>
              <Badge
                variant="outline"
                className="bg-primary/20 text-primary border-primary/30"
              >
                ● Active
              </Badge>
            </div>
            <p className={cn("text-lg mb-2", `text-agent-${agent.color}`)}>
              {agent.role}
            </p>
            <p className="text-muted-foreground">{agent.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="voice" className="gap-2">
              <Mic className="w-4 h-4" />
              Voice
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Clock className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Capabilities */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle className={cn("w-5 h-5", `text-agent-${agent.color}`)} />
                  Capabilities
                </h3>
                <ul className="space-y-2">
                  {agent.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={cn("w-1.5 h-1.5 rounded-full", `bg-agent-${agent.color}`)} />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <AgentChat
                  agentName={agent.name}
                  agentAvatar={agent.avatar}
                  agentColor={agent.color}
                  suggestedPrompts={agent.suggestedPrompts}
                  edgeFunctionName={agent.edgeFunction}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="voice" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Capabilities */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle className={cn("w-5 h-5", `text-agent-${agent.color}`)} />
                  Voice Capabilities
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={cn("w-1.5 h-1.5 rounded-full", `bg-agent-${agent.color}`)} />
                    Real-time voice conversations
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={cn("w-1.5 h-1.5 rounded-full", `bg-agent-${agent.color}`)} />
                    Natural language understanding
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={cn("w-1.5 h-1.5 rounded-full", `bg-agent-${agent.color}`)} />
                    Lifelike AI voice responses
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={cn("w-1.5 h-1.5 rounded-full", `bg-agent-${agent.color}`)} />
                    Powered by ElevenLabs
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                  To use voice chat, you'll need an ElevenLabs account and a configured AI agent. Visit{" "}
                  <a
                    href="https://elevenlabs.io/conversational-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    elevenlabs.io
                  </a>{" "}
                  to get started.
                </p>
              </div>

              {/* Voice Interface */}
              <div className="lg:col-span-2">
                <VoiceChat
                  agentName={agent.name}
                  agentAvatar={agent.avatar}
                  agentColor={agent.color}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="max-w-3xl">
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                {agentId && (
                  <AgentConfigPanel agentSlug={agentId} agentName={agent.name} />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="max-w-3xl">
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                {agentId && <ActivityHistory agentSlug={agentId} />}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
