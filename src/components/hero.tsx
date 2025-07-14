"use client";

import { useState, useEffect, useCallback } from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Calendar, Shield, ChevronDown, Users } from "lucide-react";
import Section from "./section";

function Hero() {
  const [daysSinceLaunch, setDaysSinceLaunch] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const { scrollYProgress } = useScroll();
  const [performanceTier, setPerformanceTier] = useState<
    "low" | "medium" | "high"
  >("medium");

  // Transform scroll progress to background Y position for parallax
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Determine if we should use parallax based on performance
  const useParallax = performanceTier !== "low";

  // Add mouse move handler for subtle parallax effect with useCallback to prevent infinite loops
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Normalize mouse position between -1 and 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMouseX(x);
    setMouseY(y);
  }, []); // Empty dependencies since setMouseX and setMouseY are stable

  useEffect(() => {
    setMounted(true);

    // Calculate days since launch - Update to July 4th, 2025
    try {
      const launchDate = new Date("2025-07-04");
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - launchDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysSinceLaunch(diffDays);
    } catch (err) {
      // Fallback value if calculation fails
      setDaysSinceLaunch(3);
    }

    // Detect device performance with proper feature detection
    const detectPerformance = () => {
      if (typeof window === "undefined") return "medium";

      // Check for low-end devices or data-saving modes
      const isLowEndDevice =
        window.innerWidth < 768 ||
        (typeof (navigator as any).connection !== "undefined" &&
          ((navigator as any).connection.effectiveType === "slow-2g" ||
            (navigator as any).connection.effectiveType === "2g"));

      const hasSlowConnection =
        typeof (navigator as any).connection !== "undefined" &&
        (navigator as any).connection.saveData;

      if (isLowEndDevice || hasSlowConnection) {
        return "low";
      }

      // Check for high-end devices
      const isHighEndDevice =
        typeof window.navigator.hardwareConcurrency !== "undefined" &&
        window.navigator.hardwareConcurrency >= 8 &&
        window.innerWidth >= 1280;

      const hasNoSaveData =
        typeof (navigator as any).connection !== "undefined" &&
        !(navigator as any).connection.saveData;

      if (isHighEndDevice && hasNoSaveData) {
        return "high";
      }

      return "medium";
    };

    setPerformanceTier(detectPerformance());

    // Only add mouse move listener on medium/high performance devices
    if (detectPerformance() !== "low") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [handleMouseMove]); // Include handleMouseMove in dependencies

  if (!mounted) return null;

  return (
    <Section
      variant="hero"
      className="hero-section relative overflow-hidden"
      container={false}
    >
      {/* Subtle gradient background with parallax effect - only on medium/high performance devices */}
      {useParallax ? (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-hope-gold/5 to-courage-blue/5"
          style={{ y: bgY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-hope-gold/5 to-courage-blue/5" />
      )}

      {/* Main Content - PROPERLY CENTERED */}
      <Container className="content-center relative z-10">
        {/* Elite particle container for divine justice effect */}
        <div className="particle-system-v10 absolute inset-0 pointer-events-none">
          {/* Generate 25 particles with deterministic positions for optimal performance */}
          {[
            { left: 12.5, delay: 0, duration: 15 },
            { left: 25.8, delay: 1.5, duration: 18.3 },
            { left: 67.2, delay: 3, duration: 20.7 },
            { left: 89.1, delay: 4.5, duration: 16.2 },
            { left: 34.6, delay: 6, duration: 22.1 },
            { left: 78.3, delay: 7.5, duration: 17.8 },
            { left: 45.9, delay: 9, duration: 19.4 },
            { left: 91.7, delay: 10.5, duration: 21.6 },
            { left: 18.4, delay: 12, duration: 18.9 },
            { left: 56.2, delay: 13.5, duration: 20.3 },
            { left: 73.8, delay: 0.7, duration: 16.7 },
            { left: 29.5, delay: 2.2, duration: 23.1 },
            { left: 82.1, delay: 3.7, duration: 17.4 },
            { left: 41.3, delay: 5.2, duration: 19.8 },
            { left: 65.7, delay: 6.7, duration: 21.2 },
            { left: 93.4, delay: 8.2, duration: 18.6 },
            { left: 27.8, delay: 9.7, duration: 20.9 },
            { left: 58.6, delay: 11.2, duration: 16.4 },
            { left: 76.9, delay: 12.7, duration: 22.7 },
            { left: 39.2, delay: 14.2, duration: 17.1 },
            { left: 84.5, delay: 0.3, duration: 19.5 },
            { left: 52.1, delay: 1.8, duration: 21.8 },
            { left: 71.6, delay: 3.3, duration: 18.2 },
            { left: 33.9, delay: 4.8, duration: 20.6 },
            { left: 87.2, delay: 6.3, duration: 16.9 },
          ].map((particle, i) => (
            <div
              key={i}
              className="particle-v10"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                width: `${2 + (i % 6)}px`,
                height: `${2 + (i % 6)}px`,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center text-center space-y-8">
          {/* Enhanced headline with DIVINE BREATHING LIFE */}
          <h1 className="hero-heading text-responsive-hero overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                // DIVINE BREATHING ANIMATION
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="inline-block"
            >
              Tony Dungy Believes in JAHmere.{" "}
            </motion.span>
            <motion.span
              className="highlight-value inline-block gradient-text-v10"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{
                opacity: 1,
                scale: [1, 1.05, 1],
                // DIVINE GLOW PULSING
                textShadow: [
                  "0 0 20px rgba(255, 107, 53, 0.5)",
                  "0 0 40px rgba(255, 107, 53, 0.8)",
                  "0 0 20px rgba(255, 107, 53, 0.5)",
                ],
              }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                textShadow: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              Will Judge Ferrero?
            </motion.span>
          </h1>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-subheading text-responsive-sub"
          >
            <Text size="lg" className="text-gentle-charcoal">
              Why Judge Ferrero should consider The Bridge Project for JAHmere
              Webb
            </Text>
          </motion.div>

          {/* Real-time credibility - centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <Badge variant="outline" className="badge-hero">
              <Shield className="h-4 w-4 mr-2" />
              <span className="font-medium">Zero Cost to State</span>
            </Badge>
            <Badge variant="outline" className="badge-hero">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-medium">NFL Hall of Famer Endorsed</span>
            </Badge>
            <Badge variant="outline" className="badge-hero">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="font-medium">24/7 Accountability</span>
            </Badge>
          </motion.div>

          {/* CTA Buttons - DIVINE HEARTBEAT ALIVE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              // DIVINE HEARTBEAT BREATHING
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 0.5,
              delay: 0.8,
              scale: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="cta-group"
          >
            <Link href="/letter-form-test" className="w-full sm:w-auto">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px rgba(255, 107, 53, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  // DIVINE GLOW PULSE
                  boxShadow: [
                    "0 0 20px rgba(255, 107, 53, 0.3)",
                    "0 0 40px rgba(255, 107, 53, 0.6)",
                    "0 0 20px rgba(255, 107, 53, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="inline-block rounded-md"
              >
                <Button
                  variant="primary"
                  size="xl"
                  className="hero-primary-cta cta-pulse relative overflow-hidden group w-full sm:w-auto btn-primary-v10"
                >
                  <motion.div
                    className="flex items-center justify-center relative z-10"
                    animate={{
                      // DIVINE TEXT BREATHING
                      scale: [1, 1.01, 1],
                    }}
                    transition={{
                      scale: {
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <span className="relative z-2">
                      Write Letter to Judge Ferrero
                    </span>
                    <motion.div
                      className="ml-2"
                      animate={{
                        x: [0, 5, 0],
                        // DIVINE ARROW PULSE
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          duration: 1.5,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        },
                        scale: {
                          repeat: Infinity,
                          duration: 1.2,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Scroll indicator - DIVINE FLOATING LIFE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              // DIVINE FLOATING MOTION
              y: [0, -5, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 0.5,
              delay: 1.2,
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
                // DIVINE GLOW BREATHING
                filter: [
                  "drop-shadow(0 0 10px rgba(255, 107, 53, 0.3))",
                  "drop-shadow(0 0 20px rgba(255, 107, 53, 0.6))",
                  "drop-shadow(0 0 10px rgba(255, 107, 53, 0.3))",
                ],
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                },
                filter: {
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                scale: 1.2,
                filter: "drop-shadow(0 0 30px rgba(255, 107, 53, 0.8))",
              }}
              className="cursor-pointer"
            >
              <ChevronDown className="h-8 w-8 text-gentle-charcoal hover:text-hope-gold transition-colors" />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

export default withErrorBoundary(Hero, {
  componentName: "Hero",
  id: "hero",
});
