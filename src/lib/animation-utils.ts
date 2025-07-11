"use client";

/**
 * Animation Utilities for The Bridge Project
 * Performance-optimized animation helpers and hooks
 */

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";
import { animations } from "@/lib/design-system";
import type { Transition } from "framer-motion";

/**
 * Device performance tiers for animation scaling
 */
export type DeviceTier = "low" | "medium" | "high";

/**
 * Animation performance metrics
 */
interface PerformanceMetrics {
  fps: number;
  deviceTier: DeviceTier;
  reducedMotion: boolean;
  supportsRAF: boolean;
  batteryLevel?: number;
  batteryCharging?: boolean;
}

/**
 * FPS monitor interface
 */
interface FPSMonitor {
  fps: number;
  samples: number[];
  lastTime: number;
  sampleCount: number;
  measuring: boolean;
}

/**
 * Hook to detect device capabilities for animation optimization
 * @returns Device capabilities and performance metrics
 */
export function useDeviceCapabilities() {
  const prefersReducedMotion = useReducedMotion();

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    deviceTier: "medium",
    reducedMotion: Boolean(prefersReducedMotion),
    supportsRAF:
      typeof window !== "undefined" &&
      typeof window.requestAnimationFrame === "function",
    batteryLevel: undefined,
    batteryCharging: undefined,
  });

  // Create refs to track performance
  const fpsMonitor = useRef<FPSMonitor>({
    fps: 60,
    samples: [],
    lastTime: 0,
    sampleCount: 0,
    measuring: false,
  });

  // Monitor device capabilities
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect device memory and CPU cores for tier calculation
    let deviceTier: DeviceTier = "medium";

    // Check for Navigator with deviceMemory (not standard in all browsers)
    const memory =
      typeof navigator !== "undefined" && "deviceMemory" in navigator
        ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory
        : undefined;

    // Determine device tier based on memory
    if (memory && typeof memory === "number") {
      if (memory <= 2) deviceTier = "low";
      else if (memory >= 8) deviceTier = "high";
    }

    // Check for mobile devices
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      deviceTier = deviceTier === "high" ? "medium" : "low";
    }

    // Check for Battery API support
    if ("getBattery" in navigator) {
      // Access the Battery API
      const nav = navigator as Navigator & {
        getBattery?: () => Promise<{
          level: number;
          charging: boolean;
          addEventListener: (event: string, callback: () => void) => void;
          removeEventListener: (event: string, callback: () => void) => void;
        }>;
      };

      nav
        .getBattery?.()
        .then((battery) => {
          // Get initial battery info
          const updateBatteryInfo = () => {
            setMetrics((prev) => ({
              ...prev,
              batteryLevel: battery.level,
              batteryCharging: battery.charging,
              // Further reduce tier if battery is low and not charging
              deviceTier:
                !battery.charging && battery.level < 0.2
                  ? "low"
                  : prev.deviceTier,
            }));
          };

          // Update battery info immediately
          updateBatteryInfo();

          // Add event listeners for battery changes
          battery.addEventListener("levelchange", updateBatteryInfo);
          battery.addEventListener("chargingchange", updateBatteryInfo);

          // Cleanup
          return () => {
            battery.removeEventListener("levelchange", updateBatteryInfo);
            battery.removeEventListener("chargingchange", updateBatteryInfo);
          };
        })
        .catch(() => {
          // Battery API failed, continue without battery info
        });
    }

    // Update metrics with device tier and reduced motion preference
    setMetrics((prev) => ({
      ...prev,
      deviceTier,
      reducedMotion: Boolean(prefersReducedMotion),
    }));

    // FPS monitoring functions
    // Start monitoring FPS if supported
    if (typeof window.requestAnimationFrame === "function") {
      // Reset FPS monitor
      fpsMonitor.current = {
        fps: 60,
        samples: [],
        lastTime: performance.now(),
        sampleCount: 0,
        measuring: true,
      };

      const measureFPS = () => {
        if (!fpsMonitor.current.measuring) return;

        const now = performance.now();
        const elapsed = now - fpsMonitor.current.lastTime;

        if (elapsed >= 1000) {
          // Calculate FPS
          const currentFPS = Math.round(
            (fpsMonitor.current.sampleCount * 1000) / elapsed,
          );

          // Add to samples
          fpsMonitor.current.samples.push(currentFPS);

          // Keep only the last 5 samples
          if (fpsMonitor.current.samples.length > 5) {
            fpsMonitor.current.samples.shift();
          }

          // Calculate average FPS
          const avgFPS =
            fpsMonitor.current.samples.reduce((sum, fps) => sum + fps, 0) /
            fpsMonitor.current.samples.length;

          fpsMonitor.current.fps = Math.round(avgFPS);
          fpsMonitor.current.sampleCount = 0;
          fpsMonitor.current.lastTime = now;

          // Update metrics with current FPS
          setMetrics((prev) => ({
            ...prev,
            fps: fpsMonitor.current.fps,
            // Adjust device tier based on FPS
            deviceTier:
              fpsMonitor.current.fps < 30
                ? "low"
                : fpsMonitor.current.fps < 50
                  ? "medium"
                  : prev.deviceTier,
          }));
        } else {
          fpsMonitor.current.sampleCount++;
        }

        // Continue measuring
        requestAnimationFrame(measureFPS);
      };

      // Start the FPS measurement
      requestAnimationFrame(measureFPS);
    }

    return () => {
      // Stop FPS monitoring on cleanup
      fpsMonitor.current.measuring = false;
    };
  }, [prefersReducedMotion]);

  // Additional helper properties
  const isLowPerformance = metrics.deviceTier === "low" || metrics.fps < 30;
  const isBatteryLow =
    metrics.batteryLevel !== undefined &&
    metrics.batteryLevel < 0.2 &&
    !metrics.batteryCharging;

  return {
    ...metrics,
    isLowPerformance,
    isBatteryLow,
    // Combined flag for when animations should be simplified
    shouldSimplifyAnimations:
      Boolean(prefersReducedMotion) || isLowPerformance || isBatteryLow,
  };
}

