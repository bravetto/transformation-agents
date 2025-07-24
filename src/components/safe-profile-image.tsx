"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SafeProfileImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  containerClassName?: string;
}

/**
 * 🖼️ SAFE PROFILE IMAGE COMPONENT - Production Ready
 * Handles SVG files with .jpg extensions and provides elegant fallbacks
 */
export function SafeProfileImage({
  src,
  alt,
  width = 400,
  height = 400,
  className,
  sizes = "(max-width: 768px) 100vw, 400px",
  priority = false,
  quality = 85,
  fill = false,
  containerClassName,
  ...props
}: SafeProfileImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isSvgFallback, setIsSvgFallback] = useState(false);

  // 🔍 PRODUCTION FIX: Detect SVG files with .jpg extensions
  useEffect(() => {
    // Check if this is actually an SVG file with wrong extension
    const checkIfSvg = async () => {
      try {
        // First check if the file path suggests it's an SVG
        if (
          src.includes(".svg") ||
          src.startsWith("<svg") ||
          src.startsWith("data:image/svg")
        ) {
          setIsSvgFallback(true);
          return;
        }

        // For potential SVG files with wrong extensions, do a lightweight check
        const response = await fetch(src, { method: "HEAD" });
        const contentType = response.headers.get("content-type");

        // If it's actually an SVG but has .jpg extension
        if (contentType?.includes("svg")) {
          setIsSvgFallback(true);
        } else if (
          contentType?.includes("text") ||
          response.headers.get("content-length") === "2048"
        ) {
          // Small file size or text content suggests SVG
          setIsSvgFallback(true);
        }
      } catch {
        // If HEAD request fails, we'll handle it in onError
      }
    };

    if (src && !src.startsWith("data:")) {
      checkIfSvg();
    }
  }, [src]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    console.warn(
      `Image failed to load: ${src}, falling back to SVG placeholder`,
    );

    // Generate initials-based fallback with better styling
    const initials = alt
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

    // Create professional SVG data URL for fallback
    const svgFallback = `data:image/svg+xml,${encodeURIComponent(`
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient-${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#1E40AF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1E3A8A;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow-${initials}">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <rect width="400" height="400" fill="url(#gradient-${initials})" rx="12"/>
        <text x="50%" y="50%" font-family="system-ui, -apple-system, sans-serif" 
              font-size="120" font-weight="700" fill="white" text-anchor="middle" 
              dominant-baseline="middle" filter="url(#shadow-${initials})">${initials}</text>
        <rect width="400" height="400" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="12"/>
      </svg>
    `)}`;

    setCurrentSrc(svgFallback);
    setIsSvgFallback(true);
    setHasError(false);
    setIsLoading(false);
  }, [alt, src]);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Image */}
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          isSvgFallback ? "ring-2 ring-blue-200 ring-opacity-30" : "",
          className,
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Development Indicator */}
      {process.env.NODE_ENV === "development" && isSvgFallback && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-20">
          SVG
        </div>
      )}
    </div>
  );
}

export default SafeProfileImage;
