import { PersonData, PersonRole } from "@/types/person";
import {
  TimelineEvent,
  TimelineEventType,
  TimelineDataExtractor,
} from "@/types/timeline";

/**
 * 🎯 TIMELINE DATA EXTRACTION UTILITIES
 * Transform PersonData into interactive timeline events
 */

/**
 * Extract timeline events from a PersonData object
 */
export function extractTimelineEvents(person: PersonData): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Extract education events
  if (person.background?.education) {
    person.background.education.forEach((edu, index) => {
      const year = parseInt(edu.year) || new Date().getFullYear();
      events.push({
        id: `${person.id}-education-${index}`,
        year,
        title: edu.degree,
        description: `${edu.institution} - ${edu.year}`,
        type: "education" as TimelineEventType,
        role: person.role || "lightworker",
        importance: "medium",
        icon: "GraduationCap",
        analyticsData: {
          category: "timeline_education",
          action: "view",
          label: edu.degree,
        },
      });
    });
  }

  // Extract professional experience
  if (person.background?.experience) {
    person.background.experience.forEach((exp, index) => {
      // Try to parse duration for start year
      const currentYear = new Date().getFullYear();
      let startYear = currentYear;

      // Simple duration parsing - could be enhanced
      if (exp.duration.includes("Present")) {
        startYear = currentYear - 5; // Assume 5 years if present
      } else if (exp.duration.includes("-")) {
        const years = exp.duration.split("-");
        startYear = parseInt(years[0]) || currentYear - 3;
      }

      events.push({
        id: `${person.id}-experience-${index}`,
        year: startYear,
        title: exp.position,
        description: `${exp.company} - ${exp.description}`,
        type: "professional" as TimelineEventType,
        role: person.role || "lightworker",
        importance: exp.duration.includes("Present") ? "high" : "medium",
        icon: "Briefcase",
        location: exp.company,
        analyticsData: {
          category: "timeline_experience",
          action: "view",
          label: exp.position,
        },
      });
    });
  }

  // Extract achievements
  if (person.achievements) {
    person.achievements.forEach((achievement, index) => {
      events.push({
        id: `${person.id}-achievement-${index}`,
        year: achievement.year || new Date().getFullYear(),
        title: achievement.title,
        description: achievement.description,
        type: "achievement" as TimelineEventType,
        role: person.role || "lightworker",
        importance: "high",
        icon: "Award",
        tags: achievement.impact ? [achievement.impact] : undefined,
        analyticsData: {
          category: "timeline_achievement",
          action: "view",
          label: achievement.title,
          value: achievement.year,
        },
      });
    });
  }

  // Extract key life events from sections
  if (person.sections) {
    person.sections.forEach((section, index) => {
      if (section.type === "testimony" && section.content) {
        const testimonyContent = section.content as any;
        if (testimonyContent.testimonies) {
          testimonyContent.testimonies.forEach(
            (testimony: any, tIndex: number) => {
              const year = testimony.date
                ? parseInt(testimony.date)
                : new Date().getFullYear();
              events.push({
                id: `${person.id}-testimony-${index}-${tIndex}`,
                year,
                title: "Personal Testimony",
                description:
                  testimony.quote.substring(0, 150) +
                  (testimony.quote.length > 150 ? "..." : ""),
                type: "transformation" as TimelineEventType,
                role: person.role || "lightworker",
                importance: "divine",
                icon: "Heart",
                analyticsData: {
                  category: "timeline_testimony",
                  action: "view",
                  label: person.name,
                },
              });
            },
          );
        }
      }
    });
  }

  // Add birth/beginning marker if we have enough data
  if (events.length > 0) {
    const earliestYear = Math.min(...events.map((e) => e.year));
    events.push({
      id: `${person.id}-beginning`,
      year: earliestYear - 20, // Approximate birth year
      title: "The Journey Begins",
      description: `${person.name}'s path toward transformation starts`,
      type: "milestone" as TimelineEventType,
      role: person.role || "lightworker",
      importance: "medium",
      icon: "Star",
      analyticsData: {
        category: "timeline_milestone",
        action: "view",
        label: "journey_beginning",
      },
    });
  }

  // Add current/future vision event
  const currentYear = new Date().getFullYear();
  events.push({
    id: `${person.id}-vision`,
    year: currentYear + 1,
    title: "Future Vision",
    description:
      person.impact?.description ||
      `${person.name} continues building bridges for transformation`,
    type: "divine" as TimelineEventType,
    role: person.role || "lightworker",
    importance: "divine",
    icon: "Eye",
    analyticsData: {
      category: "timeline_vision",
      action: "view",
      label: "future_impact",
    },
  });

  return sortTimelineEvents(events);
}

