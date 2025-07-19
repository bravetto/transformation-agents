"use client";

import { useState, useEffect } from "react";
import { Container, Heading, Text, Button, Stack } from "@/components/ui";
import PropheticCountdown from "@/components/prophetic-countdown";
import { logger } from "@/lib/logger";

export default function CountdownTest() {
  const [selectedRole, setSelectedRole] = useState<
    "lightworker" | "messenger" | "witness" | "guardian"
  >("lightworker");
  const [showProgress, setShowProgress] = useState(true);
  const [milestoneReached, setMilestoneReached] = useState(false);

  // Create dates for demonstrations
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30); // 30 days in the future

  const nearFutureDate = new Date();
  nearFutureDate.setDate(nearFutureDate.getDate() + 3); // 3 days in the future

  const veryNearFutureDate = new Date();
  veryNearFutureDate.setMinutes(veryNearFutureDate.getMinutes() + 2); // 2 minutes in the future

  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - 1); // 1 year in the past

  const handleMilestone = (milestone: string) => {
    logger.divine("Milestone reached!", { milestone });
    // Handle milestone logic
  };

  return (
    <Container className="py-16">
      <div className="text-center mb-10">
        <Heading size="h1" className="mb-4">
          Prophetic Countdown
        </Heading>
        <Text className="max-w-2xl mx-auto">
          This component provides a beautiful animated countdown to important
          milestones, with role-based styling and divine particle effects.
        </Text>
      </div>

      {/* Controls */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-10 flex flex-wrap gap-4 justify-center">
        <div>
          <Text className="mb-2 font-semibold">Role Style:</Text>
          <div className="flex gap-2">
            {(["lightworker", "messenger", "witness", "guardian"] as const).map(
              (role) => (
                <Button
                  key={role}
                  variant={selectedRole === role ? "default" : "outline"}
                  onClick={() => setSelectedRole(role)}
                  className="capitalize"
                >
                  {role}
                </Button>
              ),
            )}
          </div>
        </div>

        <div>
          <Text className="mb-2 font-semibold">Progress Bar:</Text>
          <div className="flex gap-2">
            <Button
              variant={showProgress ? "default" : "outline"}
              onClick={() => setShowProgress(true)}
            >
              Show
            </Button>
            <Button
              variant={!showProgress ? "default" : "outline"}
              onClick={() => setShowProgress(false)}
            >
              Hide
            </Button>
          </div>
        </div>
      </div>

      {/* Countdown Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Future Countdown */}
        <div className="bg-slate-900/50 p-6 rounded-xl">
          <Heading size="h3" className="mb-4 text-center">
            Upcoming JAHmere Speech
          </Heading>
          <PropheticCountdown
            targetDate={futureDate}
            milestone="JAHmere's Keynote Address"
            role={selectedRole}
            showProgress={showProgress}
            onMilestoneReached={() => {
              setMilestoneReached(true);
              handleMilestone("JAHmere's Keynote Address");
            }}
          />
        </div>

        {/* Near Future Countdown */}
        <div className="bg-slate-900/50 p-6 rounded-xl">
          <Heading size="h3" className="mb-4 text-center">
            Imminent Court Decision
          </Heading>
          <PropheticCountdown
            targetDate={nearFutureDate}
            milestone="Final Court Ruling"
            role={selectedRole}
            showProgress={showProgress}
          />
        </div>

        {/* Very Near Future Countdown */}
        <div className="bg-slate-900/50 p-6 rounded-xl">
          <Heading size="h3" className="mb-4 text-center">
            Live in Minutes
          </Heading>
          <PropheticCountdown
            targetDate={veryNearFutureDate}
            milestone="Live Broadcast Begins"
            role={selectedRole}
            showProgress={showProgress}
          />
        </div>

        {/* Past Date (Completed) */}
        <div className="bg-slate-900/50 p-6 rounded-xl">
          <Heading size="h3" className="mb-4 text-center">
            Historic Milestone
          </Heading>
          <PropheticCountdown
            targetDate={pastDate}
            milestone="Freedom Declaration"
            role={selectedRole}
            showProgress={showProgress}
          />
        </div>
      </div>

      {/* Implementation Note */}
      <div className="mt-16 bg-white/5 backdrop-blur-sm p-6 rounded-lg">
        <Heading size="h3" className="mb-4">
          Implementation Details
        </Heading>
        <Text className="mb-4">
          The PropheticCountdown component is fully responsive,
          production-ready, and features:
        </Text>
        <ul className="list-disc pl-6 space-y-2">
          <li>Smooth number flip animations with Framer Motion</li>
          <li>
            Dynamic particle effects that intensify as deadline approaches
          </li>
          <li>Role-based theming with divine color schemes</li>
          <li>Progress tracking and celebration animations</li>
          <li>Error handling and SSR compatibility</li>
        </ul>
      </div>
    </Container>
  );
}
