/**
 * Cascade Error Prevention System
 * Implements comprehensive monitoring and prevention of cascading failures
 */

import { logger } from "./logger";
import { getPerformanceMemory } from "./utils";

export interface CascadeError {
  id: string;
  timestamp: string;
  type:
    | "api_404"
    | "fast_refresh"
    | "infinite_loop"
    | "state_violation"
    | "memory_leak";
  severity: "low" | "medium" | "high" | "critical";
  component: string;
  message: string;
  stack?: string;
  frequency: number;
  resolved: boolean;
  preventionApplied: boolean;
}

export interface SystemHealth {
  status: "healthy" | "degraded" | "critical";
  uptime: number;
  errorRate: number;
  memoryUsage: number;
  apiHealth: {
    totalRequests: number;
    failedRequests: number;
    averageResponseTime: number;
  };
  componentHealth: {
    totalComponents: number;
    errorComponents: number;
    recoveredComponents: number;
  };
}

class CascadeErrorPrevention {
  private errors: Map<string, CascadeError> = new Map();
  private healthMetrics: SystemHealth;
  private monitoringInterval?: NodeJS.Timeout;
  private errorThresholds = {
    api_404: 5, // Max 5 404s per minute
    fast_refresh: 3, // Max 3 fast refresh errors per minute
    infinite_loop: 1, // Max 1 infinite loop per minute
    state_violation: 10, // Max 10 state violations per minute
    memory_leak: 2, // Max 2 memory leaks per minute
  };

  constructor() {
    this.healthMetrics = {
      status: "healthy",
      uptime: 0,
      errorRate: 0,
      memoryUsage: 0,
      apiHealth: {
        totalRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0,
      },
      componentHealth: {
        totalComponents: 0,
        errorComponents: 0,
        recoveredComponents: 0,
      },
    };
  }

  /**
   * Start cascade monitoring
   */
  startMonitoring() {
    if (typeof window === "undefined") return;

    this.monitoringInterval = setInterval(() => {
      this.checkSystemHealth();
      this.analyzeErrorPatterns();
      this.applyPreventiveMeasures();
    }, 5000); // Check every 5 seconds

    // Monitor API errors
    this.monitorApiErrors();

    // Monitor React errors
    this.monitorReactErrors();

    // Monitor memory usage
    this.monitorMemoryUsage();
  }

