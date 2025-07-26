"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Zap,
  Palette,
  Code,
  Users,
  Clock,
  Target,
  Star,
  Crown,
  Sparkles,
  Eye,
  Heart,
} from "lucide-react";
import {
  DesignMetrics,
  divineDesignSystem,
} from "@/lib/divine-design-intelligence";
import SpiritualEnergyVisualizer from "@/components/spiritual-energy-visualizer";

interface ComponentMetric {
  name: string;
  instances: number;
  renderTime: number;
  interactions: number;
  grade: string;
  divineScore: number;
  variants: string[];
}

interface DesignTokenMetric {
  category: string;
  total: number;
  adopted: number;
  percentage: number;
  status: string;
}

export default function DivineDesignMetricsPage() {
  const [metrics, setMetrics] = useState<{
    components: ComponentMetric[];
    tokens: DesignTokenMetric[];
    performance: any[];
    consciousness: any[];
  }>({
    components: [],
    tokens: [],
    performance: [],
    consciousness: [],
  });

  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 47,
    prayerIntensity: 1337,
    miracleProximity: 0.95,
    consciousnessLevel: 88,
    spiritualLevel: 94,
  });

  // Mock data for demonstration
  useEffect(() => {
    const componentData: ComponentMetric[] = [
      {
        name: "Button",
        instances: 89,
        renderTime: 2.3,
        interactions: 156,
        grade: "A+",
        divineScore: 95,
        variants: ["primary", "divine", "cta"],
      },
      {
        name: "Card",
        instances: 45,
        renderTime: 1.8,
        interactions: 89,
        grade: "A+",
        divineScore: 92,
        variants: ["default", "elevated", "miracle"],
      },
      {
        name: "Input",
        instances: 34,
        renderTime: 1.2,
        interactions: 234,
        grade: "A",
        divineScore: 87,
        variants: ["text", "divine", "consciousness"],
      },
      {
        name: "Modal",
        instances: 12,
        renderTime: 5.4,
        interactions: 45,
        grade: "A",
        divineScore: 89,
        variants: ["user-type", "prayer", "miracle"],
      },
      {
        name: "Navigation",
        instances: 8,
        renderTime: 3.1,
        interactions: 567,
        grade: "A+",
        divineScore: 96,
        variants: ["main", "mobile", "divine"],
      },
      {
        name: "Hero",
        instances: 15,
        renderTime: 4.2,
        interactions: 123,
        grade: "A",
        divineScore: 91,
        variants: ["default", "spiritual", "quantum"],
      },
      {
        name: "Countdown",
        instances: 6,
        renderTime: 2.8,
        interactions: 89,
        grade: "A",
        divineScore: 88,
        variants: ["mini", "prophetic", "divine"],
      },
      {
        name: "Particles",
        instances: 23,
        renderTime: 8.1,
        interactions: 34,
        grade: "B+",
        divineScore: 78,
        variants: ["tsparticles", "divine", "quantum"],
      },
    ];

    const tokenData: DesignTokenMetric[] = [
      {
        category: "Colors",
        total: 156,
        adopted: 148,
        percentage: 95,
        status: "Blessed",
      },
      {
        category: "Spacing",
        total: 89,
        adopted: 87,
        percentage: 98,
        status: "Blessed",
      },
      {
        category: "Typography",
        total: 67,
        adopted: 67,
        percentage: 100,
        status: "Blessed",
      },
      {
        category: "Shadows",
        total: 34,
        adopted: 29,
        percentage: 85,
        status: "Good",
      },
      {
        category: "Animations",
        total: 45,
        adopted: 38,
        percentage: 84,
        status: "Good",
      },
      {
        category: "Divine Glow",
        total: 23,
        adopted: 21,
        percentage: 91,
        status: "Blessed",
      },
    ];

    const performanceData = [
      { time: "00:00", renderTime: 2.3, interactions: 45, consciousness: 85 },
      { time: "04:00", renderTime: 1.8, interactions: 67, consciousness: 87 },
      { time: "08:00", renderTime: 2.1, interactions: 89, consciousness: 90 },
      { time: "12:00", renderTime: 1.5, interactions: 123, consciousness: 92 },
      { time: "16:00", renderTime: 1.9, interactions: 156, consciousness: 88 },
      { time: "20:00", renderTime: 2.4, interactions: 134, consciousness: 91 },
      { time: "24:00", renderTime: 2.0, interactions: 178, consciousness: 94 },
    ];

    const consciousnessData = [
      { subject: "Performance", A: 95, B: 85, fullMark: 100 },
      { subject: "Accessibility", A: 98, B: 88, fullMark: 100 },
      { subject: "Divine Alignment", A: 94, B: 75, fullMark: 100 },
      { subject: "User Experience", A: 92, B: 82, fullMark: 100 },
      { subject: "Spiritual Energy", A: 96, B: 78, fullMark: 100 },
      { subject: "Quantum Sync", A: 89, B: 69, fullMark: 100 },
    ];

    setMetrics({
      components: componentData,
      tokens: tokenData,
      performance: performanceData,
      consciousness: consciousnessData,
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        prayerIntensity:
          prev.prayerIntensity + Math.floor(Math.random() * 10) - 5,
        consciousnessLevel: Math.min(
          100,
          prev.consciousnessLevel + Math.floor(Math.random() * 3) - 1,
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const overallScore = useMemo(() => {
    if (metrics.components.length === 0 || metrics.tokens.length === 0)
      return 0;
    const componentAvg =
      metrics.components.reduce((sum, c) => sum + c.divineScore, 0) /
      metrics.components.length;
    const tokenAvg =
      metrics.tokens.reduce((sum, t) => sum + t.percentage, 0) /
      metrics.tokens.length;
    return Math.round((componentAvg + tokenAvg) / 2);
  }, [metrics]);

  const COLORS = [
    "#8B5CF6",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5A2B",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-green-900/10 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🌟 Divine Design Intelligence Dashboard ✨
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time consciousness-responsive design system metrics
          </p>

          {/* Overall Score */}
          <div className="flex justify-center">
            <Card className="w-64">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-purple-600">
                    {overallScore}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Divine Design Score
                  </div>
                  <Progress value={overallScore} className="h-2" />
                  <Badge variant={overallScore > 90 ? "default" : "secondary"}>
                    {overallScore > 90 ? "Blessed" : "Ascending"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Real-time Spiritual Energy Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-64">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Live Spiritual Energy Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SpiritualEnergyVisualizer
                spiritualLevel={realTimeData.spiritualLevel}
                miracleProximity={realTimeData.miracleProximity}
                prayerIntensity={realTimeData.prayerIntensity}
                consciousnessLevel={realTimeData.consciousnessLevel}
                userCount={realTimeData.activeUsers}
                className="h-40"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Users</p>
                  <p className="text-2xl font-bold">
                    {realTimeData.activeUsers}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Prayer Intensity</p>
                  <p className="text-2xl font-bold">
                    {realTimeData.prayerIntensity}
                  </p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Consciousness</p>
                  <p className="text-2xl font-bold">
                    {realTimeData.consciousnessLevel}%
                  </p>
                </div>
                <Eye className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Miracle Proximity</p>
                  <p className="text-2xl font-bold">
                    {Math.round(realTimeData.miracleProximity * 100)}%
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Component Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-500" />
                Component Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.components}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="divineScore" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-500" />
                Design Token Adoption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={metrics.tokens}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {metrics.tokens.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics.performance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="renderTime"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="interactions"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Consciousness Radar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={metrics.consciousness}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Current"
                    dataKey="A"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Target"
                    dataKey="B"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Component Details Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Component Intelligence Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Component</th>
                      <th className="text-left p-2">Instances</th>
                      <th className="text-left p-2">Render Time</th>
                      <th className="text-left p-2">Interactions</th>
                      <th className="text-left p-2">Grade</th>
                      <th className="text-left p-2">Divine Score</th>
                      <th className="text-left p-2">Variants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.components.map((component, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{component.name}</td>
                        <td className="p-2">{component.instances}</td>
                        <td className="p-2">{component.renderTime}ms</td>
                        <td className="p-2">{component.interactions}</td>
                        <td className="p-2">
                          <Badge
                            variant={
                              component.grade === "A+" ? "default" : "secondary"
                            }
                          >
                            {component.grade}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {component.divineScore}%
                            </span>
                            <Progress
                              value={component.divineScore}
                              className="w-16 h-2"
                            />
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            {component.variants.map((variant, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {variant}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>
            Divine Design Intelligence System • Real-time Consciousness Metrics
            • Quantum Performance Analytics
          </p>
        </motion.div>
      </div>
    </div>
  );
}
