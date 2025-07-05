"use client";

import { useState, useRef, useEffect, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PersonRole, JourneyStage, PersonTheme, PersonImpactLevel } from '@/types/person';
import { withErrorBoundary } from '@/components/with-error-boundary';

// Generic filter option type
interface FilterOption<T extends string> {
  value: T;
  label: string;
  description?: string;
  count?: number;
}

// Generic filter category type
interface FilterCategory<T extends string> {
  name: string;
  options: FilterOption<T>[];
  activeFilters: T[];
  setActiveFilters: (filters: T[]) => void;
  colorClass: string;
  glowClass: string;
}

interface FilterBarProps {
  roleFilters: PersonRole[];
  setRoleFilters: (filters: PersonRole[]) => void;
  roleCount: Record<PersonRole, number>;
  
  themeFilters: PersonTheme[];
  setThemeFilters: (filters: PersonTheme[]) => void;
  themeCount: Record<PersonTheme, number>;
  
  impactFilters: PersonImpactLevel[];
  setImpactFilters: (filters: PersonImpactLevel[]) => void;
  impactCount: Record<PersonImpactLevel, number>;
  
  totalCount: number;
  filteredCount: number;
  
  className?: string;
  onClearAll: () => void;
}

// Helper function to check if a value is in an array
function isValueInArray<T extends string>(array: T[], value: T): boolean {
  return array.some(item => item === value);
}

