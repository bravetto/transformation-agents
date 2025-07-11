"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Shield, DollarSign, Users } from "lucide-react";
import { withSafeUI } from "./with-safe-ui";

interface TrustBannerProps {
  className?: string;
  variant?: "default" | "minimal" | "detailed";
}

function TrustBanner({ className, variant = "default" }: TrustBannerProps) {
  const items = [
    { icon: Users, text: "Endorsed by Tony Dungy", key: "dungy" },
    { icon: Shield, text: "Pending Judge Ferrero Review", key: "judge" },
    { icon: Check, text: "100% Transparent", key: "transparent" },
    { icon: DollarSign, text: "$0 Cost to State", key: "cost" },
  ];

  if (variant === "minimal") {
    return (
      <div
        className={cn(
          "trust-banner bg-hope-gold/10 border-y border-hope-gold/20",
          className,
        )}
      >
        <div className="trust-banner-content">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {items.map((item) => (
              <span key={item.key} className="flex items-center gap-1">
                <item.icon className="h-3 w-3 text-hope-gold" />
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div
        className={cn(
          "trust-banner bg-gradient-to-r from-hope-gold/5 to-courage-blue/5",
          className,
        )}
      >
        <div className="trust-banner-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex flex-col items-center text-center"
              >
                <item.icon className="h-6 w-6 text-hope-gold mb-2" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default variant - centered and clean
  return (
    <div
      className={cn(
        "trust-banner bg-gradient-to-r from-hope-gold/10 to-courage-blue/10",
        className,
      )}
    >
      <div className="trust-banner-content">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-hope-gold" />
              <span className="text-gentle-charcoal">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Animated version with subtle attention-grabbing effects
export function AnimatedTrustBanner({ className }: TrustBannerProps) {
  const [highlightIndex, setHighlightIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { icon: Users, text: "Endorsed by Tony Dungy", key: "dungy" },
    { icon: Shield, text: "Pending Judge Ferrero Review", key: "judge" },
    { icon: Check, text: "100% Transparent", key: "transparent" },
    { icon: DollarSign, text: "$0 Cost to State", key: "cost" },
  ];

  return (
    <div
      className={cn(
        "trust-banner bg-gradient-to-r from-blue-50 to-hope-gold/10 border-b border-hope-gold/20",
        className,
      )}
    >
      <div className="trust-banner-content">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isHighlighted = index === highlightIndex;

            return (
              <div
                key={item.key}
                className={cn(
                  "flex items-center gap-2 transition-all duration-500",
                  isHighlighted && "scale-110",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-full transition-all duration-500",
                    isHighlighted
                      ? "bg-hope-gold text-white"
                      : "bg-hope-gold/20",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3 w-3 transition-colors duration-500",
                      isHighlighted ? "text-white" : "text-hope-gold",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "font-medium transition-colors duration-500",
                    isHighlighted ? "text-hope-gold" : "text-gentle-charcoal",
                  )}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default withSafeUI(TrustBanner, {
  componentName: "TrustBanner",
});
