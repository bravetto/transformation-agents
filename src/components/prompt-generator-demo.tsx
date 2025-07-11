"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ConversationContext, UserProfile } from "@/types/prompts";
import { withErrorBoundary } from "@/components/with-error-boundary";

const defaultContext: ConversationContext = {
  goals: ["Understand the prompt system", "Learn about AI personalities"],
  stage: "exploration",
  currentTopic: "AI prompt engineering",
  timeOfDay: "afternoon",
  userMood: "curious",
  engagementLevel: "high",
  goalProgress: 0.5,
  settings: {
    formality: "neutral",
    detailLevel: "balanced",
    tone: "neutral",
  },
};

const defaultUserProfile: UserProfile = {
  firstName: "Alex",
  lastName: "Taylor",
  interests: ["AI", "technology", "communication"],
  relationshipToProject: "developer",
  preferredCommunicationStyle: "direct",
};

function PromptGeneratorDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState("bridge-base");
  const [selectedPersonality, setSelectedPersonality] = useState("coach-dungy");
  const [context, setContext] = useState<string>(
    JSON.stringify(defaultContext, null, 2),
  );
  const [userProfile, setUserProfile] = useState<string>(
    JSON.stringify(defaultUserProfile, null, 2),
  );
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePrompt = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Parse context and user profile from JSON
      let parsedContext: ConversationContext;
      let parsedUserProfile: UserProfile | undefined;

      try {
        parsedContext = JSON.parse(context);
        parsedUserProfile = userProfile ? JSON.parse(userProfile) : undefined;
      } catch (err) {
        throw new Error("Invalid JSON in context or user profile");
      }

      // Call the API
      const response = await fetch("/api/ai/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          personalityId: selectedPersonality,
          context: parsedContext,
          userProfile: parsedUserProfile,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate prompt");
      }

      const data = await response.json();
      setGeneratedPrompt(data.prompt);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Prompt Generator</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="template">Template</Label>
              <Select
                value={selectedTemplate}
                onValueChange={(value: string) => setSelectedTemplate(value)}
              >
                <option value="bridge-base">Base Template</option>
                <option value="bridge-mentorship">Mentorship Template</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="personality">Personality</Label>
              <Select
                value={selectedPersonality}
                onValueChange={(value: string) => setSelectedPersonality(value)}
              >
                <option value="coach-dungy">Coach Tony Dungy</option>
                <option value="jahmere-webb">JahMere Webb</option>
                <option value="michael-mataluni">Michael Mataluni</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="context">Conversation Context (JSON)</Label>
              <Textarea
                id="context"
                rows={8}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="userProfile">User Profile (JSON, Optional)</Label>
              <Textarea
                id="userProfile"
                rows={6}
                value={userProfile}
                onChange={(e) => setUserProfile(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            <Button
              onClick={generatePrompt}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Generating..." : "Generate Prompt"}
            </Button>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
                {error}
              </div>
            )}
          </div>
        </Card>
      </div>

      <div>
        <Card className="p-6 h-full">
          <h2 className="text-2xl font-bold mb-4">Generated Prompt</h2>
          <div className="bg-gray-50 p-4 rounded-md h-[calc(100%-3rem)] overflow-auto">
            {generatedPrompt ? (
              <pre className="whitespace-pre-wrap text-sm">
                {generatedPrompt}
              </pre>
            ) : (
              <div className="text-gray-400 italic">
                Configure settings and click "Generate Prompt" to see the result
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

// Export with error boundary
export default withErrorBoundary(PromptGeneratorDemo, {
  componentName: "PromptGeneratorDemo",
  id: "prompt-generator-demo",
});
