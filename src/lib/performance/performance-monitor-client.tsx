"use client";

import { useEffect, useState, useCallback } from "react";
import { getPerformanceMemory } from "../utils";

// 🚀 ADVANCED PERFORMANCE MONITORING SYSTEM
// Client-side only with SSR safety and RUM capabilities

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null;
  inp: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;

  // Business Metrics
  pageLoadTime: number | null;
  interactionCount: number;
  scrollDepth: number;
  sessionDuration: number;

  // Device & Context
  deviceType: "mobile" | "tablet" | "desktop";
  connectionType: string;
  viewportSize: { width: number; height: number };
  memoryUsage: number;

  // Performance Score
  performanceScore: number;
}

interface PerformanceConfig {
  enableRUM: boolean;
  sampleRate: number;
  apiEndpoint: string;
  trackInteractions: boolean;
  trackScrollDepth: boolean;
}

const DEFAULT_CONFIG: PerformanceConfig = {
  enableRUM: true,
  sampleRate: 1.0, // 100% sampling for development
  apiEndpoint: "/api/analytics/performance",
  trackInteractions: true,
  trackScrollDepth: true,
};

class ClientPerformanceMonitor {
  private config: PerformanceConfig;
  private metrics: PerformanceMetrics;
  private observers: Map<string, PerformanceObserver>;
  private sessionStart: number;
  private pageLoadStart: number;
  private interactionCount: number = 0;
  private maxScrollDepth: number = 0;
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.sessionStart = Date.now();
    this.pageLoadStart = Date.now();
    this.observers = new Map();

