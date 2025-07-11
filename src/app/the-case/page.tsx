"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  Shield,
  Users,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Heart,
  Scale,
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TIMELINE_EVENTS = [
  {
    date: "August 2023",
    title: "Initial Contact with Tony Dungy",
    description:
      "Coach Dungy learns about JAHmere's case and begins evaluation",
    status: "completed",
  },
  {
    date: "October 2023",
    title: "Program Development",
    description: "The Bridge Project framework customized for JAHmere's needs",
    status: "completed",
  },
  {
    date: "November 2023",
    title: "Dungy Endorsement",
    description: "Tony Dungy formally endorses JAHmere for the program",
    status: "completed",
  },
  {
    date: "December 2023",
    title: "Proposal Submission",
    description: "Comprehensive proposal submitted to Judge Ferrero",
    status: "completed",
  },
  {
    date: "January 2024",
    title: "Community Support Campaign",
    description: "Launch of public support initiative",
    status: "current",
  },
  {
    date: "March 2024",
    title: "Expected Decision",
    description: "Judge Ferrero's decision on rehabilitation vs incarceration",
    status: "pending",
  },
];

const PROGRAM_FEATURES = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "24/7 Accountability",
    description:
      "Continuous monitoring and support through structured mentorship",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Integration",
    description: "Gradual reintegration with job training and social support",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Goal-Oriented Progress",
    description: "Clear milestones and measurable outcomes for success",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Holistic Approach",
    description: "Addressing root causes, not just symptoms",
  },
];

export default function TheCasePage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section section-spacing bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="content-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="hero-heading">The Case for Rehabilitation</h1>
            <p className="hero-subheading">
              Understanding JAHmere's situation and the opportunity for
              transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="content-center">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="program">The Program</TabsTrigger>
              <TabsTrigger value="legal">Legal Context</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">The Situation</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      JAHmere Webb stands at a crossroads. At 21 years old, he
                      faces a decision that will shape the rest of his life:
                      traditional incarceration with a 73% chance of
                      reoffending, or an innovative rehabilitation program that
                      has proven to transform lives.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Judge Ferrero has the power to choose a different path—one
                      that doesn't just punish, but rehabilitates. One that
                      doesn't perpetuate the cycle, but breaks it.
                    </p>
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          The Traditional Path
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li>• 73% recidivism rate</li>
                          <li>• Average cost: $35,000/year to taxpayers</li>
                          <li>• Limited rehabilitation opportunities</li>
                          <li>• Disrupted family and community ties</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-green-200 bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          The Bridge Project Path
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li>• 73% SUCCESS rate (opposite of prison)</li>
                          <li>• Zero cost to taxpayers</li>
                          <li>• Intensive mentorship and accountability</li>
                          <li>• Maintains family and builds community</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    Case Timeline
                  </h2>
                  <div className="space-y-6">
                    {TIMELINE_EVENTS.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex gap-4 p-4 rounded-lg ${
                          event.status === "completed"
                            ? "bg-green-50 dark:bg-green-950/20"
                            : event.status === "current"
                              ? "bg-blue-50 dark:bg-blue-950/20"
                              : "bg-gray-50 dark:bg-gray-800"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            event.status === "completed"
                              ? "bg-green-600"
                              : event.status === "current"
                                ? "bg-blue-600"
                                : "bg-gray-400"
                          }`}
                        >
                          {event.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : event.status === "current" ? (
                            <Clock className="w-5 h-5 text-white" />
                          ) : (
                            <Clock className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg">{event.title}</div>
                          <div className="text-sm text-gray-600 mb-1">
                            {event.date}
                          </div>
                          <div className="text-gray-700 dark:text-gray-300">
                            {event.description}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Program Tab */}
            <TabsContent value="program" className="space-y-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    The Bridge Project Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {PROGRAM_FEATURES.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg h-fit">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{feature.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">
                      Program Requirements
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Daily check-ins with assigned mentor</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          Weekly group sessions with other program participants
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          Job training or educational enrollment within 30 days
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          Community service commitment (20 hours/month)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          Random drug testing and compliance monitoring
                        </span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Legal Context Tab */}
            <TabsContent value="legal" className="space-y-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Scale className="w-6 h-6" />
                    Legal Framework
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-lg mb-3">
                        Precedent for Alternative Sentencing
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Florida law provides judges with discretion to order
                        alternative sentences that serve the interests of
                        justice and public safety. The Bridge Project aligns
                        with established rehabilitation programs that have been
                        successfully implemented across the state.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-3">
                        Judge Ferrero's Options
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Traditional incarceration (not recommended)</li>
                        <li>
                          Probation with standard conditions (limited
                          effectiveness)
                        </li>
                        <li>
                          <strong>
                            The Bridge Project with intensive supervision
                            (recommended)
                          </strong>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
                      <h3 className="font-bold text-lg mb-3">
                        Why This Matters Now
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Judge Ferrero's decision will not only impact JAHmere's
                        life but could set a precedent for how young offenders
                        are given second chances in our community. This is an
                        opportunity to demonstrate that rehabilitation, not just
                        punishment, can create safer communities.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-t from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="content-center text-center">
          <h2 className="text-3xl font-bold mb-4">Help Make the Case</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Your voice can help Judge Ferrero see that the community supports
            rehabilitation over incarceration.
          </p>
          <div className="cta-group">
            <a
              href="/judge-ferrero-letter"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Write to Judge Ferrero
            </a>
            <a
              href="/impact"
              className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 rounded-lg font-semibold transition-colors"
            >
              View Community Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
