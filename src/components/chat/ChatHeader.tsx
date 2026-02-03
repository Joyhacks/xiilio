import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ReactNode } from "react";
import { ClientLogoScroller } from "@/components/ClientLogoScroller";

export interface ChatHeaderProps {
  agentName: string;
  agentAvatar: string;
  rightContent?: ReactNode;
}

export function ChatHeader({ agentName, agentAvatar, rightContent }: ChatHeaderProps) {
  return (
    <div className="flex flex-col border-b border-border/50 bg-muted/30">
      {/* Main header row */}
      <div className="flex items-center gap-3 p-4">
        <Avatar className="w-10 h-10 ring-2 ring-agent-receptionist/30">
          <AvatarImage src={agentAvatar} alt={agentName} />
          <AvatarFallback>{agentName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{agentName}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Online
          </p>
        </div>
        {rightContent && (
          <div className="flex items-center">
            {rightContent}
          </div>
        )}
      </div>
      
      {/* Client logos scroller */}
      <div className="px-4 pb-3">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Trusted by</p>
        <ClientLogoScroller size="sm" />
      </div>
    </div>
  );
}
