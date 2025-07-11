import { BacklogItem, BacklogContext } from "./types";

interface ChatIntegrationConfig {
  apiKey: string;
  endpoint: string;
  model: string;
}

export class ChatIntegration {
  private config: ChatIntegrationConfig;
  lastSuggestionTime: number = 0;

  constructor(config: ChatIntegrationConfig) {
    this.config = config;
  }

  private calculateRelevanceScore(
    item: BacklogItem,
    contexts: BacklogContext[],
  ): number {
    // Implementation of relevance scoring
    return 0.8; // Example score
  }

  private explainRelevance(
    item: BacklogItem,
    contexts: BacklogContext[],
  ): string {
    // Implementation of relevance explanation
    return "High relevance due to current priorities"; // Example explanation
  }

  async processBacklogItems(
    items: BacklogItem[],
    contexts: BacklogContext[],
  ): Promise<BacklogItem[]> {
    return items
      .map((item) => ({
        ...item,
        createdAt: new Date("2024-03-20"), // Example date
        lastRelevant: new Date(),
        relevanceScore: this.calculateRelevanceScore(item, contexts),
        relevanceContext: this.explainRelevance(item, contexts),
      }))
      .filter((item) => item.relevanceScore > 0.5);
  }

  /**
   * Analyzes chat context to suggest relevant backlog items
   * @param message The chat message to analyze
   * @returns A suggestion string or null if no relevant items found
   */
  async analyzeChatContext(message: string): Promise<string | null> {
    // Check if we've made a suggestion recently
    if (
      this.lastSuggestionTime &&
      Date.now() - this.lastSuggestionTime < 5 * 60 * 1000
    ) {
      return null;
    }

    // Update last suggestion time
    this.lastSuggestionTime = Date.now();

    // Simple implementation for now
    if (!message || message.length < 5) return null;

    // Mock implementation that would be replaced with actual NLP analysis
    const keywords = [
      "assessment",
      "visualization",
      "documentation",
      "team",
      "analysis",
    ];
    const foundKeywords = keywords.filter((keyword) =>
      message.toLowerCase().includes(keyword),
    );

    if (foundKeywords.length === 0) return null;

    return `Related Backlog Item Found: Enhanced ${foundKeywords[0].charAt(0).toUpperCase() + foundKeywords[0].slice(1)} System
Why it matters now: This relates to your current work on ${foundKeywords.join(", ")}
When to consider: When team performance data needs visualization`;
  }
}
