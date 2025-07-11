import { NextRequest, NextResponse } from "next/server";
import {
  promptTemplateService,
  coachDungyPersonality,
  jahmereWebbPersonality,
  michaelMataluniPersonality,
} from "@/lib/prompts";
import {
  AIPersonality,
  ConversationContext,
  UserProfile,
} from "@/types/prompts";

// Personality mapping
const personalityMap: Record<string, AIPersonality> = {
  "coach-dungy": coachDungyPersonality,
  "jahmere-webb": jahmereWebbPersonality,
  "michael-mataluni": michaelMataluniPersonality,
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const { templateId, personalityId, context } = body;

    if (!templateId) {
      return NextResponse.json(
        { error: "Missing templateId field" },
        { status: 400 },
      );
    }

    if (!personalityId) {
      return NextResponse.json(
        { error: "Missing personalityId field" },
        { status: 400 },
      );
    }

    if (!context || typeof context !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid context field" },
        { status: 400 },
      );
    }

    // Ensure context has required fields
    const validatedContext: ConversationContext = {
      goals: Array.isArray(context.goals)
        ? context.goals
        : ["Assist and support"],
      stage: [
        "initial",
        "exploration",
        "guidance",
        "action",
        "reflection",
      ].includes(context.stage)
        ? (context.stage as ConversationContext["stage"])
        : "initial",
      ...context,
    };

    // Get personality
    const personality = personalityMap[personalityId];
    if (!personality) {
      return NextResponse.json(
        { error: `Unknown personality: ${personalityId}` },
        { status: 400 },
      );
    }

    // Optional user profile
    const userProfile: UserProfile | undefined = body.userProfile;

    // Generate prompt
    try {
      const prompt = promptTemplateService.generatePrompt(
        templateId,
        personality,
        validatedContext,
        userProfile,
      );

      return NextResponse.json({ prompt });
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Failed to generate prompt",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error in generate-prompt API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
