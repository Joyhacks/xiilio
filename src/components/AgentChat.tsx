import { useState, useRef, useEffect, useCallback } from "react";
import { Loader2, Mic, MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { SuggestedPrompts } from "@/components/chat/SuggestedPrompts";
import { ChatInput } from "@/components/chat/ChatInput";
import { VoiceChat } from "@/components/VoiceChat";
import { usePushToTalk } from "@/hooks/usePushToTalk";
import { useAgentTTS } from "@/hooks/useAgentTTS";
import { VoiceState } from "@/lib/voiceConfig";

interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string;
}

interface AgentChatProps {
  agentName: string;
  agentAvatar: string;
  agentColor: string;
  agentSlug?: string;
  suggestedPrompts: { category: string; prompts: string[] }[];
  edgeFunctionName: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function AgentChat({
  agentName,
  agentAvatar,
  agentColor,
  agentSlug,
  suggestedPrompts,
  edgeFunctionName,
}: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [pendingVoiceMessage, setPendingVoiceMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Derive agent type from slug
  const getAgentType = useCallback(() => {
    if (!agentSlug) return "assistant";
    if (agentSlug.includes("receptionist") || agentSlug.includes("julia")) return "receptionist";
    if (agentSlug.includes("kate")) return "assistant";
    if (agentSlug.includes("halle")) return "legal";
    if (agentSlug.includes("george")) return "social";
    if (agentSlug.includes("arnie")) return "writer";
    if (agentSlug.includes("brad")) return "sales";
    if (agentSlug.includes("sam")) return "coach";
    if (agentSlug.includes("jerry")) return "finance";
    return "assistant";
  }, [agentSlug]);

  const agentType = getAgentType();

  // TTS hook
  const {
    isSpeaking,
    isLoading: ttsLoading,
    autoSpeak,
    volume,
    speak,
    stop: stopSpeaking,
    setAutoSpeak,
    setVolume,
  } = useAgentTTS({
    agentType,
    onSpeakStart: () => setVoiceState("speaking"),
    onSpeakEnd: () => setVoiceState("idle"),
  });

  // Push-to-talk hook
  const {
    state: pttState,
    isRecording,
    isProcessing,
    partialTranscript,
    audioLevel,
    startRecording,
    stopRecording,
  } = usePushToTalk({
    agentType,
    onTranscriptReady: (text) => {
      setPendingVoiceMessage(text);
    },
    onStateChange: (state) => {
      if (state !== "speaking") {
        setVoiceState(state);
      }
    },
    stopAgentAudio: stopSpeaking, // Barge-in support
  });

  // Send voice message when transcript is ready
  useEffect(() => {
    if (pendingVoiceMessage) {
      sendMessage(pendingVoiceMessage, true);
      setPendingVoiceMessage(null);
    }
  }, [pendingVoiceMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = useCallback(
    async (userMessages: Message[]): Promise<string> => {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/${edgeFunctionName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: userMessages }),
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to start stream");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            /* ignore */
          }
        }
      }

      return assistantContent;
    },
    [edgeFunctionName]
  );

  const sendMessage = async (text: string, speakResponse: boolean = false) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowPrompts(false);
    setIsLoading(true);
    setVoiceState("sending");

    try {
      const response = await streamChat([...messages, userMsg]);
      
      // Speak the response if voice was used and autoSpeak is enabled
      if (speakResponse && autoSpeak && response) {
        speak(response);
      } else {
        setVoiceState("idle");
      }
    } catch (e) {
      console.error("Chat error:", e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble responding right now. Please try again.",
        },
      ]);
      setVoiceState("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    sendMessage(input, false);
  };

  // Handle voice transcripts from VoiceChat mode
  const handleVoiceTranscript = (text: string, isUser: boolean) => {
    const msg: Message = { 
      role: isUser ? "user" : "assistant", 
      content: text 
    };
    setMessages((prev) => [...prev, msg]);
  };

  // Determine current voice state (combine PTT and TTS states)
  const currentVoiceState = isSpeaking ? "speaking" : pttState;

  if (isVoiceMode) {
    return (
      <div className="h-[600px]">
        <VoiceChat
          agentName={agentName}
          agentAvatar={agentAvatar}
          agentColor={agentColor}
          agentType={agentType}
          onTranscript={handleVoiceTranscript}
        />
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setIsVoiceMode(false)}
            className="gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Switch to Text Chat
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-2xl border border-border/50 overflow-hidden">
      <ChatHeader 
        agentName={agentName} 
        agentAvatar={agentAvatar}
        rightContent={
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVoiceMode(true)}
            className="text-muted-foreground hover:text-primary"
            title="Switch to full voice mode"
          >
            <Mic className="w-5 h-5" />
          </Button>
        }
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && showPrompts && (
          <SuggestedPrompts
            agentName={agentName}
            agentSlug={agentSlug}
            basePrompts={suggestedPrompts}
            onSelectPrompt={(prompt) => sendMessage(prompt, false)}
          />
        )}

        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg}
            agentName={agentName}
            agentAvatar={agentAvatar}
          />
        ))}

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage src={agentAvatar} alt={agentName} />
              <AvatarFallback>{agentName[0]}</AvatarFallback>
            </Avatar>
            <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder={`Message ${agentName.split(" ")[0]}...`}
        voiceEnabled={true}
        voiceState={currentVoiceState}
        audioLevel={audioLevel}
        partialTranscript={partialTranscript}
        onPushToTalkStart={startRecording}
        onPushToTalkEnd={stopRecording}
        isSpeaking={isSpeaking || ttsLoading}
        autoSpeak={autoSpeak}
        volume={volume}
        onAutoSpeakChange={setAutoSpeak}
        onVolumeChange={setVolume}
        onStopSpeaking={stopSpeaking}
      />
    </div>
  );
}
