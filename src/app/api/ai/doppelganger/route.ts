import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  DoppelgangerConversation,
  DoppelgangerMessage,
  DoppelgangerRequest,
  DoppelgangerResponse,
  PersonalityConfig,
} from "@/types/personality";
import {
  getPersonalityBySlug,
  getAvailablePersonalities,
  getPersonalitySummaries,
} from "./personalities";

// Constants
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-3-opus-20240229";
const DEFAULT_MAX_TOKENS = 4000;

// Validate required environment variables
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("Missing required environment variable: ANTHROPIC_API_KEY");
}

// Schemas for validation
const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1, "Message content is required"),
  timestamp: z.string().datetime(),
});

const userProfileSchema = z.object({
  firstName: z.string().optional(),
  interests: z.array(z.string()).optional(),
  previousInteractions: z.array(z.string()).optional(),
});

const personalitySchema = z.object({
  name: z.string(),
  background: z.string(),
  expertise: z.array(z.string()),
  communicationStyle: z.string(),
  coreValues: z.array(z.string()),
  keyExperiences: z.array(z.string()),
  mentorshipApproach: z.string(),
});

const personalityConfigSchema = z.object({
  role: z.enum(["lightworker", "messenger", "witness", "guardian"]),
  personality: personalitySchema,
  systemPrompt: z.string(),
  conversationStarters: z.array(z.string()),
});

const conversationContextSchema = z.object({
  userProfile: userProfileSchema.optional(),
  conversationGoals: z.array(z.string()),
  rolePersonality: personalityConfigSchema,
});

const doppelgangerRequestSchema = z.object({
  personSlug: z.string(),
  sessionId: z.string(),
  messages: z.array(messageSchema),
  context: conversationContextSchema,
  model: z.string().default(DEFAULT_MODEL),
  maxTokens: z.number().min(1).max(4096).default(DEFAULT_MAX_TOKENS),
  temperature: z.number().min(0).max(1).default(0.7),
  metadata: z.record(z.string(), z.any()).optional(),
});

/**
 * Generate the system prompt based on personality configuration and context
 */
function generateSystemPrompt(conversation: DoppelgangerConversation): string {
  const { rolePersonality, userProfile, conversationGoals } =
    conversation.context;
  const { personality, systemPrompt } = rolePersonality;

  // Handle cases where personality might be undefined
  if (!personality) {
    return systemPrompt || "You are a helpful assistant.";
  }

  let formattedPrompt = `${systemPrompt}\n\n`;

  // Add personality details
  formattedPrompt += `You are ${personality.name}. ${personality.background}\n\n`;

  formattedPrompt += `Your areas of expertise include: ${personality.expertise.join(", ")}.\n`;
  formattedPrompt += `Your communication style is ${personality.communicationStyle}.\n`;
  formattedPrompt += `Your core values are: ${personality.coreValues?.join(", ") || "integrity and service"}.\n`;
  formattedPrompt += `Your key life experiences include: ${personality.keyExperiences?.join(". ") || "diverse experiences"}.\n`;
  formattedPrompt += `Your approach to mentorship is: ${personality.mentorshipApproach || "supportive and encouraging"}.\n\n`;

  // Add user profile if available
  if (userProfile) {
    formattedPrompt += "User information:\n";
    if (userProfile.firstName) {
      formattedPrompt += `- First name: ${userProfile.firstName}\n`;
    }
    if (userProfile.interests && userProfile.interests.length > 0) {
      formattedPrompt += `- Interests: ${userProfile.interests.join(", ")}\n`;
    }
    if (
      userProfile.previousInteractions &&
      userProfile.previousInteractions.length > 0
    ) {
      formattedPrompt += `- Previous interactions: ${userProfile.previousInteractions.join(", ")}\n`;
    }
    formattedPrompt += "\n";
  }

  // Add conversation goals
  if (conversationGoals && conversationGoals.length > 0) {
    formattedPrompt += `Conversation goals: ${conversationGoals.join(", ")}\n\n`;
  }

  return formattedPrompt;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedRequest = doppelgangerRequestSchema.parse(body);
    
    // For now, return a simple response
    return NextResponse.json({ 
      message: "Doppelganger API endpoint - implementation in progress",
      personSlug: validatedRequest.personSlug,
      sessionId: validatedRequest.sessionId
    });
  } catch (error) {
    console.error("Error in doppelganger API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}