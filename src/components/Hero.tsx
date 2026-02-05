import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Play, Volume2, Square, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useConversation } from "@elevenlabs/react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo-xilio-new.png";
import { AuthOverlay } from "@/components/auth/AuthOverlay";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";


// Avatar imports
import juliaAvatar from "@/assets/avatars/julia-receptionist.png";
import nicoleAvatar from "@/assets/avatars/nicole-assistant.png";
import halleAvatar from "@/assets/avatars/halle-legal.png";
import georgeAvatar from "@/assets/avatars/george-social.png";
import arnieAvatar from "@/assets/avatars/arnie-writer.png";
import bradAvatar from "@/assets/avatars/brad-sales.png";
import samAvatar from "@/assets/avatars/sam-coach.png";
import jerryAvatar from "@/assets/avatars/jerry-finance.png";

const agents = [
  { id: "julia", name: "Julia", role: "Receptionist", avatar: juliaAvatar },
  { id: "nicole", name: "Nicole", role: "Executive Assistant", avatar: nicoleAvatar },
  { id: "brad", name: "Brad", role: "Sales", avatar: bradAvatar },
  { id: "halle", name: "Halle", role: "Legal", avatar: halleAvatar },
  { id: "george", name: "George", role: "Social Media", avatar: georgeAvatar },
  { id: "arnie", name: "Arnie", role: "Blog Writer", avatar: arnieAvatar },
  { id: "sam", name: "Sam", role: "Life Coach", avatar: samAvatar },
  { id: "jerry", name: "Jerry", role: "Financial Planner", avatar: jerryAvatar },
];

