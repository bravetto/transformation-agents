import { PersonalityConfig } from "./personality";

/**
 * User profile information for personalization
 */
export interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  interests?: string[];
  previousInteractions?: string[];
  relationshipToProject?: string;
  preferredCommunicationStyle?:
    | "direct"
    | "supportive"
    | "analytical"
    | "inspirational";
  personalValues?: string[];
  background?: string;
}

/**
 * Conversation context information
 */
export interface ConversationContext {
  goals: string[];
  stage: "initial" | "exploration" | "guidance" | "action" | "reflection";
  currentTopic?: string;
  previousTopics?: string[];
  recentMessages?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  timeOfDay?: string;
  userMood?: string;
  engagementLevel?: "low" | "medium" | "high";
  goalProgress?: number;
  settings?: {
    formality?: "casual" | "neutral" | "formal";
    detailLevel?: "concise" | "balanced" | "detailed";
    tone?: "empathetic" | "neutral" | "authoritative";
  };
}

/**
 * AI personality configuration
 */
export interface AIPersonality {
  name: string;
  description: string;
  role: string;
  background: string;
  expertise: string[];
  values: string[];
  communicationStyle: string;
  traits: string[];
  voiceExamples: string[];
  avoids: string[];
  responseStyle: "formal" | "casual" | "divine" | "technical";

  // Optional specialized fields
  faithPerspective?: string;
  leadershipStyle?: string;
  mentorshipApproach?: string;
  technicalExpertise?: string;
  advocacyStyle?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Interface for dynamic prompt templates
 */
export interface PromptTemplate {
  /**
   * Compile a system prompt based on personality, context, and user profile
   */
  compileSystemPrompt(
    personality: AIPersonality,
    context: ConversationContext,
    userProfile?: UserProfile,
  ): string;

  /**
   * Inject dynamic variables into a template string
   */
  injectVariables(template: string, variables: Record<string, unknown>): string;

  /**
   * Adapt a base prompt based on conversation context
   */
  adaptForContext(
    basePrompt: string,
    context: {
      timeOfDay?: string;
      userMood?: string;
      conversationStage?: string;
      previousTopics?: string[];
      goalProgress?: number;
    },
  ): string;
}

/**
 * Template section with content and priority
 */
export interface TemplateSection {
  id: string;
  name: string;
  content: string;
  variables: string[];
  order: number;
  priority: number;
  isRequired: boolean;
  condition?: (
    context: ConversationContext,
    userProfile?: UserProfile,
  ) => boolean;
}

/**
 * Configuration for a prompt template
 */
export interface PromptTemplateConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  sections: TemplateSection[];
  variables: string[];
  metadata: any;
  contextAdaptations?: {
    timeOfDay?: Record<string, string>;
    userMood?: Record<string, string>;
    conversationStage?: Record<string, string>;
    lowEngagement?: string;
    highProgress?: string;
  };
}

// --- Versioning ---

/**
 * Prompt template version history
 */
export interface PromptTemplateVersion {
  id: string;
  templateId: string;
  version: string;
  config: PromptTemplateConfig;
  createdAt: Date;
  createdBy?: string;
  isActive: boolean;
  notes?: string;
  performanceMetrics?: PromptPerformanceMetrics;
  abTestResults?: ABTestResult[];
}

/**
 * Results from A/B testing two template versions
 */
export interface ABTestResult {
  id: string;
  testName: string;
  versionA: string; // version id
  versionB: string; // version id
  startDate: Date;
  endDate?: Date;
  sampleSize: number;
  metrics: {
    versionA: PromptPerformanceMetrics;
    versionB: PromptPerformanceMetrics;
    winningVersion?: string;
    confidenceLevel?: number;
  };
  status: "running" | "completed" | "cancelled";
  conclusion?: string;
}

// --- Analytics ---

/**
 * Performance metrics for prompt templates
 */
export interface PromptPerformanceMetrics {
  engagementRate: number;
  completionRate: number;
  averageConversationLength: number;
  averageResponseTime: number;
  costPerInteraction: number;
  tokenUsage: {
    prompt: number;
    completion: number;
    total: number;
  };
  topicDistribution: Record<string, number>;
  userSatisfactionScore?: number;
  goalCompletionRate?: number;
}

/**
 * Record of a single prompt usage
 */
export interface PromptUsageRecord {
  id: string;
  timestamp: Date;
  templateId: string;
  templateVersion: string;
  personalityId: string;
  sessionId: string;
  userId?: string;
  promptTokens: number;
  completionTokens: number;
  responseTimeMs: number;
  conversationLength: number;
  wasHelpful?: boolean;
  topic?: string;
  goalAchieved?: boolean;
  userRating?: number;
  userFeedback?: string;
  error?: string;
}

// --- Safety and Controls ---

/**
 * Safety check result for a prompt
 */
export interface SafetyCheckResult {
  isPassing: boolean;
  score: number;
  flaggedIssues: Array<{
    type:
      | "bias"
      | "harmful_content"
      | "personal_info"
      | "security_risk"
      | "other";
    severity: "low" | "medium" | "high";
    description: string;
    suggestion?: string;
  }>;
  timestamp: Date;
}

/**
 * System-wide prompt controls
 */
export interface PromptSystemControls {
  emergencyShutoff: boolean;
  activeEnvironment: "development" | "staging" | "production";
  maxTokensPerPrompt: number;
  requireSafetyCheck: boolean;
  sensitiveTopicsRequireApproval: boolean;
  sensitiveTopics: string[];
  approvedAdmins: string[];
  lastUpdated: Date;
  updatedBy?: string;
}
