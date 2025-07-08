import { z } from "zod";
import { reminderSystem } from "./reminder-system";
import { formatDistanceToNow } from "date-fns";

// Enhanced BacklogItem type with timestamps and relevance scoring
const BacklogItemWithMeta = z.object({
  title: z.string(),
  priority: z.enum(["🔥", "⭐", "💡", "🔄"]),
  tags: z.array(z.string()),
  description: z.string(),
  surfaceConditions: z.array(z.string()),
  createdAt: z.date(),
  lastRelevant: z.date(),
  relevanceScore: z.number(),
  relevanceContext: z.string(),
});

type BacklogItemWithMetaType = z.infer<typeof BacklogItemWithMeta>;

export class ChatBacklogIntegration {
  private static instance: ChatBacklogIntegration;
  private contextHistory: string[] = [];
  private lastSuggestion: Date | null = null;
  private MIN_SUGGESTION_INTERVAL = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  static getInstance(): ChatBacklogIntegration {
    if (!ChatBacklogIntegration.instance) {
      ChatBacklogIntegration.instance = new ChatBacklogIntegration();
    }
    return ChatBacklogIntegration.instance;
  }

  /**
   * Analyzes chat context and suggests relevant backlog items
   */
  async analyzeChatContext(userMessage: string): Promise<string | null> {
    // Don't suggest too frequently
    if (
      this.lastSuggestion &&
      Date.now() - this.lastSuggestion.getTime() < this.MIN_SUGGESTION_INTERVAL
    ) {
      return null;
    }

    // Extract contexts from the message
    const contexts = this.extractContexts(userMessage);
    if (contexts.length === 0) return null;

    // Update context history
    this.contextHistory = [...this.contextHistory, ...contexts].slice(-10);

    // Get relevant items
    const relevantItems = await this.findRelevantItems(contexts);
    if (relevantItems.length === 0) return null;

    // Format suggestion message
    const suggestion = this.formatSuggestion(relevantItems[0], contexts);

    this.lastSuggestion = new Date();
    return suggestion;
  }

  private extractContexts(message: string): string[] {
    const contexts = new Set<string>();

    // Check for context keywords
    const contextMap = {
      "#assessment": ["assessment", "evaluate", "measure", "score", "test"],
      "#visualization": ["visual", "display", "show", "graph", "chart"],
      "#analysis": ["analyze", "study", "examine", "investigate"],
      "#automation": ["automate", "schedule", "trigger", "workflow"],
      "#documentation": ["document", "guide", "explain", "instruction"],
      "#team": ["team", "group", "collaborate", "together"],
      "#strategy": ["strategy", "plan", "approach", "method"],
      "#integration": ["integrate", "connect", "link", "combine"],
    };

    // Check each context's keywords
    Object.entries(contextMap).forEach(([context, keywords]) => {
      if (
        keywords.some((keyword) =>
          message.toLowerCase().includes(keyword.toLowerCase()),
        )
      ) {
        contexts.add(context);
      }
    });

    return Array.from(contexts);
  }

  private async findRelevantItems(
    contexts: string[],
  ): Promise<BacklogItemWithMetaType[]> {
    const items = await reminderSystem.getBacklogItems();

    return items
      .map((item) => ({
        ...item,
        createdAt: new Date("2024-03-20"), // Example date, should be stored in BACKLOG.md
        lastRelevant: new Date(),
        relevanceScore: this.calculateRelevanceScore(item, contexts),
        relevanceContext: this.explainRelevance(item, contexts),
      }))
      .filter((item) => item.relevanceScore > 0.5)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  private calculateRelevanceScore(
    item: {
      title: string;
      description: string;
      priority: "🔥" | "⭐" | "💡" | "🔄";
      tags: string[];
      surfaceConditions: string[];
    },
    currentContexts: string[],
  ): number {
    let score = 0;

    // Context match score (0.6 weight)
    const contextMatchScore =
      item.tags.filter((tag) => currentContexts.includes(tag)).length /
      Math.max(currentContexts.length, item.tags.length);
    score += contextMatchScore * 0.6;

    // Priority score (0.4 weight)
    const priorityScores = { "🔥": 1, "⭐": 0.7, "💡": 0.4, "🔄": 0.3 };
    score += priorityScores[item.priority] * 0.4;

    return score;
  }

  private explainRelevance(
    item: {
      title: string;
      description: string;
      priority: "🔥" | "⭐" | "💡" | "🔄";
      tags: string[];
      surfaceConditions: string[];
    },
    currentContexts: string[],
  ): string {
    const matchingTags = item.tags.filter((tag) =>
      currentContexts.includes(tag),
    );

    const contextExplanation = matchingTags
      .map((tag) => {
        switch (tag) {
          case "#assessment":
            return "assessment and evaluation processes";
          case "#visualization":
            return "data visualization and display features";
          case "#analysis":
            return "analytical capabilities";
          case "#automation":
            return "automation and workflow improvements";
          case "#documentation":
            return "documentation and guides";
          case "#team":
            return "team collaboration features";
          case "#strategy":
            return "strategic planning aspects";
          case "#integration":
            return "system integration capabilities";
          default:
            return tag.replace("#", "");
        }
      })
      .join(" and ");

    return `This item relates to your current work on ${contextExplanation}`;
  }

  private formatSuggestion(
    item: BacklogItemWithMetaType,
    contexts: string[],
  ): string {
    const timeAgo = formatDistanceToNow(item.createdAt, { addSuffix: true });

    return `
📋 **Related Backlog Item Found**

I noticed you're working on ${contexts.join(", ")}. This reminded me of a backlog item from ${timeAgo}:

${item.priority} **${item.title}**

${item.relevanceContext}

**Why it matters now:**
${item.description}

**When to consider:**
${item.surfaceConditions.map((c) => `- ${c}`).join("\n")}

Would you like to review this item in detail or discuss how it fits into your current work?
`;
  }
}

export const chatBacklog = ChatBacklogIntegration.getInstance();