    this.metrics = this.initializeMetrics();
    this.setupPerformanceObservers();
    this.setupUserInteractionTracking();
    this.setupScrollTracking();
    this.setupMemoryTracking();
  }

  private initializeMetrics(): PerformanceMetrics {
    return {
      lcp: null,
      inp: null,
      cls: null,
      fcp: null,
      ttfb: null,
      pageLoadTime: null,
      interactionCount: 0,
      scrollDepth: 0,
      sessionDuration: 0,
      deviceType: this.getDeviceType(),
      connectionType: this.getConnectionType(),
      viewportSize: this.getViewportSize(),
      memoryUsage: this.getMemoryUsage(),
      performanceScore: 0,
    };
  }

  private setupPerformanceObservers(): void {
    if (!("PerformanceObserver" in window)) return;

    // Core Web Vitals Observer
    this.setupCoreWebVitalsObserver();

    // Navigation Timing Observer
    this.setupNavigationObserver();

    // Long Tasks Observer
    this.setupLongTasksObserver();
  }

  private setupCoreWebVitalsObserver(): void {
    try {
      // LCP Observer
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.startTime;
        this.updatePerformanceScore();
        this.notifyCallbacks();
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.set("lcp", lcpObserver);

      // FCP Observer
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find(
          (entry) => entry.name === "first-contentful-paint",
        ) as any;
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime;
          this.updatePerformanceScore();
          this.notifyCallbacks();
        }
      });
      fcpObserver.observe({ entryTypes: ["paint"] });
      this.observers.set("fcp", fcpObserver);

      // CLS Observer
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;
        this.updatePerformanceScore();
        this.notifyCallbacks();
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.set("cls", clsObserver);
    } catch (error) {
      console.warn("Performance Observer setup failed:", error);
    }
  }

  private setupNavigationObserver(): void {
    try {
      const navigationObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as PerformanceNavigationTiming[];
        if (entries.length > 0) {
          const navigation = entries[0];
          this.metrics.ttfb =
            navigation.responseStart - navigation.requestStart;
          this.metrics.pageLoadTime =
            navigation.loadEventEnd - navigation.fetchStart;
          this.updatePerformanceScore();
          this.notifyCallbacks();
        }
      });
      navigationObserver.observe({ entryTypes: ["navigation"] });
      this.observers.set("navigation", navigationObserver);
    } catch (error) {
      console.warn("Navigation Observer setup failed:", error);
    }
  }

  private setupLongTasksObserver(): void {
    try {
      if ("PerformanceLongTaskTiming" in window) {
        const longTaskObserver = new PerformanceObserver((entryList) => {
          // Track long tasks for INP calculation
          const longTasks = entryList.getEntries();
          // This is a simplified INP calculation
          // In production, you'd want a more sophisticated algorithm
          const avgTaskDuration =
            longTasks.reduce((sum, task) => sum + task.duration, 0) /
            longTasks.length;
          this.metrics.inp = avgTaskDuration || this.metrics.inp;
          this.updatePerformanceScore();
          this.notifyCallbacks();
        });
        longTaskObserver.observe({ entryTypes: ["longtask"] });
        this.observers.set("longtask", longTaskObserver);
      }
    } catch (error) {
      console.warn("Long Task Observer setup failed:", error);
    }
  }

  private setupUserInteractionTracking(): void {
    if (!this.config.trackInteractions) return;

    const trackInteraction = () => {
      this.interactionCount++;
      this.metrics.interactionCount = this.interactionCount;
      this.metrics.sessionDuration = Date.now() - this.sessionStart;
      this.notifyCallbacks();
    };

    ["click", "touchstart", "keydown"].forEach((eventType) => {
      document.addEventListener(eventType, trackInteraction, { passive: true });
    });
  }

  private setupScrollTracking(): void {
    if (!this.config.trackScrollDepth) return;

    const trackScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercentage > this.maxScrollDepth) {
        this.maxScrollDepth = scrollPercentage;
        this.metrics.scrollDepth = this.maxScrollDepth;
        this.notifyCallbacks();
      }
    };

    window.addEventListener("scroll", trackScroll, { passive: true });
  }

  private setupMemoryTracking(): void {
    // Update memory usage every 5 seconds
    const updateMemory = () => {
      this.metrics.memoryUsage = this.getMemoryUsage();
      this.notifyCallbacks();
    };

    setInterval(updateMemory, 5000);
  }

  private getDeviceType(): "mobile" | "tablet" | "desktop" {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  private getConnectionType(): string {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      return connection?.effectiveType || "unknown";
    }
    return "unknown";
  }

  private getViewportSize(): { width: number; height: number } {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  private getMemoryUsage(): number {
    const memoryInfo = getPerformanceMemory();
    if (memoryInfo) {
      return memoryInfo.used / 1024 / 1024; // Convert to MB
    }
    return 0;
  }

  private updatePerformanceScore(): void {
    // Simplified performance score calculation based on Core Web Vitals
    let score = 100;

    // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (this.metrics.lcp !== null) {
      if (this.metrics.lcp > 4000) score -= 30;
      else if (this.metrics.lcp > 2500) score -= 15;
    }

    // INP scoring (good: <200ms, needs improvement: 200-500ms, poor: >500ms)
    if (this.metrics.inp !== null) {
      if (this.metrics.inp > 500) score -= 25;
      else if (this.metrics.inp > 200) score -= 10;
    }

    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (this.metrics.cls !== null) {
      if (this.metrics.cls > 0.25) score -= 25;
      else if (this.metrics.cls > 0.1) score -= 10;
    }

    // TTFB scoring (good: <200ms, needs improvement: 200-500ms, poor: >500ms)
    if (this.metrics.ttfb !== null) {
      if (this.metrics.ttfb > 500) score -= 20;
      else if (this.metrics.ttfb > 200) score -= 10;
    }

    this.metrics.performanceScore = Math.max(0, score);
  }

  private notifyCallbacks(): void {
    this.callbacks.forEach((callback) => callback({ ...this.metrics }));
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

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getPerformanceScore(): number {
    return this.metrics.performanceScore;
  }

  public getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];

    if (this.metrics.lcp && this.metrics.lcp > 2500) {
      suggestions.push(
        "Optimize Largest Contentful Paint: Consider preloading critical images and reducing server response time",
      );
    }

    if (this.metrics.inp && this.metrics.inp > 200) {
      suggestions.push(
        "Improve Interaction to Next Paint: Break up long-running JavaScript tasks and optimize event handlers",
      );
    }

    if (this.metrics.cls && this.metrics.cls > 0.1) {
      suggestions.push(
        "Reduce Cumulative Layout Shift: Set dimensions for images and avoid inserting content above existing content",
      );
    }

    if (this.metrics.ttfb && this.metrics.ttfb > 200) {
      suggestions.push(
        "Optimize Time to First Byte: Improve server response time and consider using a CDN",
      );
    }

    if (this.metrics.pageLoadTime && this.metrics.pageLoadTime > 3000) {
      suggestions.push(
        "Reduce overall page load time: Optimize images, minify CSS/JS, and enable compression",
      );
    }

    return suggestions;
  }

  public trackCustomMetric(name: string, value: number): void {
    // Send custom metric to analytics
    if (this.config.enableRUM) {
      this.sendToAnalytics({
        type: "custom_metric",
        name,
        value,
        timestamp: Date.now(),
        url: window.location.href,
        deviceType: this.metrics.deviceType,
        connectionType: this.metrics.connectionType,
      });
    }
  }

  public trackComponentLoad(componentName: string, duration: number): void {
    // Track component-specific loading times
    if (this.config.enableRUM) {
      this.sendToAnalytics({
        type: "component_load",
        componentName,
        duration,
        timestamp: Date.now(),
        url: window.location.href,
      });
    }
  }

  private async sendToAnalytics(data: any): Promise<void> {
    if (!this.config.enableRUM || Math.random() > this.config.sampleRate)
      return;

    try {
      await fetch(this.config.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          metrics: this.metrics,
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      console.warn("Failed to send analytics data:", error);
    }
  }

  public destroy(): void {
    // Clean up observers and event listeners
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.callbacks = [];
  }
}

