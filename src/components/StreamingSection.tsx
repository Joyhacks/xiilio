import { cn } from "@/lib/utils";
import {
  siNetflix,
  siAppletv,
  siMax,
} from "simple-icons";

// Helper to render Simple Icons SVG (inline to avoid ref warnings)
function SimpleIconSvg({ icon, className }: { icon: { path: string; title: string }; className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={cn("w-6 h-6", className)}
      fill="currentColor"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}

// Custom inline SVGs for platforms not in simple-icons
const customIcons = {
  primevideo: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Prime Video">
      <path d="M.504 15.935c-.139.14-.207.32-.207.54 0 .2.068.38.207.52.14.14.32.21.54.21h21.912c.22 0 .4-.07.54-.21.14-.14.21-.32.21-.52 0-.22-.07-.4-.21-.54-.14-.14-.32-.21-.54-.21H1.044c-.22 0-.4.07-.54.21zm.54-9.15c-.22 0-.4.07-.54.21-.14.14-.21.32-.21.54v5.76c0 .22.07.4.21.54.14.14.32.21.54.21h21.912c.22 0 .4-.07.54-.21.14-.14.21-.32.21-.54V7.535c0-.22-.07-.4-.21-.54-.14-.14-.32-.21-.54-.21H1.044zm1.5 1.5h18.912v3.76H2.544v-3.76z"/>
    </svg>
  ),
  hulu: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Hulu">
      <path d="M2.8 6.4v11.2h3.2v-5.4c0-.6.5-1.1 1.1-1.1h3c.6 0 1.1.5 1.1 1.1v5.4h3.2V6.4H11v1.9c0 .6-.5 1.1-1.1 1.1H2.8zm18.4.2h-3.2v2.9h3.2V6.6zm0 4.3h-3.2v6.7h3.2v-6.7zM0 11.1h3.2v6.5H0v-6.5zm15.6-4.5H12v2.9h3.6V6.6z"/>
    </svg>
  ),
  disneyplus: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Disney+">
      <path d="M8.14 11.88c.06-.08.08-.2.06-.32-.03-.14-.12-.24-.25-.29-.12-.04-.27-.02-.4.06-.12.08-.21.2-.24.33-.03.13.01.26.1.36.1.1.24.14.38.11.14-.03.27-.13.35-.25zm2.32-1.67c.1-.13.14-.31.1-.48-.05-.18-.17-.32-.34-.38-.16-.06-.36-.02-.52.1-.15.11-.27.28-.3.46-.04.18.02.36.15.49.13.13.32.19.5.14.19-.04.36-.18.41-.33zM24 10.5c0 .96-.63 1.77-1.5 2.04v.96c0 .55-.45 1-1 1s-1-.45-1-1v-.5H3.5v.5c0 .55-.45 1-1 1s-1-.45-1-1v-.96C.63 12.27 0 11.46 0 10.5c0-.83.5-1.54 1.22-1.85-.1-.33-.22-.7-.22-1.15 0-1.66 1.34-3 3-3 .27 0 .52.04.76.1C6.12 3.2 8.18 2 10.5 2c2.47 0 4.62 1.38 5.77 3.41.4-.26.88-.41 1.39-.41 1.38 0 2.5 1.12 2.5 2.5 0 .2-.03.39-.07.58.56.43.91 1.1.91 1.92zm-5.64-2.38c.1.07.28.08.41-.01.12-.09.18-.24.14-.38-.05-.14-.18-.24-.33-.24-.1 0-.2.04-.28.12-.12.12-.11.32.06.51zm-5.28 2.71c-.17-.17-.17-.44 0-.6l.76-.76c.17-.17.44-.17.6 0 .17.17.17.44 0 .6l-.75.76c-.17.17-.44.17-.61 0zM9.73 8.37c-.14-.14-.14-.38 0-.51l.65-.65c.14-.14.38-.14.51 0 .14.14.14.38 0 .51l-.65.65c-.13.14-.37.14-.51 0z"/>
    </svg>
  ),
  paramountplus: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Paramount+">
      <path d="M12.027 0L.377 19.2h5.52l1.974-3.263h3.878L9.765 19.2h5.52L12.027 0zm-.025 8.508l1.95 3.222H10.07l1.932-3.222zM21.65 19.197h-5.336v-5.336h5.336v5.336zM21.65 24h-5.336v-3.131h5.336V24z" />
    </svg>
  ),
};

