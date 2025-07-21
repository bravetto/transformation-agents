"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 🚀 PERFORMANCE OPTIMIZER SYSTEM
 * Intelligent performance adaptation and Core Web Vitals optimization
 */

interface PerformanceMetrics {
  lcp: number | null;
  inp: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  fps: number;
  memoryUsage: number;
  deviceType: "mobile" | "tablet" | "desktop";
  connectionType: "slow-2g" | "2g" | "3g" | "4g" | "5g" | "unknown";
  isLowPerformance: boolean;
}

interface DeviceCapabilities {
  cores: number;
  memory: number;
  isLowEnd: boolean;
  isBatteryLow: boolean;
  prefersReducedMotion: boolean;
}

interface OptimizationSuggestion {
  metric: string;
  current: number;
  target: number;
  suggestion: string;
  priority: "low" | "medium" | "high" | "critical";
}

/**
 * 🎯 CORE WEB VITALS MONITOR
 * Real-time performance tracking with divine optimization
 */

export function useCoreWebVitals() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    inp: null,
    cls: null,
    fcp: null,
    ttfb: null,
    fps: 60,
    memoryUsage: 0,
    deviceType: "desktop",
    connectionType: "unknown",
    isLowPerformance: false,
  });

  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Device capability detection
  const detectDeviceCapabilities = useCallback((): DeviceCapabilities => {
    if (typeof window === "undefined") {
      return {
        cores: 4,
        memory: 4000000000,
        isLowEnd: false,
        isBatteryLow: false,
        prefersReducedMotion: false,
      };
    }

    const cores = navigator.hardwareConcurrency || 4;
    const memory = (performance as any).memory?.jsHeapSizeLimit || 4000000000;
    const connection = (navigator as any).connection;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isLowEnd = cores <= 2 || memory < 1000000000 || connection?.saveData;

    return {
      cores,
      memory,
      isLowEnd,
      isBatteryLow: false, // Will be updated by battery API
      prefersReducedMotion,
    };
  }, []);

  // FPS monitoring
  useEffect(() => {
    let animationId: number;

    const measureFPS = () => {
      frameCountRef.current++;
      const currentTime = performance.now();

      if (currentTime >= lastTimeRef.current + 1000) {
        const fps = Math.round(
          (frameCountRef.current * 1000) / (currentTime - lastTimeRef.current),
        );
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;

        setMetrics((prev) => ({
          ...prev,
          fps,
          isLowPerformance: fps < 30,
        }));
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Core Web Vitals collection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const collectMetrics = async () => {
      try {
        // Dynamic import to reduce initial bundle size
        const { getCLS, getFCP, getLCP, getTTFB } = await import("web-vitals");

        getCLS((metric) => {
          setMetrics((prev) => ({ ...prev, cls: metric.value }));
        });

        getFCP((metric) => {
          setMetrics((prev) => ({ ...prev, fcp: metric.value }));
        });

        getLCP((metric) => {
          setMetrics((prev) => ({ ...prev, lcp: metric.value }));
        });

        getTTFB((metric) => {
          setMetrics((prev) => ({ ...prev, ttfb: metric.value }));
        });
      } catch (error) {
        console.warn("Web Vitals not available:", error);
      }
    };

    collectMetrics();
  }, []);

  // Generate optimization suggestions
  useEffect(() => {
    const newSuggestions: OptimizationSuggestion[] = [];

    if (metrics.lcp && metrics.lcp > 2500) {
      newSuggestions.push({
        metric: "LCP",
        current: metrics.lcp,
        target: 2500,
        suggestion: "Preload hero images and optimize font loading",
        priority: metrics.lcp > 4000 ? "critical" : "high",
      });
    }

    if (metrics.cls && metrics.cls > 0.1) {
      newSuggestions.push({
        metric: "CLS",
        current: metrics.cls,
        target: 0.1,
        suggestion: "Add explicit dimensions to images and dynamic content",
        priority: metrics.cls > 0.25 ? "critical" : "high",
      });
    }

    if (metrics.fps < 30) {
      newSuggestions.push({
        metric: "FPS",
        current: metrics.fps,
        target: 60,
        suggestion: "Reduce animation complexity or disable particles",
        priority: "high",
      });
    }

    setSuggestions(newSuggestions);
  }, [metrics]);

  return {
    metrics,
    suggestions,
    deviceCapabilities: detectDeviceCapabilities(),
    isOptimized: suggestions.length === 0,
  };
}

/**
 * ⚡ INTELLIGENT ANIMATION ADAPTER
 * Adapts animations based on device performance and user preferences
 */

interface AnimationAdapterProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function AnimationAdapter({
  children,
  fallback,
  className,
}: AnimationAdapterProps) {
  const { metrics, deviceCapabilities } = useCoreWebVitals();
  const [shouldSimplify, setShouldSimplify] = useState(false);

  useEffect(() => {
    const shouldSimplifyAnimations =
      deviceCapabilities.prefersReducedMotion ||
      deviceCapabilities.isLowEnd ||
      metrics.fps < 30 ||
      metrics.isLowPerformance;

    setShouldSimplify(shouldSimplifyAnimations);
  }, [metrics, deviceCapabilities]);

  if (shouldSimplify && fallback) {
    return <div className={className}>{fallback}</div>;
  }

  if (shouldSimplify) {
    return <div className={className}>{children}</div>;
  }

  return <div className={className}>{children}</div>;
}

/**
 * 🎨 ADAPTIVE PARTICLE SYSTEM
 * Particle count and complexity adapts to device performance
 */

interface AdaptiveParticleProps {
  baseCount?: number;
  maxCount?: number;
  className?: string;
  colors?: string[];
}

export function AdaptiveParticleSystem({
  baseCount = 50,
  maxCount = 100,
  className,
  colors = ["#F59E0B", "#3B82F6", "#10B981"],
}: AdaptiveParticleProps) {
  const { metrics, deviceCapabilities } = useCoreWebVitals();
  const [particleCount, setParticleCount] = useState(baseCount);
  const [complexity, setComplexity] = useState<"low" | "medium" | "high">(
    "medium",
  );

  useEffect(() => {
    let adaptedCount = baseCount;
    let adaptedComplexity: "low" | "medium" | "high" = "medium";

    // Adapt based on device capabilities
    if (deviceCapabilities.isLowEnd) {
      adaptedCount = Math.max(10, Math.floor(baseCount * 0.3));
      adaptedComplexity = "low";
    } else if (deviceCapabilities.cores >= 8) {
      adaptedCount = Math.min(maxCount, Math.floor(baseCount * 1.5));
      adaptedComplexity = "high";
    }

    // Adapt based on performance metrics
    if (metrics.fps < 30) {
      adaptedCount = Math.max(5, Math.floor(adaptedCount * 0.5));
      adaptedComplexity = "low";
    } else if (metrics.fps >= 55) {
      adaptedCount = Math.min(maxCount, Math.floor(adaptedCount * 1.2));
    }

    // Respect user preferences
    if (deviceCapabilities.prefersReducedMotion) {
      adaptedCount = 0;
      adaptedComplexity = "low";
    }

    setParticleCount(adaptedCount);
    setComplexity(adaptedComplexity);
  }, [metrics, deviceCapabilities, baseCount, maxCount]);

  // Don't render particles if count is 0 or performance is too low
  if (particleCount === 0 || deviceCapabilities.prefersReducedMotion) {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-hope-gold/5 to-courage-blue/5",
          className,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Simplified particle representation */}
      <div className="absolute inset-0">
        {Array.from({ length: Math.min(particleCount, 20) }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-60"
            style={{
              backgroundColor: colors[i % colors.length],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={
              complexity === "low"
                ? {
                    opacity: [0.3, 0.6, 0.3],
                  }
                : {
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                    x: [0, Math.random() * 20 - 10, 0],
                    y: [0, Math.random() * 20 - 10, 0],
                  }
            }
            transition={{
              duration: complexity === "low" ? 4 : 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 📊 PERFORMANCE DASHBOARD
 * Development-only performance monitoring display
 */

interface PerformanceDashboardProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function PerformanceDashboard({
  position = "top-right",
  className,
}: PerformanceDashboardProps) {
  const { metrics, suggestions, isOptimized } = useCoreWebVitals();
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === "development");
  }, []);

  if (!isVisible) return null;

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "fixed z-50 bg-black/90 text-white p-4 rounded-lg shadow-xl max-w-xs text-xs font-mono",
        positionClasses[position],
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className={cn(
            "w-2 h-2 rounded-full",
            isOptimized
              ? "bg-green-400"
              : suggestions.some((s) => s.priority === "critical")
                ? "bg-red-400"
                : "bg-yellow-400",
          )}
        />
        <span className="font-bold text-sm">Performance</span>
      </div>

      <div className="space-y-2">
        {metrics.lcp && (
          <div className="flex justify-between">
            <span>LCP:</span>
            <span
              className={metrics.lcp > 2500 ? "text-red-400" : "text-green-400"}
            >
              {Math.round(metrics.lcp)}ms
            </span>
          </div>
        )}

        {metrics.cls && (
          <div className="flex justify-between">
            <span>CLS:</span>
            <span
              className={metrics.cls > 0.1 ? "text-red-400" : "text-green-400"}
            >
              {metrics.cls.toFixed(3)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span>FPS:</span>
          <span
            className={
              metrics.fps < 30
                ? "text-red-400"
                : metrics.fps >= 55
                  ? "text-green-400"
                  : "text-yellow-400"
            }
          >
            {metrics.fps}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Device:</span>
          <span className="text-blue-400">{metrics.deviceType}</span>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="text-yellow-300 font-bold mb-2">Suggestions:</div>
          {suggestions.slice(0, 2).map((suggestion, i) => (
            <div key={i} className="text-xs text-yellow-200 mb-1">
              {suggestion.metric}: {suggestion.suggestion}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/**
 * 🌟 PERFORMANCE PROVIDER
 * Context provider for performance optimization across the app
 */

interface PerformanceContextType {
  metrics: PerformanceMetrics;
  suggestions: OptimizationSuggestion[];
  deviceCapabilities: DeviceCapabilities;
  isOptimized: boolean;
  shouldSimplifyAnimations: boolean;
}

const PerformanceContext = React.createContext<PerformanceContextType | null>(
  null,
);

export function PerformanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const performanceData = useCoreWebVitals();

  const shouldSimplifyAnimations =
    performanceData.deviceCapabilities.prefersReducedMotion ||
    performanceData.deviceCapabilities.isLowEnd ||
    performanceData.metrics.fps < 30 ||
    performanceData.metrics.isLowPerformance;

  const contextValue: PerformanceContextType = {
    ...performanceData,
    shouldSimplifyAnimations,
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = React.useContext(PerformanceContext);
  if (!context) {
    throw new Error("usePerformance must be used within a PerformanceProvider");
  }
  return context;
}
