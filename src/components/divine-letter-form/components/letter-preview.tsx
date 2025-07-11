"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  AlertTriangle,
  Star,
  Calendar,
  FileText,
  Target,
  Award,
  TrendingUp,
} from "lucide-react";
import { useLetterForm } from "../context";

/**
 * Letter Preview Component with Real-Time Impact Scoring
 * Shows formatted letter with legal effectiveness metrics
 */
function LetterPreview() {
  const { formData, impactScore, calculateImpactScore } = useLetterForm();

  // Calculate detailed impact metrics
  const impactMetrics = useMemo(() => {
    const content = formData.letterContent || "";
    const examples = [
      formData.specificExample1,
      formData.specificExample2,
      formData.specificExample3,
    ].filter(Boolean);

    // Word count analysis
    const wordCount = content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const optimalWordCount = wordCount >= 300 && wordCount <= 800;

    // Date pattern detection
    const datePattern =
      /\b(january|february|march|april|may|june|july|august|september|october|november|december|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}-\d{1,2}-\d{2,4})\b/gi;
    const dateCount = (content.match(datePattern) || []).length;

    // Specific details detection
    const specificityWords = [
      "specifically",
      "exactly",
      "precisely",
      "on",
      "at",
      "during",
      "when",
      "where",
      "how",
    ];
    const specificityCount = specificityWords.reduce((count, word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      return count + (content.match(regex) || []).length;
    }, 0);

    // Character strength indicators
    const strengthWords = [
      "character",
      "integrity",
      "reliable",
      "trustworthy",
      "responsible",
      "committed",
      "dedicated",
    ];
    const strengthCount = strengthWords.reduce((count, word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      return count + (content.match(regex) || []).length;
    }, 0);

    // Calculate component scores
    const scores = {
      wordCount: optimalWordCount ? 25 : Math.min(25, (wordCount / 300) * 25),
      specificity: Math.min(25, specificityCount * 3),
      dates: Math.min(20, dateCount * 5),
      examples: Math.min(20, examples.length * 7),
      strength: Math.min(10, strengthCount * 2),
    };

    const totalScore = Object.values(scores).reduce(
      (sum, score) => sum + score,
      0,
    );

    return {
      totalScore: Math.round(totalScore),
      wordCount,
      dateCount,
      specificityCount,
      strengthCount,
      exampleCount: examples.length,
      scores,
      optimalWordCount,
    };
  }, [formData]);

  // Generate formatted letter
  const formattedLetter = useMemo(() => {
    if (!formData.name || !formData.letterContent) return "";

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let signature = "";
    switch (formData.signatureStyle) {
      case "formal":
        signature = `Sincerely,\n\n${formData.name}`;
        break;
      case "personal":
        signature = `With deep concern for JAHmere's future,\n\n${formData.name}`;
        break;
      case "spiritual":
        signature = `With faith in JAHmere's transformation,\n\n${formData.name}`;
        break;
      default:
        signature = `Sincerely,\n\n${formData.name}`;
    }

    return `${currentDate}

The Honorable Judge Ferrero
Hillsborough County Courthouse
Tampa, Florida

Re: JAHmere Webb - Character Reference Letter

Dear Judge Ferrero,

I am writing to express my strong support for JAHmere Webb and to respectfully request your consideration of community-based alternatives to incarceration. As ${formData.relationship?.replace("_", " ") || "a community member"}, I have known JAHmere for ${formData.timeKnown || "[time period]"} and have observed his character, growth, and positive impact firsthand.

${formData.letterContent}

I believe JAHmere represents exactly the kind of person who can benefit from and contribute to community-based rehabilitation programs. I am committed to supporting his continued growth and accountability in whatever way I can.

Thank you for your time and consideration.

${signature}

${formData.address || ""}
${formData.email || ""}
${formData.phone || ""}`;
  }, [formData]);

  // Impact score color and message
  const getScoreDisplay = (score: number) => {
    if (score >= 80)
      return {
        color: "text-green-600",
        bg: "bg-green-50",
        label: "Exceptional Impact",
        icon: Award,
      };
    if (score >= 60)
      return {
        color: "text-blue-600",
        bg: "bg-blue-50",
        label: "Strong Impact",
        icon: Star,
      };
    if (score >= 40)
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        label: "Good Impact",
        icon: Target,
      };
    return {
      color: "text-red-600",
      bg: "bg-red-50",
      label: "Needs Improvement",
      icon: AlertTriangle,
    };
  };

  const scoreDisplay = getScoreDisplay(impactMetrics.totalScore);
  const ScoreIcon = scoreDisplay.icon;

  return (
    <div className="space-y-6">
      {/* Impact Scoring Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Overall Impact Score */}
        <Card className={`p-6 ${scoreDisplay.bg} border-2`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Letter Impact Score</h3>
            <ScoreIcon className={`w-6 h-6 ${scoreDisplay.color}`} />
          </div>

          <div className="text-center">
            <div className={`text-4xl font-bold ${scoreDisplay.color} mb-2`}>
              {impactMetrics.totalScore}%
            </div>
            <Badge
              variant="secondary"
              className={`${scoreDisplay.color} font-semibold`}
            >
              {scoreDisplay.label}
            </Badge>
          </div>

          <Progress value={impactMetrics.totalScore} className="mt-4 h-3" />
        </Card>

        {/* Detailed Metrics */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Effectiveness Breakdown
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">
                Word Count ({impactMetrics.wordCount})
              </span>
              <div className="flex items-center gap-2">
                <Progress
                  value={(impactMetrics.scores.wordCount / 25) * 100}
                  className="w-16 h-2"
                />
                {impactMetrics.optimalWordCount && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">
                Specific Details ({impactMetrics.specificityCount})
              </span>
              <Progress
                value={(impactMetrics.scores.specificity / 25) * 100}
                className="w-16 h-2"
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">
                Dates Mentioned ({impactMetrics.dateCount})
              </span>
              <Progress
                value={(impactMetrics.scores.dates / 20) * 100}
                className="w-16 h-2"
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">
                Examples Given ({impactMetrics.exampleCount})
              </span>
              <Progress
                value={(impactMetrics.scores.examples / 20) * 100}
                className="w-16 h-2"
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">
                Character Strength ({impactMetrics.strengthCount})
              </span>
              <Progress
                value={(impactMetrics.scores.strength / 10) * 100}
                className="w-16 h-2"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Improvement Suggestions */}
      {impactMetrics.totalScore < 80 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Suggestions to Increase Impact
            </h3>

            <div className="space-y-2 text-sm text-blue-700">
              {impactMetrics.wordCount < 300 && (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Add more detail to reach 300-800 words for optimal legal
                    impact
                  </span>
                </div>
              )}

              {impactMetrics.dateCount < 3 && (
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Include specific dates when events occurred (judges value
                    concrete timelines)
                  </span>
                </div>
              )}

              {impactMetrics.exampleCount < 2 && (
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Provide more specific examples of JAHmere's character and
                    positive actions
                  </span>
                </div>
              )}

              {impactMetrics.specificityCount < 5 && (
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Use more specific details (where, when, how) to strengthen
                    credibility
                  </span>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Formatted Letter Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-8">
          <h3 className="font-bold text-xl mb-6 text-center">Letter Preview</h3>

          <div className="bg-white border-2 border-gray-200 p-8 rounded-lg font-serif leading-relaxed">
            <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-loose">
              {formattedLetter}
            </pre>
          </div>

          {impactMetrics.totalScore >= 70 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">
                  Letter Ready for Submission!
                </span>
              </div>
              <p className="text-sm text-green-700 mt-2">
                This letter meets high standards for legal effectiveness and
                should have strong impact with Judge Ferrero.
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

export default withSafeUI(LetterPreview);
