/**
 * 🚀 CORE WEB VITALS OPTIMIZATION SYSTEM
 * Championship-grade performance monitoring and optimization
 */

import { getCLS, getFCP, getFID, getLCP, getTTFB, Metric } from "web-vitals";

interface WebVitalsMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  inp: number | null; // Interaction to Next Paint
}

interface PerformanceThresholds {
  lcp: { good: number; needsImprovement: number }; // <1200ms good, <2500ms needs improvement
  fid: { good: number; needsImprovement: number }; // <100ms good, <300ms needs improvement
  cls: { good: number; needsImprovement: number }; // <0.1 good, <0.25 needs improvement
  fcp: { good: number; needsImprovement: number }; // <1800ms good, <3000ms needs improvement
  ttfb: { good: number; needsImprovement: number }; // <800ms good, <1800ms needs improvement
  inp: { good: number; needsImprovement: number }; // <200ms good, <500ms needs improvement
}

const CHAMPIONSHIP_THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 1200, needsImprovement: 2500 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.05, needsImprovement: 0.25 }, // Stricter than Google's 0.1
  fcp: { good: 1500, needsImprovement: 3000 },
  ttfb: { good: 600, needsImprovement: 1800 },
  inp: { good: 100, needsImprovement: 500 },
};

interface OptimizationSuggestion {
  metric: keyof WebVitalsMetrics;
  priority: "critical" | "high" | "medium" | "low";
  suggestion: string;
  implementation: string;
  expectedImprovement: string;
}

