"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  MessageCircle,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for community engagement
const COMMUNITY_STATS = {
  totalCheckins: 1247,
  streak: 7,
  community: 342,
  prayersSubmitted: 1583,
  lettersSent: 892,
  daysUntilHearing: 167,
};

const RECENT_ACTIVITY = [
  {
    id: 1,
    type: "prayer",
    name: "Sarah M.",
    location: "Tampa, FL",
    message: "Praying for breakthrough on July 28th! 🙏",
    time: "2 minutes ago",
    icon: Heart,
  },
  {
    id: 2,
    type: "letter",
    name: "Marcus J.",
    location: "Orlando, FL",
    message: "Just sent my letter to Judge Ferrero",
    time: "8 minutes ago",
    icon: MessageCircle,
  },
  {
    id: 3,
    type: "support",
    name: "Jennifer K.",
    location: "Miami, FL",
    message: "Standing with JAHmere's family in prayer",
    time: "15 minutes ago",
    icon: Users,
  },
];

const DAILY_GOALS = [
  {
    id: 1,
    title: "Submit Prayer Request",
    description: "Share your heart with our prayer community",
    completed: false,
    points: 10,
    icon: Heart,
  },
  {
    id: 2,
    title: "Write Letter to Judge",
    description: "Add your voice to support JAHmere's case",
    completed: false,
    points: 25,
    icon: MessageCircle,
  },
  {
    id: 3,
    title: "Share on Social Media",
    description: "Help spread JAHmere's story",
    completed: false,
    points: 15,
    icon: Star,
  },
];

export default function CheckInPage() {
  const [activeGoals, setActiveGoals] = useState(DAILY_GOALS);

  const toggleGoal = (goalId: number) => {
    setActiveGoals((goals) =>
      goals.map((goal) =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal,
      ),
    );
  };

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gentle-charcoal mb-4">
          Community Check-In Portal
        </h1>
        <p className="text-xl text-soft-shadow">
          Join our growing community supporting JAHmere Webb's journey to
          freedom
        </p>
        <div className="mt-4 text-courage-blue font-semibold">
          {COMMUNITY_STATS.daysUntilHearing} days until July 28th hearing
        </div>
      </motion.div>

      {/* Community Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-hope-gold/10 border-hope-gold/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-courage-blue mb-2">
                {COMMUNITY_STATS.lettersSubmitted.toLocaleString()}
              </div>
              <div className="text-sm text-soft-shadow mb-1">
                Letters of Support
              </div>
              <div className="text-xs text-hope-gold">Goal: 1,050</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-courage-blue/10 border-courage-blue/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-hope-gold mb-2">
                {COMMUNITY_STATS.community}
              </div>
              <div className="text-sm text-soft-shadow mb-1">
                Community Supporters
              </div>
              <div className="text-xs text-courage-blue">Growing daily</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gentle-charcoal/5 border-gentle-charcoal/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gentle-charcoal mb-2">
                {COMMUNITY_STATS.prayersSubmitted.toLocaleString()}
              </div>
              <div className="text-sm text-soft-shadow mb-1">
                Prayers Submitted
              </div>
              <div className="text-xs text-gentle-charcoal">24/7 coverage</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Daily Goals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-courage-blue" />
                Today's Impact Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    goal.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200 hover:border-courage-blue/30"
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <div className="flex items-start gap-3">
                    <goal.icon
                      className={`w-5 h-5 mt-1 ${
                        goal.completed ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                    <div className="flex-1">
                      <div
                        className={`font-semibold ${
                          goal.completed
                            ? "text-green-800 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {goal.title}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {goal.description}
                      </div>
                      <div className="text-xs text-courage-blue mt-2">
                        +{goal.points} community points
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Community Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-hope-gold" />
                Live Community Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {RECENT_ACTIVITY.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <activity.icon className="w-4 h-4 mt-1 text-courage-blue" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-800">
                      {activity.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {activity.message}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {activity.location}
                      <Clock className="w-3 h-3 ml-2" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-courage-blue/20 hover:border-courage-blue/40 transition-colors">
          <CardContent className="p-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-courage-blue" />
            <h3 className="text-lg font-semibold mb-2">Prayer Network</h3>
            <p className="text-gray-600 mb-4">
              Join thousands praying for JAHmere's freedom
            </p>
            <Button className="w-full bg-courage-blue hover:bg-courage-blue/90">
              Submit Prayer
            </Button>
          </CardContent>
        </Card>

        <Card className="border-hope-gold/20 hover:border-hope-gold/40 transition-colors">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-hope-gold" />
            <h3 className="text-lg font-semibold mb-2">Write to Judge</h3>
            <p className="text-gray-600 mb-4">
              Share your support directly with Judge Ferrero
            </p>
            <Button className="w-full bg-hope-gold hover:bg-hope-gold/90">
              Write Letter
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gentle-charcoal/20 hover:border-gentle-charcoal/40 transition-colors">
          <CardContent className="p-6 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-gentle-charcoal" />
            <h3 className="text-lg font-semibold mb-2">Share Story</h3>
            <p className="text-gray-600 mb-4">
              Help spread JAHmere's message of hope
            </p>
            <Button className="w-full bg-gentle-charcoal hover:bg-gentle-charcoal/90">
              Share Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Links */}
      <div className="text-center space-x-4">
        <Link
          href="/judge-ferrero-private"
          className="inline-block bg-courage-blue text-white px-6 py-2 rounded hover:bg-courage-blue/90 transition-colors"
        >
          Judge Resources
        </Link>
        <Link
          href="/letter-portal"
          className="inline-block bg-hope-gold text-white px-6 py-2 rounded hover:bg-hope-gold/90 transition-colors"
        >
          Write a Letter
        </Link>
        <Link
          href="/"
          className="inline-block bg-gentle-charcoal text-white px-6 py-2 rounded hover:bg-gentle-charcoal/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
