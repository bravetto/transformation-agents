"use client";

import { DivineRole } from "@/lib/design-system";
import { getRoleColors } from "@/lib/design-system";

/**
 * Asset type for better type safety
 */
export type AssetType = "image" | "signature" | "video-thumbnail" | "profile";

/**
 * Cache for asset existence checks to avoid repeated fetches
 */
interface AssetCache {
  [key: string]: {
    exists: boolean;
    lastChecked: number;
    fallbackGenerated?: boolean;
  };
}

// Initialize asset cache
const assetCache: AssetCache = {};

// Cache expiration time - 1 hour
const CACHE_EXPIRATION = 60 * 60 * 1000;

/**
 * Check if an asset exists by sending a HEAD request
 * @param assetPath Path to the asset to check
 * @returns Promise that resolves to true if asset exists, false otherwise
 */
export const checkAssetExists = async (assetPath: string): Promise<boolean> => {
  // Clean up the path to make sure it starts with a slash
  const cleanPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;

  // Check cache first
  const cachedResult = assetCache[cleanPath];
  if (
    cachedResult &&
    Date.now() - cachedResult.lastChecked < CACHE_EXPIRATION
  ) {
    return cachedResult.exists;
  }

  try {
    // Make HEAD request to check if asset exists
    const response = await fetch(cleanPath, { method: "HEAD" });
    const exists = response.ok;

    // Update cache
    assetCache[cleanPath] = {
      exists,
      lastChecked: Date.now(),
    };

    return exists;
  } catch (error) {
    console.error(`Error checking if asset exists: ${cleanPath}`, error);

    // Cache the failure to avoid repeated requests
    assetCache[cleanPath] = {
      exists: false,
      lastChecked: Date.now(),
    };

    return false;
  }
};

/**
 * Get initials from a name for fallback generation
 * @param name Full name to extract initials from
 * @returns Initials (max 2 characters)
 */
export const getInitials = (name: string): string => {
  if (!name) return "?";

  const parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generate a fallback image URL for the specified asset
 * @param assetPath Original asset path
 * @param assetType Type of asset needing fallback
 * @param name Optional name for personalized fallbacks
 * @param role Optional role for themed fallbacks
 * @returns URL to the fallback image
 */
export const generateFallbackUrl = (
  assetPath: string,
  assetType: AssetType,
  name = "",
  role: DivineRole = "lightworker",
): string => {
  // Extract just the filename without path
  const filename = assetPath.split("/").pop() || "unknown";

  // Handle each asset type differently
  switch (assetType) {
    case "signature":
      // Return the appropriate fallback signature image
      return `/images/fallbacks/signature-fallback.svg`;

    case "video-thumbnail":
      // Return the appropriate video thumbnail fallback
      return `/images/fallbacks/video-thumbnail-fallback.svg`;

    case "profile":
      // Try to use existing profile fallbacks
      const roleMap: Record<DivineRole, string> = {
        lightworker: "lightworker-fallback.jpg",
        messenger: "messenger-fallback.jpg",
        witness: "witness-fallback.jpg",
        guardian: "guardian-fallback.jpg",
        default: "default-fallback.jpg",
      };
      return `/images/fallbacks/${roleMap[role]}`;

    default:
      // General image fallback
      return `/images/fallbacks/default-fallback.jpg`;
  }
};

/**
 * Generate a data URL for a simple SVG fallback
 * @param assetType Type of asset needing fallback
 * @param name Optional name for personalized fallbacks
 * @param role Optional role for themed fallbacks
 * @returns Data URL containing SVG
 */
export const generateSvgFallback = (
  assetType: AssetType,
  name = "",
  role: DivineRole = "lightworker",
): string => {
  // Get role colors from the design system
  const roleColors = getRoleColors(role);
  const { primary: primaryColor, secondary: secondaryColor } = roleColors;
  const textColor = "#FFFFFF"; // White text for good contrast on any color

  const initials = getInitials(name);

  // Handle each asset type differently
  switch (assetType) {
    case "signature":
      // Create an elegant signature SVG
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="300" height="100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${primaryColor}" />
              <stop offset="100%" stop-color="${secondaryColor}" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="transparent" />
          <text x="50%" y="60%" font-family="cursive, serif" font-size="28" 
                fill="url(#grad)" text-anchor="middle" font-style="italic">
            ${name || "Signature"}
          </text>
        </svg>
      `)}`;

    case "video-thumbnail":
      // Create a video thumbnail with play button
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="600" height="338" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${primaryColor}" />
              <stop offset="100%" stop-color="${secondaryColor}" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
          <circle cx="300" cy="169" r="50" fill="${textColor}" fill-opacity="0.8" />
          <polygon points="285,145 285,193 325,169" fill="url(#grad)" />
          <text x="300" y="260" font-family="Arial, sans-serif" font-size="16" 
                fill="${textColor}" text-anchor="middle">
            ${name || "Video Preview"}
          </text>
        </svg>
      `)}`;

    case "profile":
      // Create an avatar with initials
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${primaryColor}" />
              <stop offset="100%" stop-color="${secondaryColor}" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
          <text x="50%" y="50%" dy=".1em" font-family="Arial, sans-serif" font-size="160" 
                fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
            ${initials}
          </text>
        </svg>
      `)}`;

    default:
      // Default image fallback
      return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${primaryColor}" />
              <stop offset="100%" stop-color="${secondaryColor}" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" 
                fill="${textColor}" text-anchor="middle">
            Image Unavailable
          </text>
        </svg>
      `)}`;
  }
};

/**
 * Get the appropriate asset URL, falling back to a fallback if needed
 * @param assetPath Original asset path
 * @param assetType Type of asset
 * @param name Optional name for personalized fallbacks
 * @param role Optional role for themed fallbacks
 * @param useSvgFallback Whether to use SVG fallbacks (true) or image fallbacks (false)
 * @returns Promise resolving to the asset URL (original or fallback)
 */
export const getAssetUrl = async (
  assetPath: string,
  assetType: AssetType,
  name = "",
  role: DivineRole = "lightworker",
  useSvgFallback = true,
): Promise<string> => {
  // Clean up the path
  const cleanPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;

  try {
    // Check if asset exists
    const exists = await checkAssetExists(cleanPath);

    if (exists) {
      return cleanPath;
    }

    // Asset doesn't exist, use fallback
    if (useSvgFallback) {
      return generateSvgFallback(assetType, name, role);
    } else {
      return generateFallbackUrl(cleanPath, assetType, name, role);
    }
  } catch (error) {
    console.error(`Error getting asset URL: ${cleanPath}`, error);

    // Return fallback on error
    if (useSvgFallback) {
      return generateSvgFallback(assetType, name, role);
    } else {
      return generateFallbackUrl(cleanPath, assetType, name, role);
    }
  }
};

/**
 * Main asset manager API
 */
const assetManager = {
  checkAssetExists,
  getAssetUrl,
  generateSvgFallback,
  generateFallbackUrl,
  getInitials,
};

export default assetManager;
