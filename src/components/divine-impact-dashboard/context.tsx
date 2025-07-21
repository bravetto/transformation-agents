"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { generateMockData } from "./mock-data";
import type {
  DashboardContextType,
  DashboardProviderProps,
  MetricCard,
} from "./types";
import { withErrorBoundary } from "@/components/with-error-boundary";

// 🚨 DEBUG: Track render count to detect loops
let renderCount = 0;

// Create the context with a default value
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

/**
 * Custom hook to use the dashboard context
 */
function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}

/**
 * Dashboard Provider Component
 * Manages state and data fetching for the dashboard
 */
export function DivineImpactProvider({
  children,
  refreshInterval = 30000, // default to 30 seconds
  autoRefresh = true,
  defaultRole = "messenger",
  initialMetrics = [],
}: DashboardProviderProps) {
  // 🚨 DEBUG: Count renders to detect infinite loops
  renderCount++;
  console.warn(`🔍 DashboardProvider render #${renderCount}`);

  // 🛡️ CRITICAL FIX: ALL React hooks MUST come BEFORE any conditional returns
  // State for metrics data (moved before conditional return)
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 🛡️ CRITICAL FIX: Use ref to prevent re-renders and track mount status
  const isMounted = useRef(true);

  // 🛡️ CRITICAL FIX: Move initialMetrics to ref to prevent recreation
  const initialMetricsRef = useRef(initialMetrics);
  initialMetricsRef.current = initialMetrics;

  // 🛡️ CRITICAL FIX: Stabilize function WITHOUT dependencies that change
  const refreshData = useCallback(async () => {
    if (!isMounted.current) return;

    try {
      setLoading(true);

      // In a real app, this would be an API call
      // For now, we're using mock data
      const data = generateMockData();

      // If initial metrics were provided, merge them with the generated data
      const currentInitialMetrics = initialMetricsRef.current;
      if (currentInitialMetrics.length > 0) {
        const mergedData = data.map((metric) => {
          const initialMetric = currentInitialMetrics.find(
            (m: Partial<MetricCard>) => m.id === metric.id,
          );
          return initialMetric ? { ...metric, ...initialMetric } : metric;
        });

        if (isMounted.current) {
          setMetrics(mergedData);
        }
      } else {
        if (isMounted.current) {
          setMetrics(data);
        }
      }

      if (isMounted.current) {
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []); // 🚨 CRITICAL: Empty dependency array to prevent recreation

  // 🛡️ CRITICAL FIX: Initial data load with proper cleanup - ONLY run once
  useEffect(() => {
    refreshData();

    return () => {
      isMounted.current = false;
    };
  }, [refreshData]); // Include refreshData dependency

  // 🛡️ CRITICAL FIX: Set up auto-refresh interval with stable dependencies
  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(() => {
      refreshData();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshInterval, refreshData]);

  // 🚨 EMERGENCY: Circuit breaker to prevent infinite loops (AFTER all hooks)
  if (renderCount > 10) {
    console.error("🚨 INFINITE RENDER LOOP DETECTED IN DASHBOARD PROVIDER!");
    return (
      <div className="p-8 bg-red-900/20 rounded-lg text-white">
        <h2 className="text-xl text-red-400 mb-2">
          Dashboard Temporarily Disabled
        </h2>
        <p className="text-gray-300 mb-4">
          Infinite render loop detected ({renderCount} renders)
        </p>
        <button
          onClick={() => {
            renderCount = 0;
            window.location.reload();
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
        >
          Reset Dashboard
        </button>
      </div>
    );
  }

  // Context value
  const value: DashboardContextType = {
    metrics,
    loading,
    lastUpdated,
    refreshData,
    refreshInterval,
    autoRefresh,
    defaultRole,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export default useDashboard;

// Export alias for backward compatibility
export { DivineImpactProvider as DashboardProvider };
