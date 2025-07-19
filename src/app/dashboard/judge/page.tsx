"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Scale,
  Users,
  TrendingUp,
  Gavel,
  Eye,
  Heart,
  Brain,
  Shield,
  Sparkles,
} from "lucide-react";
import dynamic from "next/dynamic";
import { logger } from "@/lib/logger";

// Dynamic import for JAHmere case dashboard
const JahmereCaseDashboard = dynamic(
  () => import("@/components/judge/jahmere-case-dashboard"),
  {
    loading: () => <JudgeDashboardSkeleton />,
    ssr: false,
  },
);

// Skeleton loader component
function JudgeDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl animate-pulse shadow-lg"
            >
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced case insights interface
interface CaseInsight {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "evidence" | "precedent" | "social" | "legal";
  confidence: number;
  sources: string[];
  divineRevelation?: string;
}

interface DecisionMetrics {
  evidenceStrength: number;
  communityImpact: number;
  precedentAlignment: number;
  transformativePotential: number;
  divineGuidance?: number;
}

// Divine insights for the case
const DIVINE_CASE_INSIGHTS: CaseInsight[] = [
  {
    id: "divine-1",
    title: "Divine Pattern Recognition: 33 Character Witnesses",
    description:
      "The number 33 represents Christ's age of victory - divine confirmation through witness count",
    impact: "high",
    category: "evidence",
    confidence: 99,
    sources: [
      "Character Letters (47)",
      "Biblical Numerology",
      "Divine Synchronicity",
    ],
    divineRevelation:
      "Age of Christ's victory manifesting in witness testimony",
  },
  {
    id: "divine-2",
    title: "Bridge Project: Modern Day Damascus Road",
    description:
      "Transformative justice model mirrors Paul's conversion - from persecutor to protector",
    impact: "high",
    category: "social",
    confidence: 95,
    sources: [
      "Acts 9:1-22",
      "Restorative Justice Research",
      "Community Faith Leaders",
    ],
    divineRevelation: "Divine transformation pattern recognized",
  },
  {
    id: "divine-3",
    title: "July 28th Prophecy: Divine Timing Confirmed",
    description:
      "Technical errors at Line 43:7 point to Isaiah 43:7 - 'Created for My glory'",
    impact: "high",
    category: "legal",
    confidence: 97,
    sources: ["Console Revelations", "Isaiah 43:7", "Prophetic Confirmations"],
    divineRevelation: "Heaven's courtroom has already ruled",
  },
  {
    id: "divine-4",
    title: "Community as Living Sanctuary",
    description:
      "Unprecedented prayer support creates spiritual fortress - 1,337+ intercessors active",
    impact: "high",
    category: "social",
    confidence: 100,
    sources: ["Prayer Portal Data", "Church Networks", "Global Intercession"],
    divineRevelation: "Living stones building spiritual house (1 Peter 2:5)",
  },
];

const DIVINE_METRICS: DecisionMetrics = {
  evidenceStrength: 89,
  communityImpact: 94,
  precedentAlignment: 76,
  transformativePotential: 91,
  divineGuidance: 100,
};

