"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DivineParticles } from "./divine-particles";
import DivineImage from "./ui/divine-image";
import { cn } from "@/lib/utils";
import type { DivineRole } from "@/lib/design-system";

interface DivineTransformationProps {
  role?: DivineRole;
  children: React.ReactNode;
  className?: string;
  particleVariant?: "sacred" | "flame" | "starfield" | "minimal" | "rain";
}

const roleConfig = {
  lightworker: {
    gradientClass: "from-amber-500 via-orange-500 to-yellow-500",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    textClass: "text-amber-800 dark:text-amber-300",
    borderClass: "border-amber-200 dark:border-amber-800/50",
  },
  messenger: {
    gradientClass: "from-blue-500 via-indigo-500 to-purple-500",
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    textClass: "text-blue-800 dark:text-blue-300",
    borderClass: "border-blue-200 dark:border-blue-800/50",
  },
  witness: {
    gradientClass: "from-emerald-500 via-teal-500 to-cyan-500",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    textClass: "text-emerald-800 dark:text-emerald-300",
    borderClass: "border-emerald-200 dark:border-emerald-800/50",
  },
  guardian: {
    gradientClass: "from-purple-500 via-pink-500 to-rose-500",
    bgClass: "bg-purple-50 dark:bg-purple-950/30",
    textClass: "text-purple-800 dark:text-purple-300",
    borderClass: "border-purple-200 dark:border-purple-800/50",
  },
  default: {
    gradientClass: "from-hope-gold via-courage-blue to-growth-green",
    bgClass: "bg-gray-50 dark:bg-gray-950/30",
    textClass: "text-gray-800 dark:text-gray-300",
    borderClass: "border-gray-200 dark:border-gray-800/50",
  },
};

export function DivineTransformation({
  role = "default",
  children,
  className,
  particleVariant = "sacred",
}: DivineTransformationProps) {
  const styles = roleConfig[role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-lg border",
        styles.borderClass,
        styles.bgClass,
        className,
      )}
    >
      {/* Divine particles background */}
      <div className="absolute inset-0 z-0">
        <DivineParticles
          role={role}
          variant={particleVariant}
          className="h-full w-full"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 z-0 opacity-10 bg-gradient-to-br",
          styles.gradientClass,
        )}
      />

      {/* Content with divine styling */}
      <div className={cn("relative z-10 p-6", styles.textClass)}>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </div>
    </motion.div>
  );
}
