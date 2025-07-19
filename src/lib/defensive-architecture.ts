/**
 * Defensive Architecture Patterns
 * Implements circuit breakers, retry logic, and error boundaries at the system level
 */

import { cascadeErrorPrevention } from "./cascade-error-prevention";

export interface CircuitBreakerConfig {
  failureThreshold: number;
  resetTimeout: number;
  monitoringWindow: number;
}

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

export type CircuitBreakerState = "closed" | "open" | "half-open";

class CircuitBreaker {
  private state: CircuitBreakerState = "closed";
  private failures = 0;
  private lastFailureTime = 0;
  private nextAttempt = 0;

  constructor(
    private name: string,
    private config: CircuitBreakerConfig,
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() < this.nextAttempt) {
        throw new Error(`Circuit breaker ${this.name} is OPEN`);
      }
      this.state = "half-open";
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = "closed";
  }

  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.config.failureThreshold) {
      this.state = "open";
      this.nextAttempt = Date.now() + this.config.resetTimeout;

      cascadeErrorPrevention.reportError({
        type: "state_violation",
        severity: "high",
        component: this.name,
        message: `Circuit breaker ${this.name} opened after ${this.failures} failures`,
      });
    }
  }

  getState(): CircuitBreakerState {
    return this.state;
  }

  getFailureCount(): number {
    return this.failures;
  }
}

class RetryManager {
  static async executeWithRetry<T>(
    operation: () => Promise<T>,
    config: RetryConfig,
    circuitBreaker?: CircuitBreaker,
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        if (circuitBreaker) {
          return await circuitBreaker.execute(operation);
        } else {
          return await operation();
        }
      } catch (error) {
        lastError = error as Error;

        if (attempt === config.maxRetries) {
          break;
        }

        // Calculate exponential backoff delay
        const delay = Math.min(
          config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
          config.maxDelay,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }
}

class DefensiveArchitecture {
  private circuitBreakers = new Map<string, CircuitBreaker>();
  private componentHealthChecks = new Map<string, () => Promise<boolean>>();

  // Default configurations
  private defaultCircuitBreakerConfig: CircuitBreakerConfig = {
    failureThreshold: 5,
    resetTimeout: 30000, // 30 seconds
    monitoringWindow: 60000, // 1 minute
  };

  private defaultRetryConfig: RetryConfig = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
  };

  /**
   * Create a circuit breaker for a specific component
   */
  createCircuitBreaker(
    name: string,
    config: Partial<CircuitBreakerConfig> = {},
  ): CircuitBreaker {
    const fullConfig = { ...this.defaultCircuitBreakerConfig, ...config };
    const circuitBreaker = new CircuitBreaker(name, fullConfig);
    this.circuitBreakers.set(name, circuitBreaker);
    return circuitBreaker;
  }

  /**
   * Get existing circuit breaker
   */
  getCircuitBreaker(name: string): CircuitBreaker | undefined {
    return this.circuitBreakers.get(name);
  }

  /**
   * Defensive API call with circuit breaker and retry logic
   */
  async defensiveApiCall<T>(
    url: string,
    options: RequestInit = {},
    config: {
      circuitBreaker?: string;
      retry?: Partial<RetryConfig>;
      timeout?: number;
    } = {},
  ): Promise<T> {
    const circuitBreaker = config.circuitBreaker
      ? this.getCircuitBreaker(config.circuitBreaker) ||
        this.createCircuitBreaker(config.circuitBreaker)
      : undefined;

    const retryConfig = { ...this.defaultRetryConfig, ...config.retry };
    const timeout = config.timeout || 10000;

    const operation = async (): Promise<T> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    };

