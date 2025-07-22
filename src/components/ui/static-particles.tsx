import React from "react";
import { cn } from "@/lib/utils";

interface StaticParticlesProps {
  variant?: "divine" | "sacred" | "minimal" | "spiritual";
  density?: "low" | "medium" | "high";
  className?: string;
}

export default function StaticParticles({
  variant = "divine",
  density = "medium",
  className = "",
}: StaticParticlesProps) {
  // Generate particle count based on density
  const particleCount = {
    low: 12,
    medium: 20,
    high: 35,
  }[density];

  // Create array of particles with random positions and animation delays
  const particles = Array.from({ length: particleCount }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 25,
    size: 2 + Math.random() * 6,
    opacity: 0.1 + Math.random() * 0.4,
  }));

  // Variant-specific configurations
  const variantConfig = {
    divine: {
      colors: ["bg-yellow-400", "bg-purple-400", "bg-blue-400", "bg-pink-400"],
      glowClass: "shadow-lg shadow-yellow-400/20",
      animationClass: "animate-float-divine",
    },
    sacred: {
      colors: ["bg-blue-400", "bg-indigo-400", "bg-purple-400"],
      glowClass: "shadow-lg shadow-blue-400/20",
      animationClass: "animate-float-sacred",
    },
    minimal: {
      colors: ["bg-gray-300", "bg-white", "bg-gray-400"],
      glowClass: "shadow-sm shadow-white/10",
      animationClass: "animate-float-minimal",
    },
    spiritual: {
      colors: ["bg-green-400", "bg-teal-400", "bg-emerald-400"],
      glowClass: "shadow-lg shadow-green-400/20",
      animationClass: "animate-float-spiritual",
    },
  };

  const config = variantConfig[variant];

  return (
    <>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-divine {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(20px, -30px) rotate(90deg) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translate(-10px, -60px) rotate(180deg) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(-25px, -30px) rotate(270deg) scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes float-sacred {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-40px) scale(1.1);
            opacity: 0.6;
          }
          66% {
            transform: translateY(-20px) scale(0.9);
            opacity: 0.4;
          }
        }

        @keyframes float-minimal {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translate(10px, -20px) scale(1.05);
            opacity: 0.3;
          }
        }

        @keyframes float-spiritual {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.25;
          }
          25% {
            transform: translate(15px, -25px) rotate(45deg);
            opacity: 0.5;
          }
          75% {
            transform: translate(-15px, -45px) rotate(-45deg);
            opacity: 0.4;
          }
        }

        .animate-float-divine {
          animation: float-divine var(--duration, 20s) infinite ease-in-out;
        }
        .animate-float-sacred {
          animation: float-sacred var(--duration, 18s) infinite ease-in-out;
        }
        .animate-float-minimal {
          animation: float-minimal var(--duration, 25s) infinite ease-in-out;
        }
        .animate-float-spiritual {
          animation: float-spiritual var(--duration, 22s) infinite ease-in-out;
        }
      `}</style>

      {/* Particle Container */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden",
          className,
        )}
        aria-hidden="true"
      >
        {/* Background Gradient Overlay for depth */}
        <div
          className={cn("absolute inset-0 opacity-20", {
            "bg-gradient-radial from-yellow-400/5 via-transparent to-purple-400/5":
              variant === "divine",
            "bg-gradient-radial from-blue-400/5 via-transparent to-indigo-400/5":
              variant === "sacred",
            "bg-gradient-radial from-gray-300/3 via-transparent to-white/3":
              variant === "minimal",
            "bg-gradient-radial from-green-400/5 via-transparent to-teal-400/5":
              variant === "spiritual",
          })}
        />

        {/* Animated Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={cn(
              "absolute rounded-full blur-sm",
              config.colors[particle.id % config.colors.length],
              config.glowClass,
              config.animationClass,
            )}
            style={
              {
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                animationDelay: `${particle.delay}s`,
                "--duration": `${particle.duration}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Large floating orbs for visual interest */}
        {density !== "minimal" && (
          <>
            <div
              className={cn(
                "absolute w-24 h-24 rounded-full blur-xl opacity-10",
                config.colors[0],
                "animate-pulse",
              )}
              style={{
                left: "10%",
                top: "20%",
                animationDuration: "8s",
              }}
            />
            <div
              className={cn(
                "absolute w-32 h-32 rounded-full blur-2xl opacity-5",
                config.colors[1],
                "animate-pulse",
              )}
              style={{
                right: "15%",
                bottom: "25%",
                animationDuration: "12s",
                animationDelay: "4s",
              }}
            />
          </>
        )}

        {/* Subtle sparkle effects */}
        {variant === "divine" && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
