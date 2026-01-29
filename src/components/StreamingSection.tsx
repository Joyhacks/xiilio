// Streaming Services Section
// Displays streaming service icons with hover effects and accessibility

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
        // Base styles - glass morphism container
        "group relative flex items-center justify-center",
        "w-14 h-14 md:w-18 md:h-18 rounded-2xl",
        // 3D Glass effect
        "border border-white/30",
        "bg-gradient-to-br from-white/20 via-transparent to-black/20",
        "backdrop-blur-md",
        // Transitions
        "transition-all duration-300 ease-out",
        // Hover effects - lift and glow
        "hover:scale-110 hover:-translate-y-1",
        "hover:border-white/50",
        // Focus states for accessibility
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        // Brand-specific background and glow
        colors.bg,
        colors.glow
      )}
    >
      {/* Glass highlight overlay */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      
      {/* Icon */}
      <StreamingIcon 
        brandKey={service.brandKey} 
        size={24}
        className="relative z-10 drop-shadow-lg transition-transform duration-200 group-hover:scale-110 md:w-7 md:h-7"
      />
      
      {/* Tooltip */}
      <span 
        className={cn(
          "absolute -bottom-10 left-1/2 -translate-x-1/2",
          "px-3 py-1.5 text-xs font-medium",
          "bg-popover/95 text-popover-foreground",
          "rounded-lg shadow-xl backdrop-blur-sm",
          "border border-border/50",
          "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100",
          "transition-all duration-200",
          "whitespace-nowrap pointer-events-none z-20"
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
        className="flex flex-wrap gap-4 md:gap-6 justify-center"
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
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      className="py-12 bg-muted/20 border-t border-border/50"
      aria-labelledby="streaming-section-title"
    >
      <div 
        ref={ref}
        className={cn(
          "container mx-auto px-4 md:px-6 transition-all duration-700 ease-out",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="text-center mb-8 md:mb-10">
          <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">
            Watch on
          </p>
          <h2 
            id="streaming-section-title"
            className="font-display text-xl md:text-2xl font-bold text-foreground"
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
