"use client";

import { motion } from "framer-motion";
import { Quote, Heart, Star, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

// Full Jordan testimony that was removed from homepage
export function JordanFullTestimony() {
  return (
    <section className="section-spacing">
      <div className="content-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Hero Quote */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200">
            <Quote className="w-12 h-12 text-blue-600 mb-4" />
            <blockquote className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-4">
              "My dad taught me that real strength is lifting others up. JAHmere
              represents every young person who deserves a second chance to
              become who they're meant to be."
            </blockquote>
            <cite className="text-lg text-gray-600 dark:text-gray-400">
              — Jordan Dungy, Son of NFL Hall of Famer Tony Dungy
            </cite>
          </Card>

          {/* Personal Connection */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              My Connection to JAHmere
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                When I first heard about JAHmere's story, I saw myself. Not
                because I've been in his exact situation, but because I
                understand what it's like to be a young man trying to find his
                way in a world that often seems stacked against you.
              </p>
              <p className="mb-4">
                Growing up as Tony Dungy's son came with privileges, but it also
                came with pressures and expectations. What saved me during my
                toughest moments wasn't my last name—it was having mentors who
                believed in me even when I didn't believe in myself.
              </p>
              <p className="mb-4">
                JAHmere deserves that same chance. He deserves mentors who see
                his potential, not just his past. He deserves a community that
                invests in his future, not one that writes him off.
              </p>
            </div>
          </Card>

          {/* The Animation Section (previously on homepage) */}
          <Card className="p-8 overflow-hidden relative">
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
                  "linear-gradient(45deg, #3B82F6 25%, #8B5CF6 25%, #8B5CF6 50%, #3B82F6 50%, #3B82F6 75%, #8B5CF6 75%, #8B5CF6)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                Why This Matters to Me
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                  <Star className="w-8 h-8 text-yellow-500 mb-3" />
                  <h3 className="font-bold mb-2">Legacy of Second Chances</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    My family's legacy is built on giving people opportunities
                    to grow.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                  <Heart className="w-8 h-8 text-red-500 mb-3" />
                  <h3 className="font-bold mb-2">Personal Investment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I'm committed to being part of JAHmere's support system.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                >
                  <ExternalLink className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-bold mb-2">Broader Impact</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    JAHmere's success can inspire countless others.
                  </p>
                </motion.div>
              </div>
            </div>
          </Card>

          {/* Video Testimony Placeholder */}
          <Card className="p-8 text-center bg-gray-50 dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">Video Testimony</h2>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <p className="text-gray-500">Video testimony coming soon</p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Watch Jordan share his personal connection to JAHmere's story and
              why he believes in The Bridge Project.
            </p>
          </Card>

          {/* Extended Letter Content */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              My Full Letter to Judge Ferrero
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="mb-4">Dear Judge Ferrero,</p>

              <p className="mb-4">
                I write to you not just as Tony Dungy's son, but as a young man
                who understands the power of mentorship and second chances. My
                father has spent his life believing in people others had given
                up on, and I've seen firsthand how that belief can transform
                lives.
              </p>

              <p className="mb-4">
                JAHmere Webb is at a crossroads that will define not just his
                future, but the future of his family and community. The easy
                choice would be incarceration—it's what our system defaults to.
                But you have the power to make the brave choice, the right
                choice.
              </p>

              <p className="mb-4">
                The Bridge Project isn't just an alternative to prison—it's an
                investment in human potential. It's a recognition that young
                people who make mistakes aren't disposable. They're redeemable.
              </p>

              <p className="mb-4">
                I've met JAHmere. I've looked him in the eye and seen not a
                criminal, but a young man desperate for the chance to prove he's
                more than his worst moment. He has the support of my family, our
                community, and countless others who believe in redemption over
                retribution.
              </p>

              <p className="mb-4">
                Judge Ferrero, you have the opportunity to be part of JAHmere's
                transformation story. Years from now, when he's mentoring other
                young people and contributing to society, this moment—your
                decision—will be remembered as the turning point.
              </p>

              <p className="mb-4">
                Please choose hope over fear. Choose rehabilitation over
                incarceration. Choose to believe in JAHmere's potential the way
                my father has taught me to believe in others.
              </p>

              <p className="mb-4">With deep respect and hope,</p>
              <p className="font-bold">Jordan Dungy</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
