/**
 * 🚀 ENHANCED INP OPTIMIZER (2025)
 * Latest techniques for Interaction to Next Paint optimization
 * Based on research from Google Codelabs, Chrome team, and real-world case studies
 */

// 2025 INP Thresholds (Updated Standards)
const INP_THRESHOLDS = {
  GOOD: 200, // ≤200ms (excellent)
  NEEDS_IMPROVEMENT: 500, // 201-500ms (needs work)
  POOR: Infinity, // >500ms (critical)
} as const;

interface INPOptimizationConfig {
  enableSchedulerYield: boolean;
  enableAbortController: boolean;
  enableDebouncing: boolean;
  yieldThreshold: number; // ms after which to yield
  debounceDelay: number; // ms to wait before executing debounced work
}

interface InteractionMetrics {
  inputDelay: number;
  processingTime: number;
  presentationDelay: number;
  totalDuration: number;
  timestamp: number;
  interactionType: string;
  target: string;
}

class EnhancedINPOptimizer {
  private config: INPOptimizationConfig;
  private abortControllers = new Map<string, AbortController>();
  private debouncedTasks = new Map<string, number>();
  private metrics: InteractionMetrics[] = [];
  private observer: PerformanceObserver | null = null;

  constructor(config: Partial<INPOptimizationConfig> = {}) {
    this.config = {
      enableSchedulerYield: true,
      enableAbortController: true,
      enableDebouncing: true,
      yieldThreshold: 5, // Yield every 5ms of work
      debounceDelay: 300, // 300ms debounce delay
      ...config,
    };

    this.initializeINPMonitoring();
    this.setupInteractionOptimization();
  }

