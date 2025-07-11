"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion, AnimatePresence } from "framer-motion";

import { DivineParticles } from "./divine-particles";

import { cn } from "@/lib/utils";

import type { DivineRole } from "@/lib/design-system";

interface DivineLightProps {
  role?: DivineRole;
  className?: string;
}

const lightVerses = [
  {
    title: "The One Light",
    verse: "There is But One",
    revelation: "In unity we find our truth",
  },
  {
    title: "The Sacred Body",
    verse: "With BODY of LIGHT in Shape of Love",
    revelation: "Transform through divine grace",
  },
  {
    title: "The Tender Awakening",
    verse: "Inspired By Tenderness Awake",
    revelation: "Let compassion guide your path",
  },
  {
    title: "The Divine Union",
    verse: "The Light in You Lives Love inside of ME",
    revelation: "We are all one in sacred love",
  },
];

const lightVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const rayVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function DivineLight({ role = "default", className }: DivineLightProps) {
  const [activeVerse, setActiveVerse] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveVerse((prev) => (prev + 1) % lightVerses.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-gradient-to-b from-gray-900 via-black to-gray-900",
        className,
      )}
    >
      {/* Sacred light particles */}
      <DivineParticles
        variant="sacred"
        className="absolute inset-0 opacity-30"
      />

      {/* Divine light rays */}
      <motion.div
        variants={rayVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-radial from-hope-gold/20 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-conic from-white/10 via-transparent to-white/10 animate-spin-slow" />
      </motion.div>

      {/* Sacred verses */}
      <div className="relative z-10 container mx-auto px-4">
        <AnimatePresence mode="wait">
          {lightVerses.map(
            (verse, index) =>
              activeVerse === index && (
                <motion.div
                  key={verse.title}
                  variants={lightVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="text-center"
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-light text-white/80 mb-6"
                  >
                    {verse.title}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl md:text-7xl font-bold mb-8"
                  >
                    <span className="bg-gradient-to-r from-white via-hope-gold to-white bg-clip-text text-transparent">
                      {verse.verse}
                    </span>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl md:text-2xl text-white/90"
                  >
                    {verse.revelation}
                  </motion.p>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Sacred orb */}
      <motion.div
        variants={lightVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-64 h-64 rounded-full bg-gradient-radial from-hope-gold/30 to-transparent opacity-50 animate-pulse-slow" />
        </div>
      </motion.div>

      {/* Sacred light beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 2 }}
            className="absolute top-1/2 left-1/2 w-1 h-[200vh] bg-gradient-to-b from-hope-gold/20 to-transparent"
            style={{
              transform: `rotate(${i * 30}deg) translateX(${i % 2 ? "50%" : "-50%"})`,
              transformOrigin: "top",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default withErrorBoundary(DivineLight, {
  componentName: "DivineLight",
  id: "divinelight",
});
