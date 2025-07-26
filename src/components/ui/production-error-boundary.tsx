"use client";

import React, { Component, ReactNode } from "react";
import { logger } from "@/lib/logger";
import { apiSecurity } from "@/lib/production/api-security-hardening";

interface ProductionErrorBoundaryProps {
  children: ReactNode;
  componentName: string;
  fallback?: ReactNode;
  enableAnalytics?: boolean;
  showErrorDetails?: boolean;
}

interface ProductionErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorId?: string;
  retryCount: number;
}

/**
 * 🛡️ PRODUCTION-HARDENED ERROR BOUNDARY
 * Prevents information leakage while maintaining user experience
 */
export class ProductionErrorBoundary extends Component<
  ProductionErrorBoundaryProps,
  ProductionErrorBoundaryState
> {
  private maxRetries = 3;
  private retryTimeout?: NodeJS.Timeout;

  constructor(props: ProductionErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(
    error: Error,
  ): Partial<ProductionErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { componentName, enableAnalytics = true } = this.props;

    // Prevent infinite error loops
    if (
      error.message?.includes("ErrorBoundary") ||
      componentName?.includes("ErrorBoundary")
    ) {
      return;
    }

    // Create sanitized error info for logging
    const sanitizedError = this.sanitizeErrorForLogging(error, errorInfo);

    // Log error securely
    logger.error("Component Error Boundary Triggered", sanitizedError, {
      component: componentName,
      errorId: this.state.errorId,
      retryCount: this.state.retryCount,
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "server",
    });

    // Track analytics if enabled (non-blocking)
    if (enableAnalytics && typeof window !== "undefined") {
      this.trackErrorSafely(sanitizedError);
    }
  }

  /**
   * 🧹 SANITIZE ERROR FOR LOGGING
   */
  private sanitizeErrorForLogging(error: Error, errorInfo: React.ErrorInfo) {
    const isProduction = process.env.NODE_ENV === "production";

    return {
      name: error.name,
      message: isProduction
        ? this.sanitizeErrorMessage(error.message)
        : error.message,
      componentStack: isProduction ? "[REDACTED]" : errorInfo.componentStack,
      stack: isProduction ? "[REDACTED]" : error.stack,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 🔒 SANITIZE ERROR MESSAGE FOR PRODUCTION
   */
  private sanitizeErrorMessage(message: string): string {
    // Remove potentially sensitive information
    const sanitized = message
      .replace(/\/[^\/\s]*\/[^\/\s]*\/[^\/\s]*/g, "[PATH_REDACTED]")
      .replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, "[IP_REDACTED]")
      .replace(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        "[EMAIL_REDACTED]",
      )
      .replace(/\b[A-Fa-f0-9]{32,}\b/g, "[HASH_REDACTED]");

    // Generic error message for production
    if (process.env.NODE_ENV === "production") {
      return "A component error occurred";
    }

    return sanitized;
  }

  /**
   * 📊 TRACK ERROR SAFELY (NON-BLOCKING)
   */
  private async trackErrorSafely(sanitizedError: any) {
    try {
      // Only track in development or if specifically enabled
      if (process.env.NODE_ENV === "development") {
        await fetch("/api/analytics/user-journey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventType: "error_boundary_triggered",
            userType: "unknown",
            sessionId: `session_${Date.now()}`,
            timestamp: new Date().toISOString(),
            metadata: {
              componentName: this.props.componentName,
              errorId: this.state.errorId,
              retryCount: this.state.retryCount,
              // Only include safe error data
              errorName: sanitizedError.name,
            },
          }),
        });
      }
    } catch (analyticsError) {
      // Silent failure for analytics - never break the error boundary
    }
  }

  /**
   * 🔄 RETRY MECHANISM
   */
  private handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState((prevState) => ({
        hasError: false,
        error: undefined,
        retryCount: prevState.retryCount + 1,
      }));
    }
  };

  /**
   * 🎨 RENDER SAFE ERROR UI
   */
  private renderErrorUI() {
    const { componentName, fallback, showErrorDetails = false } = this.props;
    const { error, errorId, retryCount } = this.state;
    const canRetry = retryCount < this.maxRetries;

    // Custom fallback if provided
    if (fallback) {
      return fallback;
    }

    // Production-safe error display
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "This feature is temporarily unavailable"
        : error?.message || "An unexpected error occurred";

    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800">
              {componentName} Unavailable
            </h3>
            <p className="mt-1 text-sm text-red-700">{errorMessage}</p>

            {canRetry && (
              <div className="mt-3">
                <button
                  onClick={this.handleRetry}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {showErrorDetails &&
              process.env.NODE_ENV === "development" &&
              errorId && (
                <div className="mt-2 text-xs text-red-600">
                  Error ID: {errorId}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorUI();
    }

    return this.props.children;
  }
}

/**
 * 🚀 CONVENIENCE WRAPPER FOR PRODUCTION ERROR BOUNDARIES
 */
export function withProductionErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    componentName?: string;
    fallback?: ReactNode;
    enableAnalytics?: boolean;
  } = {},
) {
  const WrappedComponent = (props: P) => (
    <ProductionErrorBoundary
      componentName={
        options.componentName ||
        Component.displayName ||
        Component.name ||
        "Component"
      }
      fallback={options.fallback}
      enableAnalytics={options.enableAnalytics}
    >
      <Component {...props} />
    </ProductionErrorBoundary>
  );

  WrappedComponent.displayName = `withProductionErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
