// Centralized Streaming Service Icons Configuration
// Uses Simple Icons where available, custom SVG paths for others

import {
  siNetflix,
  siAppletv,
  siHbo,
  siYoutube,
  siSpotify,
  siTwitch,
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
  | "twitch";

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
// Official brand-accurate paths (updated 2025)
// ============================================

// Prime Video - Play button arrow icon (2024 brand refresh)
const siPrimevideo: SimpleIcon = {
  path: "M12.002 2C6.479 2 2 6.477 2 12c0 5.523 4.478 10 10.002 10 5.522 0 9.998-4.477 9.998-10 0-5.523-4.476-10-9.998-10zm3.703 10.433l-5.003 3.002c-.437.262-.997-.066-.997-.577V9.143c0-.511.56-.839.997-.577l5.003 3.001c.437.263.437.869 0 1.132-.016.01.016-.01 0 0z",
  title: "Prime Video"
};

// Hulu - Stylized "h" logo (2024)
const siHulu: SimpleIcon = {
  path: "M19.5 12c0 1.93-.789 3.68-2.063 4.938A6.96 6.96 0 0 1 12.5 19a6.96 6.96 0 0 1-4.937-2.063A6.96 6.96 0 0 1 5.5 12V5h3v7a4 4 0 0 0 4 4 4 4 0 0 0 4-4V5h3v7zm-7-7a7 7 0 0 0-7 7v7h3v-7a4 4 0 0 1 4-4 4 4 0 0 1 4 4h3a7 7 0 0 0-7-7z",
  title: "Hulu"
};

// Disney+ - Stylized D+ logo (2024 brand refresh)
const siDisneyplus: SimpleIcon = {
  path: "M8.813 14.5H6.5V4.938h2.313c3.125 0 5.5 2.062 5.5 4.781 0 2.719-2.375 4.781-5.5 4.781zm0-7.25H8.75v4.938h.063c1.75 0 3.187-1.063 3.187-2.469 0-1.407-1.438-2.47-3.188-2.47zM19.5 9.5h-1.125V7.375H17.25V9.5h-1.125v1.125h1.125v2.125h1.125v-2.125H19.5V9.5zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z",
  title: "Disney+"
};

// ============================================
// ICON MAP
// ============================================

const iconMap: Record<StreamingBrandKey, SimpleIcon> = {
  netflix: siNetflix,
  primevideo: siPrimevideo,
  appletv: siAppletv,
  max: siHbo,
  youtube: siYoutube,
  hulu: siHulu,
  disneyplus: siDisneyplus,
  spotify: siSpotify,
  twitch: siTwitch,
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
  max: {
    bg: "bg-[#002BE7]",
    glow: "shadow-[0_0_20px_rgba(0,43,231,0.5)]",
  },
  youtube: {
    bg: "bg-[#FF0000]",
    glow: "shadow-[0_0_20px_rgba(255,0,0,0.5)]",
  },
  hulu: {
    bg: "bg-[#1CE783]",
    glow: "shadow-[0_0_20px_rgba(28,231,131,0.5)]",
  },
  disneyplus: {
    bg: "bg-[#113CCF]",
    glow: "shadow-[0_0_20px_rgba(17,60,207,0.5)]",
  },
  spotify: {
    bg: "bg-[#1DB954]",
    glow: "shadow-[0_0_20px_rgba(29,185,84,0.5)]",
  },
  twitch: {
    bg: "bg-[#9146FF]",
    glow: "shadow-[0_0_20px_rgba(145,70,255,0.5)]",
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
];

export const additionalStreamingServices: StreamingService[] = [
  {
    id: "max",
    name: "Max",
    href: "https://www.max.com/",
    brandKey: "max",
    brandColor: "#002BE7",
  },
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
];

export const allStreamingServices: StreamingService[] = [
  ...primaryStreamingServices,
  ...additionalStreamingServices,
];

// Export icon map for direct access if needed
export const streamingIcons = iconMap;
