"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PersonData,
  PersonRole,
  JourneyStage,
  PersonTheme,
  PersonImpactLevel,
} from "@/types/person";
import FilterBar from "@/components/people/FilterBar";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";
import {
  GridLoadingSkeleton,
  LoadingMessages,
  ErrorWithRetry,
} from "@/components/people/LoadingStates";
import GridView from "@/components/people/GridView";

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
  const roleSection = person.sections?.find(
    (section) =>
      section.type === "custom" && section.content.component === "role",
  );

  if (roleSection && roleSection.type === "custom") {
    const customContent = roleSection.content as CustomSectionContent;
    if (customContent.props?.role) {
      const role = customContent.props.role as string;

      // Map to valid PersonRole
      if (
        role === "lightworker" ||
        role === "messenger" ||
        role === "witness" ||
        role === "guardian"
      ) {
        return role as PersonRole;
      }
    }
  }

  // Fallback logic based on titles or keywords in description
  const titleLower = person.title.toLowerCase();

  if (titleLower.includes("lightworker") || titleLower.includes("visionary")) {
    return "lightworker";
  } else if (
    titleLower.includes("messenger") ||
    titleLower.includes("communicator")
  ) {
    return "messenger";
  } else if (
    titleLower.includes("witness") ||
    titleLower.includes("testimony")
  ) {
    return "witness";
  } else if (
    titleLower.includes("guardian") ||
    titleLower.includes("protector")
  ) {
    return "guardian";
  }

  // Default role
  return "lightworker";
};

// Function to determine a person's journey stage
const determineJourneyStage = (person: PersonData): JourneyStage => {
  // Check for role in custom sections
  const stageSection = person.sections?.find(
    (section) =>
      section.type === "custom" && section.content.component === "journeyStage",
  );

  if (stageSection && stageSection.type === "custom") {
    const customContent = stageSection.content as CustomSectionContent;
    if (customContent.props?.stage) {
      const stage = customContent.props.stage as string;

      // Map to valid JourneyStage
      if (
        stage === "seeker" ||
        stage === "awakening" ||
        stage === "serving" ||
        stage === "guiding"
      ) {
        return stage as JourneyStage;
      }
    }
  }

  // Determine stage based on themes and impact level
  const impactLevel = determinePersonImpactLevel(person);
  const themes = determinePersonThemes(person);

  if (impactLevel === "eternal" || themes.includes("leadership")) {
    return "guiding";
  } else if (impactLevel === "global" || themes.includes("transformation")) {
    return "serving";
  } else if (impactLevel === "regional" || themes.includes("courage")) {
    return "awakening";
  } else {
    return "seeker";
  }
};

// Function to determine person's themes
const determinePersonThemes = (person: PersonData): PersonTheme[] => {
  // Use the themes property if it exists
  if (person.themes && person.themes.length > 0) {
    return person.themes;
  }

  // Check sections for theme information
  const themeSection = person.sections?.find(
    (section) =>
      section.type === "custom" && section.content.component === "theme",
  );

  if (themeSection && themeSection.type === "custom") {
    const customContent = themeSection.content as CustomSectionContent;
    if (customContent.props?.themes) {
      const themes = customContent.props.themes as PersonTheme[];
      if (themes.length > 0) {
        return themes;
      }
    }
  }

  // Extract from title or description
  const combinedText =
    `${person.title} ${person.impact.description}`.toLowerCase();
  const themes: PersonTheme[] = [];

  if (combinedText.includes("faith") || combinedText.includes("belief")) {
    themes.push("faith");
  }
  if (combinedText.includes("courage") || combinedText.includes("brave")) {
    themes.push("courage");
  }
  if (combinedText.includes("transform") || combinedText.includes("change")) {
    themes.push("transformation");
  }
  if (combinedText.includes("lead") || combinedText.includes("guide")) {
    themes.push("leadership");
  }
  if (combinedText.includes("unity") || combinedText.includes("together")) {
    themes.push("unity");
  }
  if (combinedText.includes("wisdom") || combinedText.includes("knowledge")) {
    themes.push("wisdom");
  }

  // Default to transformation if no themes found
  return themes.length > 0 ? themes : ["transformation"];
};

// Function to determine person's impact level
const determinePersonImpactLevel = (person: PersonData): PersonImpactLevel => {
  // Use the impactLevel property if it exists
  if (person.impactLevel) {
    return person.impactLevel;
  }

  // Check sections for impact level information
  const impactSection = person.sections?.find(
    (section) =>
      section.type === "custom" && section.content.component === "impact",
  );

  if (impactSection && impactSection.type === "custom") {
    const customContent = impactSection.content as CustomSectionContent;
    if (customContent.props?.level) {
      const level = customContent.props.level as string;
      if (
        level === "local" ||
        level === "regional" ||
        level === "global" ||
        level === "eternal"
      ) {
        return level as PersonImpactLevel;
      }
    }
  }

  // Extract from impact stats or description
  if (person.impact.stats) {
    const statsText = person.impact.stats
      .map((stat) => `${stat.label} ${stat.value}`)
      .join(" ")
      .toLowerCase();

    if (statsText.includes("world") || statsText.includes("global")) {
      return "global";
    }
    if (statsText.includes("region") || statsText.includes("nation")) {
      return "regional";
    }
    if (statsText.includes("local") || statsText.includes("community")) {
      return "local";
    }
    if (statsText.includes("eternal") || statsText.includes("divine")) {
      return "eternal";
    }
  }

  // Default to local
  return "local";
};

