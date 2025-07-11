"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import type { ISourceOptions, InteractivityDetect } from "@tsparticles/engine";

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

interface DivineParticlesProps {
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
  className?: string;
}

const DivineParticlesBase = ({
  variant = "light",
  density = "medium",
  interactive = true,
  intensity,
  className,
}: DivineParticlesProps) => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [particleCount, setParticleCount] = useState(50);

  // Get particle count based on device capabilities
  const getParticleCount = useCallback((density: "low" | "medium" | "high") => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (performance as any).memory?.jsHeapSizeLimit || 0;

    const baseCounts = {
      low: 30,
      medium: 50,
      high: 100,
    };

    let multiplier = 1;
    if (cores <= 2 || memory < 1000000000) {
      multiplier = 0.5; // Low-end devices
    } else if (cores >= 8 && memory > 4000000000) {
      multiplier = 2; // High-end devices
    }

    return Math.floor(baseCounts[density] * multiplier);
  }, []);

  // Detect device capabilities and set particle count
  const detectDeviceCapabilities = useCallback(() => {
    const count = getParticleCount(density);
    setParticleCount(count);
  }, [density, getParticleCount]);

  // Check WebGL support and device capabilities on mount
  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setIsWebGLSupported(!!gl);

    // Detect device capabilities
    detectDeviceCapabilities();
  }, [detectDeviceCapabilities]);

  // Color schemes based on variant
  const colors = useMemo(
    () => ({
      light: {
        background: "#FFFBF5",
        particles: ["#4C1D95", "#6D28D9", "#7C3AED"],
      },
      dark: {
        background: "#1F2937",
        particles: ["#9333EA", "#A855F7", "#C084FC"],
      },
      sacred: {
        background: "#FAF5FF",
        particles: ["#6D28D9", "#7C3AED", "#8B5CF6"],
      },
      divine: {
        background: "#FAF5FF",
        particles: ["#FFD700", "#FFA500", "#FF8C00"],
      },
      minimal: {
        background: "#FFFFFF",
        particles: ["#E2E8F0", "#CBD5E1", "#94A3B8"],
      },
      flame: {
        background: "#FEF2F2",
        particles: ["#DC2626", "#EF4444", "#F87171"],
      },
      starfield: {
        background: "#030712",
        particles: ["#FFFFFF", "#E2E8F0", "#CBD5E1"],
      },
      rain: {
        background: "#F0F9FF",
        particles: ["#0EA5E9", "#38BDF8", "#7DD3FC"],
      },
      hope: {
        background: "#ECFDF5",
        particles: ["#10B981", "#34D399", "#6EE7B7"],
      },
      rage: {
        background: "#FEF2F2",
        particles: ["#B91C1C", "#EF4444", "#FCA5A5"],
      },
      unified: {
        background: "#F5F3FF",
        particles: ["#8B5CF6", "#A78BFA", "#C4B5FD"],
      },
    }),
    [],
  );

  // Use the variant or fallback to light if not found
  const safeVariant = variant in colors ? variant : "light";

  // Particle configuration
  const options = useMemo<ISourceOptions>(
    () => ({
      background: {
        color: colors[safeVariant].background,
      },
      particles: {
        number: {
          value: particleCount,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: colors[safeVariant].particles,
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.6,
          random: true,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.3,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 1,
            sync: false,
          },
        },
        links: {
          enable: interactive,
          distance: 150,
          color: colors[safeVariant].particles[0],
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "out",
          },
          attract: {
            enable: interactive,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: interactive
        ? {
            detectsOn: "window" as InteractivityDetect,
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: {
                enable: true,
                delay: 0.5,
              },
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.8,
                },
              },
              push: {
                quantity: 4,
              },
            },
          }
        : undefined,
    }),
    [safeVariant, particleCount, interactive, colors],
  );

  if (!isWebGLSupported) {
    return (
      <div
        className={`fixed inset-0 -z-10 ${className || ""}`}
        style={{ backgroundColor: colors[safeVariant].background }}
      />
    );
  }

  return (
    <ParticlesEngine
      className={`fixed inset-0 -z-10 ${className || ""}`}
      options={options}
    />
  );
};

// Export the wrapped component
export const DivineParticles = withDivineErrorBoundary(DivineParticlesBase, {
  componentName: "DivineParticles",
  role: "guardian",
});

// Default export for backward compatibility
export default DivineParticles;
