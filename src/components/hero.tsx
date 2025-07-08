"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Badge,
} from "@/components/ui";
import Link from "next/link";
import { ArrowRight, Calendar, Shield, ChevronDown, Users } from "lucide-react";
import Section from "./section";
import { useScroll, useTransform } from "framer-motion";

export default function Hero() {
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

    // Add mouse move handler for subtle parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouseX(x);
      setMouseY(y);
    };

    // Detect device performance with proper feature detection
    const detectPerformance = () => {
      if (typeof window === "undefined") return "medium";

      // Check for low-end devices or data-saving modes
      const isLowEndDevice =
        window.innerWidth < 768 ||
        (typeof window.navigator.hardwareConcurrency !== "undefined" &&
          window.navigator.hardwareConcurrency <= 4);

      // Safely check connection API
      const hasSlowConnection =
        typeof (navigator as any).connection !== "undefined" &&
        ((navigator as any).connection.saveData === true ||
          (navigator as any).connection.effectiveType === "3g" ||
          (navigator as any).connection.effectiveType === "2g");

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
  }, []);

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
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Enhanced headline with staggered text reveal */}
          <h1 className="hero-heading text-responsive-hero overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              Tony Dungy Believes in JAHmere.{" "}
            </motion.span>
            <motion.span
              className="highlight-value inline-block"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                type: "spring",
                stiffness: 200,
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
            <Text size="lg" className="text-soft-shadow">
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

          {/* CTA Buttons - centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="cta-group"
          >
            <Link href="#letter" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="xl"
                className="hero-primary-cta cta-pulse relative overflow-hidden group w-full sm:w-auto"
              >
                <motion.div
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read Our Proposal to Judge Ferrero
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
          </motion.div>

          {/* Scroll indicator - centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="cursor-pointer"
            >
              <ChevronDown className="h-8 w-8 text-soft-shadow hover:text-hope-gold transition-colors" />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
