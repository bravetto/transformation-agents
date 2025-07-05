"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions, Container } from "@tsparticles/engine";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import type { DivineRole } from "@/components/ui/divine-error-boundary";

// Define the props interface with enhanced options
export interface DivineParticlesProps {
  variant?: "sacred" | "hope" | "transformation" | "minimal";
  intensity?: "low" | "medium" | "high" | "auto";
  role?: DivineRole;
  interactive?: boolean;
  color?: string;
  className?: string;
  onReady?: (container: Container) => void;
}

// FPS monitor interface for performance tracking
interface FPSMonitor {
  fps: number;
  samples: number[];
  lastTime: number;
  sampleCount: number;
  measuring: boolean;
}

// Performance metrics for auto-optimization
interface PerformanceMetrics {
  fps: number;
  deviceTier: "low" | "medium" | "high";
  reducedMotion: boolean;
  supportsRAF: boolean;
  lastOptimization: number;
}

// Role-specific styling and particle configurations
const roleConfigs = {
  lightworker: {
    colors: ["#FCD34D", "#F59E0B", "#FFFFFF", "#FBBF24"],
    gradientClass: "from-amber-500 via-orange-500 to-yellow-500",
    shape: ["star", "circle"],
    direction: "top",
    emitterTrigger: "particleClick",
    primaryColor: "#F59E0B", // amber-500
    secondaryColor: "#FBBF24", // amber-400
  },
  messenger: {
    colors: ["#3B82F6", "#6366F1", "#A5B4FC", "#93C5FD"],
    gradientClass: "from-blue-500 via-indigo-500 to-purple-500",
    shape: ["triangle", "circle"],
    direction: "none",
    emitterTrigger: "particleClick",
    primaryColor: "#3B82F6", // blue-500
    secondaryColor: "#6366F1", // indigo-500
  },
  witness: {
    colors: ["#10B981", "#14B8A6", "#5EEAD4", "#A7F3D0"],
    gradientClass: "from-emerald-500 via-teal-500 to-cyan-500",
    shape: ["circle", "square"],
    direction: "bottom-right",
    emitterTrigger: "buttonClick",
    primaryColor: "#10B981", // emerald-500
    secondaryColor: "#14B8A6", // teal-500
  },
  guardian: {
    colors: ["#8B5CF6", "#EC4899", "#F9A8D4", "#C4B5FD"],
    gradientClass: "from-purple-500 via-pink-500 to-rose-500",
    shape: ["pentagon", "circle"],
    direction: "none",
    emitterTrigger: "particleClick",
    primaryColor: "#8B5CF6", // purple-500
    secondaryColor: "#EC4899", // pink-500
  },
};

