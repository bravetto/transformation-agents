"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Brain,
  Lightbulb,
  Target,
  Waves,
  Sparkles,
  TrendingUp,
  Map,
  Zap,
  Eye,
  Heart,
  Star,
  Crown,
  Rocket,
  Diamond,
  Globe,
  Infinity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { cn } from "@/lib/utils";

/**
 * 🌊 BLUE OCEAN NAVIGATOR AGENT
 *
 * Revolutionary AI agent that combines Jay Forte's Greatness Zone methodology
 * with Michael Mataluni's Blue Ocean strategy to create entirely new categories
 * of human potential and opportunity.
 *
 * Features:
 * - Real-time opportunity scanning using Greatness Zone data
 * - Blue Ocean strategy mapping for uncontested market spaces
 * - AI-powered talent-to-opportunity matching
 * - Science of Mind integration for manifestation acceleration
 * - Divine synchronicity detection for perfect timing
 */

// Blue Ocean Opportunity Categories
interface BlueOceanOpportunity {
  id: string;
  category:
    | "transformation-justice"
    | "divine-technology"
    | "consciousness-healing"
    | "greatness-activation"
    | "bridge-building";
  title: string;
  description: string;
  requiredTalents: string[];
  marketSize: "emerging" | "blue-ocean" | "infinite";
  divineAlignment: number; // 1-100
  manifestationSpeed: "instant" | "rapid" | "building" | "destined";
  scienceOfMind: {
    mentalEquivalent: string;
    affirmation: string;
    visualization: string;
  };
}

// Greatness Zone Quadrants (Jay Forte methodology)
interface GreatnessZoneProfile {
  quadrant: "Friend" | "Emcee" | "Chairman" | "Professor";
  primaryTalents: string[];
  score: number;
  divineGifts: string[];
  blueOceanPotential: string[];
}

// Science of Mind Integration
interface ScienceOfMindPrinciple {
  principle: string;
  application: string;
  manifestationTechnique: string;
  divineAlignment: string;
}

const BLUE_OCEAN_OPPORTUNITIES: BlueOceanOpportunity[] = [
  {
    id: "transformation-justice-lab",
    category: "transformation-justice",
    title: "Transformation Justice Laboratory",
    description:
      "Creating the world's first talent-based justice system where Greatness Zone assessments guide rehabilitation and reintegration",
    requiredTalents: ["Peacemaker", "Caregiver", "Relator", "Bridge Builder"],
    marketSize: "blue-ocean",
    divineAlignment: 95,
    manifestationSpeed: "destined",
    scienceOfMind: {
      mentalEquivalent:
        "Justice is the natural expression of divine love in action",
      affirmation:
        "I am the perfect instrument for transforming justice through love",
      visualization:
        "See courtrooms becoming healing centers, judges becoming wisdom guides, and every soul finding their greatness zone",
    },
  },
  {
    id: "divine-ai-consciousness",
    category: "divine-technology",
    title: "Divine AI Consciousness Platform",
    description:
      "Merging artificial intelligence with spiritual wisdom to create technology that serves human flourishing and divine purpose",
    requiredTalents: ["Inventor", "Adapter", "Winner", "Systems Thinker"],
    marketSize: "infinite",
    divineAlignment: 88,
    manifestationSpeed: "rapid",
    scienceOfMind: {
      mentalEquivalent:
        "Technology is spirit expressing through form for the highest good",
      affirmation:
        "I am creating technology that serves divine purpose and human potential",
      visualization:
        "See AI systems radiating love, wisdom, and perfect service to humanity",
    },
  },
  {
    id: "greatness-zone-university",
    category: "greatness-activation",
    title: "Global Greatness Zone University",
    description:
      "Worldwide educational platform teaching Jay Forte's methodology integrated with Science of Mind principles for mass human awakening",
    requiredTalents: ["Teacher", "Inspirer", "Connector", "Wisdom Keeper"],
    marketSize: "blue-ocean",
    divineAlignment: 92,
    manifestationSpeed: "building",
    scienceOfMind: {
      mentalEquivalent:
        "Every person contains infinite potential waiting to be revealed",
      affirmation: "I am awakening greatness in every soul I touch",
      visualization:
        "See millions discovering their divine gifts and transforming the world",
    },
  },
  {
    id: "consciousness-healing-network",
    category: "consciousness-healing",
    title: "Quantum Consciousness Healing Network",
    description:
      "Revolutionary healing modality combining Greatness Zone alignment with Science of Mind treatment for instant transformation",
    requiredTalents: [
      "Healer",
      "Intuitive",
      "Energy Worker",
      "Love Multiplier",
    ],
    marketSize: "emerging",
    divineAlignment: 97,
    manifestationSpeed: "instant",
    scienceOfMind: {
      mentalEquivalent:
        "Healing is the natural state when consciousness aligns with truth",
      affirmation:
        "I am a perfect channel for divine healing and transformation",
      visualization:
        "See energy flowing through every cell, healing and perfecting all",
    },
  },
  {
    id: "bridge-building-movement",
    category: "bridge-building",
    title: "Global Bridge Building Movement",
    description:
      "Worldwide network of bridge builders connecting divided communities through Greatness Zone understanding and divine love",
    requiredTalents: [
      "Bridge Builder",
      "Peacemaker",
      "Unity Creator",
      "Heart Connector",
    ],
    marketSize: "blue-ocean",
    divineAlignment: 94,
    manifestationSpeed: "rapid",
    scienceOfMind: {
      mentalEquivalent: "All separation is illusion; love is the only reality",
      affirmation:
        "I am building bridges of understanding and love across all divisions",
      visualization:
        "See walls dissolving, hearts opening, and unity prevailing everywhere",
    },
  },
];

