"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { getAllPeople } from '@/data/people';
import InteractivePersonGrid from '@/components/people/interactive-person-grid';
import { withErrorBoundary } from '@/components/with-error-boundary';
import { GridLoadingSkeleton, LoadingMessages, ErrorWithRetry } from '@/components/people/LoadingStates';
import { PersonData } from '@/types/person';

// Divine particles component for the header
const DivineParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0.7, 1, 0.7],
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-1 h-1 rounded-full bg-hope-gold/50 blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
};

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
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="people-page-header relative mb-12 py-16 overflow-hidden"
        >
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="people-page-title font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-white via-hope-gold to-white bg-clip-text text-transparent drop-shadow-lg"
            >
              Transformation Agents
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="people-page-subtitle text-lg md:text-xl text-center max-w-3xl mx-auto text-white/90"
            >
              Meet the extraordinary individuals whose faith journeys are transforming lives and communities through authentic connection and divine purpose.
            </motion.p>
          </div>
          
          {/* Divine particles background */}
          <DivineParticles />
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