// React Hook for Performance Monitoring
export function usePerformanceMonitoring(config?: Partial<PerformanceConfig>) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [performanceScore, setPerformanceScore] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [monitor, setMonitor] = useState<ClientPerformanceMonitor | null>(null);

  useEffect(() => {
    // Only initialize on client side
    if (typeof window === "undefined") return;

    const performanceMonitor = new ClientPerformanceMonitor(config);
    setMonitor(performanceMonitor);

    const unsubscribe = performanceMonitor.onMetricsUpdate((newMetrics) => {
      setMetrics(newMetrics);
      setPerformanceScore(performanceMonitor.getPerformanceScore());
      setSuggestions(performanceMonitor.getOptimizationSuggestions());
    });

    // Initial data
    setMetrics(performanceMonitor.getMetrics());
    setPerformanceScore(performanceMonitor.getPerformanceScore());
    setSuggestions(performanceMonitor.getOptimizationSuggestions());

    return () => {
      unsubscribe();
      performanceMonitor.destroy();
    };
  }, []);

  const trackCustomMetric = useCallback(
    (name: string, value: number) => {
      monitor?.trackCustomMetric(name, value);
    },
    [monitor],
  );

  const trackComponentLoad = useCallback(
    (componentName: string, duration: number) => {
      monitor?.trackComponentLoad(componentName, duration);
    },
    [monitor],
  );

  return {
    metrics,
    performanceScore,
    suggestions,
    trackCustomMetric,
    trackComponentLoad,
    isReady: metrics !== null,
  };
}

// Performance Analytics Dashboard Component
export function PerformanceDashboard() {
  const { metrics, performanceScore, suggestions, isReady } =
    usePerformanceMonitoring();

  if (!isReady || !metrics) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          Performance Monitor
        </h3>
        <div className="flex items-center mt-1">
          <div className="text-2xl font-bold text-blue-600">
            {performanceScore}
          </div>
          <div className="ml-2 text-sm text-gray-500">/100</div>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        {metrics.lcp && (
          <div className="flex justify-between">
            <span>LCP:</span>
            <span
              className={metrics.lcp > 2500 ? "text-red-600" : "text-green-600"}
            >
              {(metrics.lcp / 1000).toFixed(2)}s
            </span>
          </div>
        )}
        {metrics.inp && (
          <div className="flex justify-between">
            <span>INP:</span>
            <span
              className={metrics.inp > 200 ? "text-red-600" : "text-green-600"}
            >
              {metrics.inp.toFixed(0)}ms
            </span>
          </div>
        )}
        {metrics.cls !== null && (
          <div className="flex justify-between">
            <span>CLS:</span>
            <span
              className={metrics.cls > 0.1 ? "text-red-600" : "text-green-600"}
            >
              {metrics.cls.toFixed(3)}
            </span>
          </div>
        )}
        {metrics.pageLoadTime && (
          <div className="flex justify-between">
            <span>Load Time:</span>
            <span>{(metrics.pageLoadTime / 1000).toFixed(2)}s</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Interactions:</span>
          <span>{metrics.interactionCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Device:</span>
          <span className="capitalize">{metrics.deviceType}</span>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs font-medium text-gray-700 mb-1">
            Suggestions:
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            {suggestions.slice(0, 2).map((suggestion, index) => (
              <li key={index} className="truncate" title={suggestion}>
                • {suggestion.slice(0, 40)}...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ClientPerformanceMonitor;
