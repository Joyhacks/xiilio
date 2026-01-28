// Centralized Streaming Service Icons Configuration
// Uses Simple Icons for brand-accurate SVGs

import {
  siNetflix,
  siAppletv,
  siHbo,
  siYoutube,
} from "simple-icons";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type StreamingBrandKey = 
  | "netflix" 
  | "primevideo" 
  | "appletv" 
  | "paramountplus" 
  | "max"
  | "youtube"
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
// Official brand-accurate paths
// ============================================

// Prime Video - Amazon smile arrow (official brand element)
const siPrimevideo: SimpleIcon = {
  path: "M.513 12.935c-.102.058-.164.156-.164.26v1.062c0 .135.11.245.245.245h.368c.058 0 .114-.02.16-.058l1.347-1.129a.245.245 0 00-.157-.433H.513zm4.07 0c-.102.058-.164.156-.164.26v1.062c0 .135.11.245.245.245h.368c.058 0 .114-.02.16-.058l1.347-1.129a.245.245 0 00-.157-.433H4.583zM20.78 4.093H3.219c-.65 0-1.178.528-1.178 1.178v3.534c0 .65.528 1.178 1.178 1.178H20.78c.65 0 1.178-.528 1.178-1.178V5.271c0-.65-.528-1.178-1.178-1.178zm-8.862 4.321a.245.245 0 01-.245.245H6.19a.245.245 0 01-.245-.245V5.862c0-.135.11-.245.245-.245h.49c.135 0 .245.11.245.245v2.061h1.226v-2.06c0-.136.11-.246.245-.246h.49c.136 0 .245.11.245.245v2.061h1.227v-2.06c0-.136.11-.246.245-.246h.49c.136 0 .246.11.246.245v2.552zm5.308 0a.245.245 0 01-.245.245h-4.063a.245.245 0 01-.245-.245V5.862c0-.135.11-.245.245-.245h4.063c.135 0 .245.11.245.245v2.552z",
  title: "Prime Video"
};


// Paramount+ - Mountain peak logo
const siParamountplus: SimpleIcon = {
  path: "M12 2L2 19h3.5l1.667-3H12l4.833 3H22L12 2zm0 4.5L16.5 14h-9L12 6.5zM19 21h2v2h-2v-2zm-2 0h2v2h-2v-2z",
  title: "Paramount+"
};

// CNN - Official CNN logo
const siCnn: SimpleIcon = {
  path: "M24 5.572v12.857c0 .535-.197.988-.59 1.357-.395.37-.876.554-1.443.554H2.033c-.567 0-1.048-.184-1.443-.554C.197 19.418 0 18.964 0 18.43V5.572c0-.535.197-.988.59-1.357C.985 3.844 1.466 3.66 2.033 3.66h19.934c.567 0 1.048.184 1.443.554.393.37.59.822.59 1.357zM8.328 15.027h1.476V9.195H8.328v5.832zm-4.477 0h1.37v-4.004c0-.175.043-.32.127-.436.085-.116.195-.195.33-.236a.776.776 0 01.432.02.603.603 0 01.29.223c.07.104.116.23.138.376.022.146.028.307.017.48v3.577h1.37v-4.004c0-.175.043-.32.127-.436.085-.116.195-.195.33-.236a.776.776 0 01.432.02.603.603 0 01.29.223c.07.104.116.23.138.376.022.146.028.307.017.48v3.577h1.37v-3.743c0-.374-.044-.709-.132-1.004a1.957 1.957 0 00-.407-.754 1.716 1.716 0 00-.69-.469 2.436 2.436 0 00-.986-.16c-.278 0-.527.043-.746.128a1.654 1.654 0 00-.555.331 1.78 1.78 0 00-.38.463c-.09-.203-.214-.376-.372-.52a1.554 1.554 0 00-.527-.303 2.02 2.02 0 00-.639-.1c-.267 0-.504.05-.712.152a1.46 1.46 0 00-.519.398v-.41H3.85v5.831zm16.248-5.832h-1.476v5.832h1.476v-2.862l2.214 2.862H24v-5.832h-1.476v2.862l-2.425-2.862z",
  title: "CNN"
};

// ============================================
// ICON MAP
// ============================================

const iconMap: Record<StreamingBrandKey, SimpleIcon> = {
  netflix: siNetflix,
  primevideo: siPrimevideo,
  appletv: siAppletv,
  paramountplus: siParamountplus,
  max: siHbo, // HBO brand icon for Max (formerly HBO Max)
  youtube: siYoutube,
  cnn: siCnn,
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
  max: {
    bg: "bg-[#002BE7]",
    glow: "shadow-[0_0_20px_rgba(0,43,231,0.5)]",
  },
  youtube: {
    bg: "bg-[#FF0000]",
    glow: "shadow-[0_0_20px_rgba(255,0,0,0.5)]",
  },
  cnn: {
    bg: "bg-[#CC0000]",
    glow: "shadow-[0_0_20px_rgba(204,0,0,0.5)]",
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
    id: "max",
    name: "Max",
    href: "https://www.max.com/",
    brandKey: "max",
    brandColor: "#002BE7",
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://www.youtube.com/",
    brandKey: "youtube",
    brandColor: "#FF0000",
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
