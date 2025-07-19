import { NextResponse } from "next/server";

export async function GET() {
  // July 28th, 2024 at 2:37 PM EST (JAHmere's freedom moment)
  const freedomDate = new Date("2024-07-28T14:37:00-05:00");
  const now = new Date();
  const timeLeft = freedomDate.getTime() - now.getTime();

  if (timeLeft <= 0) {
    return NextResponse.json({
      status: "freedom-achieved",
      message: "JAHmere walks in freedom!",
      celebration: true,
    });
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return NextResponse.json({
    timeLeft: {
      days,
      hours,
      minutes,
      seconds,
    },
    totalSeconds: Math.floor(timeLeft / 1000),
    freedomDate: freedomDate.toISOString(),
    message: `${days} days until JAHmere's freedom!`,
    urgency: days <= 30 ? "critical" : days <= 90 ? "urgent" : "active",
  });
}
