"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonData, PersonRole, JourneyStage, PersonTheme, PersonImpactLevel } from '@/types/person';
import FilterBar from '@/components/people/FilterBar';
import { withErrorBoundary } from '@/components/with-error-boundary';
import { cn } from '@/lib/utils';
import { 
  GridLoadingSkeleton, 
  LoadingMessages, 
  ErrorWithRetry 
} from '@/components/people/LoadingStates';
import ViewModeSelector, { ViewMode } from '@/components/people/ViewModeSelector';
import GridView from '@/components/people/GridView';
import ListView from '@/components/people/ListView';
import TimelineView from '@/components/people/TimelineView';

// Import CustomSectionContent type
interface CustomSectionContent {
  title: string;
  description?: string;
  component: string;
  props?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface InteractivePersonGridProps {
  people: PersonData[];
  initialViewMode?: ViewMode;
  className?: string;
  simulateLoadingDelay?: number; // Add prop to simulate loading delay for testing
}

// Function to determine a person's role based on their data
const determinePersonRole = (person: PersonData): PersonRole => {
  // Use the role property if it exists
  if (person.role) {
    return person.role;
  }
  
  // Check for role in custom sections
  const roleSection = person.sections.find(
    section => section.type === 'custom' && section.content.component === 'role'
  );
  
  if (roleSection && roleSection.type === 'custom') {
    const customContent = roleSection.content as CustomSectionContent;
    if (customContent.props?.role) {
      const role = customContent.props.role as string;
      
      // Map to valid PersonRole
      if (role === 'lightworker' || role === 'messenger' || 
          role === 'witness' || role === 'guardian') {
        return role as PersonRole;
      }
    }
  }
  
  // Fallback logic based on titles or keywords in description
  const titleLower = person.title.toLowerCase();
  
  if (titleLower.includes('lightworker') || titleLower.includes('visionary')) {
    return 'lightworker';
  } else if (titleLower.includes('messenger') || titleLower.includes('communicator')) {
    return 'messenger';
  } else if (titleLower.includes('witness') || titleLower.includes('testimony')) {
    return 'witness';
  } else if (titleLower.includes('guardian') || titleLower.includes('protector')) {
    return 'guardian';
  }
  
  // Default role
  return 'lightworker';
};

// Function to determine a person's journey stage
const determineJourneyStage = (person: PersonData): JourneyStage => {
  // Check for role in custom sections
  const stageSection = person.sections.find(
    section => section.type === 'custom' && section.content.component === 'journeyStage'
  );
  
  if (stageSection && stageSection.type === 'custom') {
    const customContent = stageSection.content as CustomSectionContent;
    if (customContent.props?.stage) {
      const stage = customContent.props.stage as string;
      
      // Map to valid JourneyStage
      if (stage === 'seeker' || stage === 'awakening' || 
          stage === 'serving' || stage === 'guiding') {
        return stage as JourneyStage;
      }
    }
  }
  
  // Determine stage based on themes and impact level
  const impactLevel = determinePersonImpactLevel(person);
  const themes = determinePersonThemes(person);
  
  if (impactLevel === 'eternal' || themes.includes('leadership')) {
    return 'guiding';
  } else if (impactLevel === 'global' || themes.includes('transformation')) {
    return 'serving';
  } else if (impactLevel === 'regional' || themes.includes('courage')) {
    return 'awakening';
  } else {
    return 'seeker';
  }
};

// Function to determine person's themes
const determinePersonThemes = (person: PersonData): PersonTheme[] => {
  // Use the themes property if it exists
  if (person.themes && person.themes.length > 0) {
    return person.themes;
  }
  
  // Check sections for theme information
  const themeSection = person.sections.find(
    section => section.type === 'custom' && section.content.component === 'theme'
  );
  
  if (themeSection && themeSection.type === 'custom') {
    const customContent = themeSection.content as CustomSectionContent;
    if (customContent.props?.themes) {
      const themes = customContent.props.themes as PersonTheme[];
      if (themes.length > 0) {
        return themes;
      }
    }
  }
  
  // Extract from title or description
  const combinedText = `${person.title} ${person.impact.description}`.toLowerCase();
  const themes: PersonTheme[] = [];
  
  if (combinedText.includes('faith') || combinedText.includes('belief')) {
    themes.push('faith');
  }
  if (combinedText.includes('courage') || combinedText.includes('brave')) {
    themes.push('courage');
  }
  if (combinedText.includes('transform') || combinedText.includes('change')) {
    themes.push('transformation');
  }
  if (combinedText.includes('lead') || combinedText.includes('guide')) {
    themes.push('leadership');
  }
  if (combinedText.includes('unity') || combinedText.includes('together')) {
    themes.push('unity');
  }
  if (combinedText.includes('wisdom') || combinedText.includes('knowledge')) {
    themes.push('wisdom');
  }
  
  // Default to transformation if no themes found
  return themes.length > 0 ? themes : ['transformation'];
};

// Function to determine person's impact level
const determinePersonImpactLevel = (person: PersonData): PersonImpactLevel => {
  // Use the impactLevel property if it exists
  if (person.impactLevel) {
    return person.impactLevel;
  }
  
  // Check sections for impact level information
  const impactSection = person.sections.find(
    section => section.type === 'custom' && section.content.component === 'impact'
  );
  
  if (impactSection && impactSection.type === 'custom') {
    const customContent = impactSection.content as CustomSectionContent;
    if (customContent.props?.level) {
      const level = customContent.props.level as string;
      if (level === 'local' || level === 'regional' || level === 'global' || level === 'eternal') {
        return level as PersonImpactLevel;
      }
    }
  }
  
  // Extract from impact stats or description
  if (person.impact.stats) {
    const statsText = person.impact.stats.map(stat => `${stat.label} ${stat.value}`).join(' ').toLowerCase();
    
    if (statsText.includes('world') || statsText.includes('global')) {
      return 'global';
    }
    if (statsText.includes('region') || statsText.includes('nation')) {
      return 'regional';
    }
    if (statsText.includes('local') || statsText.includes('community')) {
      return 'local';
    }
    if (statsText.includes('eternal') || statsText.includes('divine')) {
      return 'eternal';
    }
  }
  
  // Default to local
  return 'local';
};

function InteractivePersonGrid({
  people,
  initialViewMode = 'grid',
  className,
  simulateLoadingDelay = 0, // Default to no delay
}: InteractivePersonGridProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Update the useEffect hooks to fix the dependencies warnings
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // View mode state with localStorage persistence
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPeople, setFilteredPeople] = useState<PersonData[]>(people);
  
