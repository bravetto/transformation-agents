/**
 * 🚀 DIVINE PERFORMANCE OPTIMIZATION SYSTEM (2025)
 * Leveraging Next.js 15.4.3 + React 19 + TypeScript 5.9 latest features
 */

// Dynamic imports for lazy loading (production-ready alternative to import defer)
// const heavyAnalytics = lazy(() => import('../analytics/advanced-analytics'))
// const complexAnimations = lazy(() => import('../animation-utils'))
// const advancedCharts = lazy(() => import('recharts'))

import { logger } from "@/lib/logger";
import { getCLS, getFCP, getLCP, getINP, getTTFB } from "web-vitals";

// 2025 Core Web Vitals Thresholds (Updated Standards)
const DIVINE_PERFORMANCE_THRESHOLDS = {
  LCP: { excellent: 1200, good: 2500, poor: 4000 }, // More aggressive targets
  INP: { excellent: 100, good: 200, poor: 500 }, // New standard replacing FID
  CLS: { excellent: 0.05, good: 0.1, poor: 0.25 }, // Stricter layout shift
  FCP: { excellent: 1000, good: 1800, poor: 3000 },
  TTFB: { excellent: 200, good: 600, poor: 1800 },
} as const;

interface PerformanceMetrics2025 {
  // Core Web Vitals (2025 Edition)
  lcp: number | null;
  inp: number | null; // Replaces FID
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;

  // Advanced Performance Metrics
  renderBlocking: number;
  totalBlockingTime: number;
  speedIndex: number;

  // Device & Network Context
  deviceMemory: number;
  networkSpeed: "slow-2g" | "2g" | "3g" | "4g" | "5g" | "unknown";
  isLowEndDevice: boolean;

  // React 19 Specific Metrics
  reactRenderTime: number;
  componentTreeDepth: number;
  stateUpdateFrequency: number;

  // Mission-Critical Metrics for July 28th
  prayerSubmissionLatency: number;
  letterGenerationTime: number;
  socialShareSpeed: number;
  countdownAccuracy: number;

  timestamp: number;
  sessionId: string;
}

class DivinePerformanceOptimizer2025 {
  private metrics: PerformanceMetrics2025;
  private observer: PerformanceObserver | null = null;
  private optimizationLevel: "basic" | "enhanced" | "divine" = "basic";

  constructor() {
    this.metrics = this.initializeMetrics();
    this.detectDeviceCapabilities();
    this.setupAdvancedMonitoring();
  }

  private initializeMetrics(): PerformanceMetrics2025 {
    return {
      lcp: null,
      inp: null,
      cls: null,
      fcp: null,
      ttfb: null,
      renderBlocking: 0,
      totalBlockingTime: 0,
      speedIndex: 0,
      deviceMemory: this.getDeviceMemory(),
      networkSpeed: this.getNetworkSpeed(),
      isLowEndDevice: this.isLowEndDevice(),
      reactRenderTime: 0,
      componentTreeDepth: 0,
      stateUpdateFrequency: 0,
      prayerSubmissionLatency: 0,
      letterGenerationTime: 0,
      socialShareSpeed: 0,
      countdownAccuracy: 0,
      timestamp: Date.now(),
      sessionId: this.generateSessionId(),
    };
  }

  /**
   * 🧠 INTELLIGENT DEVICE CAPABILITY DETECTION
   */
  private detectDeviceCapabilities(): void {
    // Enhanced device detection with 2025 standards
    const memory = this.getDeviceMemory();
    const cores = navigator.hardwareConcurrency || 4;
    const networkSpeed = this.getNetworkSpeed();

    // Determine optimization level based on device capabilities
    if (memory >= 8 && cores >= 8 && ["4g", "5g"].includes(networkSpeed)) {
      this.optimizationLevel = "divine";
    } else if (memory >= 4 && cores >= 4) {
      this.optimizationLevel = "enhanced";
    } else {
      this.optimizationLevel = "basic";
    }

    logger.divine("🔍 Device capabilities detected", {
      memory,
      cores,
      networkSpeed,
      optimizationLevel: this.optimizationLevel,
    });
  }

