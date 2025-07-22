"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SafeProfileImageProps {
  src: string;
  alt: string;
  name: string;
  role?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

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

/**
 * 🏆 PRODUCTION-READY PROFILE IMAGE COMPONENT
 * Handles SVG fallbacks elegantly with zero 404 errors or console noise
 */
export function SafeProfileImage({
  src,
  alt,
  name,
  role = "Champion",
  size = "md",
  className,
  priority = false,
}: SafeProfileImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSvgFallback, setIsSvgFallback] = useState(false);

  // Check if source is SVG (our fallback system)
  useEffect(() => {
    setIsSvgFallback(src.includes(".svg") || src.startsWith("<svg"));
  }, [src]);

  // Generate initials for text overlay
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  // For SVG fallbacks, show them directly without Next/Image
  if (isSvgFallback) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-white/20",
          sizeClasses[size],
          className,
        )}
      >
        <div
          className="w-full h-full"
          dangerouslySetInnerHTML={{
            __html: src.startsWith("<svg") ? src : "",
          }}
        />
        {/* Professional overlay for SVG fallbacks */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600/90 to-purple-600/90 rounded-full">
          <div className="text-center text-white">
            <div className="font-bold text-lg">{initials}</div>
            <div className="text-xs opacity-75">{role}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full",
        sizeClasses[size],
        className,
      )}
    >
      {/* Loading state */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-full flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state with professional fallback */}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
          <div className="text-center">
            <div className="font-bold text-lg">{initials}</div>
            <div className="text-xs opacity-75">{role}</div>
          </div>
        </div>
      )}

      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${sizeDimensions[size].width}px`}
        priority={priority}
        className={cn(
          "object-cover transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {/* Professional border overlay */}
      <div className="absolute inset-0 rounded-full border-2 border-white/30 shadow-lg" />
    </div>
  );
}