    return RetryManager.executeWithRetry(
      operation,
      retryConfig,
      circuitBreaker,
    );
  }

  /**
   * Defensive component rendering with error boundaries
   */
  defensiveRender<T>(
    component: () => T,
    fallback: T,
    componentName: string,
  ): T {
    try {
      return component();
    } catch (error) {
      cascadeErrorPrevention.reportError({
        type: "state_violation",
        severity: "medium",
        component: componentName,
        message: `Component render error: ${error instanceof Error ? error.message : "Unknown error"}`,
        stack: error instanceof Error ? error.stack : undefined,
      });

      return fallback;
    }
  }

  /**
   * Defensive state updates with validation
   */
  defensiveStateUpdate<T>(
    currentState: T,
    update: (state: T) => T,
    validator: (state: T) => boolean,
    componentName: string,
  ): T {
    try {
      const newState = update(currentState);

      if (!validator(newState)) {
        throw new Error("State validation failed");
      }

      return newState;
    } catch (error) {
      cascadeErrorPrevention.reportError({
        type: "state_violation",
        severity: "medium",
        component: componentName,
        message: `State update error: ${error instanceof Error ? error.message : "Unknown error"}`,
        stack: error instanceof Error ? error.stack : undefined,
      });

      return currentState;
    }
  }

  /**
   * Defensive useEffect with cleanup tracking
   */
  defensiveEffect(
    effect: () => void | (() => void),
    deps: React.DependencyList,
    componentName: string,
  ): () => void {
    let cleanup: (() => void) | undefined;
    let isActive = true;

    try {
      cleanup = effect() || undefined;
    } catch (error) {
      cascadeErrorPrevention.reportError({
        type: "state_violation",
        severity: "medium",
        component: componentName,
        message: `Effect error: ${error instanceof Error ? error.message : "Unknown error"}`,
        stack: error instanceof Error ? error.stack : undefined,
      });
    }

    return () => {
      isActive = false;
      if (cleanup) {
        try {
          cleanup();
        } catch (error) {
          cascadeErrorPrevention.reportError({
            type: "state_violation",
            severity: "low",
            component: componentName,
            message: `Effect cleanup error: ${error instanceof Error ? error.message : "Unknown error"}`,
            stack: error instanceof Error ? error.stack : undefined,
          });
        }
      }
    };
  }

  /**
   * Defensive interval management
   */
  defensiveInterval(
    callback: () => void,
    delay: number,
    componentName: string,
  ): () => void {
    let intervalId: NodeJS.Timeout | undefined;
    let isActive = true;

    const wrappedCallback = () => {
      if (!isActive) return;

      try {
        callback();
      } catch (error) {
        cascadeErrorPrevention.reportError({
          type: "state_violation",
          severity: "medium",
          component: componentName,
          message: `Interval callback error: ${error instanceof Error ? error.message : "Unknown error"}`,
          stack: error instanceof Error ? error.stack : undefined,
        });
      }
    };

    intervalId = setInterval(wrappedCallback, delay);

    return () => {
      isActive = false;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    };
  }

  /**
   * Register component health check
   */
  registerHealthCheck(
    componentName: string,
    healthCheck: () => Promise<boolean>,
  ): void {
    this.componentHealthChecks.set(componentName, healthCheck);
  }

  /**
   * Run health checks for all registered components
   */
  async runHealthChecks(): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>();

    for (const [componentName, healthCheck] of this.componentHealthChecks) {
      try {
        const isHealthy = await healthCheck();
        results.set(componentName, isHealthy);
      } catch (error) {
        results.set(componentName, false);

        cascadeErrorPrevention.reportError({
          type: "state_violation",
          severity: "medium",
          component: componentName,
          message: `Health check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
          stack: error instanceof Error ? error.stack : undefined,
        });
      }
    }

    return results;
  }

  /**
   * Get system defensive metrics
   */
  getDefensiveMetrics() {
    const circuitBreakerStates = new Map<string, CircuitBreakerState>();
    const circuitBreakerFailures = new Map<string, number>();

    for (const [name, cb] of this.circuitBreakers) {
      circuitBreakerStates.set(name, cb.getState());
      circuitBreakerFailures.set(name, cb.getFailureCount());
    }

    return {
      circuitBreakers: {
        total: this.circuitBreakers.size,
        open: Array.from(circuitBreakerStates.values()).filter(
          (state) => state === "open",
        ).length,
        halfOpen: Array.from(circuitBreakerStates.values()).filter(
          (state) => state === "half-open",
        ).length,
        closed: Array.from(circuitBreakerStates.values()).filter(
          (state) => state === "closed",
        ).length,
        states: Object.fromEntries(circuitBreakerStates),
        failures: Object.fromEntries(circuitBreakerFailures),
      },
      healthChecks: {
        registered: this.componentHealthChecks.size,
      },
    };
  }

  /**
   * Reset all circuit breakers
   */
  resetAllCircuitBreakers(): void {
    for (const [name, cb] of this.circuitBreakers) {
      // Force reset by creating a new circuit breaker
      this.circuitBreakers.set(
        name,
        new CircuitBreaker(name, this.defaultCircuitBreakerConfig),
      );
    }
  }
}

// Export singleton instance
export const defensiveArchitecture = new DefensiveArchitecture();

// Create default circuit breakers for common components
defensiveArchitecture.createCircuitBreaker("api-analytics", {
  failureThreshold: 3,
  resetTimeout: 15000,
});

defensiveArchitecture.createCircuitBreaker("api-divine-events", {
  failureThreshold: 5,
  resetTimeout: 30000,
});

defensiveArchitecture.createCircuitBreaker("component-rendering", {
  failureThreshold: 10,
  resetTimeout: 5000,
});

// React hook for defensive patterns
export function useDefensiveArchitecture() {
  return {
    defensiveApiCall: defensiveArchitecture.defensiveApiCall.bind(
      defensiveArchitecture,
    ),
    defensiveRender: defensiveArchitecture.defensiveRender.bind(
      defensiveArchitecture,
    ),
    defensiveStateUpdate: defensiveArchitecture.defensiveStateUpdate.bind(
      defensiveArchitecture,
    ),
    defensiveEffect: defensiveArchitecture.defensiveEffect.bind(
      defensiveArchitecture,
    ),
    defensiveInterval: defensiveArchitecture.defensiveInterval.bind(
      defensiveArchitecture,
    ),
    getCircuitBreaker: defensiveArchitecture.getCircuitBreaker.bind(
      defensiveArchitecture,
    ),
    getDefensiveMetrics: defensiveArchitecture.getDefensiveMetrics.bind(
      defensiveArchitecture,
    ),
  };
}