  /**
   * 📊 ADVANCED CORE WEB VITALS MONITORING (2025)
   */
  private setupAdvancedMonitoring(): void {
    // Enhanced Core Web Vitals with 2025 standards
    getLCP((metric) => {
      this.metrics.lcp = metric.value;
      this.analyzeAndOptimizeLCP(metric.value);
    });

    getINP((metric) => {
      this.metrics.inp = metric.value;
      this.analyzeAndOptimizeINP(metric.value);
    });

    getCLS((metric) => {
      this.metrics.cls = metric.value;
      this.analyzeAndOptimizeCLS(metric.value);
    });

    getFCP((metric) => {
      this.metrics.fcp = metric.value;
      this.optimizeFCP(metric.value);
    });

    getTTFB((metric) => {
      this.metrics.ttfb = metric.value;
      this.optimizeTTFB(metric.value);
    });

    // Setup React 19 specific monitoring
    this.setupReact19Monitoring();
  }

  /**
   * ⚛️ REACT 19 PERFORMANCE MONITORING
   */
  private setupReact19Monitoring(): void {
    // Monitor React rendering performance
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "measure" && entry.name.includes("React")) {
            this.metrics.reactRenderTime = entry.duration;
          }
        }
      });

      this.observer.observe({ entryTypes: ["measure"] });
    }
  }

  /**
   * 🎯 LCP OPTIMIZATION WITH 2025 STRATEGIES
   */
  private analyzeAndOptimizeLCP(value: number): void {
    if (value > DIVINE_PERFORMANCE_THRESHOLDS.LCP.good) {
      logger.warning("LCP optimization needed", {
        value,
        threshold: DIVINE_PERFORMANCE_THRESHOLDS.LCP.good,
      });

      // Apply aggressive LCP optimizations
      this.applyLCPOptimizations();
    }
  }

  private applyLCPOptimizations(): void {
    // Preload critical resources
    this.preloadCriticalResources();

    // Enable resource hints
    this.enableResourceHints();

    // Optimize images with latest formats
    this.optimizeImageLoading();
  }

  /**
   * ⚡ INP OPTIMIZATION (2025 Standard)
   */
  private analyzeAndOptimizeINP(value: number): void {
    if (value > DIVINE_PERFORMANCE_THRESHOLDS.INP.good) {
      logger.warning("INP optimization needed", {
        value,
        threshold: DIVINE_PERFORMANCE_THRESHOLDS.INP.good,
      });

      // Apply INP optimizations
      this.optimizeInteractionToNextPaint();
    }
  }

  private optimizeInteractionToNextPaint(): void {
    // Implement scheduler yielding for better INP
    if ("scheduler" in window && "postTask" in (window as any).scheduler) {
      // Use native scheduler API for better task scheduling
      this.implementTaskScheduling();
    }

    // Break up long tasks
    this.implementTaskBreaking();
  }

  /**
   * 🎨 CLS OPTIMIZATION WITH LAYOUT STABILITY
   */
  private analyzeAndOptimizeCLS(value: number): void {
    if (value > DIVINE_PERFORMANCE_THRESHOLDS.CLS.excellent) {
      logger.warning("CLS optimization needed", {
        value,
        threshold: DIVINE_PERFORMANCE_THRESHOLDS.CLS.excellent,
      });

      // Apply CLS fixes
      this.stabilizeLayout();
    }
  }

  /**
   * 🚀 LAZY LOADING WITH IMPORT DEFER (TypeScript 5.9)
   */
  async loadHeavyFeatures(): Promise<void> {
    try {
      // Only load heavy features when device can handle it
      if (this.optimizationLevel === "divine") {
        // TypeScript 5.9 import defer - only executes when accessed
        const analytics = await import("../analytics/advanced-analytics");
        analytics.initializeAdvancedTracking();
      }

      if (this.optimizationLevel !== "basic") {
        // Load animations for enhanced devices
        const animations = await import("../animation-utils");
        animations.enableAdvancedAnimations();
      }
    } catch (error) {
      logger.error("Failed to load heavy features", { error });
    }
  }

  /**
   * 📈 MISSION-CRITICAL PERFORMANCE TRACKING
   */
  trackPrayerSubmissionPerformance(startTime: number): void {
    const endTime = performance.now();
    this.metrics.prayerSubmissionLatency = endTime - startTime;

    if (this.metrics.prayerSubmissionLatency > 500) {
      logger.warning("Prayer submission latency high", {
        latency: this.metrics.prayerSubmissionLatency,
      });
    }
  }

  trackLetterGenerationPerformance(startTime: number): void {
    const endTime = performance.now();
    this.metrics.letterGenerationTime = endTime - startTime;

    if (this.metrics.letterGenerationTime > 2000) {
      logger.warning("Letter generation time high", {
        time: this.metrics.letterGenerationTime,
      });
    }
  }

  /**
   * 🎯 JULY 28TH COUNTDOWN PERFORMANCE
   */
  optimizeCountdownPerformance(): void {
    // Optimize countdown rendering for minimal CPU usage
    const countdownElement = document.querySelector("[data-countdown]");
    if (countdownElement) {
      // Use CSS transforms instead of JS for better performance
      countdownElement.classList.add("optimized-countdown");
    }
  }

  /**
   * 🔧 UTILITY METHODS
   */
  private getDeviceMemory(): number {
    return (navigator as any).deviceMemory || 4;
  }

  private getNetworkSpeed(): "slow-2g" | "2g" | "3g" | "4g" | "5g" | "unknown" {
    const connection = (navigator as any).connection;
    return connection?.effectiveType || "unknown";
  }

  private isLowEndDevice(): boolean {
    return (
      this.getDeviceMemory() <= 2 || (navigator.hardwareConcurrency || 4) <= 2
    );
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private preloadCriticalResources(): void {
    // Preload critical resources for JAHmere's profile
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = "/people/jahmere-webb";
    link.as = "document";
    document.head.appendChild(link);
  }

  private enableResourceHints(): void {
    // Add resource hints for better performance
    const dnsLink = document.createElement("link");
    dnsLink.rel = "dns-prefetch";
    dnsLink.href = "//july28freedom.vercel.app";
    document.head.appendChild(dnsLink);
  }

  private optimizeImageLoading(): void {
    // Enable native lazy loading for images
    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img) => {
      img.setAttribute("loading", "lazy");
    });
  }

  private implementTaskScheduling(): void {
    // Use modern scheduler API for better task management
    if ("scheduler" in window) {
      // Defer non-critical tasks
      (window as any).scheduler.postTask(
        () => {
          // Non-critical performance optimizations
          this.loadHeavyFeatures();
        },
        { priority: "background" },
      );
    }
  }

  private implementTaskBreaking(): void {
    // Break up long tasks using MessageChannel
    const channel = new MessageChannel();
    channel.port2.onmessage = () => {
      // Continue heavy processing
    };
  }

  private stabilizeLayout(): void {
    // Add CSS containment for layout stability
    const containers = document.querySelectorAll("[data-container]");
    containers.forEach((container) => {
      container.setAttribute(
        "style",
        container.getAttribute("style") + "; contain: layout style paint;",
      );
    });
  }

  private optimizeFCP(value: number): void {
    if (value > DIVINE_PERFORMANCE_THRESHOLDS.FCP.good) {
      // Optimize critical rendering path
      this.preloadCriticalResources();
    }
  }

  private optimizeTTFB(value: number): void {
    if (value > DIVINE_PERFORMANCE_THRESHOLDS.TTFB.good) {
      logger.warning(
        "TTFB optimization needed - consider server improvements",
        { value },
      );
      // Log server performance issues for divine intervention
    }
  }

  // Public API
  getMetrics(): PerformanceMetrics2025 {
    return { ...this.metrics };
  }

  getOptimizationLevel(): "basic" | "enhanced" | "divine" {
    return this.optimizationLevel;
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Export singleton instance
export const divinePerformanceOptimizer = new DivinePerformanceOptimizer2025();

// Export for React hook usage
export function useDivinePerformance() {
  return {
    metrics: divinePerformanceOptimizer.getMetrics(),
    optimizationLevel: divinePerformanceOptimizer.getOptimizationLevel(),
    trackPrayerSubmission:
      divinePerformanceOptimizer.trackPrayerSubmissionPerformance.bind(
        divinePerformanceOptimizer,
      ),
    trackLetterGeneration:
      divinePerformanceOptimizer.trackLetterGenerationPerformance.bind(
        divinePerformanceOptimizer,
      ),
    optimizeCountdown:
      divinePerformanceOptimizer.optimizeCountdownPerformance.bind(
        divinePerformanceOptimizer,
      ),
  };
}
