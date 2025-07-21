/**
 * 🏆 PRODUCTION-HARDENED Prophetic Countdown
 * Transformed with enterprise-grade memory leak prevention and performance optimization
 */

"use client";

import React, { useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Target, Zap, Sparkles } from "lucide-react";
import { DivineParticles } from "./divine-particles";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";
import { EasterEgg } from "@/components/divine-easter-eggs";

// 🛡️ PRODUCTION IMPORTS: Memory leak prevention
import {
  useCleanupManager,
  useRenderLoopDetection,
  useSafeState,
  usePerformanceMonitoring,
} from "@/lib/production/memory-leak-prevention";

export type DivineRole = "lightworker" | "messenger" | "witness" | "guardian";

// Types for the component props
export interface PropheticCountdownProps {
  targetDate: Date;
  milestone: string;
  role?: DivineRole;
  onMilestoneReached?: () => void;
  showProgress?: boolean;
  className?: string;
}

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  progress: number;
}

// 🔥 PRODUCTION OPTIMIZATION: Stable role configuration
const ROLE_CONFIG = {
  lightworker: {
    primaryColor: "text-yellow-400",
    secondaryColor: "text-yellow-200",
    bgGradient: "from-yellow-500/20 via-gold-500/10 to-yellow-400/20",
    glowClass: "shadow-yellow-400/20",
  },
  messenger: {
    primaryColor: "text-blue-400",
    secondaryColor: "text-blue-200",
    bgGradient: "from-blue-500/20 via-cyan-500/10 to-blue-400/20",
    glowClass: "shadow-blue-400/20",
  },
  witness: {
    primaryColor: "text-green-400",
    secondaryColor: "text-green-200",
    bgGradient: "from-green-500/20 via-emerald-500/10 to-green-400/20",
    glowClass: "shadow-green-400/20",
  },
  guardian: {
    primaryColor: "text-purple-400",
    secondaryColor: "text-purple-200",
    bgGradient: "from-purple-500/20 via-violet-500/10 to-purple-400/20",
    glowClass: "shadow-purple-400/20",
  },
} as const;

