import { NextRequest, NextResponse } from "next/server";
import {
  generateCharacterLetter,
  type LetterGenerationData,
} from "@/app/actions/ai-letter";
import { headers } from "next/headers";
import { ratelimit } from "@/lib/rate-limit";

function getClientIP(request: NextRequest): string {
  // Try various headers for IP address
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback to a default IP for local development
  return "127.0.0.1";
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting to prevent abuse
    const ip = getClientIP(request);
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": new Date(reset).toISOString(),
          },
        },
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.authorName || !body.relationship || !body.context) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: authorName, relationship, and context are required.",
        },
        { status: 400 },
      );
    }

    // Prepare data for Server Action
    const letterData: LetterGenerationData = {
      authorName: body.authorName,
      relationship: body.relationship,
      context: body.context,
      specificExamples: body.specificExamples || "",
      impactStatement: body.impactStatement || "",
      caseDetails: body.caseDetails || {
        defendantName: "JAHmere Webb",
        courtDate: "July 28, 2025",
        judgeName: "Judge Ferrero",
        caseType: "character-witness-letter",
      },
    };

    // Call the Server Action
    const result = await generateCharacterLetter(letterData);

    // Add rate limit headers to successful responses
    const response = NextResponse.json(result);
    response.headers.set("X-RateLimit-Limit", limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", new Date(reset).toISOString());

    return response;
  } catch (error) {
    console.error("API route error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    );
  }
}
