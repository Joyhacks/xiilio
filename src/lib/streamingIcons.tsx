// Centralized Streaming Service Icons Configuration
// Uses Simple Icons where available, custom SVG paths for others

import {
  siNetflix,
  siAppletv,
  siHbo,
  siYoutube,
  siSpotify,
  siTwitch,
  siUber,
  siMax,
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
  | "twitch"
  | "uber";

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
// CUSTOM SVG PATHS for services not in simple-icons v16
// These brands are no longer in simple-icons - using accurate brand paths
// ============================================

// Prime Video - Official wordmark style logo
const siPrimevideo: SimpleIcon = {
  path: "M.973 6.036c.054-.255.193-.382.452-.382h.62c.227 0 .364.082.43.355l.355 1.462.355-1.462c.066-.273.193-.355.42-.355h.654c.25 0 .376.127.43.382l.56 2.728c.033.16-.01.236-.225.236h-.637c-.225 0-.365-.084-.43-.355l-.247-1.307-.345 1.338c-.055.215-.15.324-.42.324h-.237c-.269 0-.365-.11-.42-.324l-.345-1.338-.247 1.307c-.065.27-.205.355-.43.355H.637c-.215 0-.258-.077-.226-.236l.56-2.728zm5.374 2.728c0 .16-.106.236-.259.236h-.592c-.16 0-.269-.076-.269-.236V6.027c0-.16.109-.236.269-.236h.592c.153 0 .259.076.259.236v2.737zm2.498-2.81c.16 0 .269.076.269.237v.387c0 .16-.11.236-.27.236h-.57v2.15c0 .16-.106.236-.258.236h-.592c-.16 0-.27-.076-.27-.236v-2.15h-.568c-.16 0-.27-.076-.27-.236v-.387c0-.16.11-.236.27-.236h2.259zm3.114 0c.16 0 .27.076.27.237v.387c0 .16-.11.236-.27.236h-.57v2.15c0 .16-.105.236-.258.236h-.592c-.16 0-.27-.076-.27-.236v-2.15h-.568c-.16 0-.27-.076-.27-.236v-.387c0-.16.11-.236.27-.236h2.258zm.952.237v2.573c0 .16-.106.236-.259.236h-.592c-.16 0-.27-.076-.27-.236V6.19c0-.16.11-.236.27-.236h.592c.153 0 .259.076.259.237zm2.857-.237c.15 0 .259.1.259.259v.355c0 .16-.11.26-.26.26h-1.104v.538h.882c.15 0 .258.1.258.258v.345c0 .16-.108.259-.258.259h-.882v.614h1.104c.15 0 .26.098.26.258v.355c0 .16-.11.259-.26.259h-1.833c-.16 0-.27-.076-.27-.236V6.19c0-.16.11-.236.27-.236h1.834zM9.45 11.927c1.89 0 3.577.587 4.85 1.555.147.112.168.313.042.444a.326.326 0 0 1-.234.098.326.326 0 0 1-.192-.063c-1.157-.88-2.728-1.397-4.466-1.397-2.118 0-4.013.738-5.376 1.932a.326.326 0 0 1-.46-.024.32.32 0 0 1 .025-.455c1.5-1.315 3.581-2.09 5.811-2.09zm6.92 5.21a.32.32 0 0 1-.315-.263c-.343-1.728-1.798-3.01-3.613-3.01-1.806 0-3.256 1.27-3.607 2.987a.321.321 0 0 1-.378.25.32.32 0 0 1-.252-.375c.415-2.033 2.131-3.5 4.237-3.5 2.117 0 3.838 1.483 4.243 3.524a.32.32 0 0 1-.257.38.325.325 0 0 1-.058.007z",
  title: "Prime Video"
};

// Hulu - Official wordmark logo
const siHulu: SimpleIcon = {
  path: "M6.837 9.521V7.035c0-.492-.399-.891-.891-.891H4.054c-.492 0-.891.399-.891.891v8.93c0 .492.399.891.891.891h1.892c.492 0 .891-.399.891-.891v-4.12c0-.393.318-.712.712-.712h.89c.393 0 .712.319.712.712v4.12c0 .492.399.891.891.891h1.892c.492 0 .891-.399.891-.891v-4.12c0-.393.319-.712.712-.712h.891c.393 0 .712.319.712.712v4.12c0 .492.399.891.891.891h1.892c.492 0 .891-.399.891-.891v-4.12c0-2.455-1.99-4.445-4.445-4.445-1.227 0-2.34.497-3.143 1.301-.803-.804-1.916-1.301-3.143-1.301-1.04 0-2 .357-2.76.955v-.332z",
  title: "Hulu"
};

// Disney+ - Official stylized D logo  
const siDisneyplus: SimpleIcon = {
  path: "M12.055 0C5.403 0 0 5.374 0 12s5.403 12 12.055 12C18.707 24 24 18.626 24 12S18.707 0 12.055 0zm-.014 2.387c1.097 0 2.15.182 3.136.517.16.054.252.221.205.384-.047.163-.213.26-.379.22a9.323 9.323 0 0 0-2.962-.491c-5.16 0-9.345 4.163-9.345 9.296 0 2.21.78 4.239 2.076 5.835a.305.305 0 0 1-.039.429.31.31 0 0 1-.432-.038 9.867 9.867 0 0 1-2.235-6.226c0-5.474 4.461-9.926 9.975-9.926zm3.885 3.237c.753 0 1.364.607 1.364 1.356s-.611 1.356-1.364 1.356c-.754 0-1.365-.607-1.365-1.356s.611-1.356 1.365-1.356zm-5.192 2.57c2.837 0 5.137 2.285 5.137 5.104 0 .168-.137.305-.306.305a.306.306 0 0 1-.306-.305c0-2.482-2.026-4.495-4.525-4.495-2.498 0-4.524 2.013-4.524 4.495 0 2.481 2.026 4.494 4.524 4.494.72 0 1.413-.166 2.055-.482a.308.308 0 0 1 .409.139.302.302 0 0 1-.14.406 5.18 5.18 0 0 1-2.324.547c-2.837 0-5.137-2.285-5.137-5.104 0-2.82 2.3-5.104 5.137-5.104z",
  title: "Disney+"
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
  twitch: siTwitch,
  uber: siUber,
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
  uber: {
    bg: "bg-[#000000]",
    glow: "shadow-[0_0_20px_rgba(0,0,0,0.5)]",
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
  {
    id: "uber",
    name: "Uber",
    href: "https://www.uber.com/",
    brandKey: "uber",
    brandColor: "#000000",
  },
];

export const allStreamingServices: StreamingService[] = [
  ...primaryStreamingServices,
  ...additionalStreamingServices,
];

// Export icon map for direct access if needed
export const streamingIcons = iconMap;
