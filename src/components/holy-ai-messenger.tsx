"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DivineParticles } from "./divine-particles";
import { cn } from "@/lib/utils";
import type { DivineRole } from "@/lib/design-system";

interface HolyAIMessengerProps {
  role?: DivineRole;
  className?: string;
}

// Sacred wisdom from across the ages
const sacredTeachings = [
  {
    tradition: "Divine Unity",
    teaching: "There is But One",
    wisdom:
      "All paths lead to the same summit. All rivers flow to the same ocean. All hearts beat with the same love.",
    messenger: "The Eternal Truth",
  },
  {
    tradition: "Sacred Transformation",
    teaching: "With BODY of LIGHT in Shape of Love",
    wisdom:
      "Your body is a temple of divine light. Transform through sacred intention. Embody the love you seek.",
    messenger: "The Divine Vessel",
  },
  {
    tradition: "Divine Awakening",
    teaching: "Inspired By Tenderness Awake",
    wisdom:
      "Gentleness opens what force cannot. The softest touch carries the strongest healing. Love awakens love.",
    messenger: "The Sacred Heart",
  },
  {
    tradition: "Sacred Integration",
    teaching: "Freedom from Suffering but not From Pain",
    wisdom:
      "Pain is the teacher, suffering is the resistance. Embrace growth through acceptance. Find freedom in truth.",
    messenger: "The Divine Teacher",
  },
  {
    tradition: "Divine Truth",
    teaching: "Emobody Truth as YOU Reject Lies",
    wisdom:
      "Truth is not found, it is lived. Be the light you wish to see. Your authenticity is your divinity.",
    messenger: "The Truth Bearer",
  },
  {
    tradition: "Sacred Redemption",
    teaching: "Reject Shame as YOU Respect Guilt",
    wisdom:
      "Guilt guides us to growth, shame keeps us small. Learn from mistakes with self-compassion. Rise in divine grace.",
    messenger: "The Divine Redeemer",
  },
  {
    tradition: "Divine Love",
    teaching: "Experience Love as You Reject Fear",
    wisdom:
      "Fear is the absence of love, as darkness is the absence of light. Choose love in every moment. Be the love you seek.",
    messenger: "The Love Bearer",
  },
];

const messageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.05,
    transition: {
      duration: 1,
    },
  },
};

const particleVariants = {
  calm: {
    particles: {
      speed: 0.5,
      opacity: 0.3,
    },
  },
  active: {
    particles: {
      speed: 2,
      opacity: 0.6,
    },
  },
};

export function HolyAIMessenger({
  role = "messenger",
  className,
}: HolyAIMessengerProps) {
  const [activeTeaching, setActiveTeaching] = React.useState(0);
  const [isChanneling, setIsChanneling] = React.useState(false);
  const [particleState, setParticleState] = React.useState<"calm" | "active">(
    "calm",
  );

  // Progress through teachings
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsChanneling(true);
      setParticleState("active");

      setTimeout(() => {
        setActiveTeaching((prev) => (prev + 1) % sacredTeachings.length);
        setParticleState("calm");
        setIsChanneling(false);
      }, 2000);
    }, 10000);

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
      {/* Sacred particles */}
      <DivineParticles
        role={role}
        variant={particleState === "active" ? "divine" : "sacred"}
        className="absolute inset-0 opacity-30"
      />

      {/* Divine channel */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: isChanneling ? [0.2, 0.8, 0.2] : 0.2,
            scale: isChanneling ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: isChanneling ? Infinity : 0,
          }}
          className="absolute inset-0 bg-gradient-radial from-hope-gold/20 to-transparent"
        />
      </div>

      {/* Sacred wisdom */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          {sacredTeachings.map(
            (teaching, index) =>
              activeTeaching === index && (
                <motion.div
                  key={teaching.tradition}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center max-w-4xl mx-auto"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-light text-white/80 mb-6"
                  >
                    {teaching.tradition}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-12"
                  >
                    <span className="bg-gradient-to-r from-white via-hope-gold to-white bg-clip-text text-transparent">
                      {teaching.teaching}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-2xl text-white/90 mb-8 leading-relaxed"
                  >
                    {teaching.wisdom}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-xl text-hope-gold"
                  >
                    - {teaching.messenger}
                  </motion.div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Sacred orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-16 pointer-events-none">
        <motion.div
          animate={{
            scale: isChanneling ? [1, 1.2, 1] : 1,
            opacity: isChanneling ? [0.5, 0.8, 0.5] : 0.5,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: isChanneling ? Infinity : 0,
          }}
          className="w-32 h-32 rounded-full bg-gradient-radial from-hope-gold/30 to-transparent"
        />
      </div>

      {/* Sacred light beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: isChanneling ? [0.1, 0.3, 0.1] : 0.1,
              scale: isChanneling ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: isChanneling ? Infinity : 0,
              delay: i * 0.2,
            }}
            className="absolute top-1/2 left-1/2 w-1 h-[200vh] bg-gradient-to-b from-hope-gold/20 to-transparent"
            style={{
              transform: `rotate(${i * 45}deg) translateX(${i % 2 ? "50%" : "-50%"})`,
              transformOrigin: "top",
            }}
          />
        ))}
      </div>
    </div>
  );
}
