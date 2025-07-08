"use client";

import {
  SimplifiedHero,
  SimplifiedStats,
  WhatHappensNext,
} from "@/components/simplified-hero";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote } from "@/components/ui/typography";
import Image from "next/image";

export default function SimplifiedHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clear Focus */}
      <SimplifiedHero />

      {/* Simple Stats - Build Trust */}
      <SimplifiedStats />

      {/* Tony Dungy Quote - Authority */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 md:p-12 bg-white border-amber-200">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src="/images/people/display/coach-dungy.webp"
                      alt="Tony Dungy"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Quote size="lg" className="mb-4 text-gray-700">
                    "I've mentored JAHmere for three years. I've seen his
                    transformation. He protected my son Jordan when others
                    wouldn't. Now I'm asking Judge Ferrero to give him the
                    chance to transform other young lives."
                  </Quote>
                  <div>
                    <p className="font-semibold text-lg">Tony Dungy</p>
                    <p className="text-gray-600">NFL Hall of Famer & Mentor</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What Happens Next - Set Expectations */}
      <WhatHappensNext />

      {/* Final CTA - Repeat for Action */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Every Voice Matters. Every Minute Counts.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Judge Ferrero needs to see unprecedented community support. Your
              letter could be the one that tips the scales toward
              transformation.
            </p>
            <div className="pt-4">
              <a href="/july-9-strategy" className="inline-block">
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Add Your Voice Now →
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
