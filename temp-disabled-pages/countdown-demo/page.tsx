"use client";

import { useState } from "react";
import { Container, Button, Stack } from "@/components/ui";
import { Heading, Text } from "@/components/ui/typography";
import DecisionCountdown from "@/components/decision-countdown";
import MiniCountdown from "@/components/ui/mini-countdown";

export default function CountdownDemo() {
  const [showModal, setShowModal] = useState(false);

  // Sample target date
  const targetDate = new Date(new Date().setDate(new Date().getDate() + 14)); // 14 days from now

  return (
    <Container className="py-16">
      <div className="text-center mb-10">
        <Heading size="h1" className="mb-4">
          Judge Ferrero Decision Countdown
        </Heading>
        <Text className="max-w-2xl mx-auto">
          This demo showcases the different countdown component variants
          designed to create urgency around Judge Ferrero's upcoming decision.
        </Text>
      </div>

      <div className="space-y-12">
        {/* Variant 1: Mini Countdown for Navigation */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <Heading size="h3" className="mb-4">
            Mini Navigation Countdown
          </Heading>
          <Text className="mb-6">
            This compact countdown fits in the navigation bar to create
            persistent awareness.
          </Text>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Navigation Example:</div>
              <MiniCountdown targetDate={targetDate} linkHref="#example-link" />
            </div>
          </div>
        </div>

        {/* Variant 2: Inline Component */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <Heading size="h3" className="mb-4">
            Inline Countdown Component
          </Heading>
          <Text className="mb-6">
            This countdown is designed to be embedded within a page to draw
            attention to the upcoming decision.
          </Text>

          <div className="max-w-md mx-auto">
            <DecisionCountdown
              targetDate={targetDate}
              ctaLink="#example-link"
              ctaText="Support JAHmere's Case"
            />
          </div>
        </div>

        {/* Variant 3: Modal Component */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <Heading size="h3" className="mb-4">
            Modal Countdown
          </Heading>
          <Text className="mb-6">
            This countdown appears as a modal on first visit to create immediate
            awareness and urgency.
          </Text>

          <div className="text-center">
            <Button onClick={() => setShowModal(true)}>
              Show Countdown Modal
            </Button>
          </div>

          {showModal && (
            <DecisionCountdown
              targetDate={targetDate}
              showModal={true}
              onClose={() => setShowModal(false)}
              ctaLink="#example-link"
              ctaText="Take Action Now"
            />
          )}
        </div>
      </div>

      {/* Implementation Details */}
      <div className="mt-16 bg-white/5 backdrop-blur-sm p-6 rounded-lg">
        <Heading size="h3" className="mb-4">
          Implementation Notes
        </Heading>
        <Text className="mb-4">
          These countdown components are designed to create urgency and drive
          action:
        </Text>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The mini countdown appears in the navigation for persistent
            awareness
          </li>
          <li>
            The inline countdown can be embedded in key decision points on the
            site
          </li>
          <li>
            The modal countdown appears on first visit to create immediate
            awareness
          </li>
          <li>
            All countdowns use localStorage to avoid annoying returning visitors
          </li>
          <li>
            The components automatically update their display format based on
            time remaining
          </li>
        </ul>
      </div>
    </Container>
  );
}