class CoreWebVitalsOptimizer {
  private metrics: WebVitalsMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    inp: null,
  };

  private thresholds: PerformanceThresholds;
  private observers: PerformanceObserver[] = [];
  private reportCallback?: (metrics: WebVitalsMetrics) => void;

  constructor(
    thresholds: PerformanceThresholds = CHAMPIONSHIP_THRESHOLDS,
    reportCallback?: (metrics: WebVitalsMetrics) => void,
  ) {
    this.thresholds = thresholds;
    this.reportCallback = reportCallback;
    this.initializeWebVitals();
    this.setupPerformanceObservers();
  }

  private initializeWebVitals(): void {
    if (typeof window === "undefined") return;

    // Get Core Web Vitals
    getCLS(this.handleMetric.bind(this, "cls"));
    getFCP(this.handleMetric.bind(this, "fcp"));
    getFID(this.handleMetric.bind(this, "fid"));
    getLCP(this.handleMetric.bind(this, "lcp"));
    getTTFB(this.handleMetric.bind(this, "ttfb"));

    // Get INP (Interaction to Next Paint) - newer metric
    this.setupINPMeasurement();
  }

  private handleMetric(
    metricName: keyof WebVitalsMetrics,
    metric: Metric,
  ): void {
    this.metrics[metricName] = metric.value;

    if (this.reportCallback) {
      this.reportCallback(this.metrics);
    }

    // Log performance issues immediately
    this.checkMetricThreshold(metricName, metric.value);
  }

  private setupINPMeasurement(): void {
    if (!("PerformanceObserver" in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        // Calculate INP from event timing entries
        let maxDelay = 0;
        entries.forEach((entry: any) => {
          if (
            entry.entryType === "event" &&
            entry.processingStart &&
            entry.startTime
          ) {
            const delay = entry.processingStart - entry.startTime;
            maxDelay = Math.max(maxDelay, delay);
          }
        });

        if (maxDelay > 0) {
          this.metrics.inp = maxDelay;
          this.checkMetricThreshold("inp", maxDelay);
        }
      });

      observer.observe({ entryTypes: ["event"] });
      this.observers.push(observer);
    } catch (error) {
      console.warn("INP measurement setup failed:", error);
    }
  }

  private setupPerformanceObservers(): void {
    if (!("PerformanceObserver" in window)) return;

    // Monitor navigation timing
    try {
      const navObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.entryType === "navigation") {
            const ttfb = entry.responseStart - entry.fetchStart;
            this.metrics.ttfb = ttfb;
            this.checkMetricThreshold("ttfb", ttfb);
          }
        });
      });

      navObserver.observe({ entryTypes: ["navigation"] });
      this.observers.push(navObserver);
    } catch (error) {
      console.warn("Navigation observer setup failed:", error);
    }
  }

  private checkMetricThreshold(
    metric: keyof WebVitalsMetrics,
    value: number,
  ): void {
    const threshold = this.thresholds[metric];
    if (!threshold) return;

    if (value > threshold.needsImprovement) {
      console.warn(
        `🚨 ${metric.toUpperCase()} needs improvement: ${value}ms (threshold: ${threshold.needsImprovement}ms)`,
      );
    } else if (value > threshold.good) {
      console.log(
        `⚠️ ${metric.toUpperCase()} could be better: ${value}ms (target: ${threshold.good}ms)`,
      );
    } else {
      console.log(`✅ ${metric.toUpperCase()} excellent: ${value}ms`);
    }
  }

  public getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  public getPerformanceScore(): number {
    const scores: number[] = [];

    Object.entries(this.metrics).forEach(([metric, value]) => {
      if (value === null) return;

      const threshold = this.thresholds[metric as keyof WebVitalsMetrics];
      if (!threshold) return;

      if (value <= threshold.good) {
        scores.push(100);
      } else if (value <= threshold.needsImprovement) {
        // Linear interpolation between good and needs improvement
        const ratio =
          (value - threshold.good) /
          (threshold.needsImprovement - threshold.good);
        scores.push(Math.max(50, 100 - ratio * 50));
      } else {
        scores.push(
          Math.max(
            0,
            50 -
              ((value - threshold.needsImprovement) /
                threshold.needsImprovement) *
                50,
          ),
        );
      }
    });

    return scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
  }

  public getOptimizationSuggestions(): OptimizationSuggestion[] {
    const suggestions: OptimizationSuggestion[] = [];

    // LCP Optimizations
    if (this.metrics.lcp && this.metrics.lcp > this.thresholds.lcp.good) {
      suggestions.push({
        metric: "lcp",
        priority:
          this.metrics.lcp > this.thresholds.lcp.needsImprovement
            ? "critical"
            : "high",
        suggestion: "Optimize Largest Contentful Paint",
        implementation:
          "Preload hero images, optimize font loading, reduce server response time",
        expectedImprovement: `Target: ${this.thresholds.lcp.good}ms (current: ${Math.round(this.metrics.lcp)}ms)`,
      });
    }

    // FID/INP Optimizations
    const inputDelay = this.metrics.fid || this.metrics.inp;
    if (inputDelay && inputDelay > this.thresholds.fid.good) {
      suggestions.push({
        metric: "fid",
        priority:
          inputDelay > this.thresholds.fid.needsImprovement
            ? "critical"
            : "high",
        suggestion: "Reduce Input Delay",
        implementation:
          "Split large JavaScript tasks, use React.startTransition, implement code splitting",
        expectedImprovement: `Target: ${this.thresholds.fid.good}ms (current: ${Math.round(inputDelay)}ms)`,
      });
    }

    // CLS Optimizations
    if (this.metrics.cls && this.metrics.cls > this.thresholds.cls.good) {
      suggestions.push({
        metric: "cls",
        priority:
          this.metrics.cls > this.thresholds.cls.needsImprovement
            ? "critical"
            : "high",
        suggestion: "Reduce Layout Shift",
        implementation:
          "Set explicit dimensions, preload fonts, avoid dynamic content injection",
        expectedImprovement: `Target: ${this.thresholds.cls.good} (current: ${this.metrics.cls.toFixed(3)})`,
      });
    }

    // FCP Optimizations
    if (this.metrics.fcp && this.metrics.fcp > this.thresholds.fcp.good) {
      suggestions.push({
        metric: "fcp",
        priority: "medium",
        suggestion: "Improve First Contentful Paint",
        implementation:
          "Eliminate render-blocking resources, inline critical CSS, optimize web fonts",
        expectedImprovement: `Target: ${this.thresholds.fcp.good}ms (current: ${Math.round(this.metrics.fcp)}ms)`,
      });
    }

    return suggestions.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  public generatePerformanceReport(): {
    score: number;
    metrics: WebVitalsMetrics;
    suggestions: OptimizationSuggestion[];
    status: "excellent" | "good" | "needs-improvement" | "poor";
  } {
    const score = this.getPerformanceScore();
    const suggestions = this.getOptimizationSuggestions();

    let status: "excellent" | "good" | "needs-improvement" | "poor";
    if (score >= 90) status = "excellent";
    else if (score >= 75) status = "good";
    else if (score >= 50) status = "needs-improvement";
    else status = "poor";

    return {
      score,
      metrics: this.getMetrics(),
      suggestions,
      status,
    };
  }

  public cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Export the optimizer class and utilities
export { CoreWebVitalsOptimizer, CHAMPIONSHIP_THRESHOLDS };
export type { WebVitalsMetrics, OptimizationSuggestion, PerformanceThresholds };

// Global instance for the Bridge Project
export const coreWebVitalsOptimizer = new CoreWebVitalsOptimizer();

// React hook for Core Web Vitals
export function useCoreWebVitals() {
  return {
    getMetrics: coreWebVitalsOptimizer.getMetrics.bind(coreWebVitalsOptimizer),
    getScore: coreWebVitalsOptimizer.getPerformanceScore.bind(
      coreWebVitalsOptimizer,
    ),
    getSuggestions: coreWebVitalsOptimizer.getOptimizationSuggestions.bind(
      coreWebVitalsOptimizer,
    ),
    generateReport: coreWebVitalsOptimizer.generatePerformanceReport.bind(
      coreWebVitalsOptimizer,
    ),
  };
}
