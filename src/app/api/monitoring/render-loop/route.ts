import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // In production, just log and return success to prevent errors
    if (process.env.NODE_ENV === "production") {
      console.warn("🚨 Render loop detected:", {
        component: data.component,
        renderCount: data.renderCount,
        timespan: data.timespan,
      });

      return NextResponse.json({
        status: "logged",
        message: "Render loop logged successfully",
      });
    }

    // In development, provide more detailed logging
    console.error("🚨 RENDER LOOP ALERT:", data);

    return NextResponse.json({
      status: "success",
      message: "Render loop data received",
    });
  } catch (error) {
    console.error("Error processing render loop data:", error);
    return NextResponse.json(
      { error: "Failed to process render loop data" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    message: "Render loop monitoring endpoint is active",
  });
}
