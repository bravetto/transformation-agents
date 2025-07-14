"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Brain,
  Heart,
  Target,
  Star,
  Users,
  ArrowRight,
  Award,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GreatnessZoneAssessment from "@/components/greatness-zone/assessment";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import Link from "next/link";

// Hero section for the Greatness Zone page
function GreatnessZoneHero() {
  return (
    <section className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-200" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            The Greatness Zone
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover your unique intersection of Passions, Talents, and Values —
            where your greatest joy meets the world's greatest needs
          </p>
          <Badge
            variant="secondary"
            className="text-lg px-6 py-3 bg-white/20 text-white border-white/30"
          >
            Created by Jay Forte • Proven with JAHmere Webb
          </Badge>
        </motion.div>
      </div>
    </section>
  );
}

// Jay Forte methodology showcase
function MethodologyShowcase() {
  const features = [
    {
      icon: Brain,
      title: "Scientific Assessment",
      description:
        "40 years of research identifying natural talents, not learned behaviors",
      stats: "10,000+ assessments",
    },
    {
      icon: Heart,
      title: "Divine Alignment",
      description:
        "Jay Forte (71/200) and JAHmere Webb (62/200) - perfect mentor match",
      stats: "<0.1% probability",
    },
    {
      icon: Target,
      title: "Proven Results",
      description:
        "500+ companies transformed through talent-based optimization",
      stats: "95% accuracy rate",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            The Science Behind the Miracle
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jay Forte's revolutionary methodology doesn't just assess
            personality — it reveals your God-given talents and shows how they
            align with your purpose
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full border-2 hover:border-yellow-300 transition-colors">
                <CardHeader className="text-center">
                  <feature.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Badge
                    variant="outline"
                    className="text-yellow-600 border-yellow-300"
                  >
                    {feature.stats}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// The divine alignment story
function DivineAlignmentStory() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              The Divine Alignment That Changed Everything
            </h2>
            <p className="text-xl text-gray-600">
              When Jay Forte assessed JAHmere Webb, something extraordinary was
              revealed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-600" />
                  Jay Forte - The Mentor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Quadrant:</span>
                    <Badge className="bg-green-600">Friend (71/200)</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Peacemaker:</span>
                      <span className="font-bold">19/20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Caregiver:</span>
                      <span className="font-bold">18/20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Relator:</span>
                      <span className="font-bold">18/20</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-blue-600" />
                  JAHmere Webb - The Bridge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Quadrant:</span>
                    <Badge className="bg-blue-600">Friend (62/200)</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Peacemaker:</span>
                      <span className="font-bold">18/20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Caregiver:</span>
                      <span className="font-bold">16/20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Relator:</span>
                      <span className="font-bold">16/20</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
            <CardContent className="p-8">
              <div className="text-center">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  Perfect Mentor-Mentee Match
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  "In 30 years of administering assessments, I've NEVER seen
                  such perfect alignment. The probability of this match is less
                  than 0.1% — this isn't random, this is divine orchestration."
                </p>
                <cite className="text-gray-600 font-medium">
                  — Jay Forte, Creator of The Greatness Zone
                </cite>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function GreatnessZonePage() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
  };

  if (showAssessment) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Button
              variant="outline"
              onClick={() => setShowAssessment(false)}
              className="mb-4"
            >
              ← Back to Overview
            </Button>
          </motion.div>

          <GreatnessZoneAssessment
            onComplete={handleAssessmentComplete}
            showComparison={true}
          />

          {assessmentResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to Join the Movement?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your assessment reveals unique gifts that could make a real
                    difference in JAHmere's case and the broader transformation
                    justice movement.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      asChild
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      <Link href="/twitter-campaign">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Start Your Campaign
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/people/jay-forte">
                        Learn More About Jay's Work
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <GreatnessZoneHero />
      <MethodologyShowcase />
      <DivineAlignmentStory />

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Discover Your Greatness Zone
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Take the same assessment that revealed JAHmere's extraordinary
              potential. See how your talents align with this transformational
              justice movement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleStartAssessment}
                className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
              >
                <Brain className="w-5 h-5 mr-2" />
                Take Assessment Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-4 text-lg font-bold"
              >
                <Link href="/people/jay-forte">
                  <Users className="w-5 h-5 mr-2" />
                  Meet Jay Forte
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default withDivineErrorBoundary(GreatnessZonePage, {
  componentName: "GreatnessZonePage",
  role: "lightworker",
});
