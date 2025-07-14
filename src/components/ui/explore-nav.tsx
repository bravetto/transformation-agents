"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, BarChart, User, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { withSafeUI } from "./with-safe-ui";

interface ExploreNavProps {
  className?: string;
}

function ExploreNav({ className = "" }: ExploreNavProps) {
  const navItems = [
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "The Full Case",
      description: "Understand the situation and rehabilitation path",
      href: "/the-case",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      icon: <BarChart className="w-6 h-6 text-white" />,
      title: "Impact Dashboard",
      description: "See real-time community support metrics",
      href: "/impact",
      color: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      icon: <User className="w-6 h-6 text-white" />,
      title: "Jordan Dungy\'s Story",
      description: "Read his full testimony and connection",
      href: "/people/jordan-dungy",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {navItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Link href={item.href} className="block h-full">
            <Card className="p-6 h-full hover:shadow-lg transition-all overflow-hidden relative group">
              {/* Background gradient that moves on hover */}
              <div
                className={`absolute inset-0 ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`}
              />

              {/* Icon with background */}
              <div
                className={`mb-4 p-3 rounded-full ${item.color} w-fit z-10 relative`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-2 relative z-10">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 relative z-10">
                {item.description}
              </p>

              <div className="text-blue-600 font-medium flex items-center gap-1 mt-auto group-hover:gap-2 transition-all relative z-10">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default ExploreNav;
