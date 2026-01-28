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

// Amazon Prime Video - simplified play button icon
const primeVideoIcon: SimpleIcon = {
  path: "M1.252 3.766C.32 4.376 0 5.311 0 6.263v11.424c0 .92.29 1.805 1.169 2.412.461.319 1.079.43 1.556.43h.012c.627 0 1.09-.137 1.51-.399.126-.077.252-.168.378-.266l7.163-4.716a.46.46 0 0 0 .207-.381.47.47 0 0 0-.207-.378L4.625 9.66c-.126-.096-.252-.189-.378-.266-.42-.26-.883-.399-1.51-.399h-.012c-.477 0-1.095.111-1.556.43-.879.606-1.169 1.492-1.169 2.41v.001c0 .265.268.506.5.506.233 0 .5-.24.5-.507v-.004c0-.518.149-1.042.65-1.388.231-.16.538-.242.856-.242h.012c.365 0 .647.076.919.245.09.055.177.118.268.183l6.56 4.32-6.56 4.32c-.091.064-.178.127-.268.182-.272.17-.554.246-.919.246h-.012c-.318 0-.625-.082-.856-.243-.501-.345-.65-.87-.65-1.387V6.263c0-.517.149-1.042.65-1.387.231-.16.538-.243.856-.243h.012c.365 0 .647.076.919.246.09.055.177.118.268.182l9.643 6.35c.21.138.31.334.31.551 0 .219-.1.414-.31.552l-2.218 1.46c-.202.133-.258.404-.125.606.133.201.404.257.606.125l2.218-1.46c.454-.3.729-.79.729-1.283 0-.494-.275-.984-.729-1.283L5.017 4.329c-.091-.064-.178-.127-.268-.182-.272-.17-.554-.246-.919-.246h-.012c-.318 0-.625.083-.856.243-.501.346-.65.87-.65 1.388v.004c0 .265-.267.506-.5.506-.232 0-.5-.24-.5-.506v-.003c0-.952.32-1.887 1.252-2.497.461-.319 1.079-.43 1.556-.43h.012c.627 0 1.09.137 1.51.399.126.077.252.168.378.266l9.643 6.35c.679.448 1.079 1.186 1.079 1.941 0 .756-.4 1.494-1.079 1.942l-2.218 1.46c-.202.133-.473.077-.606-.124-.133-.202-.077-.473.125-.606l2.218-1.46c.454-.3.729-.79.729-1.284 0-.493-.275-.983-.729-1.282L6.17 4.329c-.126-.098-.252-.189-.378-.266-.42-.262-.883-.399-1.51-.399h-.012c-.477 0-1.095.111-1.556.43zM22.5 18.13l-1.5 1.5c-.293.293-.768.293-1.061 0-.293-.294-.293-.768 0-1.061l.47-.47H13.5c-.414 0-.75-.335-.75-.75 0-.413.336-.75.75-.75h6.909l-.47-.469c-.293-.293-.293-.768 0-1.061.294-.293.768-.293 1.061 0l1.5 1.5c.293.293.293.768 0 1.061z",
  title: "Prime Video"
};

// Hulu - official brand wordmark
const huluIcon: SimpleIcon = {
  path: "M6.157 5.1v4.125c-.717-.48-1.554-.721-2.398-.721C1.674 8.504 0 10.255 0 12.75v5.25h4.2V12.6c0-.45.3-.75.75-.75s.75.3.75.75v5.4h4.2V5.1H6.157zm16.043 3.6h-4.35v6.15c0 .45-.3.75-.75.75s-.75-.3-.75-.75V8.7h-4.2v6.15c0 2.55 1.65 4.2 4.2 4.2.852 0 1.693-.24 2.41-.72V18h3.44V8.7zM24 5.1h-4.2v12.9H24V5.1z",
  title: "Hulu"
};

// Disney+ - D+ logo mark
const disneyPlusIcon: SimpleIcon = {
  path: "M20.568 7.828c-.299-.383-.75-.62-1.238-.62h-5.345c-.162 0-.329.022-.488.065l-1.058.281-2.308.618-1.044.28c-.161.043-.328.065-.49.065H6.67c-.49 0-.939.237-1.238.62-.3.382-.407.878-.29 1.36l1.515 6.268c.168.696.791 1.19 1.528 1.19h5.345c.161 0 .328-.022.489-.065l4.41-1.18c.16-.043.328-.065.489-.065h.937c.489 0 .94-.237 1.238-.62.299-.382.406-.877.29-1.36l-1.516-6.267c-.168-.697-.791-1.19-1.528-1.19h-.937c-.161 0-.329.021-.489.065l-4.41 1.179c-.16.043-.327.066-.488.066h.87c.488 0 .939.236 1.238.62.3.381.407.877.29 1.36l-.758 3.133c-.169.697-.792 1.19-1.529 1.19H9.873c-.162 0-.329-.021-.489-.065l-1.058-.282c-.16-.043-.327-.065-.489-.065h-.17c-.166 0-.301-.135-.301-.302 0-.027.004-.054.01-.08l1.517-6.268c.055-.229.26-.39.495-.39h1.793c.161 0 .328.022.488.066l1.059.281 2.307.617 1.044.28c.162.044.329.066.49.066h1.103c.166 0 .302.136.302.302 0 .028-.004.055-.011.08l-1.516 6.268c-.056.23-.261.39-.496.39h-1.793zm-13.254.846a.628.628 0 0 0-.609.476l-1.686 6.976a.628.628 0 0 0 .609.78h2.197a.628.628 0 0 0 .608-.476l1.686-6.976a.628.628 0 0 0-.608-.78H7.314z",
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
