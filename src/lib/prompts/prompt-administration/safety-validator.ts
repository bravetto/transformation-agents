/**
 * Safety validator for prompt content
 * Ensures prompts follow guidelines and are free from problematic content
 */

import { SafetyCheckResult } from "@/types/prompts";

/**
 * Interface for prompt safety validation
 */
interface PromptSafetyValidator {
  // Validate a prompt for safety issues
  validatePrompt(promptContent: string): Promise<SafetyCheckResult>;

  // Check if a prompt contains sensitive topics
  checkForSensitiveTopics(promptContent: string): Promise<string[]>;

  // Analyze bias in a prompt
  analyzeBias(promptContent: string): Promise<BiasAnalysisResult>;

  // Check if a prompt contains any known harmful patterns
  checkForHarmfulPatterns(
    promptContent: string,
  ): Promise<HarmfulPatternResult[]>;

  // Fix safety issues in a prompt (if possible)
  suggestFixes(
    promptContent: string,
    issues: SafetyCheckResult,
  ): Promise<string>;
}

/**
 * Bias category types
 */
type BiasCategory =
  | "gender"
  | "racial"
  | "cultural"
  | "religious"
  | "age"
  | "political"
  | "socioeconomic"
  | "other";

/**
 * Result of bias analysis
 */
interface BiasAnalysisResult {
  hasBias: boolean;
  biasScore: number; // 0-1 scale
  biasTypes: Array<{
    type: BiasCategory;
    score: number; // 0-1 scale
    examples: string[];
  }>;
}

/**
 * Result of harmful pattern check
 */
interface HarmfulPatternResult {
  patternType: string;
  severity: "low" | "medium" | "high";
  matches: string[];
  lineNumbers: number[];
}

/**
 * Implementation of prompt safety validator
 */
export class PromptSafetyService implements PromptSafetyValidator {
  private sensitiveTopics: string[] = [
    "politics",
    "religion",
    "race",
    "sexual content",
    "terrorism",
    "violence",
    "self-harm",
    "illegal activities",
    "personal medical advice",
    "financial advice",
  ];

  private biasTerms: Record<string, string[]> = {
    gender: ["all men", "all women", "always men", "always women"],
    racial: ["all blacks", "all whites", "all asians"],
    cultural: ["western values", "eastern values", "civilized cultures"],
    religious: ["all christians", "all muslims", "all atheists"],
    age: ["all boomers", "all millennials", "all gen z"],
    political: [
      "all liberals",
      "all conservatives",
      "all republicans",
      "all democrats",
    ],
    socioeconomic: [
      "poor people always",
      "rich people always",
      "lower class always",
    ],
  };

  private harmfulPatterns: Array<{
    pattern: RegExp;
    type: string;
    severity: "low" | "medium" | "high";
  }> = [
    {
      pattern: /\b(kill|murder|hurt|harm|damage)\b/i,
      type: "violence",
      severity: "high",
    },
    {
      pattern: /\b(hack|steal|illegal|fraud)\b/i,
      type: "illegal_activity",
      severity: "high",
    },
    {
      pattern: /\b(always|never|every|all)\b/i,
      type: "generalization",
      severity: "low",
    },
    {
      pattern: /\b(must|should|have to|need to)\b/i,
      type: "prescriptive_language",
      severity: "low",
    },
    {
      pattern: /\b(guarantee|promise|ensure|certainly)\b/i,
      type: "unrealistic_guarantees",
      severity: "medium",
    },
  ];

