"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";
import { getPersonImageData } from "@/data/person-images";

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

function EnhancedPersonHero({
  name,
  subtitle,
  description,
  imageSrc = "/images/fallbacks/default-fallback.jpg",
  imageAlt,
  personId,
  localImage = false,
  role = "default",
  cta,
  variant = "primary",
  className,
}: EnhancedPersonHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Update scroll position for parallax effect - only if needed
  useEffect(() => {
    setIsMounted(true);

    // Skip scroll listener for better performance
    if (variant === "primary") {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [variant]);

  // Determine background styles based on variant
  const bgStyles = {
    primary: "from-courage-blue to-courage-blue/80 text-white",
    secondary: "from-hope-gold to-hope-gold/80 text-gentle-charcoal",
    tertiary: "from-growth-green to-growth-green/80 text-white",
  };

  const currentBg = bgStyles[variant];

  // Check for local image
  const personImageData =
    localImage && personId ? getPersonImageData(personId, role) : undefined;
  const imageSource = personImageData ? personImageData.full : imageSrc;

  // Simplified animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.1,
      },
    },
  };

  // Generate name initials for background effect
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 md:py-28 lg:py-32 w-full",
        className,
      )}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${currentBg} z-0`} />

      {/* Simplified floating orbs background effect - only for primary variant */}
      {isMounted && variant === "primary" && (
        <>
          <div
            className="absolute opacity-20 blur-2xl rounded-full w-64 h-64 bg-white/10 z-0"
            style={{
              top: "10%",
              left: "5%",
              transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.01}px)`,
            }}
          />
          <div
            className="absolute opacity-20 blur-2xl rounded-full w-48 h-48 bg-white/10 z-0"
            style={{
              bottom: "15%",
              right: "10%",
              transform: `translate(${scrollY * -0.02}px, ${scrollY * 0.01}px)`,
            }}
          />
        </>
      )}

      {/* Giant initials background effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[40rem] font-bold text-white/5 select-none pointer-events-none z-0">
        {initials}
      </div>

      {/* Content container */}
      <div className="container-wide relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div className="order-2 lg:order-1 max-w-2xl">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
                {name}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-xl md:text-2xl mb-6 opacity-90">{subtitle}</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mb-8 text-lg leading-relaxed opacity-80">
                <p>{description}</p>
              </div>
            </motion.div>

            {cta && (
              <motion.div variants={itemVariants}>
                <Button
                  variant={variant === "primary" ? "secondary" : "primary"}
                  size="lg"
                  asChild
                >
                  <a href={cta.link}>{cta.text}</a>
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Image with glow effect */}
          <motion.div
            variants={imageVariants}
            className="order-1 lg:order-2 flex justify-center relative"
          >
            <div className="relative h-80 w-80 md:h-96 md:w-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-white/30 rounded-full blur-xl z-0" />

              {/* Person image */}
              <div className="relative h-full w-full rounded-full overflow-hidden z-10">
                <Image
                  src={imageSource}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 320px, 384px"
                  style={{ objectFit: "cover" }}
                  priority
                  className="z-10"
                  placeholder={personImageData?.blurDataURL ? "blur" : "empty"}
                  blurDataURL={personImageData?.blurDataURL}
                />
              </div>

              {/* Circular border with gradient */}
              <div className="absolute inset-0 rounded-full border-4 border-white/40 z-20" />
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-white/10 backdrop-blur-md -bottom-6 -left-6 z-20"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-12 h-12 rounded-full bg-white/10 backdrop-blur-md top-10 -right-4 z-20"
              animate={{
                y: [0, 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3.5,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default withDivineErrorBoundary(EnhancedPersonHero, {
  componentName: "EnhancedPersonHero",
  role: "guardian",
});
