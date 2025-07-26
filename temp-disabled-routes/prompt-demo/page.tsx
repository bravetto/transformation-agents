import { Metadata } from "next";
import PromptGeneratorDemo from "@/components/prompt-generator-demo";

export const metadata: Metadata = {
  title: "Prompt Template Demo | The Bridge Project",
  description:
    "Interactive demo of The Bridge Project's dynamic prompt template system",
};

export default function PromptDemoPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Dynamic Prompt Template System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how The Bridge Project generates context-aware, personalized
            AI system prompts that adapt to different personalities and
            conversation contexts.
          </p>
        </div>

        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="prose max-w-none">
            <p>
              This system dynamically builds AI system prompts by combining:
            </p>
            <ul>
              <li>
                <strong>Templates</strong> - Define the structure and content
                sections
              </li>
              <li>
                <strong>Personalities</strong> - Shape the AI's voice,
                expertise, and communication style
              </li>
              <li>
                <strong>Context</strong> - Adapt based on conversation stage,
                user mood, and goals
              </li>
              <li>
                <strong>User Profile</strong> - Personalize based on the
                individual's background and preferences
              </li>
            </ul>
            <p>
              Try the interactive demo below to see how different combinations
              affect the generated prompts. You can modify the context and user
              profile JSON directly to see how the system adapts.
            </p>
          </div>
        </div>

        <PromptGeneratorDemo />
      </div>
    </div>
  );
}
