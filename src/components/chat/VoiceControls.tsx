import { Volume2, VolumeX, Speaker, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface VoiceControlsProps {
  autoSpeak: boolean;
  volume: number;
  speed: number;
  isSpeaking: boolean;
  onAutoSpeakChange: (enabled: boolean) => void;
  onVolumeChange: (volume: number) => void;
  onSpeedChange: (speed: number) => void;
  onStopSpeaking: () => void;
}

export function VoiceControls({
  autoSpeak,
  volume,
  speed,
  isSpeaking,
  onAutoSpeakChange,
  onVolumeChange,
  onSpeedChange,
  onStopSpeaking,
}: VoiceControlsProps) {
  return (
    <div className="flex items-center gap-1">
      {/* Stop speaking button - only shown when speaking */}
      {isSpeaking && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={onStopSpeaking}
          className="shrink-0 text-primary animate-pulse"
          title="Stop speaking"
        >
          <VolumeX className="w-4 h-4" />
        </Button>
      )}

      {/* Voice settings popover */}
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
            <Volume2 className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
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
                <span className="text-sm font-medium">Volume</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <Slider
                value={[volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={([val]) => onVolumeChange(val)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Speed</span>
                <span className="text-xs text-muted-foreground">
                  {speed.toFixed(1)}x
                </span>
              </div>
              <Slider
                value={[speed]}
                min={0.8}
                max={1.5}
                step={0.1}
                onValueChange={([val]) => onSpeedChange(val)}
                className="w-full"
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              Hold the mic button or Spacebar to talk.
              Agent will speak responses when auto-speak is enabled.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
