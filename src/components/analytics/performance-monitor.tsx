"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";
import { trackConversion } from "@/lib/analytics/user-journey";

// Core Web Vitals Thresholds (2024 Standards)
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  INP: { good: 200, needsImprovement: 500 }, // Interaction to Next Paint
};

// Browser-specific types
interface NetworkConnection {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface WebVitalMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  timestamp: number;
}

interface PerformanceData {
  metrics: WebVitalMetric[];
  pageLoadTime: number;
  navigationTiming: PerformanceNavigationTiming | null;
  resourceTimings: PerformanceResourceTiming[];
  deviceInfo: {
    userAgent: string;
    connection?: NetworkConnection;
    memory?: any;
  };
}

export default function PerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    metrics: [],
    pageLoadTime: 0,
    navigationTiming: null,
    resourceTimings: [],
    deviceInfo: {
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
      connection:
        typeof window !== "undefined"
          ? (navigator as any).connection
          : undefined,
      memory:
        typeof window !== "undefined" ? (performance as any).memory : undefined,
    },
  });

  const [showDebugPanel, setShowDebugPanel] = useState(false);

  const getRating = useCallback(
    (
      metricName: string,
      value: number,
    ): "good" | "needs-improvement" | "poor" => {
      const threshold = THRESHOLDS[metricName as keyof typeof THRESHOLDS];
      if (!threshold) return "good";

      if (value <= threshold.good) return "good";
      if (value <= threshold.needsImprovement) return "needs-improvement";
      return "poor";
    },
    [],
  );

  const updateMetrics = useCallback((metric: WebVitalMetric) => {
    setPerformanceData((prev) => ({
      ...prev,
      metrics: [...prev.metrics.filter((m) => m.name !== metric.name), metric],
    }));
  }, []);

  const sendToAnalytics = useCallback((metric: WebVitalMetric) => {
    // Send to our analytics system
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "secondary",
      metadata: {
        action: "core_web_vitals_measurement",
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: metric.rating,
        performance_category: "web_vitals_2024",
        timestamp: metric.timestamp,
      },
    });

    // Send to Vercel Analytics if available
    if (typeof window !== "undefined" && (window as any).va) {
      (window as any).va("track", "Core Web Vital", {
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
      });
    }

    // Console logging for development
    if (process.env.NODE_ENV === "development") {
      console.log(`📊 Core Web Vital - ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        threshold: THRESHOLDS[metric.name as keyof typeof THRESHOLDS],
      });
    }
  }, []);

  const onCLS = useCallback(
    (metric: any) => {
      const webVitalMetric: WebVitalMetric = {
        name: "CLS",
        value: metric.value,
        rating: getRating("CLS", metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now(),
      };

      updateMetrics(webVitalMetric);
      sendToAnalytics(webVitalMetric);
    },
    [getRating, updateMetrics, sendToAnalytics],
  );

  const onFID = useCallback(
    (metric: any) => {
      const webVitalMetric: WebVitalMetric = {
        name: "FID",
        value: metric.value,
        rating: getRating("FID", metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now(),
      };

      updateMetrics(webVitalMetric);
      sendToAnalytics(webVitalMetric);
    },
    [getRating, updateMetrics, sendToAnalytics],
  );

  const onFCP = useCallback(
    (metric: any) => {
      const webVitalMetric: WebVitalMetric = {
        name: "FCP",
        value: metric.value,
        rating: getRating("FCP", metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now(),
      };

      updateMetrics(webVitalMetric);
      sendToAnalytics(webVitalMetric);
    },
    [getRating, updateMetrics, sendToAnalytics],
  );

  const onLCP = useCallback(
    (metric: any) => {
      const webVitalMetric: WebVitalMetric = {
        name: "LCP",
        value: metric.value,
        rating: getRating("LCP", metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now(),
      };

      updateMetrics(webVitalMetric);
      sendToAnalytics(webVitalMetric);
    },
    [getRating, updateMetrics, sendToAnalytics],
  );

  const onTTFB = useCallback(
    (metric: any) => {
      const webVitalMetric: WebVitalMetric = {
        name: "TTFB",
        value: metric.value,
        rating: getRating("TTFB", metric.value),
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now(),
      };

      updateMetrics(webVitalMetric);
      sendToAnalytics(webVitalMetric);
    },
    [getRating, updateMetrics, sendToAnalytics],
  );

  const onINP = useCallback(
    (metric: WebVitalMetric) => {
      updateMetrics(metric);
      sendToAnalytics(metric);
    },
    [updateMetrics, sendToAnalytics],
  );

  const collectPerformanceData = useCallback(() => {
    if (typeof window === "undefined") return;

    // Collect navigation timing
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;

    // Collect resource timings
    const resources = performance.getEntriesByType(
      "resource",
    ) as PerformanceResourceTiming[];

    // Calculate page load time using correct API properties
    const pageLoadTime = navigation
      ? navigation.loadEventEnd - navigation.fetchStart
      : 0;

    setPerformanceData((prev) => ({
      ...prev,
      pageLoadTime,
      navigationTiming: navigation,
      resourceTimings: resources.slice(-50), // Keep last 50 resources
    }));
  }, []);

  useEffect(() => {
    // Initialize performance monitoring
    const initializePerformanceMonitoring = () => {
      // Monitor Core Web Vitals
      getCLS(onCLS);
      getFID(onFID);
      getFCP(onFCP);
      getLCP(onLCP);
      getTTFB(onTTFB);

      // Monitor INP (Interaction to Next Paint) - 2024 replacement for FID
      if ("PerformanceObserver" in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === "event" && "duration" in entry) {
                onINP({
                  name: "INP",
                  value: entry.duration,
                  rating: getRating("INP", entry.duration),
                  delta: entry.duration,
                  id: `inp-${Date.now()}`,
                  timestamp: Date.now(),
                } as WebVitalMetric);
              }
            }
          });

          observer.observe({ type: "event", buffered: true });
        } catch (error) {
          console.warn("INP monitoring not supported:", error);
        }
      }

      // Monitor custom performance metrics
      collectPerformanceData();
    };

    initializePerformanceMonitoring();

    // Set up periodic monitoring
    const monitoringInterval = setInterval(() => {
      collectPerformanceData();
    }, 30000); // Every 30 seconds

    return () => {
      clearInterval(monitoringInterval);
    };
  }, [
    onCLS,
    onFID,
    onFCP,
    onLCP,
    onTTFB,
    onINP,
    getRating,
    collectPerformanceData,
  ]);

  const getMetricColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-600";
      case "needs-improvement":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const formatMetricValue = (name: string, value: number) => {
    if (name === "CLS") {
      return value.toFixed(3);
    }
    return Math.round(value) + "ms";
  };

  // Only show debug panel in development or when explicitly enabled
  const shouldShowDebugPanel =
    process.env.NODE_ENV === "development" || showDebugPanel;

  if (!shouldShowDebugPanel) {
    return null; // Hidden in production unless explicitly enabled
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Core Web Vitals</h3>
        <button
          onClick={() => setShowDebugPanel(false)}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        {performanceData.metrics.map((metric) => (
          <div key={metric.name} className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-600">
              {metric.name}:
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono ${getMetricColor(metric.rating)}`}
              >
                {formatMetricValue(metric.name, metric.value)}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  metric.rating === "good"
                    ? "bg-green-500"
                    : metric.rating === "needs-improvement"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              />
            </div>
          </div>
        ))}

        {performanceData.pageLoadTime > 0 && (
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-xs font-medium text-gray-600">
              Page Load:
            </span>
            <span className="text-xs font-mono text-gray-800">
              {Math.round(performanceData.pageLoadTime)}ms
            </span>
          </div>
        )}

        {performanceData.deviceInfo.connection && (
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-600">
              Connection:
            </span>
            <span className="text-xs font-mono text-gray-800">
              {performanceData.deviceInfo.connection.effectiveType}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          JAHmere Freedom Portal • Performance Monitor
        </div>
      </div>
    </div>
  );
}

// Enable debug panel via console command
if (typeof window !== "undefined") {
  (window as any).enablePerformanceDebug = () => {
    window.dispatchEvent(new CustomEvent("enable-performance-debug"));
  };
}