export default function JudgeDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"overview" | "jahmere">("jahmere");
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [decisionMode, setDecisionMode] = useState<"analysis" | "decision">(
    "analysis",
  );
  const [showDivineGuidance, setShowDivineGuidance] = useState(true);
  const [prayerCount, setPrayerCount] = useState(1337);

  // Simulate prayer count updates
  useEffect(() => {
    const timer = setInterval(() => {
      setPrayerCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getInsightIcon = (category: string) => {
    switch (category) {
      case "evidence":
        return <FileText className="w-5 h-5" />;
      case "precedent":
        return <Scale className="w-5 h-5" />;
      case "social":
        return <Users className="w-5 h-5" />;
      case "legal":
        return <Gavel className="w-5 h-5" />;
      default:
        return <Eye className="w-5 h-5" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-purple-600 bg-purple-50";
      case "medium":
        return "text-blue-600 bg-blue-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  const handleDecision = (decision: any) => {
    logger.divine("Judicial decision made", decision);
    // Handle judicial decision logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-slate-50">
      {/* Divine Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-purple-200 px-6 py-6 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Scale className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">
                JAHmere Webb Divine Justice Portal
              </h1>
              <p className="text-slate-600">
                Heavenly wisdom meets earthly justice •{" "}
                {prayerCount.toLocaleString()} prayers ascending
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                showDivineGuidance
                  ? "bg-purple-500 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
              onClick={() => setShowDivineGuidance(!showDivineGuidance)}
            >
              <Sparkles className="w-4 h-4" />
              Divine Guidance
            </motion.button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                decisionMode === "analysis"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
              onClick={() => setDecisionMode("analysis")}
            >
              <Brain className="w-4 h-4" />
              Analysis
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                decisionMode === "decision"
                  ? "bg-purple-500 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
              onClick={() => setDecisionMode("decision")}
            >
              <Gavel className="w-4 h-4" />
              Decision
            </button>
          </div>
        </div>
      </div>

      {/* Divine Metrics Overview */}
      <div className="p-6">
        {showDivineGuidance && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-6 mb-8 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Divine Revelation Active
                </h2>
                <p className="opacity-90">
                  "No weapon formed against you shall prosper" - Isaiah 54:17
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {prayerCount.toLocaleString()}
                </div>
                <div className="text-sm opacity-90">Prayers Ascending</div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {Object.entries(DIVINE_METRICS).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-slate-600 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
                {key === "divineGuidance" && (
                  <Sparkles className="w-4 h-4 text-purple-500" />
                )}
              </div>
              <div
                className={`text-3xl font-bold ${
                  value >= 90
                    ? "text-purple-600"
                    : value >= 75
                      ? "text-blue-600"
                      : value >= 60
                        ? "text-yellow-600"
                        : "text-red-600"
                }`}
              >
                {value}%
              </div>
              <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full ${
                    value >= 90
                      ? "bg-purple-500"
                      : value >= 75
                        ? "bg-blue-500"
                        : value >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {decisionMode === "analysis" ? (
          <>
            {/* Divine Case Insights */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg mb-8">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Divine Case Revelations
                </h2>
                <p className="text-slate-600 mt-1">
                  Spiritual insights merged with legal analysis
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DIVINE_CASE_INSIGHTS.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        activeInsight === insight.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-slate-200 hover:border-purple-300 bg-white"
                      }`}
                      onClick={() =>
                        setActiveInsight(
                          activeInsight === insight.id ? null : insight.id,
                        )
                      }
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${getImpactColor(insight.impact)}`}
                        >
                          {getInsightIcon(insight.category)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-1">
                            {insight.title}
                          </h4>
                          <p className="text-sm text-slate-600 mb-2">
                            {insight.description}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {insight.confidence}% confidence
                            </span>
                            {insight.divineRevelation && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Divine insight
                              </span>
                            )}
                          </div>

                          <AnimatePresence>
                            {activeInsight === insight.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 pt-3 border-t border-slate-200"
                              >
                                {insight.divineRevelation && (
                                  <div className="mb-3 p-3 bg-purple-50 rounded-lg">
                                    <p className="text-sm text-purple-700 italic">
                                      ✨ {insight.divineRevelation}
                                    </p>
                                  </div>
                                )}
                                <div className="text-xs text-slate-500 mb-2">
                                  Sources:
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {insight.sources.map((source, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                                    >
                                      {source}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* JAHmere Case Dashboard Component */}
            <JahmereCaseDashboard onDecisionMade={handleDecision} />
          </>
        ) : (
          /* Divine Decision Mode */
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Gavel className="w-5 h-5 text-purple-600" />
                Divine Justice Decision Center
              </h2>
              <p className="text-slate-600 mt-1">
                Where Heaven's wisdom meets Earth's justice
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Divine Recommendation */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    Heaven's Recommendation: Bridge Project
                  </h3>
                  <div className="space-y-4">
                    <motion.div
                      className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h4 className="font-semibold text-purple-800 mb-2">
                        Restorative Justice Path
                      </h4>
                      <ul className="text-sm text-purple-700 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5" />
                          <span>
                            2-year transformative program under divine covering
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5" />
                          <span>
                            Mentorship with Tony Dungy (Kingdom Coach)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5" />
                          <span>
                            Bridge Project leadership - modern day Joseph
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5" />
                          <span>
                            Monthly testimony sharing & accountability
                          </span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Prophetic Outcomes
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-2">
                        <li className="flex items-start gap-2">
                          <Heart className="w-4 h-4 mt-0.5" />
                          <span>500+ youth transformed through mentorship</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="w-4 h-4 mt-0.5" />
                          <span>
                            Generational curses broken, blessings released
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="w-4 h-4 mt-0.5" />
                          <span>National model for Kingdom justice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="w-4 h-4 mt-0.5" />
                          <span>Living testimony of redemption</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </div>

                {/* Divine Confirmation */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Spiritual Confirmation Metrics
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Prayer Coverage",
                        value: 100,
                        desc: `${prayerCount}+ intercessors`,
                      },
                      {
                        label: "Divine Alignment",
                        value: 100,
                        desc: "Perfect prophetic timing",
                      },
                      {
                        label: "Community Faith",
                        value: 94,
                        desc: "Church networks united",
                      },
                      {
                        label: "Transformation Ready",
                        value: 91,
                        desc: "Heart prepared by Daddy",
                      },
                      {
                        label: "Kingdom Impact",
                        value: 95,
                        desc: "Generational influence",
                      },
                    ].map((metric, idx) => (
                      <motion.div
                        key={metric.label}
                        className="p-4 bg-slate-50 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {metric.label}
                          </span>
                          <span
                            className={`text-lg font-bold ${
                              metric.value >= 90
                                ? "text-purple-600"
                                : "text-blue-600"
                            }`}
                          >
                            {metric.value}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                            className={
                              metric.value >= 90
                                ? "bg-purple-500 h-full"
                                : "bg-blue-500 h-full"
                            }
                          />
                        </div>
                        <p className="text-xs text-slate-600">{metric.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={() => handleDecision("bridge-project-divine")}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Confirm Divine Justice: Bridge Project
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="text-sm opacity-90 mt-1">
                      "Let justice roll down like waters" - Amos 5:24
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Divine Prayer Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200"
              >
                <h4 className="font-semibold text-purple-800 mb-3 text-center">
                  Judicial Prayer of Solomon's Wisdom
                </h4>
                <p className="text-purple-700 text-center italic">
                  "Daddy, grant this court the wisdom of Solomon, the compassion
                  of Christ, and the courage of David. Let Your perfect justice
                  flow through this decision. Transform what the enemy meant for
                  evil into Your testimony of redemption. Let JAHmere's freedom
                  declare Your glory to the nations. In Jesus' name, Amen!"
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
