"use client";

import { Component, ReactNode } from "react";
import type { DivineRole } from "@/lib/design-system";

// Re-export the DivineRole type for backward compatibility
export type { DivineRole } from "@/lib/design-system";

interface DivineErrorBoundaryProps {
  children: ReactNode;
  componentName: string;
  role: DivineRole;
  fallback?: ReactNode;
  // Analytics enhancement
  enableAnalytics?: boolean;
  sessionId?: string;
}

interface DivineErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorId?: string;
  retryCount: number;
}

// Analytics integration function (safe, non-blocking)
async function trackErrorSafely(errorData: {
  componentName: string;
  role: DivineRole;
  errorMessage: string;
  errorStack?: string;
  sessionId?: string;
  errorId: string;
  retryCount: number;
}) {
  try {
    // Only track if analytics are available and enabled
    if (typeof window === "undefined" || !errorData.sessionId) {
      return;
    }

    const response = await fetch("/api/analytics/user-journey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType: "error_boundary_triggered",
        userType: "unknown",
        sessionId: errorData.sessionId,
        timestamp: new Date().toISOString(),
        metadata: {
          componentName: errorData.componentName,
          role: errorData.role,
          errorMessage: errorData.errorMessage,
          errorId: errorData.errorId,
          retryCount: errorData.retryCount,
          deviceType: "desktop", // Could be enhanced with actual detection
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Analytics request failed: ${response.status}`);
    }
  } catch (analyticsError) {
    // Silent failure for analytics - never break the error boundary
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[ErrorBoundary] Analytics tracking failed:",
        analyticsError,
      );
    }
  }
}

export class DivineErrorBoundary extends Component<
  DivineErrorBoundaryProps,
  DivineErrorBoundaryState
> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: DivineErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(
    error: Error,
  ): Partial<DivineErrorBoundaryState> {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const {
      componentName,
      role,
      enableAnalytics = true,
      sessionId,
    } = this.props;

    // Prevent infinite loops by checking if this is an error boundary error
    if (
      error.message?.includes("ErrorBoundary") ||
      componentName?.includes("ErrorBoundary")
    ) {
      // Silent logging for error boundary errors to prevent loops
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[${componentName}] Boundary caught error - preventing loop:`,
          error.message,
        );
      }
      return;
    }

    // Safe logging that won't trigger error boundaries
    try {
      console.error(`[${componentName}] Error:`, {
        message: error.message,
        name: error.name,
        componentStack: errorInfo.componentStack,
        componentName,
        role,
        errorId: this.state.errorId,
        retryCount: this.state.retryCount,
      });
    } catch (loggingError) {
      // If even logging fails, fail silently in production
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to log error:", loggingError);
      }
    }

    // Analytics tracking (non-blocking)
    if (enableAnalytics && this.state.errorId) {
      trackErrorSafely({
        componentName,
        role,
        errorMessage: error.message,
        errorStack: error.stack,
        sessionId,
        errorId: this.state.errorId,
        retryCount: this.state.retryCount,
      });
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  handleRetry = () => {
    this.setState((prevState) => ({
      hasError: false,
      error: undefined,
      errorId: undefined,
      retryCount: prevState.retryCount + 1,
    }));
  };

  handleAutoRetry = () => {
    // Auto-retry after 3 seconds for better UX
    this.retryTimeoutId = setTimeout(() => {
      if (this.state.retryCount < 2) {
        // Max 2 auto-retries
        this.handleRetry();
      }
    }, 3000);
  };

  render() {
    if (this.state.hasError) {
      // Auto-retry for first two attempts
      if (this.state.retryCount < 2 && !this.retryTimeoutId) {
        this.handleAutoRetry();
      }

      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-lg font-semibold text-red-800">
              {this.props.componentName} Error
            </h3>
            <p className="mt-2 text-sm text-red-600">
              {this.state.error?.message || "Something went wrong"}
            </p>
            {this.state.retryCount >= 2 && (
              <div className="mt-4">
                <button
                  onClick={this.handleRetry}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Try Again
                </button>
                <p className="mt-2 text-xs text-red-500">
                  Error ID: {this.state.errorId} | Attempts:{" "}
                  {this.state.retryCount + 1}
                </p>
              </div>
            )}
            {this.state.retryCount < 2 && (
              <p className="mt-2 text-xs text-red-500">
                Retrying automatically... ({this.state.retryCount + 1}/3)
              </p>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with divine error boundary
function withDivineErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    componentName: string;
    role?: DivineRole; // Make role optional
    fallback?: ReactNode;
    enableAnalytics?: boolean;
    sessionId?: string;
  },
): React.FC<P> {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <DivineErrorBoundary
      componentName={options.componentName}
      role={options.role || "default"} // Provide default value
      fallback={options.fallback}
      enableAnalytics={options.enableAnalytics}
      sessionId={options.sessionId}
    >
      <Component {...props} />
    </DivineErrorBoundary>
  );

  WithErrorBoundary.displayName = `WithDivineErrorBoundary(${options.componentName})`;

  return WithErrorBoundary;
}

// Export the withDivineErrorBoundary function directly as named export
export { withDivineErrorBoundary };

// Export the function directly as default to avoid circular imports
export default withDivineErrorBoundary;
