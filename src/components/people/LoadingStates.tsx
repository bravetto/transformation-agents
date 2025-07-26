"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { PersonRole } from "@/types/person";

interface PersonCardSkeletonProps {
  size?: "small" | "medium" | "large" | "featured";
  className?: string;
  index?: number;
}

/**
 * Ethereal Particles Background Component
 */
const EtherealParticlesComponent = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  if (prefersReducedMotion) return null;

  // Create an array of particle configs
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 1 + Math.random() * 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 3 + Math.random() * 7,
    delay: Math.random() * 5,
  }));

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className,
      )}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-40 animate-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
};

/**
 * PersonCardSkeleton component
 * Displays a beautiful loading skeleton for a person card
 */
export function PersonCardSkeleton({
  size = "medium",
  className,
  index = 0,
}: PersonCardSkeletonProps) {
  // Define size-specific styles matching the actual PersonCard
  const sizeStyles = {
    small: {
      container: "h-60",
      content: "p-4",
    },
    medium: {
      container: "h-80",
      content: "p-5",
    },
    large: {
      container: "h-96",
      content: "p-6",
    },
    featured: {
      container: "h-96 md:h-[32rem] col-span-2",
      content: "p-6 md:p-8",
    },
  };

  // Determine delay based on index for staggered animation
  const delay = 0.1 + index * 0.05;

  // Role-based colors for loading skeletons (rotate through roles)
  const roles = ["lightworker", "messenger", "witness", "guardian"];
  const roleIndex = index % roles.length;
  const role = roles[roleIndex];

  // Role-based gradient classes
  const roleGradients = {
    lightworker: "from-amber-600/30 to-orange-500/30",
    messenger: "from-blue-600/30 to-sky-500/30",
    witness: "from-emerald-600/30 to-teal-500/30",
    guardian: "from-amber-600/30 to-orange-500/30",
  };

  // Role-based shimmer classes
  const roleShimmer = {
    lightworker: "shimmer-lightworker",
    messenger: "shimmer-messenger",
    witness: "shimmer-witness",
    guardian: "shimmer-guardian",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative overflow-hidden rounded-xl glass",
        "backdrop-blur-md border border-white/10 shadow-md",
        sizeStyles[size].container,
        className,
      )}
    >
      <EtherealParticlesComponent />

      {/* Glass overlay with gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-40",
          roleGradients[role as keyof typeof roleGradients],
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent opacity-50" />

      {/* Sacred geometry pattern for enhanced visual */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
      >
        <g fill="white">
          <circle cx="100" cy="100" r="20" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = 100 + Math.cos((angle * Math.PI) / 180) * 40;
            const y = 100 + Math.sin((angle * Math.PI) / 180) * 40;
            return <circle key={`ring1-${i}`} cx={x} cy={y} r="20" />;
          })}
        </g>
      </svg>

      {/* Content skeleton */}
      <div className={cn("relative h-full flex flex-col justify-end z-10")}>
        <div
          className={cn(
            "backdrop-blur-sm bg-black/20 rounded-b-xl space-y-4",
            sizeStyles[size].content,
          )}
        >
          {/* Name skeleton */}
          <div
            className={cn(
              "h-7 w-3/5 rounded-md",
              roleShimmer[role as keyof typeof roleShimmer],
            )}
          />

          {/* Subtitle skeleton */}
          <div
            className={cn(
              "h-5 w-4/5 rounded-md",
              roleShimmer[role as keyof typeof roleShimmer],
              "opacity-80",
            )}
          />

          {/* Description skeleton */}
          <div className="space-y-2">
            <div
              className={cn(
                "h-4 w-full rounded-md",
                roleShimmer[role as keyof typeof roleShimmer],
                "opacity-60",
              )}
            />
            <div
              className={cn(
                "h-4 w-11/12 rounded-md",
                roleShimmer[role as keyof typeof roleShimmer],
                "opacity-60",
              )}
            />
            <div
              className={cn(
                "h-4 w-4/5 rounded-md",
                roleShimmer[role as keyof typeof roleShimmer],
                "opacity-60",
              )}
            />
          </div>

          {/* Read more skeleton */}
          <div
            className={cn(
              "h-5 w-28 rounded-md",
              roleShimmer[role as keyof typeof roleShimmer],
              "opacity-70",
              "mt-4",
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * GridLoadingSkeleton component
 * Displays a grid of PersonCardSkeletons
 */
function GridLoadingSkeletonComponent({
  count = 6,
  showFeatured = true,
  className,
}: {
  count?: number;
  showFeatured?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <PersonCardSkeleton
          key={index}
          size={showFeatured && index === 0 ? "featured" : "medium"}
          index={index}
        />
      ))}
    </div>
  );
}

/**
 * LoadingMessages component
 * Displays rotating loading messages
 */
function LoadingMessagesComponent({ className }: { className?: string }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Gathering divine stories...",
    "Connecting souls...",
    "Weaving sacred narratives...",
    "Illuminating paths...",
    "Bridging worlds...",
    "Harmonizing energies...",
    "Revealing divine purpose...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className={cn("text-center py-8", className)}>
      <div className="inline-flex items-center justify-center">
        <div className="relative h-10 w-10 mr-4">
          <div className="absolute inset-0 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
        </div>
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-white/80 font-medium"
        >
          {messages[messageIndex]}
        </motion.p>
      </div>

      {/* Subtle progress indicator */}
      <div className="max-w-md mx-auto mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-courage-blue to-hope-gold"
          initial={{ width: "0%" }}
          animate={{
            width: ["0%", "40%", "60%", "80%", "95%"],
          }}
          transition={{
            duration: 15,
            times: [0, 0.3, 0.5, 0.8, 1],
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}

/**
 * ErrorWithRetry component
 * Displays an error message with retry button
 */
function ErrorWithRetryComponent({
  message = "Something went wrong while loading the transformation agents.",
  onRetry,
  className,
}: {
  message?: string;
  onRetry: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass rounded-xl backdrop-blur-md p-8 text-center",
        className,
      )}
    >
      {/* Error icon */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md border border-white/20" />
        <svg
          className="absolute inset-0 w-full h-full text-white/70 p-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-white mb-3">
        Divine Connection Interrupted
      </h3>
      <p className="text-white/70 mb-6 max-w-md mx-auto">{message}</p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors ease-divine inline-flex items-center"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Reconnect
      </motion.button>
    </motion.div>
  );
}

// Wrap components with the divine error boundary
export const GridLoadingSkeleton = withErrorBoundary(
  GridLoadingSkeletonComponent,
  "GridLoadingSkeleton"
);
export const LoadingMessages = withErrorBoundary(
  LoadingMessagesComponent,
  "LoadingMessages"
);
export const ErrorWithRetry = withErrorBoundary(ErrorWithRetryComponent, "ErrorWithRetry");
export const EtherealParticles = withErrorBoundary(
  EtherealParticlesComponent,
  "EtherealParticles"
);

// Create a LoadingPage component
const LoadingPageComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <LoadingMessages />
      <div className="w-full max-w-4xl mt-8">
        <GridLoadingSkeleton count={6} showFeatured={true} />
      </div>
    </div>
  );
};

// Export LoadingPage with divine error boundary
export default withErrorBoundary(LoadingPageComponent, "LoadingPageComponent");
