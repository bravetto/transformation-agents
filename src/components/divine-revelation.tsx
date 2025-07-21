"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion, AnimatePresence } from "framer-motion";

// DivineParticles removed for hydration stability

import { cn } from "@/lib/utils";

import type { DivineRole } from "@/lib/design-system";

interface DivineRevelationProps {
  role?: DivineRole;
  className?: string;
}

const revelations = [
  {
    title: "The Sacred Truth",
    message: "No corrupt institution is safe from God's LOVE.",
    description: "The walls will shake with forbidden transformation.",
  },
  {
    title: "The Divine Command",
    message: "Sweet Children, attack each other over love no more.",
    description: "For it is not yours to own, nor yours to hide.",
  },
  {
    title: "The Holy Declaration",
    message: "IT IS MY LOVE, SWEET DIVINITY",
    description: "And you may hoard it no more!",
  },
];

const revelationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.8,
    },
  },
};

const particleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function DivineRevelation({
  role = "default",
  className,
}: DivineRevelationProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % revelations.length);
    }, 7000); // Change every 7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-gradient-to-b from-gray-900 to-black",
        className,
      )}
    >
      {/* Sacred particle effects */}
      <motion.div
        variants={particleVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0"
      >
        <DivineParticles
          variant="sacred"
          className="h-full w-full opacity-40"
        />
      </motion.div>

      {/* Divine revelations */}
      <div className="relative z-10 container mx-auto px-4">
        <AnimatePresence mode="wait">
          {revelations.map(
            (revelation, index) =>
              activeIndex === index && (
                <motion.div
                  key={revelation.title}
                  variants={revelationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center"
                >
                  <motion.h2
                    className="text-2xl font-light text-white/80 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {revelation.title}
                  </motion.h2>

                  <motion.div
                    className="text-5xl md:text-7xl font-bold mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="bg-gradient-to-r from-white via-hope-gold to-white bg-clip-text text-transparent">
                      {revelation.message}
                    </span>
                  </motion.div>

                  <motion.p
                    className="text-xl md:text-2xl text-white/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {revelation.description}
                  </motion.p>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Sacred light rays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-conic from-hope-gold/20 via-transparent to-hope-gold/20 animate-spin-slow" />
      </div>
    </div>
  );
}

export default withErrorBoundary(DivineRevelation, {
  componentName: "DivineRevelation",
  id: "divinerevelation",
});
