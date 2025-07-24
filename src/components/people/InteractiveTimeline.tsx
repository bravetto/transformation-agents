"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Star,
  Sparkles,
  Crown,
  Briefcase,
  Target,
  GraduationCap,
  Award,
  Circle,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Eye,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  trackModalInteraction,
  trackPathProgression,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";
import {
  InteractiveTimelineProps,
  TimelineEvent,
  TimelineInteractionEvent,
  TimelineAnalytics,
  UseInteractiveTimelineReturn,
  TimelineState,
} from "@/types/timeline";
import {
  getTimelineEventColor,
  getTimelineEventIcon,
  calculateEngagementScore,
} from "@/lib/timeline-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Icon mapping for timeline events
const iconComponents = {
  Star,
  Sparkles,
  Crown,
  Briefcase,
  Target,
  GraduationCap,
  Award,
  Circle,
  Eye,
  Heart,
} as const;

/**
 * 🌟 INTERACTIVE TIMELINE HOOK
 * Manages timeline state, interactions, and analytics
 */
function useInteractiveTimeline(
  events: TimelineEvent[],
  personId: string,
  trackInteractions = true,
): UseInteractiveTimelineReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement[]>([]);

  // Core state
  const [state, setState] = useState<TimelineState>({
    activeEvent: null,
    hoveredEvent: null,
    visibleEvents: [],
    loadedEvents: events.slice(0, 5), // Initial load
    isPlaying: false,
    currentSection: null,
    scrollPosition: 0,
    viewportSize: { width: 0, height: 0 },
    analytics: {
      sessionId: `timeline-${personId}-${Date.now()}`,
      personId,
      totalEvents: events.length,
      viewedEvents: [],
      interactedEvents: [],
      timeSpent: 0,
      completionRate: 0,
      engagementScore: 0,
      interactions: [],
    },
  });

  // Track analytics
  const trackTimelineInteraction = useCallback(
    (
      type: TimelineInteractionEvent["type"],
      event: TimelineEvent,
      duration?: number,
    ) => {
      if (!trackInteractions) return;

      const interaction: TimelineInteractionEvent = {
        type,
        eventId: event.id,
        timestamp: Date.now(),
        duration,
        viewport: state.viewportSize,
      };

      setState((prev) => ({
        ...prev,
        analytics: {
          ...prev.analytics,
          interactions: [...prev.analytics.interactions, interaction],
          interactedEvents:
            type === "click" || type === "focus"
              ? [...new Set([...prev.analytics.interactedEvents, event.id])]
              : prev.analytics.interactedEvents,
          viewedEvents:
            type === "view"
              ? [...new Set([...prev.analytics.viewedEvents, event.id])]
              : prev.analytics.viewedEvents,
        },
      }));

      // Send to existing analytics system
      trackModalInteraction({
        eventType: "card_hovered",
        userType: getCurrentUserType(),
        metadata: {
          timelineEvent: event.id,
          interactionType: type,
          personId,
          eventYear: event.year,
          eventType: event.type,
          duration,
        },
      });
    },
    [trackInteractions, personId, state.viewportSize],
  );

  // Actions
  const actions = useMemo(
    () => ({
      selectEvent: (event: TimelineEvent) => {
        setState((prev) => ({ ...prev, activeEvent: event }));
        trackTimelineInteraction("click", event);
      },

      hoverEvent: (event: TimelineEvent | null) => {
        setState((prev) => ({ ...prev, hoveredEvent: event }));
        if (event) {
          trackTimelineInteraction("hover", event);
        }
      },

      playTimeline: () => {
        setState((prev) => ({ ...prev, isPlaying: true }));
        trackPathProgression({
          eventType: "step_started",
          userType: getCurrentUserType(),
          currentStep: "timeline_autoplay",
          metadata: { personId },
        });
      },

      pauseTimeline: () => {
        setState((prev) => ({ ...prev, isPlaying: false }));
      },

      nextEvent: () => {
        const currentIndex = events.findIndex(
          (e) => e.id === state.activeEvent?.id,
        );
        const nextEvent = events[currentIndex + 1];
        if (nextEvent) {
          setState((prev) => ({ ...prev, activeEvent: nextEvent }));
          trackTimelineInteraction("click", nextEvent);
        }
      },

      previousEvent: () => {
        const currentIndex = events.findIndex(
          (e) => e.id === state.activeEvent?.id,
        );
        const prevEvent = events[currentIndex - 1];
        if (prevEvent) {
          setState((prev) => ({ ...prev, activeEvent: prevEvent }));
          trackTimelineInteraction("click", prevEvent);
        }
      },

      jumpToYear: (year: number) => {
        const eventInYear = events.find((e) => e.year === year);
        if (eventInYear) {
          setState((prev) => ({ ...prev, activeEvent: eventInYear }));
          trackTimelineInteraction("click", eventInYear);
        }
      },

      resetTimeline: () => {
        setState((prev) => ({
          ...prev,
          activeEvent: null,
          hoveredEvent: null,
          isPlaying: false,
        }));
      },
    }),
    [events, state.activeEvent, personId, trackTimelineInteraction],
  );

  // Utilities
  const utils = useMemo(
    () => ({
      getEventsByYear: (year: number) => events.filter((e) => e.year === year),
      getVisibleEvents: () => state.visibleEvents,
      getAnalytics: () => ({
        ...state.analytics,
        completionRate: state.analytics.viewedEvents.length / events.length,
        engagementScore: calculateEngagementScore(
          state.analytics.viewedEvents,
          state.analytics.interactedEvents,
          events.length,
          state.analytics.timeSpent,
        ),
      }),
      exportTimeline: () => events,
    }),
    [events, state],
  );

  // Update viewport size
  useEffect(() => {
    const updateViewport = () => {
      setState((prev) => ({
        ...prev,
        viewportSize: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      }));
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return {
    state,
    actions,
    refs: { containerRef, timelineRef, eventsRef },
    utils,
  };
}

/**
 * 🎨 TIMELINE EVENT COMPONENT
 * Individual timeline event with animations and interactions
 */
const TimelineEventComponent = React.memo<{
  event: TimelineEvent;
  isActive: boolean;
  isHovered: boolean;
  index: number;
  onSelect: (event: TimelineEvent) => void;
  onHover: (event: TimelineEvent | null) => void;
  className?: string;
}>(({ event, isActive, isHovered, index, onSelect, onHover, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  // Get appropriate icon
  const IconComponent =
    iconComponents[
      getTimelineEventIcon(event.type) as keyof typeof iconComponents
    ] || Circle;

  // Role-based styling
  const roleColors = {
    lightworker: "from-amber-400 to-orange-500",
    messenger: "from-blue-400 to-indigo-600",
    witness: "from-green-400 to-emerald-600",
    guardian: "from-purple-400 to-violet-600",
  };

  const gradientColor = roleColors[event.role || "lightworker"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: isActive ? 1.05 : isHovered ? 1.02 : 1,
            }
          : { opacity: 0, y: 50, scale: 0.8 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className={cn(
        "relative group cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        event.role === "lightworker" && "focus:ring-amber-500",
        event.role === "messenger" && "focus:ring-blue-500",
        event.role === "witness" && "focus:ring-green-500",
        event.role === "guardian" && "focus:ring-purple-500",
        className,
      )}
      onClick={() => onSelect(event)}
      onMouseEnter={() => onHover(event)}
      onMouseLeave={() => onHover(null)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(event);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Timeline event: ${event.title} in ${event.year}`}
    >
      {/* Timeline connector line */}
      <div
        className={cn(
          "absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b opacity-30",
          gradientColor,
        )}
      />

      {/* Event card */}
      <Card
        variant={isActive ? "divine" : "default"}
        padding="medium"
        shadow={isActive ? "lg" : "sm"}
        className={cn(
          "ml-16 transition-all duration-300",
          isActive && "border-2 shadow-xl",
          isHovered && "shadow-md transform scale-[1.02]",
        )}
      >
        {/* Year badge */}
        <div className="flex items-start justify-between mb-3">
          <Badge
            variant={event.importance === "divine" ? "primary" : "default"}
            size="sm"
          >
            {event.year}
          </Badge>

          {event.importance === "divine" && (
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.div>
          )}
        </div>

        {/* Event content */}
        <div className="flex items-start gap-3">
          {/* Icon */}
          <motion.div
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
              "bg-gradient-to-br shadow-md",
              gradientColor,
            )}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <IconComponent className="w-5 h-5 text-white" />
          </motion.div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-1 leading-tight">
              {event.title}
            </h4>

            {event.description && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {event.description}
              </p>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {event.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>
      </Card>

      {/* Timeline dot */}
      <motion.div
        className={cn(
          "absolute left-6 top-8 w-4 h-4 rounded-full border-4 border-white shadow-md",
          "bg-gradient-to-br",
          gradientColor,
        )}
        animate={{
          scale: isActive ? 1.3 : isHovered ? 1.1 : 1,
          boxShadow: isActive
            ? "0 0 0 8px rgba(59, 130, 246, 0.1)"
            : "0 0 0 0px transparent",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </motion.div>
  );
});

TimelineEventComponent.displayName = "TimelineEventComponent";

/**
 * 🚀 MAIN INTERACTIVE TIMELINE COMPONENT
 */
const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  personId,
  events,
  orientation = "vertical",
  variant = "detailed",
  enableHover = true,
  enableClick = true,
  enableKeyboard = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  showYearLabels = true,
  showProgress = true,
  showThumbnails = false,
  compactMode = false,
  ariaLabel,
  announceChanges = true,
  trackInteractions = true,
  analyticsContext = "person_timeline",
  lazyLoad = true,
  onEventSelect,
  onEventHover,
  onInteraction,
  className,
  ...props
}) => {
  const { state, actions, refs, utils } = useInteractiveTimeline(
    events,
    personId,
    trackInteractions,
  );

  const { scrollYProgress } = useScroll({
    target: refs.containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  // Handle event interactions
  const handleEventSelect = useCallback(
    (event: TimelineEvent) => {
      if (!enableClick) return;

      actions.selectEvent(event);
      onEventSelect?.(event);
      onInteraction?.("select", event);
    },
    [enableClick, actions, onEventSelect, onInteraction],
  );

  const handleEventHover = useCallback(
    (event: TimelineEvent | null) => {
      if (!enableHover) return;

      actions.hoverEvent(event);
      onEventHover?.(event);
      if (event) onInteraction?.("hover", event);
    },
    [enableHover, actions, onEventHover, onInteraction],
  );

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          actions.nextEvent();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          actions.previousEvent();
          break;
        case " ":
          e.preventDefault();
          if (state.isPlaying) {
            actions.pauseTimeline();
          } else {
            actions.playTimeline();
          }
          break;
        case "Escape":
          actions.resetTimeline();
          break;
      }
    };

    if (refs.containerRef.current) {
      refs.containerRef.current.addEventListener("keydown", handleKeyDown);
      return () =>
        refs.containerRef.current?.removeEventListener(
          "keydown",
          handleKeyDown,
        );
    }
  }, [enableKeyboard, actions, state.isPlaying, refs.containerRef]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !state.isPlaying) return;

    const interval = setInterval(() => {
      actions.nextEvent();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, state.isPlaying, autoPlayInterval, actions]);

  return (
    <motion.div
      ref={refs.containerRef}
      style={{ opacity, scale }}
      className={cn(
        "interactive-timeline relative",
        "focus:outline-none",
        className,
      )}
      role="region"
      aria-label={ariaLabel || `${personId} interactive timeline`}
      tabIndex={0}
      {...props}
    >
      {/* Header controls */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Journey Timeline
          </h3>
          <p className="text-gray-600">
            Explore key moments in {personId.replace("-", " ")}'s
            transformational journey
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={
              state.isPlaying ? actions.pauseTimeline : actions.playTimeline
            }
          >
            {state.isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={actions.previousEvent}
            disabled={!state.activeEvent}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={actions.nextEvent}
            disabled={!state.activeEvent}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      {showProgress && (
        <div className="relative mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              style={{
                width: `${(state.analytics.viewedEvents.length / events.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Progress: {state.analytics.viewedEvents.length} of {events.length}{" "}
            events viewed
          </div>
        </div>
      )}

      {/* Timeline */}
      <div
        ref={refs.timelineRef}
        className={cn(
          "relative",
          orientation === "horizontal"
            ? "flex gap-6 overflow-x-auto pb-4"
            : "space-y-8",
        )}
      >
        {/* Timeline line */}
        <div
          className={cn(
            "absolute bg-gray-300",
            orientation === "horizontal"
              ? "top-8 h-0.5 w-full"
              : "left-8 w-0.5 h-full",
          )}
        />

        {/* Events */}
        {events.map((event, index) => (
          <TimelineEventComponent
            key={event.id}
            event={event}
            isActive={state.activeEvent?.id === event.id}
            isHovered={state.hoveredEvent?.id === event.id}
            index={index}
            onSelect={handleEventSelect}
            onHover={handleEventHover}
            className={compactMode ? "text-sm" : ""}
          />
        ))}
      </div>

      {/* Analytics summary (dev mode) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
          <h4 className="font-semibold mb-2">Timeline Analytics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div>
                Events Viewed: {state.analytics.viewedEvents.length}/
                {events.length}
              </div>
              <div>Interactions: {state.analytics.interactions.length}</div>
            </div>
            <div>
              <div>
                Completion:{" "}
                {Math.round(
                  (state.analytics.viewedEvents.length / events.length) * 100,
                )}
                %
              </div>
              <div>
                Engagement Score: {utils.getAnalytics().engagementScore}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InteractiveTimeline;
