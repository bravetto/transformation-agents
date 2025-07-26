"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, Filter, Search, BarChart3, Eye } from "lucide-react";
import { PersonData } from "@/types/person";
import { TimelineEvent, TimelineEventType } from "@/types/timeline";
import { extractTimelineEvents, timelinePresets } from "@/lib/timeline-utils";
import InteractiveTimeline from "./InteractiveTimeline";
import TimelineEventModal from "./TimelineEventModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DivineErrorBoundary } from "@/components/ui/divine-error-boundary";

interface EnhancedPersonTimelineProps {
  person: PersonData;
  variant?: "minimal" | "detailed" | "divine";
  showFilters?: boolean;
  showStats?: boolean;
  className?: string;
}

/**
 * 🌟 ENHANCED PERSON TIMELINE
 * Integrates Interactive Timeline with person data for comprehensive storytelling
 */
const EnhancedPersonTimeline: React.FC<EnhancedPersonTimelineProps> = ({
  person,
  variant = "detailed",
  showFilters = true,
  showStats = true,
  className,
}) => {
  // Extract timeline events from person data
  const allEvents = useMemo(() => extractTimelineEvents(person), [person]);

  // State for filtering and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<TimelineEventType[]>([]);
  const [yearRange, setYearRange] = useState<{ start?: number; end?: number }>(
    {},
  );
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    let filtered = [...allEvents];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query) ||
          event.tags?.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((event) => selectedTypes.includes(event.type));
    }

    // Year range filter
    if (yearRange.start || yearRange.end) {
      filtered = filtered.filter((event) => {
        if (yearRange.start && event.year < yearRange.start) return false;
        if (yearRange.end && event.year > yearRange.end) return false;
        return true;
      });
    }

    return filtered;
  }, [allEvents, searchQuery, selectedTypes, yearRange]);

  // Timeline statistics
  const timelineStats = useMemo(() => {
    const eventsByType = allEvents.reduce(
      (acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
      },
      {} as Record<TimelineEventType, number>,
    );

    const yearSpan =
      allEvents.length > 0
        ? {
            start: Math.min(...allEvents.map((e) => e.year)),
            end: Math.max(...allEvents.map((e) => e.year)),
          }
        : null;

    const divineEvents = allEvents.filter(
      (e) => e.importance === "divine",
    ).length;

    return {
      total: allEvents.length,
      filtered: filteredEvents.length,
      eventsByType,
      yearSpan,
      divineEvents,
    };
  }, [allEvents, filteredEvents]);

  // Available event types for filtering
  const availableTypes = useMemo(() => {
    return Array.from(new Set(allEvents.map((e) => e.type)));
  }, [allEvents]);

  // Handle event selection
  const handleEventSelect = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Handle modal navigation
  const handleModalNavigation = (direction: "next" | "previous") => {
    if (!selectedEvent) return;

    const currentIndex = filteredEvents.findIndex(
      (e) => e.id === selectedEvent.id,
    );
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < filteredEvents.length) {
      setSelectedEvent(filteredEvents[newIndex]);
    }
  };

  // Toggle type filter
  const toggleTypeFilter = (type: TimelineEventType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setYearRange({});
  };

  return (
    <DivineErrorBoundary
      componentName="EnhancedPersonTimeline"
      role={person.role || "lightworker"}
      fallback={
        <div className="p-8 text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Timeline Unavailable
          </h3>
          <p className="text-gray-600">
            We're having trouble loading {person.name}'s timeline. Please try
            again later.
          </p>
        </div>
      }
    >
      <section className={cn("space-y-8", className)}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Journey Timeline
            </h2>
          </div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the key moments, milestones, and transformations in{" "}
            {person.name}'s story
          </p>

          {/* Stats overview */}
          {showStats && (
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {timelineStats.total}
                </div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>

              {timelineStats.yearSpan && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {timelineStats.yearSpan.end -
                      timelineStats.yearSpan.start +
                      1}
                  </div>
                  <div className="text-sm text-gray-600">Years Covered</div>
                </div>
              )}

              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {timelineStats.divineEvents}
                </div>
                <div className="text-sm text-gray-600">Divine Moments</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Filters and Search */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold text-gray-900">
                    Timeline Filters
                  </h3>
                </div>

                {(searchQuery ||
                  selectedTypes.length > 0 ||
                  yearRange.start ||
                  yearRange.end) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search events, descriptions, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Event type filters */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-3">
                  Event Types
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={
                        selectedTypes.includes(type) ? "default" : "outline"
                      }
                      className="cursor-pointer transition-all"
                      onClick={() => toggleTypeFilter(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                      {timelineStats.eventsByType[type] && (
                        <span className="ml-1 text-xs">
                          ({timelineStats.eventsByType[type]})
                        </span>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Results info */}
              {filteredEvents.length !== allEvents.length && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>
                    Showing {filteredEvents.length} of {allEvents.length} events
                  </span>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredEvents.length > 0 ? (
            <InteractiveTimeline
              personId={person.id}
              events={filteredEvents}
              {...timelinePresets[variant]}
              onEventSelect={handleEventSelect}
              trackInteractions={true}
              analyticsContext="person_profile_timeline"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            />
          ) : (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <BarChart3 className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">
                  No Events Found
                </h3>
                <p className="text-gray-600">
                  {searchQuery ||
                  selectedTypes.length > 0 ||
                  yearRange.start ||
                  yearRange.end
                    ? "Try adjusting your filters to see more events."
                    : "No timeline events are available for this person."}
                </p>
                {(searchQuery ||
                  selectedTypes.length > 0 ||
                  yearRange.start ||
                  yearRange.end) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </Card>
          )}
        </motion.div>

        {/* Event Detail Modal */}
        <TimelineEventModal
          event={selectedEvent}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onNext={() => handleModalNavigation("next")}
          onPrevious={() => handleModalNavigation("previous")}
          hasNext={
            selectedEvent
              ? filteredEvents.findIndex((e) => e.id === selectedEvent.id) <
                filteredEvents.length - 1
              : false
          }
          hasPrevious={
            selectedEvent
              ? filteredEvents.findIndex((e) => e.id === selectedEvent.id) > 0
              : false
          }
        />
      </section>
    </DivineErrorBoundary>
  );
};

export default EnhancedPersonTimeline;
