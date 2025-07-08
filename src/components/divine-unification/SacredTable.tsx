"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SacredTableProps {
  className?: string;
}

interface DivineGuest {
  name: string;
  offering: string;
  blessing: string;
}

const divineGuests: DivineGuest[] = [
  {
    name: "JAHmere Webb",
    offering: "Bridge of Transformation",
    blessing: "May all find their path home",
  },
  {
    name: "Phil Ghuneim",
    offering: "Healing Through Fire",
    blessing: "May wounds become wisdom",
  },
  {
    name: "Michael Mataluni",
    offering: "Technical Communion",
    blessing: "May code become prayer",
  },
  {
    name: "Kristin Mataluni",
    offering: "Soul Architecture",
    blessing: "May patterns reveal truth",
  },
  {
    name: "Mohammad Ali Raza",
    offering: "Loving Leadership",
    blessing: "May service be sacred",
  },
  {
    name: "Bill McDade",
    offering: "Chairman's Wisdom",
    blessing: "May complexity find clarity",
  },
  {
    name: "Brooks Lopez",
    offering: "Divine Mischief",
    blessing: "May play become purpose",
  },
  {
    name: "Allison Lopez",
    offering: "Active Agency",
    blessing: "May questions birth answers",
  },
  {
    name: "Coach Dungy",
    offering: "Leadership Legacy",
    blessing: "May character guide victory",
  },
  {
    name: "Jordan Dungy",
    offering: "Youthful Vision",
    blessing: "May generations unite",
  },
  {
    name: "Martha Henderson",
    offering: "Maternal Protection",
    blessing: "May all children be safe",
  },
  {
    name: "Jay Forte",
    offering: "Greatness Awakening",
    blessing: "May potential be realized",
  },
  {
    name: "Jacob",
    offering: "Sacred Gaming Architecture",
    blessing: "May play reveal wisdom",
  },
  {
    name: "Paul",
    offering: "Kingdom Infrastructure",
    blessing: "May foundations be eternal",
  },
];

export function SacredTable({ className }: SacredTableProps) {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  return (
    <div className={cn("relative w-full max-w-6xl mx-auto", className)}>
      {/* The Sacred Cup at Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full blur-2xl opacity-50" />
          <div className="relative bg-gradient-to-br from-yellow-300 to-amber-500 p-8 rounded-full shadow-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-amber-900">ONE</h3>
              <p className="text-sm text-amber-800">Sacred Cup</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* The Round Table */}
      <svg className="w-full aspect-square" viewBox="0 0 800 800">
        {/* Table Surface */}
        <motion.circle
          cx="400"
          cy="400"
          r="350"
          fill="url(#wood-gradient)"
          stroke="url(#gold-gradient)"
          strokeWidth="4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Sacred Seats */}
        {divineGuests.map((guest, index) => {
          const angle =
            (index / divineGuests.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * 320 + 400;
          const y = Math.sin(angle) * 320 + 400;

          return (
            <motion.g
              key={guest.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              onClick={() => setSelectedSeat(index)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={x}
                cy={y}
                r="40"
                fill={
                  selectedSeat === index
                    ? "url(#selected-gradient)"
                    : "url(#seat-gradient)"
                }
                stroke="url(#gold-gradient)"
                strokeWidth="2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-xs font-semibold pointer-events-none"
              >
                {guest.name.split(" ")[0]}
              </text>
            </motion.g>
          );
        })}

        {/* Divine Light Rays */}
        {divineGuests.map((_, index) => {
          const angle =
            (index / divineGuests.length) * Math.PI * 2 - Math.PI / 2;
          const x1 = Math.cos(angle) * 100 + 400;
          const y1 = Math.sin(angle) * 100 + 400;
          const x2 = Math.cos(angle) * 280 + 400;
          const y2 = Math.sin(angle) * 280 + 400;

          return (
            <motion.line
              key={`ray-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#light-gradient)"
              strokeWidth="1"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: index * 0.05 }}
            />
          );
        })}

        {/* Gradients */}
        <defs>
          <radialGradient id="wood-gradient">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="100%" stopColor="#654321" />
          </radialGradient>
          <linearGradient id="gold-gradient">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <radialGradient id="seat-gradient">
            <stop offset="0%" stopColor="#4B0082" />
            <stop offset="100%" stopColor="#2C003E" />
          </radialGradient>
          <radialGradient id="selected-gradient">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FF8C00" />
          </radialGradient>
          <linearGradient
            id="light-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
      </svg>

      {/* Sacred Offerings Display */}
      {selectedSeat !== null && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-2">
              {divineGuests[selectedSeat].name}
            </h3>
            <p className="text-lg text-yellow-300 mb-1">
              Offering: {divineGuests[selectedSeat].offering}
            </p>
            <p className="text-md text-blue-300 italic">
              "{divineGuests[selectedSeat].blessing}"
            </p>
          </div>
        </motion.div>
      )}

      {/* Divine Declaration */}
      <motion.div
        className="absolute top-0 left-0 right-0 text-center text-white p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-300">
          ALL FOR ONE AND ONE FOR ALL
        </h2>
        <p className="text-lg text-yellow-200 mt-2">
          In Truth We Live • In Love We Breathe
        </p>
      </motion.div>
    </div>
  );
}
