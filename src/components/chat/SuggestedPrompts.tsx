import { Sparkles, MessageCircle, Heart, Lightbulb, Smile, Briefcase } from "lucide-react";
import { funEngaging, personalityDevelopment, creativePrompts, getAgentSuggestedPrompts } from "@/lib/agentPersonality";

interface SuggestedPromptsProps {
  agentName: string;
  agentSlug?: string;
  basePrompts: { category: string; prompts: string[] }[];
  onSelectPrompt: (prompt: string) => void;
}

export function SuggestedPrompts({ agentName, agentSlug, basePrompts, onSelectPrompt }: SuggestedPromptsProps) {
  // Get agent-specific prompts if slug is provided
  const agentSpecificPrompts = agentSlug ? getAgentSuggestedPrompts(agentSlug) : [];
  
  // Use agent-specific prompts if available, otherwise fall back to basePrompts
  const displayPrompts = agentSpecificPrompts.length > 0 ? agentSpecificPrompts : basePrompts;

  // Enhanced prompts for personality engagement
  const personalityCategories = [
    {
      category: "Get to Know Me",
      icon: Heart,
      prompts: funEngaging.iceBreakers.slice(0, 2),
    },
    {
      category: "Goals & Growth",
      icon: Lightbulb,
      prompts: funEngaging.goalSetting.slice(0, 2),
    },
    {
      category: "Fun & Creative",
      icon: Smile,
      prompts: creativePrompts.storytelling.slice(0, 2),
    },
    {
      category: "Learn Together",
      icon: MessageCircle,
      prompts: personalityDevelopment.knowledgeSharing.slice(0, 2),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <Sparkles className="w-12 h-12 mx-auto text-agent-receptionist/60 mb-3" />
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Hi! I'm {agentName.split(" ")[0]}
        </h4>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          I'm here to help with your tasks and have meaningful conversations. Try one of the suggested prompts below or type your own message!
        </p>
      </div>

      {/* Agent-specific prompts */}
      <div className="space-y-4">
        <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5" />
          My Specialties
        </h5>
        {displayPrompts.slice(0, 4).map((category) => (
          <div key={category.category}>
            <p className="text-xs text-muted-foreground mb-2">{category.category}</p>
            <div className="flex flex-wrap gap-2">
              {category.prompts.slice(0, 2).map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => onSelectPrompt(prompt)}
                  className="text-left text-sm px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/50 hover:border-border"
                >
                  {prompt.length > 60 ? prompt.substring(0, 57) + "..." : prompt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Personality & Engagement Prompts */}
      <div className="space-y-4 pt-4 border-t border-border/30">
        <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Let's Connect
        </h5>
        <div className="grid grid-cols-2 gap-3">
          {personalityCategories.map((cat) => (
            <div key={cat.category} className="space-y-2">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <cat.icon className="w-3 h-3" />
                {cat.category}
              </p>
              {cat.prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => onSelectPrompt(prompt)}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors border border-primary/20 hover:border-primary/40"
                >
                  {prompt.length > 50 ? prompt.substring(0, 47) + "..." : prompt}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
