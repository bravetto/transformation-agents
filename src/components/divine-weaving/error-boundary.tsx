"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class SacredPatternErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("SacredPattern Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">
              Sacred Connection Interrupted
            </h2>
            <p className="text-gray-300 max-w-md mx-auto">
              The divine pattern is temporarily obscured. Rest assured, the
              sacred connections remain unbroken in spirit.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
