"use client";

import { motion } from "framer-motion";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { Quote, Heart, Star, ExternalLink } from "lucide-react";

import { Card } from "@/components/ui/card";

// Full Jordan testimony that was removed from homepage
function JordanFullTestimony() {
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
              <div className="mb-6">
                <p className="mb-1">Jordan Dungy</p>
                <p className="mb-1">18101 Peregrines Perch Pl</p>
                <p className="mb-1">Lutz, FL 33558</p>
                <p className="mb-1">(813) 297-4828</p>
                <p className="mb-4">jordandungy@aol.com</p>
              </div>

              <p className="mb-4">Dear Judge Ferrero:</p>

              <p className="mb-4">
                My name is Jordan Dungy and I am writing to support JAHmere
                Webb's request for alternative sentencing. I have known Jahmere
                for 3 and half years in my capacity as his Brother/Best Friend.
                I am a community advocate.
              </p>

              <h3 className="text-xl font-semibold mb-2">How I Know JAHmere</h3>
              <p className="mb-4">
                When I first met Jahmere, I came up to Wesley Chapel Honda and
                traded my truck in for a Honda Civic without my dad's permission
                and had to return it the next day. I ran into Jahmere the same
                day I brought back the car to get my truck back. When my dad was
                there, I told him there is a person that wants to meet you so we
                drove to the back of the dealership lot and stopped by the
                detailing area. I said Jahmere's name, he turned around and
                leaned back and he saw my dad in the driver's seat and got
                excited because it was Coach Tony Dungy. My Dad signed a piece
                of paper, then a couple days later we started hanging out
                everyday. This has given me the opportunity to observe his
                character through the highs and lows throughout our friendship.
              </p>

              <h3 className="text-xl font-semibold mb-2">
                Specific Examples of JAHmere's Character
              </h3>
              <p className="font-semibold mb-2">Example 1 - Helping Others:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Helping me with my siblings' schools</li>
                <li>
                  Always being there for me at my highs and lows, coming to
                  visit me at the hospital from time to time, always making me
                  laugh when I am down or not in the mood
                </li>
                <li>
                  Helping out the homeless, giving money to people when they
                  didn't need it
                </li>
                <li>Helping out my siblings, giving them rides when needed</li>
              </ul>

              <p className="mb-2">
                What impressed me was how Jahmere makes people feel safe and
                he'll pay for people's food sometimes.
              </p>
              <p className="mb-4">
                The outcome showed me that he makes people feel valued and safe.
              </p>

              <p className="font-semibold mb-2">Example 2:</p>
              <p className="mb-4">
                Jahmere made a mistake when he went out that night. He's paying
                for his actions by sitting in a 10x10 jail cell and learning
                from it. Jahmere is showing accountability by owning up to his
                challenges and mistakes from the past and present. Rather than
                making excuses and blaming others, Jahmere is taking
                responsibility every day.
              </p>

              <h3 className="text-xl font-semibold mb-2">Community Impact:</h3>
              <p className="mb-4">
                JAHmere has contributed to our community by giving back to his
                community in Gainesville and even back home in Wesley Chapel.
                Everyone looks up to Jahmere no matter what the circumstances
                are. He's willing to give his all 110%. This is demonstrated
                through his impact on the Dungy Family and McKenna Family.
              </p>

              <h3 className="text-xl font-semibold mb-2">
                His Growth and Transformation
              </h3>
              <p className="mb-4">
                When I first met JAHmere, he didn't know the differences between
                college football and NFL football, so I had to teach him the
                differences between the two major leagues. He is teachable when
                it comes to learning new things in the world like politics,
                history, major sports leagues, art, science - anything you could
                think of - and fashion.
              </p>

              <p className="mb-4">
                Today, I've seen Jahmere grow over the years I have known him.
                He's learned to go to church on Sundays when he can and reads
                the Bible daily.
              </p>

              <h3 className="text-xl font-semibold mb-2">
                Understanding of Impact
              </h3>
              <p className="mb-4">
                Jahmere has expressed to me his understanding of how his past
                actions affected others. When we go places or are out with
                people, he keeps his past from everyone because nobody wants to
                be treated differently than others.
              </p>

              <h3 className="text-xl font-semibold mb-2">The Bridge Project</h3>
              <p className="mb-4">
                I am aware of JAHmere's Bridge Project initiative. Based on my
                observations of his work with youth, I believe this program
                would help Jahmere in ways no one else can. I have seen him
                successfully mentor youth kids day to day.
              </p>

              <h3 className="text-xl font-semibold mb-2">My Ongoing Support</h3>
              <p className="mb-2">
                If granted alternative sentencing, I commit to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Being there and supporting him throughout everything he's
                  going through
                </li>
                <li>
                  Being more frequently involved in what's happening in his life
                  and in this court case
                </li>
                <li>Being there for him no matter what happens in life</li>
              </ul>

              <p className="mb-4">
                Your Honor, I do not write this letter lightly. I understand the
                seriousness of the situation and the importance of public
                safety. However, I genuinely believe that JAHmere Webb confined
                to prison serves no one, while JAHmere Webb supervised in the
                community can prevent others from making similar mistakes.
              </p>

              <p className="mb-4">
                In my 24 years of relevant experience, I have never seen Jahmere
                work so hard in life. He is passionate about what he does, not
                just for the community but in his friends' and families' lives
                as well.
              </p>

              <p className="mb-4">
                I will be available to provide additional information or testify
                in person if needed. Thank you for considering how JAHmere might
                serve our community through redemption rather than just serving
                time.
              </p>

              <p className="mb-1">Respectfully,</p>
              <p className="mb-1">Jordan Dungy</p>
              <p className="mb-1">Brother/Best friend</p>
              <p className="mb-4">
                Can reach me via text or call (813) 297-4828
              </p>

              <p className="mb-1">Sincerely yours,</p>
              <p>Jordan Dungy</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default withErrorBoundary(JordanFullTestimony, {
  componentName: "JordanFullTestimony",
  id: "jordanfulltestimony",
});
