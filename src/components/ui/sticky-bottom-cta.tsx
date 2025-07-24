"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StickyBottomCTAProps {
  className?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onDismiss?: () => void;
  showAfterScroll?: number;
  autoShow?: boolean;
}

export function StickyBottomCTA({
  className,
  onPrimaryAction,
  onSecondaryAction,
  onDismiss,
  showAfterScroll = 500,
  autoShow = true,
}: StickyBottomCTAProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position
  useEffect(() => {
    if (!autoShow) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxHeight, 1);

      setScrollProgress(progress);

      // Show after scrolling past threshold
      if (scrolled > showAfterScroll && !isDismissed) {
        setIsVisible(true);
      } else if (scrolled <= showAfterScroll) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAfterScroll, autoShow, isDismissed]);

  // Handle dismiss
  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    onDismiss?.();
  };

  // Handle primary action
  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    } else {
      // Default navigation to letter portal
      router.push("/letter-portal");
    }
  };

  // Handle secondary action
  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else {
      // Default navigation to prayer room
      router.push("/prayer-room");
    }
  };

  // Calculate urgency based on scroll progress
  const getUrgencyLevel = () => {
    if (scrollProgress > 0.8) return "high";
    if (scrollProgress > 0.5) return "medium";
    return "low";
  };

  const urgencyLevel = getUrgencyLevel();

  // Dynamic content based on urgency
  const getContent = () => {
    switch (urgencyLevel) {
      case "high":
        return {
          title: "You've read JAHmere's story",
          subtitle: "Now help write the next chapter",
          primaryText: "Support JAHmere",
          secondaryText: "Share Story",
          bgColor: "bg-red-600",
          accentColor: "bg-red-500",
        };
      case "medium":
        return {
          title: "Transformation > Incarceration",
          subtitle: "Join 5,247+ supporters standing with JAHmere",
          primaryText: "Add Your Voice",
          secondaryText: "Learn More",
          bgColor: "bg-blue-600",
          accentColor: "bg-blue-500",
        };
      default:
        return {
          title: "Every voice matters",
          subtitle: "Help JAHmere's transformation story reach the court",
          primaryText: "Get Involved",
          secondaryText: "Read Letters",
          bgColor: "bg-purple-600",
          accentColor: "bg-purple-500",
        };
    }
  };

  const content = getContent();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40",
            "bg-white border-t border-gray-200 shadow-2xl",
            className,
          )}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
            <motion.div
              className={cn("h-full", content.accentColor)}
              initial={{ width: 0 }}
              animate={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Content */}
              <div className="flex-1 mr-6">
                <div className="flex items-center gap-4">
                  {/* Icon indicator */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white",
                      content.bgColor,
                    )}
                  >
                    {urgencyLevel === "high" ? (
                      <Clock className="w-6 h-6" />
                    ) : (
                      <Users className="w-6 h-6" />
                    )}
                  </div>

                  {/* Text content */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {content.title}
                    </h3>
                    <p className="text-sm text-gray-600">{content.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleSecondaryAction}
                  className="hidden sm:inline-flex"
                >
                  {content.secondaryText}
                </Button>

                <Button
                  onClick={handlePrimaryAction}
                  className={cn(
                    "text-white shadow-lg hover:shadow-xl transition-all",
                    content.bgColor,
                    urgencyLevel === "high" && "animate-pulse",
                  )}
                >
                  {content.primaryText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                {/* Dismiss button */}
                <button
                  onClick={handleDismiss}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile-optimized layout */}
            <div className="sm:hidden mt-3 flex gap-2">
              <Button
                variant="outline"
                onClick={handleSecondaryAction}
                className="flex-1"
                size="sm"
              >
                {content.secondaryText}
              </Button>
              <Button
                onClick={handlePrimaryAction}
                className={cn("flex-1 text-white", content.bgColor)}
                size="sm"
              >
                {content.primaryText}
                <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Urgency indicators */}
          {urgencyLevel === "high" && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-t-lg text-xs font-medium"
              >
                Time is running out
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
