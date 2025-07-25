"use client";

import { useEffect, useCallback, useRef } from "react";
import { trackConversion } from "@/lib/analytics/user-journey";

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

interface PerformanceMonitorProps {
  enableReporting?: boolean;
  sampleRate?: number; // 0-1, defaults to 0.1 (10%)
  component?: string;
}

export function PerformanceMonitor({
  enableReporting = true,
  sampleRate = 0.1,
  component = "unknown",
}: PerformanceMonitorProps) {
  const metricsRef = useRef<PerformanceMetrics>({});
  const reportedRef = useRef(false);

  const reportMetrics = useCallback(
    (metrics: PerformanceMetrics) => {
      // Only report if enabled and sample rate allows
      if (
        !enableReporting ||
        Math.random() > sampleRate ||
        reportedRef.current
      ) {
        return;
      }

      reportedRef.current = true;

      // Report to analytics (lightweight)
      trackConversion({
        eventType: "performance_metrics",
        userType: "divine_mission_supporter",
        metadata: {
          component,
          metrics,
          timestamp: Date.now(),
          mission_days_remaining: Math.ceil(
            (new Date("2025-07-28T14:37:00-04:00").getTime() - Date.now()) /
              (1000 * 60 * 60 * 24),
          ),
        },
      });
    },
    [enableReporting, sampleRate, component],
  );

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // Web Vitals measurement (lightweight implementation)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach((entry) => {
        switch (entry.entryType) {
          case "largest-contentful-paint":
            metricsRef.current.lcp = entry.startTime;
            break;
          case "first-input":
            metricsRef.current.fid = entry.processingStart - entry.startTime;
            break;
          case "layout-shift":
            if (!(entry as any).hadRecentInput) {
              metricsRef.current.cls =
                (metricsRef.current.cls || 0) + (entry as any).value;
            }
            break;
          case "navigation":
            metricsRef.current.ttfb = (
              entry as PerformanceNavigationTiming
            ).responseStart;
            break;
        }
      });

      // Report when we have meaningful data
      if (metricsRef.current.lcp && metricsRef.current.ttfb) {
        reportMetrics(metricsRef.current);
      }
    });

    // Observe Core Web Vitals
    try {
      observer.observe({
        entryTypes: [
          "largest-contentful-paint",
          "first-input",
          "layout-shift",
          "navigation",
        ],
      });
    } catch (e) {
      // Fallback for older browsers
      console.warn("Performance monitoring not supported:", e);
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [reportMetrics]);

  // Only render in development or when explicitly requested
  if (process.env.NODE_ENV === "production" && !enableReporting) {
    return null;
  }

  return null; // This is a monitoring component, no UI needed
}

// Lightweight hook for component-level performance tracking
export function usePerformanceTracking(componentName: string) {
  const startTime = useRef<number>();
  const mountTime = useRef<number>();

  useEffect(() => {
    startTime.current = performance.now();
    mountTime.current = Date.now();

    return () => {
      if (startTime.current) {
        const renderTime = performance.now() - startTime.current;

        // Only track slow renders (>16ms = 60fps threshold)
        if (renderTime > 16) {
          trackConversion({
            eventType: "slow_component_render",
            userType: "divine_mission_supporter",
            metadata: {
              component: componentName,
              renderTime,
              threshold: 16,
              mission_critical: true,
            },
          });
        }
      }
    };
  }, [componentName]);

  const trackInteraction = useCallback(
    (action: string, data?: Record<string, any>) => {
      trackConversion({
        eventType: "component_interaction",
        userType: "divine_mission_supporter",
        metadata: {
          component: componentName,
          action,
          data,
          timestamp: Date.now(),
        },
      });
    },
    [componentName],
  );

  return { trackInteraction };
}

// HOC for automatic performance tracking
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string,
) {
  const displayName =
    componentName || Component.displayName || Component.name || "Unknown";

  const WrappedComponent = (props: P) => {
    usePerformanceTracking(displayName);
    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withPerformanceTracking(${displayName})`;
  return WrappedComponent;
}

export default PerformanceMonitor;
