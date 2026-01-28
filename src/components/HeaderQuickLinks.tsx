import { useState } from "react";
import { getAgentLinks } from "@/lib/agentLinks";
import { useAuth } from "@/hooks/useAuth";
import { AuthOverlay } from "@/components/auth/AuthOverlay";
import { cn } from "@/lib/utils";
import {
  Mail,
  Send,
  Inbox,
  Share2,
  FileText,
  FileEdit,
  BookOpen,
  CalendarDays,
  Calendar,
  Headphones,
  Users,
  LifeBuoy,
  MessageCircle,
  ExternalLink,
  Link as LinkIcon,
  Video,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Mail,
  Send,
  Inbox,
  Share2,
  FileText,
  FileEdit,
  BookOpen,
  CalendarDays,
  Calendar,
  Headphones,
  Users,
  LifeBuoy,
  MessageCircle,
  Video,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
};

function ItemIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const Icon = iconMap[iconKey] || ExternalLink;
  return <Icon className={className} />;
}

interface HeaderQuickLinksProps {
  agentSlug: string | null;
  agentColor?: string;
}

export function HeaderQuickLinks({ agentSlug, agentColor }: HeaderQuickLinksProps) {
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!agentSlug) {
    return null;
  }

  // If not authenticated, show locked button that opens auth
  if (!isAuthenticated) {
    return (
      <>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => setShowAuthOverlay(true)}
          aria-label="Sign in to access quick links"
        >
          <Lock className="w-4 h-4" />
          <span className="hidden sm:inline">Quick Links</span>
        </Button>
        <AuthOverlay
          isOpen={showAuthOverlay}
          onClose={() => setShowAuthOverlay(false)}
          message="Sign in to access Quick Links and personalize your experience"
          defaultTab="signup"
        />
      </>
    );
  }

  const categories = getAgentLinks(agentSlug);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          aria-label="Open quick links menu"
        >
          <LinkIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Quick Links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-popover border-border"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          External Communications
        </DropdownMenuLabel>
        
        {categories.map((category, idx) => (
          <DropdownMenuGroup key={category.category}>
            {idx > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="flex items-center gap-2 text-sm font-medium">
              <ItemIcon iconKey={category.iconKey} className="w-4 h-4 text-muted-foreground" />
              {category.category}
            </DropdownMenuLabel>
            
            {category.items.map((item) => (
              <DropdownMenuItem
                key={item.label}
                disabled={item.enabled === false}
                asChild={item.enabled !== false}
                className={cn(
                  "cursor-pointer",
                  item.enabled === false && "opacity-50 cursor-not-allowed"
                )}
              >
                {item.enabled !== false ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-2 w-full",
                      agentColor && `hover:text-agent-${agentColor}`
                    )}
                  >
                    <ItemIcon iconKey={item.iconKey} className="w-4 h-4" />
                    <span className="flex-1">{item.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                ) : (
                  <span className="flex items-center gap-2">
                    <ItemIcon iconKey={item.iconKey} className="w-4 h-4" />
                    <span className="flex-1">{item.label}</span>
                    <span className="text-xs text-muted-foreground">N/A</span>
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
