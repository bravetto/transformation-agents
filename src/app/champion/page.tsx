"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Trophy,
  Target,
  Users,
  Heart,
  Star,
  Shield,
  CheckCircle,
  Play,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LEADERSHIP_PRINCIPLES = [
  {
    id: 1,
    title: "Character Over Talent",
    description: "Building unshakeable character foundations",
    mentor: "Tony Dungy",
    completed: false,
    points: 150,
    icon: Crown,
  },
  {
    id: 2,
    title: "Servant Leadership",
    description: "Leading by serving others first",
    mentor: "Tony Dungy",
    completed: false,
    points: 125,
    icon: Heart,
  },
  {
    id: 3,
    title: "Building Championship Teams",
    description: "Creating winning cultures and environments",
    mentor: "Tony Dungy",
    completed: false,
    points: 175,
    icon: Trophy,
  },
  {
    id: 4,
    title: "Legacy Mindset",
    description: "Thinking beyond yourself to impact generations",
    mentor: "Tony Dungy",
    completed: false,
    points: 200,
    icon: Star,
  },
];

const CHAMPION_STATS = {
  totalChampions: 287,
  lessonsCompleted: 1247,
  livesImpacted: 5439,
  communityLeaders: 89,
  mentorshipHours: 2847,
};

const FEATURED_CONTENT = [
  {
    type: "video",
    title: "Tony Dungy: Building Champions",
    description: "Coach Dungy shares his championship philosophy",
    duration: "12:34",
    thumbnail: "/images/people/tony-dungy-profile.jpg",
    featured: true,
  },
  {
    type: "assessment",
    title: "Leadership Assessment",
    description: "Discover your leadership style and strengths",
    duration: "15 min",
    featured: true,
  },
  {
    type: "network",
    title: "Champion Network",
    description: "Connect with other developing leaders",
    duration: "Active",
    featured: true,
  },
];

export default function ChampionPage() {
  const [principles, setPrinciples] = useState(LEADERSHIP_PRINCIPLES);
  const [selectedContent, setSelectedContent] = useState("video");

  const completePrinciple = (principleId: number) => {
    setPrinciples((prev) =>
      prev.map((principle) =>
        principle.id === principleId
          ? { ...principle, completed: true }
          : principle,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-400">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 text-white"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Crown className="w-24 h-24 text-yellow-300" />
              <Trophy className="w-8 h-8 text-white absolute top-8 left-8" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Champion Development Academy
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Learn championship principles from NFL Hall of Fame Coach Tony
            Dungy. Develop the character and leadership skills that create
            lasting impact.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xl font-bold">
                {CHAMPION_STATS.totalChampions}
              </div>
              <div className="text-xs">Champions</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xl font-bold">
                {CHAMPION_STATS.lessonsCompleted.toLocaleString()}
              </div>
              <div className="text-xs">Lessons</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xl font-bold">
                {CHAMPION_STATS.livesImpacted.toLocaleString()}
              </div>
              <div className="text-xs">Lives Impacted</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xl font-bold">
                {CHAMPION_STATS.communityLeaders}
              </div>
              <div className="text-xs">Leaders</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xl font-bold">
                {CHAMPION_STATS.mentorshipHours.toLocaleString()}
              </div>
              <div className="text-xs">Mentor Hours</div>
            </div>
          </div>
        </motion.div>

        {/* Featured Content Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {FEATURED_CONTENT.map((content, index) => (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-sm hover:bg-white transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {content.type === "video" && (
                      <Play className="w-8 h-8 text-amber-600 mb-3" />
                    )}
                    {content.type === "assessment" && (
                      <Target className="w-8 h-8 text-amber-600 mb-3" />
                    )}
                    {content.type === "network" && (
                      <Users className="w-8 h-8 text-amber-600 mb-3" />
                    )}

                    <h3 className="font-bold text-gray-800 mb-2">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {content.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {content.duration}
                    </Badge>
                  </div>
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  {content.type === "video"
                    ? "Watch Now"
                    : content.type === "assessment"
                      ? "Take Assessment"
                      : "Join Network"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Leadership Principles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="w-6 h-6 text-amber-600" />
                Championship Principles by Tony Dungy
              </CardTitle>
              <p className="text-gray-600">
                Master the core principles that built Super Bowl champions
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    principle.completed
                      ? "bg-amber-50 border-amber-200"
                      : "bg-gray-50 border-gray-200 hover:border-amber-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <principle.icon
                        className={`w-8 h-8 mt-1 ${
                          principle.completed
                            ? "text-amber-600"
                            : "text-amber-500"
                        }`}
                      />

                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${
                            principle.completed
                              ? "text-amber-800 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {principle.title}
                        </h3>

                        <p className="text-gray-600 mt-1 mb-3">
                          {principle.description}
                        </p>

                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">
                            {principle.points} points
                          </Badge>
                          <Badge variant="outline">
                            Coach {principle.mentor}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      {principle.completed ? (
                        <CheckCircle className="w-8 h-8 text-amber-600" />
                      ) : (
                        <Button
                          onClick={() => completePrinciple(principle.id)}
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700"
                        >
                          Start Learning
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tony Dungy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Book className="w-8 h-8 text-amber-600" />
              </div>
              <blockquote className="text-xl italic text-gray-700 mb-4">
                "Champions aren't made in gyms. Champions are made from
                something deep inside them - a desire, a dream, a vision. They
                have to have the skill and the will. But the will must be
                stronger than the skill."
              </blockquote>
              <cite className="text-amber-700 font-semibold">
                — Coach Tony Dungy, Super Bowl Champion
              </cite>
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
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Become a Champion?
              </h2>
              <p className="text-gray-600 mb-6">
                Join {CHAMPION_STATS.totalChampions}+ developing leaders
                learning from one of the greatest coaches in NFL history. Your
                championship journey starts today.
              </p>

              <Button
                size="lg"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 
                         text-white font-bold rounded-full hover:from-amber-400 hover:to-yellow-400 
                         transition-all shadow-lg hover:shadow-xl"
              >
                Begin Champion Journey →
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
