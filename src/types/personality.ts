import { PersonRole } from "./person";

/**
 * Core personality attributes
 */
export interface PersonalityAttributes {
  name: string;
  background: string;
  expertise: string[];
  communicationStyle: string;
  coreValues?: string[];
  keyExperiences?: string[];
  mentorshipApproach?: string;
  traits?: string[];
  values?: string[];
  avoids?: string[];
  voiceExamples?: string[];
}

/**
 * Complete personality configuration for AI personas
 */
export interface PersonalityConfig {
  name?: string; // Optional for backward compatibility
  role?: string;
  background?: string; // Optional for backward compatibility

  // New nested structure used by API routes
  personality?: PersonalityAttributes;
  systemPrompt?: string;
  conversationStarters?: string[];

  // Legacy fields for backward compatibility
  traits?: string[];
  expertise?: string[];
  values?: string[];
  communicationStyle?: string;
  avoids?: string[];
  voiceExamples?: string[];
}

/**
 * Convert legacy personality config to the new AIPersonality format
 * This ensures backward compatibility with existing systems
 */
export function convertToAIPersonality(
  config: PersonalityConfig,
): import("./prompts").AIPersonality {
  return {
    name: config.personality?.name || config.name || "Unknown",
    description: `${config.personality?.name || config.name || "Unknown"} - A Bridge Project guide`,
    role: config.role || "Bridge Guide",
    responseStyle: "casual" as "formal" | "casual" | "divine" | "technical",
    background:
      config.personality?.background ||
      config.background ||
      `${config.personality?.name || config.name || "Unknown"} is a guide for The Bridge Project`,
    expertise: config.personality?.expertise || config.expertise || [],
    values: config.personality?.values || config.values || [],
    communicationStyle:
      config.personality?.communicationStyle ||
      config.communicationStyle ||
      "Balanced and thoughtful",
    traits: config.personality?.traits || config.traits || [],
    voiceExamples:
      config.personality?.voiceExamples || config.voiceExamples || [],
    avoids: config.personality?.avoids || config.avoids || [],
  };
}

/**
 * Message in a doppelganger conversation
 */
export interface DoppelgangerMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

/**
 * User profile information for personalized conversations
 */
export interface UserProfile {
  firstName?: string;
  interests?: string[];
  previousInteractions?: string[];
}

/**
 * Context for a doppelganger conversation
 */
export interface DoppelgangerContext {
  userProfile?: UserProfile;
  conversationGoals: string[];
  rolePersonality: PersonalityConfig;
}

/**
 * Complete doppelganger conversation structure
 */
export interface DoppelgangerConversation {
  personSlug: string; // Which lightworker to channel
  sessionId: string;
  messages: DoppelgangerMessage[];
  context: DoppelgangerContext;
}

/**
 * API request for doppelganger conversation
 */
export interface DoppelgangerRequest extends DoppelgangerConversation {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  metadata?: Record<string, any>;
}

/**
 * API response for doppelganger conversation
 */
export interface DoppelgangerResponse {
  success: boolean;
  data?: {
    message: DoppelgangerMessage;
    sessionId: string;
    usage: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
    model: string;
  };
  error?: string;
  message?: string;
  details?: any;
}

/**
 * Conversation starters response
 */
export interface ConversationStartersResponse {
  success: boolean;
  data?: {
    personSlug: string;
    conversationStarters: string[];
    role: PersonRole;
    name: string;
  };
  error?: string;
}

export interface AIPersonality {
  name: string;
  description: string;
  voiceExamples: string[];
  traits: string[];
  responseStyle: "formal" | "casual" | "divine" | "technical";
  communicationStyle: string;
  faithPerspective?: string;
  leadershipStyle?: string;
  mentorshipApproach?: string;
  technicalExpertise?: string;
  advocacyStyle?: string;
  avoids: string[];
}

export interface ConversationContext {
  userId: string;
  sessionId: string;
  history: any[];
  currentTopic?: string;
  userPreferences: any;
}
