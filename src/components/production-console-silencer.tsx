"use client";

import { useEffect } from "react";

/**
 * 🔇 PRODUCTION CONSOLE SILENCER - Zero Console Noise
 * Removes all console.log, console.warn for production builds
 * Only active in production - preserves development debugging
 */
export function ProductionConsoleSilencer() {
  useEffect(() => {
    // Only silence console in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Store original functions
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    // Silent overrides for production
    console.log = () => {};
    console.warn = () => {};
    console.info = () => {};

    // Keep console.error for critical debugging
    // console.error stays active for serious issues

    // Cleanup function to restore console if needed
    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.info = originalInfo;
    };
  }, []);

  return null; // This component renders nothing
}

/**
 * 🛡️ GLOBAL ERROR HANDLER
 * Catches and filters unhandled errors
 */
export function GlobalErrorHandler() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const handleGlobalError = (event: ErrorEvent) => {
      // Filter out non-critical errors in production
      const ignoredErrors = [
        "ResizeObserver loop limit exceeded",
        "Non-passive event listener",
        "Script error",
        "Loading CSS chunk",
        "Loading chunk",
        "ChunkLoadError",
      ];

      const shouldIgnore = ignoredErrors.some(
        (pattern) =>
          event.message?.includes(pattern) ||
          event.error?.message?.includes(pattern),
      );

      if (shouldIgnore) {
        event.preventDefault();
        return false;
      }

      // Log critical errors to analytics (if implemented)
      // analytics.track('production_error', {
      //   message: event.message,
      //   filename: event.filename,
      //   lineno: event.lineno,
      //   colno: event.colno
      // });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Filter out non-critical promise rejections
      const ignoredRejections = [
        "Failed to fetch",
        "Load failed",
        "NetworkError",
        "AbortError",
      ];

      const reason = event.reason?.toString() || "";
      const shouldIgnore = ignoredRejections.some((pattern) =>
        reason.includes(pattern),
      );

      if (shouldIgnore) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  return null;
}
