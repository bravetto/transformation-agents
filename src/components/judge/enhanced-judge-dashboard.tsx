"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Users,
  FileText,
  TrendingUp,
  Clock,
  Shield,
  Heart,
  Download,
  Play,
  Pause,
  Eye,
  Star,
  CheckCircle,
  AlertTriangle,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface JudgeMetric {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
  trend: "up" | "down" | "stable";
}

interface CaseEvidence {
  id: string;
  title: string;
  type: "document" | "video" | "testimony" | "assessment";
  status: "reviewed" | "pending" | "flagged";
  importance: "high" | "medium" | "low";
  date: string;
  summary: string;
}

interface RiskFactor {
  category: string;
  score: number;
  status: "low" | "medium" | "high";
  description: string;
  mitigation: string;
}

export default function EnhancedJudgeDashboard() {
  const [metrics, setMetrics] = useState<JudgeMetric[]>([]);
  const [evidence, setEvidence] = useState<CaseEvidence[]>([]);
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "evidence" | "risk" | "community"
  >("overview");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Initialize mock data
    setMetrics([
      {
        label: "Community Supporters",
        value: 2847,
        change: 23,
        icon: <Users className="w-5 h-5" />,
        color: "text-blue-600",
        trend: "up",
      },
      {
        label: "Character Letters",
        value: 156,
        change: 12,
        icon: <FileText className="w-5 h-5" />,
        color: "text-green-600",
        trend: "up",
      },
      {
        label: "Media Coverage",
        value: 340000,
        change: 45,
        icon: <TrendingUp className="w-5 h-5" />,
        color: "text-purple-600",
        trend: "up",
      },
      {
        label: "Program Readiness",
        value: 95,
        change: 5,
        icon: <Shield className="w-5 h-5" />,
        color: "text-emerald-600",
        trend: "up",
      },
    ]);

    setEvidence([
      {
        id: "ev-001",
        title: "Tony Dungy Character Reference",
        type: "testimony",
        status: "reviewed",
        importance: "high",
        date: "2024-07-10",
        summary:
          "NFL Hall of Fame coach provides detailed character assessment and mentorship commitment.",
      },
      {
        id: "ev-002",
        title: "Jay Forte Talent Assessment",
        type: "assessment",
        status: "reviewed",
        importance: "high",
        date: "2024-07-08",
        summary:
          "Professional assessment shows top 5% leadership potential and transformation capacity.",
      },
      {
        id: "ev-003",
        title: "Bridge Project Proposal",
        type: "document",
        status: "reviewed",
        importance: "high",
        date: "2024-07-05",
        summary:
          "Comprehensive alternative sentencing program with measurable outcomes and community impact.",
      },
    ]);

    setRiskFactors([
      {
        category: "Recidivism Risk",
        score: 15,
        status: "low",
        description:
          "Strong family support, mentorship, and structured program",
        mitigation: "Bridge Project provides 24/7 support structure",
      },
      {
        category: "Community Safety",
        score: 10,
        status: "low",
        description:
          "Non-violent offense with strong rehabilitation indicators",
        mitigation: "Supervised community service with tracking",
      },
      {
        category: "Program Compliance",
        score: 8,
        status: "low",
        description: "Demonstrated commitment and accountability measures",
        mitigation: "Weekly check-ins and progress monitoring",
      },
    ]);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + Math.floor(Math.random() * 3),
        })),
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getRiskColor = (status: string): string => {
    switch (status) {
      case "low":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "high":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-6 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">
                JAHmere Webb - Case Analysis Dashboard
              </h1>
              <p className="text-slate-600">
                Comprehensive judicial review and decision support system
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Updates
            </Badge>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Package
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-4 bg-white/60 backdrop-blur-sm border-b border-slate-200">
        <div className="flex gap-2">
          {[
            { id: "overview", label: "Overview", icon: Eye },
            { id: "evidence", label: "Evidence", icon: FileText },
            { id: "risk", label: "Risk Assessment", icon: Shield },
            { id: "community", label: "Community Impact", icon: Heart },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "default" : "ghost"}
              onClick={() => setSelectedTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {selectedTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className={metric.color}>{metric.icon}</div>
                        <Badge
                          variant={
                            metric.trend === "up" ? "default" : "secondary"
                          }
                        >
                          {metric.trend === "up" ? "+" : ""}
                          {metric.change}%
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-2xl font-bold text-slate-800">
                          {formatNumber(metric.value)}
                        </h3>
                        <p className="text-sm text-slate-600">{metric.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Recommended Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600">
                      <CheckCircle className="w-6 h-6" />
                      <span>Approve Bridge Project</span>
                      <span className="text-xs opacity-90">
                        Alternative Sentencing
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2"
                    >
                      <Calendar className="w-6 h-6" />
                      <span>Schedule Hearing</span>
                      <span className="text-xs opacity-70">
                        Review Progress
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2"
                    >
                      <Download className="w-6 h-6" />
                      <span>Request Additional Info</span>
                      <span className="text-xs opacity-70">Due Diligence</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === "evidence" && (
            <motion.div
              key="evidence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid gap-4">
                {evidence.map((item) => (
                  <Card
                    key={item.id}
                    className="bg-white/80 backdrop-blur-sm shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-slate-800">
                              {item.title}
                            </h3>
                            <Badge
                              variant={
                                item.importance === "high"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {item.importance} priority
                            </Badge>
                            <Badge
                              variant={
                                item.status === "reviewed"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-slate-600 mb-3">{item.summary}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>Type: {item.type}</span>
                            <span>Date: {item.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === "risk" && (
            <motion.div
              key="risk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Risk Assessment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {riskFactors.map((factor, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 bg-slate-50/50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-slate-800">
                            {factor.category}
                          </h4>
                          <Badge className={getRiskColor(factor.status)}>
                            {factor.status} risk
                          </Badge>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-slate-600">
                              Risk Score
                            </span>
                            <span className="text-sm font-medium">
                              {factor.score}/100
                            </span>
                          </div>
                          <Progress value={factor.score} className="h-2" />
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          {factor.description}
                        </p>
                        <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                          <p className="text-sm text-blue-800">
                            <strong>Mitigation:</strong> {factor.mitigation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === "community" && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Community Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          2,847
                        </div>
                        <div className="text-slate-600">Active Supporters</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">
                            156
                          </div>
                          <div className="text-sm text-slate-600">
                            Letters Submitted
                          </div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600">
                            340K
                          </div>
                          <div className="text-sm text-slate-600">
                            Media Reach
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Impact Projections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                        <span className="text-slate-700">
                          Youth Mentored (Year 1)
                        </span>
                        <span className="font-bold text-green-600">127+</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                        <span className="text-slate-700">
                          Recidivism Reduction
                        </span>
                        <span className="font-bold text-green-600">73%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                        <span className="text-slate-700">
                          Community Cost Savings
                        </span>
                        <span className="font-bold text-green-600">$2.4M</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                        <span className="text-slate-700">
                          Program Success Rate
                        </span>
                        <span className="font-bold text-green-600">95%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-white/60 backdrop-blur-sm border-t border-slate-200">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <span>Case ID: JAHmere-Webb-2024-Freedom</span>
        </div>
      </div>
    </div>
  );
}