export function Hero() {
  const { isAuthenticated } = useAuth();
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [voiceState, setVoiceState] = useState<"idle" | "connecting" | "speaking">("idle");
  const [isOpen, setIsOpen] = useState(true);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Team Overview voice connected");
      setVoiceState("speaking");
    },
    onDisconnect: () => {
      console.log("Team Overview voice disconnected");
      setVoiceState("idle");
    },
    onError: (error) => {
      console.error("Team Overview voice error:", error);
      setVoiceState("idle");
      toast.error("Voice connection failed. Please try again.");
    },
  });

  const handleGetStarted = () => {
    if (isAuthenticated) {
      window.location.href = '/pricing';
    } else {
      setShowAuthOverlay(true);
    }
  };

  const startVoiceover = useCallback(async () => {
    setVoiceState("connecting");
    try {
      // Request microphone permission (required for ElevenLabs conversation)
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get signed URL from edge function
      const { data, error } = await supabase.functions.invoke(
        "elevenlabs-conversation-token",
        { body: { agentType: "teamoverview" } }
      );

      if (error || !data?.signed_url) {
        throw new Error(error?.message || "Failed to get voice token");
      }

      // Start the conversation session
      await conversation.startSession({
        signedUrl: data.signed_url,
      });
    } catch (error) {
      console.error("Failed to start voiceover:", error);
      setVoiceState("idle");
      toast.error("Could not start voice. Please check microphone permissions.");
    }
  }, [conversation]);

  const stopVoiceover = useCallback(async () => {
    await conversation.endSession();
    setVoiceState("idle");
  }, [conversation]);

  const toggleVoiceover = () => {
    if (voiceState === "speaking") {
      stopVoiceover();
    } else if (voiceState === "idle") {
      startVoiceover();
    }
  };

  return (
    <>
      <section className="relative flex items-center justify-center overflow-hidden pt-16 md:pt-18 pb-4 md:pb-6" style={{ backgroundColor: '#0c1709' }}>
        {/* Solid background matching logo's exact corner color */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{ backgroundColor: '#0c1709' }}
        />
        {/* Circuit pattern background */}
        <div className="absolute inset-0 circuit-pattern opacity-15" />
        
        {/* Luxurious gradient orbs - matched to logo */}
        <div className="absolute top-1/4 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#091306]/30 rounded-full blur-[60px] md:blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#070f03]/28 rounded-full blur-[50px] md:blur-[80px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#121304]/15 rounded-full blur-[80px] md:blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          {/* Logo with edge-blending overlay */}
          <div className="mb-2 md:mb-3 relative">
            {/* Matched gold glow to logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-40 h-40 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-[#252008]/35 rounded-full blur-3xl md:blur-[80px] animate-pulse-glow" />
            </div>
            {/* Logo container with enlarged crop - no edge cutting */}
            <div className="relative inline-block overflow-hidden rounded-xl z-20" style={{ backgroundColor: '#0c1709' }}>
              <img 
                src={logo} 
                alt="Xiilio - Working 24twelve" 
                className="relative h-[20rem] md:h-[28rem] lg:h-[34rem] w-auto mx-auto -rotate-[7deg] scale-110"
                loading="eager"
              />
              {/* Subtle edge-blending gradient */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 0%, transparent 40%, #0c1709 75%, #0c1709 100%)'
                }}
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full glass-card mb-3 md:mb-4 shimmer">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground/80">Meet Your AI Agent Team</span>
          </div>

          {/* Collapsible Voiceover Summary Card */}
          <div className="max-w-2xl mx-auto mb-6 md:mb-8 px-2">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <div className="glass-card rounded-xl border border-primary/20 bg-background/40 backdrop-blur-md overflow-hidden">
                {/* Header - Always visible */}
                <div className="p-3 md:p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    <h3 className="font-semibold text-sm md:text-base text-foreground">Team Overview</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVoiceover();
                      }}
                      disabled={voiceState === "connecting"}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all",
                        voiceState === "speaking"
                          ? "bg-primary text-primary-foreground animate-pulse"
                          : voiceState === "connecting"
                          ? "bg-primary/30 text-foreground cursor-wait"
                          : "bg-primary/20 hover:bg-primary/30 text-foreground"
                      )}
                    >
                      {voiceState === "speaking" ? (
                        <>
                          <Square className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          Stop
                        </>
                      ) : voiceState === "connecting" ? (
                        <>
                          <Loader2 className="w-3 h-3 md:w-3.5 md:h-3.5 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          Listen
                        </>
                      )}
                    </button>
                    <CollapsibleTrigger asChild>
                      <button className="p-1.5 rounded-full hover:bg-primary/10 transition-colors">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </CollapsibleTrigger>
                  </div>
                </div>

                {/* Collapsible Content */}
                <CollapsibleContent>
                  <div className="px-3 md:px-4 pb-4">
                    {/* Agent Avatars */}
                    <div className="flex justify-center gap-1 md:gap-2 mb-3 flex-wrap">
                      {agents.map((agent) => (
                        <div key={agent.id} className="flex flex-col items-center group">
                          <Avatar className="w-8 h-8 md:w-10 md:h-10 border-2 border-primary/30 group-hover:border-primary transition-colors">
                            <AvatarImage src={agent.avatar} alt={agent.name} />
                            <AvatarFallback>{agent.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-[10px] md:text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {agent.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed text-left">
                      <strong className="text-foreground">Your 24Twelve AI Team</strong> consists of 8 specialized agents working together around the clock: 
                      <strong className="text-primary"> Julia</strong> (receptionist), 
                      <strong className="text-primary"> Nicole</strong> (executive assistant),
                      <strong className="text-primary"> Brad</strong> (sales), 
                      <strong className="text-primary"> Halle</strong> (legal), 
                      <strong className="text-primary"> George</strong> (social media), 
                      <strong className="text-primary"> Arnie</strong> (blog writer), 
                      <strong className="text-primary"> Sam</strong> (life coach), and 
                      <strong className="text-primary"> Jerry</strong> (financial planner). 
                      Together, they handle product launches, client onboarding, content creation, and more as a unified team.
                    </p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button variant="hero" size="lg" className="w-full sm:w-auto md:size-xl" onClick={handleGetStarted}>
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              Get Started Free
            </Button>
          </div>

        </div>
      </section>

      <AuthOverlay
        isOpen={showAuthOverlay}
        onClose={() => setShowAuthOverlay(false)}
        defaultTab="signup"
      />
    </>
  );
}
