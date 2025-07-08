/**
 * Resilient network layer with retry logic and circuit breaker
 */

interface RetryOptions {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  onRetry?: (error: Error, attempt: number) => void;
}

interface CircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeout?: number;
  monitorTimeout?: number;
}

// Circuit breaker states
type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

class CircuitBreaker {
  private state: CircuitState = "CLOSED";
  private failureCount = 0;
  private lastFailureTime = 0;
  private successCount = 0;

  constructor(
    private service: string,
    private options: CircuitBreakerOptions = {},
  ) {
    this.options = {
      failureThreshold: 5,
      resetTimeout: 60000, // 1 minute
      monitorTimeout: 10000, // 10 seconds
      ...options,
    };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Check if circuit should be reset
    if (this.state === "OPEN") {
      const timeSinceLastFailure = Date.now() - this.lastFailureTime;
      if (timeSinceLastFailure > this.options.resetTimeout!) {
        this.state = "HALF_OPEN";
        this.successCount = 0;
      } else {
        throw new Error(
          `Circuit breaker is OPEN for ${this.service}. Service is unavailable.`,
        );
      }
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

  private onSuccess() {
    this.failureCount = 0;

    if (this.state === "HALF_OPEN") {
      this.successCount++;
      if (this.successCount >= 3) {
        this.state = "CLOSED";
        console.log(`Circuit breaker for ${this.service} is now CLOSED`);
      }
    }
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.options.failureThreshold!) {
      this.state = "OPEN";
      console.error(
        `Circuit breaker for ${this.service} is now OPEN after ${this.failureCount} failures`,
      );
    }
  }

  getState(): CircuitState {
    return this.state;
  }

  reset() {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
  }
}

// Global circuit breakers for different services
const circuitBreakers = new Map<string, CircuitBreaker>();

function getCircuitBreaker(service: string): CircuitBreaker {
  if (!circuitBreakers.has(service)) {
    circuitBreakers.set(service, new CircuitBreaker(service));
  }
  return circuitBreakers.get(service)!;
}

/**
 * Calculate exponential backoff delay
 */
function calculateBackoff(attempt: number, baseDelay: number): number {
  const maxDelay = 30000; // 30 seconds max
  const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  // Add jitter to prevent thundering herd
  const jitter = Math.random() * 0.3 * delay;
  return Math.floor(delay + jitter);
}

/**
 * Resilient fetch with retry logic and circuit breaker
 */
export async function resilientFetch(
  url: string,
  options: RequestInit & RetryOptions = {},
): Promise<Response> {
  const {
    retries = 3,
    retryDelay = 300,
    timeout = 10000,
    onRetry,
    ...fetchOptions
  } = options;

  // Determine service name from URL
  const service = new URL(url).hostname;
  const circuitBreaker = getCircuitBreaker(service);

  // Execute with circuit breaker
  return circuitBreaker.execute(async () => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          const delay = retryAfter
            ? parseInt(retryAfter, 10) * 1000
            : calculateBackoff(attempt, retryDelay);

          if (attempt < retries) {
            console.warn(`Rate limited. Retrying after ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }
        }

        // Retry on server errors
        if (response.status >= 500 && attempt < retries) {
          lastError = new Error(`Server error: ${response.status}`);
          const delay = calculateBackoff(attempt, retryDelay);

          if (onRetry) {
            onRetry(lastError, attempt + 1);
          }

          console.warn(
            `Server error ${response.status}. Retrying in ${delay}ms...`,
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        return response;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on client errors
        if (
          error instanceof TypeError &&
          error.message.includes("Failed to fetch")
        ) {
          // Network error - retry if attempts remain
          if (attempt < retries) {
            const delay = calculateBackoff(attempt, retryDelay);

            if (onRetry) {
              onRetry(lastError, attempt + 1);
            }

            console.warn(`Network error. Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }
        }

        // Don't retry on abort
        if (error instanceof Error && error.name === "AbortError") {
          throw new Error(`Request timeout after ${timeout}ms`);
        }

        throw lastError;
      }
    }

    throw lastError || new Error("Max retries reached");
  });
}

/**
 * Batch multiple requests with resilience
 */
export async function resilientBatch<T>(
  requests: Array<() => Promise<T>>,
  options: {
    maxConcurrent?: number;
    stopOnError?: boolean;
  } = {},
): Promise<
  Array<{ status: "fulfilled" | "rejected"; value?: T; reason?: any }>
> {
  const { maxConcurrent = 5, stopOnError = false } = options;
  const results: Array<{
    status: "fulfilled" | "rejected";
    value?: T;
    reason?: any;
  }> = [];

  // Process in batches
  for (let i = 0; i < requests.length; i += maxConcurrent) {
    const batch = requests.slice(i, i + maxConcurrent);
    const batchResults = await Promise.allSettled(batch.map((fn) => fn()));

    for (const result of batchResults) {
      if (result.status === "rejected" && stopOnError) {
        throw result.reason;
      }

      results.push({
        status: result.status,
        value: result.status === "fulfilled" ? result.value : undefined,
        reason: result.status === "rejected" ? result.reason : undefined,
      });
    }
  }

  return results;
}

/**
 * Get circuit breaker status for monitoring
 */
export function getCircuitBreakerStatus(): Record<
  string,
  { state: CircuitState }
> {
  const status: Record<string, { state: CircuitState }> = {};

  circuitBreakers.forEach((breaker, service) => {
    status[service] = { state: breaker.getState() };
  });

  return status;
}

/**
 * Reset all circuit breakers (for testing or manual intervention)
 */
export function resetAllCircuitBreakers(): void {
  circuitBreakers.forEach((breaker) => breaker.reset());
  console.log("All circuit breakers have been reset");
}
