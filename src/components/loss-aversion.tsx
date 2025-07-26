"use client";

import { useState, useEffect } from "react";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";

import {
  AlertTriangle,
  TrendingDown,
  Users,
  DollarSign,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Consequence {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  color: string;
}

const consequences: Consequence[] = [
  {
    icon: <RefreshCw className="w-6 h-6" />,
    label: "Recidivism Risk",
    value: "73%",
    description: "Chance JAHmere reoffends without support",
    color: "text-red-500",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    label: "Taxpayer Cost",
    value: "$175,000",
    description: "Annual cost of incarceration vs $45K for rehabilitation",
    color: "text-orange-500",
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: "Youth Unreached",
    value: "500+",
    description: "At-risk youth who won't receive mentorship",
    color: "text-yellow-500",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    label: "Cycle Continues",
    value: "∞",
    description: "Generational trauma and incarceration perpetuated",
    color: "text-purple-500",
  },
];

function LossAversion() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("loss-aversion");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Calculate dynamic costs
  const costPerSecond = 5.55; // $175K per year / seconds in year
  const totalCost = Math.floor(timeElapsed * costPerSecond);
  const youthMissed = Math.floor(timeElapsed / 60); // 1 youth per minute

  return (
    <div id="loss-aversion" className="relative">
      <Card className="bg-gradient-to-br from-red-950/20 to-orange-950/20 border-red-900/50 p-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(239, 68, 68, 0.1) 35px, rgba(239, 68, 68, 0.1) 70px)`,
            }}
          />
        </div>

        <div className="relative space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-900/30 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                The Cost of Doing Nothing
              </h3>
              <p className="text-gray-300">
                Every moment of inaction has real consequences for JAHmere,
                taxpayers, and at-risk youth
              </p>
            </div>
          </div>

          {/* Live Counter */}
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-900/20 border border-red-800/50 rounded-xl p-4"
            >
              <p className="text-sm text-red-400 mb-2">
                Since you started reading this:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold text-white">
                    ${totalCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">Taxpayer money wasted</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{youthMissed}</p>
                  <p className="text-sm text-gray-400">
                    Youth who could be helped
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Consequences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consequences.map((consequence, index) => (
              <motion.div
                key={consequence.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/30 border border-gray-800 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className={cn("mt-1", consequence.color)}>
                    {consequence.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="font-semibold text-white">
                        {consequence.label}
                      </h4>
                      <span
                        className={cn("text-2xl font-bold", consequence.color)}
                      >
                        {consequence.value}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {consequence.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center pt-4"
          >
            <p className="text-lg text-white font-semibold mb-2">
              But there's still time to change this story
            </p>
            <p className="text-gray-300">
              Your action today can transform these statistics into success
              stories
            </p>
          </motion.div>
        </div>
      </Card>
    </div>
  );
}

export default LossAversion;
