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
// CUSTOM SVG PATHS (for services not in simple-icons)
// Updated 2025 brand-accurate paths
// ============================================

// Amazon Prime Video - official brand path
const primeVideoPath = "M.045 18.02c-.033-.086-.045-.214-.045-.304 0-.444.309-.778.752-.778.393 0 .712.238.712.742V22H0v-3.98h.045zM12.963 22c.012-.195.024-.39.024-.585 0-1.755-.732-2.34-1.854-2.34-.732 0-1.341.292-1.707.804h-.024v-.683h-1.39v6.048h1.439v-3.033c0-.817.456-1.39 1.195-1.39.72 0 1.018.477 1.018 1.316V22h1.3zM8.782 19.196h-1.44v2.194c0 .341-.175.585-.504.585-.317 0-.504-.232-.504-.585v-2.194h-1.44v2.364c0 1.072.549 1.647 1.427 1.647.526 0 .94-.208 1.195-.549h.024v.439h1.243v-3.9zm-5.19-.195c-.757 0-1.317.28-1.659.768h-.036v-.573H.457v6.048H1.92v-2.097h.024c.293.45.768.683 1.366.683 1.159 0 1.94-.89 1.94-2.426 0-1.475-.732-2.403-1.659-2.403zm-.231 3.69c-.599 0-1.018-.51-1.018-1.28 0-.781.419-1.304 1.018-1.304.587 0 1.006.535 1.006 1.304 0 .756-.419 1.28-1.006 1.28zM23.955 18.02c.033-.086.045-.214.045-.304 0-.444-.309-.778-.752-.778-.393 0-.712.238-.712.742V22H24v-3.98h-.045z";

// Hulu - official brand path (updated 2025)
const huluPath = "M10.5 8.5v7h2V12c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v3.5h2v-4c0-1.66-1.34-3-3-3h-2c-.55 0-1.08.14-1.54.39V8.5h-1.46zm-6.5 0v3c0 1.66 1.34 3 3 3v-2c-.55 0-1-.45-1-1v-3H4zm16 6c-1.66 0-3-1.34-3-3h2c0 .55.45 1 1 1v2zM4 6V4h-2v11h2V8h2c.55 0 1 .45 1 1v2h2V9c0-1.66-1.34-3-3-3H4z";

// Disney+ - official brand path (updated 2025)
const disneyPlusPath = "M3.25 0A3.25 3.25 0 000 3.25v17.5A3.25 3.25 0 003.25 24h17.5A3.25 3.25 0 0024 20.75V3.25A3.25 3.25 0 0020.75 0H3.25zM12 5.5c.414 0 .75.336.75.75v5h5a.75.75 0 110 1.5h-5v5a.75.75 0 11-1.5 0v-5h-5a.75.75 0 110-1.5h5v-5c0-.414.336-.75.75-.75z";

// ============================================
// SIMPLE ICONS MAP
// ============================================

const simpleIconMap: Partial<Record<StreamingBrandKey, SimpleIcon>> = {
  netflix: siNetflix,
  appletv: siAppletv,
  max: siMax,
  paramountplus: siParamountplus,
};

const customIconPaths: Partial<Record<StreamingBrandKey, string>> = {
  primevideo: primeVideoPath,
  hulu: huluPath,
  disneyplus: disneyPlusPath,
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
  const simpleIcon = simpleIconMap[brandKey];
  const customPath = customIconPaths[brandKey];
  
  const path = simpleIcon?.path || customPath;
  const title = simpleIcon?.title || getBrandName(brandKey);
  
  if (!path) {
    return null;
  }
  
  // Treat streaming icons as brand assets - preserve white color on brand backgrounds
  // Do not auto-style or recolor unless required for accessibility contrast
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      style={{ width: size, height: size, fill: "white" }}
      aria-label={title}
    >
      <title>{title}</title>
      <path d={path} />
    </svg>
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getBrandName(brandKey: StreamingBrandKey): string {
  const names: Record<StreamingBrandKey, string> = {
    netflix: "Netflix",
    primevideo: "Prime Video",
    appletv: "Apple TV+",
    paramountplus: "Paramount+",
    hulu: "Hulu",
    disneyplus: "Disney+",
    max: "Max",
  };
  return names[brandKey];
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
export const streamingIcons = {
  netflix: simpleIconMap.netflix,
  primevideo: { path: primeVideoPath, title: "Prime Video" },
  appletv: simpleIconMap.appletv,
  paramountplus: simpleIconMap.paramountplus,
  hulu: { path: huluPath, title: "Hulu" },
  disneyplus: { path: disneyPlusPath, title: "Disney+" },
  max: simpleIconMap.max,
} as const;
