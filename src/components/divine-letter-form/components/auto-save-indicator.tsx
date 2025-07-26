"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AutoSaveStatus } from "../types";
import { useLetterForm } from "../context";

interface AutoSaveIndicatorProps {
  className?: string;
}

/**
 * Auto-save indicator component
 * Shows the current status of auto-save functionality
 */
export function AutoSaveIndicator({ className }: AutoSaveIndicatorProps) {
  const { autoSaveStatus } = useLetterForm();

  // Status configurations
  const statusConfig: Record<
    AutoSaveStatus,
    { icon: React.ReactNode; text: string; className: string }
  > = {
    idle: {
      icon: <Clock className="w-3 h-3" />,
      text: "Auto-save ready",
      className: "text-gray-400",
    },
    saving: {
      icon: (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Clock className="w-3 h-3" />
        </motion.div>
      ),
      text: "Saving...",
      className: "text-amber-500",
    },
    saved: {
      icon: <Check className="w-3 h-3" />,
      text: "Saved",
      className: "text-green-500",
    },
    error: {
      icon: <AlertTriangle className="w-3 h-3" />,
      text: "Save failed",
      className: "text-red-500",
    },
  };

  const {
    icon,
    text,
    className: statusClassName,
  } = statusConfig[autoSaveStatus];

  return (
    <div className={cn("flex items-center text-xs gap-1.5", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={autoSaveStatus}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={cn("flex items-center gap-1.5", statusClassName)}
        >
          {icon}
          <span>{text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
