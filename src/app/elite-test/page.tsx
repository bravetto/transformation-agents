"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function EliteTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elite-obsidian-depth to-elite-midnight-navy text-elite-platinum-truth">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 elite-text-gradient">
            🔥 CHROMATIC JUSTICE DESIGN SYSTEM
          </h1>
          <p className="text-xl text-elite-platinum-truth">
            Testing the Elite Design Transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Elite Button Test */}
          <div className="elite-card-divine p-6">
            <h3 className="text-xl font-bold mb-4">Elite Buttons</h3>
            <div className="space-y-4">
              <Button className="w-full elite-button-primary elite-ripple">
                <ArrowRight className="mr-2 h-4 w-4" />
                Primary Elite CTA
              </Button>
              <Button className="w-full bg-elite-justice-indigo hover:bg-elite-sacred-violet text-white">
                <Shield className="mr-2 h-4 w-4" />
                Justice Authority
              </Button>
              <Button className="w-full bg-elite-crimson-urgency hover:bg-elite-divine-amber text-white">
                <Users className="mr-2 h-4 w-4" />
                Urgent Action
              </Button>
            </div>
          </div>

          {/* Elite Glass Card Test */}
          <div className="elite-glass p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-elite-obsidian-depth">
              Glassmorphism
            </h3>
            <p className="text-elite-obsidian-depth/80 mb-4">
              This card demonstrates the elite glassmorphism effect with
              backdrop blur and subtle transparency.
            </p>
            <div className="w-full h-2 bg-elite-sacred-violet rounded-full"></div>
          </div>

          {/* Elite Particle Test */}
          <div className="elite-particle-container bg-elite-obsidian-depth/20 p-6 rounded-lg border border-glass-border">
            <h3 className="text-xl font-bold mb-4">Divine Particles</h3>
            <p className="text-elite-platinum-truth mb-4">
              Watch the sacred particles float with divine timing.
            </p>
            <div
              className="elite-particle"
              style={{ top: "20%", left: "20%", animationDelay: "0s" }}
            ></div>
            <div
              className="elite-particle"
              style={{ top: "60%", left: "70%", animationDelay: "2s" }}
            ></div>
            <div
              className="elite-particle"
              style={{ top: "40%", left: "50%", animationDelay: "4s" }}
            ></div>
          </div>
        </div>

        {/* Color Palette Test */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Elite Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-elite-divine-amber p-4 rounded-lg text-center">
              <div className="text-white font-bold">Divine Amber</div>
              <div className="text-white/80 text-sm">#FF8C00</div>
            </div>
            <div className="bg-elite-justice-indigo p-4 rounded-lg text-center">
              <div className="text-white font-bold">Justice Indigo</div>
              <div className="text-white/80 text-sm">#4B0082</div>
            </div>
            <div className="bg-elite-sacred-violet p-4 rounded-lg text-center">
              <div className="text-white font-bold">Sacred Violet</div>
              <div className="text-white/80 text-sm">#8A2BE2</div>
            </div>
            <div className="bg-elite-crimson-urgency p-4 rounded-lg text-center">
              <div className="text-white font-bold">Crimson Urgency</div>
              <div className="text-white/80 text-sm">#DC143C</div>
            </div>
            <div className="bg-elite-platinum-truth p-4 rounded-lg text-center">
              <div className="text-elite-obsidian-depth font-bold">
                Platinum Truth
              </div>
              <div className="text-elite-obsidian-depth/80 text-sm">
                #E5E4E2
              </div>
            </div>
            <div className="bg-elite-obsidian-depth p-4 rounded-lg text-center">
              <div className="text-white font-bold">Obsidian Depth</div>
              <div className="text-white/80 text-sm">#0B1426</div>
            </div>
            <div className="bg-elite-aurora-gold p-4 rounded-lg text-center">
              <div className="text-elite-obsidian-depth font-bold">
                Aurora Gold
              </div>
              <div className="text-elite-obsidian-depth/80 text-sm">
                #FFD700
              </div>
            </div>
            <div className="bg-elite-midnight-navy p-4 rounded-lg text-center">
              <div className="text-white font-bold">Midnight Navy</div>
              <div className="text-white/80 text-sm">#191970</div>
            </div>
          </div>
        </div>

        {/* Gradient Test */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Elite Gradients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-divine-authority p-8 rounded-lg text-center">
              <h3 className="text-white font-bold text-xl">Divine Authority</h3>
              <p className="text-white/80">
                Sacred Violet → Justice Indigo → Midnight Navy
              </p>
            </div>
            <div className="bg-gradient-sacred-fire p-8 rounded-lg text-center">
              <h3 className="text-white font-bold text-xl">Sacred Fire</h3>
              <p className="text-white/80">
                Divine Amber → Aurora Gold → Crimson Urgency
              </p>
            </div>
          </div>
        </div>

        {/* Shadow Test */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Elite Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-elite-divine text-center">
              <h4 className="font-bold text-elite-obsidian-depth">
                Divine Shadow
              </h4>
              <p className="text-elite-obsidian-depth/70 text-sm">
                Sacred depth
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-elite-sacred text-center">
              <h4 className="font-bold text-elite-obsidian-depth">
                Sacred Shadow
              </h4>
              <p className="text-elite-obsidian-depth/70 text-sm">
                Divine authority
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-elite-crimson text-center">
              <h4 className="font-bold text-elite-obsidian-depth">
                Crimson Shadow
              </h4>
              <p className="text-elite-obsidian-depth/70 text-sm">
                Urgent action
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-elite-aurora text-center">
              <h4 className="font-bold text-elite-obsidian-depth">
                Aurora Shadow
              </h4>
              <p className="text-elite-obsidian-depth/70 text-sm">
                Golden glow
              </p>
            </div>
          </div>
        </div>

        {/* Back to Homepage */}
        <div className="text-center">
          <Link href="/">
            <Button className="elite-button-primary elite-ripple">
              <ArrowRight className="mr-2 h-4 w-4" />
              See the Transformation on Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
