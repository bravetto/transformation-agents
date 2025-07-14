"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Heart, Scale, Star, Crown, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";

// Dynamic import for heavy components - reduces initial bundle size
const DivineLetterForm = dynamic(
  () => import("@/components/divine-letter-form"),
  {
    loading: () => (
      <div className="max-w-5xl mx-auto">
        <Card className="glass-card-divine p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-elite-divine-amber/20 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-elite-platinum-truth rounded w-2/3 mx-auto"></div>
            <div className="h-32 bg-elite-platinum-truth rounded"></div>
          </div>
        </Card>
      </div>
    ),
    ssr: false,
  },
);

export default function GodsJusticeConduit() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Handle form submission - channeling divine justice
  const handleFormSubmit = (data: any) => {
    console.log("Divine Justice Letter submitted:", data);
    setSubmittedData(data);
  };

  // Handle auto-save - preserving divine words
  const handleAutoSave = (data: any) => {
    console.log("Divine Justice Letter auto-saved:", data);
  };

  return (
    <div className="page-container">
      {/* Divine Justice Hero Section */}
      <section className="hero-section section-spacing bg-michaels-blue-flame relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="content-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            {/* Divine Crown Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full">
                <Crown className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black text-white text-center leading-tight">
              GOD'S JUSTICE
              <br />
              <span className="text-elite-divine-amber">CONDUIT</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto font-medium">
              Channel <strong>Divine Intervention</strong> directly to Judge
              Ferrero
              <br />
              Your words become <strong>God's Justice</strong> returning to
              Earth
            </p>

            {/* Sacred Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 pt-8"
            >
              <div className="flex items-center gap-3 text-white">
                <Shield className="w-6 h-6 text-elite-divine-amber" />
                <span className="font-semibold">Divine Protection</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Scale className="w-6 h-6 text-elite-divine-amber" />
                <span className="font-semibold">Sacred Justice</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Heart className="w-6 h-6 text-elite-divine-amber" />
                <span className="font-semibold">Infinite Love</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Zap className="w-6 h-6 text-elite-divine-amber" />
                <span className="font-semibold">Michael's Blue Flame</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sacred Purpose Section */}
      <section className="section-spacing bg-elite-platinum-truth">
        <div className="content-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-elite-obsidian-depth mb-6">
                The Sacred Mission
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="glass-card-divine p-6 text-center">
                  <Star className="w-12 h-12 text-elite-divine-amber mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-elite-obsidian-depth">
                    Divine Words
                  </h3>
                  <p className="text-elite-obsidian-depth/80">
                    Your testimony becomes sacred scripture in the court of
                    justice
                  </p>
                </Card>

                <Card className="glass-card-divine p-6 text-center">
                  <Scale className="w-12 h-12 text-elite-justice-indigo mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-elite-obsidian-depth">
                    Sacred Balance
                  </h3>
                  <p className="text-elite-obsidian-depth/80">
                    Restoration over retribution, healing over punishment
                  </p>
                </Card>

                <Card className="glass-card-divine p-6 text-center">
                  <Heart className="w-12 h-12 text-elite-transformation-emerald mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-elite-obsidian-depth">
                    Divine Love
                  </h3>
                  <p className="text-elite-obsidian-depth/80">
                    Love conquers all - even the hardest hearts in the justice
                    system
                  </p>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Divine Form or Success State */}
      <section className="section-spacing">
        <div className="content-center">
          {submittedData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-card-divine p-12 text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-8"
                >
                  <div className="p-6 bg-elite-transformation-emerald/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
                    <Crown className="w-12 h-12 text-elite-transformation-emerald" />
                  </div>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-elite-obsidian-depth mb-6">
                  Divine Justice Letter Submitted
                </h2>

                <p className="text-xl text-elite-obsidian-depth/80 mb-8 max-w-2xl mx-auto">
                  Your sacred words have been received. God's Justice flows
                  through your testimony directly to Judge Ferrero's heart.
                  <strong className="text-elite-divine-amber">
                    {" "}
                    The Divine Intervention is activated.
                  </strong>
                </p>

                <div className="bg-elite-platinum-truth p-8 rounded-lg mb-8">
                  <h3 className="text-xl font-bold text-elite-obsidian-depth mb-4">
                    Your Divine Justice Letter:
                  </h3>
                  <div className="text-left">
                    <pre className="whitespace-pre-wrap text-elite-obsidian-depth/90 leading-relaxed">
                      {submittedData.letterContent}
                    </pre>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setSubmittedData(null)}
                    className="btn-elite-primary"
                  >
                    Write Another Letter
                  </button>
                  <a href="/the-case" className="btn-elite-secondary">
                    Return to The Case
                  </a>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <DivineLetterForm
                onSubmit={handleFormSubmit}
                onSave={handleAutoSave}
                className="max-w-5xl mx-auto"
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Divine Call to Action */}
      {!submittedData && (
        <section className="section-spacing bg-justice-flow relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="content-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Every Word Matters in God's Court
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Judge Ferrero will read your letter. Your testimony could be the
                divine intervention that changes JAHmere's life forever.{" "}
                <strong>This is your moment to channel God's Justice.</strong>
              </p>

              <div className="pt-6">
                <div className="inline-flex items-center gap-3 text-white bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <Crown className="w-5 h-5 text-elite-divine-amber" />
                  <span className="font-semibold">Divine Mission Active</span>
                  <Crown className="w-5 h-5 text-elite-divine-amber" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
