"use client";

import { motion } from "framer-motion";
import { Shield, Award, Users, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "./with-safe-ui";

interface TrustBarProps {
  className?: string;
  variant?: "default" | "minimal";
}

function TrustBar({ className = "", variant = "default" }: TrustBarProps) {
  const trustItems = [
    {
      icon: <Award className="w-4 h-4" />,
      label: "Tony Dungy Endorsed",
      value: "NFL Hall of Fame",
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Community Support",
      value: "1,247 Letters",
    },
    {
      icon: <Shield className="w-4 h-4" />,
      label: "Verified Testimonies",
      value: "100% Authentic",
    },
    {
      icon: <Lock className="w-4 h-4" />,
      label: "Secure & Private",
      value: "SSL Protected",
    },
  ];

  if (variant === "minimal") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-6 py-2 bg-gray-50 border-b",
          className,
        )}
      >
        {trustItems.slice(0, 2).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-sm"
          >
            <span className="text-hope-gold">{item.icon}</span>
            <span className="font-medium text-gray-700">{item.value}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-gray-50 to-white border-b border-gray-200",
        className,
      )}
    >
      <div className="container-wide py-3">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="p-1.5 bg-hope-gold/10 rounded-full text-hope-gold">
                {item.icon}
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-600">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withSafeUI(TrustBar, {
  componentName: "TrustBar",
});