/**
 * Get optimized animation variants based on device capabilities
 * @param options Configuration for the animation variants
 * @returns Framer Motion variants optimized for the current device
 */
export function getOptimizedVariants(options: {
  simplify?: boolean;
  distance?: number;
  duration?: number;
  ease?: number[];
  staggerChildren?: number;
  delayChildren?: number;
}) {
  const {
    simplify = false,
    distance = 20,
    duration = 0.5,
    ease = animations.easings.easeOut,
    staggerChildren = 0.1,
    delayChildren = 0,
  } = options;

  // Base transition
  const transition: Transition = {
    duration,
    ease,
  };

  // Simplified variants (for reduced motion or low performance)
  if (simplify) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition,
      },
      exit: {
        opacity: 0,
        transition: { ...transition, duration: duration * 0.7 },
      },
    };
  }

  // Full animation variants
  return {
    hidden: {
      opacity: 0,
      y: distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...transition,
        staggerChildren,
        delayChildren,
      },
    },
    exit: {
      opacity: 0,
      y: -distance,
      transition: { ...transition, duration: duration * 0.7 },
    },
  };
}

/**
 * Optimize page transition variants based on device capabilities
 * @param prefersReducedMotion Whether the user prefers reduced motion
 * @returns Optimized page transition variants
 */
export function getPageTransitionVariants(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
    };
  }

  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: {
      duration: 0.5,
      ease: animations.easings.easeOut,
    },
  };
}

/**
 * Get staggered animation config for lists
 * @param options Configuration options
 * @returns Optimized stagger animation options
 */
export function getStaggerConfig(options: {
  simplify?: boolean;
  staggerChildren?: number;
  delayChildren?: number;
  staggerDirection?: number;
  itemCount?: number;
}) {
  const {
    simplify = false,
    staggerChildren = 0.1,
    delayChildren = 0,
    staggerDirection = 1,
    itemCount = 10,
  } = options;

  // For reduced motion or low performance, reduce or eliminate stagger
  if (simplify) {
    return {
      staggerChildren: Math.min(0.05, staggerChildren / 2),
      delayChildren: 0,
      staggerDirection,
    };
  }

  // For many items, reduce stagger time to avoid too long total animation
  const adjustedStagger =
    itemCount > 20
      ? Math.min(0.03, staggerChildren / 3)
      : itemCount > 10
        ? Math.min(0.05, staggerChildren / 2)
        : staggerChildren;

  return {
    staggerChildren: adjustedStagger,
    delayChildren,
    staggerDirection,
  };
}

/**
 * Hook to pause animations when the page/tab is not visible
 * @returns Object with isVisible flag
 */
export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    // Add visibility change listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

/**
 * Hook for intersection-triggered animations
 * @param options Configuration options
 * @returns Ref to attach to the target element and inView status
 */
export function useInViewAnimation(options: {
  threshold?: number;
  triggerOnce?: boolean;
}) {
  const [ref, inView] = useInView({
    threshold: options.threshold || 0.1,
    triggerOnce: options.triggerOnce || false,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return { ref, inView, hasAnimated };
}

/**
 * Get divine animation preset with reduced motion support
 * @param preset Name of the animation preset from design system
 * @param prefersReducedMotion Whether reduced motion is preferred
 * @returns Animation preset optimized for accessibility
 */
export function getDivineAnimationPreset(
  preset: keyof typeof animations.presets,
  prefersReducedMotion: boolean,
) {
  const animation = animations.presets[preset];

  // For reduced motion, return a simplified version
  if (prefersReducedMotion) {
    return {
      ...animation,
      // Override with simplified animation
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: 0.3,
        ease: animations.easings.easeOut,
      },
    };
  }

  return animation;
}

/**
 * The divine easing curve - exponential ease out
 */
export const divineEase = animations.easings.easeOut;
