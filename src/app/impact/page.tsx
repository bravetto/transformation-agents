"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Heart,
  MapPin,
  Calendar,
  BarChart3,
  Activity,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CoalitionMap from "@/components/coalition-map";

// Mock data - replace with real API calls
const IMPACT_DATA = {
  totalSupporters: 1247,
  goal: 5000,
  lettersWritten: 843,
  sharesCount: 2341,
  averageEngagementTime: "4:32",
  topStates: [
    { state: "Florida", count: 234, percentage: 18.8 },
    { state: "Texas", count: 187, percentage: 15.0 },
    { state: "California", count: 156, percentage: 12.5 },
    { state: "New York", count: 134, percentage: 10.7 },
    { state: "Georgia", count: 98, percentage: 7.9 },
  ],
  recentActivity: [
    {
      type: "letter",
      name: "Sarah M.",
      location: "Miami, FL",
      time: "2 minutes ago",
    },
    {
      type: "share",
      name: "Michael R.",
      location: "Houston, TX",
      time: "5 minutes ago",
    },
    {
      type: "letter",
      name: "Jennifer K.",
      location: "Atlanta, GA",
      time: "12 minutes ago",
    },
    {
      type: "support",
      name: "David L.",
      location: "Orlando, FL",
      time: "18 minutes ago",
    },
  ],
  weeklyGrowth: [
    { day: "Mon", count: 45 },
    { day: "Tue", count: 62 },
    { day: "Wed", count: 58 },
    { day: "Thu", count: 71 },
    { day: "Fri", count: 89 },
    { day: "Sat", count: 103 },
    { day: "Sun", count: 124 },
  ],
};

export default function ImpactDashboard() {
  const [currentSupporter, setCurrentSupporter] = useState(
    IMPACT_DATA.totalSupporters,
  );
  const percentage = (currentSupporter / IMPACT_DATA.goal) * 100;

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCurrentSupporter((prev) => prev + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section section-spacing bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="content-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="hero-heading">Impact Dashboard</h1>
            <p className="hero-subheading">
              Real-time view of community support for JAHmere
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Metrics Section */}
      <section className="section-spacing">
        <div className="content-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Supporters Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold">
                  {currentSupporter.toLocaleString()}
                </div>
                <div className="text-gray-600">Total Supporters</div>
              </Card>
            </motion.div>

            {/* Letters Written Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                <Heart className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-3xl font-bold">
                  {IMPACT_DATA.lettersWritten}
                </div>
                <div className="text-gray-600">Letters to Judge</div>
              </Card>
            </motion.div>

            {/* Social Shares Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-3xl font-bold">
                  {IMPACT_DATA.sharesCount.toLocaleString()}
                </div>
                <div className="text-gray-600">Story Shares</div>
              </Card>
            </motion.div>

            {/* Engagement Time Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-orange-500/10 to-red-500/10">
                <Activity className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-3xl font-bold">
                  {IMPACT_DATA.averageEngagementTime}
                </div>
                <div className="text-gray-600">Avg. Time on Site</div>
              </Card>
            </motion.div>
          </div>

          {/* Progress to Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Card className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Progress to Goal</h2>
                <Target className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Current: {currentSupporter.toLocaleString()}</span>
                  <span>Goal: {IMPACT_DATA.goal.toLocaleString()}</span>
                </div>
                <Progress value={percentage} className="h-4" />
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600">
                    {percentage.toFixed(1)}%
                  </span>
                  <span className="text-gray-600 ml-2">of goal reached</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Geographic Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Top Supporting States</h3>
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {IMPACT_DATA.topStates.map((state, index) => (
                    <div key={state.state} className="flex items-center gap-4">
                      <div className="w-8 text-center font-bold text-gray-500">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{state.state}</span>
                          <span className="text-sm text-gray-600">
                            {state.count} supporters
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${state.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Weekly Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Weekly Growth</h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-end justify-between h-48 gap-2">
                  {IMPACT_DATA.weeklyGrowth.map((day) => (
                    <div
                      key={day.day}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="text-xs font-medium">{day.count}</div>
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                        style={{
                          height: `${(day.count / Math.max(...IMPACT_DATA.weeklyGrowth.map((d) => d.count))) * 100}%`,
                          minHeight: "20px",
                        }}
                      />
                      <div className="text-xs text-gray-600">{day.day}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Live Activity Feed</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {IMPACT_DATA.recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "letter"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "share"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {activity.type === "letter" ? (
                        <Heart className="w-4 h-4" />
                      ) : activity.type === "share" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <Users className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.name}</div>
                      <div className="text-sm text-gray-600">
                        {activity.location}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Coalition Support Section */}
      <section className="section-spacing bg-gray-50 dark:bg-gray-900">
        <div className="content-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Coalition of Support</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Organizations across Florida and beyond are standing with JAHmere,
              demonstrating the infrastructure ready to support his
              rehabilitation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <CoalitionMap showJoinButton={true} />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-t from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="content-center text-center">
          <h2 className="text-3xl font-bold mb-4">Join These Supporters</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Every voice matters. Add your support to help Judge Ferrero see the
            community backing JAHmere's rehabilitation.
          </p>
          <div className="cta-group">
            <Link
              href="/judge-ferrero-letter"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Write Your Letter
            </Link>
            <Link
              href="/"
              className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
