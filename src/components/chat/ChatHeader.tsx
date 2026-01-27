import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ChatHeaderProps {
  agentName: string;
  agentAvatar: string;
}

export function ChatHeader({ agentName, agentAvatar }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-muted/30">
      <Avatar className="w-10 h-10 ring-2 ring-agent-receptionist/30">
        <AvatarImage src={agentAvatar} alt={agentName} />
        <AvatarFallback>{agentName[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold text-foreground">{agentName}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Online
        </p>
      </div>
    </div>
  );
}
