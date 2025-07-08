"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Text } from "@/components/ui";
import { Heart, Mail, Calendar, Github } from "lucide-react";
import { getBuildInfo } from "@/lib/build-config";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const daysSinceLaunch = Math.ceil(
    (new Date().getTime() - new Date("2024-12-26").getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <footer className="bg-pure-white border-t border-quiet-stone py-16 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Mission */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-gentle-charcoal mb-4">
              THE BRIDGE PROJECT
            </h3>
            <Text className="text-soft-shadow mb-4">
              Building justice from Day 1. Zero graduates, infinite possibility.
              A transparent experiment in transforming the criminal justice
              system through truth, accountability, and community support.
            </Text>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-hope-gold">
                <Calendar className="h-4 w-4" />
                Day {daysSinceLaunch}
              </span>
              <span className="flex items-center gap-1 text-courage-blue">
                <Heart className="h-4 w-4" />
                100% Transparent
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gentle-charcoal mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-soft-shadow hover:text-hope-gold transition-colors"
                >
                  Write a Letter
                </Link>
              </li>
              <li>
                <Link
                  href="#truth"
                  className="text-soft-shadow hover:text-hope-gold transition-colors"
                >
                  See Our Truth
                </Link>
              </li>
              <li>
                <Link
                  href="/people/jordan-dungy"
                  className="text-soft-shadow hover:text-hope-gold transition-colors"
                >
                  Jordan's Testimony
                </Link>
              </li>
              <li>
                <Link
                  href="/letter-to-dungy"
                  className="text-soft-shadow hover:text-hope-gold transition-colors"
                >
                  Letter to Coach
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency */}
          <div>
            <h4 className="font-semibold text-gentle-charcoal mb-4">
              Transparency
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard/judge"
                  className="text-soft-shadow hover:text-hope-gold transition-colors"
                >
                  Judge Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/check-in"
                  className="text-soft-shadow hover:text-hope-gold transition-colors"
                >
                  Daily Check-In
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/bravetto/transformation-agents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-soft-shadow hover:text-hope-gold transition-colors flex items-center gap-1"
                >
                  <Github className="h-4 w-4" />
                  Open Source
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-soft-shadow hover:text-hope-gold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-quiet-stone">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text size="sm" className="text-soft-shadow">
              © {currentYear} The Bridge Project. Building in public with
              radical transparency.
            </Text>
            <motion.div
              className="text-lg font-bold text-hope-gold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Zero Graduates. Infinite Possibility.
            </motion.div>
          </div>
        </div>

        {/* Truth Statement */}
        <div className="mt-8 text-center">
          <Text size="xs" className="text-soft-shadow">
            We're not hiding our failures. We're not pretending to be perfect.
            We're building something new, and you're watching it happen.
          </Text>
          <Text size="xs" className="text-soft-shadow mt-2">
            {getBuildInfo()}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
