"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Star, Zap, Heart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/lib/hooks/use-analytics";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function JAHmereFreedomCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { trackDivineEvent } = useAnalytics();

  const targetDate = new Date("2025-07-28T09:00:00-05:00"); // 9 AM EST court time

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
    return null;
  }, [targetDate]);

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Set urgency if less than 30 days
      if (newTimeLeft && newTimeLeft.days <= 30) {
        setIsUrgent(true);
      }
    };

    updateCountdown(); // Initial update
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const handleUrgentAction = () => {
    trackDivineEvent({
      eventType: "urgent_countdown_interaction",
      component: "FreedomCountdown",
      urgency: isUrgent ? "critical" : "normal",
      metadata: {
        daysRemaining: timeLeft?.days || 0,
        source: "countdown_timer",
      },
    });
  };

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted || !timeLeft) {
    return (
      <div className="bg-gradient-to-r from-amber-900 to-red-900 py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
          <div className="animate-pulse">
            <div className="h-12 bg-white/20 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/10 rounded-lg p-6 h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const timeUnits = [
    {
      label: "Days",
      value: timeLeft.days,
      icon: Calendar,
      color: "from-red-500 to-red-600",
    },
    {
      label: "Hours",
      value: timeLeft.hours,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Minutes",
      value: timeLeft.minutes,
      icon: Zap,
      color: "from-amber-500 to-amber-600",
    },
    {
      label: "Seconds",
      value: timeLeft.seconds,
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative overflow-hidden py-16 ${
        isUrgent
          ? "bg-gradient-to-r from-red-900 via-red-800 to-orange-900"
          : "bg-gradient-to-r from-amber-900 to-red-900"
      }`}
    >
      {/* Urgent pulse effect */}
      {isUrgent && (
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-red-500/20"
        />
      )}

      {/* Divine particles for urgent state */}
      {isUrgent && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-300/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target
              className={`w-8 h-8 ${isUrgent ? "text-red-300 animate-pulse" : "text-amber-300"}`}
            />
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Freedom Countdown
            </h2>
            <Heart
              className={`w-8 h-8 ${isUrgent ? "text-red-300 animate-pulse" : "text-amber-300"}`}
            />
          </div>

          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            animate={
              isUrgent
                ? {
                    color: [
                      "rgba(255,255,255,0.9)",
                      "rgba(255,200,200,1)",
                      "rgba(255,255,255,0.9)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isUrgent ? (
              <>
                🚨 <strong>URGENT:</strong> JAHmere's court date is approaching
                fast!
              </>
            ) : (
              "Every second brings us closer to JAHmere's freedom moment"
            )}
          </motion.p>
        </motion.div>

        {/* Countdown Grid */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12"
        >
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <motion.div
                className={`bg-gradient-to-br ${unit.color} backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 relative overflow-hidden`}
                animate={
                  isUrgent && unit.label === "Days"
                    ? {
                        boxShadow: [
                          "0 0 20px rgba(239, 68, 68, 0.3)",
                          "0 0 40px rgba(239, 68, 68, 0.6)",
                          "0 0 20px rgba(239, 68, 68, 0.3)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Glow effect for urgent countdown */}
                {isUrgent && unit.label === "Days" && (
                  <div className="absolute inset-0 bg-red-400/20 animate-pulse" />
                )}

                <div className="relative z-10">
                  <unit.icon className="w-8 h-8 text-white/80 mx-auto mb-3" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={unit.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-4xl md:text-6xl font-black text-white mb-2"
                    >
                      {unit.value.toString().padStart(2, "0")}
                    </motion.div>
                  </AnimatePresence>

                  <div className="text-white/90 font-bold text-sm md:text-base uppercase tracking-wide">
                    {unit.label}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="mb-8">
            <p className="text-lg md:text-xl text-white/80 mb-2">
              Court Date:{" "}
              <span className="font-bold text-white">
                Monday, July 28, 2025 at 9:00 AM EST
              </span>
            </p>
            <p className="text-base md:text-lg text-white/60">
              Orange County Courthouse, Orlando, Florida
            </p>
          </div>

          {isUrgent && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-8"
            >
              <Button
                onClick={handleUrgentAction}
                size="lg"
                className="px-12 py-6 text-xl font-black bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="w-6 h-6 mr-3 animate-pulse" />
                URGENT: Join the Prayer Army Now!
              </Button>
            </motion.div>
          )}

          {/* Progress Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${isUrgent ? "bg-red-400 animate-pulse" : "bg-amber-400"}`}
              ></div>
              <span>Live Updates Every Second</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span>Prayer Warriors Activated: 1,337+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>Global Reach: 144,000+ Lightworkers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
