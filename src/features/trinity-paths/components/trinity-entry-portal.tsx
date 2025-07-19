"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Scale, Heart, ArrowRight, Sparkles } from "lucide-react";
import { useTrinityPath } from "../context";
import { logger } from "@/lib/logger";
import type { PathType } from "../types";

interface TrinityEntryPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onPathSelected?: (pathType: PathType) => void;
}

const pathConfig = {
  champion: {
    title: "I Have Influence",
    subtitle: "Champion Builder",
    description:
      "Lead with legacy. Build champions. Transform through influence.",
    icon: Crown,
    color: "from-amber-400 to-yellow-600",
    bgColor: "bg-gradient-to-br from-amber-50 to-yellow-100",
    borderColor: "border-amber-300",
    textColor: "text-amber-900",
    features: [
      "Tony Dungy Welcome Video",
      "Legacy Assessment",
      "Network Activation",
      "Mentorship Matching",
    ],
    cta: "Lead Now",
    targetAudience: "Business leaders, faith leaders, influencers",
  },
  evidence: {
    title: "I Seek Truth",
    subtitle: "Evidence Seeker",
    description:
      "Data drives decisions. Evidence transforms policy. Truth sets free.",
    icon: Scale,
    color: "from-blue-400 to-indigo-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
    borderColor: "border-blue-300",
    textColor: "text-blue-900",
    features: [
      "12% vs 70% Recidivism Data",
      "Greatness Zone Miracle",
      "Evidence Hub",
      "Policy Simulator",
    ],
    cta: "Analyze Now",
    targetAudience: "Researchers, policy makers, analysts",
  },
  youth: {
    title: "I Serve Youth",
    subtitle: "Movement Builder",
    description:
      "Youth transform youth. Warriors create warriors. Movement spreads.",
    icon: Heart,
    color: "from-green-400 to-emerald-600",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
    borderColor: "border-green-300",
    textColor: "text-green-900",
    features: [
      "Warrior Creation System",
      "Good Deed Revolution",
      "Mission Board",
      "Community Grid",
    ],
    cta: "Join Now",
    targetAudience: "Young people, community organizers, activists",
  },
};

export default function TrinityEntryPortal({
  isOpen,
  onClose,
  onPathSelected,
}: TrinityEntryPortalProps) {
  const { selectPath, isPathSelected } = useTrinityPath();
  const [selectedPath, setSelectedPath] = useState<PathType | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-close if path is already selected
  useEffect(() => {
    if (isPathSelected) {
      onClose();
    }
  }, [isPathSelected, onClose]);

  const handlePathSelection = async (pathType: PathType) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setSelectedPath(pathType);

    // Brief animation delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Select the path
    selectPath(pathType, {
      selectedFrom: "trinity-portal",
      timestamp: new Date().toISOString(),
    });

    logger.divine("Trinity Path Selected", { pathType, portal: "entry" });

    // Notify parent
    onPathSelected?.(pathType);

    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
              >
                <Sparkles size={32} />
              </motion.div>

              <h1 className="text-3xl font-bold mb-2">
                Where Does Your Heart Lead You?
              </h1>
              <p className="text-xl text-white/90">
                Choose your divine path to bring JAHmere home
              </p>
            </div>
          </div>

          {/* Path Selection */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {(
                Object.entries(pathConfig) as [
                  PathType,
                  typeof pathConfig.champion,
                ][]
              ).map(([pathType, config]) => {
                const Icon = config.icon;
                const isSelected = selectedPath === pathType;

                return (
                  <motion.div
                    key={pathType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay:
                        0.1 *
                        (pathType === "champion"
                          ? 0
                          : pathType === "evidence"
                            ? 1
                            : 2),
                    }}
                    className={`
                      relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300
                      ${
                        isSelected
                          ? `${config.bgColor} ${config.borderColor} transform scale-105 shadow-lg`
                          : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }
                    `}
                    onClick={() => handlePathSelection(pathType)}
                    whileHover={{ scale: isAnimating ? 1.05 : 1.02 }}
                    whileTap={{ scale: isAnimating ? 1.05 : 0.98 }}
                  >
                    {/* Selection Animation */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/40 rounded-xl"
                        />
                      )}
                    </AnimatePresence>

                    {/* Icon */}
                    <div
                      className={`
                      inline-flex items-center justify-center w-12 h-12 rounded-full mb-4
                      ${isSelected ? "bg-white shadow-md" : "bg-gray-100"}
                    `}
                    >
                      <Icon
                        size={24}
                        className={
                          isSelected ? config.textColor : "text-gray-600"
                        }
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <h3
                          className={`text-xl font-bold ${isSelected ? config.textColor : "text-gray-900"}`}
                        >
                          {config.title}
                        </h3>
                        <p
                          className={`text-sm font-medium ${isSelected ? config.textColor : "text-gray-600"}`}
                        >
                          {config.subtitle}
                        </p>
                      </div>

                      <p
                        className={`text-sm ${isSelected ? config.textColor : "text-gray-600"}`}
                      >
                        {config.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-1">
                        {config.features.map((feature, index) => (
                          <li
                            key={index}
                            className={`text-xs flex items-center ${isSelected ? config.textColor : "text-gray-500"}`}
                          >
                            <div
                              className={`w-1 h-1 rounded-full mr-2 ${isSelected ? "bg-current" : "bg-gray-400"}`}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <motion.button
                        className={`
                          w-full py-2 px-4 rounded-lg font-medium text-sm transition-all
                          ${
                            isSelected
                              ? `bg-gradient-to-r ${config.color} text-white shadow-md`
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isAnimating}
                      >
                        {isAnimating && isSelected ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Entering...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            {config.cta}
                            <ArrowRight size={16} className="ml-2" />
                          </div>
                        )}
                      </motion.button>

                      {/* Target Audience */}
                      <p
                        className={`text-xs ${isSelected ? config.textColor + "/70" : "text-gray-400"}`}
                      >
                        For: {config.targetAudience}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Each path leads to the same destination:{" "}
                <span className="font-semibold text-purple-600">
                  JAHmere's Freedom
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                July 28, 2025 • The Bridge Project
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
