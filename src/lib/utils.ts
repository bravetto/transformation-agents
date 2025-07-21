import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DivineRole } from "./design-system";

/**
 * Combines class names with Tailwind-specific merging
 * Uses clsx for conditional classes and tailwind-merge for proper handling of Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with proper commas
 * @param num Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

/**
 * Format a date to a localized string
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string {
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/**
 * Get role-specific color classes for consistent styling
 * @param role Divine role
 * @returns Object with tailwind classes for various states
 */
export function getRoleColorClasses(role: DivineRole) {
  const roleColorMap = {
    lightworker: {
      primary: "text-amber-500",
      bg: "bg-amber-500",
      border: "border-amber-500",
      hover: "hover:bg-amber-600",
      ring: "ring-amber-400",
      gradient: "from-amber-500 via-orange-400 to-yellow-500",
    },
    messenger: {
      primary: "text-blue-500",
      bg: "bg-blue-500",
      border: "border-blue-500",
      hover: "hover:bg-blue-600",
      ring: "ring-blue-400",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
    },
    witness: {
      primary: "text-emerald-500",
      bg: "bg-emerald-500",
      border: "border-emerald-500",
      hover: "hover:bg-emerald-600",
      ring: "ring-emerald-400",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    },
    guardian: {
      primary: "text-purple-500",
      bg: "bg-purple-500",
      border: "border-purple-500",
      hover: "hover:bg-purple-600",
      ring: "ring-purple-400",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
    },
    default: {
      primary: "text-blue-500",
      bg: "bg-blue-500",
      border: "border-blue-500",
      hover: "hover:bg-blue-600",
      ring: "ring-blue-400",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
    },
  };

  return roleColorMap[role] || roleColorMap.default;
}

/**
 * Calculate reading time for content
 * @param content Text content to analyze
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Truncate text with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Detect if device is in low-power mode (heuristic)
 * Battery API is used if available, otherwise uses navigator.hardwareConcurrency
 * @returns Promise resolving to boolean indicating low power
 */
export async function detectLowPowerMode(): Promise<boolean> {
  // Check if Battery API is available
  if ("getBattery" in navigator) {
    try {
      const battery = await (navigator as any).getBattery();
      // Consider low power if battery is below 20% and not charging
      if (battery.level < 0.2 && !battery.charging) {
        return true;
      }
    } catch (e) {
      // API failed, fall back to CPU cores check
      console.warn("Battery API failed, using fallback detection");
    }
  }

  // Fallback: check hardware concurrency (CPU cores)
  // Devices with 2 or fewer cores are considered low power
  return navigator.hardwareConcurrency <= 2;
}

/**
 * Detect if device is likely to be low-performance
 * Uses a combination of hardware concurrency, memory, and user agent
 * @returns Promise resolving to boolean indicating low performance
 */
export async function detectLowPerformance(): Promise<boolean> {
  // Check if device is mobile via user agent (not perfect but a useful heuristic)
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  // Check CPU cores
  const hasLowCores = navigator.hardwareConcurrency <= 4;

  // Check device memory if available
  const hasLowMemory =
    "deviceMemory" in navigator && (navigator as any).deviceMemory <= 4;

  // Check if device is in low power mode
  const isLowPower = await detectLowPowerMode();

  // Device is considered low performance if it matches at least 2 criteria
  let lowPerformanceScore = 0;
  if (isMobile) lowPerformanceScore++;
  if (hasLowCores) lowPerformanceScore++;
  if (hasLowMemory) lowPerformanceScore++;
  if (isLowPower) lowPerformanceScore++;

  return lowPerformanceScore >= 2;
}

/**
 * Debounce function to limit execution rate
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to ensure it's not called more than once in a specified period
 * @param func Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>): void {
    const now = Date.now();

    if (now - lastCall < limit) {
      // If we're in the limit period, queue the call for later
      if (timeout !== null) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(
        () => {
          lastCall = now;
          func(...args);
        },
        limit - (now - lastCall),
      );
    } else {
      // If we're outside the limit period, call immediately
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Cache function results for improved performance
 * @param func Function to memoize
 * @param keyFn Optional function to generate cache key from arguments
 * @returns Memoized function with the same signature
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  keyFn?: (...args: Parameters<T>) => string,
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Safely get performance memory information with cross-browser compatibility
 * @returns Memory info object or null if not available
 */
export function getPerformanceMemory(): {
  used: number;
  total: number;
  limit: number;
} | null {
  // Check if we're in browser environment
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return null;
  }

  // Check if performance.memory is available (Chrome/Edge only)
  if (
    performance &&
    typeof (performance as any).memory === "object" &&
    (performance as any).memory !== null
  ) {
    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize || 0,
      total: memory.totalJSHeapSize || 0,
      limit: memory.jsHeapSizeLimit || 0,
    };
  }

  return null;
}

/**
 * Get device performance tier based on hardware capabilities
 * @returns 'low', 'medium', or 'high'
 */
export async function getDevicePerformanceTier(): Promise<
  "low" | "medium" | "high"
> {
  // Check if running in browser environment
  if (typeof window === "undefined") {
    return "medium"; // Default for SSR
  }

  try {
    // Check CPU cores
    const cores = navigator.hardwareConcurrency || 2;

    // Check memory (if available)
    const memory =
      "deviceMemory" in navigator ? (navigator as any).deviceMemory : 4;

    // Check if low power mode
    const isLowPower = await detectLowPowerMode();

    // Determine performance tier
    if (cores >= 8 && memory >= 8 && !isLowPower) {
      return "high";
    } else if (cores >= 4 && memory >= 4 && !isLowPower) {
      return "medium";
    } else {
      return "low";
    }
  } catch (e) {
    console.warn("Error detecting device performance:", e);
    return "medium"; // Default to medium if detection fails
  }
}

/**
 * Prefetch critical resources based on user interactions
 * @param paths Array of paths to prefetch
 */
export function prefetchResources(paths: string[]): void {
  if (typeof window === "undefined") return;

  // Use requestIdleCallback if available, otherwise setTimeout
  const scheduleWork =
    "requestIdleCallback" in window
      ? (window as any).requestIdleCallback
      : (callback: () => void) => setTimeout(callback, 1);

  scheduleWork(() => {
    paths.forEach((path) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = path;
      link.as = path.endsWith(".js")
        ? "script"
        : path.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)
          ? "image"
          : "fetch";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  });
}
