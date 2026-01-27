import { useState, useCallback, useEffect, useRef } from "react";
import { Mic, Loader2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VoiceState } from "@/lib/voiceConfig";

interface PushToTalkButtonProps {
  state: VoiceState;
  audioLevel: number;
  onPressStart: () => void;
  onPressEnd: () => void;
  isSpeaking: boolean;
  disabled?: boolean;
  className?: string;
}

export function PushToTalkButton({
  state,
  audioLevel,
  onPressStart,
  onPressEnd,
  isSpeaking,
  disabled,
  className,
}: PushToTalkButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle pointer events (mouse and touch)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsPressed(true);
    onPressStart();
  }, [disabled, onPressStart]);

  const handlePointerUp = useCallback(() => {
    if (isPressed) {
      setIsPressed(false);
      onPressEnd();
    }
  }, [isPressed, onPressEnd]);

  const handlePointerLeave = useCallback(() => {
    if (isPressed) {
      setIsPressed(false);
      onPressEnd();
    }
  }, [isPressed, onPressEnd]);

  // Prevent context menu on long press (mobile)
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

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
        ref={buttonRef}
        type="button"
        size="icon"
        variant={isRecording ? "default" : "ghost"}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerUp}
        onContextMenu={handleContextMenu}
        disabled={disabled || isProcessing}
        className={cn(
          "shrink-0 relative transition-all duration-150 touch-none select-none",
          isRecording && "bg-primary text-primary-foreground scale-110 ring-2 ring-primary/30",
          isSpeaking && "text-primary",
          className
        )}
        title={
          isRecording 
            ? "Release to send" 
            : isProcessing 
              ? "Processing..." 
              : "Hold to talk (or hold Spacebar)"
        }
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isSpeaking ? (
          <Volume2 className="w-4 h-4 animate-pulse" />
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
