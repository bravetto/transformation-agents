/**
 * Enhanced Image Utility System
 *
 * Provides intelligent image path resolution with:
 * - Professional image support (WebP/AVIF/JPG)
 * - Responsive sizing (full/display/thumbnail)
 * - Intelligent fallbacks
 * - Next.js Image optimization
 */

import {
  getPersonImageData,
  PersonImageData,
  staticBlurPlaceholders,
} from "@/data/person-images";
import { PersonRole } from "@/types/person";

export type ImageSize = "thumbnail" | "display" | "full";
export type ImageFormat = "webp" | "jpg" | "auto";

export interface ImageConfig {
  personId: string;
  size: ImageSize;
  format?: ImageFormat;
  fallbackRole?: PersonRole;
}

export interface ResolvedImage {
  src: string;
  fallbackSrc?: string;
  blurDataURL?: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * Size configurations for responsive images
 */
const sizeConfigs = {
  thumbnail: { width: 150, height: 200, quality: 85 },
  display: { width: 300, height: 400, quality: 90 },
  full: { width: 600, height: 800, quality: 95 },
} as const;

/**
 * Role-based fallback images when professional photos aren't available
 */
const roleFallbacks: Record<PersonRole, string> = {
  lightworker: "/images/fallbacks/lightworker-fallback.jpg",
  messenger: "/images/fallbacks/messenger-fallback.jpg",
  witness: "/images/fallbacks/witness-fallback.jpg",
  guardian: "/images/fallbacks/guardian-fallback.jpg",
};

/**
 * Enhanced image resolution with professional photo support
 */
export function resolvePersonImage(config: ImageConfig): ResolvedImage {
  const {
    personId,
    size,
    format = "auto",
    fallbackRole = "lightworker",
  } = config;
  const sizeConfig = sizeConfigs[size];

  // Try to get professional image data
  const imageData = getPersonImageData(personId, fallbackRole);

  if (imageData) {
    // Use professional images
    const src = getImageSrcByFormat(imageData, size, format);
    const fallbackSrc = getImageSrcByFormat(imageData, size, "jpg");

    return {
      src,
      fallbackSrc: src !== fallbackSrc ? fallbackSrc : undefined,
      blurDataURL:
        imageData.blurDataURL || staticBlurPlaceholders[fallbackRole],
      width: sizeConfig.width,
      height: sizeConfig.height,
      alt: `${personId.replace("-", " ")} professional photo`,
    };
  }

  // Fallback to role-based generic image
  const fallbackSrc = roleFallbacks[fallbackRole];

  return {
    src: fallbackSrc,
    blurDataURL: staticBlurPlaceholders[fallbackRole],
    width: sizeConfig.width,
    height: sizeConfig.height,
    alt: `${personId.replace("-", " ")} profile image`,
  };
}

/**
 * Get image source by format and size
 */
function getImageSrcByFormat(
  imageData: PersonImageData,
  size: ImageSize,
  format: ImageFormat,
): string {
  if (format === "jpg") {
    return imageData[`${size}Jpg` as keyof PersonImageData] as string;
  }

  if (format === "webp") {
    return imageData[size];
  }

  // Auto format - prefer WebP, fallback to JPG
  return imageData[size];
}

/**
 * Generate responsive sizes string for Next.js Image
 */
export function getResponsiveSizes(size: ImageSize): string {
  switch (size) {
    case "thumbnail":
      return "(max-width: 640px) 150px, (max-width: 1024px) 150px, 150px";
    case "display":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px";
    case "full":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px";
    default:
      return "100vw";
  }
}

/**
 * Check if person has professional images available
 */
export function hasPersonImages(personId: string): boolean {
  return getPersonImageData(personId) !== undefined;
}

/**
 * Get all available people with professional images
 */
export function getPeopleWithImages(): string[] {
  // These are the people who have professional images in the system
  return [
    "michael-mataluni",
    "jahmere-webb",
    "jordan-dungy",
    "coach-dungy",
    "jay-forte",
    "martha-henderson",
  ];
}

/**
 * Next.js Image component optimized props
 */
export function getImageProps(config: ImageConfig) {
  const resolved = resolvePersonImage(config);
  const sizes = getResponsiveSizes(config.size);
  const quality = sizeConfigs[config.size].quality;

  return {
    src: resolved.src,
    alt: resolved.alt,
    width: resolved.width,
    height: resolved.height,
    sizes,
    quality,
    placeholder: resolved.blurDataURL ? ("blur" as const) : undefined,
    blurDataURL: resolved.blurDataURL,
    className: "object-cover",
    loading: "lazy" as const,
  };
}

/**
 * Enhanced image component props with modern format support
 */
export interface EnhancedImageProps {
  personId: string;
  size: ImageSize;
  alt?: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackRole?: PersonRole;
}
