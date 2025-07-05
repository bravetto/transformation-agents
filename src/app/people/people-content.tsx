"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllPeople } from '@/data/people';
import InteractivePersonGrid from '@/components/people/interactive-person-grid';
import { withErrorBoundary } from '@/components/with-error-boundary';
import { GridLoadingSkeleton, LoadingMessages, ErrorWithRetry } from '@/components/people/LoadingStates';
import { PersonData } from '@/types/person';

interface PeopleContentProps {
  simulationConfig?: {
    loadingDelay?: number;
    simulateError?: boolean;
  };
}

function PeopleContent({ simulationConfig }: PeopleContentProps) {
  const [people, setPeople] = useState<PersonData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // For testing - use the passed configuration or defaults
  const SIMULATE_LOADING_DELAY = simulationConfig?.loadingDelay || 0; 
  const SIMULATE_ERROR = simulationConfig?.simulateError || false;
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Calculate exponential backoff delay (min 1s, max 10s) for retries
    const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);
    const delay = retryCount === 0 ? SIMULATE_LOADING_DELAY : backoffDelay;
    
    const timer = setTimeout(() => {
      try {
        // Simulate error for testing if enabled
        if (SIMULATE_ERROR && retryCount === 0) {
          throw new Error("Simulated error for testing");
        }
        
        const loadedPeople = getAllPeople();
        setPeople(loadedPeople);
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error loading transformation agents';
        setError(errorMessage);
        setIsLoading(false);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [retryCount, SIMULATE_LOADING_DELAY, SIMULATE_ERROR, simulationConfig]);
  
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        {/* Enhanced Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="people-page-header mb-16 py-12"
        >
          <h1 className="people-page-title">
            Transformation Agents
          </h1>
          <p className="people-page-subtitle">
            Meet the extraordinary individuals whose faith journeys are transforming lives and communities through authentic connection and divine purpose.
          </p>
          <div className="mt-6 text-center">
            <Link href="/people/view-test" className="view-modes-link">
              <span>✨</span>
              <span>Try Different View Modes</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </motion.div>
        
        {/* Loading, Error or Content */}
        {isLoading ? (
          <div className="space-y-8">
            <LoadingMessages />
            <GridLoadingSkeleton count={8} showFeatured={true} />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-16">
            <ErrorWithRetry 
              message={error}
              onRetry={handleRetry}
            />
          </div>
        ) : people && (
          <Suspense fallback={<GridLoadingSkeleton count={8} showFeatured={true} />}>
            <InteractivePersonGrid 
              people={people} 
              simulateLoadingDelay={0} // Set to a value to test with delay
            />
          </Suspense>
        )}
      </div>
    </main>
  );
}

export default withErrorBoundary(PeopleContent, {
  componentName: 'PeopleContent',
  id: 'people-content'
}); 