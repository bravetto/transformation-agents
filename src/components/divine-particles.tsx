"use client"

import { useCallback, useMemo } from "react"
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine, ISourceOptions } from "@tsparticles/engine"
import { withErrorBoundary } from "./with-error-boundary"

interface DivineParticlesProps {
  variant?: 'sacred' | 'hope' | 'transformation' | 'minimal'
  intensity?: 'low' | 'medium' | 'high'
  interactive?: boolean
  className?: string
}

function DivineParticles({ 
  variant = 'sacred', 
  intensity = 'medium',
  interactive = true,
  className = ""
}: DivineParticlesProps) {
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  // Using type assertion for tsParticles configuration due to API compatibility
  const particlesConfig = useMemo(() => {
    const baseConfig = {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    }

    const intensitySettings = {
      low: { count: 30, speed: 0.5, size: 2 },
      medium: { count: 50, speed: 1, size: 3 },
      high: { count: 80, speed: 1.5, size: 4 }
    }

    const settings = intensitySettings[intensity]

    switch (variant) {
      case 'sacred':
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
              value: ["#FCD34D", "#F59E0B", "#FFFFFF", "#D4A017"],
            },
            shape: {
              type: ["circle", "star"],
              options: {
                star: {
                  sides: 6,
                },
              },
            },
            opacity: {
              value: { min: 0.1, max: 0.8 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: settings.size },
              animation: {
                enable: true,
                speed: 2,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: settings.speed,
              direction: "none",
              random: true,
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
            links: {
              enable: true,
              distance: 150,
              color: "#FCD34D",
              opacity: 0.2,
              width: 1,
              triangles: {
                enable: true,
                opacity: 0.1,
              },
            },
          },
          interactivity: interactive ? {
            detect_on: "window",
            events: {
              onHover: {
                enable: true,
                mode: ["grab", "bubble"],
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
                size: 8,
                duration: 2,
                opacity: 0.8,
              },
              push: {
                quantity: 4,
              },
            },
          } : {},
        }

      case 'hope':
        return {
          ...baseConfig,
          particles: {
            number: {
              value: settings.count * 0.7,
              density: {
                enable: true,
                value_area: 800, // Use value_area instead of area
              },
            },
            color: {
              value: ["#FCD34D", "#FFFFFF"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.3, max: 0.9 },
              animation: {
                enable: true,
                speed: 1.5,
                sync: false,
              },
            },
            size: {
              value: { min: 2, max: settings.size + 1 },
              animation: {
                enable: true,
                speed: 3,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: settings.speed * 0.8,
              direction: "top",
              random: false,
              straight: false,
              outModes: {
                default: "out",
              },
            },
          },
          interactivity: interactive ? {
            detect_on: "window", // Use detect_on instead of detectsOn
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              onClick: {
                enable: true,
                mode: "bubble",
              },
              resize: true, // Use boolean instead of object
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              bubble: {
                distance: 150,
                size: 10,
                duration: 2,
                opacity: 1,
              },
            },
          } : {},
        }

      case 'transformation':
        return {
          ...baseConfig,
          particles: {
            number: {
              value: settings.count * 1.2,
              density: {
                enable: true,
                value_area: 1000, // Use value_area instead of area
              },
            },
            color: {
              value: ["#5B21B6", "#7C3AED", "#FCD34D"],
            },
            shape: {
              type: ["circle", "triangle"],
            },
            opacity: {
              value: { min: 0.2, max: 0.7 },
              animation: {
                enable: true,
                speed: 2,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: settings.size },
              animation: {
                enable: true,
                speed: 4,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: settings.speed,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
              trail: { // Use trail instead of bounce
                enable: true,
                fillColor: "#000000",
                length: 10,
              },
              path: {
                enable: false,
              },
            },
            rotate: {
              value: 0,
              random: true,
              direction: "random",
              animation: {
                enable: true,
                speed: 5,
                sync: false,
              },
            },
          },
          interactivity: interactive ? {
            detect_on: "window", // Use detect_on instead of detectsOn
            events: {
              onHover: {
                enable: true,
                mode: "connect",
              },
              onClick: {
                enable: true,
                mode: "emitter",
              },
              resize: true, // Use boolean instead of object
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
                  quantity: 10,
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
          } : {},
        }

      case 'minimal':
        return {
          ...baseConfig,
          particles: {
            number: {
              value: settings.count * 0.4,
              density: {
                enable: true,
                value_area: 1200, // Use value_area instead of area
              },
            },
            color: {
              value: "#FCD34D",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.1, max: 0.3 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 2 },
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
            },
          },
          interactivity: interactive ? {
            detect_on: "window", // Use detect_on instead of detectsOn
            events: {
              onHover: {
                enable: true,
                mode: "bubble",
              },
              resize: true, // Use boolean instead of object
            },
            modes: {
              bubble: {
                distance: 100,
                size: 4,
                duration: 2,
                opacity: 0.6,
              },
            },
          } : {},
        }

      default:
        return baseConfig
    }
  }, [variant, intensity, interactive])

  try {
    // Type assertion needed due to tsParticles API compatibility
    const ParticlesComponent = Particles as React.ComponentType<{
      id: string;
      init: (engine: Engine) => Promise<void>;
      options: ISourceOptions;
      className: string;
    }>;
    
    return (
      <ParticlesComponent
        id={`divine-particles-${variant}`}
        init={particlesInit}
        options={particlesConfig as ISourceOptions}
        className={`absolute inset-0 pointer-events-none ${className}`}
      />
    )
  } catch (error) {
    console.error("Error rendering particles:", error);
    // Return empty div as a fallback
    return <div className={`absolute inset-0 ${className}`} />;
  }
}

// Export with error boundary
export default withErrorBoundary(DivineParticles, {
  componentName: 'Divine Particles',
  id: 'divine-particles'
}); 