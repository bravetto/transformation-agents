"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Target, Zap } from "lucide-react";
import { DivineParticles } from "./divine-particles";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";
import { EasterEgg } from "@/components/divine-easter-eggs";
import {
  useCircuitBreaker,
  CircuitBreakerFallback,
} from "@/lib/circuit-breaker";

// Types for the component props
export interface PropheticCountdownProps {
  targetDate: Date;
  milestone: string;
  role?: "lightworker" | "messenger" | "witness" | "guardian";
  onMilestoneReached?: () => void;
  showProgress?: boolean;
  className?: string;
}

// Time units for the countdown
type TimeUnit = "days" | "hours" | "minutes" | "seconds";

// Interface for countdown values
interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  progress: number;
}

// Role-based styling configurations
const roleConfig = {
  lightworker: {
    gradientClass: "from-amber-500 via-orange-500 to-yellow-500",
    bgClass: "bg-amber-500",
    textClass: "text-amber-500",
    emoji: "✨",
    particleVariant: "sacred",
  },
  messenger: {
    gradientClass: "from-blue-500 via-indigo-500 to-purple-500",
    bgClass: "bg-blue-500",
    textClass: "text-blue-500",
    emoji: "📮",
    particleVariant: "hope",
  },
  witness: {
    gradientClass: "from-emerald-500 via-teal-500 to-cyan-500",
    bgClass: "bg-emerald-500",
    textClass: "text-emerald-500",
    emoji: "👁️",
    particleVariant: "transformation",
  },
  guardian: {
    gradientClass: "from-purple-500 via-pink-500 to-rose-500",
    bgClass: "bg-purple-500",
    textClass: "text-purple-500",
    emoji: "🛡️",
    particleVariant: "minimal",
  },
};

