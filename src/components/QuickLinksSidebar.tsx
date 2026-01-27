import { useState } from "react";
import { cn } from "@/lib/utils";
import { getAgentLinks, type AgentLinkCategory } from "@/lib/agentLinks";
import { useIsMobile } from "@/hooks/use-mobile";
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
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Video,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface QuickLinksSidebarProps {
  agentSlug: string;
  agentColor?: string;
  className?: string;
}

function LinkIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const Icon = iconMap[iconKey] || ExternalLink;
  return <Icon className={className} />;
}

function SidebarContent({
  categories,
  agentColor,
}: {
  categories: AgentLinkCategory[];
  agentColor?: string;
}) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    // Default all categories to open
    return categories.reduce((acc, cat) => ({ ...acc, [cat.category]: true }), {});
  });

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-sm font-semibold text-foreground mb-2 px-2">Quick Links</h2>
      
      {categories.map((category) => (
        <Collapsible
          key={category.category}
          open={openCategories[category.category]}
          onOpenChange={() => toggleCategory(category.category)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between px-2 h-9 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              aria-label={`Toggle ${category.category} section`}
            >
              <span className="flex items-center gap-2">
                <LinkIcon iconKey={category.iconKey} className="w-4 h-4" />
                <span className="text-sm font-medium">{category.category}</span>
              </span>
              {openCategories[category.category] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="pl-4 mt-1 space-y-1">
            {category.items.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  {item.enabled !== false ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all",
                        "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                        agentColor && `hover:text-agent-${agentColor}`
                      )}
                      aria-label={`${item.label} - ${item.description || "Open external link"}`}
                    >
                      <LinkIcon iconKey={item.iconKey} className="w-4 h-4" />
                      <span className="flex-1">{item.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  ) : (
                    <div
                      className={cn(
                        "flex items-center gap-2 px-2 py-2 rounded-lg text-sm",
                        "text-muted-foreground/50 cursor-not-allowed"
                      )}
                      aria-label={`${item.label} - Not configured`}
                    >
                      <LinkIcon iconKey={item.iconKey} className="w-4 h-4" />
                      <span className="flex-1">{item.label}</span>
                    </div>
                  )}
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-popover text-popover-foreground">
                  {item.description || item.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}

export function QuickLinksSidebar({
  agentSlug,
  agentColor,
  className,
}: QuickLinksSidebarProps) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const categories = getAgentLinks(agentSlug);

  // Mobile: use Sheet (drawer)
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-4 left-4 z-40 shadow-lg"
            aria-label="Open quick links"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Quick Links
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 bg-card">
          <SheetHeader className="p-4 border-b border-border/50">
            <SheetTitle className="text-foreground">Quick Links</SheetTitle>
          </SheetHeader>
          <SidebarContent categories={categories} agentColor={agentColor} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: fixed sidebar
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-30",
        "bg-card/95 backdrop-blur-sm border-r border-border/50",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-14" : "w-64",
        className
      )}
    >
      {/* Collapse toggle */}
      <div className="absolute -right-3 top-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full bg-card border-border shadow-sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeft className="w-3 h-3" />
          ) : (
            <PanelLeftClose className="w-3 h-3" />
          )}
        </Button>
      </div>

      {/* Content */}
      <div className={cn("h-full overflow-y-auto", isCollapsed && "hidden")}>
        <SidebarContent categories={categories} agentColor={agentColor} />
      </div>

      {/* Collapsed state: show icons only */}
      {isCollapsed && (
        <div className="flex flex-col items-center gap-2 pt-6">
          {categories.map((category) => (
            <Tooltip key={category.category}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsCollapsed(false)}
                  aria-label={category.category}
                >
                  <LinkIcon iconKey={category.iconKey} className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{category.category}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}
    </aside>
  );
}
