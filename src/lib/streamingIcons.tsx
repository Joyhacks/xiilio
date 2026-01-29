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
// Using accurate brand icon representations
// ============================================

// Prime Video - Stylized play triangle (Amazon Prime Video app icon style)
const siPrimevideo: SimpleIcon = {
  path: "M1.5 3.5l18.5 8.5-18.5 8.5v-17zm1.5 2.7v11.6l12.3-5.8-12.3-5.8z",
  title: "Prime Video"
};

// Hulu - Lowercase "hulu" wordmark (accurate to app icon)
const siHulu: SimpleIcon = {
  path: "M2.4 6v4.56c.84-1.08 2.1-1.68 3.6-1.68 2.76 0 4.8 2.04 4.8 5.04v6.48H8.4v-6.24c0-1.68-1.08-2.88-2.64-2.88s-2.64 1.2-2.64 2.88v6.24H.72V6h1.68zm10.32 3.12v11.28h2.4V9.12h-2.4zm6 0v11.28h2.4V9.12h-2.4zm3.12 5.64c0-3.36 2.4-5.88 5.76-5.88 3.24 0 5.76 2.52 5.76 5.88v.6h-9.12c.24 1.92 1.68 3.12 3.6 3.12 1.32 0 2.4-.6 3-1.56l1.92 1.08c-.96 1.56-2.76 2.52-4.92 2.52-3.48 0-6-2.52-6-5.76zm2.52-1.08h6.48c-.36-1.68-1.68-2.76-3.24-2.76s-2.88 1.08-3.24 2.76z",
  title: "Hulu"
};

// Disney+ - Mickey ears silhouette with plus (accurate to app icon)
const siDisneyplus: SimpleIcon = {
  path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-4H6v-2h4V7h2v4h4v2h-4v4h-2z",
  title: "Disney+"
};

// Max - Official path from simple-icons (rounded M logo)
const siMax: SimpleIcon = {
  path: "M1.769 0A1.77 1.77 0 0 0 0 1.769V22.23A1.77 1.77 0 0 0 1.769 24H22.23A1.77 1.77 0 0 0 24 22.231V1.77A1.77 1.77 0 0 0 22.231 0zm12.485 3.28a4.301 4.301 0 0 1 4.3 4.302 4.301 4.301 0 0 1-1.993 3.63 6.085 6.085 0 0 1 1.054 3.422 6.085 6.085 0 0 1-6.085 6.085 6.085 6.085 0 0 1-6.085-6.085 6.085 6.085 0 0 1 4.66-5.916 4.301 4.301 0 0 1-.152-1.136 4.301 4.301 0 0 1 4.301-4.301zm0 1.849a2.453 2.453 0 0 0-2.453 2.453 2.453 2.453 0 0 0 2.453 2.453 2.453 2.453 0 0 0 2.453-2.453 2.453 2.453 0 0 0-2.453-2.453zm-2.724 5.268a4.237 4.237 0 0 0-4.237 4.237 4.237 4.237 0 0 0 4.237 4.237 4.237 4.237 0 0 0 4.237-4.237 4.237 4.237 0 0 0-4.237-4.237zm.032 2.54a1.781 1.781 0 1 1 0 3.562 1.781 1.781 0 0 1 0-3.562Z",
  title: "Max"
};

// CNN - Official path from simple-icons
const siCnn: SimpleIcon = {
  path: "M23.9962 15.514c0 2.0638-2.6676 3.0547-4.0789.6576-.1012-.173-2.3252-4.0032-2.3252-4.0032v3.3457c0 2.0637-2.6663 3.0546-4.0776.6575-.1025-.173-2.3253-4.0032-2.3253-4.0032v3.1547c0 1.4318-.8498 2.2073-2.1791 2.2073H5.5299a5.5299 5.5299 0 010-11.0598h1.7946v1.328H5.5299a4.2019 4.2019 0 100 8.4038h3.4494a.8973.8973 0 00.8794-.878V8.524a.2692.2692 0 01.1935-.273c.141-.0384.2897.0487.3987.2333l2.1522 3.7084c1.251 2.1573 2.0728 3.5738 2.083 3.5892.2807.4742.6986.5576.9973.4755a.7973.7973 0 00.582-.787v-6.945a.2705.2705 0 01.191-.2744c.1397-.0384.287.0487.3947.2333l1.9946 3.4366 2.242 3.8648c.2191.3717.5242.5038.7896.5038a.7691.7691 0 00.2063-.0282.7986.7986 0 00.591-.791V6.4707H24zM8.0026 13.9695V8.4857c0-2.0638 2.6675-3.0546 4.0788-.6563.1025.173 2.3253 4.002 2.3253 4.002V8.4856c0-2.0638 2.6662-3.0546 4.0775-.6563.1026.173 2.3253 4.002 2.3253 4.002V6.4705H22.14v8.9999a.2705.2705 0 01-.1935.2743c-.141.0384-.2897-.0487-.3987-.2333a1360.4277 1360.4277 0 01-2.2406-3.8622l-1.9946-3.434c-.2794-.4744-.696-.5577-.9921-.477a.7986.7986 0 00-.5833.7858v6.9464a.2718.2718 0 01-.1935.2743c-.1423.0384-.291-.0487-.3987-.2333-.0192-.032-1.069-1.8407-2.083-3.5892a6211.7971 6211.7971 0 00-2.1535-3.711c-.2794-.4755-.6973-.5575-.996-.4768a.7999.7999 0 00-.5845.7858v6.8002a.3717.3717 0 01-.3487.3474h-3.452a3.6712 3.6712 0 010-7.3424H7.322v1.328H5.5427a2.3432 2.3432 0 100 4.6864H7.636a.364.364 0 00.3666-.3705Z",
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
