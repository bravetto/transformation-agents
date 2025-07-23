"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Twitter, Share2, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

function DungyOneTweetCore() {
  const [timeLeft, setTimeLeft] = useState("7 days, 14 hours");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const diff = target.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days} days, ${hours} hours, ${minutes} minutes`);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-elite-obsidian-depth relative overflow-hidden">
      {/* Design Token Background - Using CSS variables */}
      <div className="absolute inset-0 bg-gradient-to-br from-elite-justice-indigo/30 via-elite-obsidian-depth to-elite-sacred-violet/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,215,0,0.1),transparent)] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,var(--elite-sacred-violet-rgb,147,51,234),transparent)] animate-pulse opacity-10"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header with Design Tokens */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="heading-1 text-elite-platinum-truth mb-4">
            Coach Dungy: One Tweet Can Save a Life
          </h1>
          <p className="text-large text-elite-justice-indigo-light">
            Your voice reaches millions. JAHmere needs just one tweet.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-elite-crimson-urgency/50 text-elite-platinum-truth px-6 py-3 rounded-full">
            <Clock className="w-5 h-5" />
            <span className="font-bold">{timeLeft} until arraignment</span>
          </div>
        </motion.div>

        {/* The Power of Your Voice - Using Design System Cards */}
        <Card className="card bg-elite-platinum-truth/10 border-elite-justice-indigo/30 mb-12">
          <CardContent className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-6"
            >
              <h2 className="heading-2 text-elite-platinum-truth">
                Your Platform Has the Power to Transform a Life
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="bg-elite-divine-amber/20 p-4 rounded-lg">
                    <Star className="w-8 h-8 text-elite-divine-amber mx-auto" />
                  </div>
                  <h3 className="heading-4 text-elite-divine-amber">
                    14.8M Followers
                  </h3>
                  <p className="text-body text-elite-platinum-truth/80">
                    Your voice reaches more people than most news networks
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-elite-transformation-emerald/20 p-4 rounded-lg">
                    <Heart className="w-8 h-8 text-elite-transformation-emerald mx-auto" />
                  </div>
                  <h3 className="heading-4 text-elite-transformation-emerald">
                    Trusted Voice
                  </h3>
                  <p className="text-body text-elite-platinum-truth/80">
                    People listen to your wisdom on character and second chances
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-elite-sacred-violet/20 p-4 rounded-lg">
                    <Share2 className="w-8 h-8 text-elite-sacred-violet mx-auto" />
                  </div>
                  <h3 className="heading-4 text-elite-sacred-violet">
                    Viral Impact
                  </h3>
                  <p className="text-body text-elite-platinum-truth/80">
                    One tweet can reach millions and change JAHmere's future
                  </p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Pre-written Tweet Options - Design System Styling */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {[
            {
              tweet:
                "As a coach, I believe in second chances and transformation. JAHmere Webb has shown remarkable growth and has strong character witnesses supporting him. Sometimes the right path isn't incarceration—it's restoration. #SecondChances #Transformation",
              impact: "Character & Growth Focus",
              color:
                "from-elite-transformation-emerald to-elite-transformation-emerald-light",
            },
            {
              tweet:
                "I've seen young men transform their lives when given the opportunity. JAHmere Webb has a community of supporters, including my son Jordan, who believe in his potential. Let's choose restoration over punishment. #GiveHopeAChance",
              impact: "Personal Connection",
              color: "from-elite-divine-amber to-elite-divine-amber-light",
            },
            {
              tweet:
                "Real change happens when we invest in people, not just punish them. JAHmere Webb represents the power of community support and personal transformation. July 28th could be the start of something beautiful. #TransformationTuesday",
              impact: "Community Support",
              color: "from-elite-justice-indigo to-elite-justice-indigo-light",
            },
          ].map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card
                className={`card bg-gradient-to-r ${option.color} border-elite-platinum-truth/20`}
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-elite-platinum-truth">
                      <Twitter className="w-5 h-5" />
                      <span className="text-small font-medium">
                        {option.impact}
                      </span>
                    </div>

                    <p className="text-elite-platinum-truth text-base leading-relaxed">
                      "{option.tweet}"
                    </p>

                    <div className="flex gap-3">
                      <Button
                        className="btn-primary bg-elite-platinum-truth text-elite-obsidian-depth hover:bg-elite-platinum-truth-dark"
                        onClick={() => {
                          const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(option.tweet)}`;
                          window.open(tweetUrl, "_blank");
                        }}
                      >
                        <Twitter className="w-4 h-4 mr-2" />
                        Tweet This
                      </Button>

                      <Button
                        variant="outline"
                        className="text-elite-platinum-truth border-elite-platinum-truth/50 hover:bg-elite-platinum-truth/10"
                        onClick={() => {
                          navigator.clipboard.writeText(option.tweet);
                        }}
                      >
                        Copy Text
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action - Using Design System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="card bg-elite-crimson-urgency/20 border-elite-crimson-urgency/50 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="heading-3 text-elite-platinum-truth mb-4">
                Together, We Can Change a Life
              </h3>
              <p className="text-body text-elite-platinum-truth/80 mb-6">
                Your voice + Jordan's testimony + community support = JAHmere's
                freedom
              </p>
              <Button
                size="lg"
                className="btn-lg bg-elite-divine-amber text-elite-obsidian-depth hover:bg-elite-divine-amber-dark transform hover:scale-105 transition-all duration-200"
                onClick={() =>
                  window.open("https://twitter.com/TonyDungy", "_blank")
                }
              >
                <Twitter className="w-5 h-5 mr-2" />
                Connect with Coach Dungy
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default withDivineErrorBoundary(DungyOneTweetCore, {
  componentName: "DungyOneTweetCore",
  role: "messenger",
});
