"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  // JAHmere Webb specific props
  missionCritical?: boolean;
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  loading = "lazy",
  placeholder = "empty",
  blurDataURL,
  onLoad,
  onError,
  missionCritical = false,
  fallbackSrc = "/images/fallbacks/divine-placeholder.jpg",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);

    // Fallback to placeholder for mission-critical images
    if (missionCritical && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      return;
    }

    onError?.();
  }, [onError, missionCritical, currentSrc, fallbackSrc]);

  // Generate blur data URL for better UX
  const generateBlurDataURL = (width: number, height: number): string => {
    if (blurDataURL) return blurDataURL;

    // Create a simple blur placeholder
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Divine theme colors for placeholder
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#f59e0b"); // hope-gold
      gradient.addColorStop(1, "#2563eb"); // courage-blue

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    return canvas.toDataURL();
  };

  // Determine optimal sizes based on usage
  const getOptimalSizes = () => {
    if (missionCritical) {
      return "100vw"; // Load full width for critical images
    }
    return sizes;
  };

  // Common props for all image configurations
  const commonProps = {
    src: currentSrc,
    alt,
    quality,
    loading: priority ? ("eager" as const) : loading,
    placeholder,
    onLoad: handleLoad,
    onError: handleError,
    sizes: getOptimalSizes(),
    className: cn(
      "transition-opacity duration-300",
      isLoading && "opacity-0",
      !isLoading && "opacity-100",
      hasError && "opacity-50",
      className,
    ),
    ...props,
  };

  // Handle fill vs fixed dimensions
  if (fill) {
    return (
      <div className="relative overflow-hidden">
        <Image
          {...commonProps}
          fill
          priority={priority || missionCritical}
          blurDataURL={
            placeholder === "blur" ? generateBlurDataURL(400, 300) : undefined
          }
        />

        {/* Loading state for fill images */}
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-hope-gold/20 to-courage-blue/20" />
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
            <span className="text-xs">Image unavailable</span>
          </div>
        )}
      </div>
    );
  }

  // Fixed dimensions
  if (!width || !height) {
    console.warn("OptimizedImage: width and height required when fill=false");
    return null;
  }

  return (
    <div className="relative">
      <Image
        {...commonProps}
        width={width}
        height={height}
        priority={priority || missionCritical}
        blurDataURL={
          placeholder === "blur"
            ? generateBlurDataURL(width, height)
            : undefined
        }
      />

      {/* Loading state */}
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-hope-gold/20 to-courage-blue/20"
          style={{ width, height }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
          style={{ width, height }}
        >
          <span className="text-xs">Image unavailable</span>
        </div>
      )}
    </div>
  );
}

// Specialized components for common use cases
export function HeroImage({
  src,
  alt,
  priority = true,
  ...props
}: Omit<OptimizedImageProps, "missionCritical">) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      priority={priority}
      missionCritical={true}
      quality={90}
      sizes="100vw"
      placeholder="blur"
      {...props}
    />
  );
}

export function ProfileImage({
  src,
  alt,
  size = 96,
  ...props
}: Omit<OptimizedImageProps, "width" | "height"> & { size?: number }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      quality={95}
      sizes={`${size}px`}
      className="rounded-full"
      placeholder="blur"
      {...props}
    />
  );
}

export function ThumbnailImage({ src, alt, ...props }: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={300}
      height={200}
      quality={80}
      sizes="(max-width: 768px) 50vw, 300px"
      placeholder="blur"
      {...props}
    />
  );
}

export default OptimizedImage;
