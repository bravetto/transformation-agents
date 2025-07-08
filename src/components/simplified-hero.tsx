"use client";
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function SimplifiedHero() {
  const [timeUntilCourt, setTimeUntilCourt] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const courtDate = new Date("2025-07-09T09:00:00-04:00");
      const now = new Date();
      const diff = courtDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeUntilCourt("Court in session");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeUntilCourt(`${days} days, ${hours} hours`);
        } else {
          setTimeUntilCourt(`${hours} hours, ${minutes} minutes`);
        }
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-white py-12 md:py-20">
      {/* Urgent Timer Bar */}
      <div className="absolute top-0 left-0 right-0 bg-red-600 text-white py-2 z-10">
        <div className="max-w-7xl mx-auto px-4 text-center font-bold flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          {timeUntilCourt} until JAHmere's arraignment
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Headline - Clear and Powerful */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="text-gray-900">
              Tony Dungy Believes in JAHmere.
            </span>
            <br />
            <span className="text-amber-600">Will Judge Ferrero?</span>
          </motion.h1>

          {/* Simple Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600"
          >
            Join 1,247 supporters advocating for transformation over
            incarceration
          </motion.p>

          {/* Key Trust Points - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 text-sm"
          >
            <Badge variant="outline" className="px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              NFL Hall of Famer Endorsed
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              Community Release Plan Ready
            </Badge>
          </motion.div>

          {/* Single Clear CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link href="/july-9-strategy">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Support JAHmere's Release Plan →
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-3">
              Takes 2 minutes • Join 1,247 others
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Simplified Stats Section
export function SimplifiedStats() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-amber-600">
              1,247
            </div>
            <div className="text-sm text-gray-600">Support Letters</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-amber-600">
              $0
            </div>
            <div className="text-sm text-gray-600">Cost to Taxpayers</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-amber-600">
              24/7
            </div>
            <div className="text-sm text-gray-600">Accountability</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// What Happens Next - Clear Expectations
export function WhatHappensNext() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-8"
          >
            What Happens July 9th?
          </motion.h2>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Tony Dungy Speaks in Court
                </h3>
                <p className="text-gray-600">
                  NFL Hall of Famer advocates for JAHmere's potential
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Community Release Plan Presented
                </h3>
                <p className="text-gray-600">
                  24/7 accountability with elite mentorship team
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Judge Considers Innovation
                </h3>
                <p className="text-gray-600">
                  Opportunity to pioneer transformation over incarceration
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/community-release-plan">
              <Button variant="outline" size="lg" className="border-2">
                Learn About the Full Plan →
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
