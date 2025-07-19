"use client";

import Image from "next/image";

export interface EnhancedPersonHeroProps {
  name: string;
  subtitle: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
  personId?: string;
  localImage?: boolean;
  role?: string;
  cta?: {
    text: string;
    link: string;
  };
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

export default function EnhancedPersonHero({
  name,
  subtitle,
  description,
  imageSrc = "/images/fallbacks/default-fallback.jpg",
  imageAlt,
  className = "",
}: EnhancedPersonHeroProps) {
  return (
    <div className={`relative py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
            <h2 className="text-xl text-gray-600 mb-6">{subtitle}</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
          <div className="relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
