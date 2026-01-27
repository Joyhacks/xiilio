import { useConversation } from "@elevenlabs/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { Mic, MicOff, Phone, PhoneOff, Loader2, Volume2, VolumeX, Settings2, ExternalLink, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { VoiceVisualizer } from "@/components/voice/VoiceVisualizer";
import { AudioWaveform } from "@/components/voice/AudioWaveform";
import { 
  getEffectiveAgentId, 
  saveCustomAgentId, 
  getVoiceAgentConfig, 
  hasVoiceAgent 
} from "@/lib/voiceAgentConfig";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface VoiceChatProps {
  agentName: string;
  agentAvatar: string;
  agentColor: string;
  agentType?: string;
  onTranscript?: (text: string, isUser: boolean) => void;
}

export function VoiceChat({ 
  agentName, 
  agentAvatar, 
  agentColor, 
  agentType = "assistant",
  onTranscript 
}: VoiceChatProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [agentResponse, setAgentResponse] = useState("");
  const [customAgentId, setCustomAgentId] = useState("");
  const [showSetup, setShowSetup] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inputVolume, setInputVolume] = useState(0);
  const [outputVolume, setOutputVolume] = useState(0);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we have a preset for this agent type
  const hasPreset = hasVoiceAgent(agentType);
  const presetConfig = getVoiceAgentConfig(agentType);

  // Load saved custom agent ID on mount
  useEffect(() => {
    const savedId = getEffectiveAgentId(agentType);
    if (savedId && !hasPreset) {
      setCustomAgentId(savedId);
    }
  }, [agentType, hasPreset]);

  // Get the agent ID to use (preset or custom)
  const getAgentId = useCallback(() => {
    if (customAgentId.trim()) {
      return customAgentId.trim();
    }
    return getEffectiveAgentId(agentType);
  }, [customAgentId, agentType]);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs agent");
      toast({
        title: "Voice Connected",
        description: `You're now speaking with ${agentName}`,
      });
      setShowSetup(false);
      
      // Start polling audio levels
      volumeIntervalRef.current = setInterval(() => {
        try {
          setInputVolume(conversation.getInputVolume() || 0);
          setOutputVolume(conversation.getOutputVolume() || 0);
        } catch (e) {
          // Volume methods may not be available
        }
      }, 50);
    },
    onDisconnect: () => {
      console.log("Disconnected from agent");
      setTranscript("");
      setAgentResponse("");
      setShowSetup(true);
      
      // Stop polling
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
        volumeIntervalRef.current = null;
      }
      setInputVolume(0);
      setOutputVolume(0);
    },
    onMessage: (message) => {
      console.log("Voice message:", message);
      
      // Handle different message types
      const msg = message as any;
      if (msg.user_transcription_event?.user_transcript) {
        const userText = msg.user_transcription_event.user_transcript;
        setTranscript(userText);
        onTranscript?.(userText, true);
      } else if (msg.agent_response_event?.agent_response) {
        const agentText = msg.agent_response_event.agent_response;
        setAgentResponse(agentText);
        onTranscript?.(agentText, false);
      }
    },
    onError: (error) => {
      console.error("Conversation error:", error);
      toast({
        variant: "destructive",
        title: "Voice Error",
        description: "Connection issue. Please check your Agent ID and try again.",
      });
      setIsConnecting(false);
      setShowSetup(true);
    },
  });

  const startConversation = useCallback(async () => {
    const effectiveAgentId = getAgentId();
    
    if (!effectiveAgentId) {
      toast({
        variant: "destructive",
        title: "Agent ID Required",
        description: "Please enter your ElevenLabs Agent ID to start voice chat.",
      });
      return;
    }

    setIsConnecting(true);
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Save custom agent ID if provided
      if (customAgentId.trim()) {
        saveCustomAgentId(agentType, customAgentId.trim());
      }

      // Start with WebRTC for low latency
      await conversation.startSession({
        agentId: effectiveAgentId,
        connectionType: "webrtc",
      });

    } catch (error: any) {
      console.error("Failed to start voice:", error);
      
      if (error.name === "NotAllowedError") {
        toast({
          variant: "destructive",
          title: "Microphone Required",
          description: "Please allow microphone access for voice chat.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: "Unable to start voice chat. Please check your Agent ID.",
        });
      }
      setIsConnecting(false);
    }
  }, [conversation, getAgentId, customAgentId, agentType]);

  const stopConversation = useCallback(async () => {
    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    await conversation.endSession();
    toast({
      title: "Voice Ended",
      description: "Voice conversation has ended.",
    });
  }, [conversation]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Volume getter callbacks for visualizers
  const getInputVolume = useCallback(() => inputVolume, [inputVolume]);
  const getOutputVolume = useCallback(() => outputVolume, [outputVolume]);

  const isConnected = conversation.status === "connected";

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
        {isConnected && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {conversation.isSpeaking ? "Speaking..." : "Listening..."}
            </span>
            <span className={cn(
              "w-2 h-2 rounded-full",
              conversation.isSpeaking 
                ? "bg-primary animate-pulse" 
                : "bg-accent animate-pulse"
            )} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-y-auto">
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
              {/* Show preset info if available */}
              {hasPreset && presetConfig ? (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Voice Ready
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {presetConfig.description}
                  </p>
                </div>
              ) : null}

              {/* Custom Agent ID - show as expandable if preset exists */}
              {hasPreset ? (
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-muted-foreground hover:text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <Settings2 className="w-4 h-4" />
                        Use Custom Agent ID
                      </span>
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        showAdvanced && "rotate-180"
                      )} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pt-2">
                    <Input
                      placeholder="Enter custom ElevenLabs Agent ID"
                      value={customAgentId}
                      onChange={(e) => setCustomAgentId(e.target.value)}
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                      Override with your own agent from{" "}
                      <a
                        href="https://elevenlabs.io/conversational-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        elevenlabs.io <ExternalLink className="w-3 h-3" />
                      </a>
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="agent-id" className="text-sm">
                    ElevenLabs Agent ID
                  </Label>
                  <Input
                    id="agent-id"
                    placeholder="Enter your ElevenLabs Agent ID"
                    value={customAgentId}
                    onChange={(e) => setCustomAgentId(e.target.value)}
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">
                    Create a public agent at{" "}
                    <a
                      href="https://elevenlabs.io/conversational-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      elevenlabs.io <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              )}

              <Button
                onClick={startConversation}
                disabled={isConnecting || (!hasPreset && !customAgentId.trim())}
                className="w-full gap-2"
                size="lg"
                variant="hero"
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
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Voice Visualization */}
            <div className="relative">
              <Avatar className={cn(
                "w-28 h-28 ring-4 transition-all duration-300",
                `ring-agent-${agentColor}/30`,
                conversation.isSpeaking && "ring-8 ring-primary/50 scale-110"
              )}>
                <AvatarImage src={agentAvatar} alt={agentName} />
                <AvatarFallback className="text-2xl">{agentName[0]}</AvatarFallback>
              </Avatar>
              
              {/* Circular volume rings */}
              <VoiceVisualizer 
                isActive={isConnected && conversation.isSpeaking}
                getVolume={getOutputVolume}
                type="circular"
                className="absolute inset-0"
              />
              
              {/* Listening indicator with waveform */}
              {!conversation.isSpeaking && isConnected && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2 border border-primary/30">
                  <Mic className="w-3 h-3 text-primary" />
                  <AudioWaveform 
                    isActive={isConnected && !conversation.isSpeaking}
                    getVolume={getInputVolume}
                    barCount={5}
                    color="primary"
                  />
                </div>
              )}
            </div>

            {/* Waveform Visualizer */}
            <div className="w-full max-w-sm px-4">
              <VoiceVisualizer 
                isActive={isConnected}
                getVolume={conversation.isSpeaking ? getOutputVolume : getInputVolume}
                type="wave"
                size="md"
                className="w-full"
              />
            </div>

            {/* Status */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-foreground">
                {conversation.isSpeaking ? `${agentName.split(" ")[0]} is speaking` : "Listening..."}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {conversation.isSpeaking 
                  ? "Wait for them to finish, then speak"
                  : "Speak naturally - I'm listening"
                }
              </p>
            </div>

            {/* Live Transcripts */}
            {(transcript || agentResponse) && (
              <div className="w-full max-w-md space-y-3 px-4">
                {transcript && (
                  <div className="bg-primary/10 rounded-lg p-3 text-sm">
                    <span className="text-xs text-muted-foreground block mb-1">You said:</span>
                    <span className="text-foreground">{transcript}</span>
                  </div>
                )}
                {agentResponse && (
                  <div className="bg-muted rounded-lg p-3 text-sm">
                    <span className="text-xs text-muted-foreground block mb-1">{agentName}:</span>
                    <span className="text-foreground">{agentResponse}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-border/50 bg-muted/30">
        <div className="flex items-center justify-center gap-4">
          {isConnected ? (
            <>
              <Button
                onClick={toggleMute}
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full w-12 h-12",
                  isMuted && "bg-destructive/10 border-destructive/50"
                )}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-destructive" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              
              <Button
                onClick={stopConversation}
                variant="destructive"
                size="lg"
                className="gap-2 rounded-full px-8"
              >
                <PhoneOff className="w-4 h-4" />
                End Call
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full w-12 h-12",
                  !conversation.isSpeaking && "bg-primary/10 border-primary/50"
                )}
              >
                {conversation.isSpeaking ? (
                  <MicOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Mic className="w-5 h-5 text-primary" />
                )}
              </Button>
            </>
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
