"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { withErrorBoundary } from '@/components/with-error-boundary';

export type ViewMode = 'grid' | 'list' | 'timeline';

interface ViewModeSelectorProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

// Define view modes with their icons and keyboard shortcuts outside the component
const getViewModeOptions = () => [
  {
    id: 'grid' as ViewMode,
    label: 'Grid View',
    shortcut: 'G',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" 
        />
      </svg>
    ),
  },
  {
    id: 'list' as ViewMode,
    label: 'List View',
    shortcut: 'L',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 6h16M4 12h16M4 18h16" 
        />
      </svg>
    ),
  },
  {
    id: 'timeline' as ViewMode,
    label: 'Timeline',
    shortcut: 'T',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
    ),
  },
];

function ViewModeSelector({ viewMode, onChange, className }: ViewModeSelectorProps) {
  const [mounted, setMounted] = useState(false);
  
  // Memoize the view modes to avoid recreation on each render
  const viewModes = useMemo(() => getViewModeOptions(), []);

  // Mark component as mounted after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set up keyboard shortcuts
  useEffect(() => {
    if (!mounted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if modifier keys are pressed or if user is typing in an input
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement) {
        return;
      }

      const key = e.key.toUpperCase();
      
      // Match key to view mode shortcut
      const mode = viewModes.find(mode => mode.shortcut === key)?.id;
      if (mode && mode !== viewMode) {
        onChange(mode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, onChange, viewModes, mounted]);

  return (
    <div 
      className={cn(
        "flex items-center glass rounded-lg overflow-hidden", 
        className
      )}
      role="radiogroup"
      aria-label="View mode selection"
    >
      {viewModes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={cn(
            "relative p-2 transition-colors ease-divine",
            "focus:outline-none focus:ring-1 focus:ring-white/50",
            viewMode === mode.id ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
          )}
          role="radio"
          aria-checked={viewMode === mode.id}
          aria-label={mode.label}
          title={`${mode.label} (${mode.shortcut})`}
        >
          {/* Current selection indicator */}
          {mounted && viewMode === mode.id && (
            <motion.div
              layoutId="viewModeIndicator"
              className="absolute inset-0 bg-white/20 -z-10"
              initial={false}
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          
          {/* Icon */}
          {mode.icon}
          
          {/* Shortcut hint - visible on hover */}
          <span className="absolute bottom-0.5 right-0.5 text-[10px] opacity-70 pointer-events-none">
            {mode.shortcut}
          </span>
        </button>
      ))}
    </div>
  );
}

export default withErrorBoundary(ViewModeSelector, {
  componentName: 'ViewModeSelector',
  id: 'view-mode-selector'
}); 