import { useConversation } from "@elevenlabs/react";
import { useState, useCallback } from "react";
import { Mic, MicOff, Phone, PhoneOff, Loader2, Volume2, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface VoiceChatProps {
  agentName: string;
  agentAvatar: string;
  agentColor: string;
}

export function VoiceChat({ agentName, agentAvatar, agentColor }: VoiceChatProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [showSetup, setShowSetup] = useState(true);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs agent");
      toast({
        title: "Connected",
        description: `You're now speaking with ${agentName}`,
      });
    },
    onDisconnect: () => {
      console.log("Disconnected from agent");
      toast({
        title: "Disconnected",
        description: "Voice conversation ended",
      });
    },
    onMessage: (message) => {
      console.log("Message:", message);
    },
    onError: (error) => {
      console.error("Conversation error:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to voice agent. Please check your Agent ID.",
      });
    },
  });

  const startConversation = useCallback(async () => {
    if (!agentId.trim()) {
      toast({
        variant: "destructive",
        title: "Agent ID Required",
        description: "Please enter your ElevenLabs Agent ID to start a voice conversation.",
      });
      return;
    }

    setIsConnecting(true);
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with public agent ID
      await conversation.startSession({
        agentId: agentId.trim(),
        connectionType: "webrtc",
      });

      setShowSetup(false);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      toast({
        variant: "destructive",
        title: "Microphone Access Required",
        description: "Please enable microphone access to use voice features.",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [conversation, agentId]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setShowSetup(true);
  }, [conversation]);

  const isConnected = conversation.status === "connected";

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-2xl border border-border/50 overflow-hidden">
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
        {isConnected && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {conversation.isSpeaking ? "Speaking..." : "Listening..."}
            </span>
            <span className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              conversation.isSpeaking ? "bg-primary" : "bg-primary/50"
            )} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {showSetup && !isConnected ? (
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center space-y-2">
              <div className={cn(
                "w-20 h-20 mx-auto rounded-full flex items-center justify-center",
                `bg-agent-${agentColor}/20`
              )}>
                <Mic className={cn("w-10 h-10", `text-agent-${agentColor}`)} />
              </div>
              <h4 className="text-lg font-semibold text-foreground">
                Voice Conversation
              </h4>
              <p className="text-sm text-muted-foreground">
                Have a spoken conversation with {agentName.split(" ")[0]} using ElevenLabs.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-id" className="text-sm">
                  ElevenLabs Agent ID
                </Label>
                <Input
                  id="agent-id"
                  placeholder="Enter your ElevenLabs Agent ID"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">
                  Create a public agent at{" "}
                  <a
                    href="https://elevenlabs.io/conversational-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    elevenlabs.io
                  </a>
                  {" "}and paste the Agent ID here.
                </p>
              </div>

              <Button
                onClick={startConversation}
                disabled={isConnecting || !agentId.trim()}
                className="w-full gap-2"
                size="lg"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    Start Voice Call
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            {/* Voice Visualization */}
            <div className="relative">
              <Avatar className={cn(
                "w-32 h-32 ring-4 transition-all duration-300",
                `ring-agent-${agentColor}/30`,
                conversation.isSpeaking && "ring-8 ring-primary/50 scale-110"
              )}>
                <AvatarImage src={agentAvatar} alt={agentName} />
                <AvatarFallback className="text-2xl">{agentName[0]}</AvatarFallback>
              </Avatar>
              
              {/* Speaking indicator rings */}
              {conversation.isSpeaking && (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
                  <div className="absolute inset-[-8px] rounded-full border-2 border-primary/20 animate-pulse" />
                </>
              )}
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-xl font-semibold text-foreground">
                {conversation.isSpeaking ? `${agentName.split(" ")[0]} is speaking...` : "Listening..."}
              </h4>
              <p className="text-sm text-muted-foreground">
                {conversation.isSpeaking 
                  ? "Wait for them to finish, then speak"
                  : "Speak now to have a conversation"
                }
              </p>
            </div>

            {/* Microphone status */}
            <div className={cn(
              "p-4 rounded-full transition-all duration-300",
              conversation.isSpeaking 
                ? "bg-muted text-muted-foreground"
                : "bg-primary/20 text-primary"
            )}>
              {conversation.isSpeaking ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8 animate-pulse" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-border/50 bg-muted/30">
        <div className="flex items-center justify-center gap-4">
          {isConnected ? (
            <Button
              onClick={stopConversation}
              variant="destructive"
              size="lg"
              className="gap-2"
            >
              <PhoneOff className="w-4 h-4" />
              End Call
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSetup(true)}
              className="gap-2 text-muted-foreground"
            >
              <Settings2 className="w-4 h-4" />
              Configure Agent
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
