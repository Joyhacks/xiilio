import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceControlsProps {
  autoSpeak: boolean;
  onAutoSpeakChange: (enabled: boolean) => void;
}

export function VoiceControls({
  autoSpeak,
  onAutoSpeakChange,
}: VoiceControlsProps) {
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
      <PopoverContent className="w-64" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Auto-speak replies</span>
            <Switch
              checked={autoSpeak}
              onCheckedChange={onAutoSpeakChange}
            />
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