function FilterBar({
  roleFilters,
  setRoleFilters,
  roleCount,
  
  themeFilters,
  setThemeFilters,
  themeCount,
  
  impactFilters,
  setImpactFilters,
  impactCount,
  
  totalCount,
  filteredCount,
  
  className,
  onClearAll
}: FilterBarProps) {
  const [mounted, setMounted] = useState(false);
  
  // Track active filter count
  const activeFilterCount = roleFilters.length + themeFilters.length + impactFilters.length;
  
  // Ref for capturing keyboard events
  const filterBarRef = useRef<HTMLDivElement>(null);
  
  // Keep track of which category is focused for keyboard navigation
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);
  
  // Component mounted effect
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Listen for Escape key to clear all filters
  useEffect(() => {
    if (!mounted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeFilterCount > 0) {
        onClearAll();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFilterCount, onClearAll, mounted]);
  
  // Define filter categories
  const roleOptions: FilterOption<PersonRole>[] = [
    { value: 'lightworker', label: 'Lightworker', count: roleCount['lightworker'] || 0 },
    { value: 'messenger', label: 'Messenger', count: roleCount['messenger'] || 0 },
    { value: 'witness', label: 'Witness', count: roleCount['witness'] || 0 },
    { value: 'guardian', label: 'Guardian', count: roleCount['guardian'] || 0 },
  ];
  
  const themeOptions: FilterOption<PersonTheme>[] = [
    { value: 'faith', label: 'Faith', count: themeCount['faith'] || 0 },
    { value: 'courage', label: 'Courage', count: themeCount['courage'] || 0 },
    { value: 'transformation', label: 'Transformation', count: themeCount['transformation'] || 0 },
    { value: 'leadership', label: 'Leadership', count: themeCount['leadership'] || 0 },
    { value: 'unity', label: 'Unity', count: themeCount['unity'] || 0 },
    { value: 'wisdom', label: 'Wisdom', count: themeCount['wisdom'] || 0 },
  ];
  
  const impactOptions: FilterOption<PersonImpactLevel>[] = [
    { value: 'local', label: 'Local', count: impactCount['local'] || 0 },
    { value: 'regional', label: 'Regional', count: impactCount['regional'] || 0 },
    { value: 'global', label: 'Global', count: impactCount['global'] || 0 },
    { value: 'eternal', label: 'Eternal', count: impactCount['eternal'] || 0 },
  ];
  
  // Type for our filter categories list 
  type FilterCategoryUnion = 
    | FilterCategory<PersonRole>
    | FilterCategory<PersonTheme>
    | FilterCategory<PersonImpactLevel>;
  
  const filterCategories: FilterCategoryUnion[] = [
    {
      name: 'Role',
      options: roleOptions,
      activeFilters: roleFilters,
      setActiveFilters: setRoleFilters,
      colorClass: 'text-amber-500',
      glowClass: 'glow-lightworker'
    },
    {
      name: 'Theme',
      options: themeOptions,
      activeFilters: themeFilters,
      setActiveFilters: setThemeFilters,
      colorClass: 'text-emerald-500',
      glowClass: 'glow-witness'
    },
    {
      name: 'Impact',
      options: impactOptions,
      activeFilters: impactFilters,
      setActiveFilters: setImpactFilters,
      colorClass: 'text-amber-500',
      glowClass: 'glow-guardian'
    }
  ];
  
  // Generic toggle filter function with proper type safety
  function toggleFilter<T extends string>(
    category: FilterCategory<T>, 
    option: FilterOption<T>
  ): void {
    const { activeFilters, setActiveFilters } = category;
    
    if (activeFilters.includes(option.value)) {
      setActiveFilters(activeFilters.filter(filter => filter !== option.value));
    } else {
      setActiveFilters([...activeFilters, option.value]);
    }
  }
  
  // Handle keyboard navigation with correct typing
  function handleKeyDown<T extends string>(
    e: ReactKeyboardEvent, 
    category: FilterCategory<T>, 
    option: FilterOption<T>
  ): void {
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault();
        toggleFilter(category, option);
        break;
      case 'ArrowRight':
        e.preventDefault();
        // Focus next option in category
        const nextSibling = (e.target as HTMLElement).nextElementSibling;
        if (nextSibling) {
          (nextSibling as HTMLElement).focus();
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        // Focus previous option in category
        const prevSibling = (e.target as HTMLElement).previousElementSibling;
        if (prevSibling) {
          (prevSibling as HTMLElement).focus();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        // Focus next category
        const currentCategoryIndex = filterCategories.findIndex(c => c.name === category.name);
        if (currentCategoryIndex < filterCategories.length - 1) {
          setFocusedCategory(filterCategories[currentCategoryIndex + 1].name);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        // Focus previous category
        const currCategoryIndex = filterCategories.findIndex(c => c.name === category.name);
        if (currCategoryIndex > 0) {
          setFocusedCategory(filterCategories[currCategoryIndex - 1].name);
        }
        break;
    }
  }
  
  // Get animation variants for the filters
  const filterVariants = {
    initial: { 
      opacity: 0, 
      y: 10,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };
  
  return (
    <div 
      ref={filterBarRef}
      className={cn(
        "space-y-6 rounded-xl glass filter-bar-override p-6 ease-divine transition-all duration-300",
        activeFilterCount > 0 ? "ring-1 ring-white/30" : "",
        className
      )}
    >
      {/* Filter summary */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">Filters</h3>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2 py-0.5 bg-white/10 text-xs font-semibold rounded-full"
            >
              {activeFilterCount} active
            </motion.div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-white/80">
            Showing <span className="font-semibold">{filteredCount}</span> of <span className="text-hope-gold">{totalCount}</span>
          </div>
          
          {activeFilterCount > 0 && mounted && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClearAll}
              className="text-sm text-white/70 hover:text-white px-2 py-1 rounded transition-colors ease-divine"
            >
              Clear all
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Filter categories */}
      <div className="space-y-6">
        {filterCategories.map((category) => (
          <div key={category.name} className="space-y-2">
            <h4 className={cn("text-sm font-semibold", category.colorClass)}>
              {category.name}
            </h4>
            
            <div className="flex flex-wrap gap-2">
              {category.options.map((option) => {
                const isActive = isValueInArray(category.activeFilters, option.value);
                
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => {
                      if (category.name === 'Role') {
                        toggleFilter(category as FilterCategory<PersonRole>, option as FilterOption<PersonRole>);
                      } else if (category.name === 'Theme') {
                        toggleFilter(category as FilterCategory<PersonTheme>, option as FilterOption<PersonTheme>);
                      } else if (category.name === 'Impact') {
                        toggleFilter(category as FilterCategory<PersonImpactLevel>, option as FilterOption<PersonImpactLevel>);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (category.name === 'Role') {
                        handleKeyDown(e, category as FilterCategory<PersonRole>, option as FilterOption<PersonRole>);
                      } else if (category.name === 'Theme') {
                        handleKeyDown(e, category as FilterCategory<PersonTheme>, option as FilterOption<PersonTheme>);
                      } else if (category.name === 'Impact') {
                        handleKeyDown(e, category as FilterCategory<PersonImpactLevel>, option as FilterOption<PersonImpactLevel>);
                      }
                    }}
                    whileHover={mounted ? { scale: 1.05 } : undefined}
                    whileTap={mounted ? { scale: 0.95 } : undefined}
                    tabIndex={0}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-all ease-divine focus:outline-none focus:ring-2 focus:ring-white/50",
                      "backdrop-blur-sm",
                      isActive 
                        ? cn(
                            "bg-white/15 text-white",
                            option.count === 0 ? "opacity-50" : "", 
                            category.glowClass
                          )
                        : "bg-white/5 text-white/80 hover:bg-white/10",
                      option.count === 0 && !isActive ? "opacity-40" : ""
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {option.label}
                      
                      {/* Count indicator */}
                      {(option.count !== undefined && option.count > 0) && (
                        <span 
                          className={cn(
                            "text-xs font-normal px-1.5 py-0.5 rounded-full transition-colors", 
                            isActive ? "bg-white/20" : "bg-white/10"
                          )}
                        >
                          {option.count}
                        </span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withErrorBoundary(FilterBar, {
  componentName: 'FilterBar',
  id: 'filter-bar'
}); 