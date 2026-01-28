import { cn } from "@/lib/utils";
import {
  siFacebook,
  siInstagram,
  siTiktok,
  siWhatsapp,
  siX,
  siYoutube,
} from "simple-icons";

// Helper to render Simple Icons SVG
const SimpleIcon = ({ icon, className }: { icon: { path: string; title: string }; className?: string }) => (
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

// Custom LinkedIn path (official brand)
const linkedinPath = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

// Custom Threads path (official brand)
const threadsPath = "M12.186 24h-.007C5.462 24 .001 18.635.001 12.001.001 5.366 5.462 0 12.178 0c4.45 0 8.292 2.336 10.404 5.835a.75.75 0 01-1.282.78C19.459 3.646 16.075 1.5 12.178 1.5 6.303 1.5 1.501 6.206 1.501 12c0 5.795 4.802 10.5 10.677 10.5 4.136 0 7.659-2.359 9.347-5.833a.75.75 0 011.34.668C20.765 21.14 16.778 24 12.186 24zm5.79-9.058c-.213 2.874-2.396 4.558-5.462 4.558-3.556 0-5.91-2.404-5.91-6.005 0-3.602 2.354-6.006 5.91-6.006 3.066 0 5.249 1.685 5.462 4.558a.75.75 0 01-1.496.112c-.15-2.028-1.728-3.17-3.966-3.17-2.703 0-4.41 1.794-4.41 4.506s1.707 4.505 4.41 4.505c2.238 0 3.816-1.141 3.966-3.17a.75.75 0 011.496.112z";

type SocialPlatform = "facebook" | "instagram" | "tiktok" | "linkedin" | "whatsapp" | "x" | "threads" | "youtube";

// All social icons - mix of simple-icons and custom paths
const simpleIconMap: Record<SocialPlatform, { path: string; title: string }> = {
  facebook: siFacebook,
  instagram: siInstagram,
  tiktok: siTiktok,
  whatsapp: siWhatsapp,
  linkedin: { path: linkedinPath, title: "LinkedIn" },
  x: siX,
  threads: { path: threadsPath, title: "Threads" },
  youtube: siYoutube,
};

// Brand-specific glow colors (updated 2025)
const glowColors: Record<SocialPlatform, string> = {
  facebook: "shadow-[0_0_20px_rgba(24,119,242,0.5)]",
  instagram: "shadow-[0_0_20px_rgba(225,48,108,0.5)]",
  tiktok: "shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  linkedin: "shadow-[0_0_20px_rgba(10,102,194,0.5)]",
  whatsapp: "shadow-[0_0_20px_rgba(37,211,102,0.5)]",
  x: "shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  threads: "shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  youtube: "shadow-[0_0_20px_rgba(255,0,0,0.5)]",
};

// Render icon based on platform key
const SocialIcon = ({ platform }: { platform: SocialPlatform }) => {
  const iconData = simpleIconMap[platform];
  return <SimpleIcon icon={iconData} />;
};

// Platform configuration - URLs are only set when user provides them
// DO NOT add fallback URLs - social links should ONLY connect to user's own accounts
const platformConfig: Record<SocialPlatform, { name: string; bgColor: string }> = {
  facebook: {
    name: "Facebook",
    bgColor: "bg-[#1877F2]",
  },
  instagram: {
    name: "Instagram",
    bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  },
  tiktok: {
    name: "TikTok",
    bgColor: "bg-gradient-to-br from-[#00F2EA] via-[#000000] to-[#FF0050]",
  },
  linkedin: {
    name: "LinkedIn",
    bgColor: "bg-[#0A66C2]",
  },
  whatsapp: {
    name: "WhatsApp",
    bgColor: "bg-[#25D366]",
  },
  x: {
    name: "X",
    bgColor: "bg-[#000000]",
  },
  threads: {
    name: "Threads",
    bgColor: "bg-[#000000]",
  },
  youtube: {
    name: "YouTube",
    bgColor: "bg-[#FF0000]",
  },
};

export interface SocialLinksConfig {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
  whatsapp?: string;
  x?: string;
  threads?: string;
  youtube?: string;
}

// Ordered list of all social platforms for consistent rendering
export const allSocialPlatforms: SocialPlatform[] = [
  "linkedin", "instagram", "x", "facebook", "youtube", "tiktok", "whatsapp", "threads"
];

interface SocialLinksProps {
  config?: SocialLinksConfig;
  className?: string;
  platforms?: SocialPlatform[];
}

export function SocialLinks({ 
  config = {},
  className,
  platforms: customPlatforms,
}: SocialLinksProps) {
  // Build list of platforms to render - ONLY show platforms with user-provided URLs
  const platformsToRender: { key: SocialPlatform; url: string }[] = [];
  
  // Default platforms if none specified
  const allPlatforms: SocialPlatform[] = customPlatforms || ["facebook", "instagram", "tiktok", "linkedin", "whatsapp"];
  
  for (const platform of allPlatforms) {
    const userUrl = config[platform];
    // Only render if user has provided their own URL
    if (userUrl) {
      platformsToRender.push({ key: platform, url: userUrl });
    }
  }

  // If no platforms to render (user hasn't configured any), hide the section
  if (platformsToRender.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-5 justify-center", className)}>
      {platformsToRender.map(({ key, url }) => {
        const { name, bgColor } = platformConfig[key];
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow on ${name} (opens in new tab)`}
            className={cn(
              "group relative flex items-center justify-center",
              "w-14 h-14 rounded-full text-white",
              "ring-2 ring-white/20 backdrop-blur-sm",
              "transition-all duration-300 ease-out",
              "hover:scale-110 hover:ring-white/40",
              glowColors[key],
              "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              bgColor
            )}
          >
            <SocialIcon platform={key} />
            {/* Tooltip */}
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium bg-popover/95 text-popover-foreground rounded-lg shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border/50">
              {name}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function SocialSection({ config }: { config?: SocialLinksConfig }) {
  // Only show section if user has configured social links
  const hasLinks = config && Object.values(config).some(Boolean);
  
  if (!hasLinks) {
    return null;
  }
  
  return (
    <section className="py-12 bg-muted/10 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            Connect with us
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Follow on Social Media
          </h2>
        </div>

        <div className="max-w-2xl mx-auto pb-6">
          <SocialLinks config={config} />
        </div>
      </div>
    </section>
  );
}

export { platformConfig };
