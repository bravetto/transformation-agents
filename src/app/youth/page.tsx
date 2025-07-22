"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Star,
  Target,
  Users,
  Heart,
  Trophy,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WARRIOR_MISSIONS = [
  {
    id: 1,
    title: "Write a Support Letter",
    description: "Add your voice to JAHmere's support network",
    points: 100,
    difficulty: "Easy",
    timeEstimate: "15 minutes",
    icon: Heart,
    completed: false,
  },
  {
    id: 2,
    title: "Share JAHmere's Story",
    description: "Spread awareness on social media",
    points: 75,
    difficulty: "Easy",
    timeEstimate: "5 minutes",
    icon: Star,
    completed: false,
  },
  {
    id: 3,
    title: "Recruit a Prayer Warrior",
    description: "Invite a friend to join the prayer network",
    points: 150,
    difficulty: "Medium",
    timeEstimate: "10 minutes",
    icon: Users,
    completed: false,
  },
  {
    id: 4,
    title: "Create Art for Justice",
    description: "Design poster or artwork supporting JAHmere",
    points: 200,
    difficulty: "Creative",
    timeEstimate: "30 minutes",
    icon: Trophy,
    completed: false,
  },
];

const IMPACT_STATS = {
  youthWarriors: 423,
  lettersWritten: 156,
  sharesCreated: 89,
  prayersOffered: 672,
  totalPoints: 12847,
};

export default function YouthPage() {
  const [missions, setMissions] = useState(WARRIOR_MISSIONS);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const completeMission = (missionId: number) => {
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === missionId ? { ...mission, completed: true } : mission,
      ),
    );
  };

  const filteredMissions =
    selectedDifficulty === "All"
      ? missions
      : missions.filter((mission) => mission.difficulty === selectedDifficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-500 to-green-400">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 text-white"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-24 h-24 text-yellow-300" />
              <Zap className="w-8 h-8 text-white absolute top-8 left-8" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Youth Warriors for Justice
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Join the next generation fighting for JAHmere's freedom. Every
            mission you complete brings us closer to justice.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">
                {IMPACT_STATS.youthWarriors}
              </div>
              <div className="text-sm">Youth Warriors</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">
                {IMPACT_STATS.lettersWritten}
              </div>
              <div className="text-sm">Letters Written</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">
                {IMPACT_STATS.sharesCreated}
              </div>
              <div className="text-sm">Shares Created</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">
                {IMPACT_STATS.totalPoints.toLocaleString()}
              </div>
              <div className="text-sm">Total Points</div>
            </div>
          </div>
        </motion.div>

        {/* Mission Control */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Target className="w-6 h-6 text-green-600" />
                Mission Control Center
              </CardTitle>
              <p className="text-gray-600">
                Complete missions to earn points and help JAHmere's cause
              </p>

              {/* Difficulty Filter */}
              <div className="flex gap-2 mt-4">
                {["All", "Easy", "Medium", "Creative"].map((difficulty) => (
                  <Badge
                    key={difficulty}
                    variant={
                      selectedDifficulty === difficulty
                        ? "default"
                        : "secondary"
                    }
                    className="cursor-pointer"
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {filteredMissions.map((mission, index) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    mission.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <mission.icon
                        className={`w-8 h-8 mt-1 ${
                          mission.completed
                            ? "text-green-600"
                            : "text-green-500"
                        }`}
                      />

                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${
                            mission.completed
                              ? "text-green-800 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {mission.title}
                        </h3>

                        <p className="text-gray-600 mt-1">
                          {mission.description}
                        </p>

                        <div className="flex items-center gap-4 mt-3">
                          <Badge variant="secondary">
                            {mission.points} points
                          </Badge>
                          <Badge variant="outline">{mission.difficulty}</Badge>
                          <span className="text-sm text-gray-500">
                            {mission.timeEstimate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      {mission.completed ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      ) : (
                        <Button
                          onClick={() => completeMission(mission.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Start Mission
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Card className="bg-white/90 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Become a Justice Warrior?
              </h2>
              <p className="text-gray-600 mb-6">
                Every action you take creates ripples of hope and change. Join
                the movement and help write JAHmere's freedom story.
              </p>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 
                           text-white font-bold rounded-full hover:from-green-400 hover:to-emerald-400 
                           transition-all shadow-lg hover:shadow-xl"
                >
                  Begin Your Mission →
                </Button>

                <p className="text-sm text-green-600 font-medium">
                  Join {IMPACT_STATS.youthWarriors}+ Youth Warriors fighting for
                  justice
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
