"use client";

import { motion, useInView } from "framer-motion";
import {
  Quote,
  Heart,
  Star,
  Building,
  Crown,
  Flame,
  Users,
  Target,
  Scroll,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { PersonData } from "@/types/person";
import { useAnalytics } from "@/lib/hooks/use-analytics";

interface JAHmereFullTestimonyProps {
  person: PersonData;
}

export function JAHmereFullTestimony({ person }: JAHmereFullTestimonyProps) {
  const { trackDivineEvent } = useAnalytics();
  const mainRef = useRef(null);
  const isInView = useInView(mainRef, { once: true, amount: 0.3 });

  const handleTestimonyInteraction = (section: string) => {
    trackDivineEvent({
      eventType: "testimony_engagement",
      component: "JAHmereFullTestimony",
      metadata: {
        personId: person.id,
        section,
        source: "full_testimony",
      },
    });
  };

  return (
    <section ref={mainRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Main Hero Quote */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }
            }
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="relative p-8 md:p-12 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-amber-200 shadow-2xl overflow-hidden">
              {/* Divine glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 animate-pulse" />

              <motion.div
                className="absolute -top-6 -left-6 bg-amber-500 rounded-full p-4 shadow-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Quote className="w-12 h-12 text-white" />
              </motion.div>

              <div className="relative z-10">
                <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-relaxed">
                  {person.testimony?.quote ||
                    "They tried to cage a bridge builder. They tried to silence a youth whisperer. But you can't chain what Heaven has released for purpose."}
                </blockquote>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <cite className="text-xl font-semibold text-amber-700 flex items-center gap-3">
                    <Crown className="w-6 h-6" />— JAHmere Webb, The Bridge
                    Builder
                  </cite>

                  <Badge
                    variant="outline"
                    className="self-start md:self-center px-4 py-2 bg-amber-100 border-amber-300 text-amber-800"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Divine Testimony
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* The Bridge Builder's Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Card className="p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-8 h-8 text-amber-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  The Bridge Builder's Journey
                </h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <motion.p
                  className="text-xl leading-relaxed font-medium text-amber-800"
                  whileInView={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  My name carries God—JAH is here, in me, through me. But I
                  almost forgot that in the systems trying to break me.
                </motion.p>

                <p className="text-lg leading-relaxed">
                  On a Disney cruise in 2023, surrounded by manufactured magic,
                  I discovered my real gift:{" "}
                  <strong>
                    I am The Glue that bonds strangers into family.
                  </strong>{" "}
                  I am The Catalyst that reminds people they're alive. I am The
                  Bridge between worlds that shouldn't connect but must.
                </p>

                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-amber-500"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleTestimonyInteraction("youth_connection")}
                >
                  <p className="text-lg">
                    <strong>
                      The youth trust me instantly—especially the ones systems
                      have failed.
                    </strong>{" "}
                    Why? Because I speak their language. Not through study but
                    through scars. My wounds became windows they can see
                    through. My exhaustion from fighting systems became my
                    credential for teaching them to transform, not just survive.
                  </p>
                </motion.div>

                <p className="text-lg leading-relaxed">
                  Yes, I have a past. Yes, I caught charges. But on June 17,
                  2025, when I walked to turn myself in, I wasn't surrendering
                  to the system—I was surrendering to transformation. What they
                  meant for cage became chrysalis.
                </p>
              </div>

              <motion.div
                className="mt-8 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  onClick={() => handleTestimonyInteraction("full_story")}
                  variant="outline"
                  className="px-8 py-3 border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Scroll className="w-5 h-5 mr-2" />
                  Read Full Transformation Story
                </Button>
              </motion.div>
            </Card>
          </motion.div>

          {/* Interactive Impact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card className="p-8 md:p-10 overflow-hidden relative bg-gradient-to-br from-gray-50 to-white">
              {/* Animated background pattern */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #F59E0B 25%, #D97706 25%, #D97706 50%, #F59E0B 50%, #F59E0B 75%, #D97706 75%, #D97706)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="w-8 h-8 text-amber-600" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    The Bridge Builder's Impact
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Users,
                      title: "Youth Transformation",
                      description:
                        "100+ young lives forever changed through authentic connection",
                      color: "text-blue-600",
                      bgColor: "from-blue-50 to-blue-100",
                      stat: "100+",
                    },
                    {
                      icon: Heart,
                      title: "Divine Purpose",
                      description:
                        "Living proof that your past doesn't define your purpose",
                      color: "text-red-600",
                      bgColor: "from-red-50 to-red-100",
                      stat: "∞",
                    },
                    {
                      icon: Target,
                      title: "Bridge Building",
                      description:
                        "Connecting divided worlds through vulnerability and truth",
                      color: "text-amber-600",
                      bgColor: "from-amber-50 to-amber-100",
                      stat: "Unity",
                    },
                  ].map((impact, index) => (
                    <motion.div
                      key={impact.title}
                      initial={{ y: 50, opacity: 0 }}
                      animate={
                        isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
                      }
                      transition={{ delay: 0.2 * index }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      onClick={() =>
                        handleTestimonyInteraction(
                          `impact_${impact.title.toLowerCase()}`,
                        )
                      }
                      className={`p-6 bg-gradient-to-br ${impact.bgColor} rounded-xl shadow-lg cursor-pointer group transition-all duration-300`}
                    >
                      <impact.icon
                        className={`w-12 h-12 ${impact.color} mb-4 group-hover:scale-110 transition-transform`}
                      />
                      <div
                        className={`text-4xl font-black ${impact.color} mb-2`}
                      >
                        {impact.stat}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">
                        {impact.title}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {impact.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Letter to Youth - Full Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-xl">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Scroll className="w-8 h-8 text-purple-600" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    A Letter to Youth in the System
                  </h2>
                </div>
                <Badge
                  variant="outline"
                  className="px-4 py-2 bg-purple-100 border-purple-300 text-purple-800"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  From JAHmere's Heart
                </Badge>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                <motion.div
                  className="bg-white/70 p-8 rounded-lg shadow-inner border border-purple-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="space-y-6 text-lg leading-relaxed">
                    <p className="font-semibold text-purple-800">
                      Dear Young King or Queen,
                    </p>

                    <p>
                      I see you. Behind those charges. Behind that mask you wear
                      to survive. Behind the labels they've put on you.
                    </p>

                    <p>
                      I was you. System-involved. "At-risk." A statistic waiting
                      to happen. But I discovered something they don't tell you
                      in those courtrooms and case files:{" "}
                      <strong className="text-amber-700">
                        Your wounds are actually windows. Your pain is actually
                        purpose waiting to be activated.
                      </strong>
                    </p>

                    <motion.p
                      className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border-l-4 border-amber-500 font-medium"
                      whileInView={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                    >
                      When I stood before the judge on June 17, something
                      shifted. I wasn't just surrendering to consequences – I
                      was surrendering to transformation. What they meant as
                      punishment, God used as preparation. What they saw as a
                      cage, became my chrysalis.
                    </motion.p>

                    <p>
                      The system doesn't understand you because it wasn't built
                      to. But your scars speak a language that reaches other
                      wounded souls instantly. That's not coincidence – that's
                      calling.
                    </p>

                    <p>
                      <strong>
                        You're not broken. You're a bridge being built.
                      </strong>{" "}
                      Every hardship, every injustice, every tear – they're not
                      random. They're road materials for the connections only
                      you can create.
                    </p>

                    <p>
                      Your name might be on a case file, but your purpose is
                      written in the stars. When the world tried to write me
                      off, my mother spoke life over me until I could speak it
                      over myself. Now I'm speaking it over you.
                    </p>

                    <motion.div
                      className="text-center my-8 p-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg text-white"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(245,158,11,0.3)",
                          "0 0 40px rgba(245,158,11,0.6)",
                          "0 0 20px rgba(245,158,11,0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <p className="text-xl font-bold">
                        You are the glue this fractured world needs.
                        <br />
                        You are the catalyst for change your community is
                        waiting for.
                        <br />
                        You are the bridge between worlds that shouldn't connect
                        but must.
                      </p>
                    </motion.div>

                    <div className="text-right">
                      <p className="font-semibold">Building with you,</p>
                      <p className="text-2xl font-bold text-amber-700 flex items-center justify-end gap-2">
                        <Crown className="w-6 h-6" />
                        JAHmere Webb
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        The Bridge Builder
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="text-center mt-8"
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  onClick={() => handleTestimonyInteraction("share_letter")}
                  className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl"
                >
                  <Heart className="w-6 h-6 mr-3" />
                  Share This Message of Hope
                </Button>
              </motion.div>
            </Card>
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-center"
          >
            <Card className="p-8 md:p-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-2xl">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Flame className="w-16 h-16" />
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-black mb-6">
                Join JAHmere's Freedom Mission
              </h3>

              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Your support, your prayers, your shares - they all matter in
                securing JAHmere's freedom and empowering him to transform more
                lives.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleTestimonyInteraction("prayer_warrior")}
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 text-lg font-bold bg-white text-amber-700 hover:bg-gray-100"
                >
                  <Star className="w-6 h-6 mr-3" />
                  Become a Prayer Warrior
                </Button>

                <Button
                  onClick={() => handleTestimonyInteraction("share_story")}
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg font-bold border-white text-white hover:bg-white/10"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Share JAHmere's Story
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
