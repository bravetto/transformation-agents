"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useReducedMotion } from "framer-motion";

interface AnimationContextType {
  reducedMotion: boolean;
  shouldSimplifyAnimations: boolean;
  isPaused: boolean;
  devicePerformance: "low" | "medium" | "high";
  batteryStatus: "charging" | "discharging" | "unknown";
  batteryLevel: number;
  isLowPowerMode: boolean;
  fps: number;
  memoryUsage: number;
}

const AnimationContext = createContext<AnimationContextType>({
  reducedMotion: false,
  shouldSimplifyAnimations: false,
  isPaused: false,
  devicePerformance: "medium",
  batteryStatus: "unknown",
  batteryLevel: 1,
  isLowPowerMode: false,
  fps: 60,
  memoryUsage: 0,
});

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}

interface AnimationProviderProps {
  children: React.ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const reducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [devicePerformance, setDevicePerformance] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [batteryStatus, setBatteryStatus] = useState<
    "charging" | "discharging" | "unknown"
  >("unknown");
  const [batteryLevel, setBatteryLevel] = useState(1);
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(0);

  // 🛡️ DEFENSIVE FIX: Move performance detection to useEffect
  useEffect(() => {
    const detectPerformance = () => {
      if (typeof window === "undefined") return;

      const cores = navigator.hardwareConcurrency || 4;
      const memory = (performance as any).memory?.jsHeapSizeLimit || 0;
      const connection = (navigator as any).connection;

      // Low-end device detection
      if (cores <= 2 || memory < 1000000000 || connection?.saveData) {
        setDevicePerformance("low");
        return;
      }

      // High-end device detection
      if (cores >= 8 && memory > 4000000000 && !connection?.saveData) {
        setDevicePerformance("high");
        return;
      }

      setDevicePerformance("medium");
    };

    detectPerformance();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Monitor battery status for performance optimization
  useEffect(() => {
    if (typeof window === "undefined" || !("getBattery" in navigator)) return;

    const updateBatteryInfo = (battery: any) => {
      setBatteryStatus(battery.charging ? "charging" : "discharging");
      setBatteryLevel(battery.level);
    };

    (navigator as any)
      .getBattery()
      .then((battery: any) => {
        updateBatteryInfo(battery);

        battery.addEventListener("chargingchange", () =>
          updateBatteryInfo(battery),
        );
        battery.addEventListener("levelchange", () =>
          updateBatteryInfo(battery),
        );
      })
      .catch(() => {
        // Battery API not supported, use defaults
        setBatteryStatus("unknown");
        setBatteryLevel(1);
      });
  }, []);

  // Monitor FPS for performance adaptation
  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const currentFps = Math.round(
          (frameCount * 1000) / (currentTime - lastTime),
        );
        frameCount = 0;
        lastTime = currentTime;
        setFps(currentFps);
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Monitor memory usage
  useEffect(() => {
    if (typeof window === "undefined" || !("memory" in performance)) return;

    const measureMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        setMemoryUsage(memory.usedJSHeapSize / memory.jsHeapSizeLimit);
      }
    };

    const interval = setInterval(measureMemory, 5000);
    measureMemory(); // Initial measurement

    return () => clearInterval(interval);
  }, []);

  // Pause animations when tab is not visible
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 🔥 DIVINE FIX: Memoize computed values to prevent infinite re-renders
  const shouldSimplifyAnimations = useMemo(
    () =>
      reducedMotion ||
      devicePerformance === "low" ||
      (batteryStatus === "discharging" && batteryLevel < 0.2) ||
      fps < 30 ||
      memoryUsage > 0.8,
    [
      reducedMotion,
      devicePerformance,
      batteryStatus,
      batteryLevel,
      fps,
      memoryUsage,
    ],
  );

  const isLowPowerMode = useMemo(
    () =>
      (batteryStatus === "discharging" && batteryLevel < 0.15) ||
      devicePerformance === "low" ||
      fps < 20,
    [batteryStatus, batteryLevel, devicePerformance, fps],
  );

  // 🔥 DIVINE FIX: Memoize the entire context value
  const value = useMemo(
    (): AnimationContextType => ({
      reducedMotion: reducedMotion || false,
      shouldSimplifyAnimations,
      isPaused,
      devicePerformance,
      batteryStatus,
      batteryLevel,
      isLowPowerMode,
      fps,
      memoryUsage,
    }),
    [
      reducedMotion,
      shouldSimplifyAnimations,
      isPaused,
      devicePerformance,
      batteryStatus,
      batteryLevel,
      isLowPowerMode,
      fps,
      memoryUsage,
    ],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
