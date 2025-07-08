"use client";
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PersonRole } from "@/types/person";
import { cn } from "@/lib/utils";

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
    card: "h-60",
    imageContainer: "h-32",
    title: "text-sm",
    name: "text-lg",
    description: "line-clamp-2 text-xs",
  },
  medium: {
    card: "h-80",
    imageContainer: "h-40",
    title: "text-sm",
    name: "text-xl",
    description: "line-clamp-3 text-sm",
  },
  large: {
    card: "h-96",
    imageContainer: "h-48",
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

  // Generate the appropriate image path
  const getImagePath = useCallback(() => {
    if (!imageSrc) {
      // Fallback to role-specific default image
      return `/images/fallbacks/${role}-fallback.jpg`;
    }

    if (!localImage) {
      // External image
      return imageSrc;
    }

    // Local image - handle both relative and absolute paths
    if (imageSrc.startsWith("/")) {
      return imageSrc;
    }

    return `/images/people/thumbnails/${imageSrc}`;
  }, [imageSrc, localImage, role]);

  // Memoize the image path to prevent recalculation
  const imagePath = useMemo(() => getImagePath(), [getImagePath]);

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
            src={imagePath}
            alt={name}
            fill
            sizes={
              size === "featured"
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className={cn(
              "object-cover transition-all duration-700",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            quality={80}
          />

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

          <h3 className={cn("font-bold text-white mb-2", sizeStyle.name)}>
            {name}
          </h3>

          {description && (
            <p className={cn("text-white/90 mt-auto", sizeStyle.description)}>
              {description}
            </p>
          )}

          <div className="mt-auto pt-3">
            <span className="inline-flex items-center text-sm font-medium text-white/90">
              View Profile
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(PersonCard);