/**
 * Sort timeline events chronologically
 */
export function sortTimelineEvents(events: TimelineEvent[]): TimelineEvent[] {
  return events.sort((a, b) => {
    // Primary sort by year
    if (a.year !== b.year) {
      return a.year - b.year;
    }

    // Secondary sort by month if available
    if (a.month && b.month) {
      return a.month - b.month;
    }

    // Tertiary sort by importance
    const importanceOrder = { low: 0, medium: 1, high: 2, divine: 3 };
    const aImportance = importanceOrder[a.importance || "low"];
    const bImportance = importanceOrder[b.importance || "low"];

    return bImportance - aImportance;
  });
}

/**
 * Group events by year
 */
export function groupEventsByYear(
  events: TimelineEvent[],
): Record<number, TimelineEvent[]> {
  return events.reduce(
    (groups, event) => {
      const year = event.year;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(event);
      return groups;
    },
    {} as Record<number, TimelineEvent[]>,
  );
}

/**
 * Filter events by type
 */
export function filterEventsByType(
  events: TimelineEvent[],
  types: TimelineEventType[],
): TimelineEvent[] {
  return events.filter((event) => types.includes(event.type));
}

/**
 * Get events within a date range
 */
export function getEventsInRange(
  events: TimelineEvent[],
  startYear: number,
  endYear: number,
): TimelineEvent[] {
  return events.filter(
    (event) => event.year >= startYear && event.year <= endYear,
  );
}

/**
 * Generate role-based color for timeline events
 */
export function getTimelineEventColor(
  role: PersonRole,
  type: TimelineEventType,
): string {
  const roleColors: Record<PersonRole, string> = {
    lightworker: "#F59E0B", // Hope gold
    messenger: "#3B82F6", // Courage blue
    witness: "#10B981", // Growth green
    guardian: "#8B5CF6", // Guardian purple
  };

  const typeModifiers: Record<TimelineEventType, number> = {
    divine: 1.0,
    transformation: 0.9,
    achievement: 0.8,
    milestone: 0.7,
    professional: 0.6,
    education: 0.5,
    impact: 0.8,
  };

  const baseColor = roleColors[role] || roleColors.lightworker;
  const opacity = typeModifiers[type] || 0.7;

  return `${baseColor}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

/**
 * Generate timeline event icon based on type
 */
export function getTimelineEventIcon(type: TimelineEventType): string {
  const iconMap: Record<TimelineEventType, string> = {
    milestone: "Star",
    transformation: "Sparkles",
    divine: "Crown",
    professional: "Briefcase",
    impact: "Target",
    education: "GraduationCap",
    achievement: "Award",
  };

  return iconMap[type] || "Circle";
}

/**
 * Calculate engagement score for timeline analytics
 */
export function calculateEngagementScore(
  viewedEvents: string[],
  interactedEvents: string[],
  totalEvents: number,
  timeSpent: number,
): number {
  const viewRate = viewedEvents.length / totalEvents;
  const interactionRate = interactedEvents.length / totalEvents;
  const timeScore = Math.min(timeSpent / (totalEvents * 3000), 1); // 3 seconds per event baseline

  return Math.round(
    (viewRate * 0.4 + interactionRate * 0.4 + timeScore * 0.2) * 100,
  );
}

/**
 * Create timeline data extractor instance
 */
export const timelineExtractor: TimelineDataExtractor = {
  extractFromPerson: extractTimelineEvents,
  mergeEvents: (events: TimelineEvent[]) => {
    // Remove duplicates and merge similar events
    const merged = new Map<string, TimelineEvent>();

    events.forEach((event) => {
      const key = `${event.year}-${event.type}-${event.title}`;
      if (!merged.has(key)) {
        merged.set(key, event);
      } else {
        // Merge descriptions if different
        const existing = merged.get(key)!;
        if (existing.description !== event.description) {
          existing.description += ` • ${event.description}`;
        }
      }
    });

    return Array.from(merged.values());
  },
  sortEvents: sortTimelineEvents,
  groupByYear: groupEventsByYear,
  filterByType: filterEventsByType,
};

/**
 * Timeline configuration presets
 */
export const timelinePresets = {
  minimal: {
    showYearLabels: true,
    showProgress: false,
    showThumbnails: false,
    compactMode: true,
    orientation: "vertical" as const,
  },
  detailed: {
    showYearLabels: true,
    showProgress: true,
    showThumbnails: true,
    compactMode: false,
    orientation: "vertical" as const,
  },
  divine: {
    showYearLabels: true,
    showProgress: true,
    showThumbnails: true,
    compactMode: false,
    orientation: "vertical" as const,
    variant: "divine" as const,
  },
} as const;
