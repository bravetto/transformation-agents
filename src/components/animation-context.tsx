"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useDeviceCapabilities, type DeviceTier } from "@/lib/animation-utils";

/**
 * Animation Context Interface
 */
interface AnimationContextValue {
  // Device capabilities
  deviceTier: DeviceTier;
  fps: number;
  reducedMotion: boolean;
  batteryLevel?: number;
  batteryCharging?: boolean;

  // Performance flags
  isLowPerformance: boolean;
  isBatteryLow: boolean;
  shouldSimplifyAnimations: boolean;

  // Animation control
  isPaused: boolean;
  pauseAnimations: () => void;
  resumeAnimations: () => void;

  // Animation settings
  particleIntensity: "low" | "medium" | "high" | "auto";
  setParticleIntensity: (intensity: "low" | "medium" | "high" | "auto") => void;

  // Animation quality (derived from deviceTier)
  animationQuality: "low" | "medium" | "high";
}

/**
 * Create Animation Context
 */
const AnimationContext = createContext<AnimationContextValue | undefined>(
  undefined,
);

/**
 * Animation Provider Props
 */
interface AnimationProviderProps {
  children: React.ReactNode;
  initialParticleIntensity?: "low" | "medium" | "high" | "auto";
}

/**
 * Animation Provider Component
 *
 * Provides centralized animation preferences and performance monitoring
 */
export function AnimationProvider({
  children,
  initialParticleIntensity = "auto",
}: AnimationProviderProps) {
  // Get device capabilities from our custom hook
  const deviceCapabilities = useDeviceCapabilities();

  // Direct access to reduced motion preference (backup)
  const prefersReducedMotion = useReducedMotion();

  // Animation control state
  const [isPaused, setIsPaused] = useState(false);
  const [particleIntensity, setParticleIntensity] = useState<
    "low" | "medium" | "high" | "auto"
  >(initialParticleIntensity);

  // Helper functions to control animations
  const pauseAnimations = () => setIsPaused(true);
  const resumeAnimations = () => setIsPaused(false);

  // Effect to pause animations when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.visibilityState !== "visible");
    };

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Initial check
      handleVisibilityChange();

      // Cleanup
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      };
    }
  }, []);

  // Determine animation quality based on device capabilities and preferences
  const getAnimationQuality = (): "low" | "medium" | "high" => {
    if (
      deviceCapabilities.shouldSimplifyAnimations ||
      deviceCapabilities.isBatteryLow
    ) {
      return "low";
    }
    return deviceCapabilities.deviceTier;
  };

  // Context value
  const value: AnimationContextValue = {
    // Pass through device capabilities
    deviceTier: deviceCapabilities.deviceTier,
    fps: deviceCapabilities.fps,
    reducedMotion:
      deviceCapabilities.reducedMotion || Boolean(prefersReducedMotion),
    batteryLevel: deviceCapabilities.batteryLevel,
    batteryCharging: deviceCapabilities.batteryCharging,

    // Performance flags
    isLowPerformance: deviceCapabilities.isLowPerformance,
    isBatteryLow: deviceCapabilities.isBatteryLow,
    shouldSimplifyAnimations: deviceCapabilities.shouldSimplifyAnimations,

    // Animation control
    isPaused,
    pauseAnimations,
    resumeAnimations,

    // Animation settings
    particleIntensity,
    setParticleIntensity,

    // Animation quality
    animationQuality: getAnimationQuality(),
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}

      {/* Optional Debug Panel (development only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50 max-w-xs">
          <div className="font-mono">
            <div>Tier: {value.deviceTier}</div>
            <div>FPS: {value.fps}</div>
            <div>
              Battery:{" "}
              {value.batteryLevel
                ? `${Math.round(value.batteryLevel * 100)}%`
                : "N/A"}
            </div>
            <div>Reduced Motion: {value.reducedMotion ? "Yes" : "No"}</div>
            <div>Simplify: {value.shouldSimplifyAnimations ? "Yes" : "No"}</div>
            <div>Particles: {value.particleIntensity}</div>
            <div>Quality: {value.animationQuality}</div>
          </div>
        </div>
      )}
    </AnimationContext.Provider>
  );
}

/**
 * Hook to use the Animation Context
 */
export function useAnimation() {
  const context = useContext(AnimationContext);

  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }

  return context;
}

/**
 * Helper hook to get optimized particle settings
 */
export function useParticleSettings() {
  const {
    particleIntensity,
    shouldSimplifyAnimations,
    deviceTier,
    isBatteryLow,
    animationQuality,
  } = useAnimation();

  // Determine actual intensity based on context
  let effectiveIntensity: "low" | "medium" | "high";

  if (particleIntensity === "auto") {
    // Auto mode - determine based on device capabilities
    if (shouldSimplifyAnimations || isBatteryLow) {
      effectiveIntensity = "low";
    } else {
      effectiveIntensity = deviceTier;
    }
  } else {
    // Explicit setting, but still downgrade if necessary
    effectiveIntensity = shouldSimplifyAnimations ? "low" : particleIntensity;
  }

  return {
    intensity: effectiveIntensity,
    // Calculate particle count based on intensity
    count:
      effectiveIntensity === "low"
        ? 20
        : effectiveIntensity === "medium"
          ? 40
          : 80,
    // Animation speed based on quality
    speed:
      animationQuality === "low" ? 0.5 : animationQuality === "medium" ? 1 : 2,
    // Particle size based on quality
    size:
      animationQuality === "low" ? 2 : animationQuality === "medium" ? 3 : 4,
    // Should we enable interactive features?
    interactive: !shouldSimplifyAnimations && effectiveIntensity !== "low",
  };
}

export default AnimationProvider;
