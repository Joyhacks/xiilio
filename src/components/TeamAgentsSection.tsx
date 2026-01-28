import { AgentCard } from "@/components/AgentCard";

// Avatar imports
import juliaAvatar from "@/assets/avatars/julia-receptionist.png";
import kateAvatar from "@/assets/avatars/kate-assistant.png";
import halleAvatar from "@/assets/avatars/halle-legal.png";
import georgeAvatar from "@/assets/avatars/george-social.png";
import arnieAvatar from "@/assets/avatars/arnie-writer.png";
import bradAvatar from "@/assets/avatars/brad-sales.png";
import samAvatar from "@/assets/avatars/sam-coach.png";
import jerryAvatar from "@/assets/avatars/jerry-finance.png";

const teamAgents = [
  {
    name: "Receptionist Julia",
    description:
      "Warmly greets visitors, manages front desk operations, and directs inquiries with a radiant smile.",
    avatar: juliaAvatar,
    status: "active" as const,
    tasksCompleted: 3421,
    color: "receptionist" as const,
    features: ["Call Handling", "Visitor Mgmt", "Scheduling"],
    slug: "julia",
  },
  {
    name: "Executive Assistant Kate",
    description:
      "Elegantly manages executive schedules, coordinates meetings, and handles high-level correspondence.",
    avatar: kateAvatar,
    status: "active" as const,
    tasksCompleted: 2876,
    color: "assistant" as const,
    features: ["Calendar Mgmt", "Travel Plans", "Correspondence"],
    slug: "kate",
  },
  {
    name: "Legal Associate Halle",
    description:
      "Reviews contracts, manages legal documentation, and ensures compliance with fierce precision.",
    avatar: halleAvatar,
    status: "active" as const,
    tasksCompleted: 1543,
    color: "legal" as const,
    features: ["Contract Review", "Compliance", "Documentation"],
    slug: "halle",
  },
  {
    name: "Social Media Manager George",
    description:
      "Crafts engaging social content, manages brand presence, and charms audiences across all platforms.",
    avatar: georgeAvatar,
    status: "active" as const,
    tasksCompleted: 4892,
    color: "social" as const,
    features: ["Content Creation", "Engagement", "Analytics"],
    slug: "george",
  },
  {
    name: "Blog Writer Arnie",
    description:
      "Pumps out powerful blog content that builds authority and drives traffic with unstoppable force.",
    avatar: arnieAvatar,
    status: "active" as const,
    tasksCompleted: 2134,
    color: "writer" as const,
    features: ["SEO Writing", "Research", "Content Strategy"],
    slug: "arnie",
  },
  {
    name: "Sales Associate Brad",
    description:
      "Closes deals with irresistible charm, nurtures leads, and drives revenue with star quality.",
    avatar: bradAvatar,
    status: "active" as const,
    tasksCompleted: 3765,
    color: "sales" as const,
    features: ["Lead Nurturing", "Presentations", "CRM Updates"],
    slug: "brad",
  },
  {
    name: "Life Coach Sam",
    description:
      "Delivers powerful motivation, sets goals with intensity, and coaches clients to unlock their potential.",
    avatar: samAvatar,
    status: "active" as const,
    tasksCompleted: 1892,
    color: "coach" as const,
    features: ["Goal Setting", "Motivation", "Progress Tracking"],
    slug: "sam",
  },
  {
    name: "Financial Planner Jerry",
    description:
      "Makes financial planning surprisingly entertaining while delivering sharp insights on money matters.",
    avatar: jerryAvatar,
    status: "active" as const,
    tasksCompleted: 2456,
    color: "finance" as const,
    features: ["Budgeting", "Investments", "Tax Planning"],
    slug: "jerry",
  },
];

export function TeamAgentsSection() {
  return (
    <section className="relative py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Meet Your <span className="text-gradient">AI Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eight celebrity-caliber AI agents ready to handle every aspect of
            your business with star-powered efficiency.
          </p>
        </div>

        {/* Agents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamAgents.map((agent) => (
            <AgentCard key={agent.name} {...agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
