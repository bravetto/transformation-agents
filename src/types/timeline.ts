import { PersonRole, PersonData } from "./person";

/**
 * 🌟 INTERACTIVE TIMELINE SYSTEM TYPES
 * Building upon championship-level foundation with divine-aligned timeline events
 */

export type TimelineEventType =
  | "milestone"
  | "transformation"
  | "divine"
  | "professional"
  | "impact"
  | "education"
  | "achievement";

export interface TimelineEvent {
  id: string;
  year: number;
  month?: number; // Optional month for more precise dating
  title: string;
  description?: string;
  type: TimelineEventType;

  // Media attachments
  media?: {
    type: "image" | "video" | "audio" | "document";
    url: string;
    thumbnailUrl?: string;
    caption?: string;
    alt?: string;
  };

  // Role-based theming
  role?: PersonRole;

  // Visual customization
  icon?: string; // Icon name or SVG path
  color?: string; // Custom color override
  importance?: "low" | "medium" | "high" | "divine"; // Visual prominence

  // Context and relationships
  relatedPeople?: string[]; // IDs of related people
  tags?: string[];
  location?: string;

  // Interaction tracking
  analyticsData?: {
    category: string;
    action: string;
    label?: string;
    value?: number;
  };
}

export interface TimelineSection {
  id: string;
  title: string;
  description?: string;
  period: {
    start: number; // Year
    end?: number; // Year, optional for ongoing
  };
  events: TimelineEvent[];
  type: "chronological" | "thematic" | "impact";
}

export interface InteractiveTimelineProps {
  personId: string;
  events: TimelineEvent[];

  // Layout options
  orientation?: "vertical" | "horizontal";
  variant?: "minimal" | "detailed" | "divine" | "professional";

  // Interaction settings
  enableHover?: boolean;
  enableClick?: boolean;
  enableKeyboard?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;

  // Visual customization
  showYearLabels?: boolean;
  showProgress?: boolean;
  showThumbnails?: boolean;
  compactMode?: boolean;

  // Accessibility
  ariaLabel?: string;
  announceChanges?: boolean;

  // Analytics integration
  trackInteractions?: boolean;
  analyticsContext?: string;

  // Performance
  lazyLoad?: boolean;
  virtualizeEvents?: boolean;

  // Callbacks
  onEventSelect?: (event: TimelineEvent) => void;
  onEventHover?: (event: TimelineEvent | null) => void;
  onSectionChange?: (section: TimelineSection) => void;
  onInteraction?: (type: string, event: TimelineEvent) => void;

  // Responsive behavior
  breakpoints?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };

  className?: string;
  style?: React.CSSProperties;
}

export interface TimelineInteractionEvent {
  type: "view" | "hover" | "click" | "focus" | "scroll";
  eventId: string;
  timestamp: number;
  duration?: number; // For view/hover events
  viewport?: {
    width: number;
    height: number;
  };
  position?: {
    x: number;
    y: number;
  };
}

export interface TimelineAnalytics {
  sessionId: string;
  personId: string;
  totalEvents: number;
  viewedEvents: string[];
  interactedEvents: string[];
  timeSpent: number;
  completionRate: number;
  engagementScore: number;
  interactions: TimelineInteractionEvent[];
}

/**
 * Helper function to extract timeline events from PersonData
 */
export interface TimelineDataExtractor {
  extractFromPerson: (person: PersonData) => TimelineEvent[];
  mergeEvents: (events: TimelineEvent[]) => TimelineEvent[];
  sortEvents: (events: TimelineEvent[]) => TimelineEvent[];
  groupByYear: (events: TimelineEvent[]) => Record<number, TimelineEvent[]>;
  filterByType: (
    events: TimelineEvent[],
    types: TimelineEventType[],
  ) => TimelineEvent[];
}

/**
 * Configuration for timeline appearance and behavior
 */
export interface TimelineConfig {
  // Visual theme
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    border: string;
  };

  // Animation settings
  animations: {
    enabled: boolean;
    duration: number;
    easing: string;
    stagger: number;
  };

  // Responsive breakpoints
  responsive: {
    mobile: {
      orientation: "vertical" | "horizontal";
      eventsPerView: number;
      showLabels: boolean;
    };
    tablet: {
      orientation: "vertical" | "horizontal";
      eventsPerView: number;
      showLabels: boolean;
    };
    desktop: {
      orientation: "vertical" | "horizontal";
      eventsPerView: number;
      showLabels: boolean;
    };
  };

  // Performance settings
  performance: {
    lazyLoad: boolean;
    virtualScrolling: boolean;
    imagePreloading: boolean;
    debounceMs: number;
  };
}

export type TimelineState = {
  activeEvent: TimelineEvent | null;
  hoveredEvent: TimelineEvent | null;
  visibleEvents: TimelineEvent[];
  loadedEvents: TimelineEvent[];
  isPlaying: boolean;
  currentSection: TimelineSection | null;
  scrollPosition: number;
  viewportSize: { width: number; height: number };
  analytics: TimelineAnalytics;
};

/**
 * Hook return type for useInteractiveTimeline
 */
export interface UseInteractiveTimelineReturn {
  state: TimelineState;
  actions: {
    selectEvent: (event: TimelineEvent) => void;
    hoverEvent: (event: TimelineEvent | null) => void;
    playTimeline: () => void;
    pauseTimeline: () => void;
    nextEvent: () => void;
    previousEvent: () => void;
    jumpToYear: (year: number) => void;
    resetTimeline: () => void;
  };
  refs: {
    containerRef: React.RefObject<HTMLDivElement>;
    timelineRef: React.RefObject<HTMLDivElement>;
    eventsRef: React.RefObject<HTMLDivElement[]>;
  };
  utils: {
    getEventsByYear: (year: number) => TimelineEvent[];
    getVisibleEvents: () => TimelineEvent[];
    getAnalytics: () => TimelineAnalytics;
    exportTimeline: () => TimelineEvent[];
  };
}
