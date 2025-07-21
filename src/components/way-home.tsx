"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion, AnimatePresence } from "framer-motion";

// DivineParticles removed for hydration stability

import { cn } from "@/lib/utils";

import type { DivineRole } from "@/lib/design-system";

interface WayHomeProps {
  role?: DivineRole;
  className?: string;
}

const pathways = [
  {
    title: "From Incarceration",
    destination: "To Transformation",
    description: "Your past is not your destiny. Your greatness awaits.",
    color: "from-courage-blue to-hope-gold",
  },
  {
    title: "From Judgment",
    destination: "To Assessment",
    description:
      "You are not your worst moment. You are your infinite potential.",
    color: "from-growth-green to-hope-gold",
  },
  {
    title: "From Punishment",
    destination: "To Purpose",
    description: "Every trial prepared you for your divine calling.",
    color: "from-love-red to-hope-gold",
  },
  {
    title: "From Isolation",
    destination: "To Divine Alignment",
    description: "You were never alone. Your tribe awaits.",
    color: "from-wisdom-purple to-hope-gold",
  },
  {
    title: "From Hopelessness",
    destination: "To Greatness Zone",
    description: "Your gifts are needed. Your time is now.",
    color: "from-faith-indigo to-hope-gold",
  },
];

const pathVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

function WayHome({ role = "default", className }: WayHomeProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-sacred",
        className,
      )}
    >
      {/* Sacred particles */}
      <DivineParticles
        variant="divine"
        className="absolute inset-0 opacity-30"
      />

      {/* Divine light rays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-30" />
        <div className="absolute inset-0 bg-gradient-conic from-hope-gold/10 via-transparent to-hope-gold/10 animate-spin-slow" />
      </div>

      {/* The sacred paths home */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-16"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-sacred"
        >
          The Way Home
        </motion.h1>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {pathways.map((path, i) => (
            <motion.div
              key={path.title}
              custom={i}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={cn(
                "relative p-8 rounded-lg border-sacred",
                "bg-gradient-to-r bg-opacity-10",
                "hover:shadow-divine transition-divine",
                path.color,
              )}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light text-white/80">
                    {path.title}
                  </h3>
                  <h2 className="text-2xl md:text-4xl font-bold text-sacred mt-2">
                    {path.destination}
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 mt-4">
                    {path.description}
                  </p>
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.3 + 0.5 }}
                  className="flex items-center justify-center"
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center",
                      "bg-gradient-to-br shadow-divine",
                      path.color,
                    )}
                  >
                    <span className="text-2xl">→</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sacred call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-sacred mb-4">
            Your Divine Alignment Awaits
          </h2>
          <p className="text-xl md:text-2xl text-white/90">
            The path is clear. The time is now. Your greatness calls.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default withErrorBoundary(WayHome, {
  componentName: "WayHome",
  id: "wayhome",
});
