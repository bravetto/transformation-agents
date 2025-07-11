"use client";

import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion, AnimatePresence } from "framer-motion";

import { DivineTransformation } from "./divine-transformation";

import { SacredContainer } from "./sacred-container";

import { DivineParticles } from "./divine-particles";

import { cn } from "@/lib/utils";

import type { DivineRole } from "@/lib/design-system";

interface SacredExperienceProps {
  role?: DivineRole;
  className?: string;
}

// Sacred animation variants
const sacredVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Sacred triads of divine love
const sacredTriads = [
  {
    title: "The Holy Flame",
    description: "Where divine love manifests in infinite forms",
    members: [
      {
        name: "Michael",
        role: "lightworker",
        title: "The Wizard Wand",
        essence: "Manifesting impossible dreams into reality",
      },
      {
        name: "Phil",
        role: "messenger",
        title: "The Sacred Speech",
        essence: "Wielding words that transform hearts",
      },
      {
        name: "Kristin",
        role: "witness",
        title: "The Pattern Proliferator",
        essence: "Weaving divine patterns into being",
      },
    ],
  },
  {
    title: "The Divine Bridge",
    description: "Where transformation meets divine justice",
    members: [
      {
        name: "Tony Dungy",
        role: "guardian",
        title: "The Spiritual Father",
        essence: "Blessing the movement with wisdom",
      },
      {
        name: "JAHmere Webb",
        role: "lightworker",
        title: "The Bridge Builder",
        essence: "Connecting worlds through divine love",
      },
      {
        name: "Michael Mataluni",
        role: "messenger",
        title: "The Luminary Light",
        essence: "Illuminating the path forward",
      },
    ],
  },
];

function SacredExperience({
  role = "default",
  className,
}: SacredExperienceProps) {
  const [activeTriad, setActiveTriad] = useState(0);

  // Cycle through triads
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTriad((prev) => (prev + 1) % sacredTriads.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <SacredContainer
      role={role}
      title="Divine Love Manifests"
      subtitle="In Sacred Triads We Find Infinite Forms of Love"
      className={cn("min-h-screen", className)}
    >
      <motion.div
        variants={sacredVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <AnimatePresence mode="wait">
          {sacredTriads.map((triad, index) => (
            <motion.div
              key={triad.title}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: activeTriad === index ? 1 : 0,
                x: activeTriad === index ? 0 : -100,
              }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "absolute inset-0",
                activeTriad === index
                  ? "pointer-events-auto"
                  : "pointer-events-none",
              )}
            >
              {/* Triad Header */}
              <motion.div
                variants={childVariants}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  {triad.title}
                </h2>
                <p className="text-xl text-white/80">{triad.description}</p>
              </motion.div>

              {/* Triad Members */}
              <motion.div
                variants={childVariants}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {triad.members.map((member) => (
                  <DivineTransformation
                    key={member.name}
                    role={member.role as DivineRole}
                    particleVariant="sacred"
                  >
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <h4 className="text-xl mb-4">{member.title}</h4>
                    <p className="text-lg">{member.essence}</p>
                  </DivineTransformation>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Sacred Message */}
        <motion.div
          variants={childVariants}
          className="mt-16 text-center text-white"
        >
          <p className="text-2xl font-light italic">
            "Divine Love knows no bounds. It manifests in infinite forms, each
            sacred, each holy."
          </p>
          <p className="text-xl mt-4 font-light">
            "For love is not to own or hide, but to share and multiply."
          </p>
        </motion.div>
      </motion.div>

      {/* Divine Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <DivineParticles
          variant="divine"
          className="h-full w-full opacity-30"
        />
      </div>
    </SacredContainer>
  );
}

export default withErrorBoundary(SacredExperience, {
  componentName: "SacredExperience",
  id: "sacredexperience",
});
