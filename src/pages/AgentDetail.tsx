import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgentChat } from "@/components/AgentChat";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    ],
    edgeFunction: "receptionist-chat", // Uses same backend for now
    suggestedPrompts: [
      {
        category: "Calendar Management",
        prompts: [
          "Schedule a board meeting for next Tuesday at 10am.",
          "What's on the CEO's calendar for this week?",
        ],
      },
      {
        category: "Travel Planning",
        prompts: [
          "Book a flight to New York for the executive team.",
          "Arrange hotel accommodations for the upcoming conference.",
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
        category: "Compliance",
        prompts: [
          "Check if our data practices meet GDPR requirements.",
          "What are our obligations under the new privacy regulation?",
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
      "Lead qualification",
      "Sales presentations",
      "CRM management",
      "Follow-up automation",
      "Pipeline tracking",
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Lead Management",
        prompts: [
          "Qualify this new lead from the website form.",
          "What's the status of leads in our pipeline?",
        ],
      },
      {
        category: "Sales Support",
        prompts: [
          "Draft a follow-up email for a prospect meeting.",
          "Create a brief sales pitch for our AI services.",
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
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Goal Setting",
        prompts: [
          "Help me set SMART goals for this quarter.",
          "What's a good daily routine for productivity?",
        ],
      },
      {
        category: "Motivation",
        prompts: [
          "I'm feeling stuck. Can you help motivate me?",
          "How can I stay focused on my long-term goals?",
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
    ],
    edgeFunction: "receptionist-chat",
    suggestedPrompts: [
      {
        category: "Budgeting",
        prompts: [
          "Help me create a monthly budget for my department.",
          "What's the deal with our Q4 expenses?",
        ],
      },
      {
        category: "Financial Planning",
        prompts: [
          "What should we prioritize in next year's budget?",
          "Analyze our spending trends for this quarter.",
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Agent Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar
                className={cn(
                  "w-20 h-20 ring-4",
                  `ring-agent-${agent.color}/30`
                )}
              >
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback>{agent.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  {agent.name}
                </h1>
                <p className={cn("text-lg", `text-agent-${agent.color}`)}>
                  {agent.role}
                </p>
                <Badge
                  variant="outline"
                  className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                >
                  ● Active
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground text-lg">{agent.description}</p>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Capabilities</h3>
              <ul className="space-y-2">
                {agent.capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className={cn("w-4 h-4", `text-agent-${agent.color}`)} />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chat Interface */}
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Chat with {agent.name.split(" ")[0]}
            </h2>
            <AgentChat
              agentName={agent.name}
              agentAvatar={agent.avatar}
              agentColor={agent.color}
              suggestedPrompts={agent.suggestedPrompts}
              edgeFunctionName={agent.edgeFunction}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
