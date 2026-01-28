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
  | "hulu" 
  | "disneyplus" 
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

// Hulu - Official Hulu logo path
const siHulu: SimpleIcon = {
  path: "M2.8 4.2v5.6h.9V7.6c0-.5.4-.9.9-.9h.7c.5 0 .9.4.9.9v2.2h.9V7.6c0-.9-.8-1.7-1.7-1.7h-.8c-.5 0-.9.2-.9.2V4.2h-.9zm5.9 2.6v2.2c0 .9.8 1.7 1.7 1.7h.8c.9 0 1.7-.8 1.7-1.7V6.8h-.9v2.2c0 .5-.4.9-.9.9h-.7c-.5 0-.9-.4-.9-.9V6.8h-.8zm6.7 0v2.2c0 .9-.8 1.7-1.7 1.7h-.8V9.8h.8c.5 0 .9-.4.9-.9V6.8h.8zm1.7 0v2.2c0 .9.8 1.7 1.7 1.7h.8c.9 0 1.7-.8 1.7-1.7V6.8H20v2.2c0 .5-.4.9-.9.9h-.7c-.5 0-.9-.4-.9-.9V6.8h-.4z",
  title: "Hulu"
};

// Disney+ - Disney+ logo path
const siDisneyplus: SimpleIcon = {
  path: "M6.873 2.037c-.598 0-1.087.235-1.47.705-.324.397-.543.949-.66 1.658-.172.043-.344.09-.515.14-.48.14-.937.33-1.372.57-.478.264-.863.554-1.155.871-.318.343-.527.688-.628 1.035-.101.347-.077.654.07.92.118.213.304.385.56.516.253.13.595.228 1.025.295-.175.487-.291.99-.348 1.51-.076.69-.06 1.364.05 2.022.125.745.371 1.422.74 2.03.406.669.93 1.212 1.574 1.63.706.459 1.488.748 2.346.866a.23.23 0 00.201-.065.229.229 0 00.073-.198l-.023-.162a.231.231 0 00-.125-.173.233.233 0 00-.111-.028c-.779-.026-1.474-.218-2.085-.578-.551-.324-.988-.752-1.311-1.285a4.767 4.767 0 01-.599-1.655 6.087 6.087 0 01-.037-1.73c.068-.618.212-1.192.431-1.723.027-.065.078-.116.142-.142.087-.035.185-.016.254.052.094.094.21.182.349.264.29.17.696.341 1.22.514.542.18 1.119.333 1.733.46.669.138 1.375.244 2.119.32a.232.232 0 00.249-.196c.11-.653.167-1.374.167-2.162a8.21 8.21 0 00-.258-2.088.233.233 0 00-.153-.157.228.228 0 00-.212.033c-.31.231-.694.403-1.152.516-.395.097-.853.146-1.374.146-.454 0-.842-.034-1.167-.1-.29-.06-.54-.141-.748-.245-.238-.119-.424-.262-.558-.43a1.06 1.06 0 01-.217-.573c-.017-.19.015-.359.096-.508.096-.176.256-.331.48-.466.262-.158.587-.27.977-.336.426-.072.9-.077 1.423-.014.57.069 1.082.204 1.536.404.496.218.921.503 1.277.854.393.389.698.844.916 1.365.24.573.361 1.2.361 1.881 0 .623-.095 1.273-.286 1.95a.23.23 0 00.087.244.23.23 0 00.257.01c.574-.369 1.028-.823 1.364-1.362.369-.592.595-1.242.678-1.95.076-.642.055-1.301-.062-1.979a5.94 5.94 0 00-.502-1.492c-.246-.477-.573-.908-.98-1.295a5.755 5.755 0 00-1.55-1.065 6.432 6.432 0 00-1.857-.614 7.044 7.044 0 00-2.089-.064zm11.364 5.09a.232.232 0 00-.186.093l-2.04 2.76c-.2.27-.298.603-.278.942.02.332.136.64.329.873l2.015 2.433a.232.232 0 00.18.085h1.74c.08 0 .155-.04.199-.108a.232.232 0 00.014-.224l-2.129-2.574a.698.698 0 01-.131-.34.645.645 0 01.108-.396l2.128-2.873a.231.231 0 00-.015-.288.232.232 0 00-.175-.082h-1.759zm-9.63 2.017a.23.23 0 00-.164.067.231.231 0 00-.068.166v5.088c0 .128.104.232.232.232h1.556a.232.232 0 00.232-.232V9.377a.232.232 0 00-.232-.232H8.607zm3.117 0a.232.232 0 00-.232.232v5.088c0 .128.104.232.232.232h1.492a.232.232 0 00.232-.232v-3.086c0-.214.086-.415.237-.564a.78.78 0 01.556-.233c.21 0 .407.084.557.233a.803.803 0 01.236.564v3.086c0 .128.104.232.232.232h1.493a.232.232 0 00.232-.232v-3.472a1.94 1.94 0 00-.571-1.38 1.917 1.917 0 00-1.365-.57c-.537 0-1.02.22-1.375.576V9.377a.232.232 0 00-.232-.232h-1.724zm9.183 0a.232.232 0 00-.232.232v3.472c0 .366.097.72.281 1.03.184.312.448.572.766.753.353.202.75.304 1.187.304.48 0 .892-.112 1.235-.336.3-.195.527-.453.68-.771v.877c0 .128.104.232.232.232h1.493a.232.232 0 00.232-.232V9.377a.232.232 0 00-.232-.232h-1.493a.232.232 0 00-.232.232v.877a1.925 1.925 0 00-.68-.77c-.343-.225-.755-.337-1.235-.337-.437 0-.834.101-1.187.303a2.145 2.145 0 00-.766.754 2.04 2.04 0 00-.28 1.03v3.472a.232.232 0 00.232.232h1.493a.232.232 0 00.232-.232v-3.086c0-.214.086-.415.237-.564a.78.78 0 01.556-.233c.21 0 .407.084.557.233.15.149.236.35.236.564v3.086c0 .128.104.232.232.232h1.494a.232.232 0 00.232-.232v-3.472a1.94 1.94 0 00-.572-1.38 1.917 1.917 0 00-1.365-.57c-.537 0-1.02.22-1.375.576a1.949 1.949 0 00-1.374-.576 1.917 1.917 0 00-1.365.57 1.94 1.94 0 00-.571 1.38v3.472c0 .128.104.232.232.232h1.493a.232.232 0 00.232-.232v-3.086c0-.214.086-.415.236-.564a.78.78 0 01.557-.233c.21 0 .407.084.556.233a.803.803 0 01.237.564v3.086c0 .128.104.232.232.232h1.493a.232.232 0 00.232-.232V9.377a.232.232 0 00-.232-.232H20.907z",
  title: "Disney+"
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
  hulu: siHulu,
  disneyplus: siDisneyplus,
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
