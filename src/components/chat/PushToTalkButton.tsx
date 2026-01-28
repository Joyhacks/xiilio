import { Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VoiceState } from "@/lib/voiceConfig";

interface PushToTalkButtonProps {
  state: VoiceState;
  audioLevel: number;
  onToggle: () => void;
  isSpeaking: boolean;
  disabled?: boolean;
  className?: string;
}

export function PushToTalkButton({
  state,
  audioLevel,
  onToggle,
  isSpeaking,
  disabled,
  className,
}: PushToTalkButtonProps) {
  // Calculate visual feedback based on audio level
  const pulseScale = 1 + audioLevel * 0.3;
  const glowOpacity = audioLevel * 0.6;

  const isRecording = state === "recording";
  const isProcessing = state === "transcribing" || state === "sending";

  return (
    <div className="relative">
      {/* Audio level glow effect */}
      {isRecording && (
        <div 
          className="absolute inset-0 rounded-lg bg-primary/30 blur-md transition-opacity"
          style={{ opacity: glowOpacity, transform: `scale(${pulseScale})` }}
        />
      )}
      
      <Button
        type="button"
        size="icon"
        variant={isRecording ? "default" : "ghost"}
        onClick={onToggle}
        disabled={disabled || isProcessing}
        className={cn(
          "shrink-0 relative transition-all duration-150",
          isRecording && "bg-primary text-primary-foreground scale-110 ring-2 ring-primary/30",
          isSpeaking && "text-primary animate-pulse",
          className
        )}
        title={
          isRecording 
            ? "Tap to stop" 
            : isProcessing 
              ? "Processing..." 
              : isSpeaking
                ? "Tap to speak (stops agent)"
                : "Tap to talk (or press Spacebar)"
        }
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Mic className={cn("w-4 h-4", isRecording && "animate-pulse")} />
        )}
        
        {/* Recording indicator dot */}
        {isRecording && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full animate-pulse" />
        )}
      </Button>
    </div>
  );
}
