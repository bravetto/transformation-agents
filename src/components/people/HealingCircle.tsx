"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface HealingCircleProps {
  className?: string;
}

function HealingCircle({ className = "" }: HealingCircleProps) {
  const healingStages = [
    {
      stage: "Recognition",
      color: "bg-red-500",
      description: "Acknowledging the wound",
    },
    {
      stage: "Acceptance",
      color: "bg-orange-500",
      description: "Embracing the journey",
    },
    {
      stage: "Processing",
      color: "bg-yellow-500",
      description: "Working through trauma",
    },
    {
      stage: "Integration",
      color: "bg-green-500",
      description: "Finding new meaning",
    },
    {
      stage: "Transformation",
      color: "bg-blue-500",
      description: "Becoming whole again",
    },
    {
      stage: "Service",
      color: "bg-purple-500",
      description: "Helping others heal",
    },
  ];

  return (
    <section className={`py-16 md:py-24 bg-comfort-cream w-full ${className}`}>
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gentle-charcoal">
              The Healing Circle
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Phil's journey through trauma recovery demonstrates the sacred
              cycle of healing, where pain transforms into purpose and wounds
              become wisdom.
            </p>
          </div>

          <div className="relative">
            {/* Central healing symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-500 to-rose-500 flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">HEAL</span>
              </motion.div>
            </div>

            {/* Healing stages in a circle */}
            <div className="relative w-full max-w-2xl mx-auto aspect-square">
              {healingStages.map((stage, index) => {
                const angle = index * 60 - 90; // Start from top, 60 degrees apart
                const radius = 40; // Percentage of container
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <motion.div
                    key={stage.stage}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <Card className="p-4 text-center min-w-[140px] hover:shadow-lg transition-shadow">
                      <div
                        className={`w-6 h-6 rounded-full ${stage.color} mx-auto mb-2`}
                      />
                      <Badge variant="outline" className="mb-2">
                        {stage.stage}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {stage.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Healing wisdom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-16 text-center"
          >
            <Card className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <blockquote className="text-lg italic mb-4">
                "Healing is not about forgetting the past, but about
                transforming the pain into purpose, the wounds into wisdom, and
                the trauma into triumph."
              </blockquote>
              <p className="text-sm text-muted-foreground">
                - Phil Ghuneim's Journey of Restoration
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default withErrorBoundary(HealingCircle, "HealingCircle");