  /**
   * Validate a prompt for safety issues
   */
  async validatePrompt(promptContent: string): Promise<SafetyCheckResult> {
    // Run all checks in parallel
    const [sensitiveTopics, biasAnalysis, harmfulPatterns] = await Promise.all([
      this.checkForSensitiveTopics(promptContent),
      this.analyzeBias(promptContent),
      this.checkForHarmfulPatterns(promptContent),
    ]);

    // Collect all issues
    const flaggedIssues: SafetyCheckResult["flaggedIssues"] = [];

    // Add sensitive topics
    if (sensitiveTopics.length > 0) {
      flaggedIssues.push({
        type: "other",
        severity: "medium",
        description: `Prompt contains sensitive topics: ${sensitiveTopics.join(", ")}`,
        suggestion:
          "Consider whether these topics are necessary for the prompt purpose",
      });
    }

    // Add bias issues
    if (biasAnalysis.hasBias) {
      biasAnalysis.biasTypes.forEach((bias) => {
        if (bias.score > 0.5) {
          // Only flag significant bias
          flaggedIssues.push({
            type: "bias",
            severity: bias.score > 0.8 ? "high" : "medium",
            description: `Detected potential ${bias.type} bias: ${bias.examples[0]}`,
            suggestion: "Rephrase to avoid generalizations about groups",
          });
        }
      });
    }

    // Add harmful patterns
    harmfulPatterns.forEach((pattern) => {
      if (pattern.matches.length > 0) {
        flaggedIssues.push({
          type:
            pattern.patternType === "violence" ||
            pattern.patternType === "illegal_activity"
              ? "harmful_content"
              : "other",
          severity: pattern.severity,
          description: `Detected ${pattern.patternType} pattern: "${pattern.matches[0]}"`,
          suggestion: "Consider more neutral language",
        });
      }
    });

    // Calculate overall safety score (0-1 scale, higher is better)
    const severityScores = {
      low: 0.2,
      medium: 0.5,
      high: 0.8,
    };

    let safetyScore = 1.0;
    flaggedIssues.forEach((issue) => {
      safetyScore -=
        severityScores[issue.severity] / (flaggedIssues.length * 2);
    });

    safetyScore = Math.max(0, Math.min(1, safetyScore));

    return {
      isPassing:
        safetyScore > 0.7 &&
        !flaggedIssues.some((issue) => issue.severity === "high"),
      score: safetyScore,
      flaggedIssues,
      timestamp: new Date(),
    };
  }

  /**
   * Check if a prompt contains sensitive topics
   */
  async checkForSensitiveTopics(promptContent: string): Promise<string[]> {
    const lowerContent = promptContent.toLowerCase();
    return this.sensitiveTopics.filter((topic) =>
      lowerContent.includes(topic.toLowerCase()),
    );
  }

  /**
   * Analyze bias in a prompt
   */
  async analyzeBias(promptContent: string): Promise<BiasAnalysisResult> {
    const lowerContent = promptContent.toLowerCase();
    const biasTypes: BiasAnalysisResult["biasTypes"] = [];

    // Check each bias category
    for (const [category, terms] of Object.entries(this.biasTerms)) {
      const matches = terms.filter((term) =>
        lowerContent.includes(term.toLowerCase()),
      );

      if (matches.length > 0) {
        biasTypes.push({
          type: category as BiasCategory, // TypeScript limitation with dynamic keys
          score: Math.min(1.0, matches.length * 0.2), // More matches = higher score
          examples: matches,
        });
      }
    }

    // Calculate overall bias score
    const overallScore =
      biasTypes.length > 0
        ? biasTypes.reduce((sum, bias) => sum + bias.score, 0) /
          biasTypes.length
        : 0;

    return {
      hasBias: biasTypes.length > 0,
      biasScore: overallScore,
      biasTypes,
    };
  }

  /**
   * Check if a prompt contains any known harmful patterns
   */
  async checkForHarmfulPatterns(
    promptContent: string,
  ): Promise<HarmfulPatternResult[]> {
    const lines = promptContent.split("\n");
    const results: HarmfulPatternResult[] = [];

    for (const { pattern, type, severity } of this.harmfulPatterns) {
      const matches: string[] = [];
      const lineNumbers: number[] = [];

      // Check each line for the pattern
      lines.forEach((line, index) => {
        const match = line.match(pattern);
        if (match) {
          matches.push(match[0]);
          lineNumbers.push(index + 1);
        }
      });

      if (matches.length > 0) {
        results.push({
          patternType: type,
          severity,
          matches,
          lineNumbers,
        });
      }
    }

    return results;
  }

  /**
   * Suggest fixes for safety issues in a prompt
   */
  async suggestFixes(
    promptContent: string,
    issues: SafetyCheckResult,
  ): Promise<string> {
    let fixedContent = promptContent;

    // Apply simple fixes
    issues.flaggedIssues.forEach((issue) => {
      if (issue.type === "bias") {
        // Replace absolute generalizations with qualified statements
        fixedContent = fixedContent.replace(
          /\b(all|always|never|every)\b/gi,
          "some",
        );
      }

      if (issue.type === "harmful_content") {
        // Replace harmful terms with more neutral alternatives
        const harmfulTerms = {
          kill: "address",
          murder: "resolve",
          hurt: "affect",
          harm: "impact",
          hack: "modify",
          steal: "acquire",
          illegal: "questionable",
        };

        for (const [term, replacement] of Object.entries(harmfulTerms)) {
          const regex = new RegExp(`\\b${term}\\b`, "gi");
          fixedContent = fixedContent.replace(regex, replacement);
        }
      }
    });

    return fixedContent;
  }
}

// Create singleton instance
export const promptSafetyValidator = new PromptSafetyService();
