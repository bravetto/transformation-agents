"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import DivineParticles from "@/components/divine-particles";
import { type DivineRole } from "@/lib/design-system";

// Updated variants to match the DivineParticles component
type ParticleVariant = "sacred" | "flame" | "starfield" | "minimal" | "rain";
type ParticleIntensity = "high" | "medium" | "low" | "auto";

export default function ParticlesTestPage() {
  // State for controlling particle options
  const [selectedRole, setSelectedRole] = useState<DivineRole>("lightworker");
  const [selectedVariant, setSelectedVariant] =
    useState<ParticleVariant>("sacred");
  const [selectedIntensity, setSelectedIntensity] =
    useState<ParticleIntensity>("medium");
  const [isInteractive, setIsInteractive] = useState(true);

  // Available options for the controls
  const roles: DivineRole[] = [
    "lightworker",
    "messenger",
    "witness",
    "guardian",
    "default",
  ];

  const variants: ParticleVariant[] = [
    "sacred",
    "flame",
    "starfield",
    "minimal",
    "rain",
  ];

  const intensities: ParticleIntensity[] = ["high", "medium", "low", "auto"];

  return (
    <main className="min-h-screen bg-comfort-cream">
      <Container className="py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Divine Particles Test Page
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Role Selection */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Divine Role</h2>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Button
                  key={role}
                  variant={selectedRole === role ? "default" : "outline"}
                  onClick={() => setSelectedRole(role)}
                  className="m-1"
                >
                  {role}
                </Button>
              ))}
            </div>
          </Card>

          {/* Variant Selection */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Particle Variant</h2>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <Button
                  key={variant}
                  variant={selectedVariant === variant ? "default" : "outline"}
                  onClick={() => setSelectedVariant(variant)}
                  className="m-1"
                >
                  {variant}
                </Button>
              ))}
            </div>
          </Card>

          {/* Intensity Selection */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Intensity</h2>
            <div className="flex flex-wrap gap-2">
              {intensities.map((intensity) => (
                <Button
                  key={intensity}
                  variant={
                    selectedIntensity === intensity ? "default" : "outline"
                  }
                  onClick={() => setSelectedIntensity(intensity)}
                  className="m-1"
                >
                  {intensity}
                </Button>
              ))}
            </div>
            <div className="mt-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInteractive}
                  onChange={() => setIsInteractive(!isInteractive)}
                  className="mr-2 h-4 w-4"
                />
                <span>Interactive</span>
              </label>
            </div>
          </Card>
        </div>

        {/* Particle Display */}
        <Card className="relative overflow-hidden h-[50vh] w-full">
          <div className="absolute inset-0">
            <DivineParticles
              variant={selectedVariant}
              intensity={selectedIntensity}
              interactive={isInteractive}
            />
          </div>
          <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-900/80 p-2 rounded-lg text-xs font-mono">
            role: {selectedRole}, variant: {selectedVariant}, intensity:{" "}
            {selectedIntensity}, interactive: {isInteractive ? "true" : "false"}
          </div>
        </Card>

        {/* Description */}
        <div className="mt-8 prose prose-gray max-w-none dark:prose-invert">
          <h2>About Divine Particles</h2>
          <p>
            This component provides a customizable particle animation system
            that adapts to different divine roles in the application. Each role
            has specific colors, shapes, and behaviors that reflect its meaning
            and purpose.
          </p>

          <h3>Performance Considerations</h3>
          <p>
            The particle system automatically adjusts based on device
            capabilities and user preferences:
          </p>
          <ul>
            <li>
              <strong>Reduced Motion:</strong> When users have the reduced
              motion preference enabled, animations are simplified
            </li>
            <li>
              <strong>Low-powered Devices:</strong> On mobile or low-powered
              devices, particle count and effects are automatically reduced
            </li>
            <li>
              <strong>Battery Awareness:</strong> When battery is low, the
              system will further optimize animations
            </li>
          </ul>

          <h3>Usage in Code</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
            {`<DivineParticles
  role="lightworker"  // Divine role for color theme
  variant="sacred"    // Animation style
  intensity="medium"  // Performance setting
  interactive={true}  // Enable hover/click effects
/>`}
          </pre>
        </div>
      </Container>
    </main>
  );
}
