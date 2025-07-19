"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import type { ISourceOptions, InteractivityDetect } from "@tsparticles/engine";
import {
  useCircuitBreaker,
  CircuitBreakerFallback,
} from "@/lib/circuit-breaker";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Engine } from "@tsparticles/engine";

// Lazy load the actual particles to prevent SSR issues
const ParticlesEngine = dynamic(
  () => import("@tsparticles/react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);

export interface DivineParticlesProps {
  variant?:
    | "light"
    | "dark"
    | "sacred"
    | "divine"
    | "minimal"
    | "flame"
    | "starfield"
    | "rain"
    | "hope"
    | "rage"
    | "unified";
  density?: "low" | "medium" | "high";
  interactive?: boolean;
  intensity?: "low" | "medium" | "high" | "auto";
  colors?: string[];
  className?: string;
}

const DivineParticlesBase = ({
  variant = "light",
  density = "medium",
  interactive = true,
  intensity = "medium",
  className,
}: DivineParticlesProps) => {
  // 🛡️ CRITICAL: ALL HOOKS MUST BE AT THE TOP - BEFORE ANY RETURNS
  const renderCountRef = useRef(0);

  // 🛡️ DEFENSIVE FIX: Reset render count on mount
  useEffect(() => {
    renderCountRef.current = 0;
  }, []);

  // 🛡️ CRITICAL FIX: Memoize particle count calculation to prevent re-renders
  const particleCount = useMemo(() => {
    // 🚨 SSR FIX: Only access navigator in browser environment
    if (typeof window === "undefined") return 50; // Default for SSR

    const cores = navigator.hardwareConcurrency || 4;
    const memory = (performance as any).memory?.jsHeapSizeLimit || 0;

    const baseCounts = {
      low: 30,
      medium: 50,
      high: 100,
    };

    const count =
      intensity === "auto" ? baseCounts.medium : baseCounts[intensity];

    // Adjust based on device capabilities
    if (memory > 0 && memory < 100000000) {
      // Low memory device
      return Math.max(20, Math.floor(count * 0.5));
    }

    if (cores >= 8) {
      // High-end device
      return Math.floor(count * 1.5);
    }

    return count;
  }, [intensity]);

  // 🛡️ CRITICAL FIX: Optimize colors array to prevent re-renders
  const optimizedColors = useMemo(() => {
    const defaultColors = ["#F59E0B", "#3B82F6", "#10B981"];
    const colorArray = colors || defaultColors;
    return colorArray.map((color: string) => {
      // Ensure colors are valid hex values
      return color.startsWith("#") ? color : `#${color}`;
    });
  }, [colors]);

  // 🛡️ CRITICAL FIX: Memoize particle configurations
  const particleOptions = useMemo(() => {
    return {
      autoPlay: true,
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: optimizedColors,
        },
        links: {
          color: optimizedColors[0],
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: particleCount,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    } as ISourceOptions;
  }, [optimizedColors, particleCount]);

  // 🛡️ CRITICAL FIX: Stable callback to prevent re-initialization
  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadSlim(engine);
    } catch (error) {
      console.error("Failed to load particles engine:", error);
    }
  }, []);

  // 🚨 SSR/CSR PROTECTION - Check after all hooks are defined
  if (typeof window === "undefined") {
    return (
      <div className={cn("absolute inset-0 pointer-events-none", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-hope-gold/5 via-transparent to-courage-blue/5" />
      </div>
    );
  }

  // 🛡️ CIRCUIT BREAKER: Prevent infinite renders
  renderCountRef.current++;
  if (renderCountRef.current > 100) {
    console.warn(
      "🚨 DivineParticles: Circuit breaker activated - too many renders",
    );
    return (
      <div className={cn("absolute inset-0 pointer-events-none", className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-hope-gold/5 via-transparent to-courage-blue/5" />
      </div>
    );
  }

  // 🛡️ CRITICAL FIX: Add error boundary fallback
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (
        error.message.includes("tsparticles") ||
        error.message.includes("particles")
      ) {
        console.warn(
          "Particles error caught and handled gracefully:",
          error.message,
        );
        return true; // Prevent error propagation
      }
      return false;
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  // 🛡️ CRITICAL FIX: Memoize the entire Particles component to prevent re-renders
  const ParticlesComponent = useMemo(() => {
    return (
      <Particles
        id="divine-particles"
        onInit={particlesInit}
        options={particleOptions}
        className={cn("absolute inset-0 pointer-events-none", className)}
      />
    );
  }, [particlesInit, particleOptions, className]);

  return ParticlesComponent;
};

// Export the wrapped component
export const DivineParticles = withDivineErrorBoundary(DivineParticlesBase, {
  componentName: "DivineParticles",
  role: "guardian",
});

// Default export for backward compatibility
export default DivineParticles;
