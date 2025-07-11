"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Heart, Shield, ChevronRight, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";

// Divine Particles for Elite V10 experience
const DivineParticles = dynamic(() => import("@/components/divine-particles"), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Divine particle intensity based on countdown urgency
  const getChampionshipIntensity = () => {
    const totalSeconds =
      timeRemaining.days * 86400 +
      timeRemaining.hours * 3600 +
      timeRemaining.minutes * 60 +
      timeRemaining.seconds;
    const totalCountdownSeconds = 16 * 86400; // Approximately 16 days total

    if (totalSeconds > totalCountdownSeconds * 0.8) return "minimal"; // Far from arraignment
    if (totalSeconds > totalCountdownSeconds * 0.5) return "medium"; // Getting closer
    if (totalSeconds > totalCountdownSeconds * 0.2) return "high"; // Very close
    return "maximum"; // Final days/hours
  };

  // Divine pulse frequency for championship heartbeat
  const getChampionshipPulse = () => {
    const totalSeconds =
      timeRemaining.days * 86400 +
      timeRemaining.hours * 3600 +
      timeRemaining.minutes * 60 +
      timeRemaining.seconds;
    return Math.max(
      0.5,
      Math.min(2.0, (86400 - (totalSeconds % 86400)) / 43200),
    ); // Pulse faster as day progresses
  };

  useEffect(() => {
    // July 28th, 2025 at 9:00 AM EST (Florida time)
    const courtDate = new Date("2025-07-28T09:00:00-04:00");

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
      {/* Divine Particles Background - Elite V10 with Championship Synchronization */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <DivineParticles
          variant="championship"
          intensity={getChampionshipIntensity()}
          role="legacy-builder"
          pulseFrequency={getChampionshipPulse()}
          syncWithHeartbeat={true}
        />
      </div>

      {/* Elite V10 Urgency Banner - Psychological Warfare Palette */}
      <div className="relative z-10 bg-gradient-to-r from-elite-crimson-urgency to-elite-divine-amber text-white py-3">
        <div className="content-center">
          <div className="flex items-center justify-center gap-3 text-sm font-medium">
            <Clock className="w-4 h-4 animate-pulse" />
            <div className="flex items-center gap-2 font-sans tracking-wide">
              <span className="font-bold">{timeRemaining.days} DAYS</span>
              <span className="opacity-80">•</span>
              <span className="font-mono animate-blue-flame-pulse">
                {String(timeRemaining.hours).padStart(2, "0")}:
                {String(timeRemaining.minutes).padStart(2, "0")}:
                {String(timeRemaining.seconds).padStart(2, "0")}
              </span>
              <span className="opacity-90 hidden md:inline font-semibold">
                UNTIL ARRAIGNMENT
              </span>
            </div>

            {/* Divine Milestone Indicator */}
            {timeRemaining.days <= 15 && (
              <div className="hidden lg:flex items-center gap-2 ml-6 px-3 py-1 bg-white/20 rounded-full">
                <Star className="w-3 h-3 animate-pulse" />
                <span className="text-xs font-semibold">
                  {timeRemaining.days <= 1
                    ? "LEGACY MOMENT ARRIVES"
                    : timeRemaining.days <= 5
                      ? "DIVINE INTERVENTION INTENSIFIES"
                      : timeRemaining.days <= 10
                        ? "FINAL RALLY CALL"
                        : "CHAMPIONSHIP PREPARATION PHASE"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Truth in Light with Elite V10 Enhancement */}
      <section className="relative bg-comfort-cream min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Elite V10 Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-elite-platinum-truth/5 via-transparent to-elite-divine-amber/5 pointer-events-none" />

        <div className="content-center relative z-10 py-20">
          <div className="hero-section">
            {/* Elite Championship Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-elite-justice-indigo/10 border border-elite-justice-indigo/20 rounded-full">
                <Trophy className="w-5 h-5 text-elite-divine-amber" />
                <span className="text-gentle-charcoal font-semibold text-sm tracking-wide">
                  CHAMPIONSHIP LEGACY MOMENT
                </span>
                <Star className="w-4 h-4 text-elite-divine-amber animate-pulse" />
              </div>
            </motion.div>

            {/* Divine Typography - Fluid Responsive as per Design Scripture */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hero-heading mb-6"
              style={{
                background:
                  "linear-gradient(135deg, var(--gentle-charcoal) 0%, var(--elite-justice-indigo) 50%, var(--elite-divine-amber) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Coach, This Is Your
              <br />
              <span className="text-elite-divine-amber">Legacy Moment</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hero-subheading mb-8 text-soft-shadow"
            >
              You've transformed champions on the field.
              <br />
              <strong className="text-gentle-charcoal">
                Now transform justice in the courtroom.
              </strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-soft-shadow mb-6 font-medium"
            >
              JAHmere protected Jordan.{" "}
              <span className="text-elite-divine-amber font-bold">
                Now he needs you.
              </span>
            </motion.div>

            {/* Jordan's Divine Testimonial */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="sacred-quote mb-10 p-6 bg-elite-justice-indigo/5 border-l-4 border-elite-divine-amber rounded-r-lg"
            >
              <p className="text-lg italic text-elite-justice-indigo mb-3 leading-relaxed">
                "JAHmere stepped in when others stepped back. He protected me
                when I needed it most. That's the kind of person he is - he sees
                someone in trouble and he helps."
              </p>
              <cite className="text-elite-divine-amber font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4" />— Jordan Dungy, Coach Dungy's Son
              </cite>
            </motion.blockquote>

            {/* Elite V10 CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="cta-group"
            >
              <Link href="/the-case">
                <Button
                  size="xl"
                  className="elite-button-primary min-w-[320px] h-16 text-lg font-bold tracking-wide relative overflow-hidden group animate-championship-heartbeat"
                  style={{
                    background: "var(--sunrise-hope)",
                    boxShadow: "var(--elite-divine-amber-shadow)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Trophy className="w-6 h-6" />
                    Lead This Movement, Coach
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  {/* Elite V10 Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators - Design Scripture Compliant */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-soft-shadow"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-growth-green" />
                <span>700K+ Followers</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-elite-divine-amber" />
                <span>1,247+ Letters</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-elite-justice-indigo" />
                <span>NFL Champion Endorsed</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elite V10 Impact Section - Psychological Warfare Design */}
      <section className="section-spacing bg-pure-white relative overflow-hidden">
        {/* Elite Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-elite-justice-indigo/5 to-elite-divine-amber/5" />

        <div className="content-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gentle-charcoal">
              What Your Voice Means,{" "}
              <span className="text-elite-divine-amber">Coach</span>
            </h2>
            <p className="text-xl text-soft-shadow max-w-3xl mx-auto">
              Your championship authority creates instant transformation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: "1",
                label: "Tweet",
                description: "Reaches 700,000 followers instantly",
                delay: 0.1,
              },
              {
                number: "1,000+",
                label: "Supporters",
                description: "Will follow your lead immediately",
                delay: 0.2,
              },
              {
                number: "∞",
                label: "Lives Changed",
                description: "Through the precedent you set",
                delay: 0.3,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.8 }}
                className="glass-card-v10 text-center group hover:scale-105 transition-all duration-300"
                style={{
                  background: "var(--glass-platinum-v10)",
                  backdropFilter: "var(--glass-backdrop-v10)",
                  border: "1px solid var(--glass-border-v10)",
                }}
              >
                <div className="text-6xl font-bold text-elite-divine-amber mb-4 group-hover:scale-110 transition-transform">
                  {item.number}
                </div>
                <h3 className="text-xl font-bold text-gentle-charcoal mb-3">
                  {item.label}
                </h3>
                <p className="text-soft-shadow leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Championship Moment Timeline - Elite V10 */}
      <section className="section-spacing bg-gradient-to-br from-elite-justice-indigo/10 to-elite-divine-amber/10 relative">
        <div className="content-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gentle-charcoal">
              Your Championship Moment:{" "}
              <span className="text-elite-divine-amber">July 28th</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              {
                number: "1",
                title: "You Enter That Courtroom",
                description:
                  "Super Bowl champion. Foster father to 100+. Your presence alone changes everything.",
                delay: 0.1,
              },
              {
                number: "2",
                title: "You Speak From Your Heart",
                description:
                  "\"Your Honor, JAHmere protected my son Jordan. He has the rarest gift—he's a peacemaker. Don't cage this gift. Unleash it.\"",
                delay: 0.2,
              },
              {
                number: "3",
                title: "You Change Criminal Justice Forever",
                description:
                  'This becomes the "Dungy Model"—where champions stand for transformation over incarceration.',
                delay: 0.3,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay, duration: 0.8 }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg"
                    style={{
                      background: "var(--sunrise-hope)",
                      boxShadow: "0 8px 32px rgba(255, 107, 53, 0.3)",
                    }}
                  >
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gentle-charcoal mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-soft-shadow leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Elite CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mt-16"
          >
            <Link href="/letter-form-test">
              <Button
                size="lg"
                className="bg-pure-white text-elite-justice-indigo border-2 border-elite-justice-indigo hover:bg-elite-justice-indigo hover:text-white transition-all duration-300 px-8 py-4 text-lg font-bold"
              >
                Write Your Letter of Support →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final Elite V10 Call to Action */}
      <section className="section-spacing bg-gradient-to-r from-elite-obsidian-depth to-elite-justice-indigo text-white relative overflow-hidden">
        {/* Elite particles overlay */}
        <div className="absolute inset-0 opacity-20">
          <DivineParticles variant="sacred" intensity="low" role="guardian" />
        </div>

        <div className="content-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Shield className="w-20 h-20 mx-auto mb-8 text-elite-divine-amber" />

            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Champions Recognize Championship Potential
            </h2>

            <p className="text-xl max-w-4xl mx-auto mb-12 text-gray-300 leading-relaxed">
              You've spent your life turning undisciplined players into
              champions. JAHmere is your next championship story—not on the
              field, but in life.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link href="/the-case">
                <Button
                  size="xl"
                  className="bg-pure-white text-elite-obsidian-depth hover:bg-elite-platinum-truth font-bold px-12 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  Lead This Movement Now
                </Button>
              </Link>
              <Link href="/twitter-campaign">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-elite-divine-amber text-elite-divine-amber hover:bg-elite-divine-amber hover:text-elite-obsidian-depth font-bold px-12 py-6 text-lg transition-all"
                >
                  Share Your Support
                </Button>
              </Link>
            </div>

            {/* Divine Progress Arc */}
            <div className="mb-6">
              <div className="relative w-32 h-32 mx-auto">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="var(--elite-divine-amber)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (timeRemaining.days / 16)}`}
                    className="transition-all duration-1000 ease-out"
                    style={{
                      filter: "drop-shadow(0 0 8px var(--elite-divine-amber))",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-elite-divine-amber">
                      {Math.round((1 - timeRemaining.days / 16) * 100)}%
                    </div>
                    <div className="text-xs text-gray-300">COMPLETE</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400 font-mono">
              Every second counts.{" "}
              <span className="text-elite-divine-amber font-bold">
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
