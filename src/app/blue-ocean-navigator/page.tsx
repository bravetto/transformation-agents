"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Heart,
  Crown,
  Sparkles,
  TrendingUp,
  Target,
  Users,
  Lightbulb,
  Star,
  ArrowRight,
  Award,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

// Profile type definition
type ProfileQuadrant = "Friend" | "Emcee" | "Expert" | "Facilitator";

interface Profile {
  name: string;
  role: string;
  quadrant: ProfileQuadrant;
  primaryTalents: string[];
  score: number;
  divineGifts: string[];
  blueOceanPotential: string[];
  strengths: string[];
  values: string[];
  blueOceanOpportunities: BlueOceanOpportunity[];
}

interface BlueOceanOpportunity {
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  strategicAdvantages: string[];
  implementationSteps: string[];
}

// Sample Greatness Zone profiles based on our existing data
const SAMPLE_PROFILES: Record<string, Profile> = {
  jahmere: {
    name: "JAHmere Webb",
    role: "Community Bridge Builder",
    quadrant: "Friend",
    primaryTalents: ["Peacemaker", "Caregiver", "Relator", "Bridge Builder"],
    score: 62,
    divineGifts: ["Unity Creator", "Heart Connector", "Healing Presence"],
    blueOceanPotential: [
      "Transformation Justice",
      "Community Healing",
      "Youth Mentorship",
    ],
    strengths: ["Leadership", "Empathy", "Communication", "Mentoring"],
    values: ["Justice", "Family", "Community", "Transformation"],
    blueOceanOpportunities: [
      {
        title: "Transformation Justice Program",
        description:
          "Revolutionary alternative sentencing focused on community healing",
        impact: "High",
        strategicAdvantages: [
          "First-mover advantage in transformation justice",
          "Direct lived experience credibility",
          "Strong community support network",
          "NFL coaching endorsement",
        ],
        implementationSteps: [
          "Develop pilot program framework",
          "Partner with Orange County courts",
          "Create mentorship curriculum",
          "Launch community healing circles",
        ],
      },
      {
        title: "At-Risk Youth Mentorship",
        description:
          "Comprehensive mentoring program for youth facing challenges",
        impact: "High",
        strategicAdvantages: [
          "Personal transformation story",
          "Proven ability to connect with youth",
          "Community trust and support",
          "Unique perspective on second chances",
        ],
        implementationSteps: [
          "Design mentorship model",
          "Recruit and train mentors",
          "Partner with schools and community centers",
          "Implement tracking and outcomes measurement",
        ],
      },
    ],
  },
  jayForte: {
    name: "Jay Forte",
    role: "Greatness Zone Creator",
    quadrant: "Friend",
    primaryTalents: ["Peacemaker", "Caregiver", "Relator", "Wisdom Keeper"],
    score: 71,
    divineGifts: ["Greatness Activator", "Human Potential Revealer", "Mentor"],
    blueOceanPotential: [
      "Greatness Zone University",
      "Consciousness Healing",
      "Divine Assessment",
    ],
    strengths: ["Assessment", "Coaching", "Strategy", "Human Development"],
    values: ["Excellence", "Growth", "Service", "Wisdom"],
    blueOceanOpportunities: [
      {
        title: "Digital Greatness Zone Platform",
        description:
          "AI-powered platform for discovering and developing human potential",
        impact: "High",
        strategicAdvantages: [
          "40+ years of assessment expertise",
          "Proven methodology with 10,000+ assessments",
          "Technology integration opportunity",
          "Scalable business model",
        ],
        implementationSteps: [
          "Digitize assessment framework",
          "Develop AI recommendation engine",
          "Create online coaching platform",
          "Launch enterprise partnerships",
        ],
      },
    ],
  },
  michael: {
    name: "Michael Mataluni",
    role: "Divine Technology Architect",
    quadrant: "Emcee",
    primaryTalents: ["Winner", "Adapter", "Inventor", "Systems Thinker"],
    score: 66,
    divineGifts: [
      "Divine Technology Creator",
      "Blue Ocean Strategist",
      "Agentic AI Architect",
    ],
    blueOceanPotential: [
      "AI-Powered Justice",
      "Blue Ocean Strategy",
      "Transformation Technology",
    ],
    strengths: ["Innovation", "Strategy", "Technology", "Systems Thinking"],
    values: ["Excellence", "Innovation", "Justice", "Transformation"],
    blueOceanOpportunities: [
      {
        title: "AI-Powered Justice Platform",
        description:
          "Revolutionary technology platform for criminal justice transformation",
        impact: "High",
        strategicAdvantages: [
          "First-mover in AI justice applications",
          "Deep technology expertise",
          "Blue Ocean strategy experience",
          "Strong network in legal and tech sectors",
        ],
        implementationSteps: [
          "Develop AI assessment algorithms",
          "Create judicial dashboard interface",
          "Partner with progressive prosecutors",
          "Scale to multiple jurisdictions",
        ],
      },
    ],
  },
};

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
    <div className="min-h-screen bg-gradient-to-br from-elite-justice-indigo/10 via-elite-platinum-truth to-elite-sacred-violet/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Brain className="w-16 h-16 text-elite-justice-indigo" />
            <Heart className="w-16 h-16 text-elite-sacred-violet" />
            <Crown className="w-16 h-16 text-elite-divine-amber" />
          </div>

          <h1 className="heading-1 bg-gradient-to-r from-elite-justice-indigo via-elite-sacred-violet to-elite-divine-amber bg-clip-text text-transparent mb-4">
            Blue Ocean Navigator Agent
          </h1>

          <p className="text-large text-elite-obsidian-depth/70 max-w-4xl mx-auto mb-8">
            Revolutionary AI that combines Jay Forte's Greatness Zone
            methodology with Michael Mataluni's Blue Ocean strategy to discover
            uncontested market spaces where your divine gifts create infinite
            value.
          </p>

          <div className="flex items-center justify-center gap-2 text-small text-elite-obsidian-depth/60">
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
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="card bg-elite-platinum-truth border-elite-justice-indigo/30">
            <CardHeader>
              <CardTitle className="heading-3 text-elite-obsidian-depth text-center">
                Select a Divine Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(SAMPLE_PROFILES).map(([key, profile]) => (
                  <Button
                    key={key}
                    variant={selectedProfileKey === key ? "default" : "outline"}
                    onClick={() =>
                      handleProfileSelect(key as keyof typeof SAMPLE_PROFILES)
                    }
                    className={`h-auto p-4 text-left ${
                      selectedProfileKey === key
                        ? "bg-elite-justice-indigo text-elite-platinum-truth"
                        : "border-elite-justice-indigo/30 text-elite-obsidian-depth hover:bg-elite-justice-indigo/5"
                    }`}
                  >
                    <div>
                      <div className="font-semibold mb-1">{profile.name}</div>
                      <div className="text-small opacity-80">
                        {profile.role}
                      </div>
                      {profile.name === "JAHmere Webb" && (
                        <Badge className="mt-2 bg-elite-divine-amber text-elite-obsidian-depth">
                          Freedom Mission
                        </Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Greatness Zone Analysis */}
          <Card className="card bg-gradient-to-br from-elite-transformation-emerald/10 to-elite-justice-indigo/10 border-elite-transformation-emerald/30">
            <CardHeader>
              <CardTitle className="heading-4 text-elite-obsidian-depth flex items-center gap-2">
                <Target className="w-5 h-5 text-elite-transformation-emerald" />
                Greatness Zone Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-elite-obsidian-depth mb-2">
                    Core Strengths
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile?.strengths?.map((strength, index) => (
                      <Badge
                        key={index}
                        className="bg-elite-transformation-emerald/20 text-elite-transformation-emerald border-elite-transformation-emerald/30"
                      >
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-elite-obsidian-depth mb-2">
                    Values Alignment
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile?.values?.map((value, index) => (
                      <Badge
                        key={index}
                        className="bg-elite-justice-indigo/20 text-elite-justice-indigo border-elite-justice-indigo/30"
                      >
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blue Ocean Opportunities */}
          <Card className="card bg-gradient-to-br from-elite-divine-amber/10 to-elite-sacred-violet/10 border-elite-divine-amber/30">
            <CardHeader>
              <CardTitle className="heading-4 text-elite-obsidian-depth flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-elite-divine-amber" />
                Blue Ocean Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedProfile?.blueOceanOpportunities?.map(
                  (opportunity, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedOpportunity?.title === opportunity.title
                          ? "bg-elite-divine-amber/20 border-elite-divine-amber"
                          : "bg-elite-platinum-truth border-elite-divine-amber/30 hover:bg-elite-divine-amber/10"
                      }`}
                      onClick={() => handleOpportunitySelect(opportunity)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-semibold text-elite-obsidian-depth">
                            {opportunity.title}
                          </h5>
                          <p className="text-small text-elite-obsidian-depth/70 mt-1">
                            {opportunity.description}
                          </p>
                        </div>
                        <Badge
                          className={`ml-2 ${
                            opportunity.impact === "High"
                              ? "bg-elite-crimson-urgency/20 text-elite-crimson-urgency"
                              : opportunity.impact === "Medium"
                                ? "bg-elite-divine-amber/20 text-elite-divine-amber"
                                : "bg-elite-transformation-emerald/20 text-elite-transformation-emerald"
                          }`}
                        >
                          {opportunity.impact}
                        </Badge>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Opportunity Analysis */}
        {selectedOpportunity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="card bg-gradient-to-r from-elite-sacred-violet/10 to-elite-justice-indigo/10 border-elite-sacred-violet/30">
              <CardHeader>
                <CardTitle className="heading-3 text-elite-obsidian-depth flex items-center gap-2">
                  <Star className="w-6 h-6 text-elite-sacred-violet" />
                  {selectedOpportunity.title} - Deep Dive Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="heading-4 text-elite-obsidian-depth mb-4">
                      Strategic Advantages
                    </h4>
                    <ul className="space-y-2">
                      {selectedOpportunity.strategicAdvantages.map(
                        (advantage, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-elite-obsidian-depth/80"
                          >
                            <Zap className="w-4 h-4 text-elite-divine-amber mt-0.5 flex-shrink-0" />
                            {advantage}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="heading-4 text-elite-obsidian-depth mb-4">
                      Implementation Steps
                    </h4>
                    <ol className="space-y-2">
                      {selectedOpportunity.implementationSteps.map(
                        (step, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-elite-obsidian-depth/80"
                          >
                            <span className="bg-elite-justice-indigo text-elite-platinum-truth rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ),
                      )}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Card className="card bg-gradient-to-r from-elite-divine-amber to-elite-crimson-urgency text-elite-platinum-truth border-elite-divine-amber/50">
            <CardContent className="pt-8 pb-8">
              <Award className="w-12 h-12 mx-auto mb-4 text-elite-platinum-truth" />
              <h3 className="heading-3 mb-4">
                Ready to Navigate Your Blue Ocean?
              </h3>
              <p className="text-large mb-6 max-w-2xl mx-auto opacity-90">
                Discover uncontested market spaces where your divine gifts
                create infinite value while supporting JAHmere's freedom
                mission.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  className="btn-lg bg-elite-platinum-truth text-elite-divine-amber hover:bg-elite-platinum-truth-dark px-8 py-4 font-bold"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Start Your Analysis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-lg border-elite-platinum-truth text-elite-platinum-truth hover:bg-elite-platinum-truth/10 px-8 py-4 font-bold"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join the Movement
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
