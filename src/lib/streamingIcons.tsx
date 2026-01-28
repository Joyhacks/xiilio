// Centralized Streaming Service Icons Configuration
// Uses Simple Icons for brand-accurate SVGs

import {
  siNetflix,
  siAppletv,
  siMax,
} from "simple-icons";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type StreamingBrandKey = 
  | "netflix" 
  | "primevideo" 
  | "appletv" 
  | "paramountplus" 
  | "hulu" 
  | "disneyplus" 
  | "max";

export interface StreamingService {
  id: string;
  name: string;
  href: string;
  brandKey: StreamingBrandKey;
  brandColor: string;
  darkModeColor?: string;
}

interface SimpleIcon {
  path: string;
  title: string;
}

// ============================================
// CUSTOM SVG PATHS for services not in simple-icons
// ============================================

// Prime Video - play arrow
const siPrimevideo: SimpleIcon = {
  path: "M8.286 3.036v17.928L22.667 12 8.286 3.036zM1.333 0v24h2.667V0H1.333z",
  title: "Prime Video"
};

// Hulu - stylized H
const siHulu: SimpleIcon = {
  path: "M6.157 5.1v4.125c-.717-.48-1.554-.721-2.398-.721C1.674 8.504 0 10.255 0 12.75v5.25h4.2V12.6c0-.45.3-.75.75-.75s.75.3.75.75v5.4h4.2V5.1H6.157zm16.043 3.6h-4.35v6.15c0 .45-.3.75-.75.75s-.75-.3-.75-.75V8.7h-4.2v6.15c0 2.55 1.65 4.2 4.2 4.2.852 0 1.693-.24 2.41-.72V18h3.44V8.7zM24 5.1h-4.2v12.9H24V5.1z",
  title: "Hulu"
};

// Disney+ - stylized D+
const siDisneyplus: SimpleIcon = {
  path: "M1.57 9.557v4.886h1.763c1.728 0 2.747-.879 2.747-2.443 0-1.564-1.019-2.443-2.747-2.443H1.57zm1.763 3.91H2.49v-2.934h.843c1.14 0 1.781.553 1.781 1.467s-.641 1.467-1.781 1.467zM7.857 14.443h.92v-3.8h-.92v3.8zm.46-4.382c.32 0 .58-.26.58-.58s-.26-.58-.58-.58-.58.26-.58.58.26.58.58.58zM10.39 13.02c-.16.24-.4.36-.72.36-.48 0-.8-.32-.8-.8 0-.48.32-.8.8-.8.32 0 .56.12.72.36h.96c-.2-.72-.84-1.2-1.68-1.2-1.04 0-1.76.72-1.76 1.64s.72 1.64 1.76 1.64c.84 0 1.48-.48 1.68-1.2h-.96zM13.43 10.64h-.92v1.32h-.64v.84h.64v1.64h.92v-1.64h.72v-.84h-.72v-1.32zM15.07 10.12h.92v.88h-.92v-.88zm0 1.52h.92v2.52h-.92v-2.52zM17.81 10.96c-1.04 0-1.76.72-1.76 1.64s.72 1.64 1.76 1.64 1.76-.72 1.76-1.64-.72-1.64-1.76-1.64zm0 2.48c-.52 0-.84-.32-.84-.84s.32-.84.84-.84.84.32.84.84-.32.84-.84.84zM21.89 10.96c-.6 0-1.04.24-1.28.6v-.52h-.92v2.52h.92v-1.36c0-.48.28-.8.76-.8.44 0 .68.28.68.76v1.4h.92v-1.56c0-.68-.4-1.04-1.08-1.04zM23.53 12.12h-1.08v.76h1.56v.52c-.04.56-.48.84-1.08.84-.68 0-1.12-.48-1.12-1.08 0-.64.44-1.12 1.08-1.12.4 0 .72.16.92.48h1.04c-.24-.76-.96-1.28-1.96-1.28-1.2 0-2.04.84-2.04 1.92s.84 1.88 2.08 1.88c1.08 0 1.8-.6 1.88-1.48v-.44h-1.28z",
  title: "Disney+"
};

