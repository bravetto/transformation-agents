/**
 * 🚀 REAL-TIME PERFORMANCE MONITORING SYSTEM
 * Championship-level performance tracking and optimization
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from "web-vitals";
import React, { useState, useEffect } from "react";

interface PerformanceMetrics {
  // Core Web Vitals
  cls: number | null;
  fid: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;

  // Custom metrics
  bundleSize: number;
  componentLoadTimes: Record<string, number>;
  memoryUsage: number;
  connectionType: string;
  deviceType: "mobile" | "tablet" | "desktop";

  // User experience metrics
  timeToInteractive: number | null;
  totalBlockingTime: number | null;
  speedIndex: number | null;

  // API performance
  apiResponseTimes: Record<string, number>;
  apiErrorRates: Record<string, number>;

  // Engagement metrics
  pageViews: number;
  sessionDuration: number;
  bounceRate: number;

  timestamp: number;
}

class RealTimePerformanceMonitor {
  private metrics: PerformanceMetrics;
  private observers: Map<string, PerformanceObserver>;
  private isInitialized = false;
  private sessionStart: number;
  private pageLoadStart: number;
  private callbacks: Array<(metrics: PerformanceMetrics) => void> = [];

  constructor() {
    this.sessionStart = Date.now();
    this.pageLoadStart =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    this.observers = new Map();
    this.metrics = this.initializeMetrics();

    if (typeof window !== "undefined") {
      this.initialize();
    }
  }

  private initializeMetrics(): PerformanceMetrics {
    return {
      cls: null,
      fid: null,
      fcp: null,
      lcp: null,
      ttfb: null,
      bundleSize: 0,
      componentLoadTimes: {},
      memoryUsage: 0,
      connectionType: this.getConnectionType(),
      deviceType: this.getDeviceType(),
      timeToInteractive: null,
      totalBlockingTime: null,
      speedIndex: null,
      apiResponseTimes: {},
      apiErrorRates: {},
      pageViews: 1,
      sessionDuration: 0,
      bounceRate: 0,
      timestamp: Date.now(),
    };
  }

  private getConnectionType(): string {
    if (typeof navigator === "undefined") return "unknown";
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      return connection?.effectiveType || "unknown";
    }
    return "unknown";
  }

  private getDeviceType(): "mobile" | "tablet" | "desktop" {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  private initialize(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Setup Core Web Vitals monitoring
    this.setupWebVitals();

    // Setup custom performance observers
    this.setupPerformanceObservers();

    // Setup API monitoring
    this.setupAPIMonitoring();

    // Setup memory monitoring
    this.setupMemoryMonitoring();

    // Setup session tracking
    this.setupSessionTracking();

    // Start periodic updates
    this.startPeriodicUpdates();
  }

  private setupWebVitals(): void {
    getCLS((metric: Metric) => {
      this.metrics.cls = metric.value;
      this.notifyCallbacks();
      this.logMetric("CLS", metric.value, 0.1); // Good < 0.1
    });

    getFID((metric: Metric) => {
      this.metrics.fid = metric.value;
      this.notifyCallbacks();
      this.logMetric("FID", metric.value, 100); // Good < 100ms
    });

    getFCP((metric: Metric) => {
      this.metrics.fcp = metric.value;
      this.notifyCallbacks();
      this.logMetric("FCP", metric.value, 1800); // Good < 1.8s
    });

    getLCP((metric: Metric) => {
      this.metrics.lcp = metric.value;
      this.notifyCallbacks();
      this.logMetric("LCP", metric.value, 2500); // Good < 2.5s
    });

    getTTFB((metric: Metric) => {
      this.metrics.ttfb = metric.value;
      this.notifyCallbacks();
      this.logMetric("TTFB", metric.value, 800); // Good < 800ms
    });
  }

  private setupPerformanceObservers(): void {
    // Long tasks observer (for Total Blocking Time)
    if ("PerformanceObserver" in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let totalBlockingTime = 0;

        entries.forEach((entry) => {
          if (entry.duration > 50) {
            totalBlockingTime += entry.duration - 50;
          }
        });

        this.metrics.totalBlockingTime = totalBlockingTime;
        this.notifyCallbacks();
      });

      try {
        longTaskObserver.observe({ entryTypes: ["longtask"] });
        this.observers.set("longtask", longTaskObserver);
      } catch (e) {
        console.warn("Long task observer not supported");
      }

      // Navigation timing observer
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming;
            this.metrics.timeToInteractive =
              navEntry.domInteractive - navEntry.fetchStart;
          }
        });
        this.notifyCallbacks();
      });

      try {
        navigationObserver.observe({ entryTypes: ["navigation"] });
        this.observers.set("navigation", navigationObserver);
      } catch (e) {
        console.warn("Navigation observer not supported");
      }
    }
  }

  private setupAPIMonitoring(): void {
    // Intercept fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0] instanceof Request ? args[0].url : args[0];

      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Track API response time
        const endpoint = this.extractEndpoint(url);
        this.metrics.apiResponseTimes[endpoint] = duration;

        // Track error rates
        if (!response.ok) {
          this.metrics.apiErrorRates[endpoint] =
            (this.metrics.apiErrorRates[endpoint] || 0) + 1;
        }

        this.notifyCallbacks();
        return response;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        const endpoint = this.extractEndpoint(url);

        this.metrics.apiResponseTimes[endpoint] = duration;
        this.metrics.apiErrorRates[endpoint] =
          (this.metrics.apiErrorRates[endpoint] || 0) + 1;

        this.notifyCallbacks();
        throw error;
      }
    };
  }

  private extractEndpoint(url: string | Request): string {
    const urlStr = url instanceof Request ? url.url : url;
    try {
      const urlObj = new URL(urlStr);
      return urlObj.pathname;
    } catch {
      return "unknown";
    }
  }

  private setupMemoryMonitoring(): void {
    if ("memory" in performance) {
      const updateMemory = () => {
        const memory = (performance as any).memory;
        this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
        this.notifyCallbacks();
      };

      updateMemory();
      setInterval(updateMemory, 10000); // Update every 10 seconds
    }
  }

  private setupSessionTracking(): void {
    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.updateSessionDuration();
      }
    });

    // Track beforeunload for session duration
    window.addEventListener("beforeunload", () => {
      this.updateSessionDuration();
      this.sendMetricsToAnalytics();
    });
  }

  private updateSessionDuration(): void {
    this.metrics.sessionDuration = Date.now() - this.sessionStart;
    this.notifyCallbacks();
  }

  private startPeriodicUpdates(): void {
    setInterval(() => {
      this.updateSessionDuration();
      this.calculateBounceRate();
      this.notifyCallbacks();
    }, 5000); // Update every 5 seconds
  }

  private calculateBounceRate(): void {
    const timeOnPage = Date.now() - this.sessionStart;
    // Consider bounce if user leaves within 30 seconds
    this.metrics.bounceRate = timeOnPage < 30000 ? 1 : 0;
  }

  private logMetric(name: string, value: number, threshold: number): void {
    const status =
      value <= threshold ? "🟢" : value <= threshold * 1.5 ? "🟡" : "🔴";

    if (process.env.NODE_ENV === "development") {
      console.log(
        `${status} ${name}: ${value.toFixed(2)}${name === "CLS" ? "" : "ms"} (threshold: ${threshold})`,
      );
    }
  }

  private notifyCallbacks(): void {
    this.callbacks.forEach((callback) => {
      try {
        callback(this.metrics);
      } catch (error) {
        console.error("Performance monitor callback error:", error);
      }
    });
  }

  private sendMetricsToAnalytics(): void {
    // Send to Google Analytics 4
    if (typeof gtag !== "undefined") {
      gtag("event", "performance_metrics", {
        event_category: "Performance",
        cls: this.metrics.cls,
        fid: this.metrics.fid,
        fcp: this.metrics.fcp,
        lcp: this.metrics.lcp,
        ttfb: this.metrics.ttfb,
        device_type: this.metrics.deviceType,
        connection_type: this.metrics.connectionType,
        session_duration: this.metrics.sessionDuration,
      });
    }

    // Send to custom analytics endpoint
    fetch("/api/analytics/performance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...this.metrics,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch((error) => {
      console.warn("Failed to send performance metrics:", error);
    });
  }

  // Public methods
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public onMetricsUpdate(
    callback: (metrics: PerformanceMetrics) => void,
  ): () => void {
    this.callbacks.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  public trackComponentLoad(componentName: string, duration: number): void {
    this.metrics.componentLoadTimes[componentName] = duration;
    this.notifyCallbacks();
  }

  public trackCustomMetric(name: string, value: number): void {
    // Store custom metrics in a flexible way
    (this.metrics as any)[`custom_${name}`] = value;
    this.notifyCallbacks();
  }

  public getPerformanceScore(): number {
    // Calculate a performance score based on Core Web Vitals
    let score = 100;

    if (this.metrics.lcp !== null) {
      if (this.metrics.lcp > 4000) score -= 30;
      else if (this.metrics.lcp > 2500) score -= 15;
    }

    if (this.metrics.fid !== null) {
      if (this.metrics.fid > 300) score -= 25;
      else if (this.metrics.fid > 100) score -= 10;
    }

    if (this.metrics.cls !== null) {
      if (this.metrics.cls > 0.25) score -= 25;
      else if (this.metrics.cls > 0.1) score -= 10;
    }

    if (this.metrics.fcp !== null) {
      if (this.metrics.fcp > 3000) score -= 20;
      else if (this.metrics.fcp > 1800) score -= 10;
    }

    return Math.max(0, score);
  }

  public getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];

    if (this.metrics.lcp && this.metrics.lcp > 2500) {
      suggestions.push(
        "🚀 Optimize Largest Contentful Paint - consider image optimization and server response time",
      );
    }

    if (this.metrics.fid && this.metrics.fid > 100) {
      suggestions.push(
        "⚡ Reduce First Input Delay - minimize JavaScript execution time",
      );
    }

    if (this.metrics.cls && this.metrics.cls > 0.1) {
      suggestions.push(
        "🎯 Improve Cumulative Layout Shift - set dimensions for images and videos",
      );
    }

    if (this.metrics.fcp && this.metrics.fcp > 1800) {
      suggestions.push(
        "🔥 Speed up First Contentful Paint - optimize critical rendering path",
      );
    }

    if (this.metrics.memoryUsage > 50) {
      suggestions.push(
        "💾 Optimize memory usage - consider component lazy loading",
      );
    }

    const slowComponents = Object.entries(this.metrics.componentLoadTimes)
      .filter(([_, time]) => time > 1000)
      .map(([name]) => name);

    if (slowComponents.length > 0) {
      suggestions.push(
        `🐌 Optimize slow components: ${slowComponents.join(", ")}`,
      );
    }

    return suggestions;
  }

  public destroy(): void {
    // Clean up observers
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.callbacks = [];
    this.isInitialized = false;
  }
}

// Export singleton instance - SSR-safe
let performanceMonitorInstance: RealTimePerformanceMonitor | null = null;

export const performanceMonitor =
  typeof window !== "undefined"
    ? performanceMonitorInstance ||
      (performanceMonitorInstance = new RealTimePerformanceMonitor())
    : null;

// React hook for using performance metrics
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [performanceScore, setPerformanceScore] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!performanceMonitor) return;

    const unsubscribe = performanceMonitor.onMetricsUpdate((newMetrics) => {
      setMetrics(newMetrics);
      setPerformanceScore(performanceMonitor.getPerformanceScore());
      setSuggestions(performanceMonitor.getOptimizationSuggestions());
    });

    // Initial data
    setMetrics(performanceMonitor.getMetrics());
    setPerformanceScore(performanceMonitor.getPerformanceScore());
    setSuggestions(performanceMonitor.getOptimizationSuggestions());

    return unsubscribe;
  }, []);

  const trackCustomMetric = (name: string, value: number) => {
    if (performanceMonitor) {
      performanceMonitor.trackCustomMetric(name, value);
    }
  };

  const trackComponentLoad = (componentName: string, duration: number) => {
    if (performanceMonitor) {
      performanceMonitor.trackComponentLoad(componentName, duration);
    }
  };

  return {
    metrics,
    performanceScore,
    suggestions,
    trackCustomMetric,
    trackComponentLoad,
  };
}

// Export types
export type { PerformanceMetrics };
