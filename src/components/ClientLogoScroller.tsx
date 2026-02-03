import { cn } from "@/lib/utils";

// Client logo imports
import doordashLogo from "@/assets/clients/doordash.svg";
import targetLogo from "@/assets/clients/target.svg";
import fatsalsLogo from "@/assets/clients/fatsals.png";
import dominosLogo from "@/assets/clients/dominos.svg";
import disneyworldLogo from "@/assets/clients/disneyworld.webp";
import hiltonLogo from "@/assets/clients/hilton.png";
import americanairlinesLogo from "@/assets/clients/americanairlines.png";
import spotifyLogo from "@/assets/clients/spotify.png";

const clientLogos = [
  { name: "DoorDash", logo: doordashLogo },
  { name: "Target", logo: targetLogo },
  { name: "Fat Sal's", logo: fatsalsLogo },
  { name: "Domino's Pizza", logo: dominosLogo },
  { name: "Disney World", logo: disneyworldLogo },
  { name: "Hilton Hotels", logo: hiltonLogo },
  { name: "American Airlines", logo: americanairlinesLogo },
  { name: "Spotify", logo: spotifyLogo },
];

interface ClientLogoScrollerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function ClientLogoScroller({ className, size = "md", fullWidth = false }: ClientLogoScrollerProps) {
  const logoSizeClasses = {
    sm: "h-6 w-16",
    md: "h-8 w-20 md:h-10 md:w-24",
    lg: "h-10 w-24 md:h-12 md:w-32",
  };

  // Double the logos for seamless infinite scroll
  const scrollingLogos = [...clientLogos, ...clientLogos];

  if (fullWidth) {
    return (
      <div className={cn("relative w-full overflow-hidden py-6 glass-card rounded-xl", className)}>
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-card/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-card/90 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex items-center gap-8 md:gap-12 animate-scroll-logos">
          {scrollingLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className={cn(
                "flex-shrink-0 flex items-center justify-center",
                logoSizeClasses[size]
              )}
              title={client.name}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl h-14 w-full glass-card", className)}>
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-card/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-card/80 to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="flex items-center gap-6 animate-scroll-logos h-full">
        {scrollingLogos.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className={cn(
              "flex-shrink-0 flex items-center justify-center",
              logoSizeClasses[size]
            )}
            title={client.name}
          >
            <img
              src={client.logo}
              alt={client.name}
              className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
