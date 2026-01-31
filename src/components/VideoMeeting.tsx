import { useState, useCallback } from "react";
import { Video, VideoOff, ExternalLink, Loader2, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Google Meet icon
const GoogleMeetIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M9.5 7.5v9l7-4.5z"/>
  </svg>
);

// Zoom icon
const ZoomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M4.585 7.5C4.585 6.67 5.256 6 6.085 6h9.33c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-9.33c-.83 0-1.5-.67-1.5-1.5v-6zm11.83 2.25l3-1.875v7.25l-3-1.875v-3.5z"/>
  </svg>
);

// Jitsi icon
const JitsiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

interface VideoMeetingProps {
  agentName: string;
  agentAvatar: string;
  agentColor: string;
  googleMeetUrl?: string;
  zoomUrl?: string;
}

export function VideoMeeting({
  agentName,
  agentAvatar,
  agentColor,
  googleMeetUrl,
  zoomUrl,
}: VideoMeetingProps) {
  const [isJitsiActive, setIsJitsiActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [customRoom, setCustomRoom] = useState("");

  // Generate a unique room name based on agent and timestamp
  const generateRoomName = useCallback(() => {
    const sanitizedAgent = agentName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const timestamp = Date.now().toString(36);
    return `24twelve-${sanitizedAgent}-${timestamp}`;
  }, [agentName]);

  const startJitsiMeeting = useCallback(() => {
    setIsLoading(true);
    const room = customRoom.trim() || generateRoomName();
    setRoomName(room);
    
    // Small delay to show loading state
    setTimeout(() => {
      setIsJitsiActive(true);
      setIsLoading(false);
      toast({
        title: "Video Meeting Started",
        description: `Room: ${room}`,
      });
    }, 500);
  }, [customRoom, generateRoomName]);

  const endJitsiMeeting = useCallback(() => {
    setIsJitsiActive(false);
    setRoomName("");
    toast({
      title: "Meeting Ended",
      description: "Video call has been disconnected.",
    });
  }, []);

  const openExternalMeeting = (url: string, platform: string) => {
    if (!url) {
      toast({
        variant: "destructive",
        title: `${platform} Not Configured`,
        description: `Add your ${platform} meeting link in Settings.`,
      });
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    toast({
      title: `Opening ${platform}`,
      description: "Meeting link opened in new tab.",
    });
  };

  const copyMeetingLink = () => {
    if (roomName) {
      const link = `https://meet.jit.si/${roomName}`;
      navigator.clipboard.writeText(link);
      toast({
        title: "Link Copied",
        description: "Share this link to invite others.",
      });
    }
  };

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
            <Video className="w-3 h-3" />
            Video Meeting
          </p>
        </div>
        {isJitsiActive && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Live</span>
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!isJitsiActive ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-3">
              <div className={cn(
                "w-20 h-20 mx-auto rounded-full flex items-center justify-center",
                `bg-agent-${agentColor}/20`
              )}>
                <Video className={cn("w-10 h-10", `text-agent-${agentColor}`)} />
              </div>
              <h4 className="text-lg font-semibold text-foreground">
                Video Meeting Options
              </h4>
              <p className="text-sm text-muted-foreground max-w-sm">
                Start an instant meeting or join via Google Meet / Zoom.
              </p>
            </div>

            {/* Jitsi Meet - Embedded Option */}
            <div className="w-full max-w-sm space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">Instant Meeting</h5>
                    <p className="text-xs text-muted-foreground">No account needed • Free</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Custom Room Name (optional)</Label>
                    <Input
                      value={customRoom}
                      onChange={(e) => setCustomRoom(e.target.value)}
                      placeholder="my-meeting-room"
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  <Button
                    onClick={startJitsiMeeting}
                    disabled={isLoading}
                    className="w-full gap-2"
                    variant="hero"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Starting...
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4" />
                        Start Video Call
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or join via</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* External Meeting Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => openExternalMeeting(googleMeetUrl || "", "Google Meet")}
                  className={cn(
                    "gap-2 h-12 flex-col",
                    googleMeetUrl && "border-[#00897B]/30 hover:bg-[#00897B]/10"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-[#00897B] flex items-center justify-center">
                      <GoogleMeetIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium">Google Meet</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => openExternalMeeting(zoomUrl || "", "Zoom")}
                  className={cn(
                    "gap-2 h-12 flex-col",
                    zoomUrl && "border-[#2D8CFF]/30 hover:bg-[#2D8CFF]/10"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-[#2D8CFF] flex items-center justify-center">
                      <ZoomIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium">Zoom</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </Button>
              </div>

              {(!googleMeetUrl && !zoomUrl) && (
                <p className="text-xs text-center text-muted-foreground">
                  Configure your meeting links in{" "}
                  <a href="/settings" className="text-primary hover:underline">
                    Settings → Links
                  </a>
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Jitsi Embedded Meeting */
          <div className="flex-1 relative">
            <iframe
              src={`https://meet.jit.si/${roomName}#config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=false&interfaceConfig.TOOLBAR_BUTTONS=["microphone","camera","closedcaptions","desktop","fullscreen","fodeviceselection","hangup","chat","recording","settings","raisehand","videoquality","tileview"]`}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              className="w-full h-full border-0"
              title="Video Meeting"
            />
          </div>
        )}
      </div>

      {/* Footer Controls */}
      {isJitsiActive && (
        <div className="p-4 border-t border-border/50 bg-muted/30">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">
                Room: <span className="text-foreground font-mono">{roomName}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyMeetingLink}
                className="gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Copy Link
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={endJitsiMeeting}
                className="gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                End
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
