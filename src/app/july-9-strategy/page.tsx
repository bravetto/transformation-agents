"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Target,
  Shield,
  FileText,
  CheckCircle,
  AlertCircle,
  Heart,
  TrendingUp,
  MapPin,
  Video,
  Download,
  ArrowRight,
} from "lucide-react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import Section from "@/components/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const SUPPORT_GOALS = {
  letters: { current: 1247, target: 1500 },
  courtroom: { current: 35, target: 50 },
  media: { current: 3, target: 5 },
};

const July9Strategy = () => {
  const [timeUntilCourt, setTimeUntilCourt] = useState("");

  useEffect(() => {
    const courtDate = new Date("2025-07-09T09:00:00-04:00");
    const updateTimer = () => {
      const now = new Date();
      const diff = courtDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeUntilCourt(`${days} days, ${hours} hours, ${minutes} minutes`);
      } else {
        setTimeUntilCourt("Court in session");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Urgent Header */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-lg flex items-center justify-center gap-2">
            <Clock className="w-5 h-5" />
            {timeUntilCourt} until JAHmere's arraignment
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <Section variant="gradient" padding="large">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <Badge variant="secondary" className="text-lg px-6 py-2">
            Strategic Update: July 9th Arraignment
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold">
            Our Mission: Community Release
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on judicial analysis, our strategic goal is pretrial release
            with community supervision - setting the stage for the
            Transformation Justice Lab
          </p>
        </motion.div>
      </Section>

      {/* Reality Check Section */}
      <Section padding="medium">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* What Won't Happen */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 bg-red-50 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold">Realistic Expectations</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Dismissal at arraignment is extremely rare. We're not expecting:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-red-600">✗</span> Immediate dismissal
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600">✗</span> Charges dropped
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600">✗</span> Case closed July 9th
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* What Can Happen */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 bg-green-50 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-bold">Achievable Goals</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Judge Ferrero values community solutions. We CAN achieve:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Release to community
                  supervision
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Work release
                  approval
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Quick motion hearing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Judge's interest in
                  innovation
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Strategic Plan */}
      <Section variant="subtle" padding="medium">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Strategic Approach
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <Target className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Primary Ask</h3>
            <h4 className="font-semibold mb-2">Community Release Plan</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Daily transformation check-ins</li>
              <li>• Maintain current employment</li>
              <li>• Begin Bravëtto role</li>
              <li>• 24/7 accountability</li>
            </ul>
          </Card>

          <Card className="p-6">
            <FileText className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Evidence Package</h3>
            <h4 className="font-semibold mb-2">What Judge Sees</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• 1,400+ support letters</li>
              <li>• Employment verification</li>
              <li>• Housing stability</li>
              <li>• Elite mentorship team</li>
            </ul>
          </Card>

          <Card className="p-6">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Victory Metrics</h3>
            <h4 className="font-semibold mb-2">How We Win</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Community supervision granted</li>
              <li>• Judge expresses interest</li>
              <li>• Quick hearing scheduled</li>
              <li>• Media covers innovation</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Progress Tracking */}
      <Section padding="medium">
        <h2 className="text-3xl font-bold text-center mb-12">
          48-Hour Sprint Progress
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Letters Goal */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold">Letters of Support</h3>
              </div>
              <Badge
                variant={
                  SUPPORT_GOALS.letters.current >= SUPPORT_GOALS.letters.target
                    ? "default"
                    : "secondary"
                }
              >
                {SUPPORT_GOALS.letters.current} / {SUPPORT_GOALS.letters.target}
              </Badge>
            </div>
            <Progress
              value={
                (SUPPORT_GOALS.letters.current / SUPPORT_GOALS.letters.target) *
                100
              }
              className="h-4"
            />
          </Card>

          {/* Courtroom Supporters */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold">Courtroom Supporters</h3>
              </div>
              <Badge
                variant={
                  SUPPORT_GOALS.courtroom.current >=
                  SUPPORT_GOALS.courtroom.target
                    ? "default"
                    : "secondary"
                }
              >
                {SUPPORT_GOALS.courtroom.current} /{" "}
                {SUPPORT_GOALS.courtroom.target}
              </Badge>
            </div>
            <Progress
              value={
                (SUPPORT_GOALS.courtroom.current /
                  SUPPORT_GOALS.courtroom.target) *
                100
              }
              className="h-4"
            />
          </Card>
        </div>
      </Section>

      {/* The Script */}
      <Section variant="divine" padding="large">
        <Card className="max-w-4xl mx-auto p-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            The Courtroom Script
          </h2>
          <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong className="text-blue-600">"Your Honor,</strong> we're not
              asking for dismissal today. We're demonstrating that JAHmere Webb
              has the most robust community support system in Florida judicial
              history. <strong>1,400 citizens</strong>,{" "}
              <strong>NFL Hall of Famer Tony Dungy</strong>, and{" "}
              <strong>CEO Michael Mataluni</strong> stand ready to ensure
              accountability while JAHmere transforms lives instead of wasting
              taxpayer dollars."
            </p>
          </div>
        </Card>
      </Section>

      {/* Action Center */}
      <Section padding="medium">
        <h2 className="text-3xl font-bold text-center mb-12">
          Take Action NOW
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link href="/letter-form-test">
            <Card className="p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
              <FileText className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold mb-2">Write to Judge</h3>
              <Button className="w-full">Write Now</Button>
            </Card>
          </Link>

          <Card className="p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-bold mb-2">Attend Court</h3>
            <Button className="w-full" variant="outline">
              Get Details
            </Button>
          </Card>

          <Card className="p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-bold mb-2">Share Story</h3>
            <Button className="w-full" variant="outline">
              Share
            </Button>
          </Card>

          <Card className="p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
            <Download className="w-12 h-12 mx-auto mb-4 text-orange-600" />
            <h3 className="font-bold mb-2">Get Materials</h3>
            <Button className="w-full" variant="outline">
              Download
            </Button>
          </Card>
        </div>
      </Section>

      {/* Final CTA */}
      <Section variant="gradient" padding="large">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl font-bold">Every Action Matters</h2>
          <p className="text-xl max-w-3xl mx-auto">
            We have {timeUntilCourt} to show Judge Ferrero that JAHmere has
            unprecedented community support. Your action today could be the
            difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/letter-form-test">
              <Button
                size="lg"
                className="bg-hope-gold text-justice-black hover:bg-hope-gold/90"
              >
                Write Your Letter Now
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Join Us in Court July 9th
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default withErrorBoundary(July9Strategy, {
  componentName: "July9Strategy",
  fallback: (
    <div className="text-center p-8">Strategy page temporarily unavailable</div>
  ),
});
