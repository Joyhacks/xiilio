// Centralized Streaming Service Icons Configuration
// Uses Simple Icons for brand-accurate SVGs with custom fallbacks

import {
  siNetflix,
  siAppletv,
  siMax,
  siParamountplus,
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
// Official brand-accurate paths
// ============================================

// Amazon Prime Video - official brand mark
const primeVideoIcon: SimpleIcon = {
  path: "M.045 18.02c-.033-.086-.045-.214-.045-.304 0-.444.309-.778.752-.778.393 0 .712.238.712.742V22H0v-3.98h.045zM10.054 8.3c0-1.16-.432-1.757-1.282-1.757-.858 0-1.312.59-1.312 1.757v5.4c0 1.152.454 1.758 1.312 1.758.85 0 1.282-.606 1.282-1.758V8.3zm-4.017-.012c0-2.073 1.09-3.243 2.735-3.243 1.638 0 2.728 1.17 2.728 3.243v5.424c0 2.073-1.09 3.236-2.728 3.236-1.646 0-2.735-1.163-2.735-3.236V8.288zM12.963 22c.012-.195.024-.39.024-.585 0-1.755-.732-2.34-1.854-2.34-.732 0-1.341.292-1.707.804h-.024v-.683h-1.39v6.048h1.439v-3.033c0-.817.456-1.39 1.195-1.39.72 0 1.018.477 1.018 1.316V22h1.3z",
  title: "Prime Video"
};

// Hulu - official brand mark
const huluIcon: SimpleIcon = {
  path: "M6.157 5.1v4.125c-.717-.48-1.554-.721-2.398-.721C1.674 8.504 0 10.255 0 12.75v5.25h4.2V12.6c0-.45.3-.75.75-.75.45 0 .75.3.75.75v5.4h4.2V5.1H6.157zM22.2 8.7h-4.35v6.15c0 .45-.3.75-.75.75s-.75-.3-.75-.75V8.7h-4.2v6.15c0 2.55 1.65 4.2 4.2 4.2.852 0 1.693-.24 2.41-.72V18h3.44V8.7zM24 5.1h-4.2v13.65h4.2V5.1z",
  title: "Hulu"
};

// Disney+ - official brand mark
const disneyPlusIcon: SimpleIcon = {
  path: "M5.899 6.903c.255-.397.557-.759.893-1.079a6.527 6.527 0 0 1 4.558-1.866c2.645 0 4.891 1.574 5.76 3.788.074.188.136.38.187.576.051-.196.113-.388.187-.576.869-2.214 3.115-3.788 5.76-3.788 3.396 0 6.158 2.762 6.158 6.158 0 1.018-.248 1.978-.686 2.823a6.09 6.09 0 0 1-1.875 2.174 6.11 6.11 0 0 1-3.597 1.161 6.127 6.127 0 0 1-5.76-4.05 6.127 6.127 0 0 1-5.76 4.05 6.11 6.11 0 0 1-3.597-1.161 6.09 6.09 0 0 1-1.875-2.174A6.086 6.086 0 0 1 5.466 10.116c0-1.214.351-2.346.953-3.302l.002.004-.522.085zM23.244 10.116c0-1.973-1.6-3.573-3.573-3.573-1.972 0-3.572 1.6-3.572 3.573 0 1.972 1.6 3.572 3.572 3.572 1.973 0 3.573-1.6 3.573-3.572zm-12.894 0c0-1.973-1.6-3.573-3.573-3.573-1.972 0-3.572 1.6-3.572 3.573 0 1.972 1.6 3.572 3.572 3.572 1.973 0 3.573-1.6 3.573-3.572z",
  title: "Disney+"
};

// ============================================
// ICON MAP - combining simple-icons and custom
// ============================================

const iconMap: Record<StreamingBrandKey, SimpleIcon> = {
  netflix: siNetflix,
  primevideo: primeVideoIcon,
  appletv: siAppletv,
  paramountplus: siParamountplus,
  hulu: huluIcon,
  disneyplus: disneyPlusIcon,
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
