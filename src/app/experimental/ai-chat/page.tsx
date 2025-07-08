"use client";

import { withErrorBoundary } from "@/components/with-error-boundary";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function AIChatInterfacePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm the Bridge Project AI assistant. I can help you explore the impact of forgiveness, learn about our community members, or discuss ways to get involved. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a profound question about forgiveness. In our community, we've seen how transformative it can be when people choose to bridge divides through understanding and compassion.",
        "The Bridge Project has connected thousands of people across different backgrounds. Would you like to hear some specific stories of transformation?",
        "I understand your interest in getting involved. There are several ways to contribute: sharing your story, volunteering, or supporting our letter-writing campaigns.",
        "Coach Dungy often speaks about the power of second chances. His wisdom has guided many in our community toward healing and reconciliation.",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-8 h-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white">AI Chat Interface</h1>
          <span className="px-2 py-1 text-xs bg-green-400/20 text-green-400 rounded">
            Experimental
          </span>
        </div>

        <Card className="bg-gray-800 border-gray-700 h-[600px] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-green-400" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-2 opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-green-400" />
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about forgiveness, community impact, or how to get involved..."
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                disabled={isTyping}
              />
              <Button type="submit" disabled={isTyping || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Feature Notice */}
        <Card className="mt-6 p-4 bg-gray-800/50 border-gray-700">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <p className="font-semibold text-yellow-400 mb-1">
                Experimental Feature
              </p>
              <p>
                This AI chat interface is under development. In the future, it
                will connect to advanced language models to provide meaningful
                conversations about The Bridge Project's mission, stories, and
                community impact.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default withErrorBoundary(AIChatInterfacePage, {
  componentName: "AIChatInterfacePage",
  fallback: (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      Error loading AI chat interface
    </div>
  ),
});
