/**
 * Memory Leak Prevention System
 * Detects and prevents common memory leaks in React applications
 */

import { useEffect, useRef, useCallback, useState } from "react";

interface ComponentMetrics {
  renderCount: number;
  mountTime: number;
  lastRender: number;
  timers: Set<NodeJS.Timeout>;
  intervals: Set<NodeJS.Timeout>;
  listeners: Set<{ element: any; event: string; handler: Function }>;
  subscriptions: Set<() => void>;
}

// Global component tracking for memory leak detection
const componentMetrics = new Map<string, ComponentMetrics>();

/**
 * Cleanup Manager - Centralized cleanup for all async operations
 */
export class CleanupManager {
  private timers = new Set<NodeJS.Timeout>();
  private intervals = new Set<NodeJS.Timeout>();
  private listeners: Array<{ element: any; event: string; handler: Function }> =
    [];
  private subscriptions: Array<() => void> = [];
  private abortControllers = new Set<AbortController>();
  private isMounted = true;

  // Timer management
  setTimeout(callback: () => void, delay: number): NodeJS.Timeout {
    if (!this.isMounted) {
      console.warn("⚠️ Attempted to set timeout after component unmounted");
      return {} as NodeJS.Timeout;
    }

    const timer = setTimeout(() => {
      if (this.isMounted) {
        callback();
      }
      this.timers.delete(timer);
    }, delay);

    this.timers.add(timer);
    return timer;
  }

  setInterval(callback: () => void, delay: number): NodeJS.Timeout {
    if (!this.isMounted) {
      console.warn("⚠️ Attempted to set interval after component unmounted");
      return {} as NodeJS.Timeout;
    }

    const interval = setInterval(() => {
      if (this.isMounted) {
        callback();
      } else {
        clearInterval(interval);
        this.intervals.delete(interval);
      }
    }, delay);

    this.intervals.add(interval);
    return interval;
  }

  clearTimeout(timer: NodeJS.Timeout): void {
    clearTimeout(timer);
    this.timers.delete(timer);
  }

  clearInterval(interval: NodeJS.Timeout): void {
    clearInterval(interval);
    this.intervals.delete(interval);
  }

