import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PushToTalkButton } from "./PushToTalkButton";
import { VoiceControls } from "./VoiceControls";
import { VoiceState } from "@/lib/voiceConfig";
import { useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder: string;
  // Voice props
  voiceEnabled?: boolean;
  voiceState?: VoiceState;
  audioLevel?: number;
  partialTranscript?: string;
  onPushToTalkStart?: () => void;
  onPushToTalkEnd?: () => void;
  // TTS props
  isSpeaking?: boolean;
  autoSpeak?: boolean;
  onAutoSpeakChange?: (enabled: boolean) => void;
  onStopSpeaking?: () => void;
}

export function ChatInput({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading, 
  placeholder,
  voiceEnabled = false,
  voiceState = "idle",
  audioLevel = 0,
  partialTranscript = "",
  onPushToTalkStart,
  onPushToTalkEnd,
  isSpeaking = false,
  autoSpeak = true,
  onAutoSpeakChange,
  onStopSpeaking,
}: ChatInputProps) {
  const isRecording = voiceState === "recording";
  const isProcessing = voiceState === "transcribing" || voiceState === "sending";

  // Handle voice button toggle (not hold-to-talk anymore)
  const handleVoiceToggle = useCallback(() => {
    if (isRecording) {
      onPushToTalkEnd?.();
    } else if (!isProcessing && !isLoading) {
      // Stop agent speaking if currently speaking
      if (isSpeaking) {
        onStopSpeaking?.();
      }
      onPushToTalkStart?.();
    }
  }, [isRecording, isProcessing, isLoading, isSpeaking, onPushToTalkStart, onPushToTalkEnd, onStopSpeaking]);

  // Handle keyboard shortcut (Spacebar) - now toggle instead of hold
  useEffect(() => {
    if (!voiceEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      if (e.repeat) return; // Ignore key repeats
      
      const target = e.target as HTMLElement;
      const isInChat = target.closest('[data-chat-input]');
      const isInTextarea = target.tagName === "TEXTAREA" || target.tagName === "INPUT";
      
      // If in textarea/input but not our chat input, don't intercept
      if (isInTextarea && !isInChat) return;
      
      // If in our chat textarea and there's text, let spacebar work normally
      if (isInChat && value.trim()) return;
      
      // Prevent page scroll
      e.preventDefault();
      
      handleVoiceToggle();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [voiceEnabled, value, handleVoiceToggle]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  // Display content: show partial transcript while recording, otherwise show value
  const displayValue = isRecording && partialTranscript ? partialTranscript : value;
  const displayPlaceholder = isRecording 
    ? "Listening... (auto-sends after 1.4s silence)" 
    : placeholder;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="p-4 border-t border-border/50 bg-muted/30"
      data-chat-input
    >
      {/* Recording indicator */}
      {isRecording && (
        <div className="flex items-center gap-2 mb-2 text-sm text-primary animate-pulse">
          <span className="w-2 h-2 bg-destructive rounded-full" />
          <span>Listening...</span>
          {/* Audio level bar */}
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-75"
              style={{ width: `${audioLevel * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Processing indicator */}
      {isProcessing && (
        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>{voiceState === "transcribing" ? "Transcribing..." : "Sending..."}</span>
        </div>
      )}

      <div className="flex gap-2 items-end">
        <Textarea
          value={displayValue}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={displayPlaceholder}
          className={cn(
            "min-h-[44px] max-h-32 resize-none bg-background",
            isRecording && "text-muted-foreground italic"
          )}
          rows={1}
          disabled={isRecording || isProcessing}
        />
        
        {voiceEnabled && (
          <>
            <VoiceControls
              autoSpeak={autoSpeak}
              onAutoSpeakChange={onAutoSpeakChange || (() => {})}
            />
            
            <PushToTalkButton
              state={voiceState}
              audioLevel={audioLevel}
              onToggle={handleVoiceToggle}
              isSpeaking={isSpeaking}
              disabled={isLoading || isProcessing}
            />
          </>
        )}
        
        <Button
          type="submit"
          size="icon"
          disabled={!value.trim() || isLoading || isRecording || isProcessing}
          className="shrink-0"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </form>
  );
}
