import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  siNetflix,
  siAppletv,
  siParamountplus,
  siMax,
} from "simple-icons";

// Helper to render Simple Icons SVG
const SimpleIcon = ({ icon, className }: { icon: { path: string; title: string }; className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    className={cn("w-5 h-5", className)}
    fill="currentColor"
    aria-label={icon.title}
  >
    <path d={icon.path} />
  </svg>
);

// Custom inline SVGs for platforms not in simple-icons
const customIcons = {
  primevideo: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Prime Video">
      <path d="M1.5 21.641c6.516 4.478 15.16 4.478 21 0 .656-.503.187-1.199-.469-.888-5.484 2.85-12.609 2.906-19.594.094-.375-.188-.844.281-.937.794zm21.234-1.969c-.328-.422-2.062-.328-2.86-.234-.234.047-.281.234-.046.375.937.656 2.438.469 2.625.281.187-.234-.047-.75-.719-1.5zM14.953 9.094c0 .844-.047 1.594.375 2.344.328.609.844.984 1.406.984 1.031 0 1.641-.797 1.641-1.969 0-2.25-1.922-2.672-3.422-2.672v1.313zm3.938 4.828c-.235.281-.469.281-.703.094-.984-.844-1.172-1.219-1.688-2.016-1.594 1.641-2.766 2.156-4.828 2.156-2.484 0-4.359-1.5-4.359-4.547 0-2.391 1.266-3.984 3.094-4.781 1.594-.656 3.797-.797 5.484-.984V3.47c0-.656.047-1.453-.328-2.016-.328-.516-.984-.75-1.547-.75-1.031 0-1.969.563-2.203 1.688-.047.281-.234.516-.469.516l-2.625-.281c-.188-.047-.422-.188-.328-.516C9.281.328 11.156 0 12.844 0c.844 0 1.969.234 2.625.891.844.797.75 1.828.75 2.953v5.344c0 .609.234 1.219.703 1.641.188.141.234.375 0 .516-.563.469-1.547 1.359-2.109 1.828l.078-.251z" />
    </svg>
  ),
  hulu: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Hulu">
      <path d="M6.429 9.071v6.858h2.742v-4.628c0-.514.415-.93.929-.93h2.572c.514 0 .928.416.928.93v4.628H16.343V9.071H13.6V7.457c0-.514-.415-.929-.928-.929H6.429v2.543h-.001zM24 6.528H21.257V4.071h-2.743v6.857h2.743v-1.8c0-.514.414-.929.928-.929H24V6.528zM.743 9.071H0v6.858h2.743v-4.628c0-.514.414-.93.928-.93h1.415V7.629H2.743c-.515 0-.929.414-.929.928v.514h-1.07zM4.114 4.071v2.457h1.286V4.071H4.114z" />
    </svg>
  ),
  disneyplus: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Disney+">
      <path d="M1.17 10.391c-.164 0-.164.096-.055.15.437.15.983.327 1.475.396.546.069 1.365.178 1.911.178.164 0 .273-.028.273-.123 0-.096-.055-.178-.218-.178-.492 0-1.42-.123-2.185-.218-.164-.014-.328-.041-.492-.069-.164-.027-.273-.068-.382-.082-.218-.027-.273-.041-.327-.054zm.164 1.256c-.191.014-.191.123-.055.178.41.15.929.287 1.365.355.492.069 1.256.137 1.748.137.164 0 .246-.041.246-.137 0-.082-.055-.15-.191-.15-.437 0-1.201-.082-1.911-.164-.164-.014-.3-.041-.437-.055-.137-.027-.246-.055-.355-.082-.191-.041-.273-.068-.41-.082zm9.436-6.406c-.546.041-1.311.164-1.912.328-.137.041-.191.096-.191.178 0 .109.082.15.218.137.983-.096 2.13-.15 2.895-.15.218 0 .328-.041.328-.137 0-.096-.082-.164-.246-.191-.382-.041-.765-.096-1.092-.164zm-1.201 2.321c-.546.055-1.311.178-1.857.314-.137.041-.191.096-.191.178 0 .109.082.164.218.15.929-.096 2.021-.15 2.785-.15.218 0 .328-.041.328-.15 0-.096-.082-.164-.246-.191-.355-.055-.71-.096-1.037-.15zm.027 2.321c-.546.055-1.283.164-1.829.287-.137.041-.191.096-.191.178 0 .11.082.164.218.15.901-.082 1.966-.123 2.73-.123.218 0 .328-.041.328-.15 0-.096-.082-.164-.246-.178-.328-.055-.683-.109-1.01-.164zm9.053-5.314c-.328-.082-.765-.164-1.147-.191-.164-.014-.273.027-.273.123 0 .096.055.178.218.191.765.082 1.584.232 2.267.396.164.041.273.014.273-.082s-.082-.178-.246-.218c-.355-.096-.765-.164-1.092-.22zm-.055 2.13c-.328-.082-.71-.137-1.065-.178-.164-.014-.273.041-.273.123 0 .096.068.178.218.191.71.082 1.475.205 2.103.355.164.041.273.014.273-.082s-.082-.178-.246-.219c-.328-.082-.71-.15-1.01-.19zm-.382 2.253c-.328-.069-.683-.123-1.01-.164-.164-.027-.273.027-.273.123 0 .082.068.164.218.178.656.082 1.365.191 1.938.328.164.041.273.014.273-.082 0-.096-.082-.178-.246-.205-.3-.082-.628-.137-.9-.178zm3.283.683c-.437-.123-.983-.246-1.42-.314-.164-.027-.273.027-.273.109 0 .096.055.178.218.205.683.109 1.42.273 1.966.437.164.041.273.014.273-.082s-.082-.178-.273-.232c-.191-.055-.355-.096-.491-.123zm-.819 2.253c-.41-.11-.874-.205-1.256-.273-.164-.027-.273.027-.273.11 0 .082.055.164.218.19.601.097 1.229.233 1.748.383.15.041.246.014.246-.082s-.068-.164-.246-.205c-.164-.055-.3-.096-.437-.123zm-.601 2.075c-.355-.082-.765-.15-1.092-.205-.164-.027-.273.014-.273.096 0 .082.055.164.205.178.546.082 1.092.205 1.556.341.137.041.232.014.232-.069s-.068-.15-.232-.191c-.137-.055-.273-.096-.396-.15zm-10.639-.082c-.218-.069-.464-.123-.683-.164-.136-.027-.232.027-.232.096 0 .068.055.15.191.164.464.068.956.177 1.365.287.137.04.218.014.218-.068 0-.083-.068-.137-.191-.164-.246-.069-.464-.109-.668-.15zm3.829 1.584c-.492-.123-.929-.232-1.201-.287-.164-.041-.273-.014-.273.069 0 .068.082.15.218.177.328.069.929.205 1.42.342.164.04.246.014.246-.069 0-.068-.082-.137-.219-.164l-.19-.068zm-2.84-2.93c-.382-.096-.792-.178-1.147-.246-.136-.027-.232.027-.232.096 0 .068.068.15.205.164.519.082 1.065.191 1.502.314.136.041.218.014.218-.068 0-.082-.068-.137-.191-.164-.137-.04-.246-.068-.355-.096zm1.42 4.705c-.519-.137-.956-.246-1.229-.3-.164-.04-.273-.014-.273.069 0 .068.082.137.218.164.3.055.874.177 1.393.328.164.041.246 0 .246-.069 0-.068-.082-.15-.246-.178l-.11-.014zm4.732.847c-.546-.137-1.01-.246-1.283-.3-.164-.041-.273-.014-.273.069 0 .068.082.137.218.164.328.068.929.205 1.447.341.164.041.246.014.246-.068 0-.069-.082-.137-.246-.178l-.109-.028zm-4.786-1.31c-.546-.137-.983-.26-1.256-.314-.164-.04-.273-.014-.273.069 0 .068.082.15.218.177.3.055.847.178 1.365.328.164.041.246 0 .246-.068 0-.069-.082-.15-.232-.178l-.068-.014zm7.708 2.13c-.574-.15-1.038-.273-1.311-.328-.164-.04-.273 0-.273.069 0 .068.082.137.218.164.328.068.956.205 1.502.355.164.04.246 0 .246-.069s-.082-.137-.246-.177l-.136-.014zm-5.223-.628c-.574-.15-1.037-.287-1.311-.341-.163-.041-.273 0-.273.068 0 .069.082.137.219.164.327.069.928.205 1.474.355.164.041.246.014.246-.068 0-.069-.082-.137-.246-.178h-.109z" />
    </svg>
  ),
};