  // Event listener management
  addEventListener<T extends keyof WindowEventMap>(
    element: Window,
    event: T,
    handler: (event: WindowEventMap[T]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener<T extends keyof DocumentEventMap>(
    element: Document,
    event: T,
    handler: (event: DocumentEventMap[T]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener<T extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: T,
    handler: (event: HTMLElementEventMap[T]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    element: any,
    event: string,
    handler: Function,
    options?: boolean | AddEventListenerOptions,
  ): void {
    if (!this.isMounted) {
      console.warn(
        "⚠️ Attempted to add event listener after component unmounted",
      );
      return;
    }

    element.addEventListener(event, handler, options);
    this.listeners.push({ element, event, handler });
  }

  removeEventListener(element: any, event: string, handler: Function): void {
    element.removeEventListener(event, handler);
    this.listeners = this.listeners.filter(
      (listener) =>
        !(
          listener.element === element &&
          listener.event === event &&
          listener.handler === handler
        ),
    );
  }

  // Subscription management
  addSubscription(unsubscribe: () => void): void {
    if (!this.isMounted) {
      console.warn(
        "⚠️ Attempted to add subscription after component unmounted",
      );
      return;
    }

    this.subscriptions.push(unsubscribe);
  }

  // AbortController management for fetch requests
  createAbortController(): AbortController {
    if (!this.isMounted) {
      console.warn(
        "⚠️ Attempted to create abort controller after component unmounted",
      );
    }

    const controller = new AbortController();
    this.abortControllers.add(controller);
    return controller;
  }

  // Fetch with auto-cleanup
  fetch(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = this.createAbortController();

    return fetch(url, {
      ...options,
      signal: controller.signal,
    }).finally(() => {
      this.abortControllers.delete(controller);
    });
  }

  // Cleanup all resources
  cleanup(): void {
    this.isMounted = false;

    // Clear timers
    this.timers.forEach((timer) => clearTimeout(timer));
    this.intervals.forEach((interval) => clearInterval(interval));

    // Remove event listeners
    this.listeners.forEach(({ element, event, handler }) => {
      try {
        element.removeEventListener(event, handler);
      } catch (error) {
        console.warn("Failed to remove event listener:", error);
      }
    });

    // Clean up subscriptions
    this.subscriptions.forEach((unsubscribe) => {
      try {
        unsubscribe();
      } catch (error) {
        console.warn("Failed to unsubscribe:", error);
      }
    });

    // Abort pending requests
    this.abortControllers.forEach((controller) => {
      try {
        controller.abort();
      } catch (error) {
        console.warn("Failed to abort request:", error);
      }
    });

    // Clear collections
    this.timers.clear();
    this.intervals.clear();
    this.listeners.length = 0;
    this.subscriptions.length = 0;
    this.abortControllers.clear();
  }

  // Check if component is still mounted
  isMountedCheck(): boolean {
    return this.isMounted;
  }
}

/**
 * React Hook for automatic cleanup management
 */
export function useCleanupManager(): CleanupManager {
  const managerRef = useRef<CleanupManager>();

  if (!managerRef.current) {
    managerRef.current = new CleanupManager();
  }

  useEffect(() => {
    const manager = managerRef.current!;

    return () => {
      manager.cleanup();
    };
  }, []);

  return managerRef.current;
}

/**
 * Infinite Render Loop Detection Hook
 */
export function useRenderLoopDetection(
  componentName: string,
  threshold = 50,
): void {
  const renderCountRef = useRef(0);
  const lastResetRef = useRef(Date.now());

  renderCountRef.current++;

  useEffect(() => {
    const now = Date.now();
    const timeSinceReset = now - lastResetRef.current;

    // Reset counter every 5 seconds
    if (timeSinceReset > 5000) {
      renderCountRef.current = 1;
      lastResetRef.current = now;
      return;
    }

    // Check for excessive renders
    if (renderCountRef.current > threshold) {
      console.error(
        `🚨 INFINITE RENDER LOOP DETECTED: ${componentName} has rendered ${renderCountRef.current} times in ${timeSinceReset}ms`,
      );

      // Send alert to monitoring system
      if (typeof window !== "undefined" && window.navigator?.sendBeacon) {
        window.navigator.sendBeacon(
          "/api/monitoring/render-loop",
          JSON.stringify({
            component: componentName,
            renderCount: renderCountRef.current,
            timespan: timeSinceReset,
            timestamp: new Date().toISOString(),
          }),
        );
      }

      // Reset to prevent spam
      renderCountRef.current = 0;
      lastResetRef.current = now;
    }
  });
}

/**
 * Safe State Hook - Prevents state updates after unmount
 */
export function useSafeState<T>(
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetState = useCallback((value: T | ((prev: T) => T)) => {
    if (mountedRef.current) {
      setState(value);
    } else {
      console.warn("⚠️ Attempted to set state after component unmounted");
    }
  }, []);

  return [state, safeSetState];
}

/**
 * Debounced State Hook - Prevents rapid state updates
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay = 300,
): [T, T, (value: T) => void] {
  const [immediate, setImmediate] = useSafeState<T>(initialValue);
  const [debounced, setDebounced] = useSafeState<T>(initialValue);
  const cleanup = useCleanupManager();

  useEffect(() => {
    const timer = cleanup.setTimeout(() => {
      setDebounced(immediate);
    }, delay);

    return () => cleanup.clearTimeout(timer);
  }, [immediate, delay, cleanup, setDebounced]);

  return [immediate, debounced, setImmediate];
}

/**
 * Performance Monitoring Hook
 */
export function usePerformanceMonitoring(componentName: string) {
  const metricsRef = useRef<ComponentMetrics>({
    renderCount: 0,
    mountTime: Date.now(),
    lastRender: Date.now(),
    timers: new Set(),
    intervals: new Set(),
    listeners: new Set(),
    subscriptions: new Set(),
  });

  // Update metrics on each render
  metricsRef.current.renderCount++;
  metricsRef.current.lastRender = Date.now();

  useEffect(() => {
    // Track component in global metrics
    componentMetrics.set(componentName, metricsRef.current);

    return () => {
      // Clean up metrics on unmount
      componentMetrics.delete(componentName);
    };
  }, [componentName]);

  // Return performance data
  return {
    renderCount: metricsRef.current.renderCount,
    uptime: Date.now() - metricsRef.current.mountTime,
    averageRenderTime:
      (Date.now() - metricsRef.current.mountTime) /
      metricsRef.current.renderCount,
  };
}

/**
 * Memory Usage Monitoring
 */
export function useMemoryMonitoring(warningThresholdMB = 50) {
  const [memoryInfo, setMemoryInfo] = useState<{
    used: number;
    limit: number;
    percentage: number;
  } | null>(null);

  const cleanup = useCleanupManager();

  useEffect(() => {
    // Only monitor in browsers that support memory API
    if (typeof window === "undefined" || !("memory" in performance)) {
      return;
    }

    const checkMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        const used = memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
        const limit = memory.jsHeapSizeLimit / 1024 / 1024; // Convert to MB
        const percentage = (used / limit) * 100;

        setMemoryInfo({ used, limit, percentage });

        // Warn if memory usage is high
        if (used > warningThresholdMB) {
          console.warn(
            `⚠️ High memory usage detected: ${used.toFixed(2)}MB (${percentage.toFixed(1)}%)`,
          );
        }
      }
    };

    // Check memory every 10 seconds
    const interval = cleanup.setInterval(checkMemory, 10000);
    checkMemory(); // Initial check

    return () => cleanup.clearInterval(interval);
  }, [cleanup, warningThresholdMB]);

  return memoryInfo;
}

/**
 * Global Memory Leak Detection
 */
export class MemoryLeakDetector {
  private static instance: MemoryLeakDetector;
  private detectionInterval?: NodeJS.Timeout;
  private lastHeapSize = 0;
  private steadyIncreaseCount = 0;

  static getInstance(): MemoryLeakDetector {
    if (!MemoryLeakDetector.instance) {
      MemoryLeakDetector.instance = new MemoryLeakDetector();
    }
    return MemoryLeakDetector.instance;
  }

  startDetection(): void {
    if (typeof window === "undefined" || !("memory" in performance)) {
      console.log("Memory leak detection not available in this environment");
      return;
    }

    this.detectionInterval = setInterval(() => {
      this.checkForLeaks();
    }, 30000); // Check every 30 seconds

    console.log("🔍 Memory leak detection started");
  }

  stopDetection(): void {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = undefined;
    }
  }

  private checkForLeaks(): void {
    const memory = (performance as any).memory;
    if (!memory) return;

    const currentHeapSize = memory.usedJSHeapSize;
    const heapIncrease = currentHeapSize - this.lastHeapSize;

    // If memory increased by more than 5MB
    if (heapIncrease > 5 * 1024 * 1024) {
      this.steadyIncreaseCount++;

      // If memory has been steadily increasing for 5 checks (2.5 minutes)
      if (this.steadyIncreaseCount >= 5) {
        console.error("🚨 POTENTIAL MEMORY LEAK DETECTED");
        console.error(
          `Heap size increased by ${(heapIncrease / 1024 / 1024).toFixed(2)}MB`,
        );
        console.error(
          "Component metrics:",
          Object.fromEntries(componentMetrics),
        );

        // Report to monitoring system
        if (window.navigator?.sendBeacon) {
          window.navigator.sendBeacon(
            "/api/monitoring/memory-leak",
            JSON.stringify({
              heapIncrease,
              currentHeapSize,
              componentCount: componentMetrics.size,
              timestamp: new Date().toISOString(),
            }),
          );
        }

        this.steadyIncreaseCount = 0; // Reset counter
      }
    } else {
      this.steadyIncreaseCount = 0;
    }

    this.lastHeapSize = currentHeapSize;
  }
}

// Auto-start memory leak detection in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  MemoryLeakDetector.getInstance().startDetection();
}

// MemoryLeakDetector already exported above