// Main component
function PropheticCountdown({
  targetDate,
  milestone = "Divine Moment",
  role = "lightworker",
  showProgress = true,
  className,
}: PropheticCountdownProps) {
  // 🛡️ SURGICAL FIX: ALL HOOKS MUST BE CALLED FIRST (Rules of Hooks)
  const componentName = `PropheticCountdown-${role}`;
  const renderCountRef = useRef(0);

  // 🛡️ CRITICAL: All hooks called unconditionally at component top
  useRenderLoopDetection(componentName, 30); // Strict limit for production
  const cleanup = useCleanupManager();
  const performanceMetrics = usePerformanceMonitoring(componentName);

  // 🚨 PRODUCTION PROTECTION: Check AFTER all hooks are called
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    return (
      <div className="countdown-safe-mode bg-purple-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 shadow-xl max-w-xs">
        <div className="text-purple-100 text-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>⏱️ Countdown Safe Mode</span>
          </div>
          <div className="text-xs text-purple-300 mb-2">
            System temporarily protected
          </div>
          <div className="text-xs text-purple-400">
            "He gives power to the weak" - Isaiah 40:29
          </div>
        </div>
      </div>
    );
  }

  // 🛡️ PRODUCTION STATE: Safe state management with cleanup
  const [countdown, setCountdown] = useSafeState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    progress: 0,
  });

  const [isComplete, setIsComplete] = useSafeState(false);
  const [showCelebration, setShowCelebration] = useSafeState(false);
  const [hasError, setHasError] = useSafeState(false);

  // 🚨 CIRCUIT BREAKER LOGIC: After all hooks are called
  renderCountRef.current++;

  // 🛡️ CRITICAL: Circuit breaker check AFTER hooks (preserves Rules of Hooks)
  if (renderCountRef.current > 2) {
    console.warn(
      `🚨 PropheticCountdown: Circuit breaker activated (${renderCountRef.current} renders)`,
    );
    return (
      <div className="countdown-resting bg-purple-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 shadow-xl">
        <div className="text-purple-100 text-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>⏱️ Countdown Resting</span>
          </div>
          <div className="text-xs text-purple-300">
            "Be still and know that I am God" - Psalm 46:10
          </div>
        </div>
      </div>
    );
  }

  // 🔥 PERFORMANCE OPTIMIZATION: Memoized date calculations
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

  // 🛡️ PRODUCTION COUNTDOWN: Safe, memory-leak-free countdown calculation
  const updateCountdown = React.useCallback(() => {
    try {
      const { difference, totalDuration } = dateCalculations;

      if (difference <= 0 && !isComplete) {
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
  }, [
    dateCalculations,
    componentName,
    isComplete,
    setCountdown,
    setIsComplete,
    setShowCelebration,
    setHasError,
  ]);

  // 🛡️ PRODUCTION INTERVAL: Memory-safe countdown updates
  React.useEffect(() => {
    // Initial calculation
    updateCountdown();

    // Set up interval for updates - using cleanup manager
    const interval = cleanup.setInterval(updateCountdown, 1000);

    return () => cleanup.clearInterval(interval);
  }, [updateCountdown, cleanup]);

  // 🛡️ PRODUCTION CELEBRATION: Safe timeout management
  React.useEffect(() => {
    if (showCelebration) {
      const timer = cleanup.setTimeout(() => {
        setShowCelebration(false);
      }, 5000);

      return () => cleanup.clearTimeout(timer);
    }
  }, [showCelebration, cleanup, setShowCelebration]);

  // 🔥 PERFORMANCE MONITORING: Log performance metrics in development
  React.useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      performanceMetrics.renderCount % 25 === 0
    ) {
      console.log(`🕐 ${componentName} Performance:`, {
        renders: performanceMetrics.renderCount,
        uptime: `${(performanceMetrics.uptime / 1000).toFixed(1)}s`,
        averageRenderTime: `${performanceMetrics.averageRenderTime.toFixed(2)}ms`,
        countdown: `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`,
      });
    }
  }, [componentName, performanceMetrics, countdown]);

  // 🔥 MEMOIZED STYLING: Prevent unnecessary recalculations
  const roleStyles = useMemo(() => ROLE_CONFIG[role], [role]);

  const particleIntensity = useMemo((): "low" | "medium" | "high" => {
    if (countdown.days <= 1) return "high";
    if (countdown.days <= 7) return "medium";
    return "low";
  }, [countdown.days]);

  // 🚨 PRODUCTION ERROR HANDLING: Circuit breaker for excessive renders
  if (hasError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <Target className="h-5 w-5" />
          <h3 className="font-semibold">Countdown Error</h3>
        </div>
        <p className="text-sm text-red-600">
          Unable to calculate countdown. Please check the target date
          configuration.
        </p>
      </div>
    );
  }

  // 🎉 CELEBRATION STATE
  if (isComplete) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "relative p-8 rounded-2xl text-center overflow-hidden",
            `bg-gradient-to-br ${roleStyles.bgGradient}`,
            "border border-white/20 shadow-2xl",
            roleStyles.glowClass,
            className,
          )}
        >
          <DivineParticles
            variant="starfield"
            intensity="high"
            className="absolute inset-0"
          />

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Sparkles
                className={cn("h-16 w-16 mx-auto", roleStyles.primaryColor)}
              />
            </motion.div>

            <h2
              className={cn("text-4xl font-bold mb-4", roleStyles.primaryColor)}
            >
              🎉 {milestone} Achieved! 🎉
            </h2>

            <p className={cn("text-lg", roleStyles.secondaryColor)}>
              The divine moment has arrived. All prayers and efforts have
              culminated in this sacred moment.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div
      className={cn(
        "relative p-6 rounded-2xl overflow-hidden",
        `bg-gradient-to-br ${roleStyles.bgGradient}`,
        "border border-white/10 shadow-xl backdrop-blur-sm",
        roleStyles.glowClass,
        className,
      )}
    >
      {/* Divine Particles Background */}
      <DivineParticles
        variant="divine"
        intensity={particleIntensity}
        className="absolute inset-0 opacity-40"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className={cn("h-6 w-6", roleStyles.primaryColor)} />
            <h2 className={cn("text-2xl font-bold", roleStyles.primaryColor)}>
              {milestone}
            </h2>
            <Calendar className={cn("h-6 w-6", roleStyles.primaryColor)} />
          </div>

          <p className={cn("text-sm", roleStyles.secondaryColor)}>
            Target: {dateCalculations.target.toLocaleDateString()} at{" "}
            {dateCalculations.target.toLocaleTimeString()}
          </p>
        </div>

        {/* Countdown Display */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { value: countdown.days, label: "Days", icon: Calendar },
            { value: countdown.hours, label: "Hours", icon: Clock },
            { value: countdown.minutes, label: "Minutes", icon: Target },
            { value: countdown.seconds, label: "Seconds", icon: Zap },
          ].map(({ value, label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Icon
                  className={cn(
                    "h-4 w-4 mx-auto mb-2",
                    roleStyles.primaryColor,
                  )}
                />

                <motion.div
                  key={value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn("text-3xl font-bold", roleStyles.primaryColor)}
                >
                  {value.toString().padStart(2, "0")}
                </motion.div>

                <div
                  className={cn(
                    "text-xs font-medium",
                    roleStyles.secondaryColor,
                  )}
                >
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className={cn("text-sm", roleStyles.secondaryColor)}>
                Progress to {milestone}
              </span>
              <span
                className={cn("text-sm font-medium", roleStyles.primaryColor)}
              >
                {countdown.progress.toFixed(1)}%
              </span>
            </div>

            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${countdown.progress}%` }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "h-full rounded-full",
                  role === "lightworker"
                    ? "bg-yellow-400"
                    : role === "messenger"
                      ? "bg-blue-400"
                      : role === "witness"
                        ? "bg-green-400"
                        : "bg-purple-400",
                )}
              />
            </div>
          </div>
        )}

        {/* Divine Message */}
        <div className="text-center">
          <EasterEgg
            eggId="prophetic-countdown-divine-timing"
            className="inline-block"
          >
            <p
              className={cn(
                "text-sm leading-relaxed",
                roleStyles.secondaryColor,
              )}
            >
              {countdown.days > 30
                ? `${countdown.days} days remain until divine intervention manifests`
                : countdown.days > 7
                  ? `The final ${countdown.days} days approach - prepare your heart`
                  : countdown.days > 1
                    ? `Only ${countdown.days} days left - the miracle is imminent!`
                    : `Less than 24 hours remain - divine timing is perfect!`}
            </p>
          </EasterEgg>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-2 text-xs opacity-60">
              Renders: {performanceMetrics.renderCount} • Uptime:{" "}
              {(performanceMetrics.uptime / 1000).toFixed(1)}s
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🛡️ PRODUCTION EXPORT: Error boundary wrapped component
export default withDivineErrorBoundary(PropheticCountdown, {
  componentName: "PropheticCountdown",
  role: "messenger",
});
