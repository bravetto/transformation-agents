"use client";
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Users,
  Eye,
  Globe,
  Share2,
  Clock,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart2,
  Heart,
  Activity,
  RefreshCw,
} from "lucide-react";
import { withDivineErrorBoundary } from "./ui/divine-error-boundary";
import { type DivineRole } from "@/lib/design-system";
import { DivineParticles } from "./divine-particles";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// Define metric card interface
interface MetricCard {
  id: string;
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  gradient: string;
  description: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "stable";
    timeframe: string;
  };
  goal?: number;
  role: DivineRole;
}

// Define props for the dashboard component
interface DivineImpactDashboardProps {
  className?: string;
  refreshInterval?: number; // in ms
  autoRefresh?: boolean;
  defaultRole?: DivineRole;
  metrics?: Partial<MetricCard>[];
}

// Define props for metric card component
interface MetricCardProps {
  metric: MetricCard;
  animate?: boolean;
  className?: string;
}

/**
 * Metric Card Component
 * Displays a single metric with animations and trend indicators
 */
const MetricCard = React.memo(function MetricCard({
  metric,
  animate = false,
  className = "",
}: MetricCardProps) {
  const Icon = metric.icon;
  const TrendIcon =
    metric.trend?.direction === "up"
      ? TrendingUp
      : metric.trend?.direction === "down"
        ? TrendingDown
        : Minus;

  const trendColorClass =
    metric.trend?.direction === "up"
      ? "text-green-500"
      : metric.trend?.direction === "down"
        ? "text-red-500"
        : "text-gray-400";

  // Calculate progress percentage if goal exists
  const progressPercentage = metric.goal
    ? Math.min(100, (metric.value / metric.goal) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-xl shadow-lg p-6",
        `bg-gradient-to-br ${metric.gradient}`,
        "text-white",
        className,
      )}
    >
      {/* Background particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <DivineParticles role={metric.role} variant="divine" />
      </div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Header with icon and title */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{metric.title}</h3>
          <div className="p-2 bg-white/20 rounded-lg">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Value with animation */}
        <div className="mb-2">
          {animate ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-3xl font-bold flex items-baseline"
            >
              <motion.span
                key={metric.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {metric.value.toLocaleString()}
              </motion.span>
              {metric.suffix && (
                <span className="ml-1 text-xl opacity-80">{metric.suffix}</span>
              )}
            </motion.div>
          ) : (
            <div className="text-3xl font-bold flex items-baseline">
              <span>{metric.value.toLocaleString()}</span>
              {metric.suffix && (
                <span className="ml-1 text-xl opacity-80">{metric.suffix}</span>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm opacity-80 mb-4">{metric.description}</p>

        {/* Progress bar if goal exists */}
        {progressPercentage !== null && (
          <div className="mb-3">
            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-white/70 rounded-full"
              />
            </div>
            <div className="flex justify-between mt-1 text-xs opacity-80">
              <span>Progress</span>
              <span>
                {Math.round(progressPercentage)}% of {metric.goal}
              </span>
            </div>
          </div>
        )}

        {/* Trend indicator */}
        {metric.trend && (
          <div className="flex items-center mt-2">
            <div className={`flex items-center ${trendColorClass}`}>
              <TrendIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">
                {metric.trend.value.toFixed(1)}%
              </span>
            </div>
            <span className="text-xs opacity-70 ml-2">
              {metric.trend.timeframe}
            </span>
          </div>
        )}
      </div>

      {/* Pulse effect for real-time metrics */}
      <div className="absolute top-3 right-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      </div>
    </motion.div>
  );
});

// Display name for devtools
MetricCard.displayName = "MetricCard";

// Mock data generator function (for demo purposes)
const generateMockData = (): MetricCard[] => {
  return [
    {
      id: "tony-reach",
      title: "Tony's Reach",
      value: 950000,
      suffix: "followers",
      icon: Users,
      gradient: "from-amber-500 to-orange-600",
      description: "NFL legend Tony Dungy's active followers",
      trend: {
        value: 15.2,
        direction: "up",
        timeframe: "since announcement",
      },
      role: "messenger",
    },
    {
      id: "bravetto-investment",
      title: "Bravëtto Investment",
      value: 2500000,
      suffix: "$",
      icon: BarChart2,
      gradient: "from-emerald-500 to-teal-600",
      description: "Personal commitment from Michael Mataluni",
      trend: {
        value: 100,
        direction: "up",
        timeframe: "committed",
      },
      role: "guardian",
    },
    {
      id: "greatness-assessments",
      title: "Greatness Zone Matches",
      value: 127,
      icon: Star,
      gradient: "from-blue-500 to-indigo-600",
      description: "Youth matched to their ideal roles",
      trend: {
        value: 23.5,
        direction: "up",
        timeframe: "this week",
      },
      goal: 500,
      role: "lightworker",
    },
    {
      id: "churches-united",
      title: "Churches United",
      value: 312,
      icon: Heart,
      gradient: "from-violet-500 to-purple-600",
      description: "Congregations actively praying and supporting",
      trend: {
        value: 45.8,
        direction: "up",
        timeframe: "since launch",
      },
      goal: 1000,
      role: "witness",
    },
    {
      id: "letters-submitted",
      title: "Letters to Judge",
      value: 51247,
      icon: Mail,
      gradient: "from-pink-500 to-rose-600",
      description: "Support letters submitted and counting",
      trend: {
        value: 312.7,
        direction: "up",
        timeframe: "last 24 hours",
      },
      goal: 100000,
      role: "messenger",
    },
  ];
};

/**
 * Divine Impact Dashboard
 *
 * A real-time dashboard showing The Bridge Project's growing influence and community support.
 * Features animated metric cards, trend indicators, and goal tracking.
 */
function DivineImpactDashboard({
  className = "",
  refreshInterval = 30000, // default to 30 seconds
  autoRefresh = true,
  defaultRole = "messenger",
  metrics = [],
}: DivineImpactDashboardProps) {
  // State for metrics data
  const [metricsData, setMetricsData] = useState<MetricCard[]>([]);

  // State for animation control
  const [animateValues, setAnimateValues] = useState(true);

  // State for refresh tracking
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // State for active role filter
  const [activeRole, setActiveRole] = useState<DivineRole | "all">(defaultRole);

  // Initialize metrics data with mock data or provided metrics
  useEffect(() => {
    const mockData = generateMockData();

    // If custom metrics are provided, merge them with mock data
    if (metrics && metrics.length > 0) {
      const mergedData = mockData.map((mockMetric) => {
        const customMetric = metrics.find((m) => m.id === mockMetric.id);
        return customMetric ? { ...mockMetric, ...customMetric } : mockMetric;
      });

      setMetricsData(mergedData);
    } else {
      setMetricsData(mockData);
    }

    // Initial animation
    setAnimateValues(true);

    // Disable animation after initial render
    const timer = setTimeout(() => {
      setAnimateValues(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [metrics]);

  // Function to refresh data with small random changes (for demo purposes)
  const refreshData = useCallback(() => {
    setIsRefreshing(true);

    // Simulate API call delay
    setTimeout(() => {
      setMetricsData((prevMetrics) =>
        prevMetrics.map((metric) => {
          // Generate a small random change (+/- 0-5%)
          const changePercent =
            Math.random() * 5 * (Math.random() > 0.7 ? 1 : -1);
          const newValue = Math.max(
            0,
            metric.value * (1 + changePercent / 100),
          );

          // Update trend direction based on change
          const trendDirection =
            changePercent > 0 ? "up" : changePercent < 0 ? "down" : "stable";

          return {
            ...metric,
            value: Number(newValue.toFixed(metric.value < 10 ? 1 : 0)),
            trend: metric.trend
              ? {
                  ...metric.trend,
                  value: Math.abs(changePercent),
                  direction: trendDirection as "up" | "down" | "stable",
                }
              : undefined,
          };
        }),
      );

      setLastRefreshed(new Date());
      setIsRefreshing(false);

      // Briefly enable animations for the refresh
      setAnimateValues(true);
      setTimeout(() => {
        setAnimateValues(false);
      }, 1000);
    }, 800);
  }, []);

  // Set up auto-refresh interval
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshData]);

  // Memoize filtered metrics to prevent unnecessary recalculations
  const filteredMetrics = useMemo(() => {
    return activeRole === "all"
      ? metricsData
      : metricsData.filter((metric) => metric.role === activeRole);
  }, [metricsData, activeRole]);

  // Memoize role buttons for consistent rendering
  const roleFilterButtons = useMemo(() => {
    const roles: Array<DivineRole | "all"> = [
      "all",
      "lightworker",
      "messenger",
      "witness",
      "guardian",
    ];

    return (
      <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition",
              activeRole === role
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-white/50 dark:hover:bg-gray-700/50",
            )}
          >
            {role === "all"
              ? "All"
              : role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    );
  }, [activeRole]);

  // Render the dashboard
  return (
    <div className={cn("relative", className)}>
      {/* Background particles */}
      <div className="absolute inset-0 -z-10">
        <DivineParticles role={defaultRole} variant="divine" />
      </div>

      {/* Dashboard header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
            DIVINE ALLIANCE IMPACT CENTER
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time metrics showing our movement's unstoppable momentum
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          {/* Role filter buttons */}
          {roleFilterButtons}

          {/* Refresh button */}
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition"
          >
            <RefreshCw
              className={cn("h-4 w-4", isRefreshing ? "animate-spin" : "")}
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Last refreshed indicator */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Last updated: {lastRefreshed.toLocaleTimeString()}
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              animate={animateValues}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredMetrics.length === 0 && (
        <div className="text-center py-12">
          <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No metrics available</h3>
          <p className="text-gray-500">
            No metrics found for the selected filter. Try selecting a different
            role.
          </p>
        </div>
      )}
    </div>
  );
}

// Export with divine error boundary and React.memo for performance
const DivineImpactDashboardWithErrorBoundary = React.memo(
  withDivineErrorBoundary(DivineImpactDashboard, {
    componentName: "DivineImpactDashboard",
  }),
);

// Named export
export { DivineImpactDashboardWithErrorBoundary as DivineImpactDashboard };

// Default export for backward compatibility
export default DivineImpactDashboardWithErrorBoundary;
