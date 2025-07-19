/**
 * 🔥 DIVINE CIRCUIT BREAKER SYSTEM 🔥
 *
 * Prevents infinite render loops and component failures
 * with divine intervention and graceful degradation
 */

interface CircuitBreakerConfig {
  maxRenders: number;
  maxErrors: number;
  resetTimeMs: number;
  componentName: string;
}

interface CircuitState {
  renderCount: number;
  errorCount: number;
  lastReset: number;
  isOpen: boolean;
  lastError?: Error;
}

class DivineCircuitBreaker {
  private static instances = new Map<string, DivineCircuitBreaker>();
  private state: CircuitState;
  private config: CircuitBreakerConfig;

  constructor(config: CircuitBreakerConfig) {
    this.config = config;
    this.state = {
      renderCount: 0,
      errorCount: 0,
      lastReset: Date.now(),
      isOpen: false,
    };
  }

  static getInstance(
    componentName: string,
    config?: Partial<CircuitBreakerConfig>,
  ): DivineCircuitBreaker {
    if (!this.instances.has(componentName)) {
      const defaultConfig: CircuitBreakerConfig = {
        maxRenders: 50,
        maxErrors: 5,
        resetTimeMs: 30000, // 30 seconds
        componentName,
        ...config,
      };
      this.instances.set(
        componentName,
        new DivineCircuitBreaker(defaultConfig),
      );
    }
    return this.instances.get(componentName)!;
  }

  // Check if circuit should reset
  private shouldReset(): boolean {
    const timeSinceReset = Date.now() - this.state.lastReset;
    return timeSinceReset > this.config.resetTimeMs;
  }

  // Reset circuit state
  private reset(): void {
    this.state = {
      renderCount: 0,
      errorCount: 0,
      lastReset: Date.now(),
      isOpen: false,
    };
    console.log(`🔄 Circuit breaker reset for ${this.config.componentName}`);
  }

  // Record a render attempt
  recordRender(): boolean {
    if (this.shouldReset()) {
      this.reset();
    }

    this.state.renderCount++;

    if (this.state.renderCount > this.config.maxRenders) {
      this.state.isOpen = true;
      console.warn(
        `⚠️ Circuit breaker GRACEFULLY DEGRADED for ${this.config.componentName} - Renders: ${this.state.renderCount}`,
      );
      return false; // Don't throw, just return false
    }

    if (this.state.renderCount > this.config.maxRenders * 0.8) {
      console.warn(
        `⚠️ Circuit breaker WARNING for ${this.config.componentName} - Renders: ${this.state.renderCount}/${this.config.maxRenders}`,
      );
    }

    return true;
  }

  // Record an error
  recordError(error: Error): boolean {
    if (this.shouldReset()) {
      this.reset();
    }

    this.state.errorCount++;
    this.state.lastError = error;

    if (this.state.errorCount > this.config.maxErrors) {
      this.state.isOpen = true;
      console.warn(
        `⚠️ Circuit breaker GRACEFULLY DEGRADED for ${this.config.componentName} - Errors: ${this.state.errorCount}`,
      );
      return false; // Don't throw, just return false
    }

    return true;
  }

  // Check if circuit is open
  isOpen(): boolean {
    if (this.shouldReset()) {
      this.reset();
    }
    return this.state.isOpen;
  }

  // Get current state for debugging
  getState(): CircuitState & CircuitBreakerConfig {
    return { ...this.state, ...this.config };
  }
}

// React Hook for circuit breaker
import { useRef, useEffect } from "react";

export function useCircuitBreaker(
  componentName: string,
  config?: Partial<CircuitBreakerConfig>,
) {
  const circuitBreaker = useRef<DivineCircuitBreaker>();
  const renderCountRef = useRef(0);

  // Initialize circuit breaker
  useEffect(() => {
    circuitBreaker.current = DivineCircuitBreaker.getInstance(
      componentName,
      config,
    );
  }, [componentName]);

  // Record render on every call
  renderCountRef.current++;

  const canRender = circuitBreaker.current?.recordRender() ?? true;

  const recordError = (error: Error) => {
    return circuitBreaker.current?.recordError(error) ?? true;
  };

  const isOpen = circuitBreaker.current?.isOpen() ?? false;

  const getState = () => circuitBreaker.current?.getState();

  return {
    canRender,
    isOpen,
    renderCount: renderCountRef.current,
    recordError,
    getState,
  };
}

// Fallback component for when circuit is open
export function CircuitBreakerFallback({
  componentName,
  error,
}: {
  componentName: string;
  error?: Error;
}) {
  return (
    <div className="min-h-[100px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
      <div className="text-center p-4">
        <div className="text-purple-600 font-semibold mb-2">
          🛡️ Divine Protection Active
        </div>
        <div className="text-sm text-gray-600 mb-2">
          {componentName} is temporarily paused
        </div>
        <div className="text-xs text-gray-500">
          "For I have created him for my glory" - Isaiah 43:7
        </div>
        {error && (
          <details className="mt-2 text-xs">
            <summary className="cursor-pointer text-gray-400">
              Error Details
            </summary>
            <pre className="mt-1 text-left bg-white p-2 rounded text-red-600 overflow-auto max-h-20">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default DivineCircuitBreaker;