function InteractivePersonGrid({
  people,
  className,
  simulateLoadingDelay = 0, // Default to no delay
}: InteractivePersonGridProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Update the useEffect hooks to fix the dependencies warnings
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPeople, setFilteredPeople] = useState<PersonData[]>(people);

  // Advanced filters
  const [roleFilters, setRoleFilters] = useState<PersonRole[]>([]);
  const [themeFilters, setThemeFilters] = useState<PersonTheme[]>([]);
  const [impactFilters, setImpactFilters] = useState<PersonImpactLevel[]>([]);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [peopleWithAttributes, setPeopleWithAttributes] = useState<
    Array<
      PersonData & {
        derivedRole: PersonRole;
        derivedThemes: PersonTheme[];
        derivedImpactLevel: PersonImpactLevel;
      }
    >
  >([]);

  // Track scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  // Calculate filter counts using useMemo to prevent dependency changes on every render
  const roleCount = useMemo<Record<PersonRole, number>>(
    () => ({
      lightworker: 0,
      messenger: 0,
      witness: 0,
      guardian: 0,
    }),
    [],
  );

  const themeCount = useMemo<Record<PersonTheme, number>>(
    () => ({
      faith: 0,
      courage: 0,
      transformation: 0,
      leadership: 0,
      unity: 0,
      wisdom: 0,
    }),
    [],
  );

  const impactCount = useMemo<Record<PersonImpactLevel, number>>(
    () => ({
      local: 0,
      regional: 0,
      global: 0,
      eternal: 0,
    }),
    [],
  );

  // Memoize person attribute determination functions to prevent recreation on each render
  const getPersonRole = useCallback((person: PersonData): PersonRole => {
    return determinePersonRole(person);
  }, []);

  const getPersonThemes = useCallback((person: PersonData): PersonTheme[] => {
    return determinePersonThemes(person);
  }, []);

  const getPersonImpactLevel = useCallback(
    (person: PersonData): PersonImpactLevel => {
      return determinePersonImpactLevel(person);
    },
    [],
  );

  const getJourneyStage = useCallback((person: PersonData): JourneyStage => {
    return determineJourneyStage(person);
  }, []);

  // Pre-process people with derived attributes for filtering
  useEffect(() => {
    // Initialize loading state
    setIsLoading(true);
    setError(null);

    // Simulate data loading delay (for testing)
    const timer = setTimeout(() => {
      try {
        const processedPeople = people.map((person) => {
          const role = getPersonRole(person);
          const themes = getPersonThemes(person);
          const impactLevel = getPersonImpactLevel(person);

          // Update counts
          if (role in roleCount) roleCount[role]++;
          themes.forEach((theme) => {
            if (theme in themeCount) themeCount[theme]++;
          });
          if (impactLevel in impactCount) impactCount[impactLevel]++;

          return {
            ...person,
            derivedRole: role,
            derivedThemes: themes,
            derivedImpactLevel: impactLevel,
          };
        });

        // Update state with processed data
        setPeopleWithAttributes(processedPeople);
        // End loading state
        setIsLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred while processing people data.";
        setError(errorMessage);
        setIsLoading(false);
      }
    }, simulateLoadingDelay);

    return () => clearTimeout(timer);
  }, [
    people,
    simulateLoadingDelay,
    roleCount,
    themeCount,
    impactCount,
    getPersonRole,
    getPersonThemes,
    getPersonImpactLevel,
  ]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setRoleFilters([]);
    setThemeFilters([]);
    setImpactFilters([]);
    setSearchQuery("");
  }, []);

  // Retry loading data with exponential backoff
  const handleRetry = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setRetryCount((prev) => prev + 1);

    // Calculate exponential backoff delay (min 1s, max 10s)
    const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);

    setTimeout(() => {
      try {
        const processedPeople = people.map((person) => {
          const role = getPersonRole(person);
          const themes = getPersonThemes(person);
          const impactLevel = getPersonImpactLevel(person);

          return {
            ...person,
            derivedRole: role,
            derivedThemes: themes,
            derivedImpactLevel: impactLevel,
          };
        });

        setPeopleWithAttributes(processedPeople);
        setIsLoading(false);
      } catch (err) {
        console.error("Error retrying data load:", err);
        setError("Failed to reconnect. Please try again later.");
        setIsLoading(false);
      }
    }, backoffDelay);
  }, [
    people,
    retryCount,
    getPersonRole,
    getPersonThemes,
    getPersonImpactLevel,
  ]);

  // Filter people based on all criteria - memoize this expensive operation
  const applyFilters = useCallback(() => {
    if (isLoading || error || peopleWithAttributes.length === 0) return;

    let results = [...peopleWithAttributes];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (person) =>
          person.name.toLowerCase().includes(query) ||
          person.title.toLowerCase().includes(query) ||
          person.impact.description.toLowerCase().includes(query),
      );
    }

    // Apply role filters
    if (roleFilters.length > 0) {
      results = results.filter((person) =>
        roleFilters.includes(person.derivedRole),
      );
    }

    // Apply theme filters
    if (themeFilters.length > 0) {
      results = results.filter((person) =>
        person.derivedThemes.some((theme) => themeFilters.includes(theme)),
      );
    }

    // Apply impact level filters
    if (impactFilters.length > 0) {
      results = results.filter((person) =>
        impactFilters.includes(person.derivedImpactLevel),
      );
    }

    setFilteredPeople(results);
  }, [
    searchQuery,
    roleFilters,
    themeFilters,
    impactFilters,
    peopleWithAttributes,
    isLoading,
    error,
  ]);

  // Apply filters when relevant dependencies change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

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
        <ErrorWithRetry message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-8 z-10 relative people-interactive-grid",
        className,
      )}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Filters sidebar - mobile first approach */}
        <div className="w-full lg:w-1/4 z-10 relative">
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
            className="lg:sticky lg:top-24"
          />
        </div>

        <div className="w-full lg:w-3/4 space-y-6 lg:space-y-8 z-10 relative">
          {/* Search and view controls */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            {/* Search input - increased touch target size */}
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search people..."
                className="pl-10 pr-4 py-3 h-11 min-h-[44px] rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-gold/50 w-full sm:w-80"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center w-11 min-w-[44px] h-11 min-h-[44px]"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              {/* Filter pills - made more touch friendly */}
              {(roleFilters.length > 0 ||
                themeFilters.length > 0 ||
                impactFilters.length > 0) && (
                <div className="flex flex-wrap gap-2 items-center filter-pills">
                  <span className="text-gray-400">Filters:</span>

                  {roleFilters.map((role) => (
                    <span
                      key={`role-${role}`}
                      className="inline-flex items-center px-3 py-2 min-h-[36px] rounded-full bg-white/10 text-sm"
                    >
                      {role}
                      <button
                        onClick={() =>
                          setRoleFilters((prev) =>
                            prev.filter((r) => r !== role),
                          )
                        }
                        className="ml-2 hover:text-red-400 h-6 w-6 min-h-[24px] min-w-[24px] inline-flex items-center justify-center"
                        aria-label={`Remove ${role} filter`}
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  {themeFilters.map((theme) => (
                    <span
                      key={`theme-${theme}`}
                      className="inline-flex items-center px-3 py-2 min-h-[36px] rounded-full bg-white/10 text-sm"
                    >
                      {theme}
                      <button
                        onClick={() =>
                          setThemeFilters((prev) =>
                            prev.filter((t) => t !== theme),
                          )
                        }
                        className="ml-2 hover:text-red-400 h-6 w-6 min-h-[24px] min-w-[24px] inline-flex items-center justify-center"
                        aria-label={`Remove ${theme} filter`}
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  {impactFilters.map((impact) => (
                    <span
                      key={`impact-${impact}`}
                      className="inline-flex items-center px-3 py-2 min-h-[36px] rounded-full bg-white/10 text-sm"
                    >
                      {impact}
                      <button
                        onClick={() =>
                          setImpactFilters((prev) =>
                            prev.filter((i) => i !== impact),
                          )
                        }
                        className="ml-2 hover:text-red-400 h-6 w-6 min-h-[24px] min-w-[24px] inline-flex items-center justify-center"
                        aria-label={`Remove ${impact} filter`}
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <button
                    onClick={clearAllFilters}
                    className="text-hope-gold hover:underline text-sm py-2 px-3 min-h-[36px] inline-flex items-center"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              Showing{" "}
              <span className="text-white font-semibold">
                {filteredPeople.length}
              </span>{" "}
              of{" "}
              <span className="text-white font-semibold">{people.length}</span>{" "}
              transformation agents
            </div>
          </div>

          {/* Grid view */}
          <div className="grid-container">
            <AnimatePresence mode="wait">
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1], // Divine ease
                }}
              >
                <GridView
                  people={filteredPeople.map((person) => ({
                    ...person,
                    derivedRole: getPersonRole(person),
                  }))}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate initials from name (must match function in PersonCard)
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

// Export with divine error boundary
export default withDivineErrorBoundary(InteractivePersonGrid, {
  componentName: "InteractivePersonGrid",
  role: "guardian",
});