  // Advanced filters
  const [roleFilters, setRoleFilters] = useState<PersonRole[]>([]);
  const [themeFilters, setThemeFilters] = useState<PersonTheme[]>([]);
  const [impactFilters, setImpactFilters] = useState<PersonImpactLevel[]>([]);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [peopleWithAttributes, setPeopleWithAttributes] = useState<Array<PersonData & {
    derivedRole: PersonRole;
    derivedThemes: PersonTheme[];
    derivedImpactLevel: PersonImpactLevel;
  }>>([]);
  
  // Track scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Load view mode from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && isMounted) {
      const savedViewMode = localStorage.getItem('peopleViewMode');
      if (savedViewMode && (savedViewMode === 'grid' || savedViewMode === 'list' || savedViewMode === 'timeline')) {
        setViewMode(savedViewMode as ViewMode);
      }
    }
  }, [isMounted]);
  
  // Save view mode to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isMounted) {
      localStorage.setItem('peopleViewMode', viewMode);
    }
  }, [viewMode, isMounted]);
  
  // Handle view mode change
  const handleViewModeChange = useCallback((newMode: ViewMode) => {
    // Save current scroll position
    if (typeof window !== 'undefined') {
      setScrollPosition(window.scrollY);
    }
    
    // Update view mode
    setViewMode(newMode);
  }, []);
  
  // Restore scroll position after view mode change
  useEffect(() => {
    if (scrollPosition > 0 && typeof window !== 'undefined' && isMounted) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'auto'
        });
      }, 100);
    }
  }, [viewMode, scrollPosition, isMounted]);
  
  // Calculate filter counts using useMemo to prevent dependency changes on every render
  const roleCount = useMemo<Record<PersonRole, number>>(() => ({
    lightworker: 0,
    messenger: 0,
    witness: 0,
    guardian: 0
  }), []);
  
  const themeCount = useMemo<Record<PersonTheme, number>>(() => ({
    faith: 0,
    courage: 0,
    transformation: 0,
    leadership: 0,
    unity: 0,
    wisdom: 0
  }), []);
  
  const impactCount = useMemo<Record<PersonImpactLevel, number>>(() => ({
    local: 0,
    regional: 0,
    global: 0,
    eternal: 0
  }), []);
  
  // Pre-process people with derived attributes for filtering
  useEffect(() => {
    // Initialize loading state
    setIsLoading(true);
    setError(null);
    
    // Simulate data loading delay (for testing)
    const timer = setTimeout(() => {
      try {
        const processedPeople = people.map(person => {
          const role = determinePersonRole(person);
          const themes = determinePersonThemes(person);
          const impactLevel = determinePersonImpactLevel(person);
          
          // Update counts
          if (role in roleCount) roleCount[role]++;
          themes.forEach(theme => {
            if (theme in themeCount) themeCount[theme]++;
          });
          if (impactLevel in impactCount) impactCount[impactLevel]++;
          
          return {
            ...person,
            derivedRole: role,
            derivedThemes: themes,
            derivedImpactLevel: impactLevel
          };
        });
        
        // Update state with processed data
        setPeopleWithAttributes(processedPeople);
        // End loading state
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while processing people data.';
        setError(errorMessage);
        setIsLoading(false);
      }
    }, simulateLoadingDelay);
    
    return () => clearTimeout(timer);
  }, [people, simulateLoadingDelay, roleCount, themeCount, impactCount]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setRoleFilters([]);
    setThemeFilters([]);
    setImpactFilters([]);
    setSearchQuery('');
  }, []);
  
  // Retry loading data with exponential backoff
  const handleRetry = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setRetryCount(prev => prev + 1);
    
    // Calculate exponential backoff delay (min 1s, max 10s)
    const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);
    
    setTimeout(() => {
      try {
        const processedPeople = people.map(person => {
          const role = determinePersonRole(person);
          const themes = determinePersonThemes(person);
          const impactLevel = determinePersonImpactLevel(person);
          
          return {
            ...person,
            derivedRole: role,
            derivedThemes: themes,
            derivedImpactLevel: impactLevel
          };
        });
        
        setPeopleWithAttributes(processedPeople);
        setIsLoading(false);
      } catch (err) {
        console.error('Error retrying data load:', err);
        setError('Failed to reconnect. Please try again later.');
        setIsLoading(false);
      }
    }, backoffDelay);
  }, [people, retryCount]);

  // Filter people based on all criteria
  useEffect(() => {
    if (isLoading || error || peopleWithAttributes.length === 0) return;
    
    let results = [...peopleWithAttributes];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        person => 
          person.name.toLowerCase().includes(query) ||
          person.title.toLowerCase().includes(query) ||
          person.impact.description.toLowerCase().includes(query)
      );
    }
    
    // Apply role filters
    if (roleFilters.length > 0) {
      results = results.filter(person => 
        roleFilters.includes(person.derivedRole)
      );
    }
    
    // Apply theme filters
    if (themeFilters.length > 0) {
      results = results.filter(person => 
        person.derivedThemes.some(theme => themeFilters.includes(theme))
      );
    }
    
    // Apply impact level filters
    if (impactFilters.length > 0) {
      results = results.filter(person => 
        impactFilters.includes(person.derivedImpactLevel)
      );
    }
    
    setFilteredPeople(results);
  }, [searchQuery, roleFilters, themeFilters, impactFilters, peopleWithAttributes, isLoading, error]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // If loading, show loading skeleton
  if (isLoading) {
    return (
      <div className={cn("space-y-8", className)}>
        <LoadingMessages />
        <GridLoadingSkeleton count={8} showFeatured={true} />
      </div>
    );
  }
  
  // If error, show error message with retry
  if (error) {
    return (
      <div className={cn("flex justify-center items-center py-16", className)}>
        <ErrorWithRetry 
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className={cn("space-y-8 z-10 relative people-interactive-grid", className)}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="lg:w-1/4 z-10 relative">
          <FilterBar
            roleFilters={roleFilters}
            setRoleFilters={setRoleFilters}
            roleCount={roleCount}
            
            themeFilters={themeFilters}
            setThemeFilters={setThemeFilters}
            themeCount={themeCount}
            
            impactFilters={impactFilters}
            setImpactFilters={setImpactFilters}
            impactCount={impactCount}
            
            totalCount={people.length}
            filteredCount={filteredPeople.length}
            
            onClearAll={clearAllFilters}
            className="sticky top-24"
          />
        </div>
        
        <div className="lg:w-3/4 space-y-8 z-10 relative">
          {/* Search and view controls */}
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Search input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="py-2 pl-10 pr-4 w-full md:w-64 glass backdrop-blur-md rounded-lg focus:ring-2 focus:ring-white/50 focus:outline-none text-white"
                placeholder="Search people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* View mode toggle */}
            <ViewModeSelector 
              viewMode={viewMode}
              onChange={handleViewModeChange}
              className="view-mode-selector-visible"
            />
          </div>
          
          {/* Empty state */}
          {filteredPeople.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center glass rounded-xl backdrop-blur-md p-8"
            >
              <svg className="w-16 h-16 mx-auto text-white/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.9 16.5c1.9.1 3.5.8 4.8 1.9a9 9 0 11-15.4 0c1.3-1.1 2.9-1.8 4.8-1.9m5.8 0h-5.8" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 21v-2m0 0l-2-2m2 2l2-2" />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-white">No people found</h3>
              <p className="text-white/70 mb-6">Your current filter combination returned no results.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFilters}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors ease-divine"
              >
                Clear all filters
              </motion.button>
            </motion.div>
          )}
          
          {/* People grid/list/timeline view */}
          {filteredPeople.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1] // ease-divine
                }}
              >
                {viewMode === 'grid' && (
                  <GridView people={filteredPeople.map(person => ({
                    ...person,
                    derivedRole: determinePersonRole(person)
                  }))} />
                )}
                
                {viewMode === 'list' && (
                  <ListView people={filteredPeople.map(person => ({
                    ...person,
                    derivedRole: determinePersonRole(person),
                    derivedThemes: determinePersonThemes(person)
                  }))} />
                )}
                
                {viewMode === 'timeline' && (
                  <TimelineView people={filteredPeople.map(person => ({
                    ...person,
                    derivedRole: determinePersonRole(person),
                    derivedJourneyStage: determineJourneyStage(person),
                    derivedImpactLevel: determinePersonImpactLevel(person)
                  }))} />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

// Generate initials from name (must match function in PersonCard)
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

export default withErrorBoundary(InteractivePersonGrid, {
  componentName: 'InteractivePersonGrid',
  id: 'interactive-person-grid'
}); 