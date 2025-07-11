export interface BacklogItem {
  title: string;
  description: string;
  priority: "🔥" | "⭐" | "💡" | "🔄";
  tags: string[];
  surfaceConditions: string[];
  createdAt: Date;
  lastRelevant: Date;
  relevanceScore: number;
  relevanceContext: string;
}

export interface BacklogContext {
  type: string;
  value: string;
  weight: number;
}