type BrandKey = "netflix" | "primevideo" | "appletv" | "paramountplus" | "hulu" | "disneyplus" | "max";

// Map Simple Icons where available
const simpleIconMap: Partial<Record<BrandKey, { path: string; title: string }>> = {
  netflix: siNetflix,
  appletv: siAppletv,
  paramountplus: siParamountplus,
  max: siMax,
};

// Render icon based on brand key
const BrandIcon = ({ brandKey }: { brandKey: BrandKey }) => {
  const simpleIcon = simpleIconMap[brandKey];
  if (simpleIcon) {
    return <SimpleIcon icon={simpleIcon} />;
  }
  
  const customIcon = customIcons[brandKey as keyof typeof customIcons];
  if (customIcon) {
    return customIcon;
  }
  
  return null;
};

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {validServices.map((service) => (
          <a
            key={service.id}
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch on ${service.name} (opens in new tab)`}
            className={cn(
              "group flex items-center justify-between gap-3 px-4 py-3",
              "rounded-xl text-white font-medium",
              "transition-all duration-300 ease-out",
              "hover:scale-[1.02] hover:brightness-110 hover:shadow-lg",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              service.bgColor
            )}
          >
            <div className="flex items-center gap-3">
              <BrandIcon brandKey={service.brandKey} />
              <span className="text-sm font-semibold">{service.name}</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">
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
