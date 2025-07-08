"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { unifiedArchitecture } from "@/lib/unified-architecture";
import type { DivineRole } from "@/lib/design-system";

interface UnifiedErrorBoundaryProps {
  children: ReactNode;
  componentName: string;
  role: DivineRole;
  fallback?: ReactNode;
}

interface UnifiedErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isRecovering: boolean;
}

class UnifiedErrorBoundary extends Component<
  UnifiedErrorBoundaryProps,
  UnifiedErrorBoundaryState
> {
  constructor(props: UnifiedErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isRecovering: false,
    };

    // Register component with unified architecture
    unifiedArchitecture.registerComponent(props.componentName, props.role);

    // Register recovery strategy
    unifiedArchitecture.registerRecoveryStrategy(
      props.componentName,
      async () => {
        this.setState({ isRecovering: true });
        // Attempt recovery
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.setState({
          hasError: false,
          error: null,
          errorInfo: null,
          isRecovering: false,
        });
      },
    );

    // Register health check
    unifiedArchitecture.registerHealthCheck(
      props.componentName,
      async () => !this.state.hasError,
    );
  }

  static getDerivedStateFromError(error: Error): UnifiedErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
      isRecovering: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error through unified architecture
    unifiedArchitecture.log("error", error.message, {
      component: this.props.componentName,
      role: this.props.role,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Handle error through unified architecture
    unifiedArchitecture.handleError(error, {
      component: this.props.componentName,
      role: this.props.role,
    });
  }

  private handleRetry = async () => {
    try {
      await unifiedArchitecture.recoverSystem(this.props.componentName);
    } catch (error) {
      unifiedArchitecture.log("error", "Recovery failed", {
        component: this.props.componentName,
        error,
      });
    }
  };

  render() {
    const { hasError, error, isRecovering } = this.state;
    const { children, componentName, role, fallback } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Get protection system
      const protection = unifiedArchitecture.getProtectionSystem(role);
      const protections = protection.getAllProtections();

      return (
        <div
          className={cn(
            "relative rounded-lg p-6 bg-white dark:bg-gray-900",
            "border border-red-200 dark:border-red-800",
            protections.weak.shield,
          )}
        >
          {/* Error Icon */}
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-red-500">
              Component Error
            </h3>
          </div>

          {/* Error Message */}
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-400">
              {error?.message || "An unexpected error occurred"}
            </p>
          </div>

          {/* Recovery Button */}
          <button
            onClick={this.handleRetry}
            disabled={isRecovering}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md",
              "bg-red-500 hover:bg-red-600 text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors duration-200",
              protections.bold.animation,
            )}
          >
            <RefreshCw
              className={cn("w-4 h-4", isRecovering && "animate-spin")}
            />
            {isRecovering ? "Recovering..." : "Try Again"}
          </button>

          {/* Protection Layer */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none",
              protections.innocent.shield,
              protections.innocent.animation,
            )}
          />
        </div>
      );
    }

    return children;
  }
}

// Higher-order component for easy wrapping
export function withUnifiedErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    componentName: string;
    role: DivineRole;
    fallback?: ReactNode;
  },
) {
  return function WithUnifiedErrorBoundary(props: P) {
    return (
      <UnifiedErrorBoundary {...options}>
        <WrappedComponent {...props} />
      </UnifiedErrorBoundary>
    );
  };
}
