// Streaming Services Section
// Displays streaming service icons with hover effects and accessibility

import { cn } from "@/lib/utils";
import {
  StreamingIcon,
  brandColors,
  primaryStreamingServices,
  additionalStreamingServices,
  type StreamingService,
  type StreamingBrandKey,
} from "@/lib/streamingIcons";

// ============================================
// STREAMING LINK COMPONENT
// ============================================

interface StreamingLinkProps {
  service: StreamingService;
}

function StreamingLink({ service }: StreamingLinkProps) {
  const colors = brandColors[service.brandKey];
  
  return (
    <a
      href={service.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch on ${service.name} (opens in new tab)`}
      className={cn(
        // Base styles
        "group relative flex items-center justify-center",
        "w-16 h-16 rounded-full text-white",
        "ring-2 ring-white/20 backdrop-blur-sm",
        // Transitions
        "transition-all duration-300 ease-out",
        // Hover effects
        "hover:scale-110 hover:ring-white/40",
        "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
        // Focus states for accessibility
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        // Brand-specific styles
        colors.bg,
        colors.glow
      )}
    >
      <StreamingIcon 
        brandKey={service.brandKey} 
        size={24}
        className="transition-transform duration-200 group-hover:scale-105"
      />
      
      {/* Tooltip */}
      <span 
        className={cn(
          "absolute -bottom-9 left-1/2 -translate-x-1/2",
          "px-3 py-1.5 text-xs font-medium",
          "bg-popover/95 text-popover-foreground",
          "rounded-lg shadow-lg backdrop-blur-sm",
          "border border-border/50",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-200",
          "whitespace-nowrap pointer-events-none"
        )}
        role="tooltip"
      >
        {service.name}
      </span>
    </a>
  );
}

// ============================================
// STREAMING LINKS GRID
// ============================================

interface StreamingLinksProps {
  services?: StreamingService[];
  showAll?: boolean;
  className?: string;
}

export function StreamingLinks({ 
  services = primaryStreamingServices, 
  showAll = true,
  className 
}: StreamingLinksProps) {
  const displayServices = showAll 
    ? [...services, ...additionalStreamingServices] 
    : services;
  
  // Filter out services without valid URLs
  const validServices = displayServices.filter(service => service.href);

  return (
    <div className={cn("space-y-4", className)}>
      <div 
        className="flex flex-wrap gap-6 justify-center"
        role="list"
        aria-label="Streaming services"
      >
        {validServices.map((service) => (
          <div key={service.id} role="listitem">
            <StreamingLink service={service} />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center pt-6">
        Links open in a new tab.
      </p>
    </div>
  );
}

// ============================================
// STREAMING SECTION
// ============================================

export function StreamingSection() {
  return (
    <section 
      className="py-16 bg-muted/20 border-t border-border/50"
      aria-labelledby="streaming-section-title"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            Watch on
          </p>
          <h2 
            id="streaming-section-title"
            className="font-display text-2xl font-bold text-foreground"
          >
            Available on your favorite platforms
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <StreamingLinks showAll={true} />
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXPORTS
// ============================================

export { primaryStreamingServices, additionalStreamingServices };
export type { StreamingService, StreamingBrandKey };
