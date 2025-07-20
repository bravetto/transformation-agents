"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Import the optimization manifest
import optimizationManifest from "../../../public/images/optimized/optimization-manifest.json";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  // Progressive enhancement options
  enableResponsive?: boolean;
  enableBlurPlaceholder?: boolean;
  fallbackToOriginal?: boolean;
}

/**
 * 🚀 OPTIMIZED IMAGE COMPONENT
 * Automatically uses WebP/AVIF formats with responsive variants and blur placeholders
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw",
  priority = false,
  quality = 85,
  placeholder = "blur",
  fill = false,
  style,
  onLoad,
  onError,
  enableResponsive = true,
  enableBlurPlaceholder = true,
  fallbackToOriginal = true,
  ...props
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Get optimization data for this image
  const getOptimizedImageData = () => {
    // Remove leading slash and public/ prefix if present
    const normalizedSrc = src.replace(/^\/?(public\/)?/, "");
    const imageData = (optimizationManifest.files as Record<string, any>)[
      normalizedSrc
    ];

    if (!imageData && fallbackToOriginal) {
      // Return original image data structure
      return {
        optimized: { webp: src, avif: src, original: src },
        variants: {},
        blurPlaceholder: null,
        metadata: null,
      };
    }

    return imageData;
  };

  const imageData = getOptimizedImageData();

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!imageData || !enableResponsive || !imageData.variants) {
      return undefined;
    }

    const srcSetEntries = [];

    // Add responsive variants
    Object.entries(imageData.variants).forEach(
      ([size, variant]: [string, any]) => {
        if (variant.webp) {
          srcSetEntries.push(`${variant.webp} ${variant.width}w`);
        }
      },
    );

    // Add original optimized version as fallback
    if (imageData.optimized?.webp) {
      const originalWidth = imageData.metadata?.width || width || 1200;
      srcSetEntries.push(`${imageData.optimized.webp} ${originalWidth}w`);
    }

    return srcSetEntries.length > 0 ? srcSetEntries.join(", ") : undefined;
  };

  // Get the best image source based on browser support
  const getOptimizedSrc = () => {
    if (!imageData) return src;

    // Prefer AVIF (most efficient), fallback to WebP, then original
    return (
      imageData.optimized?.avif ||
      imageData.optimized?.webp ||
      imageData.optimized?.original ||
      src
    );
  };

  // Get blur placeholder
  const getBlurDataURL = () => {
    if (!enableBlurPlaceholder || !imageData?.blurPlaceholder) {
      return undefined;
    }
    return imageData.blurPlaceholder;
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
    onError?.();
  };

  // Progressive enhancement with intersection observer
  useEffect(() => {
    if (!imgRef.current || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Image is in viewport, trigger loading
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const optimizedSrc = getOptimizedSrc();
  const srcSet = generateSrcSet();
  const blurDataURL = getBlurDataURL();

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      {/* Background blur placeholder for progressive loading */}
      {enableBlurPlaceholder && blurDataURL && !imageLoaded && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px)",
            transform: "scale(1.1)", // Prevent edge artifacts
          }}
        />
      )}

      {/* Main optimized image */}
      <Image
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder === "blur" && blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className={cn(
          "transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0",
          "relative z-10",
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />

      {/* Error fallback */}
      {imageError && fallbackToOriginal && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm z-20">
          <div className="text-center">
            <div className="mb-2">🖼️</div>
            <div>Image unavailable</div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20">
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 🎯 HERO IMAGE COMPONENT
 * Specialized for large hero images with maximum optimization
 */
export function OptimizedHeroImage({
  src,
  alt,
  className,
  children,
  ...props
}: OptimizedImageProps & { children?: React.ReactNode }) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        enableResponsive={true}
        enableBlurPlaceholder={true}
        className="object-cover"
        {...props}
      />

      {/* Overlay content */}
      {children && <div className="absolute inset-0 z-30">{children}</div>}
    </div>
  );
}

/**
 * 🖼️ AVATAR IMAGE COMPONENT
 * Optimized for profile pictures and avatars
 */
export function OptimizedAvatar({
  src,
  alt,
  size = "md",
  className,
  ...props
}: OptimizedImageProps & {
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const sizeDimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 },
  };

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={sizeDimensions[size].width}
      height={sizeDimensions[size].height}
      className={cn("rounded-full object-cover", sizeClasses[size], className)}
      sizes={`${sizeDimensions[size].width}px`}
      enableResponsive={false} // Avatars don't need responsive variants
      enableBlurPlaceholder={true}
      {...props}
    />
  );
}

/**
 * 📱 RESPONSIVE CARD IMAGE
 * Optimized for card layouts with aspect ratio preservation
 */
export function OptimizedCardImage({
  src,
  alt,
  aspectRatio = "video", // 16:9
  className,
  ...props
}: OptimizedImageProps & {
  aspectRatio?: "square" | "video" | "portrait";
}) {
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        aspectRatioClasses[aspectRatio],
        className,
      )}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        enableResponsive={true}
        enableBlurPlaceholder={true}
        {...props}
      />
    </div>
  );
}

/**
 * 📊 PERFORMANCE STATS COMPONENT
 * Shows optimization statistics for development
 */
export function ImageOptimizationStats({ className }: { className?: string }) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const stats = {
    totalFiles: optimizationManifest.totalFiles,
    totalSavings: optimizationManifest.totalSavings,
    generatedAt: optimizationManifest.generatedAt,
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs",
        className,
      )}
    >
      <div className="font-semibold mb-1">🚀 Image Optimization</div>
      <div>Files: {stats.totalFiles}</div>
      <div>Saved: {stats.totalSavings.percentage}%</div>
      <div>Generated: {new Date(stats.generatedAt).toLocaleDateString()}</div>
    </div>
  );
}

export default OptimizedImage;
