import type {
  LetterAnalyticsEvent,
  LetterAnalyticsSummary,
} from "@/types/character-witness";

// Character letter analytics tracking
export class CharacterLetterAnalytics {
  private events: LetterAnalyticsEvent[] = [];
  private isClient = typeof window !== "undefined";

  constructor() {
    if (this.isClient) {
      this.loadStoredEvents();
    }
  }

  // Track a letter analytics event
  trackEvent(event: Omit<LetterAnalyticsEvent, "timestamp">): void {
    const fullEvent: LetterAnalyticsEvent = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    this.events.push(fullEvent);

    if (this.isClient) {
      this.persistEvent(fullEvent);
      this.sendToAnalytics(fullEvent);
    }
  }

  // Track letter view
  trackLetterView(
    letterId: string,
    authorName: string,
    letterType: string,
    sourcePage: string = "unknown",
  ): void {
    this.trackEvent({
      eventType: "letter_viewed",
      letterId,
      authorName,
      letterType: letterType as any,
      metadata: {
        sourcePage,
        deviceType: this.getDeviceType(),
        userAgent: this.isClient ? navigator.userAgent : "",
      },
    });
  }

  // Track letter sharing
  trackLetterShare(
    letterId: string,
    authorName: string,
    letterType: string,
    platform: string,
    quote?: string,
  ): void {
    this.trackEvent({
      eventType: "letter_shared",
      letterId,
      authorName,
      letterType: letterType as any,
      metadata: {
        sharePlatform: platform,
        highlightedQuote: quote,
        deviceType: this.getDeviceType(),
      },
    });
  }

  // Track quote highlighting
  trackQuoteHighlight(
    letterId: string,
    authorName: string,
    letterType: string,
    quote: string,
  ): void {
    this.trackEvent({
      eventType: "quote_highlighted",
      letterId,
      authorName,
      letterType: letterType as any,
      metadata: {
        highlightedQuote: quote,
        deviceType: this.getDeviceType(),
      },
    });
  }

  // Track letter completion (read to end)
  trackLetterCompletion(
    letterId: string,
    authorName: string,
    letterType: string,
    readDuration: number,
    completionPercentage: number,
  ): void {
    this.trackEvent({
      eventType: "letter_completed",
      letterId,
      authorName,
      letterType: letterType as any,
      metadata: {
        readDuration,
        completionPercentage,
        deviceType: this.getDeviceType(),
      },
    });
  }

  // Track conversion action (email signup, etc.)
  trackConversionAction(
    letterId: string,
    authorName: string,
    letterType: string,
    conversionType: string,
  ): void {
    this.trackEvent({
      eventType: "conversion_action",
      letterId,
      authorName,
      letterType: letterType as any,
      metadata: {
        conversionType,
        deviceType: this.getDeviceType(),
      },
    });
  }

  // Get analytics summary
  getAnalyticsSummary(): LetterAnalyticsSummary {
    const letterViews = this.events.filter(
      (e) => e.eventType === "letter_viewed",
    );
    const letterShares = this.events.filter(
      (e) => e.eventType === "letter_shared",
    );
    const quoteHighlights = this.events.filter(
      (e) => e.eventType === "quote_highlighted",
    );
    const conversions = this.events.filter(
      (e) => e.eventType === "conversion_action",
    );

    // Calculate top performing letters
    const letterPerformance = new Map<string, number>();
    this.events.forEach((event) => {
      const currentScore = letterPerformance.get(event.letterId) || 0;
      let scoreIncrement = 0;

      switch (event.eventType) {
        case "letter_viewed":
          scoreIncrement = 1;
          break;
        case "letter_shared":
          scoreIncrement = 5;
          break;
        case "quote_highlighted":
          scoreIncrement = 2;
          break;
        case "letter_completed":
          scoreIncrement = 3;
          break;
        case "conversion_action":
          scoreIncrement = 10;
          break;
      }

      letterPerformance.set(event.letterId, currentScore + scoreIncrement);
    });

    const topPerformingLetters = Array.from(letterPerformance.entries())
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(0, 5)
      .map(([letterId]) => letterId);

    // Calculate most shared quotes
    const quoteShares = new Map<
      string,
      { quote: string; letterId: string; count: number }
    >();
    quoteHighlights.forEach((event) => {
      const quote = event.metadata.highlightedQuote;
      if (quote) {
        const key = `${event.letterId}-${quote}`;
        const existing = quoteShares.get(key);
        if (existing) {
          existing.count++;
        } else {
          quoteShares.set(key, {
            quote,
            letterId: event.letterId,
            count: 1,
          });
        }
      }
    });

    const mostSharedQuotes = Array.from(quoteShares.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((item) => ({
        quote: item.quote,
        letterId: item.letterId,
        shareCount: item.count,
      }));

    // Calculate average read time
    const completedReads = this.events.filter(
      (e) => e.eventType === "letter_completed" && e.metadata.readDuration,
    );
    const averageReadTime =
      completedReads.length > 0
        ? completedReads.reduce(
            (sum, event) => sum + (event.metadata.readDuration || 0),
            0,
          ) / completedReads.length
        : 0;

    // Calculate conversion rate
    const uniqueLetterViews = new Set(
      letterViews.map((e) => `${e.letterId}-${e.metadata.userAgent}`),
    ).size;
    const conversionRate =
      uniqueLetterViews > 0
        ? (conversions.length / uniqueLetterViews) * 100
        : 0;

    // Calculate engagement score (0-100)
    const viewsWeight = Math.min(letterViews.length / 100, 1) * 30; // Max 30 points
    const sharesWeight = Math.min(letterShares.length / 50, 1) * 25; // Max 25 points
    const highlightsWeight = Math.min(quoteHighlights.length / 100, 1) * 25; // Max 25 points
    const conversionsWeight = Math.min(conversions.length / 20, 1) * 20; // Max 20 points

    const engagementScore =
      viewsWeight + sharesWeight + highlightsWeight + conversionsWeight;

    return {
      totalLetters: new Set(this.events.map((e) => e.letterId)).size,
      totalViews: letterViews.length,
      averageReadTime,
      topPerformingLetters,
      mostSharedQuotes,
      conversionRate,
      engagementScore: Math.round(engagementScore),
    };
  }

  // Get letter-specific analytics
  getLetterAnalytics(letterId: string) {
    const letterEvents = this.events.filter((e) => e.letterId === letterId);

    const views = letterEvents.filter(
      (e) => e.eventType === "letter_viewed",
    ).length;
    const shares = letterEvents.filter(
      (e) => e.eventType === "letter_shared",
    ).length;
    const highlights = letterEvents.filter(
      (e) => e.eventType === "quote_highlighted",
    ).length;
    const completions = letterEvents.filter(
      (e) => e.eventType === "letter_completed",
    );
    const conversions = letterEvents.filter(
      (e) => e.eventType === "conversion_action",
    ).length;

    const averageReadTime =
      completions.length > 0
        ? completions.reduce(
            (sum, event) => sum + (event.metadata.readDuration || 0),
            0,
          ) / completions.length
        : 0;

    const completionRate = views > 0 ? (completions.length / views) * 100 : 0;

    return {
      letterId,
      views,
      shares,
      highlights,
      completions: completions.length,
      conversions,
      averageReadTime,
      completionRate,
      lastViewed: letterEvents
        .filter((e) => e.eventType === "letter_viewed")
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        )[0]?.timestamp,
    };
  }

