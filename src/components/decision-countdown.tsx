"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import PropheticCountdown from "./prophetic-countdown";
import { Button } from "@/components/ui/button";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { logger } from "@/lib/logger";

// Types for the component props
export interface DecisionCountdownProps {
  targetDate?: Date;
  className?: string;
  showModal?: boolean;
  onClose?: () => void;
  ctaLink?: string;
  ctaText?: string;
}

// Flip animation variants for smooth transitions
const flipVariants = {
  initial: { rotateX: -90, opacity: 0 },
  animate: { rotateX: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { rotateX: 90, opacity: 0, transition: { duration: 0.3 } },
};

// Component to display Judge Ferrero's decision countdown
function DecisionCountdown({
  targetDate = new Date(new Date().setDate(new Date().getDate() + 14)), // Default to 14 days from now
  className = "",
  showModal = false,
  onClose,
  ctaLink = "/the-case", // Default link to the case page
  ctaText = "View Case Details",
}: DecisionCountdownProps) {
  // State for tracking if the user has seen this countdown before
  const [hasSeenCountdown, setHasSeenCountdown] = useState(false);

  // Check if user has seen the countdown before
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("hasSeenDecisionCountdown");
      setHasSeenCountdown(storedValue === "true");
    }
  }, []);

  // Handler for when user dismisses the modal
  const handleClose = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenDecisionCountdown", "true");
    }
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // For milestone reached callback
  const handleMilestoneReached = useCallback(() => {
    logger.divine("Decision time has arrived!");
    // Could trigger additional actions here
  }, []);

  // If rendering as a modal
  if (showModal && !hasSeenCountdown) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="p-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-bold text-center mb-4">
                Judge Ferrero's Decision is Coming
              </h2>

              <div className="mb-6">
                {process.env.NODE_ENV !== "production" ? (
                  <PropheticCountdown
                    targetDate={targetDate}
                    milestone="Until Judge Ferrero's Decision"
                    role="messenger"
                    showProgress={true}
                    onMilestoneReached={handleMilestoneReached}
                  />
                ) : (
                  <div className="bg-purple-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 shadow-xl text-center">
                    <div className="text-purple-100 text-sm">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>⚖️ Decision Timeline Protected</span>
                      </div>
                      <div className="text-xs text-purple-300 mb-2">
                        Judge Ferrero's decision approaches in divine timing
                      </div>
                      <div className="text-xs text-purple-400">
                        "He has made everything beautiful in its time" -
                        Ecclesiastes 3:11
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                The time to act is now. Your support could make the difference
                in this critical decision.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={ctaLink} className="flex-1">
                  <Button className="w-full" variant="default">
                    {ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={handleClose}
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Default inline display
  return (
    <div className={cn("decision-countdown", className)}>
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md">
        <div className="p-4">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-hope-gold mr-2" />
            <h3 className="text-lg font-semibold">Judge Ferrero's Decision</h3>
          </div>
          <PropheticCountdown
            targetDate={targetDate}
            milestone="Time Remaining"
            role="messenger"
            showProgress={true}
            onMilestoneReached={handleMilestoneReached}
            className="mb-4"
          />
          <div className="mt-4 text-center">
            <Link href={ctaLink}>
              <Button size="sm" variant="outline" className="w-full">
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export with divine error boundary for production safety
export default withDivineErrorBoundary(DecisionCountdown, {
  componentName: "DecisionCountdown",
  role: "messenger",
});
