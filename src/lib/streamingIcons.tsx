// Centralized Streaming Service Icons Configuration
// Uses Simple Icons for brand-accurate SVGs with custom fallbacks

import { cn } from "@/lib/utils";
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
// SIMPLE ICONS MAP
// ============================================

const simpleIconMap: Partial<Record<StreamingBrandKey, SimpleIcon>> = {
  netflix: siNetflix,
  appletv: siAppletv,
  max: siMax,
  paramountplus: siParamountplus,
};

// ============================================
// CUSTOM SVG PATHS (for services not in simple-icons)
// ============================================

// Amazon Prime Video - official brand path
const primeVideoPath = "M12.504 3.929c-6.379 0-10.975 2.983-10.975 7.371 0 3.306 2.195 5.994 5.89 7.371.267.1.538-.1.538-.367V15.6c0-.167-.1-.334-.267-.434-2.064-1.1-3.339-2.65-3.339-4.6 0-2.917 3.139-5.161 7.653-5.161s7.653 2.244 7.653 5.161c0 1.95-1.275 3.5-3.339 4.6-.167.1-.267.267-.267.434v2.704c0 .267.271.467.538.367 3.695-1.377 5.89-4.065 5.89-7.371 0-4.388-4.596-7.371-10.975-7.371Zm8.267 15.876c-2.917 1.317-6.056 1.984-9.271 1.984-3.215 0-6.354-.667-9.271-1.984a.539.539 0 0 0-.5.05c-.167.117-.234.334-.15.517.45.917 1.767 1.384 2.917 1.384h13.508c1.15 0 2.467-.467 2.917-1.384.084-.183.017-.4-.15-.517a.539.539 0 0 0-.5-.05Z";

// Hulu - official brand path
const huluPath = "M10.578 8.152H8.553v7.69h2.025v-4.158c0-.698.566-1.263 1.263-1.263h2.159c.697 0 1.263.565 1.263 1.263v4.158h2.025V11.26c0-1.744-1.414-3.158-3.158-3.158h-2.29c-.697 0-1.363.228-1.912.633V8.152Zm-6.71 0v3.158c0 1.744 1.414 3.158 3.158 3.158v2.025c-2.86 0-5.183-2.323-5.183-5.183V8.152h2.025Zm16.264 6.316c-1.744 0-3.158-1.414-3.158-3.158h2.025c0 .626.507 1.133 1.133 1.133v2.025ZM3.868 6.127V3.507H1.843V15.84h2.025v-7.69h2.025c.697 0 1.263.566 1.263 1.264v1.894h2.025V9.414c0-1.817-1.472-3.288-3.288-3.288H3.868Z";

// Disney+ - official brand path  
const disneyPlusPath = "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.5 11h-3v3c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-3h-3c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h3V7c0-.55.45-1 1-1h1c.55 0 1 .45 1 1v3h3c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1Z";

const customIconPaths: Partial<Record<StreamingBrandKey, string>> = {
  primevideo: primeVideoPath,
  hulu: huluPath,
  disneyplus: disneyPlusPath,
};

// ============================================
// BRAND COLORS
// ============================================

export const brandColors: Record<StreamingBrandKey, { bg: string; glow: string }> = {
  netflix: {
    bg: "bg-[#E50914]",
    glow: "shadow-[0_0_20px_rgba(229,9,20,0.5)]",
  },
  primevideo: {
    bg: "bg-[#00A8E1]",
    glow: "shadow-[0_0_20px_rgba(0,168,225,0.5)]",
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
  
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={cn("fill-current", className)}
      style={{ width: size, height: size }}
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
    brandColor: "#00A8E1",
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
