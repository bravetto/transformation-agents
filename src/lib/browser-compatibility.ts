/**
 * 🛡️ BROWSER COMPATIBILITY UTILITY
 * Cross-browser safety checks and feature detection
 */

export interface BrowserCapabilities {
  supportsPerformanceMemory: boolean;
  supportsPerformanceObserver: boolean;
  supportsIntersectionObserver: boolean;
  supportsResizeObserver: boolean;
  supportsMutationObserver: boolean;
  supportsWebGL: boolean;
  supportsServiceWorker: boolean;
  supportsLocalStorage: boolean;
  supportsSessionStorage: boolean;
  supportsWebWorkers: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}

/**
 * Detect browser capabilities and features
 */
export function getBrowserCapabilities(): BrowserCapabilities {
  // Server-side rendering safety
  if (typeof window === "undefined") {
    return {
      supportsPerformanceMemory: false,
      supportsPerformanceObserver: false,
      supportsIntersectionObserver: false,
      supportsResizeObserver: false,
      supportsMutationObserver: false,
      supportsWebGL: false,
      supportsServiceWorker: false,
      supportsLocalStorage: false,
      supportsSessionStorage: false,
      supportsWebWorkers: false,
      isChrome: false,
      isFirefox: false,
      isSafari: false,
      isEdge: false,
      isMobile: false,
      isIOS: false,
      isAndroid: false,
    };
  }

  const userAgent = navigator.userAgent;

  return {
    // Performance APIs
    supportsPerformanceMemory:
      typeof performance !== "undefined" &&
      performance !== null &&
      typeof (performance as any).memory === "object" &&
      (performance as any).memory !== null,

    supportsPerformanceObserver: typeof PerformanceObserver !== "undefined",

    // Observer APIs
    supportsIntersectionObserver: typeof IntersectionObserver !== "undefined",
    supportsResizeObserver: typeof ResizeObserver !== "undefined",
    supportsMutationObserver: typeof MutationObserver !== "undefined",

    // Graphics and Workers
    supportsWebGL: (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        );
      } catch (e) {
        return false;
      }
    })(),

    supportsServiceWorker: "serviceWorker" in navigator,
    supportsWebWorkers: typeof Worker !== "undefined",

    // Storage
    supportsLocalStorage: (() => {
      try {
        return typeof localStorage !== "undefined" && localStorage !== null;
      } catch (e) {
        return false;
      }
    })(),

    supportsSessionStorage: (() => {
      try {
        return typeof sessionStorage !== "undefined" && sessionStorage !== null;
      } catch (e) {
        return false;
      }
    })(),

    // Browser detection
    isChrome: /Chrome/.test(userAgent) && !/Edge/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent),
    isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
    isEdge: /Edge/.test(userAgent) || /Edg/.test(userAgent),

    // Device detection
    isMobile:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      ),
    isIOS: /iPad|iPhone|iPod/.test(userAgent),
    isAndroid: /Android/.test(userAgent),
  };
}

/**
 * Safe feature detection with fallbacks
 */
export class SafeFeatureDetection {
  private static capabilities: BrowserCapabilities | null = null;

  static getCapabilities(): BrowserCapabilities {
    if (!this.capabilities) {
      this.capabilities = getBrowserCapabilities();
    }
    return this.capabilities;
  }

  static supportsFeature(feature: keyof BrowserCapabilities): boolean {
    return this.getCapabilities()[feature];
  }

  static executeIfSupported<T>(
    feature: keyof BrowserCapabilities,
    callback: () => T,
    fallback?: () => T,
  ): T | null {
    if (this.supportsFeature(feature)) {
      try {
        return callback();
      } catch (error) {
        console.warn(
          `Feature ${feature} failed despite being supported:`,
          error,
        );
        return fallback ? fallback() : null;
      }
    } else {
      return fallback ? fallback() : null;
    }
  }
}

/**
 * Cross-browser performance memory access
 */
export function safeGetPerformanceMemory() {
  return SafeFeatureDetection.executeIfSupported(
    "supportsPerformanceMemory",
    () => {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize || 0,
        total: memory.totalJSHeapSize || 0,
        limit: memory.jsHeapSizeLimit || 0,
      };
    },
    () => null,
  );
}

/**
 * Polyfill for performance.now() in older browsers
 */
export function safePerformanceNow(): number {
  if (typeof performance !== "undefined" && performance.now) {
    return performance.now();
  }
  return Date.now();
}

/**
 * Safe localStorage access
 */
export function safeLocalStorage() {
  return SafeFeatureDetection.executeIfSupported(
    "supportsLocalStorage",
    () => localStorage,
    () => null,
  );
}

/**
 * Safe sessionStorage access
 */
export function safeSessionStorage() {
  return SafeFeatureDetection.executeIfSupported(
    "supportsSessionStorage",
    () => sessionStorage,
    () => null,
  );
}

export default SafeFeatureDetection;
