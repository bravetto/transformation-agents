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
      formattedPrompt += `- Previous interactions: ${userProfile.previousInteractions.join(". ")}\n`;
    }
    formattedPrompt += "\n";
  }

  // Add conversation goals
  formattedPrompt += "Conversation goals:\n";
  conversationGoals.forEach((goal) => {
    formattedPrompt += `- ${goal}\n`;
  });

  return formattedPrompt;
}

/**
 * Format conversation messages for Anthropic API
 */
function formatMessagesForAnthropic(messages: DoppelgangerMessage[]): any[] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

/**
 * Call Anthropic API to generate a response
 */
async function callAnthropicAPI(
  conversation: DoppelgangerConversation,
  model: string,
  maxTokens: number,
  temperature: number,
): Promise<any> {
  try {
    const systemPrompt = generateSystemPrompt(conversation);
    const formattedMessages = formatMessagesForAnthropic(conversation.messages);

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.ANTHROPIC_API_KEY}`,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: model,
        system: systemPrompt,
        messages: formattedMessages,
        max_tokens: maxTokens,
        temperature: temperature,
        metadata: {
          session_id: conversation.sessionId,
          person_slug: conversation.personSlug,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Anthropic API error:", errorData);
      throw new Error(
        `Anthropic API error: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    throw error;
  }
}

/**
 * Log conversation to database for analytics and history
 */
async function logConversation(
  conversation: DoppelgangerConversation,
  response: any,
): Promise<void> {
  try {
    console.log(
      `[CONVERSATION LOG] Session ID: ${conversation.sessionId}, Person: ${conversation.personSlug}`,
    );

    // In a real implementation, you would store this in a database
    // await prisma.doppelgangerConversation.upsert({
    //   where: { sessionId: conversation.sessionId },
    //   update: {
    //     messages: {
    //       push: [
    //         conversation.messages[conversation.messages.length - 1],
    //         {
    //           role: 'assistant',
    //           content: response.content[0].text,
    //           timestamp: new Date().toISOString()
    //         }
    //       ]
    //     }
    //   },
    //   create: {
    //     sessionId: conversation.sessionId,
    //     personSlug: conversation.personSlug,
    //     messages: [...conversation.messages, {
    //       role: 'assistant',
    //       content: response.content[0].text,
    //       timestamp: new Date().toISOString()
    //     }],
    //     context: conversation.context
    //   }
    // });
  } catch (error) {
    console.error("Error logging conversation:", error);
    // Non-blocking - we don't want to fail the request if logging fails
  }
}

/**
 * Handle POST request for Doppelganger conversation
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validationResult = doppelgangerRequestSchema.safeParse(body);

    if (!validationResult.success) {
      const errorResponse: DoppelgangerResponse = {
        success: false,
        error: "Validation error",
        details: validationResult.error.format(),
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    const conversation = validationResult.data as DoppelgangerRequest;
    const { model, maxTokens, temperature, metadata } = validationResult.data;

    // Call Anthropic API
    const response = await callAnthropicAPI(
      conversation,
      model,
      maxTokens,
      temperature,
    );

    // Create response message with timestamp
    const responseMessage: DoppelgangerMessage = {
      role: "assistant",
      content: response.content[0].text,
      timestamp: new Date().toISOString(),
    };

    // Log conversation for analytics (non-blocking)
    logConversation(conversation, response).catch((error) =>
      console.error("Error logging conversation:", error),
    );

    const successResponse: DoppelgangerResponse = {
      success: true,
      data: {
        message: responseMessage,
        sessionId: conversation.sessionId,
        usage: {
          promptTokens: response.usage?.input_tokens,
          completionTokens: response.usage?.output_tokens,
          totalTokens:
            response.usage?.input_tokens + response.usage?.output_tokens,
        },
        model: response.model,
      },
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error("Error processing conversation:", error);

    const errorResponse: DoppelgangerResponse = {
      success: false,
      error: "Server error processing conversation",
      message: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * Handle GET request to retrieve conversation starters or available personalities
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const personSlug = request.nextUrl.searchParams.get("personSlug");
    const listAll = request.nextUrl.searchParams.get("listAll") === "true";

    // If listAll is true, return all available personalities
    if (listAll) {
      return NextResponse.json({
        success: true,
        data: {
          personalities: getPersonalitySummaries(),
          availableModels: [
            "claude-3-opus-20240229",
            "claude-3-sonnet-20240229",
            "claude-3-haiku-20240307",
          ],
          defaultModel: DEFAULT_MODEL,
        },
      });
    }

    // If personSlug is provided, return conversation starters for that personality
    if (personSlug) {
      const personality = getPersonalityBySlug(personSlug);

      if (!personality) {
        return NextResponse.json(
          {
            success: false,
            error: "Person not found",
          },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          personSlug,
          conversationStarters: personality.conversationStarters || [],
          role: personality.role || "lightworker",
          name: personality.personality?.name || personality.name || personSlug,
        },
      });
    }

    // If neither listAll nor personSlug is provided, return error
    return NextResponse.json(
      {
        success: false,
        error:
          "Missing required parameters. Use personSlug to get conversation starters or listAll=true to get all personalities.",
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error retrieving personality data:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error retrieving personality data",
      },
      { status: 500 },
    );
  }
}
