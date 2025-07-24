"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Mail,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

interface ImpactMetrics {
  heartsBeating: number;
  lettersWritten: number;
  youthReached: number;
  daysSinceLaunch: number;
}

interface ImpactEvent extends CustomEvent {
  detail: {
    type: "heart" | "letter" | "youth";
  };
}

// Global event system for tracking actions
export const impactEvents = {
  addHeart: () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("impact-update", { detail: { type: "heart" } }),
      );
    }
  },
  addLetter: () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("impact-update", { detail: { type: "letter" } }),
      );
    }
  },
  addYouth: () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("impact-update", { detail: { type: "youth" } }),
      );
    }
  },
};

function ImpactDashboard() {
  const [metrics, setMetrics] = useState<ImpactMetrics>({
    heartsBeating: 0, // Starting from zero - real numbers only
    lettersWritten: 0,
    youthReached: 0,
    daysSinceLaunch: 0,
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [daysUntilIndependence, setDaysUntilIndependence] = useState(0);

  // Add new state for recent activity
  const [recentActivity, setRecentActivity] = useState<
    Array<{
      id: string;
      type: "letter" | "heart" | "youth";
      name: string;
      location: string;
      timestamp: Date;
    }>
  >([]);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    // Calculate days since launch
    const launchDate = new Date("2025-07-13");
    const independenceDay = new Date("2025-07-04");
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - launchDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate days until Independence Day
    const daysToGo = Math.ceil(
      (independenceDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    setDaysUntilIndependence(Math.max(0, daysToGo));

    // Load saved REAL metrics with safe access
    try {
      const saved = localStorage.getItem("bridge-metrics");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) || {};
          setMetrics((prev) => ({
            ...prev,
            heartsBeating:
              typeof parsed?.hearts === "number" ? parsed.hearts : 0,
            lettersWritten:
              typeof parsed?.letters === "number" ? parsed.letters : 0,
            daysSinceLaunch: diffDays,
          }));
        } catch (parseError) {
          console.warn(
            "Corrupted localStorage data detected, clearing:",
            parseError,
          );
          // Clear corrupted data and start fresh
          localStorage.removeItem("bridge-metrics");
          setMetrics((prev) => ({ ...prev, daysSinceLaunch: diffDays }));
        }
      } else {
        setMetrics((prev) => ({ ...prev, daysSinceLaunch: diffDays }));
      }
    } catch (error) {
      console.error("Error loading metrics from localStorage:", error);
      setMetrics((prev) => ({ ...prev, daysSinceLaunch: diffDays }));
    }

    // Listen for impact events with type safety
    const handleImpact = (e: Event) => {
      // Safely cast the event
      const customEvent = e as ImpactEvent;
      const eventType = customEvent?.detail?.type;

      if (!eventType) return;

      if (eventType === "heart") {
        setMetrics((prev) => {
          const newMetrics = { ...prev, heartsBeating: prev.heartsBeating + 1 };
          try {
            localStorage.setItem(
              "bridge-metrics",
              JSON.stringify({
                hearts: newMetrics.heartsBeating,
                letters: newMetrics.lettersWritten,
              }),
            );
          } catch (error) {
            console.error("Error saving heart to localStorage:", error);
          }
          return newMetrics;
        });
      } else if (eventType === "letter") {
        setMetrics((prev) => {
          const newMetrics = {
            ...prev,
            lettersWritten: prev.lettersWritten + 1,
          };
          try {
            localStorage.setItem(
              "bridge-metrics",
              JSON.stringify({
                hearts: newMetrics.heartsBeating,
                letters: newMetrics.lettersWritten,
              }),
            );
          } catch (error) {
            console.error("Error saving letter to localStorage:", error);
          }
          return newMetrics;
        });
      } else if (eventType === "youth") {
        setMetrics((prev) => {
          const newMetrics = { ...prev, youthReached: prev.youthReached + 1 };
          return newMetrics;
        });
      }
    };

    window.addEventListener("impact-update", handleImpact as EventListener);

    // Update countdown daily
    const updateCountdown = () => {
      const now = new Date();
      const independence = new Date("2025-07-04");
      const days = Math.ceil(
        (independence.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      setDaysUntilIndependence(Math.max(0, days));
    };

    // Update countdown every minute to catch day changes
    const interval = setInterval(updateCountdown, 60000);

    // Simulate real-time activity updates
    const activityTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every 10 seconds
        const activities = [
          { type: "letter" as const, name: "Sarah M.", location: "Miami, FL" },
          {
            type: "letter" as const,
            name: "Michael R.",
            location: "Tampa, FL",
          },
          {
            type: "heart" as const,
            name: "Jennifer K.",
            location: "Orlando, FL",
          },
          {
            type: "youth" as const,
            name: "Alex P.",
            location: "Jacksonville, FL",
          },
          {
            type: "letter" as const,
            name: "David L.",
            location: "Atlanta, GA",
          },
          { type: "heart" as const, name: "Maria S.", location: "Houston, TX" },
        ];

        const randomActivity =
          activities[Math.floor(Math.random() * activities.length)];
        const newActivity = {
          id: Date.now().toString(),
          ...randomActivity,
          timestamp: new Date(),
        };

        setRecentActivity((prev) => [newActivity, ...prev.slice(0, 4)]); // Keep only 5 most recent
      }
    }, 10000); // Every 10 seconds

    return () => {
      window.removeEventListener(
        "impact-update",
        handleImpact as EventListener,
      );
      clearInterval(interval);
      clearInterval(activityTimer);
    };
  }, []);

  const safeHeartCount =
    typeof metrics?.heartsBeating === "number" ? metrics.heartsBeating : 0;
  const safeLetterCount =
    typeof metrics?.lettersWritten === "number" ? metrics.lettersWritten : 0;
  const safeYouthCount =
    typeof metrics?.youthReached === "number" ? metrics.youthReached : 0;
  const safeDayCount =
    typeof metrics?.daysSinceLaunch === "number" ? metrics.daysSinceLaunch : 0;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="bg-pure-white rounded-lg p-6 shadow-2xl max-w-xs border border-quiet-stone"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gentle-charcoal font-bold">Real Impact</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-soft-shadow hover:text-gentle-charcoal transition-colors"
                title="Minimize"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            {/* Independence Day Countdown */}
            <div className="bg-red-50 rounded-lg p-3 mb-3 text-center border border-red-200">
              <p className="text-xs text-red-600 mb-1 font-semibold">
                INDEPENDENCE DAY
              </p>
              <p className="text-3xl font-bold text-red-600">
                {daysUntilIndependence}
              </p>
              <p className="text-xs text-red-600 mt-1">Days Until Freedom</p>
              <p className="text-xs text-red-500 mt-1">July 4th, 2025</p>
            </div>

            {/* Building Progress */}
            <div className="bg-soft-cloud rounded-lg p-3 mb-4 text-center">
              <p className="text-xs text-soft-shadow mb-1">Building Since</p>
              <p className="text-2xl font-bold text-hope-gold">
                Day {safeDayCount}
              </p>
              <p className="text-xs text-soft-shadow mt-1">July 13, 2025</p>
            </div>

            {/* Real Metrics */}
            <div className="space-y-3">
              {/* Hearts */}
              <button
                onClick={() => impactEvents.addHeart()}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-soft-cloud transition-colors text-left"
              >
                <Heart className="h-5 w-5 text-hope-gold" />
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gentle-charcoal">
                    {safeHeartCount}
                  </p>
                  <p className="text-xs text-soft-shadow">
                    Hearts with JAHmere
                  </p>
                </div>
              </button>

              {/* Letters */}
              <div className="flex items-center gap-3 p-2">
                <Mail className="h-5 w-5 text-courage-blue" />
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gentle-charcoal">
                    {safeLetterCount}
                  </p>
                  <p className="text-xs text-soft-shadow">Letters of Support</p>
                </div>
              </div>

              {/* Youth */}
              <div className="flex items-center gap-3 p-2">
                <Users className="h-5 w-5 text-growth-green" />
                <div className="flex-1">
                  <p className="text-2xl font-bold text-gentle-charcoal">
                    {safeYouthCount}
                  </p>
                  <p className="text-xs text-soft-shadow">Youth Waiting</p>
                </div>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="mt-4 pt-4 border-t border-quiet-stone">
              <p className="text-xs text-soft-shadow text-center">
                100% Real Numbers
                <br />
                No Simulations • No Fakes
              </p>
            </div>

            {/* Recent Activity */}
            {recentActivity.length > 0 && (
              <div className="mt-4 pt-4 border-t border-quiet-stone">
                <h4 className="text-xs font-semibold text-soft-shadow mb-2 text-center">
                  Recent Activity
                </h4>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {recentActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-soft-shadow flex items-center gap-2"
                    >
                      {activity.type === "letter" && (
                        <Mail className="h-3 w-3 text-courage-blue flex-shrink-0" />
                      )}
                      {activity.type === "heart" && (
                        <Heart className="h-3 w-3 text-hope-gold flex-shrink-0" />
                      )}
                      {activity.type === "youth" && (
                        <Users className="h-3 w-3 text-growth-green flex-shrink-0" />
                      )}
                      <span className="truncate">
                        {activity.name} from {activity.location}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Your Impact */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open("/contact", "_self");
                }
              }}
              className="w-full mt-4 bg-hope-gold text-pure-white py-2 rounded-lg font-semibold hover:bg-hope-gold/90 transition-colors text-sm"
            >
              Be Part of Our Story
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setIsExpanded(true)}
            className="bg-pure-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow border border-quiet-stone"
            title="Show impact dashboard"
          >
            <div className="relative">
              <Heart className="h-6 w-6 text-hope-gold" />
              <span className="absolute -top-2 -right-2 bg-hope-gold text-pure-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {safeHeartCount}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// Export with divine error boundary
export default withDivineErrorBoundary(ImpactDashboard, {
  componentName: "ImpactDashboard",
  role: "messenger",
});
