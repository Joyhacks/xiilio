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
// Using brand-accurate icon representations
// ============================================

// Prime Video - Amazon's play arrow icon (official app icon style)
const siPrimevideo: SimpleIcon = {
  path: "M1.178 3.596v16.808L18.283 12 1.178 3.596zM3.03 6.322L14.912 12 3.03 17.678V6.322z M20.822 4.5h1.5v15h-1.5z",
  title: "Prime Video"
};

// Hulu - Stylized "HULU" text as icon
const siHulu: SimpleIcon = {
  path: "M4 5v14h2v-6c0-.55.45-1 1-1s1 .45 1 1v6h2v-6c0-1.66-1.34-3-3-3-.74 0-1.42.27-1.95.71V5H4zm8 6v8h2v-8h-2zm4 0v8h2v-8h-2zm4 0v6c0 1.1.9 2 2 2h1v-2h-1v-6h-2z",
  title: "Hulu"
};

// Disney+ - Stylized D with plus (official streaming icon)  
const siDisneyplus: SimpleIcon = {
  path: "M6.5 4C4.015 4 2 6.015 2 8.5v7C2 17.985 4.015 20 6.5 20H12v-2H6.5C5.12 18 4 16.88 4 15.5v-7C4 7.12 5.12 6 6.5 6h5c.913 0 1.713.49 2.15 1.222.438.731.458 1.638.019 2.389L11.5 13.5v.5h2l2.169-3.889c.732-1.25.698-2.762-.033-3.983C14.905 5.008 13.536 4 11.5 4H6.5zM17 12v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z",
  title: "Disney+"
};

// Max - Simplified rounded M logo 
const siMax: SimpleIcon = {
  path: "M2 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm3 4h2.5l2.5 4 2.5-4H15v8h-2v-5l-1.5 2.5h-1L9 11v5H7V8zm10 0h2v8h-2V8zm3 0h2v8h-2V8z",
  title: "Max"
};

// CNN - Stylized CNN letters  
const siCnn: SimpleIcon = {
  path: "M4 6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h1.5c.83 0 1.5-.67 1.5-1.5V16H5.5v.5h-1v-9h1v.5H7V7.5C7 6.67 6.33 6 5.5 6H4zm5 0v12h1.5l2.5-6v6H15V6h-1.5l-2.5 6V6H9zm9 0v12h1.5l2.5-6v6H24V6h-1.5l-2.5 6V6h-2z",
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
