"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validation schema for letter generation
const LetterGenerationSchema = z.object({
  authorName: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100),
  relationship: z
    .string()
    .min(2, "Relationship must be at least 2 characters")
    .max(100),
  context: z
    .string()
    .min(10, "Context must be at least 10 characters")
    .max(1000),
  specificExamples: z.string().max(1000).optional(),
  impactStatement: z.string().max(1000).optional(),
  caseDetails: z
    .object({
      defendantName: z.string(),
      courtDate: z.string(),
      judgeName: z.string(),
      caseType: z.string(),
    })
    .optional(),
});

export type LetterGenerationData = z.infer<typeof LetterGenerationSchema>;

interface GeneratedLetterResult {
  success: boolean;
  letter?: string;
  impactScore?: number;
  suggestions?: string[];
  error?: string;
}

export async function generateCharacterLetter(
  data: LetterGenerationData,
): Promise<GeneratedLetterResult> {
  try {
    // Validate input data
    const validatedData = LetterGenerationSchema.parse(data);

    // Prepare the prompt for AI generation
    const prompt = createLetterPrompt(validatedData);

    // Call OpenAI API (or your preferred AI service)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert legal writing assistant specializing in character witness letters for criminal defense cases. You create compelling, professional letters that follow proper court formatting and emphasize rehabilitation, community impact, and personal transformation.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const generatedLetter = aiResponse.choices[0]?.message?.content;

    if (!generatedLetter) {
      throw new Error("No letter content generated");
    }

    // Calculate impact score based on letter quality
    const impactScore = calculateImpactScore(generatedLetter, validatedData);

    // Generate improvement suggestions
    const suggestions = generateSuggestions(generatedLetter, validatedData);

    // Log the successful generation for analytics
    console.log("Letter generated successfully", {
      authorName: validatedData.authorName,
      relationship: validatedData.relationship,
      impactScore,
      wordCount: generatedLetter.split(/\s+/).length,
    });

    return {
      success: true,
      letter: generatedLetter,
      impactScore,
      suggestions,
    };
  } catch (error) {
    console.error("Letter generation error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: `Validation error: ${error.errors.map((e) => e.message).join(", ")}`,
      };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate letter",
    };
  }
}

function createLetterPrompt(data: LetterGenerationData): string {
  const {
    authorName,
    relationship,
    context,
    specificExamples,
    impactStatement,
    caseDetails,
  } = data;

  return `Please write a professional character witness letter for ${caseDetails?.defendantName || "the defendant"} who has a court hearing on ${caseDetails?.courtDate || "an upcoming date"}. The letter should be addressed to ${caseDetails?.judgeName || "the Honorable Judge"}.

Author Information:
- Name: ${authorName}
- Relationship to defendant: ${relationship}
- How they know the defendant: ${context}

${specificExamples ? `Specific examples of character: ${specificExamples}` : ""}
${impactStatement ? `Why they deserve consideration: ${impactStatement}` : ""}

Please format the letter professionally with:
1. Proper court letter heading with date and judge's address
2. Formal salutation
3. Introduction of the author and their relationship
4. Specific examples of the defendant's character, growth, and positive impact
5. Statement about rehabilitation and future potential
6. Professional closing with signature line

The letter should be compelling, specific, and emphasize:
- Personal transformation and growth
- Community impact and contributions
- Rehabilitation potential
- Specific instances that demonstrate character
- Professional tone appropriate for court submission

Length: 400-600 words
Tone: Professional, respectful, compelling
Focus: Character, rehabilitation, and community value`;
}

function calculateImpactScore(
  letter: string,
  data: LetterGenerationData,
): number {
  let score = 60; // Base score

  // Word count scoring
  const wordCount = letter.split(/\s+/).length;
  if (wordCount >= 400 && wordCount <= 600) score += 15;
  else if (wordCount >= 300) score += 10;

  // Specific examples bonus
  if (data.specificExamples && data.specificExamples.length > 50) score += 10;

  // Impact statement bonus
  if (data.impactStatement && data.impactStatement.length > 30) score += 10;

  // Professional formatting check
  if (letter.includes("Honorable") && letter.includes("Sincerely")) score += 5;

  return Math.min(score, 100);
}

function generateSuggestions(
  letter: string,
  data: LetterGenerationData,
): string[] {
  const suggestions: string[] = [];
  const wordCount = letter.split(/\s+/).length;

  if (wordCount < 300) {
    suggestions.push(
      "Consider adding more specific examples of positive character traits",
    );
  }

  if (wordCount > 700) {
    suggestions.push(
      "Consider condensing the letter to be more concise and impactful",
    );
  }

  if (!data.specificExamples || data.specificExamples.length < 30) {
    suggestions.push(
      "Adding specific examples or anecdotes would strengthen the letter",
    );
  }

  if (!letter.toLowerCase().includes("rehabilitation")) {
    suggestions.push(
      "Mentioning rehabilitation and personal growth would enhance the impact",
    );
  }

  if (!letter.toLowerCase().includes("community")) {
    suggestions.push(
      "Highlighting community involvement or impact would be beneficial",
    );
  }

  return suggestions;
}

export async function submitGeneratedLetter(
  letterId: string,
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Here you would typically save to database
    // For now, we'll simulate the submission

    const authorName = formData.get("authorName") as string;
    const authorEmail = formData.get("authorEmail") as string;
    const letterContent = formData.get("letterContent") as string;

    if (!authorName || !authorEmail || !letterContent) {
      throw new Error("Missing required fields");
    }

    // Log the submission
    console.log("Letter submitted successfully", {
      letterId,
      authorName,
      authorEmail,
      timestamp: new Date().toISOString(),
    });

    // Revalidate relevant paths
    revalidatePath("/letter-portal");
    revalidatePath("/impact");

    return { success: true };
  } catch (error) {
    console.error("Letter submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit letter",
    };
  }
}
