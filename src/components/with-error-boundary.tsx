"use client";

import { Component, ReactNode } from "react";
import { DivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { reportError } from "@/lib/analytics";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      `Error in ${this.props.componentName || "component"}:`,
      error,
      errorInfo,
    );
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-lg font-semibold text-red-800">
              {this.props.componentName
                ? `${this.props.componentName} Error`
                : "Component Error"}
            </h3>
            <p className="mt-2 text-sm text-red-600">
              {this.state.error?.message || "Something went wrong"}
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

interface WithErrorBoundaryOptions {
  componentName?: string;
  id?: string;
  fallback?: ReactNode;
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithErrorBoundaryOptions | string,
) {
  // Handle string case for backward compatibility
  const opts =
    typeof options === "string" ? { componentName: options } : options;

  const componentName =
    opts.componentName ||
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Component";
  const id = opts.id || componentName.toLowerCase().replace(/\s+/g, "-");

  function WithErrorBoundary(props: P) {
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
      // Log error to console
      console.error(`Error in ${componentName}:`, error, errorInfo);

      // Report to analytics
      reportError(error, {
        componentStack: errorInfo.componentStack,
        boundaryId: id,
        componentName,
        location: typeof window !== "undefined" ? window.location.href : null,
      });
    };

    return (
      <ErrorBoundary
        componentName={componentName}
        onError={handleError}
        fallback={opts.fallback}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  }

  WithErrorBoundary.displayName = `withErrorBoundary(${componentName})`;
  return WithErrorBoundary;
}

export function withUnifiedErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string,
  fallback?: ReactNode,
) {
  return function WithErrorBoundary(props: P) {
    return (
      <DivineErrorBoundary
        componentName={componentName || "Component"}
        role="default"
        fallback={fallback}
      >
        <WrappedComponent {...props} />
      </DivineErrorBoundary>
    );
  };
}

export default ErrorBoundary;