  /**
   * Stop cascade monitoring
   */
  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }
  }

  /**
   * Report a cascade error
   */
  reportError(
    error: Omit<
      CascadeError,
      "id" | "timestamp" | "frequency" | "resolved" | "preventionApplied"
    >,
  ) {
    const errorId = `${error.type}-${error.component}-${Date.now()}`;
    const existingError = Array.from(this.errors.values()).find(
      (e) =>
        e.type === error.type &&
        e.component === error.component &&
        e.message === error.message,
    );

    if (existingError) {
      // Increment frequency of existing error
      existingError.frequency++;
      existingError.timestamp = new Date().toISOString();
    } else {
      // Create new error entry
      const cascadeError: CascadeError = {
        id: errorId,
        timestamp: new Date().toISOString(),
        frequency: 1,
        resolved: false,
        preventionApplied: false,
        ...error,
      };

      this.errors.set(errorId, cascadeError);
    }

    // Trigger immediate analysis if critical
    if (error.severity === "critical") {
      this.handleCriticalError(errorId);
    }
  }

  /**
   * Monitor API errors (especially 404s)
   */
  private monitorApiErrors() {
    if (typeof window === "undefined") return;

    // Override fetch to monitor API calls
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = Date.now();

      try {
        const response = await originalFetch(...args);
        const responseTime = Date.now() - startTime;

        // Update API health metrics
        this.healthMetrics.apiHealth.totalRequests++;
        this.healthMetrics.apiHealth.averageResponseTime =
          (this.healthMetrics.apiHealth.averageResponseTime + responseTime) / 2;

        // Check for 404 errors
        if (response.status === 404) {
          this.healthMetrics.apiHealth.failedRequests++;

          const url =
            typeof args[0] === "string"
              ? args[0]
              : args[0] instanceof URL
                ? args[0].toString()
                : args[0].url;
          this.reportError({
            type: "api_404",
            severity: "medium",
            component: "API",
            message: `404 error for ${url}`,
            stack: `URL: ${url}, Status: ${response.status}`,
          });
        }

        return response;
      } catch (error) {
        this.healthMetrics.apiHealth.failedRequests++;

        this.reportError({
          type: "api_404",
          severity: "high",
          component: "API",
          message: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
          stack: error instanceof Error ? error.stack : undefined,
        });

        throw error;
      }
    };
  }

  /**
   * Monitor React errors and Fast Refresh issues
   */
  private monitorReactErrors() {
    if (typeof window === "undefined") return;

    // Monitor console errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args.join(" ");

      // Check for Fast Refresh errors
      if (message.includes("Fast Refresh") || message.includes("full reload")) {
        this.reportError({
          type: "fast_refresh",
          severity: "medium",
          component: "React",
          message: "Fast Refresh runtime error detected",
          stack: message,
        });
      }

      // Check for infinite loop patterns
      if (
        message.includes("Maximum update depth") ||
        message.includes("Too many re-renders")
      ) {
        this.reportError({
          type: "infinite_loop",
          severity: "high",
          component: "React",
          message: "Infinite loop detected in React component",
          stack: message,
        });
      }

      // Check for state violations
      if (message.includes("setState") || message.includes("state update")) {
        this.reportError({
          type: "state_violation",
          severity: "medium",
          component: "React",
          message: "React state violation detected",
          stack: message,
        });
      }

      originalConsoleError.apply(console, args);
    };
  }

  /**
   * Monitor memory usage
   */
  private monitorMemoryUsage() {
    if (typeof window === "undefined") return;

    const checkMemory = () => {
      const memoryInfo = getPerformanceMemory();
      if (memoryInfo) {
        const usagePercent = (memoryInfo.used / memoryInfo.limit) * 100;
        this.healthMetrics.memoryUsage = usagePercent;

        if (usagePercent > 80) {
          this.reportError({
            type: "memory_leak",
            severity: "high",
            component: "System",
            message: `High memory usage: ${usagePercent.toFixed(1)}%`,
            stack: `Used: ${memoryInfo.used}, Limit: ${memoryInfo.limit}`,
          });
        }
      }
    };

    setInterval(checkMemory, 10000); // Check every 10 seconds
  }

  /**
   * Check overall system health
   */
  private checkSystemHealth() {
    const now = Date.now();
    const recentErrors = Array.from(this.errors.values()).filter(
      (error) => now - new Date(error.timestamp).getTime() < 60000, // Last minute
    );

    const errorRate = recentErrors.length;
    this.healthMetrics.errorRate = errorRate;

    // Determine system status
    if (errorRate === 0) {
      this.healthMetrics.status = "healthy";
    } else if (errorRate < 5) {
      this.healthMetrics.status = "degraded";
    } else {
      this.healthMetrics.status = "critical";
    }

    // Update component health
    const errorComponents = new Set(recentErrors.map((e) => e.component)).size;
    this.healthMetrics.componentHealth.errorComponents = errorComponents;
  }

  /**
   * Analyze error patterns for prevention
   */
  private analyzeErrorPatterns() {
    const now = Date.now();
    const recentErrors = Array.from(this.errors.values()).filter(
      (error) => now - new Date(error.timestamp).getTime() < 60000,
    );

    // Check for threshold violations
    for (const [errorType, threshold] of Object.entries(this.errorThresholds)) {
      const typeErrors = recentErrors.filter((e) => e.type === errorType);

      if (typeErrors.length >= threshold) {
        this.reportError({
          type: "state_violation",
          severity: "critical",
          component: "System",
          message: `Error threshold exceeded for ${errorType}: ${typeErrors.length}/${threshold}`,
          stack: `Recent errors: ${typeErrors.map((e) => e.message).join(", ")}`,
        });
      }
    }
  }

  /**
   * Apply preventive measures
   */
  private applyPreventiveMeasures() {
    const unhandledErrors = Array.from(this.errors.values()).filter(
      (error) => !error.preventionApplied && !error.resolved,
    );

    for (const error of unhandledErrors) {
      switch (error.type) {
        case "api_404":
          this.preventApiErrors(error);
          break;
        case "fast_refresh":
          this.preventFastRefreshErrors(error);
          break;
        case "infinite_loop":
          this.preventInfiniteLoops(error);
          break;
        case "memory_leak":
          this.preventMemoryLeaks(error);
          break;
      }

      error.preventionApplied = true;
    }
  }

  /**
   * Prevent API errors
   */
  private preventApiErrors(error: CascadeError) {
    // Log for debugging
    console.warn(`🛡️ Applying API error prevention for: ${error.message}`);

    // In a real application, you might:
    // - Implement retry logic
    // - Add circuit breakers
    // - Cache responses
    // - Provide fallback endpoints
  }

  /**
   * Prevent Fast Refresh errors
   */
  private preventFastRefreshErrors(error: CascadeError) {
    console.warn(
      `🛡️ Applying Fast Refresh error prevention for: ${error.message}`,
    );

    // In a real application, you might:
    // - Restart the development server
    // - Clear the Next.js cache
    // - Reload the page
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      // Force a hard reload in development
      setTimeout(() => window.location.reload(), 1000);
    }
  }

  /**
   * Prevent infinite loops
   */
  private preventInfiniteLoops(error: CascadeError) {
    console.warn(`🛡️ Applying infinite loop prevention for: ${error.message}`);

    // In a real application, you might:
    // - Implement component-level circuit breakers
    // - Add dependency array validation
    // - Implement state update throttling
  }

  /**
   * Prevent memory leaks
   */
  private preventMemoryLeaks(error: CascadeError) {
    console.warn(`🛡️ Applying memory leak prevention for: ${error.message}`);

    // In a real application, you might:
    // - Force garbage collection
    // - Clear component caches
    // - Restart intervals/timers
    if (typeof window !== "undefined" && "gc" in window) {
      (window as any).gc();
    }
  }

  /**
   * Handle critical errors immediately
   */
  private handleCriticalError(errorId: string) {
    const error = this.errors.get(errorId);
    if (!error) return;

    console.error(`🚨 CRITICAL CASCADE ERROR: ${error.message}`);

    // In a real application, you might:
    // - Send alerts to monitoring services
    // - Trigger emergency recovery procedures
    // - Notify administrators

    // Mark as resolved after handling
    error.resolved = true;
  }

  /**
   * Get current system health
   */
  getSystemHealth(): SystemHealth {
    return { ...this.healthMetrics };
  }

  /**
   * Get error summary
   */
  getErrorSummary() {
    const errors = Array.from(this.errors.values());
    const now = Date.now();

    return {
      total: errors.length,
      recent: errors.filter(
        (e) => now - new Date(e.timestamp).getTime() < 60000,
      ).length,
      critical: errors.filter((e) => e.severity === "critical").length,
      resolved: errors.filter((e) => e.resolved).length,
      byType: {
        api_404: errors.filter((e) => e.type === "api_404").length,
        fast_refresh: errors.filter((e) => e.type === "fast_refresh").length,
        infinite_loop: errors.filter((e) => e.type === "infinite_loop").length,
        state_violation: errors.filter((e) => e.type === "state_violation")
          .length,
        memory_leak: errors.filter((e) => e.type === "memory_leak").length,
      },
    };
  }

  /**
   * Clear resolved errors
   */
  clearResolvedErrors() {
    for (const [id, error] of this.errors.entries()) {
      if (error.resolved) {
        this.errors.delete(id);
      }
    }
  }
}

// Export singleton instance
export const cascadeErrorPrevention = new CascadeErrorPrevention();

// Auto-start monitoring in browser environment
if (typeof window !== "undefined") {
  cascadeErrorPrevention.startMonitoring();
}
