import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { VoiceMicButton } from "./VoiceMicButton";
import { useEffect } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder: string;
  // Voice input props
  voiceEnabled?: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  voiceVolume?: number;
  onVoiceToggle?: () => void;
}

export function ChatInput({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading, 
  placeholder,
  voiceEnabled = false,
  isListening = false,
  isSpeaking = false,
  voiceVolume = 0,
  onVoiceToggle,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="p-4 border-t border-border/50 bg-muted/30"
    >
      <div className="flex gap-2 items-end">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening..." : placeholder}
          className="min-h-[44px] max-h-32 resize-none bg-background"
          rows={1}
          disabled={isListening}
        />
        
        {voiceEnabled && onVoiceToggle && (
          <VoiceMicButton
            isListening={isListening}
            isSpeaking={isSpeaking}
            volume={voiceVolume}
            onToggle={onVoiceToggle}
            disabled={isLoading}
          />
        )}
        
        <Button
          type="submit"
          size="icon"
          disabled={!value.trim() || isLoading || isListening}
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