// Animation variants for the number flips
const flipVariants = {
  initial: {
    y: -20,
    opacity: 0,
    scale: 1.1,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

// Component for animating individual number changes
const AnimatedNumber = ({
  value,
  unit,
  className,
}: {
  value: number;
  unit: TimeUnit;
  className?: string;
}) => {
  // Format the value to always have two digits
  const formattedValue = value < 10 ? `0${value}` : `${value}`;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative overflow-hidden h-16 md:h-24 min-w-16 md:min-w-24 rounded-lg">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={formattedValue}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={flipVariants}
            className={cn(
              "absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-bold backdrop-blur-sm",
              className,
            )}
          >
            {formattedValue}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm mt-1 uppercase tracking-wider opacity-80">
        {unit}
      </span>
    </div>
  );
};

// Main component
function PropheticCountdown({
  targetDate,
  milestone = "Divine Moment",
  role = "lightworker",
  showProgress = true,
}: PropheticCountdownProps) {
  // 🛡️ CRITICAL: ALL HOOKS MUST BE AT THE TOP - BEFORE ANY RETURNS
  const componentName = `PropheticCountdown-${role}`;
  const renderCount = useRef(0);
  const isMountedRef = useRef(false);
  const isCompleteRef = useRef(false);

  // State management with proper initialization
  const [countdown, setCountdown] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    progress: 0,
  });

  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 🛡️ CRITICAL FIX: Reset render count on mount
  useEffect(() => {
    isMountedRef.current = true;
    isCompleteRef.current = false;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // 🛡️ CRITICAL FIX: Move date calculations to useMemo to prevent re-computation
  const dateCalculations = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        now: new Date(),
        target: new Date(targetDate),
        difference: 0,
        totalDuration: 0,
      };
    }

    const now = new Date();
    const target = new Date(targetDate);
    const difference = target.getTime() - now.getTime();

    // Calculate total duration from a reference point (July 4, 2024)
    const referenceDate = new Date("2024-07-04T00:00:00");
    const totalDuration = target.getTime() - referenceDate.getTime();

    return { now, target, difference, totalDuration };
  }, [targetDate]);

  // 🛡️ CRITICAL FIX: Main countdown calculation effect
  useEffect(() => {
    if (!isMountedRef.current) return;

    const updateCountdown = () => {
      try {
        const { difference, totalDuration } = dateCalculations;

        if (difference <= 0 && !isCompleteRef.current) {
          // Countdown complete
          setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalSeconds: 0,
            progress: 100,
          });
          setIsComplete(true);
          setShowCelebration(true);
          isCompleteRef.current = true;
          return;
        }

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          const totalSeconds = Math.floor(difference / 1000);

          // Calculate progress (0-100%)
          const elapsed = totalDuration - difference;
          const progress =
            totalDuration > 0
              ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
              : 0;

          setCountdown({
            days,
            hours,
            minutes,
            seconds,
            totalSeconds,
            progress,
          });
        }
      } catch (error) {
        console.error(`${componentName} calculation error:`, error);
        setHasError(true);
      }
    };

    // Initial calculation
    updateCountdown();

    // Set up interval for updates
    const interval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dateCalculations, componentName]);

  // 🛡️ CRITICAL FIX: Celebration effect
  useEffect(() => {
    if (showCelebration && typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  // Divine intervention refs for animations
  const countdownRef = useRef<HTMLDivElement>(null);
  const celebrationRef = useRef<HTMLDivElement>(null);

  // 🛡️ CIRCUIT BREAKER: Prevent infinite renders
  renderCount.current++;
  if (renderCount.current > 100) {
    console.warn(
      `🚨 ${componentName}: Circuit breaker activated - too many renders`,
    );
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">
          Countdown temporarily unavailable. Please refresh the page.
        </p>
      </div>
    );
  }

  // 🚨 SSR/CSR PROTECTION - Check after all hooks are defined
  if (typeof window === "undefined") {
    return (
      <div className="p-6 bg-gradient-to-br from-lightworker-primary/10 to-lightworker-secondary/10 rounded-xl border border-lightworker-primary/20">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-lightworker-primary mb-2">
            {milestone}
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white/50 rounded-lg p-2">
              <div className="text-2xl font-bold text-lightworker-primary">
                --
              </div>
              <div className="text-xs text-gray-600">Days</div>
            </div>
            <div className="bg-white/50 rounded-lg p-2">
              <div className="text-2xl font-bold text-lightworker-primary">
                --
              </div>
              <div className="text-xs text-gray-600">Hours</div>
            </div>
            <div className="bg-white/50 rounded-lg p-2">
              <div className="text-2xl font-bold text-lightworker-primary">
                --
              </div>
              <div className="text-xs text-gray-600">Minutes</div>
            </div>
            <div className="bg-white/50 rounded-lg p-2">
              <div className="text-2xl font-bold text-lightworker-primary">
                --
              </div>
              <div className="text-xs text-gray-600">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🛡️ CRITICAL FIX: Memoize particle intensity calculation to prevent render loops
  const particleIntensity = useMemo((): "low" | "medium" | "high" => {
    // If less than 1 day remaining, use high intensity
    if (countdown.days <= 1) return "high";
    // If less than 7 days remaining, use medium intensity
    if (countdown.days <= 7) return "medium";
    // Otherwise use low intensity
    return "low";
  }, [countdown.days]);

  // 🛡️ CRITICAL FIX: Memoize role-specific styling
  const roleStyles = useMemo(() => roleConfig[role], [role]);

  // Show nothing during SSR
  if (!isMountedRef.current) return null; // This line is now handled by the circuit breaker

  // Show error state if there's an issue
  if (hasError) {
    return (
      <div
        className={cn(
          "relative bg-red-50 rounded-lg p-6 text-center",
          className,
        )}
      >
        <Zap className="h-8 w-8 text-red-500 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-red-800">Countdown Error</h3>
        <p className="text-sm text-red-600">
          There was an issue with the countdown. Please check the target date.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-50">
        <DivineParticles
          variant={roleStyles.particleVariant as any}
          intensity={particleIntensity}
          className="h-full"
        />
      </div>

      {/* Glass Backdrop */}
      <div
        className={cn(
          "relative z-10 backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20",
          "shadow-lg overflow-hidden flex flex-col items-center justify-center",
        )}
      >
        {/* Milestone Header */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-white" />
          <h3 className="text-lg md:text-xl font-bold text-white">
            {milestone}
          </h3>
        </div>

        {/* Countdown Display */}
        <EasterEgg eggId="july-28-countdown-hover" className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {(["days", "hours", "minutes", "seconds"] as TimeUnit[]).map(
              (unit, index) => (
                <motion.div
                  key={unit}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                  }}
                  className={cn(
                    "bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20",
                    "hover:shadow-xl hover:scale-105 transition-all duration-300",
                  )}
                >
                  <AnimatedNumber
                    value={countdown[unit]}
                    unit={unit}
                    className={roleStyles.textClass}
                  />
                </motion.div>
              ),
            )}
          </motion.div>
        </EasterEgg>

        {/* Progress Bar (conditional) */}
        {showProgress && (
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              className={cn(
                "h-full",
                `bg-gradient-to-r ${roleStyles.gradientClass}`,
              )}
              initial={{ width: "0%" }}
              animate={{
                width: `${isComplete ? 100 : 100 - countdown.progress}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className={cn(
              "flex h-3 w-3 rounded-full",
              isComplete ? "bg-green-500" : roleStyles.bgClass,
            )}
          />
          <span className="text-sm text-white/90">
            {isComplete ? "Milestone Reached" : "Countdown Active"}
          </span>
        </div>
      </div>

      {/* Celebration Animation (when complete) */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            {/* Overlay with blur */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Celebration Content */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className={cn(
                "bg-white rounded-xl p-8 shadow-2xl text-center max-w-sm mx-auto z-30",
                "border-2",
                `border-${role}-500`,
              )}
            >
              {/* Emoji Animation */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-5xl mb-4"
              >
                {roleStyles.emoji} {isComplete ? "🎉" : "⏳"}
              </motion.div>

              <h3
                className={cn("text-2xl font-bold mb-2", roleStyles.textClass)}
              >
                {milestone} Reached!
              </h3>

              <p className="text-gray-700 mb-4">
                The prophetic milestone has been fulfilled. The next chapter
                begins now.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "inline-flex items-center justify-center px-4 py-2 rounded-lg",
                  "bg-gradient-to-r",
                  roleStyles.gradientClass,
                  "text-white font-medium",
                )}
              >
                <Target className="h-4 w-4 mr-2" />
                Continue the Journey
                <Zap className="h-4 w-4 ml-1" />
              </motion.div>
            </motion.div>

            {/* Confetti/Particles Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: Math.random() * 3 + 1,
                    opacity: 0,
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    delay: Math.random(),
                    ease: "easeOut",
                  }}
                  className={cn(
                    "absolute w-2 h-2 rounded-full",
                    roleStyles.bgClass,
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Export with divine error boundary for production safety
export default withDivineErrorBoundary(PropheticCountdown, {
  componentName: "PropheticCountdown",
  role: "messenger",
});
