'use client';

import React from 'react';
import { Button } from '@/components/ui';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  componentName?: string;
}

/**
 * Reusable error fallback component for error boundaries
 * Shows a user-friendly error message with reset option
 */
export default function ErrorFallback({
  error,
  resetErrorBoundary,
  componentName = 'component',
}: ErrorFallbackProps) {
  return (
    <div className="p-6 rounded-lg border border-red-300 bg-red-50 text-center max-w-full overflow-hidden">
      <h2 className="text-xl font-bold text-red-800 mb-3">
        Something went wrong
      </h2>
      
      {componentName && (
        <p className="text-sm text-red-600 mb-2">
          The {componentName} failed to load
        </p>
      )}
      
      {error?.message && (
        <div className="my-3 p-3 bg-white rounded border border-red-200 overflow-auto max-h-32">
          <p className="text-sm font-mono text-red-500 break-words">
            {error.message}
          </p>
        </div>
      )}
      
      {resetErrorBoundary && (
        <div className="mt-4">
          <Button 
            variant="primary" 
            onClick={resetErrorBoundary}
            size="sm"
          >
            Try again
          </Button>
        </div>
      )}
    </div>
  );
} 