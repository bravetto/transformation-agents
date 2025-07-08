import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Environment variables validation
const requiredEnvVars = [
  "CLICKUP_API_KEY",
  "CLICKUP_LIST_ID",
  "CLICKUP_SPACE_ID",
];

// Validate required environment variables are present
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
  }
}

// Constants
const CLICKUP_API_URL = "https://api.clickup.com/api/v2";
const LETTER_QUALITY_THRESHOLD = 70; // Minimum quality score for letters

// Zod validation schema for letter submission
const letterSubmissionSchema = z.object({
  // PERSONAL INFO
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  zipCode: z.string().min(5, "Valid zip code is required"),

  // RELATIONSHIP & CONTEXT
  relationship: z.enum(
    [
      "youth_helped",
      "employer",
      "mentor",
      "community_leader",
      "family",
      "friend",
    ],
    {
      errorMap: () => ({ message: "Please select a valid relationship" }),
    },
  ),
  connectionStrength: z.enum(["close", "moderate", "casual"]),
  timeKnown: z.string().min(1, "Time known is required"),

  // ENGAGEMENT LEVEL
  volunteerInterest: z.boolean(),
  willingToTestify: z.boolean(),

  // LETTER CONTENT
  specificExamples: z
    .array(z.string())
    .min(1, "At least one specific example is required"),
  ongoingCommitment: z
    .string()
    .min(10, "Please describe your ongoing commitment"),

  // TRACKING
  source: z.string().default("website"),
  campaignId: z.string().optional(),
});

// Type definition based on Zod schema
type LetterSubmission = z.infer<typeof letterSubmissionSchema>;

// Interface for optimized letter submission
interface OptimizedLetterSubmission extends LetterSubmission {
  impactScore: number;
  timestamp: string;
}

/**
 * Calculate impact score based on letter content quality
 * This uses a weighted scoring system to evaluate the letter's quality
 */
function calculateImpactScore(submission: LetterSubmission): number {
  let score = 0;

  // Relationship factors (max 20 points)
  const relationshipScores = {
    youth_helped: 20,
    employer: 18,
    mentor: 17,
    community_leader: 16,
    family: 14,
    friend: 12,
  };
  score += relationshipScores[submission.relationship] || 10;

  // Connection strength (max 15 points)
  const connectionScores = {
    close: 15,
    moderate: 10,
    casual: 5,
  };
  score += connectionScores[submission.connectionStrength] || 5;

  // Specific examples quality (max 30 points)
  const examplesScore = Math.min(30, submission.specificExamples.length * 10);
  score += examplesScore;

  // Willingness to testify (max 20 points)
  score += submission.willingToTestify ? 20 : 0;

  // Volunteer interest (max 15 points)
  score += submission.volunteerInterest ? 15 : 0;

  return score;
}

/**
 * Create a task in ClickUp CRM for the letter submission
 */
async function createClickUpTask(
  submission: OptimizedLetterSubmission,
): Promise<string | null> {
  try {
    const response = await fetch(
      `${CLICKUP_API_URL}/list/${process.env.CLICKUP_LIST_ID}/task`,
      {
        method: "POST",
        headers: {
          Authorization: `${process.env.CLICKUP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `Support Letter: ${submission.firstName} ${submission.lastName}`,
          description: `
# Support Letter Submission

## Personal Information
- **Name**: ${submission.firstName} ${submission.lastName}
- **Email**: ${submission.email}
- **Phone**: ${submission.phone || "Not provided"}
- **Zip Code**: ${submission.zipCode}

## Relationship Information
- **Relationship**: ${submission.relationship.replace("_", " ")}
- **Connection Strength**: ${submission.connectionStrength}
- **Time Known**: ${submission.timeKnown}

## Engagement Level
- **Volunteer Interest**: ${submission.volunteerInterest ? "Yes" : "No"}
- **Willing to Testify**: ${submission.willingToTestify ? "Yes" : "No"}

## Letter Content
- **Specific Examples**: 
${submission.specificExamples.map((example) => `  - ${example}`).join("\n")}
- **Ongoing Commitment**: ${submission.ongoingCommitment}

## Analytics
- **Impact Score**: ${submission.impactScore}/100
- **Source**: ${submission.source}
- **Campaign ID**: ${submission.campaignId || "None"}
- **Timestamp**: ${submission.timestamp}
`,
          status:
            submission.impactScore >= LETTER_QUALITY_THRESHOLD
              ? "High Quality"
              : "Review Required",
          priority: submission.willingToTestify ? 1 : 3,
          custom_fields: [
            {
              id:
                process.env.CLICKUP_IMPACT_SCORE_FIELD_ID ||
                "impact_score_field",
              value: submission.impactScore,
            },
            {
              id:
                process.env.CLICKUP_RELATIONSHIP_FIELD_ID ||
                "relationship_field",
              value: submission.relationship,
            },
          ],
          tags: [
            submission.relationship,
            submission.willingToTestify ? "willing-to-testify" : "",
            submission.volunteerInterest ? "volunteer-interest" : "",
            submission.impactScore >= LETTER_QUALITY_THRESHOLD
              ? "high-quality"
              : "needs-review",
          ].filter(Boolean),
        }),
      },
    );

    if (!response.ok) {
      console.error("ClickUp API error:", await response.text());
      return null;
    }

    const data = await response.json();
    return data.id; // Return the task ID
  } catch (error) {
    console.error("Error creating ClickUp task:", error);
    return null;
  }
}

/**
 * Send confirmation email to the submitter
 */
async function sendConfirmationEmail(
  submission: OptimizedLetterSubmission,
): Promise<boolean> {
  // In a real implementation, this would integrate with an email service like SendGrid or AWS SES
  // For now, we'll just log the action and return success

  console.log(
    `[EMAIL] Sending confirmation to ${submission.email} for letter submission`,
  );

  // TODO: Implement actual email sending logic

  return true;
}

/**
 * Handle POST request for letter submission
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = letterSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const submission = validationResult.data;

    // Calculate impact score
    const impactScore = calculateImpactScore(submission);

    // Create optimized submission with additional fields
    const optimizedSubmission: OptimizedLetterSubmission = {
      ...submission,
      impactScore,
      timestamp: new Date().toISOString(),
    };

    // Create task in ClickUp
    const taskId = await createClickUpTask(optimizedSubmission);

    if (!taskId) {
      // If ClickUp integration fails, still accept the submission but log the error
      console.error("Failed to create ClickUp task for letter submission");
    }

    // Send confirmation email
    await sendConfirmationEmail(optimizedSubmission);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Letter submitted successfully",
      data: {
        taskId,
        impactScore,
        qualityStatus:
          impactScore >= LETTER_QUALITY_THRESHOLD ? "high" : "standard",
      },
    });
  } catch (error) {
    console.error("Error processing letter submission:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error processing submission",
      },
      { status: 500 },
    );
  }
}

/**
 * Handle GET request to retrieve submission form options/metadata
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Return form options/metadata for the frontend
  return NextResponse.json({
    success: true,
    data: {
      relationshipOptions: [
        { value: "youth_helped", label: "Youth I Helped" },
        { value: "employer", label: "Employer" },
        { value: "mentor", label: "Mentor" },
        { value: "community_leader", label: "Community Leader" },
        { value: "family", label: "Family Member" },
        { value: "friend", label: "Friend" },
      ],
      connectionStrengthOptions: [
        { value: "close", label: "Close" },
        { value: "moderate", label: "Moderate" },
        { value: "casual", label: "Casual" },
      ],
    },
  });
}