  // Private methods
  private getDeviceType(): string {
    if (!this.isClient) return "server";

    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  private persistEvent(event: LetterAnalyticsEvent): void {
    if (!this.isClient) return;

    try {
      const stored = localStorage.getItem("character-letter-analytics");
      const events: LetterAnalyticsEvent[] = stored ? JSON.parse(stored) : [];
      events.push(event);

      // Keep only last 1000 events to prevent storage bloat
      const recentEvents = events.slice(-1000);
      localStorage.setItem(
        "character-letter-analytics",
        JSON.stringify(recentEvents),
      );
    } catch (error) {
      console.warn("Failed to persist letter analytics:", error);
    }
  }

  private loadStoredEvents(): void {
    if (!this.isClient) return;

    try {
      const stored = localStorage.getItem("character-letter-analytics");
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (error) {
      console.warn("Failed to load stored letter analytics:", error);
      this.events = [];
    }
  }

  private async sendToAnalytics(event: LetterAnalyticsEvent): Promise<void> {
    if (!this.isClient) return;

    try {
      // Send to divine analytics system
      const response = await fetch("/api/analytics/character-letters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        console.warn("Failed to send letter analytics to server");
      }
    } catch (error) {
      console.warn("Error sending letter analytics:", error);
    }
  }

  // Clear analytics data (for testing/reset)
  clearData(): void {
    this.events = [];
    if (this.isClient) {
      localStorage.removeItem("character-letter-analytics");
    }
  }

  // Export data for analysis
  exportData(): LetterAnalyticsEvent[] {
    return [...this.events];
  }
}

// Singleton instance
export const letterAnalytics = new CharacterLetterAnalytics();

// Convenience functions for easy use in components
export const trackLetterView = (
  letterId: string,
  authorName: string,
  letterType: string,
  sourcePage?: string,
) =>
  letterAnalytics.trackLetterView(letterId, authorName, letterType, sourcePage);

export const trackLetterShare = (
  letterId: string,
  authorName: string,
  letterType: string,
  platform: string,
  quote?: string,
) =>
  letterAnalytics.trackLetterShare(
    letterId,
    authorName,
    letterType,
    platform,
    quote,
  );

export const trackQuoteHighlight = (
  letterId: string,
  authorName: string,
  letterType: string,
  quote: string,
) =>
  letterAnalytics.trackQuoteHighlight(letterId, authorName, letterType, quote);

export const trackLetterCompletion = (
  letterId: string,
  authorName: string,
  letterType: string,
  readDuration: number,
  completionPercentage: number,
) =>
  letterAnalytics.trackLetterCompletion(
    letterId,
    authorName,
    letterType,
    readDuration,
    completionPercentage,
  );

export const trackConversionAction = (
  letterId: string,
  authorName: string,
  letterType: string,
  conversionType: string,
) =>
  letterAnalytics.trackConversionAction(
    letterId,
    authorName,
    letterType,
    conversionType,
  );
