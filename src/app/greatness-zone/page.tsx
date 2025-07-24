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
    <section className="relative bg-gradient-to-br from-elite-divine-amber via-elite-divine-amber-light to-elite-crimson-urgency text-elite-platinum-truth py-20">
      <div className="absolute inset-0 bg-elite-obsidian-depth/10"></div>
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Trophy className="w-20 h-20 mx-auto mb-6 text-elite-divine-amber-light" />
          <h1 className="heading-1 mb-6">The Greatness Zone</h1>
          <p className="text-large mb-8 max-w-3xl mx-auto opacity-90">
            Discover your unique intersection of Passions, Talents, and Values —
            where your greatest joy meets the world's greatest needs
          </p>
          <Badge
            variant="secondary"
            className="text-lg px-6 py-3 bg-elite-platinum-truth/20 text-elite-platinum-truth border-elite-platinum-truth/30"
          >
            Created by Jay Forte • Proven with JAHmere Webb
          </Badge>
        </motion.div>
      </div>
    </section>
  );
}

// Methodology showcase with testimonials
function MethodologyShowcase() {
  const principles = [
    {
      icon: Heart,
      title: "Passions",
      description: "What energizes and excites you most",
      color: "elite-crimson-urgency",
      bgColor: "bg-elite-crimson-urgency/10",
      borderColor: "border-elite-crimson-urgency/30",
    },
    {
      icon: Star,
      title: "Talents",
      description: "Your natural abilities and learned skills",
      color: "elite-divine-amber",
      bgColor: "bg-elite-divine-amber/10",
      borderColor: "border-elite-divine-amber/30",
    },
    {
      icon: Target,
      title: "Values",
      description: "What matters most to you in life",
      color: "elite-justice-indigo",
      bgColor: "bg-elite-justice-indigo/10",
      borderColor: "border-elite-justice-indigo/30",
    },
  ];

  return (
    <section className="py-16 bg-elite-platinum-truth">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 text-elite-obsidian-depth mb-4">
            The Three Pillars of Greatness
          </h2>
          <p className="text-large text-elite-obsidian-depth/70 max-w-2xl mx-auto">
            Jay Forte's methodology identifies where your unique combination
            creates extraordinary impact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {principles.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  className={`card ${principle.bgColor} ${principle.borderColor} h-full transform hover:scale-105 transition-all duration-300`}
                >
                  <CardContent className="pt-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${principle.color}/20 flex items-center justify-center`}
                    >
                      <IconComponent
                        className={`w-8 h-8 text-${principle.color}`}
                      />
                    </div>
                    <h3 className="heading-4 text-elite-obsidian-depth mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-body text-elite-obsidian-depth/70">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Intersection Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="card bg-gradient-to-r from-elite-justice-indigo/10 to-elite-sacred-violet/10 border-elite-justice-indigo/30 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <Award className="w-12 h-12 text-elite-sacred-violet mx-auto mb-4" />
              <h3 className="heading-3 text-elite-obsidian-depth mb-4">
                Your Greatness Zone
              </h3>
              <p className="text-body text-elite-obsidian-depth/70">
                The sweet spot where all three pillars intersect is where you
                can make your greatest contribution to the world while
                experiencing deep fulfillment.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// JAHmere's transformation story
function DivineAlignmentStory() {
  const milestones = [
    {
      icon: Brain,
      title: "Assessment Discovery",
      description:
        "JAHmere's natural leadership and mentoring abilities revealed",
      metric: "Leadership Score: 95/100",
      color: "elite-justice-indigo",
    },
    {
      icon: Heart,
      title: "Passion Alignment",
      description: "Deep commitment to helping at-risk youth found purpose",
      metric: "Purpose Clarity: 98/100",
      color: "elite-crimson-urgency",
    },
    {
      icon: Target,
      title: "Value Integration",
      description: "Personal transformation aligned with community service",
      metric: "Value Alignment: 100/100",
      color: "elite-transformation-emerald",
    },
    {
      icon: TrendingUp,
      title: "Impact Projection",
      description:
        "Potential to mentor 500+ youth annually through The Bridge Project",
      metric: "Projected Impact: 500+ lives",
      color: "elite-sacred-violet",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-elite-justice-indigo/5 via-elite-platinum-truth to-elite-sacred-violet/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 text-elite-obsidian-depth mb-4">
            JAHmere's Divine Alignment
          </h2>
          <p className="text-large text-elite-obsidian-depth/70 max-w-3xl mx-auto">
            How the Greatness Zone assessment revealed JAHmere's extraordinary
            potential for community transformation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {milestones.map((milestone, index) => {
            const IconComponent = milestone.icon;
            return (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`card bg-${milestone.color}/10 border-${milestone.color}/30 h-full`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-${milestone.color}/20 flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent
                          className={`w-6 h-6 text-${milestone.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="heading-4 text-elite-obsidian-depth mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-body text-elite-obsidian-depth/70 mb-3">
                          {milestone.description}
                        </p>
                        <Badge
                          className={`bg-${milestone.color}/20 text-${milestone.color} border-${milestone.color}/30`}
                        >
                          {milestone.metric}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quote from Jay Forte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="card bg-gradient-to-r from-elite-divine-amber/10 to-elite-transformation-emerald/10 border-elite-divine-amber/30 max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <blockquote className="text-center">
                <p className="text-large text-elite-obsidian-depth italic mb-4">
                  "JAHmere's assessment results were extraordinary. His natural
                  leadership abilities, combined with his passion for helping
                  others and his deep values around family and community, create
                  a perfect storm for positive impact."
                </p>
                <cite className="text-elite-divine-amber font-semibold">
                  — Jay Forte, Greatness Zone Creator
                </cite>
              </blockquote>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Main page component
function GreatnessZonePage() {
  const [showAssessment, setShowAssessment] = useState(false);

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  if (showAssessment) {
    return (
      <main className="min-h-screen bg-elite-platinum-truth">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="heading-2 text-elite-obsidian-depth mb-4">
                Discover Your Greatness Zone
              </h1>
              <p className="text-body text-elite-obsidian-depth/70">
                Take the same assessment that revealed JAHmere's extraordinary
                potential
              </p>
            </div>
            <GreatnessZoneAssessment />
          </div>
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
      <section className="py-16 bg-gradient-to-r from-elite-divine-amber to-elite-crimson-urgency text-elite-platinum-truth">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-6">Discover Your Greatness Zone</h2>
            <p className="text-large mb-8 max-w-2xl mx-auto opacity-90">
              Take the same assessment that revealed JAHmere's extraordinary
              potential. See how your talents align with this transformational
              justice movement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleStartAssessment}
                className="btn-lg bg-elite-platinum-truth text-elite-divine-amber hover:bg-elite-platinum-truth-dark px-8 py-4 font-bold"
              >
                <Brain className="w-5 h-5 mr-2" />
                Take Assessment Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="btn-lg border-elite-platinum-truth text-elite-platinum-truth hover:bg-elite-platinum-truth/10 px-8 py-4 font-bold"
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
