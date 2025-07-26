"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Loader2,
  FileText,
  CheckCircle,
  AlertTriangle,
  Copy,
  Download,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

interface LetterData {
  authorName: string;
  relationship: string;
  context: string;
  specificExamples: string;
  impactStatement: string;
}

interface GeneratedLetter {
  content: string;
  impactScore: number;
  suggestions: string[];
  wordCount: number;
}

interface AILetterGeneratorProps {
  onLetterGenerated?: (letter: GeneratedLetter) => void;
  className?: string;
}

function AILetterGeneratorCore({
  onLetterGenerated,
  className,
}: AILetterGeneratorProps) {
  const [letterData, setLetterData] = useState<LetterData>({
    authorName: "",
    relationship: "",
    context: "",
    specificExamples: "",
    impactStatement: "",
  });
  const [generatedLetter, setGeneratedLetter] =
    useState<GeneratedLetter | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof LetterData, value: string) => {
      setLetterData((prev) => ({ ...prev, [field]: value }));
      setError(null);
    },
    [],
  );

  const validateForm = useCallback((): boolean => {
    const requiredFields: (keyof LetterData)[] = [
      "authorName",
      "relationship",
      "context",
    ];
    const missingFields = requiredFields.filter(
      (field) => !letterData[field].trim(),
    );

    if (missingFields.length > 0) {
      setError(`Please fill in: ${missingFields.join(", ")}`);
      return false;
    }
    return true;
  }, [letterData]);

  const generateLetter = useCallback(async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Track conversion attempt
      trackConversion({
        eventType: "cta_clicked",
        userType: getCurrentUserType(),
        conversionType: "primary",
        metadata: {
          component: "AILetterGenerator",
          action: "generate_letter",
          relationship: letterData.relationship,
        },
      });

      const response = await fetch("/api/ai/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...letterData,
          context: "jahmere-webb-character-witness",
          caseDetails: {
            defendantName: "JAHmere Webb",
            courtDate: "July 28, 2025",
            judgeName: "Judge Ferrero",
            caseType: "character-witness-letter",
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate letter: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate letter");
      }

      const letter: GeneratedLetter = {
        content: data.letter,
        impactScore: data.impactScore || 85,
        suggestions: data.suggestions || [],
        wordCount: data.letter.split(/\s+/).length,
      };

      setGeneratedLetter(letter);
      onLetterGenerated?.(letter);

      // Track successful generation
      trackConversion({
        eventType: "goal_achieved",
        userType: getCurrentUserType(),
        conversionType: "primary",
        metadata: {
          component: "AILetterGenerator",
          action: "letter_generated",
          impactScore: letter.impactScore,
          wordCount: letter.wordCount,
        },
      });
    } catch (error) {
      console.error("Letter generation error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate letter",
      );

      // Track error
      trackConversion({
        eventType: "cta_clicked",
        userType: getCurrentUserType(),
        conversionType: "tertiary",
        metadata: {
          component: "AILetterGenerator",
          action: "generation_error",
          error: error instanceof Error ? error.message : "Unknown error",
        },
      });
    } finally {
      setIsGenerating(false);
    }
  }, [letterData, validateForm, onLetterGenerated]);

  const copyToClipboard = useCallback(async () => {
    if (!generatedLetter) return;

    try {
      await navigator.clipboard.writeText(generatedLetter.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      trackConversion({
        eventType: "cta_clicked",
        userType: getCurrentUserType(),
        conversionType: "secondary",
        metadata: {
          component: "AILetterGenerator",
          action: "copy_letter",
        },
      });
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [generatedLetter]);

  const downloadLetter = useCallback(() => {
    if (!generatedLetter) return;

    const blob = new Blob([generatedLetter.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `character-letter-jahmere-webb-${letterData.authorName.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    trackConversion({
      eventType: "cta_clicked",
      userType: getCurrentUserType(),
      conversionType: "secondary",
      metadata: {
        component: "AILetterGenerator",
        action: "download_letter",
      },
    });
  }, [generatedLetter, letterData.authorName]);

  const resetForm = useCallback(() => {
    setLetterData({
      authorName: "",
      relationship: "",
      context: "",
      specificExamples: "",
      impactStatement: "",
    });
    setGeneratedLetter(null);
    setCurrentStep(1);
    setError(null);
  }, []);

  const getCompletionPercentage = useCallback(() => {
    const fields = Object.values(letterData);
    const filledFields = fields.filter((field) => field.trim().length > 0);
    return Math.round((filledFields.length / fields.length) * 100);
  }, [letterData]);

  return (
    <div className={className}>
      <Card className="bg-gradient-to-br from-elite-divine-amber/5 to-elite-justice-indigo/5 border-elite-divine-amber/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-elite-divine-amber/20 rounded-lg">
              <Sparkles className="w-6 h-6 text-elite-divine-amber" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">
                AI Letter Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Generate a powerful character witness letter for JAHmere Webb
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Completion Progress</span>
              <span className="text-sm text-muted-foreground">
                {getCompletionPercentage()}%
              </span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Fields */}
          {!generatedLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="authorName">Your Full Name *</Label>
                  <Input
                    id="authorName"
                    placeholder="e.g., Dr. Sarah Johnson"
                    value={letterData.authorName}
                    onChange={(e) =>
                      handleInputChange("authorName", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="relationship">
                    Your Relationship to JAHmere *
                  </Label>
                  <Input
                    id="relationship"
                    placeholder="e.g., Former Teacher, Mentor, Friend"
                    value={letterData.relationship}
                    onChange={(e) =>
                      handleInputChange("relationship", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="context">How do you know JAHmere? *</Label>
                <Textarea
                  id="context"
                  placeholder="Describe how you met JAHmere and the nature of your relationship..."
                  value={letterData.context}
                  onChange={(e) => handleInputChange("context", e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="specificExamples">
                  Specific Examples (Optional but Recommended)
                </Label>
                <Textarea
                  id="specificExamples"
                  placeholder="Share specific instances that demonstrate JAHmere's character, growth, or positive impact..."
                  value={letterData.specificExamples}
                  onChange={(e) =>
                    handleInputChange("specificExamples", e.target.value)
                  }
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="impactStatement">
                  Why JAHmere Deserves a Second Chance (Optional)
                </Label>
                <Textarea
                  id="impactStatement"
                  placeholder="Explain why you believe JAHmere should receive consideration for alternative sentencing..."
                  value={letterData.impactStatement}
                  onChange={(e) =>
                    handleInputChange("impactStatement", e.target.value)
                  }
                  className="mt-1 min-h-[80px]"
                />
              </div>

              <Button
                onClick={generateLetter}
                disabled={isGenerating}
                className="w-full bg-elite-divine-amber hover:bg-elite-divine-amber/90 text-white font-semibold py-3"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Your Letter...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Character Letter
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Generated Letter Display */}
          <AnimatePresence>
            {generatedLetter && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Letter Stats */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Generated Successfully
                  </Badge>
                  <Badge variant="outline">
                    {generatedLetter.wordCount} words
                  </Badge>
                  <Badge variant="outline">
                    Impact Score: {generatedLetter.impactScore}/100
                  </Badge>
                </div>

                {/* Letter Content */}
                <div className="p-6 bg-white/50 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Your Character Letter
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="flex items-center gap-1"
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadLetter}
                        className="flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {generatedLetter.content}
                    </pre>
                  </div>
                </div>

                {/* Suggestions */}
                {generatedLetter.suggestions.length > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-900">
                      💡 Suggestions to Strengthen Your Letter:
                    </h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      {generatedLetter.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Generate Another Letter
                  </Button>

                  <Button
                    asChild
                    className="bg-elite-emerald hover:bg-elite-emerald/90 text-white flex items-center gap-2"
                  >
                    <a
                      href="/letter-portal"
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit to Court Portal
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

export const AILetterGenerator = withDivineErrorBoundary(
  AILetterGeneratorCore,
  {
    componentName: "AILetterGenerator",
    role: "messenger",
    fallback: (
      <Card className="p-6">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">
            AI Letter Generator Temporarily Unavailable
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our AI assistant is currently experiencing issues. Please try again
            later or contact support.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Card>
    ),
  },
);
