import { Mic, MicOff, Loader2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AudioWaveform } from "@/components/voice/AudioWaveform";
import { useCallback } from "react";

interface VoiceMicButtonProps {
  isListening: boolean;
  isSpeaking: boolean;
  volume: number;
  onToggle: () => void;
  disabled?: boolean;
}

export function VoiceMicButton({
  isListening,
  isSpeaking,
  volume,
  onToggle,
  disabled,
}: VoiceMicButtonProps) {
  const getVolume = useCallback(() => volume, [volume]);

  if (isSpeaking) {
    return (
      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled
        className="shrink-0 text-primary"
        title="Agent is speaking..."
      >
        <Volume2 className="w-4 h-4 animate-pulse" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size="icon"
      variant={isListening ? "default" : "ghost"}
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "shrink-0 relative transition-all duration-200",
        isListening && "bg-primary text-primary-foreground ring-2 ring-primary/30"
      )}
      title={isListening ? "Stop listening" : "Voice input"}
    >
      {isListening ? (
        <div className="relative flex items-center justify-center">
          <MicOff className="w-4 h-4" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            <AudioWaveform
              isActive={isListening}
              getVolume={getVolume}
              barCount={3}
              color="primary"
              className="scale-50"
            />
          </div>
        </div>
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </Button>
  );
}
