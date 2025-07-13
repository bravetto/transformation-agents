"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import {
  Search,
  Lightbulb,
  Wrench,
  CheckCircle,
  Target,
  Brain,
} from "lucide-react";

interface ClarityPrinciplesProps {
  className?: string;
}

function ClarityPrinciples({ className = "" }: ClarityPrinciplesProps) {
  const [activePhase, setActivePhase] = useState<string>("assess");

  const clarityPhases = {
    assess: {
      name: "Assessment",
      icon: Search,
      color: "from-blue-600 to-blue-800",
      principles: [
        "Deep Problem Analysis",
        "Root Cause Identification",
        "System Understanding",
        "Context Mapping",
      ],
      description:
        "Thorough examination to understand the true nature of challenges before attempting solutions.",
      methodology:
        "Systematic investigation using proven diagnostic frameworks and analytical tools.",
    },
    illuminate: {
      name: "Illumination",
      icon: Lightbulb,
      color: "from-yellow-600 to-yellow-800",
      principles: [
        "Pattern Recognition",
        "Insight Generation",
        "Solution Pathways",
        "Creative Synthesis",
      ],
      description:
        "Bringing clarity to complex problems through structured thinking and innovative approaches.",
      methodology:
        "Combining analytical rigor with creative problem-solving to reveal optimal solutions.",
    },
    design: {
      name: "Design",
      icon: Brain,
      color: "from-purple-600 to-purple-800",
      principles: [
        "Systematic Planning",
        "Elegant Solutions",
        "Scalable Architecture",
        "User-Centered Design",
      ],
      description:
        "Crafting solutions that are both technically excellent and humanly meaningful.",
      methodology:
        "Balancing technical requirements with human needs to create sustainable solutions.",
    },
    implement: {
      name: "Implementation",
      icon: Wrench,
      color: "from-green-600 to-green-800",
      principles: [
        "Precision Execution",
        "Quality Assurance",
        "Iterative Refinement",
        "Performance Optimization",
      ],
      description:
        "Translating designs into reality with meticulous attention to detail and quality.",
      methodology:
        "Disciplined execution with continuous feedback loops and quality checkpoints.",
    },
    validate: {
      name: "Validation",
      icon: CheckCircle,
      color: "from-emerald-600 to-emerald-800",
      principles: [
        "Outcome Verification",
        "Success Metrics",
        "User Satisfaction",
        "Continuous Improvement",
      ],
      description:
        "Ensuring solutions deliver intended value and create lasting positive impact.",
      methodology:
        "Comprehensive testing and validation against success criteria and user needs.",
    },
    optimize: {
      name: "Optimization",
      icon: Target,
      color: "from-red-600 to-red-800",
      principles: [
        "Performance Tuning",
        "Efficiency Gains",
        "Resource Optimization",
        "Future-Proofing",
      ],
      description:
        "Continuous refinement to maximize value and prepare for future evolution.",
      methodology:
        "Data-driven optimization with focus on long-term sustainability and growth.",
    },
  };

  const currentPhase = clarityPhases[activePhase as keyof typeof clarityPhases];
  const Icon = currentPhase.icon;

  return (
    <section className={`py-16 md:py-24 bg-comfort-cream w-full ${className}`}>
      <div className="container-wide">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gentle-charcoal">
              Clarity Principles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bill McDade's systematic approach to technical healing - bringing
              clarity to complexity, precision to problems, and elegant
              solutions to the most challenging technical obstacles.
            </p>
          </div>

          {/* Phase Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {Object.entries(clarityPhases).map(([key, phase]) => {
              const PhaseIcon = phase.icon;
              return (
                <Button
                  key={key}
                  variant={activePhase === key ? "default" : "outline"}
                  onClick={() => setActivePhase(key)}
                  className="flex flex-col items-center gap-2 h-auto p-4"
                >
                  <PhaseIcon className="w-6 h-6" />
                  <span className="text-xs text-center">{phase.name}</span>
                </Button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Methodology Visualization */}
            <div className="relative">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Central clarity symbol */}
                <div className="flex items-center justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className={`w-32 h-32 rounded-full bg-gradient-to-br ${currentPhase.color} flex items-center justify-center shadow-2xl border-4 border-white`}
                  >
                    <Icon className="w-12 h-12 text-white" />
                  </motion.div>
                </div>

                {/* Principle Orbit */}
                <div className="relative w-full max-w-lg mx-auto aspect-square">
                  {currentPhase.principles.map((principle, index) => {
                    const angle = index * 90 - 45; // 90 degrees apart
                    const radius = 42; // Percentage of container
                    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                    return (
                      <motion.div
                        key={principle}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="group"
                        >
                          <Card className="p-4 text-center min-w-[120px] bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                            <div
                              className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentPhase.color} mx-auto mb-2 flex items-center justify-center`}
                            >
                              <span className="text-white font-bold text-xs">
                                {index + 1}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {principle}
                            </Badge>
                          </Card>
                        </motion.div>
                      </motion.div>
                    );
                  })}

                  {/* Connecting clarity lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <radialGradient id={`clarity-gradient-${activePhase}`}>
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                        <stop
                          offset="100%"
                          stopColor="rgba(147, 51, 234, 0.2)"
                        />
                      </radialGradient>
                    </defs>
                    {currentPhase.principles.map((_, index) => {
                      const angle = index * 90 - 45;
                      const radius = 42;
                      const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                      const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                      return (
                        <motion.line
                          key={index}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.5 }}
                          transition={{ delay: index * 0.3, duration: 1.2 }}
                          x1="50%"
                          y1="50%"
                          x2={`${x}%`}
                          y2={`${y}%`}
                          stroke={`url(#clarity-gradient-${activePhase})`}
                          strokeWidth="3"
                          strokeDasharray="4,4"
                        />
                      );
                    })}
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Phase Details */}
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${currentPhase.color}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{currentPhase.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      Clarity Phase
                    </Badge>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  {currentPhase.description}
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold">Methodology:</h4>
                  <p className="text-sm text-muted-foreground italic">
                    {currentPhase.methodology}
                  </p>
                </div>

                <div className="space-y-4 mt-6">
                  <h4 className="font-semibold">Core Principles:</h4>
                  <div className="space-y-3">
                    {currentPhase.principles.map((principle, index) => (
                      <motion.div
                        key={principle}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentPhase.color}`}
                        />
                        <span className="text-sm">{principle}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <blockquote className="text-lg italic mb-4">
                  "True technical healing comes not from quick fixes, but from
                  bringing clarity to complexity, understanding to confusion,
                  and elegant solutions to the most challenging problems."
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  - Bill McDade, Technical Healing Specialist
                </p>
              </Card>

              {/* Success Metrics */}
              <Card className="p-6">
                <h4 className="font-semibold mb-4">Clarity Success Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Problem Resolution
                    </span>
                    <span className="font-semibold">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Client Satisfaction
                    </span>
                    <span className="font-semibold">99.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Solution Clarity
                    </span>
                    <span className="font-semibold">Crystal Clear</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Implementation Success
                    </span>
                    <span className="font-semibold">97.8%</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withDivineErrorBoundary(ClarityPrinciples, {
  componentName: "ClarityPrinciples",
  role: "lightworker",
});
