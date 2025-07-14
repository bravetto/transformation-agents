"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, BarChart, User, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { withSafeUI } from "./with-safe-ui";

interface QuickNavProps {
  className?: string;
  variant?: "default" | "minimal" | "full";
  showLabels?: boolean;
}

function QuickNav({
  className = "",
  variant = "default",
  showLabels = true,
}: QuickNavProps) {
  const navItems = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "The Full Case",
      description:
        "Understand JAHmere's situation and the rehabilitation option",
      href: "/the-case",
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      title: "Impact Dashboard",
      description: "See real-time community support metrics",
      href: "/impact",
    },
    {
      icon: <User className="w-5 h-5" />,
      title: "Jordan Dungy's Story",
      description: "Read his full testimony and connection to JAHmere",
      href: "/people/jordan-dungy",
    },
  ];

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center justify-center gap-6", className)}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            {item.icon}
            {showLabels && <span>{item.title}</span>}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {navItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={item.href} className="block h-full">
            <Card className="p-6 h-full hover:shadow-md transition-shadow flex flex-col">
              <div className="mb-4 p-2 rounded-full bg-blue-100 w-fit">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              {variant === "full" && (
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {item.description}
                </p>
              )}
              <div className="text-blue-600 font-medium flex items-center gap-1 mt-auto">
                <span>View</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default QuickNav;
