"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Heart,
  Target,
  Users,
  Award,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Shield,
  Star,
  Quote,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function JayForteTestimony() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Hero Quote */}
          <Card className="p-10 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200">
            <Quote className="w-12 h-12 text-indigo-600 mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
              "In 40 years of human development work, I've learned one truth:
              Every person has greatness within them. JAHmere Webb's assessment
              reveals extraordinary gifts that society cannot afford to cage."
            </blockquote>
            <cite className="text-lg text-gray-600 dark:text-gray-400">
              — Jay Forte, Chief People Officer, Bravëtto | Creator of The
              Greatness Zone
            </cite>
          </Card>

          {/* Letter to Judge Ferrero */}
          <Card className="p-10 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">
                To The Honorable Judge Denise Ferrero
              </h2>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p>
                Your Honor, I write to you not as a character witness, but as a
                scientist of human potential who has assessed thousands of
                individuals across four decades.
              </p>

              <p>
                JAHmere Webb's Greatness Zone assessment reveals what I call a
                <strong className="text-indigo-600">
                  {" "}
                  "Transformational Talent Stack"
                </strong>
                :
              </p>

              {/* Assessment Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Peacemaker</h4>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      18/20
                    </Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Exceptional ability to bring opposing sides together and
                    find common ground. This is the rarest and most needed
                    talent in our divided world.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Caregiver</h4>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      16/20
                    </Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Deep, genuine compassion for others' wellbeing. This talent
                    cannot be taught - it's either authentic or it isn't.
                    JAHmere's is authentic.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Relator</h4>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      16/20
                    </Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Forms deep, lasting connections. In a world of surface
                    relationships, this talent creates the bonds that prevent
                    recidivism.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Includer</h4>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      16/20
                    </Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Makes others feel they belong. This talent transforms
                    outcasts into community members - exactly what our justice
                    system should do.
                  </p>
                </motion.div>
              </div>

              <div className="p-6 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border-l-4 border-indigo-600">
                <p className="font-semibold text-lg mb-3">
                  The Science Behind the Assessment:
                </p>
                <p>
                  These aren't personality traits or learned behaviors. They're
                  hardwired talents - the way JAHmere's brain naturally
                  processes the world. You cannot fake an 18/20 Peacemaker
                  score. You either see the world through the lens of harmony,
                  or you don't.
                </p>
              </div>

              <p>
                <strong>
                  Your Honor, here's what this means for public safety:
                </strong>
                JAHmere's talent stack makes him neurologically wired to prevent
                conflict, not create it. His brain literally seeks harmony over
                discord, inclusion over division, care over harm.
              </p>

              <p>
                In my role as Chief People Officer at Bravëtto, I've committed
                to providing JAHmere with intensive Greatness Zone coaching. But
                more importantly, I'm offering to help you build something
                revolutionary: a talent-based approach to transformational
                justice.
              </p>

              <p className="font-semibold text-xl text-indigo-600">
                Judge Ferrero, you have before you not a criminal to punish, but
                a peacemaker to unleash. The question isn't whether JAHmere
                deserves a second chance - it's whether society can afford to
                waste these gifts.
              </p>
            </div>
          </Card>

          {/* Letter to Tony Dungy */}
          <Card className="p-10 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-600 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">To Coach Tony Dungy</h2>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <p>
                Coach Dungy, I've studied champions my entire career. I know
                what separates good from great - it's not talent alone, but
                talent aimed at purpose.
              </p>

              <p>
                You've shown us that{" "}
                <strong className="text-green-600">
                  quiet strength changes more than loud force
                </strong>
                . JAHmere Webb embodies this principle. His assessment reveals
                someone who influences through connection, not coercion.
              </p>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl my-8">
                <h4 className="font-bold text-xl mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-green-600" />
                  What JAHmere's Talents Mean for Your Legacy
                </h4>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Peacemaker + Your Platform = </strong>
                      <span className="text-gray-700 dark:text-gray-300">
                        Reaching youth in conflict before they become statistics
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Caregiver + Your Wisdom = </strong>
                      <span className="text-gray-700 dark:text-gray-300">
                        Healing communities through authentic compassion
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Relator + Your Network = </strong>
                      <span className="text-gray-700 dark:text-gray-300">
                        Building bridges between the streets and success
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Includer + Your Influence = </strong>
                      <span className="text-gray-700 dark:text-gray-300">
                        Creating belonging for those who've never had it
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Coach, you know that{" "}
                <strong>Jordan's relationship with JAHmere</strong> tells us
                everything. Someone who protects and befriends a person who
                cannot feel pain demonstrates extraordinary character. This
                isn't learned behavior - it's who JAHmere is at his core.
              </p>

              <div className="p-6 bg-green-100 dark:bg-green-950/30 rounded-xl">
                <p className="font-semibold text-lg mb-3">
                  The Championship Opportunity:
                </p>
                <p>
                  Just as you transformed "undisciplined" players into champions
                  by seeing their potential, you can transform JAHmere from
                  defendant to difference-maker. His talents + your mentorship =
                  exponential impact on at-risk youth.
                </p>
              </div>

              <p className="text-xl font-semibold text-green-600">
                Coach Dungy, champions recognize championship potential. JAHmere
                doesn't need punishment - he needs the same thing you gave your
                players: belief, structure, and opportunity to use his gifts for
                greatness.
              </p>
            </div>
          </Card>

          {/* The Vision */}
          <Card className="p-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="text-center space-y-6">
              <Lightbulb className="w-16 h-16 mx-auto" />

              <h3 className="text-3xl font-bold">The Greatness Zone Promise</h3>

              <div className="max-w-3xl mx-auto space-y-4 text-lg">
                <p>
                  I pledge to provide JAHmere with intensive Greatness Zone
                  coaching to maximize these extraordinary talents. Together
                  with Michael Mataluni's mentorship and Tony Dungy's wisdom, we
                  will transform JAHmere into a force for healing in our
                  community.
                </p>

                <p className="font-semibold text-xl">
                  But more than that - we're offering to build a new model where
                  talent assessment guides justice, where greatness is
                  cultivated rather than caged, where Judge Ferrero's courtroom
                  becomes a laboratory for transformation.
                </p>
              </div>

              <div className="pt-6">
                <Badge variant="secondary" className="text-lg px-6 py-3">
                  40 Years of Wisdom Says: Unleash This Greatness
                </Badge>
              </div>
            </div>
          </Card>

          {/* Signature */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              <Award className="w-8 h-8 text-purple-600" />
              <Heart className="w-8 h-8 text-green-600" />
            </div>

            <div>
              <p className="text-xl font-bold">Jay Forte</p>
              <p className="text-gray-600 dark:text-gray-400">
                Chief People Officer, Bravëtto | Creator, The Greatness Zone
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Author | Speaker | 40 Years Transforming Human Potential
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
