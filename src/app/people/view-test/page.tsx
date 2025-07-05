"use client";

import { useState } from 'react';
import Link from 'next/link';
import { getAllPeople } from '@/data/people';
import InteractivePersonGrid from '@/components/people/interactive-person-grid';
import { ViewMode } from '@/components/people/ViewModeSelector';
import { motion } from 'framer-motion';

/**
 * This page demonstrates the different view modes
 */
export default function ViewModesTestPage() {
  const [selectedMode, setSelectedMode] = useState<ViewMode>('grid');
  const [testData, setTestData] = useState(() => getAllPeople());
  
  // View mode descriptions
  const modeDescriptions = {
    grid: {
      title: 'Grid View',
      description: 'Displays people in a beautiful grid layout, with featured cards for important individuals. Offers a visual overview of all transformation agents.',
      color: 'from-blue-500 to-purple-600'
    },
    list: {
      title: 'List View',
      description: 'Shows detailed information in a compact list format, including theme tags and testimony previews. Perfect for scanning through content-rich profiles.',
      color: 'from-green-500 to-blue-600'
    },
    timeline: {
      title: 'Timeline View',
      description: 'Organizes people chronologically by era, with size indicating impact level. Provides a historical perspective on transformation agents throughout time.',
      color: 'from-amber-500 to-red-600'
    }
  };
  
  return (
    <>
      {/* Controls Header */}
      <div className="bg-gentle-charcoal/90 backdrop-blur-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap gap-4 items-center">
          <h2 className="text-white font-semibold mr-auto">View Modes Demonstration</h2>
          
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">Try a specific view:</label>
            <div className="flex rounded-lg overflow-hidden">
              {(['grid', 'list', 'timeline'] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`px-3 py-1.5 text-sm font-medium ${
                    selectedMode === mode 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <Link 
            href="/people"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors ease-divine"
          >
            Back to People
          </Link>
        </div>
      </div>
      
      {/* View mode description */}
      <div className={`py-6 bg-gradient-to-r ${modeDescriptions[selectedMode].color}`}>
        <div className="container mx-auto px-4">
          <motion.div
            key={selectedMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white max-w-2xl mx-auto text-center"
          >
            <h1 className="text-3xl font-bold mb-2">{modeDescriptions[selectedMode].title}</h1>
            <p className="text-white/90">{modeDescriptions[selectedMode].description}</p>
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <InteractivePersonGrid 
          people={testData}
          initialViewMode={selectedMode}
        />
      </div>
    </>
  );
} 