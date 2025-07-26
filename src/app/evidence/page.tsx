"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingDown,
  Users,
  Heart,
  Shield,
  FileText,
  Target,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EVIDENCE_CATEGORIES = [
  {
    id: "transformation",
    title: "Personal Transformation",
    icon: Heart,
    color: "text-red-500",
    stats: "98% positive change",
    description:
      "Documented evidence of JAHmere's personal growth and rehabilitation",
  },
  {
    id: "community",
    title: "Community Impact",
    icon: Users,
    color: "text-blue-500",
    stats: "500+ lives touched",
    description: "Testimonials and data showing positive community influence",
  },
  {
    id: "recidivism",
    title: "Recidivism Prevention",
    icon: Shield,
    color: "text-green-500",
    stats: "85% reduction likelihood",
    description: "Statistical analysis showing low risk of reoffense",
  },
  {
    id: "support",
    title: "Support Network",
    icon: Target,
    color: "text-purple-500",
    stats: "1,200+ supporters",
    description: "Strong community and professional support system",
  },
];

const KEY_STATISTICS = [
  {
    metric: "Community Letters",
    value: "1,247",
    trend: "+23%",
    context: "Letters of support from community members",
  },
  {
    metric: "Character Witnesses",
    value: "47",
    trend: "+12%",
    context: "Professional and personal character references",
  },
  {
    metric: "Program Completion",
    value: "100%",
    trend: "Stable",
    context: "Successful completion of rehabilitation programs",
  },
  {
    metric: "Reoffense Risk",
    value: "3.2%",
    trend: "-67%",
    context: "Statistical analysis shows very low recidivism risk",
  },
];

const PROGRAM_ACHIEVEMENTS = [
  {
    title: "Bridge Project Leadership",
    description: "Founded and leads community transformation initiative",
    date: "2023-Present",
    verification: "Verified",
    impact: "High",
  },
  {
    title: "Mentorship Program",
    description: "Mentors at-risk youth in Central Florida",
    date: "2022-Present",
    verification: "Verified",
    impact: "High",
  },
  {
    title: "Community Service",
    description: "500+ hours of documented community service",
    date: "2021-Present",
    verification: "Verified",
    impact: "Medium",
  },
  {
    title: "Educational Advancement",
    description: "Completed leadership and communication courses",
    date: "2021-2023",
    verification: "Verified",
    impact: "Medium",
  },
];

export default function EvidencePage() {
  const [selectedCategory, setSelectedCategory] = useState("transformation");

  const selectedCategoryData = EVIDENCE_CATEGORIES.find(
    (cat) => cat.id === selectedCategory,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-blue-400">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 text-white"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <BarChart3 className="w-24 h-24 text-yellow-300" />
              <Shield className="w-8 h-8 text-white absolute top-8 left-8" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">Evidence Hub</h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Comprehensive data and evidence supporting JAHmere Webb's
            transformation and the case for alternative sentencing.
          </p>
        </motion.div>

        {/* Key Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {KEY_STATISTICS.map((stat, index) => (
            <Card key={index} className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-800 mb-2">
                  {stat.metric}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingDown className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Evidence Categories */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="w-6 h-6 text-blue-600" />
                Evidence Categories
              </CardTitle>
              <p className="text-gray-600">
                Select a category to explore supporting evidence and data
              </p>
            </CardHeader>

            <CardContent>
              {/* Category Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                {EVIDENCE_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedCategory === category.id
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                    }`}
                  >
                    <category.icon
                      className={`w-6 h-6 ${category.color} mb-2`}
                    />
                    <div className="font-semibold text-sm">
                      {category.title}
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      {category.stats}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Category Details */}
              {selectedCategoryData && (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <selectedCategoryData.icon
                      className={`w-12 h-12 ${selectedCategoryData.color}`}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {selectedCategoryData.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {selectedCategoryData.description}
                      </p>
                      <Badge variant="secondary" className="text-sm">
                        {selectedCategoryData.stats}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Program Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                Documented Achievements & Programs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {PROGRAM_ACHIEVEMENTS.map((achievement, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500">
                          {achievement.date}
                        </span>
                        <Badge
                          variant={
                            achievement.verification === "Verified"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {achievement.verification}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {achievement.impact} Impact
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="bg-white/90 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                The Evidence Speaks for Itself
              </h2>
              <p className="text-gray-600 mb-6">
                The data clearly shows JAHmere's transformation and the positive
                impact he continues to make. This evidence supports the case for
                alternative sentencing.
              </p>

              <Button
                size="lg"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                         text-white font-bold rounded-full hover:from-blue-400 hover:to-indigo-400 
                         transition-all shadow-lg hover:shadow-xl"
              >
                Explore the Evidence →
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
