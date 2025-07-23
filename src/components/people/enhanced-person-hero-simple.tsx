"use client";

import Image from "next/image";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import {
  resolvePersonImage,
  getResponsiveSizes,
  hasPersonImages,
} from "@/lib/image-utils";
import { PersonRole } from "@/types/person";
import { useMemo } from "react";

export interface EnhancedPersonHeroProps {
  name: string;
  subtitle: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
  personId?: string;
  localImage?: boolean;
  role?: PersonRole;
  cta?: {
    text: string;
    link: string;
  };
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

function EnhancedPersonHero({
  name,
  subtitle,
  description,
  imageSrc = "/images/fallbacks/default-fallback.jpg",
  imageAlt,
  personId,
  role = "lightworker",
  className = "",
}: EnhancedPersonHeroProps) {
  // Enhanced image resolution using the new system
  const resolvedImage = useMemo(() => {
    if (personId) {
      return resolvePersonImage({
        personId,
        size: "full", // Use full size for hero images
        fallbackRole: role,
      });
    }

    // Fallback for cases without personId
    return {
      src: imageSrc,
      alt: imageAlt,
      width: 600,
      height: 800,
    };
  }, [personId, role, imageSrc, imageAlt]);

  // Check if this person has professional images
  const hasProfessionalImages = useMemo(
    () => (personId ? hasPersonImages(personId) : false),
    [personId],
  );

  return (
    <div className={`relative py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
            <h2 className="text-xl text-gray-600 mb-6">{subtitle}</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>

            {/* Professional Image Status Indicator */}
            {personId && (
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {hasProfessionalImages ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Professional Photo
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Generated Avatar
                  </>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={resolvedImage.src}
                alt={resolvedImage.alt || imageAlt}
                width={resolvedImage.width || 400}
                height={resolvedImage.height || 400}
                sizes={
                  personId
                    ? getResponsiveSizes("full")
                    : "(max-width: 768px) 100vw, 400px"
                }
                className="object-cover w-full h-full"
                quality={95}
                priority={true} // Hero images should load with priority
                placeholder={resolvedImage.blurDataURL ? "blur" : "empty"}
                blurDataURL={resolvedImage.blurDataURL}
              />

              {/* Professional Image Badge */}
              {hasProfessionalImages && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-green-500/90 backdrop-blur-md rounded-full text-white text-sm font-medium">
                  ✨ Professional Photo
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withDivineErrorBoundary(EnhancedPersonHero, {
  componentName: "EnhancedPersonHero",
  role: "messenger",
});