type BrandKey = "netflix" | "primevideo" | "appletv" | "paramountplus" | "hulu" | "disneyplus" | "max";

// Map Simple Icons where available
const simpleIconMap: Partial<Record<BrandKey, { path: string; title: string }>> = {
  netflix: siNetflix,
  appletv: siAppletv,
  max: siMax,
};

// Brand-specific glow colors
const glowColors: Record<BrandKey, string> = {
  netflix: "shadow-[0_0_20px_rgba(229,9,20,0.5)]",
  primevideo: "shadow-[0_0_20px_rgba(0,168,225,0.5)]",
  appletv: "shadow-[0_0_20px_rgba(85,85,85,0.5)]",
  paramountplus: "shadow-[0_0_20px_rgba(0,100,255,0.5)]",
  hulu: "shadow-[0_0_20px_rgba(28,231,131,0.5)]",
  disneyplus: "shadow-[0_0_20px_rgba(17,60,207,0.5)]",
  max: "shadow-[0_0_20px_rgba(0,43,231,0.5)]",
};

// Render icon based on brand key (function component to avoid ref issues)
function BrandIcon({ brandKey }: { brandKey: BrandKey }) {
  const simpleIcon = simpleIconMap[brandKey];
  if (simpleIcon) {
    return <SimpleIconSvg icon={simpleIcon} />;
  }
  
  const customIcon = customIcons[brandKey as keyof typeof customIcons];
  if (customIcon) {
    return <>{customIcon}</>;
  }
  
  return null;
}

interface StreamingService {
  id: string;
  name: string;
  href: string;
  brandKey: BrandKey;
  bgColor: string;
}

// Main streaming services with video content
const videoServices: StreamingService[] = [
  {
    id: "netflix",
    name: "Netflix",
    href: "https://www.netflix.com/",
    brandKey: "netflix",
    bgColor: "bg-[#E50914]",
  },
  {
    id: "primevideo",
    name: "Prime Video",
    href: "https://www.primevideo.com/",
    brandKey: "primevideo",
    bgColor: "bg-[#00A8E1]",
  },
  {
    id: "appletv",
    name: "Apple TV+",
    href: "https://tv.apple.com/",
    brandKey: "appletv",
    bgColor: "bg-gradient-to-br from-[#555555] to-[#000000]",
  },
  {
    id: "paramountplus",
    name: "Paramount+",
    href: "https://www.paramountplus.com/",
    brandKey: "paramountplus",
    bgColor: "bg-[#0064FF]",
  },
];

// Additional streaming services
const additionalServices: StreamingService[] = [
  {
    id: "hulu",
    name: "Hulu",
    href: "https://www.hulu.com/",
    brandKey: "hulu",
    bgColor: "bg-[#1CE783]",
  },
  {
    id: "disneyplus",
    name: "Disney+",
    href: "https://www.disneyplus.com/",
    brandKey: "disneyplus",
    bgColor: "bg-[#113CCF]",
  },
  {
    id: "max",
    name: "Max",
    href: "https://www.max.com/",
    brandKey: "max",
    bgColor: "bg-[#002BE7]",
  },
];

interface StreamingLinksProps {
  services?: StreamingService[];
  showAll?: boolean;
  className?: string;
}

export function StreamingLinks({ 
  services = videoServices, 
  showAll = true,
  className 
}: StreamingLinksProps) {
  const allServices = showAll ? [...services, ...additionalServices] : services;
  
  // Filter out services without valid URLs
  const validServices = allServices.filter(service => service.href);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-6 justify-center">
        {validServices.map((service) => (
          <a
            key={service.id}
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch on ${service.name} (opens in new tab)`}
            className={cn(
              "group relative flex items-center justify-center",
              "w-16 h-16 rounded-full text-white",
              "ring-2 ring-white/20 backdrop-blur-sm",
              "transition-all duration-300 ease-out",
              "hover:scale-110 hover:ring-white/40",
              glowColors[service.brandKey],
              "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              service.bgColor
            )}
          >
            <BrandIcon brandKey={service.brandKey} />
            {/* Tooltip */}
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium bg-popover/95 text-popover-foreground rounded-lg shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border/50">
              {service.name}
            </span>
          </a>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center pt-6">
        Links open in a new tab.
      </p>
    </div>
  );
}

export function StreamingSection() {
  return (
    <section className="py-16 bg-muted/20 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            Watch on
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
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

// Export for reuse
export { videoServices, additionalServices };
export type { StreamingService, BrandKey };