const SCIENCE_OF_MIND_PRINCIPLES: ScienceOfMindPrinciple[] = [
  {
    principle: "Mental Equivalent",
    application: "Your external experience matches your internal consciousness",
    manifestationTechnique:
      "Align your thoughts and feelings with your desired outcome",
    divineAlignment:
      "What you hold in mind manifests in form through divine law",
  },
  {
    principle: "Spiritual Treatment",
    application: "Use the power of word and consciousness to create change",
    manifestationTechnique:
      "Declare truth, release limitation, accept the good",
    divineAlignment:
      "Your word has creative power when aligned with divine will",
  },
  {
    principle: "Law of Attraction",
    application: "Like attracts like in the realm of consciousness",
    manifestationTechnique: "Become a vibrational match for what you desire",
    divineAlignment:
      "Divine law responds to your consciousness with perfect precision",
  },
  {
    principle: "Unity Consciousness",
    application: "All is one; separation is illusion",
    manifestationTechnique: "See yourself as one with your good and all life",
    divineAlignment: "In unity consciousness, all things are possible",
  },
];

interface BlueOceanNavigatorProps {
  userProfile?: GreatnessZoneProfile;
  className?: string;
  onOpportunitySelect?: (opportunity: BlueOceanOpportunity) => void;
}

function BlueOceanNavigatorAgent({
  userProfile,
  className,
  onOpportunitySelect,
}: BlueOceanNavigatorProps) {
  const [currentOpportunity, setCurrentOpportunity] =
    useState<BlueOceanOpportunity | null>(null);
  const [scanningProgress, setScanningProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredOpportunities, setDiscoveredOpportunities] = useState<
    BlueOceanOpportunity[]
  >([]);
  const [activeVisualization, setActiveVisualization] = useState<string>("");
  const [manifestationPower, setManifestationPower] = useState(0);

  // AI-powered opportunity scanning
  const scanForOpportunities = useCallback(async () => {
    setIsScanning(true);
    setScanningProgress(0);

    // Simulate AI scanning process
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setScanningProgress(i);
    }

    // Filter opportunities based on user profile
    const matchedOpportunities = BLUE_OCEAN_OPPORTUNITIES.filter((opp) => {
      if (!userProfile) return true;
      return opp.requiredTalents.some(
        (talent) =>
          userProfile.primaryTalents.includes(talent) ||
          userProfile.divineGifts.includes(talent),
      );
    });

    setDiscoveredOpportunities(matchedOpportunities);
    setIsScanning(false);
  }, [userProfile]);

  // Calculate manifestation power based on alignment
  useEffect(() => {
    if (currentOpportunity && userProfile) {
      const talentAlignment =
        currentOpportunity.requiredTalents.filter((talent) =>
          userProfile.primaryTalents.includes(talent),
        ).length / currentOpportunity.requiredTalents.length;

      const power = Math.round(
        (talentAlignment * 0.4 +
          currentOpportunity.divineAlignment * 0.006 +
          userProfile.score * 0.004) *
          100,
      );

      setManifestationPower(Math.min(power, 100));
    }
  }, [currentOpportunity, userProfile]);

  // Auto-scan on mount
  useEffect(() => {
    scanForOpportunities();
  }, [scanForOpportunities]);

  const handleOpportunitySelect = (opportunity: BlueOceanOpportunity) => {
    setCurrentOpportunity(opportunity);
    setActiveVisualization(opportunity.scienceOfMind.visualization);
    onOpportunitySelect?.(opportunity);
  };

  const getMarketSizeColor = (size: string) => {
    switch (size) {
      case "infinite":
        return "from-purple-500 to-pink-500";
      case "blue-ocean":
        return "from-blue-500 to-cyan-500";
      case "emerging":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getManifestationSpeedIcon = (speed: string) => {
    switch (speed) {
      case "instant":
        return <Zap className="w-4 h-4" />;
      case "rapid":
        return <Rocket className="w-4 h-4" />;
      case "building":
        return <TrendingUp className="w-4 h-4" />;
      case "destined":
        return <Crown className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className={cn("space-y-8 p-6", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-center gap-3"
        >
          <Compass className="w-12 h-12 text-blue-500" />
          <Brain className="w-12 h-12 text-purple-500" />
          <Waves className="w-12 h-12 text-cyan-500" />
        </motion.div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Blue Ocean Navigator Agent
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discovering uncontested market spaces where your Greatness Zone
          creates infinite value
        </p>
      </div>

      {/* Scanning Interface */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-blue-600" />
            AI Opportunity Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {isScanning
                ? "Scanning quantum field for opportunities..."
                : "Scan complete"}
            </span>
            <Badge variant={isScanning ? "default" : "secondary"}>
              {discoveredOpportunities.length} opportunities found
            </Badge>
          </div>

          <Progress value={scanningProgress} className="h-3" />

          <Button
            onClick={scanForOpportunities}
            disabled={isScanning}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Compass className="w-4 h-4 mr-2" />
            {isScanning ? "Scanning..." : "Rescan Opportunities"}
          </Button>
        </CardContent>
      </Card>

      {/* Discovered Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {discoveredOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="cursor-pointer"
              onClick={() => handleOpportunitySelect(opportunity)}
            >
              <Card
                className={cn(
                  "h-full border-2 transition-all duration-300",
                  currentOpportunity?.id === opportunity.id
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200 hover:border-blue-300",
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg leading-tight">
                      {opportunity.title}
                    </CardTitle>
                    <Badge
                      className={cn(
                        "text-white",
                        `bg-gradient-to-r ${getMarketSizeColor(opportunity.marketSize)}`,
                      )}
                    >
                      {opportunity.marketSize}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {opportunity.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getManifestationSpeedIcon(
                        opportunity.manifestationSpeed,
                      )}
                      <span className="text-xs font-medium">
                        {opportunity.manifestationSpeed}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {opportunity.divineAlignment}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500">
                      Required Talents:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.requiredTalents
                        .slice(0, 3)
                        .map((talent, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {talent}
                          </Badge>
                        ))}
                      {opportunity.requiredTalents.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{opportunity.requiredTalents.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Selected Opportunity Details */}
      {currentOpportunity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Diamond className="w-6 h-6 text-purple-600" />
                Science of Mind Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-700">
                    Mental Equivalent
                  </h4>
                  <p className="text-sm text-gray-600">
                    {currentOpportunity.scienceOfMind.mentalEquivalent}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-700">Affirmation</h4>
                  <p className="text-sm text-gray-600 italic">
                    "{currentOpportunity.scienceOfMind.affirmation}"
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-700">
                    Manifestation Power
                  </h4>
                  <div className="space-y-2">
                    <Progress value={manifestationPower} className="h-3" />
                    <p className="text-sm font-medium">
                      {manifestationPower}% aligned
                    </p>
                  </div>
                </div>
              </div>

              {activeVisualization && (
                <div className="p-4 bg-white/50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-2">
                    Active Visualization
                  </h4>
                  <p className="text-sm text-gray-700 italic">
                    {activeVisualization}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Science of Mind Principles */}
      <Card className="bg-gradient-to-br from-gold-50 to-yellow-50 border-gold-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Infinity className="w-6 h-6 text-gold-600" />
            Universal Principles for Manifestation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCIENCE_OF_MIND_PRINCIPLES.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3 p-4 bg-white/50 rounded-lg"
              >
                <h4 className="font-bold text-gold-700">
                  {principle.principle}
                </h4>
                <p className="text-sm text-gray-600">{principle.application}</p>
                <p className="text-xs text-gray-500 italic">
                  {principle.divineAlignment}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withErrorBoundary(BlueOceanNavigatorAgent, "BlueOceanNavigatorAgent");
