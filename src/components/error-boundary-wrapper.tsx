'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { reportError } from '@/lib/analytics';

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  id?: string;
}

/**
 * Wrapper for ErrorBoundary that includes analytics reporting
 * Use this component to wrap sections of your app that should be isolated from errors
 */
export default function ErrorBoundaryWrapper({
  children,
  fallback,
  id = 'unknown'
}: ErrorBoundaryWrapperProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Report to analytics
    reportError(error, {
      componentStack: errorInfo.componentStack,
      boundaryId: id,
      location: typeof window !== 'undefined' ? window.location.href : null,
    });
  };
  
  return (
    <ErrorBoundary
      onError={handleError}
      fallback={fallback}
    >
      {children}
    </ErrorBoundary>
  );
} 