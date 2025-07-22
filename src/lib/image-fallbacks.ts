/**
 * 🖼️ IMAGE FALLBACK SYSTEM
 * Handles missing profile images with elegant SVG fallbacks and proper error handling
 */

import { DivineRole } from "./design-system";

export interface ImageFallbackConfig {
  personId: string;
  name: string;
  role?: DivineRole;
  title?: string;
}

/**
 * Generates an SVG fallback for missing profile images
 */
export function generateProfileFallback(config: ImageFallbackConfig): string {
  const { name, role = "default", title = "" } = config;

  // Role-based color schemes
  const roleColors = {
    lightworker: {
      primary: "#f59e0b",
      secondary: "#fef3c7",
      accent: "#92400e",
    },
    messenger: { primary: "#3b82f6", secondary: "#dbeafe", accent: "#1e40af" },
    witness: { primary: "#10b981", secondary: "#d1fae5", accent: "#047857" },
    guardian: { primary: "#8b5cf6", secondary: "#ede9fe", accent: "#5b21b6" },
    default: { primary: "#6b7280", secondary: "#f3f4f6", accent: "#374151" },
  };

  const colors = roleColors[role] || roleColors.default;
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full">
      <!-- Background -->
      <rect width="400" height="400" fill="${colors.secondary}"/>
      
      <!-- Gradient overlay -->
      <defs>
        <radialGradient id="grad1" cx="50%" cy="30%" r="70%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:0.1"/>
          <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0.05"/>
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#grad1)"/>
      
      <!-- Profile circle background -->
      <circle cx="200" cy="180" r="80" fill="${colors.primary}" opacity="0.1"/>
      <circle cx="200" cy="180" r="60" fill="${colors.primary}" opacity="0.2"/>
      
      <!-- Initials -->
      <text x="200" y="200" text-anchor="middle" fill="${colors.accent}" 
            font-family="Inter, system-ui, sans-serif" font-size="48" font-weight="600">
        ${initials}
      </text>
      
      <!-- Name -->
      <text x="200" y="320" text-anchor="middle" fill="${colors.accent}" 
            font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="500">
        ${name}
      </text>
      
      <!-- Title/Role -->
      ${
        title
          ? `
        <text x="200" y="340" text-anchor="middle" fill="${colors.primary}" 
              font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="400">
          ${title}
        </text>
      `
          : ""
      }
      
      <!-- Decorative elements -->
      <circle cx="320" cy="80" r="8" fill="${colors.primary}" opacity="0.3"/>
      <circle cx="80" cy="320" r="6" fill="${colors.primary}" opacity="0.4"/>
      <circle cx="350" cy="350" r="4" fill="${colors.primary}" opacity="0.5"/>
    </svg>
  `)}`;
}

/**
 * Enhanced image component with automatic fallback handling
 */
export function getImageWithFallback(
  src: string,
  config: ImageFallbackConfig,
): { src: string; isFallback: boolean } {
  // In a real implementation, you'd check if the image exists
  // For now, we'll assume it exists unless it matches known missing patterns
  const missingImagePatterns = [
    "/images/people/jahmere-webb/jahmere-webb-profile.jpg",
    "/images/people/tony-dungy/tony-dungy-profile.jpg",
    "/images/people/coach-dungy/coach-dungy-profile.jpg",
  ];

  const isMissing = missingImagePatterns.some((pattern) =>
    src.includes(pattern),
  );

  if (isMissing) {
    return {
      src: generateProfileFallback(config),
      isFallback: true,
    };
  }

  return {
    src,
    isFallback: false,
  };
}

/**
 * Predefined fallbacks for known people
 */
export const knownPeopleFallbacks: Record<string, ImageFallbackConfig> = {
  "jahmere-webb": {
    personId: "jahmere-webb",
    name: "JAHmere Webb",
    role: "witness",
    title: "Transformation Story",
  },
  "tony-dungy": {
    personId: "tony-dungy",
    name: "Tony Dungy",
    role: "lightworker",
    title: "NFL Champion Coach",
  },
  "coach-dungy": {
    personId: "coach-dungy",
    name: "Coach Tony Dungy",
    role: "lightworker",
    title: "Championship Leader",
  },
  "jordan-dungy": {
    personId: "jordan-dungy",
    name: "Jordan Dungy",
    role: "messenger",
    title: "Divine Connection",
  },
  "michael-mataluni": {
    personId: "michael-mataluni",
    name: "Michael Mataluni",
    role: "guardian",
    title: "Bridge Builder",
  },
  "jay-forte": {
    personId: "jay-forte",
    name: "Jay Forte",
    role: "lightworker",
    title: "Greatness Zone Expert",
  },
  "martha-henderson": {
    personId: "martha-henderson",
    name: "Martha Henderson",
    role: "witness",
    title: "Community Leader",
  },
};

/**
 * Get fallback for a specific person by ID
 */
export function getPersonFallback(personId: string): string {
  const config = knownPeopleFallbacks[personId];
  if (!config) {
    // Generic fallback
    return generateProfileFallback({
      personId,
      name: personId
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      role: "default",
    });
  }

  return generateProfileFallback(config);
}

/**
 * Enhanced Image component that automatically handles fallbacks
 */
export interface EnhancedImageProps {
  src: string;
  alt: string;
  personId?: string;
  fallbackConfig?: Partial<ImageFallbackConfig>;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Get the appropriate image source with fallback logic
 */
export function getImageSource(
  src: string,
  personId?: string,
  fallbackConfig?: Partial<ImageFallbackConfig>,
): { src: string; isFallback: boolean } {
  // Check if we have a known person fallback
  if (personId && knownPeopleFallbacks[personId]) {
    const result = getImageWithFallback(src, knownPeopleFallbacks[personId]);
    if (result.isFallback) {
      return result;
    }
  }

  // Use provided config
  if (fallbackConfig?.name) {
    const config: ImageFallbackConfig = {
      personId: personId || "unknown",
      name: fallbackConfig.name,
      role: fallbackConfig.role || "default",
      title: fallbackConfig.title,
    };

    return getImageWithFallback(src, config);
  }

  // Default: assume image exists
  return { src, isFallback: false };
}
