"use client";

import { useState, useEffect } from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft("Time's up!");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`text-center ${className}`}>
      <div className="text-3xl font-bold text-hope-gold">{timeLeft}</div>
      <div className="text-sm text-gray-600">until decision</div>
    </div>
  );
}

export default withErrorBoundary(CountdownTimer, {
  componentName: "CountdownTimer",
  id: "countdowntimer",
});
