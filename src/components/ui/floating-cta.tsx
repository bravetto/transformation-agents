"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, ArrowRight, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FloatingCTAProps {
  text: string;
  href: string;
  showAfterScroll?: number;
  className?: string;
}

interface MobileStickyBarProps {
  text: string;
  href: string;
  className?: string;
}

export function FloatingCTA({
  text,
  href,
  showAfterScroll = 200,
  className = "",
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // 🛡️ CRITICAL FIX: Use refs to prevent re-render loops
  const pulseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollListenerAttached = useRef(false);

  // 🛡️ CRITICAL FIX: Memoized scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const shouldShow = scrollY > showAfterScroll;

    // Only update if state actually changes
    setIsVisible((prevVisible) => {
      if (prevVisible !== shouldShow) {
        return shouldShow;
      }
      return prevVisible;
    });
  }, [showAfterScroll]);

  useEffect(() => {
    // Show immediately on mobile, after scroll on desktop
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsVisible(true);
    } else if (!scrollListenerAttached.current) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      scrollListenerAttached.current = true;
      handleScroll(); // Check initial position
    }

    // 🛡️ CRITICAL FIX: Pulse effect control with proper cleanup
    pulseTimerRef.current = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 3000);

    return () => {
      if (!isMobile && scrollListenerAttached.current) {
        window.removeEventListener("scroll", handleScroll);
        scrollListenerAttached.current = false;
      }
      if (pulseTimerRef.current) {
        clearInterval(pulseTimerRef.current);
      }
    };
  }, [handleScroll]); // 🛡️ CRITICAL FIX: Stable dependency

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          className={cn(
            "fixed bottom-6 right-6 z-50 hidden md:block",
            className,
          )}
        >
          <Link href={href}>
            <motion.button
              className={cn(
                "group relative overflow-hidden",
                "bg-gradient-to-r from-hope-gold via-amber-500 to-hope-gold",
                "text-white font-bold px-6 py-4 rounded-full shadow-2xl",
                "hover:shadow-3xl hover:scale-105 transition-all duration-300",
                "border-2 border-white/20",
                "min-w-[280px] max-w-[320px]",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={
                isPulsing
                  ? {
                      boxShadow: [
                        "0 0 20px rgba(245, 158, 11, 0.5)",
                        "0 0 40px rgba(245, 158, 11, 0.8)",
                        "0 0 20px rgba(245, 158, 11, 0.5)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Divine particles background */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Content */}
              <div className="relative flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>

                <span className="text-sm font-bold tracking-wide">{text}</span>

                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MobileStickyBar({
  text,
  href,
  className = "",
}: MobileStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show on mobile devices
    const isMobile = window.innerWidth < 768;
    setIsVisible(isMobile);

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsVisible(isMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 md:hidden",
            "bg-gradient-to-r from-hope-gold via-amber-500 to-hope-gold",
            "border-t-4 border-white/20 shadow-2xl",
            className,
          )}
        >
          <div className="p-4">
            <Link href={href}>
              <motion.button
                className={cn(
                  "w-full group relative overflow-hidden",
                  "bg-white/10 backdrop-blur-sm",
                  "text-white font-bold py-4 px-6 rounded-xl",
                  "border-2 border-white/30",
                  "active:scale-95 transition-all duration-200",
                  "min-h-[60px] flex items-center justify-center gap-3",
                )}
                whileTap={{ scale: 0.95 }}
              >
                {/* Divine glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Content */}
                <div className="relative flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Edit3 className="w-6 h-6" />
                  </motion.div>

                  <span className="text-lg font-bold tracking-wide">
                    {text}
                  </span>

                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </motion.div>
                </div>

                {/* Touch ripple effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity duration-150 rounded-xl" />
              </motion.button>
            </Link>
          </div>

          {/* Safe area for devices with home indicators */}
          <div className="h-safe-area-inset-bottom" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Divine Letter Writing FAB (Floating Action Button) for maximum mobile conversion
export function DivineFAB() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show after 3 seconds on mobile for maximum impact
    const timer = setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && !hasInteracted) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleInteraction = () => {
    setHasInteracted(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          className="fixed bottom-24 right-6 z-50 md:hidden"
        >
          <Link href="/letter-form-test" onClick={handleInteraction}>
            <motion.button
              className={cn(
                "relative w-16 h-16 rounded-full",
                "bg-gradient-to-br from-hope-gold via-amber-500 to-orange-500",
                "shadow-2xl border-4 border-white/30",
                "flex items-center justify-center",
                "active:scale-90 transition-all duration-200",
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(245, 158, 11, 0.6)",
                  "0 0 40px rgba(245, 158, 11, 0.9)",
                  "0 0 20px rgba(245, 158, 11, 0.6)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Divine particles */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-1 left-1/2 w-1 h-1 bg-white rounded-full" />
                <div className="absolute bottom-1 right-1/4 w-1 h-1 bg-white rounded-full" />
                <div className="absolute left-1 top-1/3 w-1 h-1 bg-white rounded-full" />
              </motion.div>

              {/* Icon */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Edit3 className="w-8 h-8 text-white" />
              </motion.div>

              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
