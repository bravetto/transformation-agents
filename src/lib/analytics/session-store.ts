// Shared session store for analytics
// This module provides a centralized session storage for user journey tracking

interface UserJourneyEvent {
  eventType: string;
  userType: string;
  sessionId: string;
  timestamp: string;
  userId?: string;
  path?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  isDivine?: boolean;
  source?: string;
}

interface SessionData {
  events: UserJourneyEvent[];
  startTime: string;
}

// In-memory storage for development (replace with database in production)
let eventStore: UserJourneyEvent[] = [];
let sessionStore: Record<string, SessionData> = {};

// Session Store Management Functions
export const SessionStore = {
  // Add event to store
  addEvent(event: UserJourneyEvent): void {
    eventStore.push(event);

    // Update session store
    if (!sessionStore[event.sessionId]) {
      sessionStore[event.sessionId] = {
        events: [],
        startTime: event.timestamp,
      };
    }
    sessionStore[event.sessionId].events.push(event);

    // Cleanup old events (keep last 1000 events)
    if (eventStore.length > 1000) {
      eventStore = eventStore.slice(-1000);
    }

    // Cleanup old sessions (keep last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    Object.keys(sessionStore).forEach((sessionId) => {
      if (sessionStore[sessionId].startTime < oneDayAgo) {
        delete sessionStore[sessionId];
      }
    });
  },

  // Get all events
  getAllEvents(): UserJourneyEvent[] {
    return [...eventStore];
  },

  // Get events by time range
  getEventsByTimeRange(timeRangeMs: number): UserJourneyEvent[] {
    const cutoffTime = new Date(Date.now() - timeRangeMs).toISOString();
    return eventStore.filter((event) => event.timestamp > cutoffTime);
  },

  // Get session data
  getSessionData(): Record<string, SessionData> {
    return { ...sessionStore };
  },

  // Get active sessions
  getActiveSessions(timeRangeMs: number = 60 * 60 * 1000): string[] {
    const cutoffTime = new Date(Date.now() - timeRangeMs).toISOString();
    return Object.keys(sessionStore).filter((sessionId) =>
      sessionStore[sessionId].events.some(
        (event) => event.timestamp > cutoffTime,
      ),
    );
  },

  // Get session metrics
  getSessionMetrics() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();

    const recentEvents = this.getEventsByTimeRange(60 * 60 * 1000);
    const activeSessions = this.getActiveSessions();

    // Calculate event type distribution
    const eventTypes = recentEvents.reduce(
      (acc, event) => {
        acc[event.eventType] = (acc[event.eventType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate user type distribution
    const userTypes = recentEvents.reduce(
      (acc, event) => {
        acc[event.userType] = (acc[event.userType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate divine events
    const divineEvents = recentEvents.filter(
      (event) => event.isDivine || event.userType === "divine-warrior",
    );

    return {
      summary: {
        totalEvents: eventStore.length,
        recentEvents: recentEvents.length,
        activeSessions: activeSessions.length,
        lastEventTime: eventStore[eventStore.length - 1]?.timestamp || null,
      },
      metrics: {
        eventTypes,
        userTypes,
        divineEvents: divineEvents.length,
        divineEventTypes: divineEvents.reduce(
          (acc, event) => {
            acc[event.eventType] = (acc[event.eventType] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
      },
      recentEvents: recentEvents.slice(-10), // Last 10 events
    };
  },
};

export type { UserJourneyEvent, SessionData };
