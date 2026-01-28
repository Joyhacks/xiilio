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

// Prime Video - Official brand mark (stylized play button)
const siPrimevideo: SimpleIcon = {
  path: "M1.252 15.478c-.109.094-.152.226-.119.376.044.151.152.254.303.293l2.39.551c.152.039.281 0 .39-.094.11-.095.152-.227.119-.377l-.043-.19c.694.284 1.475.473 2.343.568 1.778.19 3.448-.019 5.008-.628 1.561-.608 2.862-1.558 3.904-2.848 1.042-1.291 1.713-2.79 2.016-4.496.302-1.706.195-3.375-.323-5.006-.519-1.631-1.42-3.017-2.7-4.157L14.68.321c.043-.151 0-.282-.11-.376-.109-.094-.237-.132-.389-.094l-2.39.551c-.152.038-.26.142-.303.293-.043.15 0 .282.11.376l.151.132c-1.302.284-2.495.853-3.578 1.707-1.084.853-1.951 1.914-2.603 3.184-.651 1.269-.996 2.638-1.04 4.1-.043 1.462.227 2.867.823 4.213l-.15.133c-.11.094-.152.226-.119.376.043.151.152.255.303.293l2.39.55c.152.039.281 0 .39-.094.11-.094.152-.226.119-.376l-.044-.19c.52.189 1.073.34 1.658.454l.39-.568c-.585-.095-1.138-.246-1.658-.454l1.183-1.025c1.257.644 2.656.871 4.2.681 1.54-.19 2.874-.796 4.003-1.82 1.127-1.025 1.886-2.298 2.277-3.818.39-1.52.302-3.034-.26-4.541l1.183-1.025c.542 1.346.758 2.752.65 4.214-.109 1.462-.585 2.83-1.431 4.1-.846 1.269-1.951 2.28-3.317 3.033-1.365.75-2.872 1.12-4.523 1.082-1.648-.038-3.145-.474-4.49-1.308l1.183-1.025c.933.473 1.951.71 3.057.71 1.105 0 2.124-.284 3.057-.853.933-.568 1.67-1.327 2.21-2.28.542-.947.824-1.97.846-3.071.022-1.101-.238-2.136-.78-3.109-.542-.966-1.279-1.744-2.21-2.336-.933-.587-1.951-.881-3.057-.881-1.105 0-2.124.284-3.057.852-.933.57-1.67 1.328-2.21 2.28-.542.948-.824 1.971-.846 3.071-.022 1.101.239 2.137.78 3.109l-1.183 1.025c-.693-1.365-1.03-2.8-1.008-4.307.021-1.5.433-2.924 1.236-4.27.802-1.346 1.886-2.42 3.252-3.223 1.366-.802 2.873-1.177 4.523-1.12 1.648.056 3.144.511 4.49 1.365l-1.183 1.025c-.933-.493-1.951-.74-3.057-.74s-2.124.294-3.057.881c-.933.587-1.67 1.356-2.21 2.299-.542.947-.824 1.97-.846 3.07-.022 1.102.238 2.137.78 3.11.542.966 1.279 1.743 2.21 2.335.933.587 1.951.881 3.057.881 1.105 0 2.124-.294 3.057-.881.933-.587 1.67-1.356 2.21-2.298.542-.948.824-1.97.846-3.072.022-1.1-.238-2.136-.78-3.108l1.183-1.026c.693 1.365 1.03 2.8 1.008 4.308-.021 1.5-.433 2.924-1.236 4.27-.802 1.346-1.886 2.42-3.252 3.223-1.366.803-2.873 1.177-4.523 1.12l.389-.568c-1.648-.076-3.144-.53-4.49-1.365l-1.183 1.025z",
  title: "Prime Video"
};

// Hulu - Official brand logo (stylized text mark)
const siHulu: SimpleIcon = {
  path: "M7.2 4.8v6c0 .6.6 1.2 1.2 1.2h1.2V4.8H7.2zm0 8.4V18c0 .6.6 1.2 1.2 1.2h1.2v-6H7.2zM2.4 12c0-.6-.6-1.2-1.2-1.2H0v6h1.2c.6 0 1.2-.6 1.2-1.2v-3.6zm16.8 0c0-.6.6-1.2 1.2-1.2H24v6h-3.6c-.6 0-1.2-.6-1.2-1.2v-3.6zm-4.8 0c0-1.2.6-2.4 1.8-3 .6-.6 1.2-.6 1.8-.6v6c0 .6-.6 1.2-1.2 1.2h-1.2c-.6 0-1.2-.6-1.2-1.2v-2.4zm-4.8 0c0-1.2-.6-2.4-1.8-3-.6-.6-1.2-.6-1.8-.6v6c0 .6.6 1.2 1.2 1.2H8.4c.6 0 1.2-.6 1.2-1.2v-2.4z",
  title: "Hulu"
};

// Disney+ - Official logo (stylized D with arc)
const siDisneyplus: SimpleIcon = {
  path: "M12.428 2c-.064 0-.127.004-.19.012C5.749 2.418 0 7.815 0 14.304c0 3.965 1.913 7.479 4.857 9.673.023-.102.055-.203.097-.3.478-1.108 1.762-1.712 2.986-1.286.122.043.24.096.354.158.91-.593 1.894-1.086 2.933-1.462-.005-.028-.008-.056-.008-.084 0-.393.319-.71.712-.71.07 0 .138.01.202.029 1.043-.239 2.132-.367 3.253-.367.339 0 .674.014 1.006.04.017-.094.05-.187.1-.276.38-.684 1.278-.94 2.005-.573.119.06.228.132.325.213 2.49.836 4.624 2.29 6.178 4.14.025-.046.053-.09.084-.133.578-.788 1.698-1.003 2.505-.478.126.082.241.176.344.28C23.208 21.128 24 18.52 24 15.714 24 8.04 18.965 2 12.428 2zM8.44 10.24c.854 0 1.545.653 1.545 1.458 0 .806-.691 1.459-1.545 1.459-.853 0-1.545-.653-1.545-1.459 0-.805.692-1.458 1.545-1.458zm7.12 0c.854 0 1.546.653 1.546 1.458 0 .806-.692 1.459-1.546 1.459-.853 0-1.545-.653-1.545-1.459 0-.805.692-1.458 1.545-1.458z",
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
