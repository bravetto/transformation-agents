/**
 * UNIFIED ERROR BOUNDARY - Single Source of Truth
 * Replaces all error boundary implementations with battle-tested error handling
 */
'use client';

import React, { Component, ReactNode } from 'react';
import { logger } from '@/lib/unified-logger';

interface ErrorBoundaryProps {
  children: ReactNode;
  componentName?: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { componentName, onError } = this.props;
    
    // Log error using unified logger
    logger.error(`Error in ${componentName || 'component'}`, {
      component: componentName,
      action: 'component_error',
      metadata: {
        message: error.message,
        name: error.name,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      }
    });

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
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
                : 'Something went wrong'
              }
            </h3>
            <p className="mt-2 text-sm text-red-600">
              Please refresh the page or contact support if the problem persists.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// HOC wrapper for easy component wrapping
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary componentName={componentName} fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

export default ErrorBoundary; 