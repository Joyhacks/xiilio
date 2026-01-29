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
// Based on official brand logos/app icons
// ============================================

// Prime Video - "prime video" wordmark style with Amazon smile arrow
const siPrimevideo: SimpleIcon = {
  path: "M.508 12.975c-.072.088-.083.2-.027.298.054.093.152.146.255.135a.27.27 0 0 0 .147-.063c2.446-2.078 5.569-3.376 8.947-3.376 3.378 0 6.6 1.147 9.209 3.255a.27.27 0 0 0 .38-.034.27.27 0 0 0-.034-.38C16.632 10.633 13.214 9.403 9.83 9.403c-3.583 0-6.9 1.369-9.322 3.572zM19.2 14.7l2.1 2.4c.15.15.15.45-.075.6l-2.175 1.8c-.15.15-.075.375.15.375h.15c.075 0 .15-.075.225-.15l2.625-2.175c.225-.225.225-.525 0-.75L19.8 14.25c-.075-.075-.15-.15-.225-.15h-.225c-.15.075-.225.225-.15.6zM2.4 7.2h1.8c.6 0 1.05.225 1.35.525.3.375.45.75.45 1.275v.15c0 .525-.15.975-.45 1.275-.3.375-.75.525-1.35.525H3.3v2.25H2.4V7.2zm1.8 3c.375 0 .6-.075.75-.3.15-.15.225-.375.225-.675V9.15c0-.3-.075-.525-.225-.675-.15-.225-.375-.3-.75-.3H3.3v2.025h.9zm3.6-3h1.125c.45 0 .825.15 1.05.375.225.225.375.525.375.9 0 .45-.15.825-.525 1.05l.75 2.775H9.6l-.6-2.4h-.675v2.4H7.2V7.2h1.8zm.975 2.025c.225 0 .375-.075.45-.15a.61.61 0 0 0 .15-.45c0-.15-.075-.3-.15-.45-.075-.075-.225-.15-.45-.15h-.45v1.2h.45zM11.7 7.2h.9v6h-.9V7.2zm1.65 0h1.05l.9 3.9.9-3.9h1.05v6h-.825V8.85l-.975 4.35h-.375L14.1 8.925V13.2h-.75V7.2zm5.025 0h2.7v.825h-1.8v1.65h1.5v.825h-1.5v1.875h1.8v.825h-2.7V7.2z",
  title: "Prime Video"
};

// Hulu - lowercase "hulu" wordmark
const siHulu: SimpleIcon = {
  path: "M4.5 6v3.6c-.72-.96-1.8-1.44-3.06-1.44C.6 8.16 0 8.76 0 9.6v5.4c0 .84.6 1.44 1.44 1.44.6 0 1.14-.24 1.5-.72.36-.48.54-1.14.54-1.92V9.36c0-.36.12-.66.36-.84.24-.24.54-.36.9-.36.36 0 .66.12.9.36.24.24.36.54.36.9v5.58h2.4V9.36c0-.36.12-.66.36-.84.24-.24.54-.36.9-.36.36 0 .66.12.9.36.24.24.36.54.36.9v5.58h2.4V9c0-.84-.24-1.5-.72-2.04-.48-.48-1.14-.78-1.98-.78-1.26 0-2.28.48-3 1.44V6H4.5zm13.92 2.16c-1.26 0-2.28.42-3.06 1.26-.72.78-1.08 1.8-1.08 3.06v2.52h2.4v-2.52c0-.6.18-1.08.48-1.44.36-.36.78-.54 1.32-.54.54 0 .96.18 1.26.54.36.36.48.84.48 1.44v2.52h2.4v-2.52c0-1.26-.36-2.28-1.08-3.06-.78-.84-1.86-1.26-3.12-1.26z",
  title: "Hulu"
};

// Disney+ - Stylized Disney wordmark with plus
const siDisneyplus: SimpleIcon = {
  path: "M4.37 9.75c.12-.53.53-.96 1.08-1.08 1.75-.42 4.34-.42 6.55-.42 2.21 0 4.8 0 6.55.42.55.12.96.55 1.08 1.08.25 1.14.37 2.87.37 4.25s-.12 3.11-.37 4.25c-.12.53-.53.96-1.08 1.08-1.75.42-4.34.42-6.55.42-2.21 0-4.8 0-6.55-.42-.55-.12-.96-.55-1.08-1.08-.25-1.14-.37-2.87-.37-4.25s.12-3.11.37-4.25zm5.42 1.57v5.36L14.21 14l-4.42-2.68zm11.34.68h1.87v1h-1.87v1.87h-1V13h-1.87v-1h1.87v-1.87h1V12z",
  title: "Disney+"
};

// Max - Using official simple-icons path (already accurate)
const siMax: SimpleIcon = {
  path: "M1.769 0A1.77 1.77 0 0 0 0 1.769V22.23A1.77 1.77 0 0 0 1.769 24H22.23A1.77 1.77 0 0 0 24 22.231V1.77A1.77 1.77 0 0 0 22.231 0zm12.485 3.28a4.301 4.301 0 0 1 4.3 4.302 4.301 4.301 0 0 1-1.993 3.63 6.085 6.085 0 0 1 1.054 3.422 6.085 6.085 0 0 1-6.085 6.085 6.085 6.085 0 0 1-6.085-6.085 6.085 6.085 0 0 1 4.66-5.916 4.301 4.301 0 0 1-.152-1.136 4.301 4.301 0 0 1 4.301-4.301zm0 1.849a2.453 2.453 0 0 0-2.453 2.453 2.453 2.453 0 0 0 2.453 2.453 2.453 2.453 0 0 0 2.453-2.453 2.453 2.453 0 0 0-2.453-2.453zm-2.724 5.268a4.237 4.237 0 0 0-4.237 4.237 4.237 4.237 0 0 0 4.237 4.237 4.237 4.237 0 0 0 4.237-4.237 4.237 4.237 0 0 0-4.237-4.237zm.032 2.54a1.781 1.781 0 1 1 0 3.562 1.781 1.781 0 0 1 0-3.562Z",
  title: "Max"
};

// CNN - Using official simple-icons path
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
