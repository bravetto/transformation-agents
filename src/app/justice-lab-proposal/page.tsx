"use client";

import { motion } from "framer-motion";
import {
  Building,
  Heart,
  Users,
  Briefcase,
  Award,
  Target,
  Lightbulb,
  BookOpen,
  Shield,
  TrendingUp,
  Star,
  Gift,
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BRAVETTO_OFFER = {
  forJAHmere: {
    position: "Youth Transformation Specialist",
    salary: "$45,000/year with growth path",
    benefits: "Full health coverage + professional development",
    mentorship: "Direct access to Michael Mataluni (CEO)",
    coaching: "Jay Forte's Greatness Zone Certification",
  },
  forJudgeFerrero: {
    labName: "The Ferrero Transformation Justice Lab",
    mission: "Pioneering evidence-based alternatives to incarceration",
    partnership: "Bravëtto + Greatness Zone + The Bridge Project",
    impact: "Transform Florida's approach to youth justice",
  },
};

export default function TransformationJusticeLabProposal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />

        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <Badge variant="secondary" className="text-lg px-6 py-2">
              A Revolutionary Partnership Proposal
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              The Ferrero Transformation Justice Lab
            </h1>

            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Where Business Excellence Meets Judicial Innovation to Transform
              Lives
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Powered by Bravëtto
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Greatness Zone Methodology
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                The Bridge Project Framework
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-12 bg-gradient-to-br from-white to-blue-50">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <Lightbulb className="w-16 h-16 mx-auto text-yellow-500" />

                <h2 className="text-4xl font-bold">
                  Your Honor, Imagine This:
                </h2>

                <p className="text-xl text-gray-700 leading-relaxed">
                  What if JAHmere's case became the catalyst for a revolutionary
                  approach to justice? What if, instead of another incarceration
                  statistic, we created Florida's first corporate-judicial
                  partnership that transforms offenders into community assets?
                </p>

                <p className="text-lg text-gray-600">
                  Bravëtto and The Greatness Zone Institute are offering to
                  build this with you.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* The Three-Part Offer */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Three-Part Commitment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Part 1: JAHmere's Future */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full p-8 bg-gradient-to-br from-green-50 to-green-100">
                <div className="space-y-6">
                  <div className="p-4 bg-green-600 rounded-lg w-fit">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold">
                    1. JAHmere's Transformation Path
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Immediate Employment
                      </h4>
                      <p className="text-sm text-gray-600">
                        Youth Transformation Specialist at Bravëtto
                      </p>
                      <p className="text-2xl font-bold text-green-600 mt-2">
                        $45,000/year
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Professional Development
                      </h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Greatness Zone Certification</li>
                        <li>• Leadership training</li>
                        <li>• Public speaking coaching</li>
                        <li>• Business development skills</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold mb-2">Mentorship Team</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Michael Mataluni (CEO Bravëtto)</li>
                        <li>• Jay Forte (Greatness Zone Expert)</li>
                        <li>• Tony Dungy (Life Coach)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Part 2: Judge Ferrero's Lab */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full p-8 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="space-y-6">
                  <div className="p-4 bg-purple-600 rounded-lg w-fit">
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold">
                    2. Your Transformation Justice Lab
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold mb-2">Lab Framework</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Evidence-based alternative sentencing</li>
                        <li>• Corporate-judicial partnerships</li>
                        <li>• Talent assessment integration</li>
                        <li>• Real-time accountability metrics</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold mb-2">Our Support</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Full lab design & implementation</li>
                        <li>• Success metrics dashboard</li>
                        <li>• Monthly progress reports</li>
                        <li>• Case study documentation</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold mb-2">Legacy Impact</h4>
                      <p className="text-sm text-gray-600">
                        Pioneer Florida's first replicable model for
                        transformation justice
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Part 3: Community Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="h-full p-8 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="space-y-6">
                  <div className="p-4 bg-blue-600 rounded-lg w-fit">
                    <Users className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold">
                    3. Scaled Community Impact
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold mb-2">Youth Reached</h4>
                      <p className="text-3xl font-bold text-blue-600">500+</p>
                      <p className="text-sm text-gray-600">
                        At-risk youth in first year through JAHmere's work
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold mb-2">Business Partners</h4>
                      <p className="text-3xl font-bold text-blue-600">25+</p>
                      <p className="text-sm text-gray-600">
                        Companies offering employment pathways
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold mb-2">Cost Savings</h4>
                      <p className="text-3xl font-bold text-blue-600">$2.1M</p>
                      <p className="text-sm text-gray-600">
                        Projected 5-year taxpayer savings
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Michael's Personal Commitment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-12 bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start gap-6 mb-8">
                  <div className="p-4 bg-orange-600 rounded-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">
                      My Personal Commitment
                    </h3>
                    <p className="text-gray-600">
                      From Michael Mataluni, CEO of Bravëtto
                    </p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p>
                    Your Honor, I've built a $25M business from trauma. My
                    mother went to prison when I was 8. A garage fire almost
                    killed my family. I've fostered 7 children. I know what
                    transformation looks like because I've lived it.
                  </p>

                  <p>
                    When Jordan Dungy introduced me to JAHmere, I saw myself -
                    someone whose worst moment could have defined them, but
                    didn't. JAHmere protected Jordan, someone who cannot feel
                    pain. That tells you everything about his character.
                  </p>

                  <p>
                    I'm not just offering JAHmere a job. I'm offering to build
                    something revolutionary with you - a model that transforms
                    justice from a system of punishment to a laboratory of
                    possibility.
                  </p>

                  <p className="font-semibold text-xl">
                    Together, we can show Florida - and the nation - what
                    happens when business excellence meets judicial wisdom in
                    service of transformation.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* The Lab Blueprint */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            The Ferrero Lab Blueprint
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-8 h-full">
                <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-4">
                  Phase 1: Foundation (Months 1-3)
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    JAHmere begins role at Bravëtto
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Greatness Zone assessment for first cohort
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Lab metrics dashboard launch
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Monthly judicial review meetings
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="p-8 h-full">
                <Target className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-4">
                  Phase 2: Scale (Months 4-12)
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>5 participants
                    placed in employment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Business partner network expansion
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    First success story documentation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Model replication framework
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-t from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Your Honor, This Is Your Moment
            </h2>

            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              On July 9th, you don't just sentence JAHmere Webb. You launch
              Florida's first Transformation Justice Lab. You become the judge
              who proved that business and justice can partner to transform
              lives at scale.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="text-center">
                <Gift className="w-16 h-16 mx-auto mb-2" />
                <p className="font-semibold">We Provide Everything</p>
                <p className="text-sm text-blue-100">
                  Resources, expertise, accountability
                </p>
              </div>

              <div className="text-center">
                <Shield className="w-16 h-16 mx-auto mb-2" />
                <p className="font-semibold">You Maintain Oversight</p>
                <p className="text-sm text-blue-100">
                  Full judicial control and monitoring
                </p>
              </div>

              <div className="text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-2" />
                <p className="font-semibold">Together We Transform</p>
                <p className="text-sm text-blue-100">
                  Justice, lives, and communities
                </p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-2xl font-bold mb-4">
                Will you partner with us to make history?
              </p>

              <div className="flex flex-col items-center gap-4">
                <Badge variant="secondary" className="text-lg px-8 py-3">
                  The Ferrero Transformation Justice Lab Awaits Your Vision
                </Badge>

                <p className="text-sm text-blue-200">
                  Michael Mataluni (CEO) & Jay Forte (CPO) - Bravëtto
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
