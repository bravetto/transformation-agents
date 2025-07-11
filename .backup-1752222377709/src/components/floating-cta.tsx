"use client";

import { useState, useEffect } from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion, AnimatePresence } from "framer-motion";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { Heart, X, Trophy } from "lucide-react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import Link from "next/link";
import { withErrorBoundary } from "@/components/with-error-boundary";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling 30% of the page
      if (scrollPosition > windowHeight * 0.3 && !hasScrolled) {
        setHasScrolled(true);
        if (!isDismissed) {
          setIsVisible(true);
        }
      }

      // Hide when near bottom (to not overlap footer)
      if (scrollPosition + windowHeight > documentHeight - 200) {
        setIsVisible(false);
      } else if (hasScrolled && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Remember dismissal for this session
    sessionStorage.setItem("ctaDismissed", "true");
  };

  // Check if previously dismissed in this session
  useEffect(() => {
    if (sessionStorage.getItem("ctaDismissed") === "true") {
      setIsDismissed(true);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 max-w-sm"
          style={{ bottom: "80px" }}
        >
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full" />
            </div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors p-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-6 h-6 text-white" />
                <h3 className="text-white font-bold text-lg">
                  Coach, Your Legacy Awaits
                </h3>
              </div>

              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Transform justice like you transformed champions. JAHmere
                protected Jordan—now he needs you.
              </p>

              <div className="flex gap-3">
                <Link href="/the-case" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-amber-600 font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm"
                  >
                    Lead Now
                  </motion.button>
                </Link>

                <Link href="/july-9-strategy" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white/20 backdrop-blur text-white font-semibold py-3 px-4 rounded-lg border border-white/30 hover:bg-white/30 transition-all text-sm"
                  >
                    July 9th
                  </motion.button>
                </Link>
              </div>

              {/* Urgency indicator */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-3 text-center"
              >
                <span className="text-white/80 text-xs font-medium">
                  Time is running out
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export with error boundary
export default withErrorBoundary(FloatingCTAExported, {
  componentName: "floating-cta",
  id: "floating-cta",
});
