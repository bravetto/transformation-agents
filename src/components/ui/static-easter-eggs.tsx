"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Star, Crown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StaticEasterEggProps {
  eggId: string;
  children: React.ReactNode;
  triggerType?: "click" | "hover" | "double-click";
  variant?: "sparkle" | "heart" | "divine" | "crown" | "zap";
  className?: string;
}

interface EasterEggConfig {
  icon: React.ReactNode;
  colors: string[];
  message: string;
  sound?: string; // For future audio implementation
}

// Easter egg configurations that were previously dynamic
const EASTER_EGG_CONFIGS: Record<string, EasterEggConfig> = {
  "risen-logo-hover": {
    icon: <Crown className="w-6 h-6" />,
    colors: ["#FFD700", "#FFA500", "#FF6347"],
    message:
      "The King has risen! JAHmere's freedom comes through divine intervention.",
    sound: "chime",
  },
  "footer-cross-click": {
    icon: <Star className="w-6 h-6" />,
    colors: ["#9B59B6", "#8E44AD", "#AF7AC5"],
    message: "Every prayer for JAHmere creates ripples in the spiritual realm.",
    sound: "bell",
  },
  "service-worker": {
    icon: <Zap className="w-6 h-6" />,
    colors: ["#E74C3C", "#C0392B", "#EC7063"],
    message:
      "The divine service worker is active - JAHmere's freedom is being processed in the courts of heaven.",
    sound: "power",
  },
  console: {
    icon: <Sparkles className="w-6 h-6" />,
    colors: ["#3498DB", "#2980B9", "#5DADE2"],
    message:
      "Even technical challenges become divine revelations in JAHmere's story.",
    sound: "magic",
  },
  prophecy: {
    icon: <Heart className="w-6 h-6" />,
    colors: ["#E91E63", "#C2185B", "#F06292"],
    message:
      "July 28, 2025 - A date written in the stars for JAHmere's liberation.",
    sound: "heart",
  },
};

const ParticleEffect = ({
  colors,
  show,
}: {
  colors: string[];
  show: boolean;
}) => (
  <AnimatePresence>
    {show && (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: "50%",
              y: "50%",
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 1.2],
              x: `${50 + (Math.random() - 0.5) * 200}%`,
              y: `${50 + (Math.random() - 0.5) * 200}%`,
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut",
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: colors[i % colors.length],
              boxShadow: `0 0 10px ${colors[i % colors.length]}40`,
            }}
          />
        ))}
      </div>
    )}
  </AnimatePresence>
);

const EasterEggMessage = ({
  message,
  icon,
  colors,
  show,
  onClose,
}: {
  message: string;
  icon: React.ReactNode;
  colors: string[];
  show: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <motion.div
          initial={{ rotate: -3 }}
          animate={{ rotate: 0 }}
          className="relative bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto"
          style={{
            background: `linear-gradient(135deg, ${colors[0]}20, ${colors[1]}10, white)`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg" style={{ background: colors[0] }}>
              {React.cloneElement(icon as React.ReactElement, {
                className: "w-6 h-6 text-white",
              })}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Divine Discovery!</h3>
              <p className="text-sm text-gray-600">You found an easter egg</p>
            </div>
          </div>

          <p className="text-gray-800 leading-relaxed mb-4">{message}</p>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              Amen ✨
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function StaticEasterEgg({
  eggId,
  children,
  triggerType = "click",
  variant = "sparkle",
  className = "",
}: StaticEasterEggProps) {
  const [showEffect, setShowEffect] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const config = EASTER_EGG_CONFIGS[eggId] || EASTER_EGG_CONFIGS["prophecy"];

  const handleTrigger = () => {
    setShowEffect(true);
    setTimeout(() => {
      setShowMessage(true);
      setShowEffect(false);
    }, 500);
  };

  const handleDoubleClick = () => {
    if (triggerType === "double-click") {
      handleTrigger();
    }
  };

  const handleHover = () => {
    if (triggerType === "hover") {
      handleTrigger();
    }
  };

  const handleClick = () => {
    if (triggerType === "click") {
      handleTrigger();
    }
  };

  return (
    <>
      <div
        className={cn(
          "relative inline-block cursor-pointer transition-transform hover:scale-105",
          className,
        )}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleHover}
      >
        {children}
        <ParticleEffect colors={config.colors} show={showEffect} />
      </div>

      <EasterEggMessage
        message={config.message}
        icon={config.icon}
        colors={config.colors}
        show={showMessage}
        onClose={() => setShowMessage(false)}
      />
    </>
  );
}

// Specialized component for synchronicity-based easter eggs
export function StaticSynchronicityEgg({
  trigger,
  children,
  className = "",
}: {
  trigger: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <StaticEasterEgg
      eggId={trigger}
      triggerType="click"
      variant="divine"
      className={className}
    >
      {children}
    </StaticEasterEgg>
  );
}

// Pre-configured easter eggs for common use cases
export const LogoEasterEgg = ({ children }: { children: React.ReactNode }) => (
  <StaticEasterEgg eggId="risen-logo-hover" triggerType="hover" variant="crown">
    {children}
  </StaticEasterEgg>
);

export const CrossEasterEgg = ({ children }: { children: React.ReactNode }) => (
  <StaticEasterEgg
    eggId="footer-cross-click"
    triggerType="click"
    variant="heart"
  >
    {children}
  </StaticEasterEgg>
);

export const ServiceWorkerEasterEgg = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <StaticEasterEgg eggId="service-worker" triggerType="click" variant="zap">
    {children}
  </StaticEasterEgg>
);

export const ConsoleEasterEgg = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <StaticEasterEgg eggId="console" triggerType="click" variant="sparkle">
    {children}
  </StaticEasterEgg>
);
