"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Heart, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // July 9th, 2025 at 9:00 AM EST (Florida time)
    const courtDate = new Date("2025-07-09T09:00:00-04:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diff = courtDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Precise Countdown Timer - Elegant & Professional */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-2">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-3 text-xs md:text-sm">
            <Clock className="w-4 h-4 opacity-80" />
            <div className="flex items-center gap-1 font-serif">
              <span className="font-light tracking-wider">
                {timeRemaining.days} days
              </span>
              <span className="opacity-60">•</span>
              <span className="font-light tracking-wider">
                {String(timeRemaining.hours).padStart(2, "0")}:
                {String(timeRemaining.minutes).padStart(2, "0")}:
                {String(timeRemaining.seconds).padStart(2, "0")}
              </span>
              <span className="opacity-60 ml-2 hidden md:inline">
                until arraignment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Speaking to Tony */}
      <section className="relative bg-white dark:bg-gray-900 py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            >
              <span className="text-gray-900 dark:text-gray-100">
                Coach, This Is Your
              </span>
              <br />
              <span className="text-amber-600">Legacy Moment</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              You've transformed champions on the field.
              <br />
              Now transform justice in the courtroom.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              JAHmere protected Jordan. Now he needs you.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <Link href="/the-case">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-7 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Lead This Movement, Coach
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Your Voice Can Do */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              What Your Voice Means, Coach
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div className="text-5xl font-bold text-amber-600">1</div>
                <h3 className="text-xl font-semibold">Tweet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Reaches 700,000 followers instantly
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="text-5xl font-bold text-amber-600">1,000+</div>
                <h3 className="text-xl font-semibold">Supporters</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Will follow your lead immediately
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="text-5xl font-bold text-amber-600">∞</div>
                <h3 className="text-xl font-semibold">Lives Changed</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Through the precedent you set
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens July 9th - Professional and Moving */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Your Championship Moment: July 9th
            </h2>

            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    You Enter That Courtroom
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Super Bowl champion. Foster father to 100+. The man who gave
                    Michael Vick a second chance. Your presence alone changes
                    everything.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    You Speak From Your Heart
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    "Your Honor, I've seen what second chances can do. JAHmere
                    protected my son Jordan. He has the rarest gift—he's a
                    peacemaker. Don't cage this gift. Unleash it."
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    You Change Criminal Justice Forever
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    This becomes the "Dungy Model"—where champions in society
                    stand for transformation over incarceration. Your legacy
                    expands beyond football.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="text-center mt-16">
              <Link href="/july-9-strategy">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50"
                >
                  See the Full Vision →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Appeal */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 md:p-12"
            >
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />

              <h3 className="text-3xl font-bold mb-6">
                Coach, Remember Jordan's Pain
              </h3>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                You taught us that Jordan's inability to feel pain was God's way
                of teaching about protection and purpose. JAHmere protected
                Jordan when others wouldn't. Now JAHmere needs your protection.
                This is divine orchestration.
              </p>

              <p className="text-xl font-semibold text-amber-600 mb-8">
                "Sometimes, pain is the only way that will turn us, as kids,
                back to the Father."
                <br />
                <span className="text-base text-gray-600">
                  — Your words, Coach
                </span>
              </p>

              <Link href="/people/jordan-dungy">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-bold"
                >
                  This Is Your Moment to Turn Pain Into Purpose
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <Shield className="w-20 h-20 mx-auto text-amber-400" />

            <h2 className="text-4xl md:text-5xl font-bold">
              Champions Recognize Championship Potential
            </h2>

            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              You've spent your life turning undisciplined players into
              champions. JAHmere is your next championship story—not on the
              field, but in life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/the-case">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-bold"
                >
                  Lead This Movement Now
                </Button>
              </Link>
              <Link href="/twitter-campaign">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold"
                >
                  Share Your Support
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-400 pt-4 font-serif">
              Every second counts.{" "}
              <span className="text-amber-400 font-light italic">
                {timeRemaining.days} days,{" "}
                {String(timeRemaining.hours).padStart(2, "0")}:
                {String(timeRemaining.minutes).padStart(2, "0")}:
                {String(timeRemaining.seconds).padStart(2, "0")}
              </span>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
