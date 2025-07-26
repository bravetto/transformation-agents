"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Heart, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CountdownDisplayProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  variant?: "default" | "compact" | "dramatic";
}

const CountdownDisplay = ({
  days,
  hours,
  minutes,
  seconds,
  variant = "default",
}: CountdownDisplayProps) => {
  const timeUnits = [
    { value: days, label: "Days", icon: <Calendar className="w-6 h-6" /> },
    { value: hours, label: "Hours", icon: <Clock className="w-5 h-5" /> },
    { value: minutes, label: "Minutes", icon: <Heart className="w-5 h-5" /> },
    { value: seconds, label: "Seconds", icon: <Scale className="w-5 h-5" /> },
  ];

  if (variant === "compact") {
    return (
      <div className="text-center text-white">
        <div className="text-4xl font-bold mb-2">
          {days}d {hours}h {minutes}m
        </div>
        <div className="text-white/80">Until July 28th</div>
      </div>
    );
  }

  if (variant === "dramatic") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl border border-white/20"
      >
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
          {days}
        </div>
        <div className="text-white/90 text-xl font-semibold mb-2">
          Days Until Freedom
        </div>
        <div className="text-white/70 text-sm">July 28, 2025 • 2:37 PM</div>
        <div className="text-white/50 text-xs mt-2">
          Divine timing confirmed
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="p-4 text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="flex justify-center mb-3 text-white/80">
              {unit.icon}
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {unit.value}
            </div>
            <div className="text-sm text-white/70 font-medium">
              {unit.label}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

interface StaticCountdownProps {
  targetDate?: string; // ISO date string
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact" | "dramatic";
  className?: string;
}

export default function StaticCountdown({
  targetDate = "2025-07-28T14:37:00", // July 28, 2025 at 2:37 PM
  title = "Freedom Timeline",
  subtitle = "JAHmere Webb's Scheduled Hearing",
  variant = "default",
  className = "",
}: StaticCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  // Calculate time difference - hydration safe
  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Event has passed - show celebration or completion message
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second, but only after mounted to avoid hydration issues
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Show initial state until mounted to avoid hydration mismatch
  if (!mounted) {
    // Calculate a static initial state to match what will be shown after hydration
    const target = new Date(targetDate).getTime();
    const staticNow = new Date("2025-07-21").getTime(); // Approximate current date
    const difference = target - staticNow;
    const staticDays = Math.max(
      0,
      Math.floor(difference / (1000 * 60 * 60 * 24)),
    );

    return (
      <div className={className}>
        <CountdownDisplay
          days={staticDays}
          hours={0}
          minutes={0}
          seconds={0}
          variant={variant}
        />
      </div>
    );
  }

  const hasTimeLeft =
    timeLeft.days > 0 ||
    timeLeft.hours > 0 ||
    timeLeft.minutes > 0 ||
    timeLeft.seconds > 0;

  if (!hasTimeLeft) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center p-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl border border-green-400/30 ${className}`}
      >
        <div className="text-4xl font-bold text-green-400 mb-4">🎉</div>
        <div className="text-2xl font-bold text-white mb-2">
          The Day Has Arrived!
        </div>
        <div className="text-white/80">July 28, 2025 - Freedom Day</div>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      {(title || subtitle) && variant !== "compact" && (
        <div className="text-center mb-8">
          {title && (
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          )}
          {subtitle && <p className="text-white/80">{subtitle}</p>}
        </div>
      )}

      <CountdownDisplay {...timeLeft} variant={variant} />

      {variant === "default" && (
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Every moment counts • Justice delayed is justice denied
          </p>
        </div>
      )}
    </div>
  );
}
