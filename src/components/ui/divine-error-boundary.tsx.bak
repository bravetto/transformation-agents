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
}

interface DivineErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class DivineErrorBoundary extends Component<
  DivineErrorBoundaryProps,
  DivineErrorBoundaryState
> {
  constructor(props: DivineErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): DivineErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { componentName, role } = this.props;

    // Log error
    console.error(`[${componentName}] Error:`, {
      error,
      errorInfo,
      componentName,
      role,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-lg font-semibold text-red-800">
              {this.props.componentName} Error
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

// Higher-order component for wrapping components with divine error boundary
export function withDivineErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    componentName: string;
    role?: DivineRole; // Make role optional
    fallback?: ReactNode;
  },
): React.FC<P> {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <DivineErrorBoundary
      componentName={options.componentName}
      role={options.role || "default"} // Provide default value
      fallback={options.fallback}
    >
      <Component {...props} />
    </DivineErrorBoundary>
  );

  WithErrorBoundary.displayName = `WithDivineErrorBoundary(${options.componentName})`;

  return WithErrorBoundary;
}

export default DivineErrorBoundary;
