import { cn } from "@/lib/utils";
import {
  siFacebook,
  siInstagram,
  siTiktok,
  siWhatsapp,
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

// Custom inline SVG for LinkedIn (not available in simple-icons)
const linkedinIcon = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="LinkedIn">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

type SocialPlatform = "facebook" | "instagram" | "tiktok" | "linkedin" | "whatsapp";

const simpleIconMap: Partial<Record<SocialPlatform, { path: string; title: string }>> = {
  facebook: siFacebook,
  instagram: siInstagram,
  tiktok: siTiktok,
  whatsapp: siWhatsapp,
};

// Render icon based on platform key
const SocialIcon = ({ platform }: { platform: SocialPlatform }) => {
  const simpleIcon = simpleIconMap[platform];
  if (simpleIcon) {
    return <SimpleIcon icon={simpleIcon} />;
  }
  
  if (platform === "linkedin") {
    return linkedinIcon;
  }
  
  return null;
};

const platformConfig: Record<SocialPlatform, { name: string; bgColor: string; fallbackUrl: string }> = {
  facebook: {
    name: "Facebook",
    bgColor: "bg-[#0866FF]",
    fallbackUrl: "https://www.facebook.com/",
  },
  instagram: {
    name: "Instagram",
    bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    fallbackUrl: "https://www.instagram.com/",
  },
  tiktok: {
    name: "TikTok",
    bgColor: "bg-[#000000]",
    fallbackUrl: "https://www.tiktok.com/",
  },
  linkedin: {
    name: "LinkedIn",
    bgColor: "bg-[#0A66C2]",
    fallbackUrl: "https://www.linkedin.com/",
  },
  whatsapp: {
    name: "WhatsApp",
    bgColor: "bg-[#25D366]",
    fallbackUrl: "https://www.whatsapp.com/",
  },
};

export interface SocialLinksConfig {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
  whatsapp?: string;
}

interface SocialLinksProps {
  config?: SocialLinksConfig;
  useFallbacks?: boolean;
  className?: string;
}

export function SocialLinks({ 
  config = {},
  useFallbacks = false,
  className,
}: SocialLinksProps) {
  // Build list of platforms to render
  const platforms: { key: SocialPlatform; url: string }[] = [];
  
  const allPlatforms: SocialPlatform[] = ["facebook", "instagram", "tiktok", "linkedin", "whatsapp"];
  
  for (const platform of allPlatforms) {
    const userUrl = config[platform];
    if (userUrl) {
      platforms.push({ key: platform, url: userUrl });
    } else if (useFallbacks) {
      platforms.push({ key: platform, url: platformConfig[platform].fallbackUrl });
    }
  }

  // If no platforms to render, hide the entire section
  if (platforms.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-4 justify-center", className)}>
      {platforms.map(({ key, url }) => {
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
              "w-12 h-12 rounded-full text-white",
              "transition-all duration-300 ease-out",
              "hover:scale-110 hover:brightness-110",
              "hover:shadow-lg hover:shadow-current/30",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              bgColor
            )}
          >
            <SocialIcon platform={key} />
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-popover text-popover-foreground rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {name}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function SocialSection({ config }: { config?: SocialLinksConfig }) {
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
          <SocialLinks config={config} useFallbacks={true} />
        </div>
      </div>
    </section>
  );
}

export { platformConfig };
