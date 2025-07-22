"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import {
  getImageSource,
  type ImageFallbackConfig,
} from "@/lib/image-fallbacks";

interface EnhancedImageProps
  extends Omit<ImageProps, "src" | "onLoad" | "onError"> {
  src: string;
  alt: string;
  personId?: string;
  fallbackConfig?: Partial<ImageFallbackConfig>;
  showLoadingState?: boolean;
  containerClassName?: string;
}

/**
 * 🖼️ ENHANCED IMAGE COMPONENT
 * Production-ready image component with automatic fallbacks and loading states
 */
export function EnhancedImage({
  src,
  alt,
  personId,
  fallbackConfig,
  showLoadingState = true,
  containerClassName,
  className,
  width,
  height,
  fill,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  quality = 85,
  placeholder = "empty",
  ...props
}: EnhancedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isFallback, setIsFallback] = useState(false);

  // Initialize with proper source and fallback logic
  useEffect(() => {
    const { src: resolvedSrc, isFallback: isUsingFallback } = getImageSource(
      src,
      personId,
      fallbackConfig,
    );

    setCurrentSrc(resolvedSrc);
    setIsFallback(isUsingFallback);
    setIsLoading(true);
    setHasError(false);
  }, [src, personId, fallbackConfig]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    if (!isFallback) {
      // Try to use fallback if we haven't already
      const { src: fallbackSrc } = getImageSource(
        src,
        personId,
        fallbackConfig || { name: alt },
      );

      setCurrentSrc(fallbackSrc);
      setIsFallback(true);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Loading state */}
      {isLoading && showLoadingState && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-10 text-gray-500">
          <svg
            className="w-12 h-12 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm font-medium">Image unavailable</span>
        </div>
      )}

      {/* Main image */}
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          isFallback && "ring-2 ring-blue-200 ring-opacity-50", // Visual indicator for fallback
          className,
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Fallback indicator (optional, for development) */}
      {isFallback && process.env.NODE_ENV === "development" && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-20">
          Fallback
        </div>
      )}
    </div>
  );
}

/**
 * 👤 PROFILE IMAGE COMPONENT
 * Specialized for person profiles with automatic fallbacks
 */
export function ProfileImage({
  personId,
  name,
  src,
  size = "md",
  role,
  className,
  ...props
}: {
  personId?: string;
  name: string;
  src: string;
  size?: "sm" | "md" | "lg" | "xl";
  role?: string;
} & Omit<EnhancedImageProps, "personId" | "fallbackConfig" | "alt">) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  const sizeDimensions = {
    sm: { width: 48, height: 48 },
    md: { width: 80, height: 80 },
    lg: { width: 128, height: 128 },
    xl: { width: 192, height: 192 },
  };

  return (
    <EnhancedImage
      src={src}
      alt={`${name} profile picture`}
      personId={personId}
      fallbackConfig={{
        name,
        role: role as any,
        title: "Profile",
      }}
      width={sizeDimensions[size].width}
      height={sizeDimensions[size].height}
      sizes={`${sizeDimensions[size].width}px`}
      className={cn("rounded-full object-cover", sizeClasses[size], className)}
      containerClassName={cn("rounded-full", sizeClasses[size])}
      priority={size === "xl"} // Prioritize large profile images
      {...props}
    />
  );
}

/**
 * 🖼️ CARD IMAGE COMPONENT
 * For use in cards with consistent aspect ratios
 */
export function CardImage({
  src,
  alt,
  aspectRatio = "video",
  className,
  ...props
}: {
  aspectRatio?: "square" | "video" | "portrait";
} & EnhancedImageProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        aspectClasses[aspectRatio],
      )}
    >
      <EnhancedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn("object-cover", className)}
        {...props}
      />
    </div>
  );
}
