"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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

// Sacred geometry pattern SVG
const SacredGeometryPattern = () => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
    >
      <g fill="currentColor">
        <circle cx="100" cy="100" r="20" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const x = 100 + Math.cos(angle * Math.PI / 180) * 40;
          const y = 100 + Math.sin(angle * Math.PI / 180) * 40;
          return <circle key={`ring1-${i}`} cx={x} cy={y} r="20" />;
        })}
        {[30, 90, 150, 210, 270, 330].map((angle, i) => {
          const x = 100 + Math.cos(angle * Math.PI / 180) * 40 * Math.sqrt(3) / 2;
          const y = 100 + Math.sin(angle * Math.PI / 180) * 40 * Math.sqrt(3) / 2;
          return <circle key={`ring2-${i}`} cx={x} cy={y} r="20" />;
        })}
      </g>
    </svg>
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 text-center"
            >
              <Link href="/people/view-test" 
                className="view-modes-link inline-flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              >
                <span className="mr-2 text-hope-gold">✨</span>
                <span>Try Different View Modes</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5" />
                </svg>
              </Link>
            </motion.div>
          </div>
          
          {/* Sacred geometry pattern background */}
          <SacredGeometryPattern />
          
          {/* Divine particles background */}
          <DivineParticles />
          
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-radial from-courage-blue/10 to-transparent rounded-3xl"></div>
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