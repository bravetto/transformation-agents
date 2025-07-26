"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 🎨 DIVINE SKELETON LOADER SYSTEM
 * Spiritually-aligned loading states that build anticipation and trust
 */

interface SkeletonProps {
  className?: string;
  variant?:
    | "default"
    | "rounded"
    | "circle"
    | "text"
    | "card"
    | "hero"
    | "testimonial"
    | "prayer";
  animation?: "pulse" | "shimmer" | "wave" | "divine";
  children?: React.ReactNode;
}

const skeletonVariants = {
  pulse: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  shimmer: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
  wave: {
    y: [0, -2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  divine: {
    opacity: [0.3, 0.8, 0.3],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function Skeleton({
  className,
  variant = "default",
  animation = "divine",
  children,
  ...props
}: SkeletonProps) {
  const baseStyles =
    "animate-pulse bg-gradient-to-r from-hope-gold/20 via-hope-gold/30 to-hope-gold/20 rounded";

  const variantStyles = {
    default: "h-4 w-full",
    rounded: "h-4 w-full rounded-md",
    circle: "rounded-full aspect-square",
    text: "h-4 w-3/4 rounded-sm",
    card: "h-32 w-full rounded-lg",
    hero: "h-64 w-full rounded-xl",
    testimonial: "h-24 w-full rounded-lg",
    prayer: "h-16 w-full rounded-lg border-2 border-hope-gold/20",
  };

  return (
    <motion.div
      className={cn(baseStyles, variantStyles[variant], className)}
      variants={skeletonVariants}
      animate={animation}
      style={{
        background:
          animation === "shimmer"
            ? "linear-gradient(90deg, rgba(245, 158, 11, 0.1) 25%, rgba(245, 158, 11, 0.3) 50%, rgba(245, 158, 11, 0.1) 75%)"
            : undefined,
        backgroundSize: animation === "shimmer" ? "400% 100%" : undefined,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * 🌟 DIVINE LOADING STATES
 * Specialized loading components for different content types
 */

export function HeroSkeleton() {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="hero-container flex flex-col items-center justify-center w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          {/* Title skeleton */}
          <Skeleton
            variant="hero"
            className="max-w-4xl mx-auto h-20"
            animation="divine"
          />

          {/* Subtitle skeleton */}
          <Skeleton
            variant="text"
            className="max-w-2xl mx-auto h-6"
            animation="divine"
          />

          {/* CTA skeleton */}
          <Skeleton
            variant="rounded"
            className="w-64 h-12 mx-auto"
            animation="divine"
          />

          {/* Divine loading message */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-hope-gold/80 text-sm font-medium"
          >
            Preparing divine experience...
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export function TestimonySkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-hope-gold/20"
        >
          {/* Avatar and name */}
          <div className="flex items-center gap-4 mb-4">
            <Skeleton variant="circle" className="w-12 h-12" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" className="w-32 h-5" />
              <Skeleton variant="text" className="w-24 h-4" />
            </div>
          </div>

          {/* Testimony content */}
          <div className="space-y-3">
            <Skeleton variant="text" className="w-full h-4" />
            <Skeleton variant="text" className="w-5/6 h-4" />
            <Skeleton variant="text" className="w-4/5 h-4" />
          </div>
        </motion.div>
      ))}

      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="text-center text-hope-gold/80 text-sm font-medium"
      >
        Gathering divine testimonies...
      </motion.p>
    </div>
  );
}

export function PrayerCountSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-hope-gold/10 to-courage-blue/10 rounded-xl p-6 border border-hope-gold/30"
    >
      <div className="text-center space-y-4">
        <Skeleton variant="circle" className="w-16 h-16 mx-auto" />
        <Skeleton variant="text" className="w-32 h-6 mx-auto" />
        <Skeleton variant="text" className="w-48 h-4 mx-auto" />

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-hope-gold/80 text-xs font-medium"
        >
          Counting prayer warriors...
        </motion.p>
      </div>
    </motion.div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-hope-gold/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Skeleton variant="circle" className="w-8 h-8" />
              <Skeleton variant="text" className="w-24 h-5" />
            </div>
            <Skeleton variant="text" className="w-16 h-8 mb-2" />
            <Skeleton variant="text" className="w-32 h-4" />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-center text-hope-gold/80 text-sm font-medium"
      >
        Calculating spiritual impact...
      </motion.p>
    </div>
  );
}

export function CountdownSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-hope-gold/30"
    >
      <div className="text-center space-y-6">
        <Skeleton variant="text" className="w-48 h-8 mx-auto" />

        {/* Countdown boxes */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-2"
            >
              <Skeleton variant="rounded" className="w-full h-12" />
              <Skeleton variant="text" className="w-full h-4" />
            </motion.div>
          ))}
        </div>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="text-hope-gold/80 text-sm font-medium"
        >
          Synchronizing with divine timing...
        </motion.p>
      </div>
    </motion.div>
  );
}

/**
 * 🎯 SMART LOADING STATES
 * Context-aware loading experiences
 */

interface SmartSkeletonProps {
  type: "hero" | "testimony" | "prayer" | "analytics" | "countdown" | "custom";
  message?: string;
  children?: React.ReactNode;
}

export function SmartSkeleton({ type, message, children }: SmartSkeletonProps) {
  const skeletonComponents = {
    hero: HeroSkeleton,
    testimony: TestimonySkeleton,
    prayer: PrayerCountSkeleton,
    analytics: AnalyticsSkeleton,
    countdown: CountdownSkeleton,
    custom: () => children || <Skeleton />,
  };

  const SkeletonComponent = skeletonComponents[type];

  return (
    <div className="animate-in fade-in-0 duration-300">
      <SkeletonComponent />
      {message && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center text-hope-gold/80 text-sm font-medium mt-4"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

/**
 * 🌟 PROGRESSIVE LOADING HOOK
 * Manages loading states with spiritual timing
 */

export function useProgressiveLoading(stages: string[], duration = 2000) {
  const [currentStage, setCurrentStage] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (currentStage >= stages.length - 1) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStage((prev) => prev + 1);
    }, duration / stages.length);

    return () => clearTimeout(timer);
  }, [currentStage, stages.length, duration]);

  return {
    currentStage: stages[currentStage],
    progress: ((currentStage + 1) / stages.length) * 100,
    isComplete,
    stageIndex: currentStage,
  };
}
