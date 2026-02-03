import { cn } from "@/lib/utils";

// Client logo imports
import doordashLogo from "@/assets/clients/doordash.svg";
import targetLogo from "@/assets/clients/target.svg";
import fatsalsLogo from "@/assets/clients/fatsals.png";
import signapayLogo from "@/assets/clients/signapay.png";

const clientLogos = [
  { name: "DoorDash", logo: doordashLogo },
  { name: "Target", logo: targetLogo },
  { name: "Fat Sal's", logo: fatsalsLogo },
  { name: "SignaPay", logo: signapayLogo },
];

interface ClientLogoScrollerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ClientLogoScroller({ className, size = "md" }: ClientLogoScrollerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12 md:h-14 md:w-14",
    lg: "h-16 w-16 md:h-20 md:w-20",
  };

  const containerSizeClasses = {
    sm: "h-10 w-24",
    md: "h-14 w-32 md:h-16 md:w-40",
    lg: "h-20 w-40 md:h-24 md:w-48",
  };

  // Double the logos for seamless infinite scroll
  const scrollingLogos = [...clientLogos, ...clientLogos];

  return (
    <div className={cn("relative overflow-hidden rounded-xl", containerSizeClasses[size], className)}>
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-background/80 to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="flex items-center gap-4 md:gap-6 animate-scroll-logos">
        {scrollingLogos.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className={cn(
              "flex-shrink-0 flex items-center justify-center",
              sizeClasses[size]
            )}
          >
            <img
              src={client.logo}
              alt={client.name}
              className="w-full h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
