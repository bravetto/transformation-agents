/**
 * Circuit Breaker Pattern Implementation
 * Prevents cascading failures by failing fast when a service is down
 */

export interface CircuitBreakerOptions {
  threshold?: number;
  timeout?: number;
  resetTimeout?: number;
  onStateChange?: (state: CircuitBreakerState) => void;
}

export type CircuitBreakerState = "closed" | "open" | "half-open";

export class CircuitBreaker {
  private failures = 0;
  private lastFailTime = 0;
  private successCount = 0;
  private state: CircuitBreakerState = "closed";
  private readonly threshold: number;
  private readonly timeout: number;
  private readonly resetTimeout: number;
  private readonly onStateChange?: (state: CircuitBreakerState) => void;
  private resetTimer?: NodeJS.Timeout;

  constructor(options: CircuitBreakerOptions = {}) {
    this.threshold = options.threshold ?? 5;
    this.timeout = options.timeout ?? 60000; // 1 minute
    this.resetTimeout = options.resetTimeout ?? 120000; // 2 minutes
    this.onStateChange = options.onStateChange;
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    // Check if circuit should transition from open to half-open
    if (this.state === "open" && this.shouldAttemptReset()) {
      this.transitionTo("half-open");
    }

    // If circuit is open, fail fast
    if (this.state === "open") {
      throw new Error("Circuit breaker is open - service unavailable");
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private shouldAttemptReset(): boolean {
    return Date.now() - this.lastFailTime > this.timeout;
  }

  private onSuccess(): void {
    if (this.state === "half-open") {
      this.successCount++;

      // Require multiple successes before fully closing
      if (this.successCount >= 3) {
        this.transitionTo("closed");
        this.reset();
      }
    } else if (this.state === "closed") {
      // Reset failure count on success in closed state
      this.failures = 0;
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailTime = Date.now();

    if (this.state === "half-open") {
      // Any failure in half-open state reopens the circuit
      this.transitionTo("open");
      this.scheduleReset();
    } else if (this.failures >= this.threshold) {
      // Open circuit if threshold exceeded
      this.transitionTo("open");
      this.scheduleReset();
    }
  }

  private transitionTo(newState: CircuitBreakerState): void {
    if (this.state !== newState) {
      this.state = newState;
      this.onStateChange?.(newState);
    }
  }

  private scheduleReset(): void {
    // Clear any existing timer
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
    }

    // Schedule automatic reset
    this.resetTimer = setTimeout(() => {
      this.transitionTo("half-open");
      this.successCount = 0;
    }, this.resetTimeout);
  }

  private reset(): void {
    this.failures = 0;
    this.successCount = 0;
    this.lastFailTime = 0;

    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
      this.resetTimer = undefined;
    }
  }

  getState(): {
    state: CircuitBreakerState;
    failures: number;
    lastFailTime: number;
    isOpen: boolean;
  } {
    return {
      state: this.state,
      failures: this.failures,
      lastFailTime: this.lastFailTime,
      isOpen: this.state === "open",
    };
  }

  forceOpen(): void {
    this.transitionTo("open");
    this.lastFailTime = Date.now();
  }

  forceClose(): void {
    this.transitionTo("closed");
    this.reset();
  }

  destroy(): void {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
    }
  }
}

/**
 * Create a circuit breaker with monitoring
 */
export function createMonitoredCircuitBreaker(
  name: string,
  options?: CircuitBreakerOptions,
): CircuitBreaker {
  return new CircuitBreaker({
    ...options,
    onStateChange: (state) => {
      console.log(`[CircuitBreaker: ${name}] State changed to ${state}`);
      options?.onStateChange?.(state);
    },
  });
}
