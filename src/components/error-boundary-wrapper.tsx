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
      // Log error to console
      console.error("Error caught by ErrorBoundary:", error, errorInfo);

      // Report to analytics
      reportError(error, {
        componentStack: errorInfo.componentStack,
        boundaryId: id,
        location: typeof window !== "undefined" ? window.location.href : null,
      });
    },
    [id],
  );

  // Set up error handler for the component
  React.useEffect(() => {
    // Set up global error handler
    const errorHandler = (event: ErrorEvent) => {
      handleError(event.error, { componentStack: "" });
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
