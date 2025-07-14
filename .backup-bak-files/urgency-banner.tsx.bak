"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import Link from "next/link";

interface UrgencyBannerProps {
  className?: string;
  onDismiss?: () => void;
  supporterCount?: number;
}

export function UrgencyBanner({
  className,
  onDismiss,
  supporterCount = 247,
}: UrgencyBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-y border-amber-200 overflow-hidden w-full",
            className,
          )}
        >
          <div className="content-center py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm md:text-base font-semibold text-amber-900">
                    Judge Ferrero will decide JAHmere's fate soon
                  </p>
                  <p className="text-xs md:text-sm text-amber-700">
                    Your support could make the difference between prison and
                    rehabilitation
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {supporterCount > 0 && (
                  <div className="flex items-center gap-2 text-sm text-amber-700">
                    <Users className="h-4 w-4" />
                    <span>{supporterCount} supporters</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Link href="#letter">
                    <Button variant="primary" size="sm">
                      Show Support
                    </Button>
                  </Link>

                  <button
                    onClick={handleDismiss}
                    className="p-1.5 rounded-full hover:bg-amber-100 transition-colors"
                    aria-label="Dismiss banner"
                  >
                    <X className="h-4 w-4 text-amber-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Minimal version for mobile
export function MinimalUrgencyBanner({ className }: UrgencyBannerProps) {
  return (
    <div
      className={cn(
        "bg-amber-50 border-b border-amber-200 py-2 w-full",
        className,
      )}
    >
      <div className="content-center">
        <Link
          href="#letter"
          className="flex items-center justify-center gap-2 text-sm"
        >
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <span className="font-medium text-amber-900">
            Decision pending - Add your voice
          </span>
          <span className="text-amber-600">→</span>
        </Link>
      </div>
    </div>
  );
}