// Paramount+ - mountain
const siParamountplus: SimpleIcon = {
  path: "M12 2L2 19h20L12 2zm0 4.5L18 17H6l6-10.5z",
  title: "Paramount+"
};

// ============================================
// ICON MAP
// ============================================

const iconMap: Record<StreamingBrandKey, SimpleIcon> = {
  netflix: siNetflix,
  primevideo: siPrimevideo,
  appletv: siAppletv,
  paramountplus: siParamountplus,
  hulu: siHulu,
  disneyplus: siDisneyplus,
  max: siMax,
};

// ============================================
// BRAND COLORS (updated 2025)
// ============================================

export const brandColors: Record<StreamingBrandKey, { bg: string; glow: string }> = {
  netflix: {
    bg: "bg-[#E50914]",
    glow: "shadow-[0_0_20px_rgba(229,9,20,0.5)]",
  },
  primevideo: {
    bg: "bg-[#1A98FF]",
    glow: "shadow-[0_0_20px_rgba(26,152,255,0.5)]",
  },
  appletv: {
    bg: "bg-gradient-to-br from-[#555555] to-[#000000]",
    glow: "shadow-[0_0_20px_rgba(85,85,85,0.5)]",
  },
  paramountplus: {
    bg: "bg-[#0064FF]",
    glow: "shadow-[0_0_20px_rgba(0,100,255,0.5)]",
  },
  hulu: {
    bg: "bg-[#1CE783]",
    glow: "shadow-[0_0_20px_rgba(28,231,131,0.5)]",
  },
  disneyplus: {
    bg: "bg-[#113CCF]",
    glow: "shadow-[0_0_20px_rgba(17,60,207,0.5)]",
  },
  max: {
    bg: "bg-[#002BE7]",
    glow: "shadow-[0_0_20px_rgba(0,43,231,0.5)]",
  },
};

// ============================================
// ICON COMPONENT
// ============================================

interface StreamingIconProps {
  brandKey: StreamingBrandKey;
  className?: string;
  size?: number;
}

export function StreamingIcon({ brandKey, className, size = 24 }: StreamingIconProps) {
  const icon = iconMap[brandKey];
  
  if (!icon?.path) {
    return null;
  }
  
  // Treat streaming icons as brand assets - preserve white color on brand backgrounds
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      style={{ width: size, height: size, fill: "white" }}
      aria-label={icon.title}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

// ============================================
// SERVICE DATA
// ============================================

export const primaryStreamingServices: StreamingService[] = [
  {
    id: "netflix",
    name: "Netflix",
    href: "https://www.netflix.com/",
    brandKey: "netflix",
    brandColor: "#E50914",
  },
  {
    id: "primevideo",
    name: "Prime Video",
    href: "https://www.primevideo.com/",
    brandKey: "primevideo",
    brandColor: "#1A98FF",
  },
  {
    id: "appletv",
    name: "Apple TV+",
    href: "https://tv.apple.com/",
    brandKey: "appletv",
    brandColor: "#000000",
    darkModeColor: "#FFFFFF",
  },
  {
    id: "paramountplus",
    name: "Paramount+",
    href: "https://www.paramountplus.com/",
    brandKey: "paramountplus",
    brandColor: "#0064FF",
  },
];

export const additionalStreamingServices: StreamingService[] = [
  {
    id: "hulu",
    name: "Hulu",
    href: "https://www.hulu.com/",
    brandKey: "hulu",
    brandColor: "#1CE783",
  },
  {
    id: "disneyplus",
    name: "Disney+",
    href: "https://www.disneyplus.com/",
    brandKey: "disneyplus",
    brandColor: "#113CCF",
  },
  {
    id: "max",
    name: "Max",
    href: "https://www.max.com/",
    brandKey: "max",
    brandColor: "#002BE7",
  },
];

export const allStreamingServices: StreamingService[] = [
  ...primaryStreamingServices,
  ...additionalStreamingServices,
];

// Export icon map for direct access if needed
export const streamingIcons = iconMap;
