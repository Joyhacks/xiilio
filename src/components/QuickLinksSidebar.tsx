import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { getAgentLinks, agentConfigs, type AgentLinkCategory, type AgentLinkItem } from "@/lib/agentLinks";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAgentLinksSettings } from "@/hooks/useAgentLinksSettings";
import { QuickLinksSettings } from "@/components/QuickLinksSettings";
import { ContactPicker } from "@/components/ContactPicker";
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
  MessageSquare,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  PanelLeft,
  Video,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Settings,
  Phone,
  Zap,
  Workflow,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  MessageSquare,
  Video,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Phone,
  Zap,
  Workflow,
};

interface QuickLinksSidebarProps {
  agentSlug: string;
  agentName?: string;
  agentColor?: string;
  className?: string;
}

function LinkIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const Icon = iconMap[iconKey] || ExternalLink;
  return <Icon className={className} />;
}

// Collapsed icon with hover popover showing category links
function CollapsedCategoryIcon({
  category,
  agentColor,
}: {
  category: AgentLinkCategory;
  agentColor?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "w-10 h-10 text-muted-foreground relative group",
            "transition-all duration-200 ease-out",
            "hover:text-foreground hover:bg-muted/50 hover:scale-110",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
            isOpen && "bg-muted/50 text-foreground scale-110"
          )}
          aria-label={category.category}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <LinkIcon 
            iconKey={category.iconKey} 
            className={cn(
              "w-5 h-5 transition-transform duration-200",
              "group-hover:scale-110"
            )} 
          />
          {/* Glow effect on hover */}
          <span 
            className={cn(
              "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
              "group-hover:opacity-100",
              "bg-primary/10 blur-sm"
            )} 
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={8}
        className={cn(
          "w-56 p-2 bg-card/95 backdrop-blur-md border-border/50",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-left-2",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground px-2 py-1 flex items-center gap-2">
            <LinkIcon iconKey={category.iconKey} className="w-3 h-3" />
            {category.category}
          </p>
          {category.items.map((item) => (
            <CollapsedLinkItem key={item.label} item={item} agentColor={agentColor} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CollapsedLinkItem({ 
  item, 
  agentColor 
}: { 
  item: AgentLinkItem; 
  agentColor?: string;
}) {
  if (item.enabled === false) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm",
          "text-muted-foreground/50 cursor-not-allowed"
        )}
      >
        <LinkIcon iconKey={item.iconKey} className="w-4 h-4" />
        <span className="flex-1 truncate">{item.label}</span>
        <span className="text-xs">N/A</span>
      </div>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm",
        "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        "transition-all duration-150 group/link",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        agentColor && `hover:text-agent-${agentColor}`
      )}
    >
      <LinkIcon iconKey={item.iconKey} className="w-4 h-4 transition-transform group-hover/link:scale-110" />
      <span className="flex-1 truncate">{item.label}</span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-50 transition-opacity" />
    </a>
  );
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
      
      {/* Phone Contacts Access */}
      <div className="px-2 pb-2 border-b border-border/30 mb-2">
        <ContactPicker 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
        />
      </div>
      
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
              className={cn(
                "w-full justify-between px-2 h-9",
                "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                "transition-all duration-200 group"
              )}
              aria-label={`Toggle ${category.category} section`}
            >
              <span className="flex items-center gap-2">
                <LinkIcon 
                  iconKey={category.iconKey} 
                  className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" 
                />
                <span className="text-sm font-medium">{category.category}</span>
              </span>
              <ChevronDown 
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  !openCategories[category.category] && "-rotate-90"
                )} 
              />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent 
            className={cn(
              "pl-4 mt-1 space-y-1 overflow-hidden",
              "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
            )}
          >
            {category.items.map((item, idx) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  {item.enabled !== false ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-2 py-2 rounded-lg text-sm",
                        "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        "transition-all duration-200 group/item",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                        "animate-fade-in",
                        agentColor && `hover:text-agent-${agentColor}`
                      )}
                      style={{ animationDelay: `${idx * 50}ms` }}
                      aria-label={`${item.label} - ${item.description || "Open external link"}`}
                    >
                      <LinkIcon 
                        iconKey={item.iconKey} 
                        className="w-4 h-4 transition-transform duration-200 group-hover/item:scale-110" 
                      />
                      <span className="flex-1">{item.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/item:opacity-50 transition-opacity duration-200" />
                    </a>
                  ) : (
                    <div
                      className={cn(
                        "flex items-center gap-2 px-2 py-2 rounded-lg text-sm",
                        "text-muted-foreground/50 cursor-not-allowed",
                        "animate-fade-in"
                      )}
                      style={{ animationDelay: `${idx * 50}ms` }}
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
  agentName,
  agentColor,
  className,
}: QuickLinksSidebarProps) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Get user settings from localStorage
  const { settings, hasCustomSettings } = useAgentLinksSettings(agentSlug);
  
  // Get categories with user settings merged
  const categories = getAgentLinks(agentSlug, settings);
  
  // Resolved agent name
  const resolvedAgentName = agentName || agentConfigs[agentSlug]?.name || "Agent";
  
  // Force refresh when settings change
  const handleSettingsChange = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  // Mobile: use Sheet (drawer)
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "fixed bottom-4 left-4 z-40 shadow-lg",
              "transition-all duration-300 hover:scale-105",
              "bg-card/95 backdrop-blur-sm",
              hasCustomSettings && "border-primary/50"
            )}
            aria-label="Open quick links"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Quick Links
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 bg-card/95 backdrop-blur-md">
          <SheetHeader className="p-4 border-b border-border/50 flex flex-row items-center justify-between">
            <SheetTitle className="text-foreground">Quick Links</SheetTitle>
            <QuickLinksSettings
              agentSlug={agentSlug}
              agentName={resolvedAgentName}
              agentColor={agentColor}
              onSettingsChange={handleSettingsChange}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 text-muted-foreground hover:text-foreground",
                    hasCustomSettings && "text-primary"
                  )}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              }
            />
          </SheetHeader>
          <SidebarContent key={refreshKey} categories={categories} agentColor={agentColor} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: fixed sidebar with animated collapse
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-30",
        "bg-card/95 backdrop-blur-sm border-r border-border/50",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Collapse toggle button with animation */}
      <div className="absolute -right-3 top-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-6 w-6 rounded-full bg-card border-border shadow-md",
            "transition-all duration-300 hover:scale-110 hover:shadow-lg",
            "hover:bg-primary hover:text-primary-foreground hover:border-primary",
            "focus:outline-none focus:ring-2 focus:ring-ring"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft 
            className={cn(
              "w-3 h-3 transition-transform duration-300",
              !isCollapsed && "rotate-180"
            )} 
          />
        </Button>
      </div>

      {/* Expanded content with fade animation */}
      <div 
        className={cn(
          "h-full overflow-y-auto transition-all duration-300 flex flex-col",
          isCollapsed ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        )}
      >
        <SidebarContent key={refreshKey} categories={categories} agentColor={agentColor} />
        
        {/* Settings button at bottom */}
        <div className="mt-auto p-4 border-t border-border/50">
          <QuickLinksSettings
            agentSlug={agentSlug}
            agentName={resolvedAgentName}
            agentColor={agentColor}
            onSettingsChange={handleSettingsChange}
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
                  hasCustomSettings && "text-primary"
                )}
              >
                <Settings className="w-4 h-4" />
                Configure Links
                {hasCustomSettings && (
                  <span className="ml-auto text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                    Custom
                  </span>
                )}
              </Button>
            }
          />
        </div>
      </div>

      {/* Collapsed state: animated icons with hover popovers */}
      <div
        className={cn(
          "absolute inset-0 pt-6 flex flex-col items-center gap-1",
          "transition-all duration-300",
          isCollapsed ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {/* Mini header */}
        <div className="mb-2 w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </div>
        
        {/* Separator */}
        <div className="w-8 h-px bg-border/50 mb-2" />
        
        {/* Category icons with hover reveal */}
        {categories.map((category, idx) => (
          <div
            key={category.category}
            className="animate-fade-in"
            style={{ animationDelay: `${idx * 75}ms` }}
          >
            <CollapsedCategoryIcon category={category} agentColor={agentColor} />
          </div>
        ))}
        
        {/* Expand hint at bottom */}
        <div className="mt-auto mb-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                onClick={() => setIsCollapsed(false)}
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Expand sidebar</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </aside>
  );
}
