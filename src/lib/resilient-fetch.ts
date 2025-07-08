/**
 * Resilient Fetch Utility
 * Provides retry logic, timeouts, and circuit breaker pattern for network requests
 */

import { CircuitBreaker } from "./circuit-breaker";

export interface ResilientFetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  useCircuitBreaker?: boolean;
  onRetry?: (attempt: number, error: Error) => void;
}

// Default circuit breaker instance
const defaultCircuitBreaker = new CircuitBreaker();

/**
 * Fetch with automatic retries and exponential backoff
 */
export async function resilientFetch(
  url: string,
  options: ResilientFetchOptions = {},
): Promise<Response> {
  const {
    retries = 3,
    retryDelay = 1000,
    timeout = 10000,
    useCircuitBreaker = true,
    onRetry,
    ...fetchOptions
  } = options;

  // Use circuit breaker if enabled
  if (useCircuitBreaker) {
    return defaultCircuitBreaker.call(() =>
      fetchWithRetry(url, fetchOptions, retries, retryDelay, timeout, onRetry),
    );
  }

  return fetchWithRetry(
    url,
    fetchOptions,
    retries,
    retryDelay,
    timeout,
    onRetry,
  );
}

/**
 * Internal fetch with retry logic
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number,
  retryDelay: number,
  timeout: number,
  onRetry?: (attempt: number, error: Error) => void,
): Promise<Response> {
  let lastError: Error = new Error("Unknown error");

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check if response is ok
      if (!response.ok && attempt < retries) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on abort errors (user cancelled)
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      // If this was the last attempt, throw the error
      if (attempt === retries) {
        throw lastError;
      }

      // Call retry callback if provided
      if (onRetry) {
        onRetry(attempt + 1, lastError);
      }

      // Calculate delay with exponential backoff
      const delay = retryDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Fetch with rate limiting
 */
export class RateLimitedFetch {
  private queue: Array<() => void> = [];
  private inProgress = 0;

  constructor(
    private maxConcurrent: number = 5,
    private minDelay: number = 100,
  ) {}

  async fetch(url: string, options?: ResilientFetchOptions): Promise<Response> {
    // Wait if we're at capacity
    if (this.inProgress >= this.maxConcurrent) {
      await new Promise<void>((resolve) => {
        this.queue.push(resolve);
      });
    }

    this.inProgress++;

    try {
      const response = await resilientFetch(url, options);

      // Add minimum delay between requests
      await new Promise((resolve) => setTimeout(resolve, this.minDelay));

      return response;
    } finally {
      this.inProgress--;

      // Process next in queue
      const next = this.queue.shift();
      if (next) {
        next();
      }
    }
  }
}

// Circuit breaker is now imported from './circuit-breaker'
// Removed duplicate implementation to fix build error

/**
 * Utility to check if fetch should be retried based on error
 */
export function isRetryableError(error: Error): boolean {
  // Network errors
  if (error.message.includes("Failed to fetch")) return true;
  if (error.message.includes("NetworkError")) return true;
  if (error.message.includes("ERR_NETWORK")) return true;

  // Timeout errors
  if (error.message.includes("timeout")) return true;
  if (error.message.includes("AbortError")) return true;

  // Server errors (5xx)
  if (error.message.includes("HTTP 5")) return true;

  // Rate limiting (429)
  if (error.message.includes("HTTP 429")) return true;

  return false;
}

/**
 * Create a resilient fetch instance with custom configuration
 */
export function createResilientFetch(defaultOptions: ResilientFetchOptions) {
  return (url: string, options?: ResilientFetchOptions) => {
    return resilientFetch(url, { ...defaultOptions, ...options });
  };
}
