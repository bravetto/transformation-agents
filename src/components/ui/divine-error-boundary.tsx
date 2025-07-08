"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { reportError } from "@/lib/analytics";
import { Button } from "./button";
import type { DivineRole } from "@/lib/design-system";

export type { DivineRole };

// Role-based styling configuration
const roleStyleConfig: Record<
  DivineRole,
  {
    bgClass: string;
    borderClass: string;
    textClass: string;
    gradientClass: string;
    iconClass: string;
    buttonClass: string;
  }
> = {
  lightworker: {
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-200 dark:border-amber-800/50",
    textClass: "text-amber-800 dark:text-amber-300",
    gradientClass: "from-amber-500 via-orange-500 to-yellow-500",
    iconClass: "text-amber-500",
    buttonClass:
      "bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-800/50 dark:hover:bg-amber-700/50 dark:text-amber-200",
  },
  messenger: {
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-200 dark:border-blue-800/50",
    textClass: "text-blue-800 dark:text-blue-300",
    gradientClass: "from-blue-500 via-indigo-500 to-purple-500",
    iconClass: "text-blue-500",
    buttonClass:
      "bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-800/50 dark:hover:bg-blue-700/50 dark:text-blue-200",
  },
  witness: {
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderClass: "border-emerald-200 dark:border-emerald-800/50",
    textClass: "text-emerald-800 dark:text-emerald-300",
    gradientClass: "from-emerald-500 via-teal-500 to-cyan-500",
    iconClass: "text-emerald-500",
    buttonClass:
      "bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-800/50 dark:hover:bg-emerald-700/50 dark:text-emerald-200",
  },
  guardian: {
    bgClass: "bg-purple-50 dark:bg-purple-950/30",
    borderClass: "border-purple-200 dark:border-purple-800/50",
    textClass: "text-purple-800 dark:text-purple-300",
    gradientClass: "from-purple-500 via-pink-500 to-rose-500",
    iconClass: "text-purple-500",
    buttonClass:
      "bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-800/50 dark:hover:bg-purple-700/50 dark:text-purple-200",
  },
  default: {
    bgClass: "bg-red-50 dark:bg-red-950/30",
    borderClass: "border-red-200 dark:border-red-800/50",
    textClass: "text-red-800 dark:text-red-300",
    gradientClass: "from-red-500 to-rose-600",
    iconClass: "text-red-500",
    buttonClass:
      "bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-800/50 dark:hover:bg-red-700/50 dark:text-red-200",
  },
};

interface DivineErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface DivineErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
  componentName?: string;
  role?: DivineRole;
  className?: string;
  resetKey?: string | number;
  id?: string;
}

export class DivineErrorBoundary extends Component<
  DivineErrorBoundaryProps,
  DivineErrorBoundaryState
> {
  constructor(props: DivineErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): DivineErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Report error to analytics
    reportError(error, {
      componentName: this.props.componentName,
      errorInfo,
      id: this.props.id,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  resetErrorBoundary = (): void => {
    if (this.props.onReset) {
      this.props.onReset();
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  componentDidUpdate(prevProps: DivineErrorBoundaryProps): void {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.resetErrorBoundary();
    }
  }

  render() {
    const { hasError, error } = this.state;
    const {
      children,
      fallback,
      role = "default",
      className,
      componentName,
    } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      const styles = roleStyleConfig[role];

      return (
        <div
          className={cn(
            "relative rounded-lg border p-4",
            styles.bgClass,
            styles.borderClass,
            className,
          )}
        >
          {/* Background gradient */}
          <div
            className={cn(
              "absolute inset-0 opacity-5 bg-gradient-to-br rounded-lg",
              styles.gradientClass,
            )}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className={cn("p-2 rounded-full", styles.bgClass)}>
                <AlertTriangle className={cn("w-5 h-5", styles.iconClass)} />
              </div>

              <div className="flex-1">
                <h3
                  className={cn("text-lg font-semibold mb-2", styles.textClass)}
                >
                  {componentName
                    ? `${componentName} encountered an error`
                    : "An error occurred"}
                </h3>

                <div className={cn("text-sm mb-4", styles.textClass)}>
                  {error?.message || "Something went wrong. Please try again."}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={this.resetErrorBoundary}
                    className={styles.buttonClass}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

// Higher-order component for wrapping components with divine error boundary
export function withDivineErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<DivineErrorBoundaryProps, "children"> | DivineRole,
): React.FC<P> {
  const displayName = Component.displayName || Component.name || "Component";

  let errorBoundaryProps: Omit<DivineErrorBoundaryProps, "children"> = {};

  if (typeof options === "string") {
    errorBoundaryProps = {
      role: options as DivineRole,
      componentName: displayName,
      id: displayName.toLowerCase().replace(/\s+/g, "-"),
    };
  } else if (options) {
    errorBoundaryProps = {
      ...options,
      componentName: options.componentName || displayName,
    };
  } else {
    errorBoundaryProps = {
      componentName: displayName,
      id: displayName.toLowerCase().replace(/\s+/g, "-"),
    };
  }

  const WithErrorBoundary: React.FC<P> = (props) => (
    <DivineErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </DivineErrorBoundary>
  );

  WithErrorBoundary.displayName = `WithDivineErrorBoundary(${displayName})`;

  return WithErrorBoundary;
}
