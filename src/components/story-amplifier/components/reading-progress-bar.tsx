"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { ReadingProgressBarProps } from "../types";

/**
 * ReadingProgressBar Component
 *
 * Displays a progress bar indicating the user's reading progress through the story
 */
const ReadingProgressBar = ({
  progress,
  className,
}: ReadingProgressBarProps) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50",
        className,
      )}
    >
      <motion.div
        className="h-full bg-blue-600"
        style={{ width: `${progress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

export default withSafeUI(ReadingProgressBar, {
  componentName: "ReadingProgressBar",
});
