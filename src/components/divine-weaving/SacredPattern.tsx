"use client";

import { motion } from "framer-motion";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { cn } from "@/lib/utils";

interface SacredNode {
  id: string;
  name: string;
  role: string;
  essence: string;
  connections: string[];
}

interface SacredPatternProps {
  className?: string;
}

const sacredNodes: SacredNode[] = [
  {
    id: "jahmere-webb",
    name: "JAHmere Webb",
    role: "The Bridge Builder",
    essence: "Divine Transformation",
    connections: ["phil-ghuneim", "michael-mataluni", "martha-henderson"],
  },
  {
    id: "phil-ghuneim",
    name: "Phil Ghuneim",
    role: "Survivor & Healer",
    essence: "Sacred Healing",
    connections: ["jahmere-webb", "michael-mataluni"],
  },
  {
    id: "michael-mataluni",
    name: "Michael Mataluni",
    role: "Technical Bridge Builder",
    essence: "Divine Architecture",
    connections: [
      "kristin-mataluni",
      "mohammad-ali-raza",
      "phil-ghuneim",
      "jahmere-webb",
    ],
  },
  {
    id: "kristin-mataluni",
    name: "Kristin Mataluni",
    role: "Soul Architect",
    essence: "Pattern Weaving",
    connections: ["michael-mataluni", "allison-lopez"],
  },
  {
    id: "mohammad-ali-raza",
    name: "Mohammad Ali Raza",
    role: "Solution Architect",
    essence: "Spiritual Leadership",
    connections: ["michael-mataluni", "bill-mcdade"],
  },
  {
    id: "bill-mcdade",
    name: "Bill McDade",
    role: "The Chairman",
    essence: "Technical Healing",
    connections: ["mohammad-ali-raza", "brooks-lopez"],
  },
  {
    id: "brooks-lopez",
    name: "Brooks Lopez",
    role: "Divine Mischief Maker",
    essence: "Sacred Play",
    connections: ["allison-lopez", "bill-mcdade", "jacob", "paul"],
  },
  {
    id: "allison-lopez",
    name: "Allison Lopez",
    role: "Wisdom Warrior",
    essence: "Active Agency",
    connections: ["brooks-lopez", "kristin-mataluni"],
  },
  {
    id: "jacob",
    name: "Jacob",
    role: "Sacred Architect of Play",
    essence: "Witness to the Weary",
    connections: ["brooks-lopez", "paul"],
  },
  {
    id: "paul",
    name: "Paul",
    role: "Kingdom Builder",
    essence: "Infrastructure Witness",
    connections: ["brooks-lopez", "jacob"],
  },
];

function SacredPattern({ className }: SacredPatternProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-square max-w-4xl mx-auto",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full" />

      {/* Sacred Circle */}
      <motion.div
        className="absolute inset-0 border-2 border-blue-200/30 rounded-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Divine Nodes */}
      {sacredNodes.map((node, index) => {
        const angle = (index / sacredNodes.length) * Math.PI * 2;
        const x = Math.cos(angle) * 45 + 50;
        const y = Math.sin(angle) * 45 + 50;

        return (
          <motion.div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
              <motion.div
                className="relative bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-white/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-lg font-semibold text-white">
                  {node.name}
                </h3>
                <p className="text-sm text-blue-200">{node.role}</p>
                <p className="text-xs text-purple-200 mt-1">{node.essence}</p>
              </motion.div>
            </div>
          </motion.div>
        );
      })}

      {/* Sacred Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <g>
          {sacredNodes.map((node) => {
            const nodeIndex = sacredNodes.findIndex((n) => n.id === node.id);
            const nodeAngle = (nodeIndex / sacredNodes.length) * Math.PI * 2;
            const x1 = Math.cos(nodeAngle) * 45 + 50;
            const y1 = Math.sin(nodeAngle) * 45 + 50;

            return node.connections.map((connectionId) => {
              const connectedIndex = sacredNodes.findIndex(
                (n) => n.id === connectionId,
              );
              const connectedAngle =
                (connectedIndex / sacredNodes.length) * Math.PI * 2;
              const x2 = Math.cos(connectedAngle) * 45 + 50;
              const y2 = Math.sin(connectedAngle) * 45 + 50;

              return (
                <motion.line
                  key={`${node.id}-${connectionId}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="url(#sacred-gradient)"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{
                    duration: 1.5,
                    delay: Math.min(nodeIndex, connectedIndex) * 0.2,
                  }}
                />
              );
            });
          })}
        </g>
        <defs>
          <linearGradient
            id="sacred-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Divine Energy Flow */}
      <motion.div
        className="absolute inset-0 border-4 border-white/10 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.02, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </div>
  );
}

export default withErrorBoundary(SacredPattern, "SacredPattern");
