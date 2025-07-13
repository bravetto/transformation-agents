"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

interface PatternWeaverProps {
  className?: string;
}

function PatternWeaver({ className = "" }: PatternWeaverProps) {
  const [activePattern, setActivePattern] = useState<string>("soul");

  const patterns = {
    soul: {
      name: "Soul Architecture",
      color: "from-purple-500 to-pink-500",
      description: "The foundational blueprint of spiritual design",
      elements: [
        "Core Values",
        "Life Purpose",
        "Sacred Gifts",
        "Divine Calling",
      ],
    },
    mind: {
      name: "Consciousness Weaving",
      color: "from-blue-500 to-cyan-500",
      description: "The intricate patterns of thought and awareness",
      elements: ["Intuition", "Logic", "Creativity", "Wisdom"],
    },
    heart: {
      name: "Emotional Tapestry",
      color: "from-rose-500 to-red-500",
      description: "The sacred geometry of feeling and connection",
      elements: ["Compassion", "Joy", "Courage", "Love"],
    },
    spirit: {
      name: "Divine Connection",
      color: "from-gold-500 to-yellow-500",
      description: "The luminous threads connecting all existence",
      elements: ["Faith", "Grace", "Peace", "Unity"],
    },
  };

  const currentPattern = patterns[activePattern as keyof typeof patterns];

  return (
    <section className={`py-16 md:py-24 bg-comfort-cream w-full ${className}`}>
      <div className="container-wide">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gentle-charcoal">
              The Pattern Weaver
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kristin's mastery lies in seeing the sacred patterns that connect
              all things, weaving together the threads of soul, mind, heart, and
              spirit into divine wholeness.
            </p>
          </div>

          {/* Pattern Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(patterns).map(([key, pattern]) => (
              <Button
                key={key}
                variant={activePattern === key ? "default" : "outline"}
                onClick={() => setActivePattern(key)}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${pattern.color}`}
                />
                {pattern.name}
              </Button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Pattern Visualization */}
            <div className="relative">
              <motion.div
                key={activePattern}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-md mx-auto aspect-square"
              >
                {/* Central pattern hub */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`w-32 h-32 rounded-full bg-gradient-to-r ${currentPattern.color} flex items-center justify-center shadow-2xl`}
                  >
                    <span className="text-white font-bold text-sm text-center">
                      {currentPattern.name.split(" ")[0]}
                    </span>
                  </motion.div>
                </div>

                {/* Orbiting pattern elements */}
                {currentPattern.elements.map((element, index) => {
                  const angle = index * 90 - 45; // 90 degrees apart, starting at 45°
                  const radius = 45; // Percentage of container
                  const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                  const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                  return (
                    <motion.div
                      key={element}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <motion.div
                        animate={{
                          rotate: -360,
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5,
                          },
                        }}
                      >
                        <Card className="p-3 text-center min-w-[100px] bg-white/90 backdrop-blur-sm">
                          <Badge variant="secondary" className="text-xs">
                            {element}
                          </Badge>
                        </Card>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient
                      id={`gradient-${activePattern}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(139, 69, 19, 0.3)" />
                      <stop offset="100%" stopColor="rgba(255, 215, 0, 0.3)" />
                    </linearGradient>
                  </defs>
                  {currentPattern.elements.map((_, index) => {
                    const angle = index * 90 - 45;
                    const radius = 45;
                    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                    return (
                      <motion.line
                        key={index}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ delay: index * 0.3, duration: 1 }}
                        x1="50%"
                        y1="50%"
                        x2={`${x}%`}
                        y2={`${y}%`}
                        stroke={`url(#gradient-${activePattern})`}
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    );
                  })}
                </svg>
              </motion.div>
            </div>

            {/* Pattern Description */}
            <motion.div
              key={activePattern}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {currentPattern.name}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {currentPattern.description}
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold">Pattern Elements:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {currentPattern.elements.map((element, index) => (
                      <motion.div
                        key={element}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentPattern.color}`}
                        />
                        <span className="text-sm">{element}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <blockquote className="text-lg italic mb-4">
                  "Every soul carries within it a unique pattern, a sacred
                  geometry that connects it to the divine tapestry of
                  existence."
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  - Kristin Mataluni, Soul Architect
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withDivineErrorBoundary(PatternWeaver, {
  componentName: "PatternWeaver",
  role: "lightworker",
});
