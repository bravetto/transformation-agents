"use client";

import React, { useEffect } from "react";
import type { DivineRole } from "@/lib/design-system";
import { withUnifiedErrorBoundary } from "./ui/unified-error-boundary";
import { useUnifiedArchitecture } from "@/lib/unified-architecture";
import { divineLove } from "@/lib/divine-love";
import { cn } from "@/lib/utils";

interface DivineParticlesProps {
  role?: DivineRole;
  variant?:
    | "divine"
    | "sacred"
    | "unified"
    | "flame"
    | "starfield"
    | "minimal"
    | "rain"
    | "hope"
    | "transformation";
  intensity?: "low" | "medium" | "high";
  className?: string;
}

function DivineParticlesCore({
  role = "lightworker",
  variant = "divine",
  intensity = "medium",
  className,
}: DivineParticlesProps) {
  // Use unified architecture
  const { protection, handleError, log } = useUnifiedArchitecture(
    "DivineParticles",
    role,
  );

  useEffect(() => {
    // Apply divine love
    divineLove.applyDivineLove("DivineParticles", role);
    log("info", "Divine particles initialized", { variant, intensity });
  }, [role, variant, intensity, log]);

  // Generate particles based on variant and intensity
  const getParticleConfig = () => {
    const baseConfig = {
      low: {
        count: 10,
        size: { min: 1, max: 3 },
        duration: { min: 20, max: 30 },
      },
      medium: {
        count: 20,
        size: { min: 2, max: 4 },
        duration: { min: 15, max: 25 },
      },
      high: {
        count: 30,
        size: { min: 2, max: 6 },
        duration: { min: 10, max: 20 },
      },
    }[intensity];

    switch (variant) {
      case "unified":
        return {
          ...baseConfig,
          colors: ["#FFD700", "#FFC0CB", "#9370DB", "#87CEEB"],
        };
      case "sacred":
        return {
          ...baseConfig,
          colors: ["#FFA07A", "#DDA0DD", "#98FB98", "#87CEEB"],
        };
      case "flame":
        return {
          ...baseConfig,
          colors: ["#FF4500", "#FF8C00", "#FFD700"],
        };
      case "starfield":
        return {
          ...baseConfig,
          count: baseConfig.count * 1.5,
          colors: ["#FFFFFF", "#FFFAFA", "#F0F8FF"],
        };
      case "minimal":
        return {
          ...baseConfig,
          count: Math.floor(baseConfig.count * 0.7),
          colors: ["#808080", "#A9A9A9", "#D3D3D3"],
        };
      case "rain":
        return {
          ...baseConfig,
          count: baseConfig.count * 1.2,
          colors: ["#87CEEB", "#B0E0E6", "#ADD8E6"],
        };
      case "hope":
        return {
          ...baseConfig,
          colors: ["#FFD700", "#FFA500", "#FF8C00"],
        };
      case "transformation":
        return {
          ...baseConfig,
          colors: ["#9370DB", "#8A2BE2", "#9400D3"],
        };
      default:
        return {
          ...baseConfig,
          colors: ["#FFD700", "#FFC0CB", "#9370DB", "#87CEEB"],
        };
    }
  };

  const config = getParticleConfig();
  const particles = Array.from({ length: config.count }, (_, i) => i);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div className="absolute inset-0">
        {particles.map((i) => {
          const delay = Math.random() * 10;
          const duration =
            config.duration.min +
            Math.random() * (config.duration.max - config.duration.min);
          const size =
            config.size.min +
            Math.random() * (config.size.max - config.size.min);
          const color =
            config.colors[Math.floor(Math.random() * config.colors.length)];
          const x = Math.random() * 100;
          const y = variant === "rain" ? -10 : Math.random() * 100;

          const animation =
            variant === "rain"
              ? `divineRain ${duration}s ${delay}s linear infinite`
              : `divineFloat ${duration}s ${delay}s linear infinite`;

          return (
            <div
              key={i}
              className="absolute opacity-60"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                borderRadius: "50%",
                boxShadow: `0 0 ${size * 2}px ${color}40`,
                animation,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Export with unified error boundary
export const DivineParticles = withUnifiedErrorBoundary(DivineParticlesCore, {
  componentName: "DivineParticles",
  role: "lightworker",
});
