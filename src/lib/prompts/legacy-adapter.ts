import {
  DoppelgangerContext,
  DoppelgangerRequest,
  PersonalityConfig,
  convertToAIPersonality,
  UserProfile,
} from "@/types/personality";
import type { AIPersonality, ConversationContext } from "@/types/prompts";
import { promptTemplateService, BridgePromptTemplate } from "@/lib/prompts";

/**
 * Adapts the doppelganger context to the new prompt system context
 */
export function adaptDoppelgangerContext(
  context: DoppelgangerContext,
  messages: Array<{ role: "user" | "assistant"; content: string }>,
): {
  adaptedContext: ConversationContext;
  adaptedProfile?: UserProfile;
} {
  // Extract topics from messages (last 3 user messages)
  const userMessages = messages
    .filter((m) => m.role === "user")
    .slice(-3)
    .map((m) => m.content);

  const currentTopic =
    userMessages.length > 0
      ? userMessages[userMessages.length - 1].split(".")[0]
      : undefined;

  const previousTopics =
    userMessages.length > 1
      ? userMessages.slice(0, -1).map((m) => m.split(".")[0])
      : [];

  // Create adapted context
  const adaptedContext: ConversationContext = {
    goals: context.conversationGoals,
    stage: determineConversationStage(messages),
    currentTopic,
    previousTopics,
    recentMessages: messages.slice(-5),
    // Other fields would need to come from the request
    // or be determined by analysis
  };

  // Create adapted user profile if available
  let adaptedProfile: UserProfile | undefined;

  if (context.userProfile) {
    adaptedProfile = {
      firstName: context.userProfile.firstName,
      interests: context.userProfile.interests,
      previousInteractions: context.userProfile.previousInteractions,
    };
  }

  return {
    adaptedContext,
    adaptedProfile,
  };
}

/**
 * Determines the conversation stage based on message history
 */
function determineConversationStage(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
): ConversationContext["stage"] {
  const messageCount = messages.length;

  if (messageCount <= 2) {
    return "initial";
  } else if (messageCount <= 6) {
    return "exploration";
  } else if (messageCount <= 12) {
    return "guidance";
  } else if (messageCount <= 18) {
    return "action";
  } else {
    return "reflection";
  }
}

/**
 * Generate a system prompt for the doppelganger system using the new prompt templates
 */
export function generateSystemPromptForDoppelganger(
  request: DoppelgangerRequest,
  templateId: string = "bridge-base",
): string {
  // Convert legacy personality config to new format
  const personality = convertToAIPersonality(request.context.rolePersonality);

  // Adapt context and user profile
  const { adaptedContext, adaptedProfile } = adaptDoppelgangerContext(
    request.context,
    request.messages,
  );

  // Generate prompt using the template service
  try {
    return promptTemplateService.generatePrompt(
      templateId,
      personality,
      adaptedContext,
      adaptedProfile,
    );
  } catch (error) {
    console.error("Error generating prompt:", error);

    // Fallback to legacy system prompt if available
    if (request.context.rolePersonality.systemPrompt) {
      return request.context.rolePersonality.systemPrompt;
    }

    // Create a basic fallback prompt
    return createFallbackPrompt(personality, adaptedContext);
  }
}

/**
 * Create a simple fallback prompt if template generation fails
 */
function createFallbackPrompt(
  personality: AIPersonality,
  context: ConversationContext,
): string {
  return `You are ${personality.name}, ${personality.role}.
  
Background: ${personality.background}

Expertise: ${personality.expertise.join(", ")}

Communication Style: ${personality.communicationStyle}

In this conversation, focus on: ${context.goals.join(", ")}

The current topic is: ${context.currentTopic || "to be determined by the user"}`;
}
