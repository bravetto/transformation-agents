"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PeopleContent from '../people-content';

/**
 * This page demonstrates the loading states by simulating
 * a 2-second delay and optionally an error state
 */
export default function LoadingTestPage() {
  const [simulate, setSimulate] = useState({
    loading: true,
    delay: 2000,
    error: false
  });
  
  // Apply the query parameters to control simulation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const delay = params.get('delay');
    const error = params.get('error');
    
    setSimulate({
      loading: true,
      delay: delay ? parseInt(delay) : 2000,
      error: error === 'true'
    });
  }, []);
  
  return (
    <>
      {/* Simulation controls */}
      <div className="bg-gentle-charcoal/90 backdrop-blur-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap gap-4 items-center">
          <h2 className="text-white font-semibold mr-auto">Loading States Demo</h2>
          
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">Delay (ms):</label>
            <input 
              type="number" 
              value={simulate.delay}
              onChange={(e) => setSimulate(prev => ({ ...prev, delay: parseInt(e.target.value) }))}
              className="w-20 p-1 rounded text-sm"
              min="0"
              max="10000"
              step="500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">Simulate Error:</label>
            <input 
              type="checkbox" 
              checked={simulate.error}
              onChange={(e) => setSimulate(prev => ({ ...prev, error: e.target.checked }))}
              className="w-4 h-4"
            />
          </div>
          
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('delay', simulate.delay.toString());
              url.searchParams.set('error', simulate.error.toString());
              window.location.href = url.toString();
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors ease-divine"
          >
            Apply & Reload
          </button>
          
          <Link 
            href="/people"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors ease-divine"
          >
            Back to People
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <PeopleContent 
        // Pass simulation parameters to PeopleContent
        simulationConfig={{
          loadingDelay: simulate.delay,
          simulateError: simulate.error
        }}
      />
    </>
  );
} 