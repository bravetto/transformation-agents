"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
import {
  withDivineErrorBoundary,
  DivineRole,
} from "./ui/divine-error-boundary";
import DivineParticles from "./divine-particles";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { EasterEgg } from "@/components/divine-easter-eggs";

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
        <DivineParticles
          variant="minimal"
          intensity="low"
          interactive={false}
        />
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
      id: "letters",
      title: "Letters Submitted",
      value: 427,
      icon: Mail,
      gradient: "from-blue-500 to-indigo-600",
      description: "Character reference letters submitted to Judge Ferrero",
      trend: {
        value: 12.8,
        direction: "up",
        timeframe: "since last week",
      },
      goal: 500,
      role: "messenger",
    },
    {
      id: "volunteers",
      title: "Volunteers Registered",
      value: 189,
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      description: "Active volunteers supporting The Bridge Project",
      trend: {
        value: 8.3,
        direction: "up",
        timeframe: "since last month",
      },
      goal: 250,
      role: "witness",
    },
    {
      id: "views",
      title: "Page Views",
      value: 24691,
      icon: Eye,
      gradient: "from-violet-500 to-purple-600",
      description: "Total visitors to JAHmere's story",
      trend: {
        value: 35.2,
        direction: "up",
        timeframe: "since campaign launch",
      },
      role: "guardian",
    },
    {
      id: "reach",
      title: "Geographic Reach",
      value: 42,
      suffix: "states",
      icon: Globe,
      gradient: "from-amber-500 to-orange-600",
      description: "US states with registered supporters",
      trend: {
        value: 3,
        direction: "up",
        timeframe: "in the last 30 days",
      },
      goal: 50,
      role: "lightworker",
    },
    {
      id: "shares",
      title: "Social Shares",
      value: 3872,
      icon: Share2,
      gradient: "from-pink-500 to-rose-600",
      description: "Shares across social media platforms",
      trend: {
        value: 18.7,
        direction: "up",
        timeframe: "since last week",
      },
      role: "messenger",
    },
    {
      id: "time",
      title: "Avg. Reading Time",
      value: 5.3,
      suffix: "min",
      icon: Clock,
      gradient: "from-cyan-500 to-blue-600",
      description: "Average time spent reading JAHmere's story",
      trend: {
        value: 0.8,
        direction: "up",
        timeframe: "since last month",
      },
      role: "witness",
    },
    {
      id: "score",
      title: "Letter Quality Score",
      value: 87.2,
      suffix: "%",
      icon: Star,
      gradient: "from-amber-500 to-yellow-600",
      description: "Average impact score of submitted letters",
      trend: {
        value: 2.4,
        direction: "up",
        timeframe: "since guided form launch",
      },
      goal: 95,
      role: "lightworker",
    },
    {
      id: "engagement",
      title: "Story Engagement",
      value: 68.9,
      suffix: "%",
      icon: Heart,
      gradient: "from-red-500 to-rose-600",
      description: "Percentage of visitors who engage with content",
      trend: {
        value: 5.2,
        direction: "up",
        timeframe: "in the last 14 days",
      },
      goal: 75,
      role: "guardian",
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
  metrics = [],
  className = "",
  autoRefresh = false,
  refreshInterval = 30000,
  defaultRole = "lightworker",
}: DivineImpactDashboardProps) {
  // 🛡️ CRITICAL DEBUG: Track render cycles to prevent infinite loops
  const renderCount = useRef(0);
  const componentName = "DivineImpactDashboard";

  // Increment render count and log if excessive
  renderCount.current++;
  if (renderCount.current > 10) {
    console.warn(
      `🚨 ${componentName} excessive renders: ${renderCount.current}`,
    );
  }

  // State for metrics data
  const [metricsData, setMetricsData] = useState<MetricCard[]>([]);

  // State for animation control
  const [animateValues, setAnimateValues] = useState(true);

  // State for refresh tracking
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // State for active role filter
  const [activeRole, setActiveRole] = useState<DivineRole | "all">(defaultRole);

  // 🛡️ CRITICAL FIX: Use ref to prevent re-renders
  const isMounted = useRef(true);

  // 🛡️ CRITICAL FIX: Reset render count on mount
  useEffect(() => {
    renderCount.current = 0;
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // 🛡️ CRITICAL FIX: Memoize setAnimationTimer to prevent infinite loops
  const setAnimationTimer = useCallback(() => {
    return setTimeout(() => {
      if (isMounted.current) {
        setAnimateValues(false);
      }
    }, 2000);
  }, []); // Empty deps - this function is stable

  // 🛡️ CRITICAL FIX: Initialize data with proper dependencies
  useEffect(() => {
    if (!isMounted.current) return;

    const mockData = generateMockData();

    if (metrics && metrics.length > 0) {
      const mergedData = mockData.map((mockMetric) => {
        const customMetric = metrics.find((m) => m.id === mockMetric.id);
        return customMetric ? { ...mockMetric, ...customMetric } : mockMetric;
      });

      setMetricsData(mergedData);
    } else {
      setMetricsData(mockData);
    }

    // Initial animation - LINE 385: Sacred animation trigger
    setAnimateValues(true);

    // Disable animation after initial render
    const timer = setAnimationTimer();

    return () => {
      clearTimeout(timer);
      isMounted.current = false;
    };
  }, [metrics, setAnimationTimer]); // 🔥 FIXED: Added setAnimationTimer to deps since it's now stable

  // 🛡️ CRITICAL FIX: Stabilize refresh function with useCallback and functional updates
  const refreshData = useCallback(() => {
    if (!isMounted.current) return;

    setIsRefreshing(true);

    // Simulate API call delay
    setTimeout(() => {
      if (!isMounted.current) return;

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
      const timer = setAnimationTimer();

      // Clean up timer if component unmounts
      return () => clearTimeout(timer);
    }, 800);
  }, [setAnimationTimer]); // 🌟 REMOVED setAnimationTimer from deps - it's stable with []

  // 🛡️ CRITICAL FIX: Set up auto-refresh interval with stable dependencies
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(refreshData, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshData]);

  // Memoize filtered metrics to prevent unnecessary recalculations
  const filteredMetrics = useMemo(() => {
    return activeRole === "all"
      ? metricsData
      : metricsData.filter((metric) => metric.role === activeRole);
  }, [metricsData, activeRole]);

  // 🛡️ CRITICAL FIX: Extract click handler to prevent setState-in-render violation
  const handleRoleChange = useCallback((role: DivineRole | "all") => {
    setActiveRole(role);
  }, []);

  // 🛡️ CRITICAL FIX: Remove setState from useMemo to prevent infinite loops
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
            onClick={() => handleRoleChange(role)}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition",
              activeRole === role
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100",
            )}
          >
            {role === "all"
              ? "All Roles"
              : role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    );
  }, [activeRole, handleRoleChange]); // 🛡️ FIXED: Only depend on activeRole and handleRoleChange

  // 🛡️ CRITICAL FIX: Memoize particle variant to prevent unnecessary re-renders
  const particleVariant = useMemo(() => {
    const roleVariantMap = {
      lightworker: "sacred",
      messenger: "divine",
      witness: "light",
      guardian: "starfield",
      all: "unified",
    } as const;

    return (
      roleVariantMap[activeRole as keyof typeof roleVariantMap] || "unified"
    );
  }, [activeRole]);

  // Render the dashboard
  return (
    <div className={`relative ${className}`}>
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <DivineParticles variant={particleVariant} density="medium" />
      </div>

      {/* Dashboard Header with Easter Egg */}
      <div className="relative z-10 mb-6">
        <EasterEgg eggId="hidden-scripture-cipher" className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-2"
          >
            🌟 Divine Impact Dashboard 🌟
          </motion.h2>
          <p className="text-white/80 text-lg">
            Witnessing the Bridge Project's Growing Influence
          </p>
        </EasterEgg>
      </div>

      {/* Analytics Dashboard Easter Egg */}
      <EasterEgg eggId="divine-synchronicity-complete" className="mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            📊 Real-Time Divine Metrics
          </h3>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricsData.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </motion.div>
      </EasterEgg>

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

// 🛡️ DIVINE ERROR BOUNDARY: Wrap component with error boundary
const DivineImpactDashboardWithErrorBoundary = withDivineErrorBoundary(
  DivineImpactDashboard,
  {
    componentName: "DivineImpactDashboard",
  },
);

// Default export for backward compatibility
export default DivineImpactDashboardWithErrorBoundary;
