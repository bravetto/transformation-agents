"use client";
"use client";

import React, { ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKey?: string | number;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // If resetKey changes, reset the error boundary
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.resetErrorBoundary();
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback UI if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="p-8 rounded-lg border border-red-300 bg-red-50 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            Something went wrong
          </h2>
          <p className="mb-4 text-red-600">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <div className="mt-4">
            <Button variant="primary" onClick={this.resetErrorBoundary}>
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component to wrap components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps: Omit<ErrorBoundaryProps, "children"> = {},
): React.ComponentType<P> {
  const WithErrorBoundary = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  // Set display name for the wrapped component
  const displayName = Component.displayName || Component.name || "Component";
  WithErrorBoundary.displayName = `WithErrorBoundary(${displayName})`;

  return WithErrorBoundary;
}
