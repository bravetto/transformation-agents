"use client";

import React from "react";
import { DivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { reportError } from "@/lib/analytics";

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  id?: string;
}

/**
 * Wrapper for ErrorBoundary that includes analytics reporting
 * Use this component to wrap sections of your app that should be isolated from errors
 */
export default function ErrorBoundaryWrapper({
  children,
  fallback,
  id = "unknown",
}: ErrorBoundaryWrapperProps) {
  const handleError = React.useCallback(
    (error: Error, errorInfo: React.ErrorInfo) => {
      // Prevent infinite loops by checking error type
      if (
        error.message?.includes("ErrorBoundary") ||
        error.message?.includes("Cannot read properties of undefined")
      ) {
        return; // Silent fail to prevent loops
      }

      // Safe error logging
      try {
        console.error("Error caught by ErrorBoundary:", {
          message: error.message,
          name: error.name,
          boundaryId: id,
        });

        // Only report to analytics if function exists and error is meaningful
        if (typeof reportError === "function" && error.message && error.name) {
          reportError(error, {
            componentStack: errorInfo.componentStack,
            boundaryId: id,
            location:
              typeof window !== "undefined" ? window.location.href : null,
          });
        }
      } catch (reportingError) {
        // Fail silently if reporting fails
        if (process.env.NODE_ENV === "development") {
          console.warn("Failed to report error:", reportingError);
        }
      }
    },
    [id],
  );

  // Set up error handler for the component
  React.useEffect(() => {
    // Only set up global error handler in browser environment
    if (typeof window === "undefined") return;

    // Set up global error handler
    const errorHandler = (event: ErrorEvent) => {
      // Prevent handling of error boundary errors
      if (event.error?.message?.includes("ErrorBoundary")) {
        return;
      }

      if (event.error && typeof event.error === "object") {
        handleError(event.error, { componentStack: "" });
      }
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, [handleError]);

  return (
    <DivineErrorBoundary
      componentName={`ErrorBoundary-${id}`}
      role="guardian"
      fallback={fallback}
    >
      {children}
    </DivineErrorBoundary>
  );
}
