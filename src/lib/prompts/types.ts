// MISSION-CRITICAL: Single source of truth for all prompt types
// All imports MUST use @/types/prompts to avoid TypeScript conflicts

// Direct re-exports to ensure type identity
export type {
  ABTestResult,
  PromptTemplate,
  UserProfile,
  ConversationContext,
  AIPersonality,
  TemplateSection,
  PromptTemplateConfig,
  PromptTemplateVersion,
  PromptPerformanceMetrics,
  PromptUsageRecord,
  SafetyCheckResult,
  PromptSystemControls,
} from "@/types/prompts";

// Backward compatibility aliases
export type {
  TemplateSection as PromptSection,
  PromptTemplateConfig as PromptConfig,
  PromptTemplateVersion as PromptVersion,
} from "@/types/prompts";
