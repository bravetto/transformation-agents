"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { DivineRole } from "@/components/ui/divine-error-boundary";
import assetManager, { AssetType } from "@/lib/asset-manager";
import { cn } from "@/lib/utils";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

export interface DivineImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  assetType?: AssetType;
  role?: DivineRole;
  name?: string;
  useSvgFallback?: boolean;
  showLoadingState?: boolean;
  blurDataURL?: string;
  containerClassName?: string;
}

function DivineImageComponent({
  src,
  assetType = "image",
  role = "lightworker",
  name = "",
  useSvgFallback = true,
  showLoadingState = true,
  blurDataURL,
  alt,
  width,
  height,
  fill,
  sizes,
  quality,
  priority,
  loading,
  placeholder,
  className,
  containerClassName,
  style,
  ...props
}: DivineImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string>(src);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Reset state when src changes
    setIsLoading(true);
    setError(false);

    const resolveAsset = async () => {
      try {
        const result = await assetManager.getAssetUrl(
          src,
          assetType,
          name,
          role,
          useSvgFallback,
        );

        if (result !== src) {
          setIsFallback(true);
        }

        setResolvedSrc(result);
        setIsLoading(false);
      } catch (err) {
        console.error(`Error resolving asset: ${src}`, err);
        setError(true);
        setIsLoading(false);

        // Set fallback on error
        const fallback = useSvgFallback
          ? assetManager.generateSvgFallback(assetType, name, role)
          : assetManager.generateFallbackUrl(src, assetType, name, role);

        setResolvedSrc(fallback);
        setIsFallback(true);
      }
    };

    resolveAsset();
  }, [src, assetType, name, role, useSvgFallback]);

  // Determine if we should use blur placeholder
  const shouldUseBlur = Boolean(
    placeholder === "blur" || (isFallback && !resolvedSrc.startsWith("data:")),
  );

  // Handle image loading error
  const handleError = () => {
    if (!isFallback) {
      // Only try to get fallback if we haven't already
      setError(true);
      setIsLoading(false);

      const fallback = useSvgFallback
        ? assetManager.generateSvgFallback(assetType, name, role)
        : assetManager.generateFallbackUrl(src, assetType, name, role);

      setResolvedSrc(fallback);
      setIsFallback(true);
    }
  };

  // Handle image load completion
  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  // Calculate blur data URL based on role if needed
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;

    if (isFallback || error) {
      // Create a simple color blur placeholder based on role
      const roleColors: Record<DivineRole, string> = {
        lightworker: "#F59E0B",
        messenger: "#3B82F6",
        witness: "#10B981",
        guardian: "#8B5CF6",
        default: "#F59E0B",
      };
      const primaryColor = roleColors[role] || roleColors.default;
      return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='100%25' height='100%25' fill='${primaryColor.replace("#", "%23")}'/%3E%3C/svg%3E`;
    }

    return undefined;
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Loading overlay */}
      {isLoading && showLoadingState && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center z-10",
            `bg-${role}-50 bg-opacity-20`, // Tailwind class for role-based background
          )}
        >
          <motion.div
            animate={{
              rotate: 360,
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 1.5, ease: "linear" },
              opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className={cn(
              "w-8 h-8 rounded-full border-2 border-transparent",
              `border-t-${role}-500 border-r-${role}-500`, // Tailwind class for role-based border
            )}
          />
        </div>
      )}

      {/* Actual image */}
      <Image
        src={resolvedSrc}
        alt={alt || name || "Image"}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={loading}
        placeholder={shouldUseBlur ? "blur" : undefined}
        blurDataURL={getBlurDataURL()}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          isFallback ? "divine-fallback" : "",
          className,
        )}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Error state */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 bg-opacity-20">
          <span className="text-red-500 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

// Export with divine error boundary
export default withDivineErrorBoundary(DivineImageComponent, {
  componentName: "DivineImageComponent",
  role: "lightworker",
});
