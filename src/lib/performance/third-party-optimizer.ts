/**
 * 🚀 THIRD-PARTY SCRIPT OPTIMIZATION SYSTEM
 * Intelligent loading and performance optimization for external scripts
 */

interface ThirdPartyScript {
  id: string;
  src: string;
  strategy: "critical" | "important" | "low-priority" | "idle";
  condition?: () => boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

interface OptimizationConfig {
  enableResourceHints: boolean;
  enableDeferredLoading: boolean;
  enableIdleLoading: boolean;
  performanceThreshold: number; // FCP threshold in ms
}

class ThirdPartyOptimizer {
  private loadedScripts = new Set<string>();
  private config: OptimizationConfig;
  private performanceMetrics: PerformanceObserver | null = null;

  constructor(
    config: OptimizationConfig = {
      enableResourceHints: true,
      enableDeferredLoading: true,
      enableIdleLoading: true,
      performanceThreshold: 1500,
    },
  ) {
    this.config = config;
    this.initializePerformanceMonitoring();
  }

  private initializePerformanceMonitoring(): void {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    try {
      this.performanceMetrics = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (
            entry.entryType === "paint" &&
            entry.name === "first-contentful-paint"
          ) {
            const fcp = entry.startTime;
            if (fcp > this.config.performanceThreshold) {
              // Delay non-critical scripts if FCP is slow
              this.adjustLoadingStrategy("performance-adaptive");
            }
          }
        });
      });

      this.performanceMetrics.observe({
        entryTypes: ["paint", "largest-contentful-paint"],
      });
    } catch (error) {
      console.warn("Performance monitoring setup failed:", error);
    }
  }

  /**
   * Load script with optimized strategy
   */
  async loadScript(script: ThirdPartyScript): Promise<void> {
    if (this.loadedScripts.has(script.id)) {
      return;
    }

    // Check condition if provided
    if (script.condition && !script.condition()) {
      return;
    }

    try {
      switch (script.strategy) {
        case "critical":
          await this.loadCriticalScript(script);
          break;
        case "important":
          await this.loadImportantScript(script);
          break;
        case "low-priority":
          await this.loadLowPriorityScript(script);
          break;
        case "idle":
          await this.loadIdleScript(script);
          break;
      }

      this.loadedScripts.add(script.id);
    } catch (error) {
      console.error(`Failed to load script ${script.id}:`, error);
      if (script.onError) {
        script.onError(error as Error);
      }
    }
  }

  private async loadCriticalScript(script: ThirdPartyScript): Promise<void> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = script.src;
      scriptElement.async = true;
      scriptElement.onload = () => {
        if (script.onLoad) script.onLoad();
        resolve();
      };
      scriptElement.onerror = () =>
        reject(new Error(`Failed to load ${script.src}`));

      // Add to head for immediate loading
      document.head.appendChild(scriptElement);
    });
  }

  private async loadImportantScript(script: ThirdPartyScript): Promise<void> {
    // Wait for DOMContentLoaded or immediate if already loaded
    if (document.readyState === "loading") {
      await new Promise((resolve) =>
        document.addEventListener("DOMContentLoaded", resolve),
      );
    }

    return this.loadCriticalScript(script);
  }

  private async loadLowPriorityScript(script: ThirdPartyScript): Promise<void> {
    // Wait for load event
    if (document.readyState !== "complete") {
      await new Promise((resolve) => window.addEventListener("load", resolve));
    }

    // Additional delay for low priority
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return this.loadCriticalScript(script);
  }

  private async loadIdleScript(script: ThirdPartyScript): Promise<void> {
    // Use requestIdleCallback if available
    if ("requestIdleCallback" in window) {
      await new Promise((resolve) => {
        (window as any).requestIdleCallback(resolve, { timeout: 5000 });
      });
    } else {
      // Fallback: wait for load + additional time
      if (document.readyState !== "complete") {
        await new Promise((resolve) =>
          window.addEventListener("load", resolve),
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return this.loadCriticalScript(script);
  }

  /**
   * Preload resource with hints
   */
  preloadResource(href: string, as: string, crossorigin?: string): void {
    if (!this.config.enableResourceHints) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    if (crossorigin) link.crossOrigin = crossorigin;

    document.head.appendChild(link);
  }

  /**
   * Prefetch resource for future use
   */
  prefetchResource(href: string): void {
    if (!this.config.enableResourceHints) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;

    document.head.appendChild(link);
  }

  /**
   * Adjust loading strategy based on performance
   */
  private adjustLoadingStrategy(reason: string): void {
    console.log(`Adjusting third-party loading strategy: ${reason}`);
    // Could implement adaptive loading here
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    if (this.performanceMetrics) {
      this.performanceMetrics.disconnect();
    }
  }
}

// Pre-configured scripts for The Bridge Project
export const BRIDGE_PROJECT_SCRIPTS: ThirdPartyScript[] = [
  {
    id: "google-analytics",
    src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX",
    strategy: "low-priority",
    condition: () => !window.location.hostname.includes("localhost"),
  },
  {
    id: "vercel-analytics",
    src: "/_vercel/insights/script.js",
    strategy: "idle",
  },
  {
    id: "particles-engine",
    src: "/_next/static/chunks/particles.js",
    strategy: "important",
    condition: () =>
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  },
];

// Global instance
export const thirdPartyOptimizer = new ThirdPartyOptimizer();

// Hook for React components
export function useThirdPartyOptimizer() {
  return {
    loadScript: thirdPartyOptimizer.loadScript.bind(thirdPartyOptimizer),
    preloadResource:
      thirdPartyOptimizer.preloadResource.bind(thirdPartyOptimizer),
    prefetchResource:
      thirdPartyOptimizer.prefetchResource.bind(thirdPartyOptimizer),
  };
}

// Utility for loading scripts with retry logic
export async function loadScriptWithRetry(
  script: ThirdPartyScript,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<void> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      await thirdPartyOptimizer.loadScript(script);
      return;
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
}

export default ThirdPartyOptimizer;
