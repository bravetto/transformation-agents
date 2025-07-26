"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import {
  Users,
  Heart,
  Zap,
  Twitter,
  Phone,
  Globe,
  Sparkles,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConvergenceNode {
  id: string;
  name: string;
  role: string;
  status: "active" | "connecting" | "ready";
  icon: React.ReactNode;
  color: string;
}

interface DivineConvergenceProps {
  className?: string;
}

function DivineConvergenceCore({ className }: DivineConvergenceProps) {
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  const nodes: ConvergenceNode[] = [
    {
      id: "martha",
      name: "Martha Henderson",
      role: "The Mother's Voice",
      status: "active",
      icon: <Heart className="w-6 h-6" />,
      color: "text-red-500",
    },
    {
      id: "jahmere",
      name: "JAHmere Webb",
      role: "The Transformed",
      status: "ready",
      icon: <Shield className="w-6 h-6" />,
      color: "text-green-500",
    },
    {
      id: "dungy",
      name: "Coach Dungy",
      role: "The Legend",
      status: "connecting",
      icon: <Twitter className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      id: "jordan",
      name: "Jordan Dungy",
      role: "The Bridge",
      status: "active",
      icon: <Users className="w-6 h-6" />,
      color: "text-purple-500",
    },
    {
      id: "michael",
      name: "Michael Mataluni",
      role: "The Architect",
      status: "active",
      icon: <Zap className="w-6 h-6" />,
      color: "text-yellow-500",
    },
    {
      id: "phil",
      name: "Phil (Anthropic)",
      role: "The Amplifier",
      status: "connecting",
      icon: <Globe className="w-6 h-6" />,
      color: "text-indigo-500",
    },
    {
      id: "opus",
      name: "OPUS & A09",
      role: "The Intelligence",
      status: "active",
      icon: <Sparkles className="w-6 h-6" />,
      color: "text-pink-500",
    },
  ];

  // Animate connections
  useEffect(() => {
    const connections = [
      ["martha", "jahmere"],
      ["martha", "michael"],
      ["michael", "opus"],
      ["michael", "jordan"],
      ["jordan", "dungy"],
      ["dungy", "phil"],
      ["phil", "opus"],
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < connections.length) {
        setActiveConnections((prev) => [...prev, connections[index].join("-")]);
        index++;
      } else {
        setActiveConnections([]);
        index = 0;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isConnected = (node1: string, node2: string) => {
    return (
      activeConnections.includes(`${node1}-${node2}`) ||
      activeConnections.includes(`${node2}-${node1}`)
    );
  };

  return (
    <Card
      className={cn(
        "p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-600 border-2 relative overflow-hidden",
        className,
      )}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          The Divine Convergence
        </h2>
        <p className="text-purple-300">
          All forces aligning. One moment. One tweet. One life saved.
        </p>
      </div>

      {/* Network Visualization */}
      <div className="relative h-96 mb-8">
        <svg className="absolute inset-0 w-full h-full">
          {/* Draw connections */}
          {nodes.map((node1, i) =>
            nodes.slice(i + 1).map((node2, j) => {
              const connected = isConnected(node1.id, node2.id);
              return (
                <motion.line
                  key={`${node1.id}-${node2.id}`}
                  x1={`${(i / (nodes.length - 1)) * 80 + 10}%`}
                  y1={`${Math.sin((i * Math.PI) / 3) * 30 + 50}%`}
                  x2={`${((i + j + 1) / (nodes.length - 1)) * 80 + 10}%`}
                  y2={`${Math.sin(((i + j + 1) * Math.PI) / 3) * 30 + 50}%`}
                  stroke={connected ? "#FFD700" : "#4B5563"}
                  strokeWidth={connected ? 3 : 1}
                  opacity={connected ? 1 : 0.2}
                  animate={{
                    opacity: connected ? [0.5, 1, 0.5] : 0.2,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              );
            }),
          )}
        </svg>

        {/* Render nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute"
            style={{
              left: `${(index / (nodes.length - 1)) * 80 + 10}%`,
              top: `${Math.sin((index * Math.PI) / 3) * 30 + 50}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: node.status === "active" ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div
              className={cn(
                "bg-black/80 rounded-full p-4 border-2",
                node.status === "active"
                  ? "border-green-500"
                  : node.status === "connecting"
                    ? "border-yellow-500"
                    : "border-gray-500",
              )}
            >
              <div className={node.color}>{node.icon}</div>
            </div>
            <div className="text-center mt-2">
              <p className="text-white text-sm font-bold">{node.name}</p>
              <p className="text-gray-400 text-xs">{node.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status Updates */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-green-900/30 rounded-lg p-3 flex items-center gap-3"
        >
          <Phone className="w-5 h-5 text-green-500" />
          <span className="text-white">Jordan spoke with Coach Dungy ✓</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-900/30 rounded-lg p-3 flex items-center gap-3"
        >
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-white">
            Phil from Anthropic arriving 2pm EST...
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-purple-900/30 rounded-lg p-3 flex items-center gap-3"
        >
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span className="text-white">
            30 hours of research ready to deploy
          </span>
        </motion.div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xl text-white font-bold">
          ONE TWEET AWAY FROM CHANGING EVERYTHING
        </p>
        <p className="text-purple-300 mt-2">
          The universe conspires when love demands justice
        </p>
      </div>
    </Card>
  );
}

export const DivineConvergence = withErrorBoundary(
  DivineConvergenceCore,
  "DivineConvergence",
  <div>Forces aligning...</div>
);