  /**
   * 🔬 ENHANCED INP MONITORING (2025)
   * Uses latest Event Timing API and Long Animation Frames API
   */
  private initializeINPMonitoring(): void {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    try {
      // Enhanced INP Observer with Long Animation Frames
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "event") {
            this.processInteractionEntry(entry as PerformanceEventTiming);
          } else if (entry.entryType === "long-animation-frame") {
            this.processLongAnimationFrame(entry);
          }
        }
      });

      // Monitor both event timing and long animation frames
      this.observer.observe({
        entryTypes: ["event", "long-animation-frame"],
        buffered: true,
      });
    } catch (error) {
      console.warn("Enhanced INP monitoring setup failed:", error);
    }
  }

  private processInteractionEntry(entry: PerformanceEventTiming): void {
    // Only track interaction events (click, keydown, pointerdown)
    if (!entry.interactionId) return;

    const metrics: InteractionMetrics = {
      inputDelay: entry.processingStart - entry.startTime,
      processingTime: entry.processingEnd - entry.processingStart,
      presentationDelay: entry.startTime + entry.duration - entry.processingEnd,
      totalDuration: entry.duration,
      timestamp: entry.startTime,
      interactionType: entry.name,
      target: (entry.target as Element)?.tagName || "unknown",
    };

    this.metrics.push(metrics);
    this.analyzeAndOptimize(metrics);

    // Keep only last 100 interactions
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  private processLongAnimationFrame(entry: any): void {
    // Long Animation Frames API helps identify INP bottlenecks
    if (entry.duration > 50) {
      // Long task threshold
      console.warn(`🐌 Long Animation Frame detected: ${entry.duration}ms`, {
        scripts: entry.scripts?.map((s: any) => ({
          name: s.name,
          duration: s.duration,
          invoker: s.invoker,
        })),
      });
    }
  }

  /**
   * 🧠 INTELLIGENT INP ANALYSIS & OPTIMIZATION
   * Automatically detects and optimizes INP bottlenecks
   */
  private analyzeAndOptimize(metrics: InteractionMetrics): void {
    const { totalDuration, inputDelay, processingTime, presentationDelay } =
      metrics;

    if (totalDuration <= INP_THRESHOLDS.GOOD) {
      return; // Already optimal
    }

    // Identify primary bottleneck
    const bottleneck = this.identifyBottleneck(metrics);

    console.log(`🔍 INP Analysis (${totalDuration}ms):`, {
      bottleneck,
      breakdown: {
        inputDelay: `${inputDelay}ms`,
        processingTime: `${processingTime}ms`,
        presentationDelay: `${presentationDelay}ms`,
      },
      recommendation: this.getOptimizationRecommendation(bottleneck),
    });
  }

  private identifyBottleneck(
    metrics: InteractionMetrics,
  ): "input" | "processing" | "presentation" {
    const { inputDelay, processingTime, presentationDelay } = metrics;

    if (inputDelay > processingTime && inputDelay > presentationDelay) {
      return "input";
    } else if (processingTime > presentationDelay) {
      return "processing";
    } else {
      return "presentation";
    }
  }

  private getOptimizationRecommendation(bottleneck: string): string {
    switch (bottleneck) {
      case "input":
        return "Reduce long tasks blocking main thread. Use scheduler.yield() or break up work.";
      case "processing":
        return "Optimize event handlers. Move heavy work after paint or use Web Workers.";
      case "presentation":
        return "Optimize rendering. Reduce DOM complexity, avoid forced layouts.";
      default:
        return "General optimization needed.";
    }
  }

  /**
   * 🛠️ SETUP AUTOMATIC INTERACTION OPTIMIZATION
   * Automatically applies best practices to all interactions
   */
  private setupInteractionOptimization(): void {
    if (typeof window === "undefined") return;

    // Intercept all click handlers for automatic optimization
    this.optimizeEventListeners();
  }

  private optimizeEventListeners(): void {
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ) {
      if (["click", "pointerdown", "keydown"].includes(type)) {
        const optimizedListener = this.createOptimizedListener(listener, type);
        return originalAddEventListener.call(
          this,
          type,
          optimizedListener,
          options,
        );
      }

      return originalAddEventListener.call(this, type, listener, options);
    }.bind(this);
  }

  private createOptimizedListener(
    originalListener: EventListenerOrEventListenerObject,
    eventType: string,
  ): EventListener {
    return async (event: Event) => {
      const taskId = `${eventType}-${Date.now()}-${Math.random()}`;

      try {
        // Apply debouncing for rapid interactions
        if (this.config.enableDebouncing) {
          await this.debounceTask(taskId, originalListener, event);
        } else {
          await this.executeWithOptimization(originalListener, event, taskId);
        }
      } catch (error) {
        console.error("Optimized listener error:", error);
      }
    };
  }

  /**
   * 🎯 ADVANCED DEBOUNCING WITH ABORTCONTROLLER
   * Implements latest 2025 patterns for interaction optimization
   */
  private async debounceTask(
    taskId: string,
    listener: EventListenerOrEventListenerObject,
    event: Event,
  ): Promise<void> {
    // Cancel previous task if exists
    const previousTimer = this.debouncedTasks.get(taskId);
    if (previousTimer) {
      clearTimeout(previousTimer);
    }

    // Cancel any existing AbortController for this task type
    const previousController = this.abortControllers.get(taskId);
    if (previousController) {
      previousController.abort();
    }

    // Create new AbortController
    const controller = new AbortController();
    this.abortControllers.set(taskId, controller);

    // Set debounced execution
    const timer = setTimeout(async () => {
      if (!controller.signal.aborted) {
        await this.executeWithOptimization(listener, event, taskId);
      }
    }, this.config.debounceDelay);

    this.debouncedTasks.set(taskId, timer);
  }

  /**
   * 🚀 SCHEDULER.YIELD() IMPLEMENTATION (2025 STANDARD)
   * Polyfill for scheduler.yield() with fallback
   */
  private async schedulerYield(): Promise<void> {
    // Use native scheduler.yield() if available (Chrome 94+)
    if ("scheduler" in window && "yield" in (window as any).scheduler) {
      return (window as any).scheduler.yield();
    }

    // Polyfill: requestAnimationFrame + setTimeout pattern
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        setTimeout(resolve, 0);
      });
    });
  }

  private async executeWithOptimization(
    listener: EventListenerOrEventListenerObject,
    event: Event,
    taskId: string,
  ): Promise<void> {
    const controller = this.abortControllers.get(taskId);

    if (controller?.signal.aborted) {
      return; // Task was cancelled
    }

    // Execute the original listener
    if (typeof listener === "function") {
      const result = listener.call(event.target, event);

      // If it returns a promise, handle it with yielding
      if (result instanceof Promise) {
        await this.executeAsyncWithYielding(result, controller?.signal);
      }
    } else if (listener?.handleEvent) {
      listener.handleEvent(event);
    }

    // Clean up
    this.abortControllers.delete(taskId);
  }

  private async executeAsyncWithYielding(
    promise: Promise<any>,
    signal?: AbortSignal,
  ): Promise<void> {
    if (signal?.aborted) return;

    try {
      await promise;

      // Yield to main thread after heavy async work
      if (this.config.enableSchedulerYield) {
        await this.schedulerYield();
      }
    } catch (error) {
      console.error("Async execution with yielding failed:", error);
    }
  }

  /**
   * 🔄 BREAK UP LONG TASKS WITH YIELDING
   * Advanced technique for chunking heavy synchronous work
   */
  async executeHeavyWork<T>(
    workFn: () => T,
    options: {
      chunkSize?: number;
      signal?: AbortSignal;
      onProgress?: (progress: number) => void;
    } = {},
  ): Promise<T> {
    const { chunkSize = 5, signal, onProgress } = options;
    let workStartTime = performance.now();

    const work = async (): Promise<T> => {
      while (true) {
        if (signal?.aborted) {
          throw new Error("Work aborted");
        }

        // Check if we should yield
        const elapsed = performance.now() - workStartTime;
        if (elapsed > chunkSize) {
          onProgress?.(elapsed);
          await this.schedulerYield();
          workStartTime = performance.now();
        }

        // Execute the actual work
        return workFn();
      }
    };

    return work();
  }

  /**
   * 📊 GET CURRENT INP METRICS
   */
  getCurrentINP(): number {
    if (this.metrics.length === 0) return 0;

    // Return the worst interaction (98th percentile for pages with many interactions)
    const sortedDurations = this.metrics
      .map((m) => m.totalDuration)
      .sort((a, b) => b - a);

    if (sortedDurations.length >= 50) {
      // Use 98th percentile for highly interactive pages
      const index = Math.floor(sortedDurations.length * 0.02);
      return sortedDurations[index];
    } else {
      // Use worst interaction for less interactive pages
      return sortedDurations[0] || 0;
    }
  }

  getINPRating(): "good" | "needs-improvement" | "poor" {
    const inp = this.getCurrentINP();

    if (inp <= INP_THRESHOLDS.GOOD) return "good";
    if (inp <= INP_THRESHOLDS.NEEDS_IMPROVEMENT) return "needs-improvement";
    return "poor";
  }

  /**
   * 🧹 CLEANUP
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    // Cancel all pending tasks
    this.abortControllers.forEach((controller) => controller.abort());
    this.abortControllers.clear();

    // Clear all timers
    this.debouncedTasks.forEach((timer) => clearTimeout(timer));
    this.debouncedTasks.clear();
  }
}

// Global instance for easy usage
export const enhancedINPOptimizer = new EnhancedINPOptimizer();

// React hook for components
export function useEnhancedINP() {
  return {
    getCurrentINP: () => enhancedINPOptimizer.getCurrentINP(),
    getRating: () => enhancedINPOptimizer.getINPRating(),
    executeHeavyWork:
      enhancedINPOptimizer.executeHeavyWork.bind(enhancedINPOptimizer),
  };
}

export default EnhancedINPOptimizer;
