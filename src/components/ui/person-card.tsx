"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PersonRole } from "@/types/person";
import { cn } from "@/lib/utils";
import {
  resolvePersonImage,
  getResponsiveSizes,
  hasPersonImages,
} from "@/lib/image-utils";

export interface PersonCardProps {
  id: string;
  slug: string;
  name: string;
  title: string;
  description?: string;
  imageSrc?: string;
  localImage?: boolean;
  role?: PersonRole;
  size?: "small" | "medium" | "large" | "featured";
  className?: string;
}

// Role-based styling configurations
const roleStyles: Record<
  PersonRole,
  { bg: string; accent: string; text: string }
> = {
  lightworker: {
    bg: "bg-gradient-to-br from-amber-500/80 via-yellow-500/70 to-orange-400/80",
    accent: "border-amber-300",
    text: "text-amber-100",
  },
  messenger: {
    bg: "bg-gradient-to-br from-blue-500/80 via-indigo-500/70 to-violet-500/80",
    accent: "border-blue-300",
    text: "text-blue-100",
  },
  witness: {
    bg: "bg-gradient-to-br from-emerald-500/80 via-teal-500/70 to-green-500/80",
    accent: "border-emerald-300",
    text: "text-emerald-100",
  },
  guardian: {
    bg: "bg-gradient-to-br from-purple-500/80 via-pink-500/70 to-fuchsia-500/80",
    accent: "border-purple-300",
    text: "text-purple-100",
  },
};

// Size-based configuration
const sizeConfig = {
  small: {
    card: "h-72",
    imageContainer: "h-36",
    title: "text-sm",
    name: "text-lg",
    description: "line-clamp-3 text-sm",
  },
  medium: {
    card: "h-80",
    imageContainer: "h-44",
    title: "text-sm",
    name: "text-xl",
    description: "line-clamp-3 text-sm",
  },
  large: {
    card: "h-96",
    imageContainer: "h-52",
    title: "text-base",
    name: "text-2xl",
    description: "line-clamp-4 text-base",
  },
  featured: {
    card: "h-auto md:h-96 md:max-h-[28rem]",
    imageContainer: "h-48 md:h-56",
    title: "text-base md:text-lg",
    name: "text-2xl md:text-3xl",
    description: "line-clamp-4 md:line-clamp-6 text-base md:text-lg",
  },
};

function PersonCard({
  id,
  slug,
  name,
  title,
  description,
  imageSrc,
  localImage = true,
  role = "lightworker",
  size = "medium",
  className,
}: PersonCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Get role-specific styling
  const style = useMemo(() => roleStyles[role], [role]);

  // Get size-specific styling
  const sizeStyle = useMemo(() => sizeConfig[size], [size]);

  // Enhanced image resolution using the new system
  const imageConfig = useMemo(() => {
    // Map card size to image size
    const imageSize =
      size === "small"
        ? "thumbnail"
        : size === "featured"
          ? "display"
          : "display";

    return {
      personId: id,
      size: imageSize as "thumbnail" | "display" | "full",
      fallbackRole: role,
    };
  }, [id, size, role]);

  const resolvedImage = useMemo(
    () => resolvePersonImage(imageConfig),
    [imageConfig],
  );

  // Check if this person has professional images
  const hasProfessionalImages = useMemo(() => hasPersonImages(id), [id]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Handle image error
  const handleImageError = useCallback(() => {
    setHasError(true);
    // Still mark as loaded to show fallback content
    setIsLoaded(true);
  }, []);

  return (
    <Link href={`/people/${slug}`} passHref>
      <motion.article
        className={cn(
          "flex flex-col overflow-hidden rounded-2xl shadow-lg transition-shadow",
          "hover:shadow-xl focus-within:shadow-xl",
          "backdrop-blur-sm bg-black/20",
          style.bg,
          sizeStyle.card,
          "border-2 border-transparent",
          style.accent,
          className,
        )}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image Container */}
        <div
          className={cn(
            "relative w-full overflow-hidden",
            sizeStyle.imageContainer,
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gray-800/20 backdrop-blur-[2px] transition-opacity duration-700",
              isLoaded ? "opacity-0" : "opacity-100",
            )}
          />

          <Image
            src={resolvedImage.src}
            alt={resolvedImage.alt}
            width={resolvedImage.width}
            height={resolvedImage.height}
            sizes={getResponsiveSizes(imageConfig.size)}
            className={cn(
              "object-cover transition-all duration-700",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            quality={imageConfig.size === "thumbnail" ? 85 : 90}
            placeholder={resolvedImage.blurDataURL ? "blur" : "empty"}
            blurDataURL={resolvedImage.blurDataURL}
          />

          {/* Professional Image Indicator */}
          {hasProfessionalImages && (
            <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-green-500/80 backdrop-blur-md rounded-full text-white">
              ✨ Pro
            </div>
          )}

          {/* Role indicator */}
          <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-medium bg-black/30 backdrop-blur-md rounded-full">
            {role}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4 md:p-6">
          <div
            className={cn("text-white/80 font-medium mb-1", sizeStyle.title)}
          >
            {title}
          </div>

          <h3
            className={cn(
              "font-bold text-white mb-2 leading-tight",
              sizeStyle.name,
            )}
          >
            {name}
          </h3>

          {description && (
            <p
              className={cn(
                "text-white/70 leading-relaxed flex-grow",
                sizeStyle.description,
              )}
            >
              {description}
            </p>
          )}

          {/* Professional Images Status */}
          <div className="mt-3 flex items-center justify-between text-xs text-white/60">
            <span>
              {hasProfessionalImages
                ? "Professional Photo"
                : "Generated Avatar"}
            </span>
            <span className="capitalize">{role}</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(PersonCard);
