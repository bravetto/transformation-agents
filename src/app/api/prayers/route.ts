import { NextRequest, NextResponse } from "next/server";

interface PrayerRequest {
  name?: string;
  location?: string;
  message?: string;
}

interface PrayerResponse {
  id: string;
  status: "received" | "blessed" | "answered";
  message: string;
  timestamp: string;
  divineNumber: number;
}

// In-memory prayer counter (in production, use database)
let prayerCount = 1337; // Starting at divine number

export async function POST(request: NextRequest) {
  try {
    const body: PrayerRequest = await request.json();

    prayerCount++;

    const response: PrayerResponse = {
      id: `prayer-${Date.now()}`,
      status: "received",
      message: getDivineResponse(prayerCount),
      timestamp: new Date().toISOString(),
      divineNumber: prayerCount,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Prayer processing failed",
        message: "Divine intervention required",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalPrayers: prayerCount,
    status: "active",
    lastUpdated: new Date().toISOString(),
    nextMilestone: getNextMilestone(prayerCount),
    divineMessage: getDivineResponse(prayerCount),
  });
}

function getDivineResponse(count: number): string {
  const responses = [
    `${count} prayers received - JAHmere's freedom draws near!`,
    `Divine intervention activated at prayer #${count}`,
    `${count} voices crying out for justice - Heaven is listening!`,
    `Prayer warrior #${count} has joined the battle for JAHmere's freedom`,
    `${count} prayers ascending - July 28th miracle manifesting!`,
  ];

  return responses[count % responses.length];
}

function getNextMilestone(count: number): { target: number; message: string } {
  const milestones = [2000, 5000, 10000, 25000, 50000];
  const nextMilestone = milestones.find((m) => m > count) || 100000;

  return {
    target: nextMilestone,
    message: `${nextMilestone - count} prayers until next divine breakthrough!`,
  };
}
