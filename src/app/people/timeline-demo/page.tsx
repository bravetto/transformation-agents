"use client";

import { getAllPeople } from "@/data/people";
import EnhancedPersonTimeline from "@/components/people/enhanced-person-timeline";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, ArrowLeft, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";

/**
 * 🌟 INTERACTIVE TIMELINE DEMO PAGE
 * Showcase the new timeline feature with sample data
 */
export default function TimelineDemoPage() {
  const people = getAllPeople();

  // Select people with rich data for demonstration
  const demoPersons = people
    .filter(
      (person) =>
        person.background?.education ||
        person.background?.experience ||
        person.achievements,
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/people">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to People
                </Button>
              </Link>

              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Clock className="w-8 h-8 text-amber-600" />
                  Interactive Timeline Demo
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Experience the new timeline storytelling feature
                </p>
              </div>
            </div>

            <Badge variant="success" size="lg">
              <Sparkles className="w-4 h-4 mr-1" />
              NEW FEATURE
            </Badge>
          </div>
        </div>
      </div>

      {/* Demo Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bringing Stories to Life Through Interactive Timelines
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Each person's journey is unique and powerful. Our new Interactive
            Timeline transforms biographical data into engaging, scrollable
            stories with role-based theming, analytics tracking, and
            accessibility features.
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Scroll-Triggered Animations
            </h3>
            <p className="text-gray-600 text-sm">
              Smooth animations reveal timeline events as users scroll, creating
              an immersive experience
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Role-Based Theming
            </h3>
            <p className="text-gray-600 text-sm">
              Visual design adapts to each person's role: lightworker,
              messenger, witness, or guardian
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Interactive Features
            </h3>
            <p className="text-gray-600 text-sm">
              Filter by event type, search content, navigate with keyboard, and
              track engagement analytics
            </p>
          </Card>
        </motion.div>

        {/* Demo Timelines */}
        <div className="space-y-16">
          {demoPersons.map((person, index) => (
            <motion.section
              key={person.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Person Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{person.name}</h3>
                    <p className="text-lg text-gray-200">{person.title}</p>
                    <Badge
                      variant={person.role || "lightworker"}
                      className="mt-2"
                    >
                      {(person.role || "lightworker").charAt(0).toUpperCase() +
                        (person.role || "lightworker").slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-8">
                <EnhancedPersonTimeline
                  person={person}
                  variant="detailed"
                  showFilters={true}
                  showStats={true}
                />
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Explore More Stories?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Visit our complete People directory to discover more inspiring
            journeys, now enhanced with interactive timeline storytelling.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/people">
              <Button size="lg" variant="primary">
                <Users className="w-5 h-5 mr-2" />
                View All People
              </Button>
            </Link>
            <Link href="/people/jahmere-webb">
              <Button size="lg" variant="outline">
                <Sparkles className="w-5 h-5 mr-2" />
                See JAHmere's Timeline
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
