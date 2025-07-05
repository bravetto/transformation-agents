'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import ErrorFallback from '@/components/error-fallback';
import { reportError } from '@/lib/analytics';

interface WithErrorBoundaryOptions {
  fallback?: React.ReactNode;
  componentName?: string;
  id?: string;
}

/**
 * Higher-order component to wrap client components with error boundaries
 * 
 * Usage:
 * ```
 * const SafeComponent = withErrorBoundary(YourComponent, {
 *   componentName: 'YourComponent',
 *   id: 'unique-id'
 * });
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): React.ComponentType<P> {
  const {
    fallback,
    componentName = Component.displayName || Component.name || 'Component',
    id = componentName.toLowerCase().replace(/\s+/g, '-')
  } = options;

  const WithErrorBoundaryComponent = (props: P) => {
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
      console.error(`Error in ${componentName}:`, error);
      
      // Report to analytics
      reportError(error, {
        componentStack: errorInfo.componentStack,
        componentName,
        boundaryId: id,
        location: typeof window !== 'undefined' ? window.location.href : null,
      });
    };

    return (
      <ErrorBoundary
        onError={handleError}
        fallback={
          fallback || (
            <ErrorFallback
              componentName={componentName}
              resetErrorBoundary={() => {
                // Force re-render the component
                window.location.reload();
              }}
            />
          )
        }
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  // Set display name for the wrapped component
  WithErrorBoundaryComponent.displayName = `WithErrorBoundary(${componentName})`;

  return WithErrorBoundaryComponent;
}

/**
 * Higher-order component with simplified API - just wraps with default error fallback
 * 
 * Usage:
 * ```
 * const SafeComponent = withSafeErrorHandling(YourComponent);
 * ```
 */
export function withSafeErrorHandling<P extends object>(Component: React.ComponentType<P>): React.ComponentType<P> {
  return withErrorBoundary(Component);
} 