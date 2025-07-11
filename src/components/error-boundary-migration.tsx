"use client";

/**
 * Error Boundary Migration Helpers
 * This file provides backward compatibility for components using the old error boundary implementations
 */

import React from "react";
import {
  DivineErrorBoundary,
  withDivineErrorBoundary,
} from "./ui/divine-error-boundary";
import type { DivineRole } from "@/lib/design-system";

/**
 * Re-export the new error boundary components for backward compatibility
 */
export { DivineErrorBoundary, withDivineErrorBoundary };

/**
 * Compatibility export for the old ErrorBoundary class
 * This is a direct re-export of DivineErrorBoundary to maintain backward compatibility
 */
export const ErrorBoundary = DivineErrorBoundary;

/**
 * Type for error boundary options
 */
export interface ErrorBoundaryOptions {
  componentName?: string;
  fallback?: React.ReactNode;
  id?: string;
  role?: DivineRole;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Compatibility version of the withErrorBoundary HOC
 * This redirects to the new withDivineErrorBoundary HOC
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: ErrorBoundaryOptions = {},
): React.ComponentType<P> {
  // Convert old options format to new format
  const newOptions = {
    componentName: options.componentName || "UnnamedComponent",
    role: options.role,
    fallback: options.fallback,
  };

  return withDivineErrorBoundary(Component, newOptions);
}

/**
 * Compatibility version of the ErrorBoundaryWrapper component
 */
export function ErrorBoundaryWrapper({
  children,
  componentName,
  fallback,
  id,
  role,
  onError,
}: React.PropsWithChildren<ErrorBoundaryOptions>) {
  return (
    <DivineErrorBoundary
      componentName={componentName || "UnnamedComponent"}
      fallback={fallback}
      role={role || "default"}
    >
      {children}
    </DivineErrorBoundary>
  );
}
