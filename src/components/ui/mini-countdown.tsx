"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { withSafeUI } from "./with-safe-ui";

interface MiniCountdownProps {
  targetDate: Date;
  className?: string;
  linkHref?: string;
}

function MiniCountdown({
  targetDate,
  className,
  linkHref = "/the-case",
}: MiniCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) return null;

  // Choose what to display based on time remaining
  const displayValue =
    timeLeft.days > 0
      ? `${timeLeft.days}d ${timeLeft.hours}h`
      : timeLeft.hours > 0
        ? `${timeLeft.hours}h ${timeLeft.minutes}m`
        : `${timeLeft.minutes}m ${timeLeft.seconds}s`;

  return (
    <Link
      href={linkHref}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors",
        className,
      )}
    >
      <Clock className="h-3 w-3" />
      <span>Decision in {displayValue}</span>
    </Link>
  );
}

// Export both named and default for compatibility
export { MiniCountdown };

export default withSafeUI(MiniCountdown, {
  componentName: "MiniCountdown",
});
