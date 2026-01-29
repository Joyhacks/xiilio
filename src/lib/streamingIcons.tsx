// Centralized Streaming Service Icons Configuration
// Uses Simple Icons where available, custom SVG paths for others

import {
  siNetflix,
  siAppletv,
  siYoutube,
  siSpotify,
  siUber,
} from "simple-icons";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type StreamingBrandKey = 
  | "netflix" 
  | "primevideo" 
  | "appletv" 
  | "max"
  | "youtube"
  | "hulu"
  | "disneyplus"
  | "spotify"
  | "uber"
  | "cnn";

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

// Prime Video - Play button arrow
const siPrimevideo: SimpleIcon = {
  path: "M1.252 1.466C.506 1.04 0 1.398 0 2.23v19.54c0 .83.506 1.188 1.252.763l17.06-9.833c.746-.424.746-1.114 0-1.538L1.252 1.466z",
  title: "Prime Video"
};

// Hulu - H wordmark
const siHulu: SimpleIcon = {
  path: "M12.48 5.76v4.32c-.96-1.2-2.4-1.92-4.08-1.92C5.04 8.16 2.4 10.8 2.4 14.4v9.6H7.2v-9.6c0-1.44 1.2-2.64 2.64-2.64s2.64 1.2 2.64 2.64v9.6h4.8V5.76h-4.8zM21.6 14.4v9.6h-4.8V5.76h4.8V14.4z",
  title: "Hulu"
};

// Disney+ - D+ logo
const siDisneyplus: SimpleIcon = {
  path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.08c-.248.14-.56.06-.7-.18-.14-.24-.06-.56.18-.7 2.1-1.24 3.36-3.52 3.36-6.2 0-3.86-3.14-7-7-7-1.64 0-3.2.58-4.44 1.62-.2.18-.52.16-.7-.06-.18-.22-.16-.52.06-.7C10.06 2.54 11.96 1.8 14 1.8c4.42 0 8 3.58 8 8 0 3.08-1.74 5.88-4.11 7.28zM8.4 7.2h1.68c1.32 0 2.4 1.08 2.4 2.4v4.8c0 1.32-1.08 2.4-2.4 2.4H8.4c-1.32 0-2.4-1.08-2.4-2.4V9.6c0-1.32 1.08-2.4 2.4-2.4zm0 1.2c-.66 0-1.2.54-1.2 1.2v4.8c0 .66.54 1.2 1.2 1.2h1.68c.66 0 1.2-.54 1.2-1.2V9.6c0-.66-.54-1.2-1.2-1.2H8.4zm8.4 1.8h3.6v1.2h-3.6v3.6h-1.2v-3.6h-3.6v-1.2h3.6V6.6h1.2v3.6z",
  title: "Disney+"
};

// Max - M logo  
const siMax: SimpleIcon = {
  path: "M20.16 6.24L12 13.92 3.84 6.24H0v11.52h3.84V10.8l8.16 6.96 8.16-6.96v6.96H24V6.24h-3.84z",
  title: "Max"
};

// CNN - Letters
const siCnn: SimpleIcon = {
  path: "M3.11 8.05c-.42-.26-1-.37-1.71-.37H0v8.64h1.37v-3.2h.03c.72 0 1.3-.12 1.73-.39.64-.39.96-1.06.96-2.04v-.64c0-.95-.32-1.62-.98-2zM2.8 10.68c0 .7-.22 1.17-.67 1.39-.25.12-.6.18-1.03.18h-.03V8.89h.03c.44 0 .78.06 1.03.18.45.22.67.68.67 1.37v.24zm5.45 1.64c0 .97-.47 1.51-1.42 1.51-.95 0-1.42-.54-1.42-1.51V8.05H4.05v4.38c0 1.66.92 2.59 2.78 2.59s2.78-.93 2.78-2.59V8.05H8.25v4.27zm11.7-4.27v5.42L16.13 8.05h-1.98v8.64h1.36v-5.62l3.9 5.62h1.9V8.05h-1.36zm6.05 0h-1.98l-2.37 8.64h1.45l.49-1.93h2.84l.5 1.93H24L21.63 8.05zm-2.2 5.52l1.21-4.75 1.22 4.75h-2.43z",
  title: "CNN"
};

// ============================================
// ICON MAP
// ============================================

const iconMap: Record<StreamingBrandKey, SimpleIcon> = {
  netflix: siNetflix,
  primevideo: siPrimevideo,
  appletv: siAppletv,
  max: siMax,
  youtube: siYoutube,
  hulu: siHulu,
  disneyplus: siDisneyplus,
  spotify: siSpotify,
  uber: siUber,
  cnn: siCnn,
};

// ============================================
// BRAND COLORS (updated 2025)
// ============================================

export const brandColors: Record<StreamingBrandKey, { bg: string; glow: string }> = {
  netflix: {
    bg: "bg-[#E50914]",
    glow: "shadow-[0_0_20px_rgba(229,9,20,0.6)]",
  },
  primevideo: {
    bg: "bg-[#00A8E1]",
    glow: "shadow-[0_0_20px_rgba(0,168,225,0.6)]",
  },
  appletv: {
    bg: "bg-[#000000]",
    glow: "shadow-[0_0_20px_rgba(100,100,100,0.4)]",
  },
  max: {
    bg: "bg-[#002BE7]",
    glow: "shadow-[0_0_20px_rgba(0,43,231,0.6)]",
  },
  youtube: {
    bg: "bg-[#FF0000]",
    glow: "shadow-[0_0_20px_rgba(255,0,0,0.6)]",
  },
  hulu: {
    bg: "bg-[#1CE783]",
    glow: "shadow-[0_0_20px_rgba(28,231,131,0.6)]",
  },
  disneyplus: {
    bg: "bg-[#113CCF]",
    glow: "shadow-[0_0_20px_rgba(17,60,207,0.6)]",
  },
  spotify: {
    bg: "bg-[#1DB954]",
    glow: "shadow-[0_0_20px_rgba(29,185,84,0.6)]",
  },
  uber: {
    bg: "bg-[#000000]",
    glow: "shadow-[0_0_20px_rgba(0,0,0,0.4)]",
  },
  cnn: {
    bg: "bg-[#CC0000]",
    glow: "shadow-[0_0_20px_rgba(204,0,0,0.6)]",
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

export const additionalStreamingServices: StreamingService[] = [
  {
    id: "hulu",
    name: "Hulu",
    href: "https://www.hulu.com/",
    brandKey: "hulu",
    brandColor: "#1CE783",
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://www.youtube.com/",
    brandKey: "youtube",
    brandColor: "#FF0000",
  },
  {
    id: "spotify",
    name: "Spotify",
    href: "https://www.spotify.com/",
    brandKey: "spotify",
    brandColor: "#1DB954",
  },
  {
    id: "uber",
    name: "Uber",
    href: "https://www.uber.com/",
    brandKey: "uber",
    brandColor: "#000000",
  },
  {
    id: "cnn",
    name: "CNN",
    href: "https://www.cnn.com/",
    brandKey: "cnn",
    brandColor: "#CC0000",
  },
];

export const allStreamingServices: StreamingService[] = [
  ...primaryStreamingServices,
  ...additionalStreamingServices,
];

// Export icon map for direct access if needed
export const streamingIcons = iconMap;
