// Centralized Streaming Service Icons Configuration
// Uses Simple Icons for brand-accurate SVGs

import {
  siNetflix,
  siAppletv,
  siHbo,
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

// Prime Video - Amazon smile arrow (official brand element)
const siPrimevideo: SimpleIcon = {
  path: "M1.252 15.456c-.238.194-.27.534-.07.768a.546.546 0 0 0 .754.084c2.922-2.384 6.816-3.808 11.064-3.808 3.248 0 6.82.786 10.014 2.408a.524.524 0 0 0 .71-.21.536.536 0 0 0-.208-.722c-3.39-1.722-7.182-2.56-10.516-2.56-4.506 0-8.64 1.504-11.748 4.04zM21.12 17.32c-.306-.396-.952-.302-1.416-.074-1.6.8-4.768 2.088-8.704 2.088-4.168 0-7.544-1.288-8.912-1.938-.396-.188-.878-.108-1.116.258-.238.366-.07.84.378 1.076 1.48.8 5.232 2.278 9.65 2.278 3.876 0 7.99-1.356 9.712-2.566.476-.334.692-.806.408-1.122zm-8.12-5.574l-.008-5.228c0-.8-.584-1.352-1.388-1.352-.63 0-1.134.374-1.52.974l-2.796 4.34-2.83-4.34c-.386-.6-.906-.974-1.536-.974-.77 0-1.354.584-1.354 1.352l-.008 5.228c0 .652.5 1.15 1.134 1.15.634 0 1.118-.498 1.118-1.15V8.94l1.936 2.89c.302.446.604.646 1.04.646.436 0 .738-.2 1.04-.646l1.936-2.89v2.806c0 .652.484 1.15 1.118 1.15.634 0 1.118-.498 1.118-1.15z",
  title: "Prime Video"
};

// Hulu - Official Hulu wordmark path
const siHulu: SimpleIcon = {
  path: "M7.2 4.8v6h1.2v-2.4c0-.6.6-1.2 1.2-1.2s1.2.6 1.2 1.2v2.4h1.2v-2.4c0-1.2-1.2-2.4-2.4-2.4s-2.4 1.2-2.4 2.4V4.8H6v6h1.2V4.8zm8.4 3.6v2.4h1.2V8.4c0-.6.6-1.2 1.2-1.2s1.2.6 1.2 1.2v2.4h1.2V8.4c0-1.2-1.2-2.4-2.4-2.4s-2.4 1.2-2.4 2.4zM12 6v2.4c0 1.2 1.2 2.4 2.4 2.4s2.4-1.2 2.4-2.4H15.6c0 .6-.6 1.2-1.2 1.2s-1.2-.6-1.2-1.2V6H12zm-8.4 0v4.8h1.2V6H2.4v-.6c0-.6.6-1.2 1.2-1.2h.6V3H3.6C2.4 3 1.2 4.2 1.2 5.4V6h1.2zM24 6v4.8h-1.2V6c0-.6-.6-1.2-1.2-1.2h-.6V3h.6c1.2 0 2.4 1.2 2.4 2.4v.6z",
  title: "Hulu"
};

// Disney+ - Disney script D with plus
const siDisneyplus: SimpleIcon = {
  path: "M8.8 6.6c0-1.1.9-2 2-2h2.4c1.1 0 2 .9 2 2v.4c0 1.1-.9 2-2 2h-2.4c-1.1 0-2-.9-2-2v-.4zm2 .4h2.4v-.4h-2.4v.4zm9.6 5.6h-2v-2h-1.6v2h-2v1.6h2v2h1.6v-2h2v-1.6zM5.6 7.4c0 2.2 1.8 4 4 4h4.8c2.2 0 4-1.8 4-4v-.8c0-2.2-1.8-4-4-4H9.6c-2.2 0-4 1.8-4 4v.8zm1.6-.8c0-1.3 1.1-2.4 2.4-2.4h4.8c1.3 0 2.4 1.1 2.4 2.4v.8c0 1.3-1.1 2.4-2.4 2.4H9.6c-1.3 0-2.4-1.1-2.4-2.4v-.8zM4 17.4c1.4 2.4 4 4 7 4h2c3 0 5.6-1.6 7-4H4zm3.8 2h8.4c-1.1.8-2.4 1.2-3.8 1.2h-1c-1.4 0-2.6-.4-3.6-1.2z",
  title: "Disney+"
};

// ============================================
// ICON MAP
// ============================================

const iconMap: Record<StreamingBrandKey, SimpleIcon> = {
  netflix: siNetflix,
  primevideo: siPrimevideo,
  appletv: siAppletv,
  paramountplus: siParamountplus,
  hulu: siHulu,
  disneyplus: siDisneyplus,
  max: siHbo, // HBO brand icon for Max (formerly HBO Max)
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
