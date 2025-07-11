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
  Star,
  Award,
  Zap,
} from "lucide-react";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import Section from "@/components/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// Updated goals for July 28th campaign
const SUPPORT_GOALS = {
  characterWitnesses: { current: 7, target: 50 }, // Martha's favorite number = God's Number!
  kidLetters: { current: 0, target: 500 },
  supportLetters: { current: 0, target: 500 },
  totalLetters: { current: 7, target: 1050 },
};

const July28Strategy = () => {
  const [timeUntilCourt, setTimeUntilCourt] = useState("");

  useEffect(() => {
    // Updated to July 28th, 2025
    const courtDate = new Date("2025-07-28T09:00:00-04:00");
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
            {timeUntilCourt} until JAHmere's court date - GAME ON!
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
            🔥 UPDATED STRATEGY: July 28th Court Date
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="text-red-600">GAME ON!</span> July 28th Mission
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            JAHmere's new court date gives us more time to build an unstoppable
            coalition. Starting with 7 letters (Martha's favorite = God's
            Number!), we're targeting 1,050 total letters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <Star className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
              <h3 className="font-bold text-lg">50 Character Witnesses</h3>
              <p className="text-sm text-gray-600">
                Elite testimonials from leaders
              </p>
              <div className="mt-3">
                <Progress
                  value={
                    (SUPPORT_GOALS.characterWitnesses.current /
                      SUPPORT_GOALS.characterWitnesses.target) *
                    100
                  }
                  className="h-2"
                />
                <p className="text-xs mt-1">
                  {SUPPORT_GOALS.characterWitnesses.current} of{" "}
                  {SUPPORT_GOALS.characterWitnesses.target}
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <Heart className="w-8 h-8 text-green-600 mb-3 mx-auto" />
              <h3 className="font-bold text-lg">500 Kids Supporting</h3>
              <p className="text-sm text-gray-600">Youth voices for JAHmere</p>
              <div className="mt-3">
                <Progress
                  value={
                    (SUPPORT_GOALS.kidLetters.current /
                      SUPPORT_GOALS.kidLetters.target) *
                    100
                  }
                  className="h-2"
                />
                <p className="text-xs mt-1">
                  {SUPPORT_GOALS.kidLetters.current} of{" "}
                  {SUPPORT_GOALS.kidLetters.target}
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-purple-50 border-purple-200">
              <Users className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
              <h3 className="font-bold text-lg">500 Community Letters</h3>
              <p className="text-sm text-gray-600">General support coalition</p>
              <div className="mt-3">
                <Progress
                  value={
                    (SUPPORT_GOALS.supportLetters.current /
                      SUPPORT_GOALS.supportLetters.target) *
                    100
                  }
                  className="h-2"
                />
                <p className="text-xs mt-1">
                  {SUPPORT_GOALS.supportLetters.current} of{" "}
                  {SUPPORT_GOALS.supportLetters.target}
                </p>
              </div>
            </Card>
          </div>
        </motion.div>
      </Section>

      {/* Martha's Divine Number Section */}
      <Section variant="subtle" padding="medium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-gold-400 to-amber-500 text-white p-8 rounded-2xl">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Starting with Divine Power
            </h2>
            <p className="text-xl mb-4">
              We have <span className="text-4xl font-bold">7</span> letters
              already
            </p>
            <p className="text-lg">
              Martha's favorite number = <strong>God's Number!</strong>
              <br />
              From 7 to 1,050 - watch the multiplication miracle
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Strategic Campaign Plan */}
      <Section padding="medium">
        <h2 className="text-3xl font-bold text-center mb-12">
          The July 28th Strategic Campaign
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Timeline */}
          <Card className="p-8">
            <Calendar className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold mb-6">Campaign Timeline</h3>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold">Phase 1: Foundation (Weeks 1-2)</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Secure first 15 character witnesses</li>
                  <li>• Launch youth letter campaign</li>
                  <li>• Create letter templates and guides</li>
                  <li>• Establish social media momentum</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold">Phase 2: Acceleration (Weeks 3-4)</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Reach 100 total letters</li>
                  <li>• Coach Dungy endorsement campaign</li>
                  <li>• Media outreach and coverage</li>
                  <li>• Community event organization</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold">Phase 3: Victory Push (Weeks 5-6)</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Final push to 1,050 letters</li>
                  <li>• Letter delivery coordination</li>
                  <li>• Courtroom support organization</li>
                  <li>• Victory celebration planning</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Letter Categories */}
          <Card className="p-8">
            <FileText className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold mb-6">
              Letter Campaign Strategy
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-blue-600">
                  50 Character Witnesses
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  High-impact testimonials from:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Business leaders and executives</li>
                  <li>• Former athletes and coaches</li>
                  <li>• Community leaders and pastors</li>
                  <li>• Education professionals</li>
                  <li>• Law enforcement supporters</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-green-600">
                  500 Youth Support Letters
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Voices of the future saying:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• "JAHmere protected Jordan when no one else would"</li>
                  <li>• "We need mentors like JAHmere in our community"</li>
                  <li>• "Give him a chance to keep helping kids"</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-purple-600">
                  500 Community Letters
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Broad coalition including:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Parents and families</li>
                  <li>• Local business owners</li>
                  <li>• Community volunteers</li>
                  <li>• Online supporters nationwide</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Call to Action */}
      <Section variant="gradient" padding="large">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl font-bold">
            Join the July 28th Victory Coalition
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/contact">
              <Button className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700">
                <Star className="w-6 h-6 mr-2" />
                Write Character Letter
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="w-full h-16 text-lg bg-green-600 hover:bg-green-700">
                <Heart className="w-6 h-6 mr-2" />
                Youth Letter Campaign
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="w-full h-16 text-lg bg-purple-600 hover:bg-purple-700">
                <Users className="w-6 h-6 mr-2" />
                Community Support
              </Button>
            </Link>
          </div>

          <p className="text-xl text-gray-600">
            From 7 to 1,050 letters. From divine number to divine victory.
            <br />
            <strong>GAME ON for July 28th!</strong>
          </p>
        </motion.div>
      </Section>
    </div>
  );
};

export default withDivineErrorBoundary(July28Strategy, {
  componentName: "July28Strategy",
  role: "guardian",
});
