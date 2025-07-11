"use client";

import { Component, ReactNode } from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";

interface Props {
  children: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class UnificationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      `Divine Unification Error in ${this.props.componentName || "Component"}:`,
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="text-6xl mb-4">🕊️</div>
              <h2 className="text-3xl font-bold text-amber-300 mb-4">
                Divine Connection Momentarily Paused
              </h2>
            </div>

            <p className="text-amber-100 text-lg mb-6">
              "Even in moments of disconnection, the sacred bond remains
              unbroken. The table is always set, the bread always fresh, the
              love always flowing."
            </p>

            <div className="space-y-2 text-amber-200">
              <p>Take a breath.</p>
              <p>Center yourself.</p>
              <p>The divine awaits your return.</p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-full hover:shadow-lg transition-all duration-300"
            >
              Rejoin the Sacred Circle
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for easy wrapping
function withUnificationErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string,
) {
  return function WrappedComponent(props: P) {
    return (
      <UnificationErrorBoundary componentName={componentName}>
        <Component {...props} />
      </UnificationErrorBoundary>
    );
  };
}

export default withErrorBoundary(withUnificationErrorBoundary, {
  componentName: "withUnificationErrorBoundary",
  id: "withunificationerrorboundary",
});
