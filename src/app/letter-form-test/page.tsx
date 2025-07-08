"use client";

import { useState } from "react";
import DivineLetterForm from "@/components/divine-letter-form";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default function LetterFormTest() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Handle form submission for testing
  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setSubmittedData(data);
  };

  // Handle auto-save for testing
  const handleAutoSave = (data: any) => {
    console.log("Form auto-saved:", data);
  };

  return (
    <Container className="py-12">
      <Heading size="h1" className="text-center mb-8">
        Letter of Support Form
      </Heading>

      <Text className="text-center mb-12 max-w-3xl mx-auto">
        This legally-optimized form helps you create the most effective
        character reference letter for JAHmere's case. Follow the guided steps
        to ensure your letter has maximum impact.
      </Text>

      {submittedData ? (
        <Card className="p-8 mb-8">
          <Heading size="h2" className="mb-4">
            Submission Successful
          </Heading>
          <Text className="mb-4">
            Thank you for submitting your letter of support for JAHmere.
          </Text>

          <div className="mt-8">
            <Heading size="h3" className="mb-2">
              Your Letter:
            </Heading>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="whitespace-pre-wrap">
                {submittedData.letterContent}
              </pre>
            </div>
          </div>
        </Card>
      ) : (
        <DivineLetterForm onSubmit={handleFormSubmit} onSave={handleAutoSave} />
      )}
    </Container>
  );
}
