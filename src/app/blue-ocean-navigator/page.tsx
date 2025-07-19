"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import BlueOceanNavigatorAgent from "@/components/blue-ocean-navigator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Crown, Sparkles } from "lucide-react";

// Profile type definition
type ProfileQuadrant = "Friend" | "Emcee" | "Expert" | "Facilitator";

interface Profile {
  quadrant: ProfileQuadrant;
  primaryTalents: string[];
  score: number;
  divineGifts: string[];
  blueOceanPotential: string[];
}

// Sample Greatness Zone profiles based on our existing data
const SAMPLE_PROFILES: Record<string, Profile> = {
  jahmere: {
    quadrant: "Friend",
    primaryTalents: ["Peacemaker", "Caregiver", "Relator", "Bridge Builder"],
    score: 62,
    divineGifts: ["Unity Creator", "Heart Connector", "Healing Presence"],
    blueOceanPotential: [
      "Transformation Justice",
      "Community Healing",
      "Youth Mentorship",
    ],
  },
  jayForte: {
    quadrant: "Friend",
    primaryTalents: ["Peacemaker", "Caregiver", "Relator", "Wisdom Keeper"],
    score: 71,
    divineGifts: ["Greatness Activator", "Human Potential Revealer", "Mentor"],
    blueOceanPotential: [
      "Greatness Zone University",
      "Consciousness Healing",
      "Divine Assessment",
    ],
  },
  michael: {
    quadrant: "Emcee",
    primaryTalents: ["Winner", "Adapter", "Inventor", "Systems Thinker"],
    score: 66,
    divineGifts: [
      "Divine Technology Creator",
      "Blue Ocean Strategist",
      "Agentic AI Architect",
    ],
    blueOceanPotential: [
      "Divine AI Platform",
      "Blue Ocean Strategy",
      "Transformation Technology",
    ],
  },
};

interface BlueOceanOpportunity {
  title: string;
  divineAlignment: number;
  manifestationSpeed: number;
  marketSize: number;
  description: string;
}

export default function BlueOceanNavigatorPage() {
  const [selectedProfileKey, setSelectedProfileKey] =
    useState<keyof typeof SAMPLE_PROFILES>("jahmere");
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<BlueOceanOpportunity | null>(null);

  const selectedProfile = SAMPLE_PROFILES[selectedProfileKey];

  const handleProfileSelect = (profileKey: keyof typeof SAMPLE_PROFILES) => {
    setSelectedProfileKey(profileKey);
  };

  const handleOpportunitySelect = (opportunity: BlueOceanOpportunity) => {
    setSelectedOpportunity(opportunity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Brain className="w-16 h-16 text-blue-600" />
            <Heart className="w-16 h-16 text-purple-600" />
            <Crown className="w-16 h-16 text-gold-600" />
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Blue Ocean Navigator Agent
          </h1>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Revolutionary AI that combines Jay Forte's Greatness Zone
            methodology with Michael Mataluni's Blue Ocean strategy to discover
            uncontested market spaces where your divine gifts create infinite
            value.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>
              Powered by Divine Technology & Science of Mind Principles
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Profile Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                Select Greatness Zone Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={
                    selectedProfileKey === "jahmere" ? "default" : "outline"
                  }
                  onClick={() => handleProfileSelect("jahmere")}
                  className="h-auto p-4 text-left flex-col items-start"
                >
                  <div className="font-bold mb-2">JAHmere Webb</div>
                  <div className="text-sm opacity-80">
                    Friend Quadrant (62/200)
                  </div>
                  <div className="text-xs mt-1">
                    Peacemaker • Caregiver • Bridge Builder
                  </div>
                </Button>

                <Button
                  variant={
                    selectedProfileKey === "jayForte" ? "default" : "outline"
                  }
                  onClick={() => handleProfileSelect("jayForte")}
                  className="h-auto p-4 text-left flex-col items-start"
                >
                  <div className="font-bold mb-2">Jay Forte</div>
                  <div className="text-sm opacity-80">
                    Friend Quadrant (71/200)
                  </div>
                  <div className="text-xs mt-1">
                    Peacemaker • Caregiver • Wisdom Keeper
                  </div>
                </Button>

                <Button
                  variant={
                    selectedProfileKey === "michael" ? "default" : "outline"
                  }
                  onClick={() => handleProfileSelect("michael")}
                  className="h-auto p-4 text-left flex-col items-start"
                >
                  <div className="font-bold mb-2">Michael Mataluni</div>
                  <div className="text-sm opacity-80">
                    Emcee Quadrant (66/200)
                  </div>
                  <div className="text-xs mt-1">
                    Winner • Adapter • Inventor
                  </div>
                </Button>
              </div>

              {/* Selected Profile Details */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold mb-3">
                  Active Profile: {selectedProfile.quadrant} Quadrant
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Primary Talents:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedProfile.primaryTalents.map((talent, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {talent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Divine Gifts:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedProfile.divineGifts.map((gift, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {gift}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Blue Ocean Potential:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedProfile.blueOceanPotential.map(
                        (potential, i) => (
                          <Badge
                            key={i}
                            className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          >
                            {potential}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Blue Ocean Navigator Agent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <BlueOceanNavigatorAgent
            userProfile={selectedProfile as any}
            onOpportunitySelect={handleOpportunitySelect as any}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Selected Opportunity Summary */}
        {selectedOpportunity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-br from-gold-50 to-yellow-50 border-gold-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-gold-600" />
                  Opportunity Manifestation Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gold-700">
                    {selectedOpportunity.title}
                  </h3>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Your Greatness Zone profile shows{" "}
                    {selectedOpportunity.divineAlignment}% divine alignment with
                    this Blue Ocean opportunity. The universe is conspiring to
                    manifest this through you!
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                      {selectedOpportunity.manifestationSpeed} manifestation
                    </Badge>
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2">
                      {selectedOpportunity.marketSize} market
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 text-gray-500 text-sm"
        >
          <p>
            Blue Ocean Navigator Agent • Integrating Jay Forte's Greatness Zone
            Science with Science of Mind Principles
          </p>
          <p className="mt-2">
            Creating uncontested market spaces where divine gifts meet infinite
            opportunity
          </p>
        </motion.div>
      </div>
    </div>
  );
}