// Main component implementation
function DivineParticles({
  variant = "sacred",
  intensity = "medium",
  role = "lightworker",
  interactive = true,
  color,
  className = "",
  onReady,
}: DivineParticlesProps) {
  // Reference to the particles container for manual control
  const containerRef = useRef<Container | null>(null);

  // State for performance monitoring and auto-optimization
  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetrics>({
      fps: 60,
      deviceTier: "medium",
      reducedMotion: false,
      supportsRAF: true,
      lastOptimization: Date.now(),
    });

  // Track if component is mounted (for SSR compatibility)
  const [isMounted, setIsMounted] = useState(false);

  // FPS monitor state for performance tracking
  const fpsMonitor = useRef<FPSMonitor>({
    fps: 60,
    samples: [],
    lastTime: 0,
    sampleCount: 0,
    measuring: false,
  });

  // Optimization state - use 'auto' intensity
  const [autoIntensity, setAutoIntensity] = useState<"low" | "medium" | "high">(
    "medium",
  );

  // Determine optimal intensity based on device performance
  const optimalIntensity = intensity === "auto" ? autoIntensity : intensity;

  // Detect device capabilities and user preferences on mount
  useEffect(() => {
    setIsMounted(true);

    // Detect reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Check if requestAnimationFrame is supported
    const supportsRAF =
      typeof window !== "undefined" &&
      typeof window.requestAnimationFrame === "function";

    // Determine device tier based on memory, cpu cores, and user agent
    let deviceTier: "low" | "medium" | "high" = "medium";

    // Check for device memory API
    if (typeof window !== "undefined" && "deviceMemory" in navigator) {
      const memory = (navigator as any).deviceMemory;
      if (memory && typeof memory === "number") {
        if (memory <= 2) deviceTier = "low";
        else if (memory >= 8) deviceTier = "high";
      }
    }

    // Check for mobile devices
    const isMobile =
      typeof window !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      deviceTier = deviceTier === "high" ? "medium" : "low";
    }

    // Set initial auto intensity based on device tier and reduced motion
    const initialIntensity = prefersReducedMotion
      ? "low"
      : deviceTier === "low"
        ? "low"
        : deviceTier === "medium"
          ? "medium"
          : "high";

    setAutoIntensity(initialIntensity);

    // Update performance metrics
    setPerformanceMetrics({
      fps: 60,
      deviceTier,
      reducedMotion: prefersReducedMotion,
      supportsRAF,
      lastOptimization: Date.now(),
    });

    // Start FPS monitoring if auto intensity is enabled
    if (intensity === "auto" && supportsRAF) {
      startFPSMonitoring();
    }

    // Clean up
    return () => {
      stopFPSMonitoring();
    };
  }, [intensity]);

  // Monitor FPS for auto-optimization
  const startFPSMonitoring = useCallback(() => {
    if (fpsMonitor.current.measuring) return;

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

        // Update component state
        setPerformanceMetrics((prev) => ({
          ...prev,
          fps: fpsMonitor.current.fps,
        }));

        // Auto-optimize if needed
        const timeSinceLastOptimization =
          now - performanceMetrics.lastOptimization;

        // Only optimize every 5 seconds to avoid constant changes
        if (timeSinceLastOptimization > 5000) {
          optimizeBasedOnPerformance(fpsMonitor.current.fps);
        }
      } else {
        fpsMonitor.current.sampleCount++;
      }

      // Continue measuring
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }, [performanceMetrics.lastOptimization]);

  // Stop FPS monitoring
  const stopFPSMonitoring = useCallback(() => {
    fpsMonitor.current.measuring = false;
  }, []);

  // Optimize based on measured performance
  const optimizeBasedOnPerformance = useCallback(
    (currentFPS: number) => {
      // Don't optimize if not using auto intensity
      if (intensity !== "auto") return;

      let newIntensity: "low" | "medium" | "high" = autoIntensity;

      // Adjust intensity based on FPS
      if (currentFPS < 30) {
        // Significant performance issues - drop to low
        newIntensity = "low";
      } else if (currentFPS < 45) {
        // Some performance issues - use medium or low
        newIntensity = autoIntensity === "high" ? "medium" : "low";
      } else if (currentFPS > 55) {
        // Good performance - could increase if currently low
        if (
          autoIntensity === "low" &&
          performanceMetrics.deviceTier !== "low"
        ) {
          newIntensity = "medium";
        } else if (
          autoIntensity === "medium" &&
          performanceMetrics.deviceTier === "high"
        ) {
          newIntensity = "high";
        }
      }

      // Update if changed
      if (newIntensity !== autoIntensity) {
        setAutoIntensity(newIntensity);

        // Update last optimization time
        setPerformanceMetrics((prev) => ({
          ...prev,
          lastOptimization: performance.now(),
        }));

        // If container exists, update particle count
        if (containerRef.current) {
          adjustParticleCount(newIntensity);
        }
      }
    },
    [autoIntensity, intensity, performanceMetrics.deviceTier],
  );

  // Adjust particle count for existing container
  const adjustParticleCount = useCallback(
    (newIntensity: "low" | "medium" | "high") => {
      if (!containerRef.current) return;

      const intensityMap = {
        low: 30,
        medium: 50,
        high: 80,
      };

      // Get current options
      const options = containerRef.current.options;

      if (options.particles?.number) {
        // Update particle count
        containerRef.current.options.particles.number.value =
          intensityMap[newIntensity];

        // Refresh the container
        containerRef.current.refresh();
      }
    },
    [],
  );

  // Initialize particles engine
  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      // Load the slim version of tsParticles
      await loadSlim(engine);

      console.log("Divine Particles initialized successfully");
    } catch (error) {
      console.error("Error initializing Divine Particles:", error);
    }
  }, []);

  // Handle the container ready event
  const handleParticlesLoaded = useCallback(
    (container: Container) => {
      // Store container reference for later use
      containerRef.current = container;

      // Call onReady callback if provided
      if (onReady && typeof onReady === "function") {
        onReady(container);
      }

      // Set up performance monitoring
      if (intensity === "auto" && performanceMetrics.supportsRAF) {
        startFPSMonitoring();
      }
    },
    [intensity, onReady, performanceMetrics.supportsRAF, startFPSMonitoring],
  );

  // Get role-specific configuration
  const roleConfig = useMemo(() => roleConfigs[role], [role]);

  // Get colors based on role and custom color override
  const getParticleColors = useCallback(() => {
    if (color) {
      // If custom color is provided, use it and a lighter variation
      return [color, color, "#FFFFFF"];
    }

    return roleConfig.colors;
  }, [color, roleConfig]);

  // Get shape based on role
  const getParticleShapes = useCallback(() => {
    return roleConfig.shape;
  }, [roleConfig]);

  // Calculate intensity settings based on device performance
  const getIntensitySettings = useCallback(() => {
    // Base settings for each intensity level
    const settings = {
      low: {
        count: performanceMetrics.reducedMotion ? 15 : 30,
        speed: performanceMetrics.reducedMotion ? 0.3 : 0.5,
        size: 2,
      },
      medium: {
        count: performanceMetrics.reducedMotion ? 30 : 50,
        speed: performanceMetrics.reducedMotion ? 0.5 : 1,
        size: 3,
      },
      high: {
        count: performanceMetrics.reducedMotion ? 50 : 80,
        speed: performanceMetrics.reducedMotion ? 0.8 : 1.5,
        size: 4,
      },
    };

    return settings[optimalIntensity];
  }, [optimalIntensity, performanceMetrics.reducedMotion]);

  // Get movement direction based on role
  const getMovementDirection = useCallback(() => {
    // Use reduced motion settings if needed
    if (performanceMetrics.reducedMotion) {
      return "none"; // Static or minimal movement for reduced motion
    }

    return roleConfig.direction;
  }, [roleConfig, performanceMetrics.reducedMotion]);

  // Generate particles configuration based on variant, role, and performance
  const particlesConfig = useMemo(() => {
    // Base configuration for all variants
    const baseConfig = {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: performanceMetrics.reducedMotion ? 30 : 60,
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    };

    // Get intensity settings based on performance
    const settings = getIntensitySettings();

    // Get colors based on role and custom override
    const colors = getParticleColors();

    // Get shapes based on role
    const shapes = getParticleShapes();

    // Get movement direction
    const direction = getMovementDirection();

    // Configure different particle presets based on variant
    switch (variant) {
      case "sacred":
        // Sacred configuration (as shown above)
        return {
          ...baseConfig,
          particles: {
            number: {
              value: settings.count,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: colors,
            },
            shape: {
              type: shapes,
              options: {
                star: {
                  sides: 6,
                },
                polygon: {
                  sides: 5, // pentagon for guardian
                },
                triangle: {
                  sides: 3,
                },
              },
            },
            opacity: {
              value: { min: 0.1, max: 0.8 },
              animation: {
                enable: !performanceMetrics.reducedMotion,
                speed: 1,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: settings.size },
              animation: {
                enable: !performanceMetrics.reducedMotion,
                speed: 2,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: settings.speed,
              direction: direction as any,
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              attract: {
                enable: interactive && !performanceMetrics.reducedMotion,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: colors[0],
              opacity: 0.2,
              width: 1,
              triangles: {
                enable: !performanceMetrics.reducedMotion,
                opacity: 0.1,
              },
            },
          },
          interactivity: interactive
            ? {
                detect_on: "window",
                events: {
                  onHover: {
                    enable: true,
                    mode: performanceMetrics.reducedMotion
                      ? "bubble"
                      : ["grab", "bubble"],
                  },
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 200,
                    links: {
                      opacity: 0.5,
                    },
                  },
                  bubble: {
                    distance: 200,
                    size: settings.size * 2,
                    duration: 2,
                    opacity: 0.8,
                  },
                  push: {
                    quantity: Math.max(2, Math.floor(settings.count / 20)),
                  },
                },
              }
            : {},
        };

      case "hope":
        return {
          ...baseConfig,
          particles: {
            number: {
              value: settings.count * 0.7,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: colors,
            },
            shape: {
              type: shapes,
              options: {
                star: {
                  sides: 6,
                },
                polygon: {
                  sides: 5, // pentagon for guardian
                },
                triangle: {
                  sides: 3,
                },
              },
            },
            opacity: {
              value: { min: 0.3, max: 0.9 },
              animation: {
                enable: !performanceMetrics.reducedMotion,
                speed: 1.5,
                sync: false,
              },
            },
            size: {
              value: { min: 2, max: settings.size + 1 },
              animation: {
                enable: !performanceMetrics.reducedMotion,
                speed: 3,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: settings.speed * 0.8,
              direction: (direction as any) || "top",
              random: false,
              straight: false,
              outModes: {
                default: "out",
              },
              // Add gravity effect for upward movement
              gravity: {
                enable: !performanceMetrics.reducedMotion,
                acceleration: -0.2,
              },
            },
            // Add light effect for hope particles
            tilt: {
              enable: !performanceMetrics.reducedMotion,
              value: {
                min: 0,
                max: 360,
              },
              animation: {
                enable: true,
                speed: 5,
                sync: false,
              },
            },
          },
          interactivity: interactive
            ? {
                detect_on: "window",
                events: {
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  onClick: {
                    enable: true,
                    mode: "bubble",
                  },
                  resize: true,
                },
                modes: {
                  repulse: {
                    distance: 100,
                    duration: 0.4,
                  },
                  bubble: {
                    distance: 150,
                    size: settings.size * 2.5,
                    duration: 2,
                    opacity: 1,
                  },
                },
              }
            : {},
        };

      case "transformation":
        return {
          ...baseConfig,
          particles: {
            number: {
              value: settings.count * 1.2,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: colors,
            },
            shape: {
              type: shapes,
              options: {
                star: {
                  sides: 6,
                },
                polygon: {
                  sides: 5, // pentagon for guardian
                },
                triangle: {
                  sides: 3,
                },
              },
            },
            opacity: {
              value: { min: 0.2, max: 0.7 },
              animation: {
                enable: !performanceMetrics.reducedMotion,
                speed: 2,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: settings.size },
              animation: {
                enable: !performanceMetrics.reducedMotion,
                speed: 4,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: settings.speed,
              direction: direction as any,
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
              trail: {
                enable: !performanceMetrics.reducedMotion,
                fillColor: "#000000",
                length: 10,
              },
              path: {
                enable:
                  !performanceMetrics.reducedMotion &&
                  performanceMetrics.deviceTier !== "low",
                delay: {
                  value: 0.1,
                },
                options: {
                  size: 4,
                  draw: false,
                  stroke: {
                    color: colors[0],
                    width: 0.5,
                    opacity: 0.1,
                  },
                },
              },
            },
            rotate: {
              value: 0,
              random: true,
              direction: "random",
              animation: {
                enable: !performanceMetrics.reducedMotion,
                speed: 5,
                sync: false,
              },
            },
            // Add morphing for transformation particles
            stroke: {
              width: 1,
              color: {
                value: colors[0],
                animation: {
                  enable: !performanceMetrics.reducedMotion,
                  speed: 4,
                  sync: false,
                  opacity: 1,
                },
              },
            },
          },
          interactivity: interactive
            ? {
                detect_on: "window",
                events: {
                  onHover: {
                    enable: true,
                    mode: "connect",
                  },
                  onClick: {
                    enable: true,
                    mode: "emitter",
                  },
                  resize: true,
                },
                modes: {
                  connect: {
                    distance: 120,
                    links: {
                      opacity: 0.8,
                    },
                    radius: 60,
                  },
                  emitter: {
                    direction: "none",
                    rate: {
                      quantity: Math.min(
                        10,
                        performanceMetrics.deviceTier === "low" ? 5 : 10,
                      ),
                      delay: 0.1,
                    },
                    size: {
                      width: 0,
                      height: 0,
                    },
                    position: {
                      x: 50,
                      y: 50,
                    },
                  },
                },
              }
            : {},
        };

      case "minimal":
        return {
          ...baseConfig,
          particles: {
            number: {
              value: settings.count * 0.4,
              density: {
                enable: true,
                value_area: 1200,
              },
            },
            color: {
              value: colors[0],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.1, max: 0.3 },
              animation: {
                enable: !performanceMetrics.reducedMotion,
                speed: 0.5,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 2 },
              animation: {
                enable: false,
              },
            },
            move: {
              enable: true,
              speed: settings.speed * 0.3,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              // Disable all complex animations for minimal mode
              trail: {
                enable: false,
              },
              path: {
                enable: false,
              },
              attract: {
                enable: false,
              },
            },
            // Disable all extra features for minimal performance
            rotate: {
              value: 0,
              animation: {
                enable: false,
              },
            },
            tilt: {
              enable: false,
            },
            roll: {
              enable: false,
            },
            wobble: {
              enable: false,
            },
          },
          interactivity: interactive
            ? {
                detect_on: "window",
                events: {
                  onHover: {
                    enable: true,
                    mode: "bubble",
                  },
                  // Disable click interaction for minimal mode
                  onClick: {
                    enable: false,
                  },
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 100,
                    size: 4,
                    duration: 2,
                    opacity: 0.6,
                  },
                },
              }
            : {},
          // Optimize rendering for minimal mode
          detectRetina: false,
          fpsLimit: 30,
        };

      default:
        return baseConfig;
    }
  }, [
    variant,
    optimalIntensity,
    interactive,
    performanceMetrics.reducedMotion,
    performanceMetrics.deviceTier,
    getIntensitySettings,
    getParticleColors,
    getParticleShapes,
    getMovementDirection,
  ]);

  // Effect for cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up any references
      containerRef.current = null;

      // Stop performance monitoring
      stopFPSMonitoring();

      console.log("Divine Particles cleanup completed");
    };
  }, [stopFPSMonitoring]);

  // Don't render during SSR
  if (!isMounted) return null;

  // Render with error handling
  try {
    // Type assertion needed due to tsParticles API compatibility
    const ParticlesComponent = Particles as React.ComponentType<{
      id: string;
      init: (engine: Engine) => Promise<void>;
      options: ISourceOptions;
      className: string;
      loaded?: (container: Container) => void;
    }>;

    return (
      <>
        {/* Performance debug indicator (development only) */}
        {process.env.NODE_ENV === "development" && intensity === "auto" && (
          <div className="absolute top-0 right-0 z-50 bg-black/30 text-white text-xs px-1 rounded-bl font-mono">
            {performanceMetrics.fps}fps/{autoIntensity}
          </div>
        )}

        {/* Particles component */}
        <ParticlesComponent
          id={`divine-particles-${variant}-${role}`}
          init={particlesInit}
          options={particlesConfig as ISourceOptions}
          className={`absolute inset-0 pointer-events-none ${className}`}
          loaded={handleParticlesLoaded}
        />
      </>
    );
  } catch (error) {
    console.error("Error rendering Divine Particles:", error);

    // Return minimal fallback with some basic styling based on role
    return (
      <div
        className={`absolute inset-0 ${className} bg-gradient-to-br ${roleConfigs[role].gradientClass} opacity-10`}
        aria-hidden="true"
      />
    );
  }
}

// Export with divine error boundary
export default withDivineErrorBoundary(DivineParticles, "messenger", {
  id: "divine-particles",
  onError: (error) => {
    console.error("[DivineParticles] Error caught by boundary:", error);
  },
});
