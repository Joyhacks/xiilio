import { useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";

// Map agent types to their ElevenLabs Conversational AI agent IDs
const AGENT_IDS: Record<string, string> = {
  receptionist: "agent_1201kfbaa8ygf1b93g0p4290nx67", // Julia
  assistant: "agent_8801kgjq8rrde4mavz5189ac0bbt",    // Nicole (Liberty X voice)
  legal: "agent_7201kfbc66gef8srn8dx0kzd7rgs",        // Halle
  social: "agent_2101kfbaxvp2f8atvytzszwqe7br",       // George
  writer: "agent_2301kfbbajyrffrbzq7k3n9qm6ff",       // Arnie
  sales: "agent_4001kfbd4szefvvbfgh30wvpzbbr",        // Brad
  coach: "agent_2701kfbvg113fhgaw1k0mjavt6h8",        // Sam
  finance: "agent_5501kfbw5b2wfgtstg4wdaxxqxw2",      // Jerry
};

interface ElevenLabsWidgetProps {
  agentName: string;
  agentAvatar: string;
  agentColor: string;
  agentType?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "agent-id"?: string;
          variant?: "expandable" | "full";
          "avatar-orb-color-1"?: string;
          "avatar-orb-color-2"?: string;
        },
        HTMLElement
      >;
    }
  }
}

export function ElevenLabsWidget({
  agentName,
  agentAvatar,
  agentColor,
  agentType = "assistant",
}: ElevenLabsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  const agentId = AGENT_IDS[agentType] || AGENT_IDS.assistant;

  useEffect(() => {
    // Load the ElevenLabs widget script once
    if (!scriptLoaded.current && !document.querySelector('script[src*="convai-widget-embed"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.head.appendChild(script);
      scriptLoaded.current = true;
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-muted/30">
        <Avatar className={cn("w-10 h-10 ring-2", `ring-agent-${agentColor}/30`)}>
          <AvatarImage src={agentAvatar} alt={agentName} />
          <AvatarFallback>{agentName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{agentName}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Volume2 className="w-3 h-3" />
            Voice Mode
          </p>
        </div>
      </div>

      {/* Widget Container */}
      <div 
        ref={containerRef}
        className="flex-1 flex flex-col items-center justify-center p-6 min-h-[400px] relative"
      >
        <div className="text-center space-y-4 mb-6">
          <p className="text-sm text-muted-foreground">
            Click the orb below to start a voice conversation with {agentName.split(" ")[0]}.
          </p>
        </div>

        {/* ElevenLabs Widget - positioned in center */}
        <div className="relative w-full h-[300px] flex items-center justify-center">
          <elevenlabs-convai
            agent-id={agentId}
            variant="expandable"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 bg-muted/30">
        <p className="text-xs text-center text-muted-foreground">
          Powered by ElevenLabs Conversational AI
        </p>
      </div>
    </div>
  );
}
