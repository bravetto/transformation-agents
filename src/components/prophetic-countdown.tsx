"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import DivineParticles from "./divine-particles";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";

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
  milestone,
  role = "lightworker",
  onMilestoneReached,
  showProgress = true,
  className,
}: PropheticCountdownProps) {
  // State to hold the calculated countdown values
  const [countdown, setCountdown] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    progress: 0,
  });

  // State to track if the countdown has reached zero
  const [isComplete, setIsComplete] = useState(false);

  // State to track component mounting for SSR
  const [isMounted, setIsMounted] = useState(false);

  // State to handle errors
  const [hasError, setHasError] = useState(false);

  // State to track celebration animation
  const [showCelebration, setShowCelebration] = useState(false);

  // Get the particle intensity based on remaining time
  const getParticleIntensity = useCallback((): "low" | "medium" | "high" => {
    // If less than 1 day remaining, use high intensity
    if (countdown.days <= 1) return "high";
    // If less than 7 days remaining, use medium intensity
    if (countdown.days <= 7) return "medium";
    // Otherwise use low intensity
    return "low";
  }, [countdown.days]);

  // Role-specific styling from the role config
  const roleStyles = useMemo(() => roleConfig[role], [role]);

  // Calculate the time remaining and update state
  const calculateTimeRemaining = useCallback(() => {
    try {
      const now = new Date();
      const target = new Date(targetDate);

      // Validate target date
      if (isNaN(target.getTime())) {
        console.error("Invalid target date provided to PropheticCountdown");
        setHasError(true);
        return;
      }

      // Calculate time difference in milliseconds
      const difference = target.getTime() - now.getTime();

      // If the target date is in the past, set countdown to zero
      if (difference <= 0) {
        if (!isComplete) {
          setIsComplete(true);
          setShowCelebration(true);

          // Trigger the callback if provided
          if (onMilestoneReached) {
            onMilestoneReached();
          }

          // Hide celebration after 5 seconds
          setTimeout(() => {
            setShowCelebration(false);
          }, 5000);
        }

        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          progress: 100,
        });

        return;
      }

      // Calculate total seconds for the entire countdown period
      const totalDuration =
        target.getTime() - new Date(now).setHours(0, 0, 0, 0);
      const elapsedDuration =
        now.getTime() - new Date(now).setHours(0, 0, 0, 0);
      const progress = Math.min(100, (elapsedDuration / totalDuration) * 100);

      // Calculate days, hours, minutes, seconds
      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      // Update state with new values
      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
        progress,
      });
    } catch (error) {
      console.error("Error calculating countdown:", error);
      setHasError(true);
    }
  }, [targetDate, isComplete, onMilestoneReached]);

  // Initialize countdown on mount and set up interval
  useEffect(() => {
    setIsMounted(true);

    // Calculate time remaining immediately
    calculateTimeRemaining();

    // Set up interval to update countdown every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [calculateTimeRemaining]);

  // Show nothing during SSR
  if (!isMounted) return null;

  // Show error state if there's an issue
  if (hasError) {
    return (
      <div
        className={cn(
          "relative bg-red-50 rounded-lg p-6 text-center",
          className,
        )}
      >
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
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
          intensity={getParticleIntensity()}
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
        <div className="flex gap-2 md:gap-4 mb-6">
          <AnimatedNumber
            value={countdown.days}
            unit="days"
            className="bg-white/10 text-white"
          />
          <span className="text-2xl md:text-4xl mt-3 md:mt-4 text-white/80">
            :
          </span>
          <AnimatedNumber
            value={countdown.hours}
            unit="hours"
            className="bg-white/10 text-white"
          />
          <span className="text-2xl md:text-4xl mt-3 md:mt-4 text-white/80">
            :
          </span>
          <AnimatedNumber
            value={countdown.minutes}
            unit="minutes"
            className="bg-white/10 text-white"
          />
          <span className="text-2xl md:text-4xl mt-3 md:mt-4 text-white/80">
            :
          </span>
          <AnimatedNumber
            value={countdown.seconds}
            unit="seconds"
            className="bg-white/10 text-white"
          />
        </div>

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
                <CheckCircle className="h-4 w-4 mr-2" />
                Continue the Journey
                <ChevronRight className="h-4 w-4 ml-1" />
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
export default withDivineErrorBoundary(PropheticCountdown, "messenger");
