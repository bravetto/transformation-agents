"use client";
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Briefcase, Shield, Star, ArrowRight } from "lucide-react";

export default function MichaelTestament() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleExpand = () => {
    setIsExpanded(true);
    // Reward engagement
    window.dispatchEvent(
      new CustomEvent("impact-update", { detail: { type: "heart" } }),
    );
  };

  return (
    <section
      className="bg-comfort-cream py-16 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-3 mb-6 mx-auto text-center w-full"
        >
          <div className="relative mx-auto">
            <div className="absolute inset-0 bg-hope-gold/20 blur-xl rounded-full" />
            <div className="relative bg-hope-gold text-gentle-charcoal rounded-full px-6 py-2 font-bold text-sm">
              FROM THE MAYOR OF THE BRIDGE PROJECT
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          <span className="text-gentle-charcoal">A Testament to</span>
          <span className="block text-xl md:text-2xl text-hope-gold font-semibold mt-2">
            Transformation, Redemption & Divine Purpose
          </span>
        </h2>

        {/* Main Message Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-hope-gold/10 blur-2xl rounded-3xl" />

            {/* Card Content */}
            <div className="relative bg-white rounded-3xl p-8 md:p-12 border border-hope-gold/30 shadow-lg">
              {/* Message */}
              <div className="space-y-4 text-lg text-gentle-charcoal leading-relaxed">
                <p>
                  <span className="text-hope-gold">"</span>
                  When JAHmere Webb asked me to pen this testament, I saw not
                  just a friend seeking support, but a divine appointment—a
                  brother whose transformation mirrors the redemptive power of
                  purpose-driven love.
                  <span className="text-hope-gold">"</span>
                </p>

                <p>
                  I stand before you today not as Michael Mataluni, the
                  entrepreneur, but as a witness to modern-day resurrection.
                  I've watched JAHmere transform from someone society had
                  written off into a beacon of hope for countless young souls
                  standing at the crossroads.
                </p>

                <p>
                  <span className="font-bold text-hope-gold">
                    JAHmere Webb is not standing before you as a defendant
                    seeking mercy.
                  </span>{" "}
                  <span className="text-gentle-charcoal">
                    He stands before you as an agent of transformation who
                    happens to have a past.
                  </span>
                </p>
              </div>

              {/* CTA */}
              <motion.a
                href="/letter-to-judge"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-hope-gold text-gentle-charcoal px-8 py-4 rounded-xl font-bold text-lg hover:bg-courage-blue hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto mt-8 w-fit"
              >
                Read My Full Letter to Judge Ferrero
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Final Call */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-8 border border-hope-gold/30 shadow-lg mt-12"
        >
          <p className="text-xl font-bold text-gentle-charcoal mb-4">
            This isn't just about JAHmere anymore.
          </p>
          <p className="text-lg text-soft-shadow">
            It's about every young person who needs to see that transformation
            is possible, that second chances create first-class citizens, and
            that sometimes the very people society gives up on become the ones
            who lift society up.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
