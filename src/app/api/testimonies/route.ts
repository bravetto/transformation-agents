import { NextRequest, NextResponse } from "next/server";

interface Testimony {
  id: string;
  name: string;
  role: string;
  message: string;
  timestamp: string;
  verified: boolean;
}

const testimonies: Testimony[] = [
  {
    id: "dungy-1",
    name: "Tony Dungy",
    role: "NFL Hall of Fame Coach",
    message:
      "JAHmere represents everything we hope to achieve in mentorship and transformation.",
    timestamp: new Date().toISOString(),
    verified: true,
  },
  {
    id: "forte-1",
    name: "Jay Forte",
    role: "Talent Assessment Expert",
    message:
      "JAHmere scored in the top 5% for leadership potential and community impact.",
    timestamp: new Date().toISOString(),
    verified: true,
  },
];

export async function GET() {
  return NextResponse.json({
    testimonies,
    count: testimonies.length,
    lastUpdated: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newTestimony: Testimony = {
      id: `testimony-${Date.now()}`,
      name: body.name || "Anonymous Supporter",
      role: body.role || "Community Member",
      message: body.message,
      timestamp: new Date().toISOString(),
      verified: false,
    };

    testimonies.push(newTestimony);

    return NextResponse.json({
      success: true,
      testimony: newTestimony,
      message: "Testimony received and will be reviewed for verification",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit testimony" },
      { status: 500 },
    );
  }
}
