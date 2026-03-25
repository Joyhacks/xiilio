// Centralized Streaming Service Icons Configuration
// Uses Simple Icons where available, image assets for others

import {
  siNetflix,
  siAppletv,
  siYoutube,
  siSpotify,
  siUber,
} from "@/lib/simpleIcons";
import { Wallet } from "lucide-react";

// Import official brand logos for services not in simple-icons
import primeVideoLogo from "@/assets/streaming/primevideo.svg";
import disneyPlusLogo from "@/assets/streaming/disneyplus.svg";
import hboMaxLogo from "@/assets/streaming/hbomax.png";
import googleWalletLogo from "@/assets/streaming/google-wallet.png";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type StreamingBrandKey = 
  | "netflix" 
  | "primevideo" 
  | "appletv" 
  | "max"
  | "youtube"
  | "disneyplus"
  | "spotify"
  | "cnn"
  | "uber"
  | "wallet";

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
// ICON TYPE: SVG path or image URL
// ============================================

type IconSource = 
  | { type: "svg"; icon: SimpleIcon }
  | { type: "image"; src: string; noFilter?: boolean; scale?: number }
  | { type: "lucide"; component: "wallet" };

const iconSources: Record<StreamingBrandKey, IconSource> = {
  netflix: { type: "svg", icon: siNetflix },
  primevideo: { type: "image", src: primeVideoLogo, scale: 1.4 },
  appletv: { type: "svg", icon: siAppletv },
  max: { type: "image", src: hboMaxLogo, noFilter: true },
  youtube: { type: "svg", icon: siYoutube },
  disneyplus: { type: "image", src: disneyPlusLogo },
  spotify: { type: "svg", icon: siSpotify },
  cnn: { 
    type: "svg", 
    icon: {
      // CNN - Three C/N letters stylized  
      path: "M5 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h2v-2H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2V5H5zm5 0v14h2V12l3 7h2V5h-2v7l-3-7h-2zm8 0v14h2V12l3 7h2V5h-2v7l-3-7h-2z",
      title: "CNN"
    }
  },
  uber: { type: "svg", icon: siUber },
  wallet: { type: "image", src: googleWalletLogo, noFilter: true, scale: 1.3 },
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
  disneyplus: {
    bg: "bg-[#113CCF]",
    glow: "shadow-[0_0_20px_rgba(17,60,207,0.6)]",
  },
  spotify: {
    bg: "bg-[#1DB954]",
    glow: "shadow-[0_0_20px_rgba(29,185,84,0.6)]",
  },
  cnn: {
    bg: "bg-[#CC0000]",
    glow: "shadow-[0_0_20px_rgba(204,0,0,0.6)]",
  },
  uber: {
    bg: "bg-[#000000]",
    glow: "shadow-[0_0_20px_rgba(0,0,0,0.4)]",
  },
  wallet: {
    bg: "bg-[#4F46E5]",
    glow: "shadow-[0_0_20px_rgba(79,70,229,0.6)]",
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
  const source = iconSources[brandKey];
  
  if (!source) {
    return null;
  }
  
  // Handle Lucide icons
  if (source.type === "lucide") {
    return <Wallet className={className} style={{ width: size, height: size, color: "white" }} />;
  }
  
  // Handle image-based icons (official brand logos)
  if (source.type === "image") {
    const shouldApplyFilter = !source.noFilter;
    const scale = source.scale || (source.noFilter ? 1.8 : 1);
    return (
      <img
        src={source.src}
        alt={brandKey}
        className={className}
        style={{ 
          width: size * scale, 
          height: size * scale, 
          objectFit: source.noFilter ? "cover" : "contain",
          // Apply white filter only for logos that need it
          filter: shouldApplyFilter ? "brightness(0) invert(1)" : undefined,
          borderRadius: source.noFilter ? "8px" : undefined
        }}
      />
    );
  }
  
  // Handle SVG path-based icons
  const icon = source.icon;
  if (!icon?.path) {
    return null;
  }
  
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
    id: "cnn",
    name: "CNN",
    href: "https://www.cnn.com/",
    brandKey: "cnn",
    brandColor: "#CC0000",
  },
  {
    id: "uber",
    name: "Uber",
    href: "https://www.uber.com/",
    brandKey: "uber",
    brandColor: "#000000",
  },
  {
    id: "wallet",
    name: "Cards",
    href: "/settings#cards",
    brandKey: "wallet",
    brandColor: "#4F46E5",
  },
];

export const allStreamingServices: StreamingService[] = [
  ...primaryStreamingServices,
  ...additionalStreamingServices,
];

// Export icon sources for direct access if needed
export const streamingIcons = iconSources;
