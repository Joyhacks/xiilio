import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const VOICE_SPEED_KEY = "voice-speed-preference";

interface VoiceControlsProps {
  autoSpeak: boolean;
  onAutoSpeakChange: (enabled: boolean) => void;
  voiceSpeed?: number;
  onVoiceSpeedChange?: (speed: number) => void;
}

export function VoiceControls({
  autoSpeak,
  onAutoSpeakChange,
  voiceSpeed: externalVoiceSpeed,
  onVoiceSpeedChange,
}: VoiceControlsProps) {
  const [localVoiceSpeed, setLocalVoiceSpeed] = useState(() => {
    const saved = localStorage.getItem(VOICE_SPEED_KEY);
    return saved ? parseFloat(saved) : 1.0;
  });

  const voiceSpeed = externalVoiceSpeed ?? localVoiceSpeed;

  const handleSpeedChange = (value: number[]) => {
    const newSpeed = value[0];
    setLocalVoiceSpeed(newSpeed);
    localStorage.setItem(VOICE_SPEED_KEY, newSpeed.toString());
    onVoiceSpeedChange?.(newSpeed);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={cn(
            "shrink-0",
            autoSpeak ? "text-primary" : "text-muted-foreground"
          )}
          title="Voice settings"
        >
          <Settings2 className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Auto-speak replies</span>
            <Switch
              checked={autoSpeak}
              onCheckedChange={onAutoSpeakChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Voice speed</span>
              <span className="text-xs text-muted-foreground">{voiceSpeed.toFixed(1)}x</span>
            </div>
            <Slider
              value={[voiceSpeed]}
              onValueChange={handleSpeedChange}
              min={0.8}
              max={1.5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.8x</span>
              <span>1.5x</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Tap the mic button or hold Spacebar to talk.
            Speech stops automatically after 1.4s of silence.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
