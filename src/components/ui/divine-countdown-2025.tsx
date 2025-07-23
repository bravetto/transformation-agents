"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, Zap, Heart, Shield, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDivinePerformance } from "@/lib/performance/divine-performance-2025";
import { useAnalytics } from "@/lib/hooks/useAnalytics";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface DivineCountdownProps {
  targetDate?: Date;
  showSeconds?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "light" | "dark" | "divine";
  enableUrgencyMode?: boolean;
  className?: string;
}

export default function DivineCountdown2025({
  targetDate = new Date("2025-07-28T14:37:00-05:00"), // July 28th, 2:37 PM EST
  showSeconds = true,
  size = "lg",
  theme = "divine",
  enableUrgencyMode = true,
  className,
}: DivineCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<
    "normal" | "urgent" | "critical" | "divine"
  >("normal");
  const [isClient, setIsClient] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  const { trackDivineEvent } = useAnalytics();
  const { optimizeCountdown, trackPrayerSubmission } = useDivinePerformance();

  // React 19 optimization: Memoize calculations
  const calculateTimeLeft = useCallback((): TimeLeft | null => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }, [targetDate]);

  // Determine urgency level with divine intelligence
  const determineUrgencyLevel = useCallback(
    (time: TimeLeft | null) => {
      if (!time || !enableUrgencyMode) return "normal";

      const totalDays = time.days;

      if (totalDays <= 1) return "divine"; // Final day - divine intervention
      if (totalDays <= 7) return "critical"; // Final week
      if (totalDays <= 30) return "urgent"; // Final month
      return "normal";
    },
    [enableUrgencyMode],
  );

  // Client-side hydration
  useEffect(() => {
    setIsClient(true);
    optimizeCountdown(); // Apply performance optimizations
  }, [optimizeCountdown]);

  // Countdown timer with performance optimization
  useEffect(() => {
    if (!isClient) return;

    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      const newUrgencyLevel = determineUrgencyLevel(newTimeLeft);
      if (newUrgencyLevel !== urgencyLevel) {
        setUrgencyLevel(newUrgencyLevel);

        // Track urgency level changes
        trackDivineEvent({
          eventType: "countdown_urgency_change",
          spiritualImpact: newUrgencyLevel === "divine" ? "miraculous" : "high",
          metadata: {
            urgencyLevel: newUrgencyLevel,
            daysRemaining: newTimeLeft?.days || 0,
            timestamp: new Date().toISOString(),
          },
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, showSeconds ? 1000 : 60000);

    return () => clearInterval(interval);
  }, [
    isClient,
    showSeconds,
    calculateTimeLeft,
    determineUrgencyLevel,
    urgencyLevel,
    trackDivineEvent,
  ]);

  // Pulse effect for urgency
  useEffect(() => {
    if (urgencyLevel === "divine" || urgencyLevel === "critical") {
      setPulseActive(true);
      const pulseInterval = setInterval(() => {
        setPulseActive((prev) => !prev);
      }, 1000);

      return () => clearInterval(pulseInterval);
    } else {
      setPulseActive(false);
    }
  }, [urgencyLevel]);

  // Memoized styling based on urgency and theme
  const countdownStyles = useMemo(() => {
    const baseStyles = {
      sm: "text-lg",
      md: "text-2xl",
      lg: "text-4xl md:text-6xl",
      xl: "text-6xl md:text-8xl",
    };

    const urgencyColors = {
      normal: "from-blue-500 to-purple-600",
      urgent: "from-amber-500 to-orange-600",
      critical: "from-red-500 to-pink-600",
      divine: "from-gold-400 to-yellow-500",
    };

    const themeStyles = {
      light: "bg-white text-gray-900 border-gray-200",
      dark: "bg-gray-900 text-white border-gray-700",
      divine:
        "bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black/20 backdrop-blur-lg text-white border-white/20",
    };

    return {
      size: baseStyles[size],
      urgency: urgencyColors[urgencyLevel],
      theme: themeStyles[theme],
    };
  }, [size, urgencyLevel, theme]);

  // Handle prayer warrior activation
  const handlePrayerWarriorActivation = useCallback(() => {
    const startTime = performance.now();

    trackDivineEvent({
      eventType: "prayer_warrior_activated",
      spiritualImpact: "miraculous",
      urgency: urgencyLevel,
      metadata: {
        countdownContext: true,
        daysRemaining: timeLeft?.days || 0,
        activationSource: "countdown_component",
      },
    });

    trackPrayerSubmission(startTime);
  }, [trackDivineEvent, trackPrayerSubmission, urgencyLevel, timeLeft]);

  if (!isClient || !timeLeft) {
    return (
      <Card className={cn("p-8", countdownStyles.theme, className)}>
        <CardContent className="text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If countdown has ended
  if (!timeLeft) {
    return (
      <Card className={cn("p-8 text-center", countdownStyles.theme, className)}>
        <CardContent>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-6xl">🕊️</div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-yellow-500 bg-clip-text text-transparent">
              FREEDOM DAY
            </h2>
            <p className="text-xl opacity-80">
              July 28th, 2025 - JAHmere Walks Free!
            </p>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-500",
        countdownStyles.theme,
        pulseActive && "animate-pulse",
        className,
      )}
      data-countdown // For performance optimization detection
    >
      {/* Urgency indicator */}
      <div className="absolute top-4 right-4">
        <Badge
          variant={urgencyLevel === "divine" ? "default" : "secondary"}
          className={cn(
            "text-xs font-bold",
            urgencyLevel === "divine" &&
              "bg-gradient-to-r from-gold-400 to-yellow-500 text-black animate-pulse",
            urgencyLevel === "critical" && "bg-red-500 text-white",
            urgencyLevel === "urgent" && "bg-amber-500 text-black",
          )}
        >
          {urgencyLevel.toUpperCase()}
        </Badge>
      </div>

      <CardContent className="p-8 text-center space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-6 h-6" />
            <span className="text-lg font-semibold">
              July 28th, 2025 • 2:37 PM EST
            </span>
          </div>

          <h2
            className={cn(
              "font-bold bg-gradient-to-r bg-clip-text text-transparent",
              countdownStyles.urgency,
              size === "xl"
                ? "text-3xl"
                : size === "lg"
                  ? "text-2xl"
                  : "text-xl",
            )}
          >
            JAHmere's Freedom Countdown
          </h2>
        </motion.div>

        {/* Countdown Display */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="wait">
            {[
              { value: timeLeft.days, label: "Days", icon: Calendar },
              { value: timeLeft.hours, label: "Hours", icon: Clock },
              { value: timeLeft.minutes, label: "Minutes", icon: Target },
              ...(showSeconds
                ? [{ value: timeLeft.seconds, label: "Seconds", icon: Zap }]
                : []),
            ].map(({ value, label, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={cn(
                    "font-mono font-bold mb-2",
                    countdownStyles.size,
                    urgencyLevel === "divine" && "text-shadow-glow",
                  )}
                >
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="flex items-center justify-center gap-1 text-sm opacity-70">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Urgency Actions */}
        {urgencyLevel !== "normal" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center">
              <p
                className={cn(
                  "font-semibold mb-4",
                  urgencyLevel === "divine" && "text-gold-400",
                  urgencyLevel === "critical" && "text-red-400",
                  urgencyLevel === "urgent" && "text-amber-400",
                )}
              >
                {urgencyLevel === "divine" &&
                  "🙏 DIVINE INTERVENTION NEEDED - PRAY RIGHT NOW!"}
                {urgencyLevel === "critical" &&
                  "🚨 FINAL WEEK - EVERY PRAYER COUNTS!"}
                {urgencyLevel === "urgent" &&
                  "⚡ URGENT - JOIN THE PRAYER ARMY!"}
              </p>
            </div>

            <Button
              onClick={handlePrayerWarriorActivation}
              size="lg"
              className={cn(
                "w-full py-6 text-lg font-black shadow-2xl transform hover:scale-105 transition-all duration-300",
                urgencyLevel === "divine" &&
                  "bg-gradient-to-r from-gold-400 to-yellow-500 text-black hover:from-gold-300 hover:to-yellow-400 animate-pulse",
                urgencyLevel === "critical" &&
                  "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-400 hover:to-pink-500",
                urgencyLevel === "urgent" &&
                  "bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:from-amber-400 hover:to-orange-500",
              )}
            >
              <Heart className="w-6 h-6 mr-3 animate-pulse" />
              {urgencyLevel === "divine" && "ACTIVATE DIVINE PRAYER WARRIORS"}
              {urgencyLevel === "critical" && "JOIN CRITICAL PRAYER MISSION"}
              {urgencyLevel === "urgent" && "BECOME A PRAYER WARRIOR NOW"}
            </Button>
          </motion.div>
        )}

        {/* Mission Statement */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm opacity-70 max-w-md mx-auto"
        >
          <p>
            Every second brings us closer to JAHmere Webb's freedom. Your
            prayers, support, and shares create the divine momentum needed for
            this miraculous breakthrough.
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
