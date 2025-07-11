"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useReducedMotion } from "framer-motion";
import type { DeviceTier } from "@/lib/animation-utils";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

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
 * Simplified FPS monitor interface
 */
interface FPSMonitor {
  fps: number;
  samples: number[];
  lastTime: number;
  sampleCount: number;
  measuring: boolean;
}

/**
 * Animation Provider Component
 *
 * Provides centralized animation preferences and performance monitoring
 */
function AnimationProviderBase({
  children,
  initialParticleIntensity = "auto",
}: AnimationProviderProps) {
  // Direct access to reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  // Initial device capabilities state
  const [metrics, setMetrics] = useState({
    fps: 60,
    deviceTier: "medium" as DeviceTier,
    reducedMotion: Boolean(prefersReducedMotion),
    supportsRAF:
      typeof window !== "undefined" &&
      typeof window.requestAnimationFrame === "function",
    batteryLevel: undefined as number | undefined,
    batteryCharging: undefined as boolean | undefined,
  });

  // Create refs to track performance
  const fpsMonitor = useRef<FPSMonitor>({
    fps: 60,
    samples: [],
    lastTime: 0,
    sampleCount: 0,
    measuring: false,
  });

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

    // FPS monitoring
    if (typeof window.requestAnimationFrame === "function") {
      // Reset FPS monitor
      fpsMonitor.current = {
        fps: 60,
        samples: [],
        lastTime: performance.now(),
        sampleCount: 0,
        measuring: true,
      };

      // Function to measure FPS
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

    // Cleanup function
    return () => {
      fpsMonitor.current.measuring = false;
    };
  }, [prefersReducedMotion]);

  // Calculate additional helper properties
  const isLowPerformance = metrics.deviceTier === "low" || metrics.fps < 30;
  const isBatteryLow =
    metrics.batteryLevel !== undefined &&
    metrics.batteryLevel < 0.2 &&
    !metrics.batteryCharging;
  const shouldSimplifyAnimations =
    Boolean(prefersReducedMotion) || isLowPerformance || isBatteryLow;

  // Determine animation quality based on device capabilities and preferences
  const getAnimationQuality = (): "low" | "medium" | "high" => {
    if (shouldSimplifyAnimations || isBatteryLow) {
      return "low";
    }
    return metrics.deviceTier;
  };

  // Context value
  const value: AnimationContextValue = {
    // Pass through device capabilities
    deviceTier: metrics.deviceTier,
    fps: metrics.fps,
    reducedMotion: metrics.reducedMotion || Boolean(prefersReducedMotion),
    batteryLevel: metrics.batteryLevel,
    batteryCharging: metrics.batteryCharging,

    // Performance flags
    isLowPerformance,
    isBatteryLow,
    shouldSimplifyAnimations,

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

// Wrap with divine error boundary for production safety
export const AnimationProvider = withDivineErrorBoundary(
  AnimationProviderBase,
  {
    componentName: "AnimationProvider",
    role: "guardian",
  },
);

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
