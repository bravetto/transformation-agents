"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "./with-safe-ui";

interface SupporterCountProps {
  current: number;
  goal?: number;
  text?: string;
  className?: string;
  variant?: "inline" | "card" | "hero";
  showProgress?: boolean;
}

function SupporterCount({
  current,
  goal = 5000,
  text = "supporters have written to Judge Ferrero",
  className,
  variant = "card",
  showProgress = true,
}: SupporterCountProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  // Animate counter on mount
  const [displayCount, setDisplayCount] = React.useState(0);

  React.useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = current / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayCount(Math.floor(increment * currentStep));
      } else {
        setDisplayCount(current);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [current]);

  if (variant === "inline") {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <Users className="h-4 w-4 text-hope-gold" />
        <span className="font-bold text-hope-gold">
          {displayCount.toLocaleString()}
        </span>
        <span className="text-sm text-soft-shadow">{text}</span>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={cn("text-center mx-auto container-tight", className)}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-responsive-hero font-bold text-hope-gold mb-2"
        >
          {displayCount.toLocaleString()}
        </motion.div>
        <p className="text-responsive-sub text-soft-shadow mb-6">{text}</p>
        {showProgress && (
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-soft-shadow mb-2">
              <span>Current</span>
              <span>Goal: {goal.toLocaleString()}</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-hope-gold to-courage-blue"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="text-sm text-soft-shadow mt-2">
              {(goal - current).toLocaleString()} more needed to reach our goal
            </p>
          </div>
        )}
      </div>
    );
  }

  // Default card variant
  return (
    <div
      className={cn(
        "bg-white rounded-xl border-2 border-hope-gold/20 p-6 shadow-lg",
        className,
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gentle-charcoal mb-1">
            Community Support
          </h3>
          <p className="text-sm text-soft-shadow">
            Real people making a real difference
          </p>
        </div>
        <div className="p-3 bg-hope-gold/10 rounded-full">
          <Users className="h-6 w-6 text-hope-gold" />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-hope-gold">
            {displayCount.toLocaleString()}
          </span>
          <span className="text-sm text-soft-shadow">
            / {goal.toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-soft-shadow">{text}</p>
      </div>

      {showProgress && (
        <>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-hope-gold to-courage-blue"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-soft-shadow">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{percentage.toFixed(0)}% of goal</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              <span>{(goal - current).toLocaleString()} to go</span>
            </div>
          </div>
        </>
      )}

      {/* Recent activity indicator */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"
              />
            ))}
          </div>
          <p className="text-xs text-soft-shadow">
            +{Math.floor(Math.random() * 10) + 5} in the last hour
          </p>
        </div>
      </div>
    </div>
  );
}

// Live updating version that simulates real-time updates
export function LiveSupporterCount(props: SupporterCountProps) {
  const [current, setCurrent] = React.useState(props.current);

  React.useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCurrent((prev) => prev + Math.floor(Math.random() * 3));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return <SupporterCount {...props} current={current} />;
}

export default withSafeUI(SupporterCount, {
  componentName: "SupporterCount",
});
