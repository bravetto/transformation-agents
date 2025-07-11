"use client";

import { Component, ReactNode } from "react";
import type { DivineRole } from "@/lib/design-system";
import { withSafeUI } from "./with-safe-ui";

interface UnifiedErrorBoundaryProps {
  children: ReactNode;
  componentName: string;
  role: DivineRole;
  fallback?: ReactNode;
}

interface UnifiedErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class UnifiedErrorBoundaryBase extends Component<
  UnifiedErrorBoundaryProps,
  UnifiedErrorBoundaryState
> {
  constructor(props: UnifiedErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): UnifiedErrorBoundaryState {
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

// Higher-order component for wrapping components with unified error boundary
function withUnifiedErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    componentName: string;
    role?: DivineRole; // Make role optional
    fallback?: ReactNode;
  },
): React.FC<P> {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <UnifiedErrorBoundaryBase
      componentName={options.componentName}
      role={options.role || "default"} // Provide default value
      fallback={options.fallback}
    >
      <Component {...props} />
    </UnifiedErrorBoundaryBase>
  );

  WithErrorBoundary.displayName = `WithUnifiedErrorBoundary(${options.componentName})`;

  return WithErrorBoundary;
}

export default UnifiedErrorBoundaryBase;

export default withSafeUI(withUnifiedErrorBoundary, {
  componentName: "withUnifiedErrorBoundary",
});
