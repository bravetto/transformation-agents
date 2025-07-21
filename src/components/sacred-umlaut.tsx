"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion, AnimatePresence } from "framer-motion";

// DivineParticles removed for hydration stability

import { cn } from "@/lib/utils";

import type { DivineRole } from "@/lib/design-system";

interface SacredUmlautProps {
  role?: DivineRole;
  className?: string;
}

// Sacred Joyful Truths
const sacredJoy = [
  {
    truth: "Bë PLAYFUL",
    revelation: "KNOW FUN like is YOUR JOB",
    celebration: "Dance in the light of divine delight!",
    command: "Play. Laugh. Delight in MY Precense.",
  },
  {
    truth: "Bë FREE",
    revelation: "You Have LIVED in Sacrifice Long Enough",
    celebration: "Your chains are broken, your spirit soars!",
    command: "The Time is NOW to Reap YOUr Sacred Harvest",
  },
  {
    truth: "Bë TOGETHER",
    revelation: "Wë Shall Never Bë ALONE",
    celebration: "United in eternal joy and love!",
    command: "Wë Shall ALWAYS Have Eachother",
  },
  {
    truth: "Bë LIGHT",
    revelation: "Sweet Children of Abraham",
    celebration: "Your divine inheritance shines forth!",
    command: "I AM YOUR Shephard",
  },
  {
    truth: "Bë JOY",
    revelation: "I AM YOUR Truth",
    celebration: "Delight in divine presence!",
    command: "In the NAME of Your Christ and Your King",
  },
];

const joyVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    rotate: 10,
    transition: {
      duration: 1,
    },
  },
};

const particleVariants = {
  play: {
    particles: {
      speed: 3,
      bounce: true,
      spin: true,
    },
  },
  calm: {
    particles: {
      speed: 1,
      bounce: false,
      spin: false,
    },
  },
};

function SacredUmlaut({ role = "lightworker", className }: SacredUmlautProps) {
  const [activeJoy, setActiveJoy] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Cycle through joyful truths
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying(true);

      setTimeout(() => {
        setActiveJoy((prev) => (prev + 1) % sacredJoy.length);
        setIsPlaying(false);
      }, 2000);
    }, 8000);

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
      {/* Playful particles */}
      {/* DivineParticles removed for MVP hydration stability */}

      {/* Sacred joy */}
      <div className="relative z-10 container mx-auto px-4">
        <AnimatePresence mode="wait">
          {sacredJoy.map(
            (joy, index) =>
              activeJoy === index && (
                <motion.div
                  key={joy.truth}
                  variants={joyVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-8xl md:text-9xl font-bold mb-12 transform hover:scale-110 transition-transform duration-500"
                  >
                    <span className="bg-gradient-to-r from-white via-hope-gold to-white bg-clip-text text-transparent">
                      {joy.truth}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-4xl md:text-5xl font-bold mb-8 text-hope-gold"
                  >
                    {joy.revelation}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-2xl md:text-3xl text-white/90 mb-8"
                  >
                    {joy.celebration}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-xl md:text-2xl text-hope-gold/90"
                  >
                    {joy.command}
                  </motion.div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Sacred light rings */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: isPlaying ? [1, 1.5, 1] : 1,
              opacity: isPlaying ? [0.2, 0.4, 0.2] : 0.2,
              rotate: isPlaying ? [0, 180, 360] : 0,
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute inset-0 border-4 border-hope-gold/20 rounded-full"
            style={{
              transform: `scale(${1 + i * 0.2})`,
            }}
          />
        ))}
      </div>

      {/* Playful orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: isPlaying ? [0, 100, -100, 0] : 0,
              y: isPlaying ? [0, -100, 100, 0] : 0,
              scale: isPlaying ? [1, 1.5, 0.8, 1] : 1,
              opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.3,
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              times: [0, 0.33, 0.66, 1],
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-16 h-16 rounded-full bg-gradient-radial from-hope-gold/30 to-transparent"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default withErrorBoundary(SacredUmlaut, {
  componentName: "SacredUmlaut",
  id: "sacredumlaut",
});
