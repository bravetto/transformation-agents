"use client";

import { useState } from "react";
import { Container, Heading, Text, Button, Stack } from "@/components/ui";
import DivineParticles from "@/components/divine-particles";
import type { DivineRole } from "@/components/ui/divine-error-boundary";

export default function ParticlesTest() {
  // State for controlling the particle settings
  const [selectedRole, setSelectedRole] = useState<DivineRole>("lightworker");
  const [selectedVariant, setSelectedVariant] = useState<
    "sacred" | "hope" | "transformation" | "minimal"
  >("sacred");
  const [selectedIntensity, setSelectedIntensity] = useState<
    "low" | "medium" | "high" | "auto"
  >("auto");
  const [isInteractive, setIsInteractive] = useState(true);

  return (
    <Container className="py-16">
      <div className="text-center mb-10">
        <Heading size="h1" className="mb-4">
          Divine Particles
        </Heading>
        <Text className="max-w-2xl mx-auto">
          This self-optimizing, role-aware particle system provides beautiful
          visual effects with intelligent performance scaling based on device
          capabilities.
        </Text>
      </div>

      {/* Controls */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-10 flex flex-wrap gap-4 justify-center">
        {/* Role Selection */}
        <div>
          <Text className="mb-2 font-semibold">Role:</Text>
          <div className="flex flex-wrap gap-2">
            {(["lightworker", "messenger", "witness", "guardian"] as const).map(
              (role) => (
                <Button
                  key={role}
                  variant={selectedRole === role ? "default" : "outline"}
                  onClick={() => setSelectedRole(role)}
                  className="capitalize"
                >
                  {role}
                </Button>
              ),
            )}
          </div>
        </div>

        {/* Variant Selection */}
        <div>
          <Text className="mb-2 font-semibold">Variant:</Text>
          <div className="flex flex-wrap gap-2">
            {(["sacred", "hope", "transformation", "minimal"] as const).map(
              (variant) => (
                <Button
                  key={variant}
                  variant={selectedVariant === variant ? "default" : "outline"}
                  onClick={() => setSelectedVariant(variant)}
                  className="capitalize"
                >
                  {variant}
                </Button>
              ),
            )}
          </div>
        </div>

        {/* Intensity Selection */}
        <div>
          <Text className="mb-2 font-semibold">Intensity:</Text>
          <div className="flex flex-wrap gap-2">
            {(["low", "medium", "high", "auto"] as const).map((intensity) => (
              <Button
                key={intensity}
                variant={
                  selectedIntensity === intensity ? "default" : "outline"
                }
                onClick={() => setSelectedIntensity(intensity)}
                className="capitalize"
              >
                {intensity}
              </Button>
            ))}
          </div>
        </div>

        {/* Interactive Toggle */}
        <div>
          <Text className="mb-2 font-semibold">Interactive:</Text>
          <div className="flex gap-2">
            <Button
              variant={isInteractive ? "default" : "outline"}
              onClick={() => setIsInteractive(true)}
            >
              On
            </Button>
            <Button
              variant={!isInteractive ? "default" : "outline"}
              onClick={() => setIsInteractive(false)}
            >
              Off
            </Button>
          </div>
        </div>
      </div>

      {/* Particles Demo */}
      <div className="grid grid-cols-1 gap-10">
        <div
          className={`relative h-[500px] bg-slate-900/50 p-6 rounded-xl overflow-hidden`}
        >
          <Heading size="h3" className="mb-4 relative z-10 text-center">
            {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} •{" "}
            {selectedVariant.charAt(0).toUpperCase() + selectedVariant.slice(1)}{" "}
            •{" "}
            {selectedIntensity.charAt(0).toUpperCase() +
              selectedIntensity.slice(1)}
          </Heading>

          <DivineParticles
            role={selectedRole}
            variant={selectedVariant}
            intensity={selectedIntensity}
            interactive={isInteractive}
          />

          <div className="relative z-10 flex justify-center items-center h-[300px]">
            <div
              className={`p-10 rounded-full bg-gradient-to-br ${getRoleGradient(selectedRole)} bg-opacity-20 backdrop-blur-sm flex items-center justify-center`}
            >
              <span className="text-6xl">{getRoleEmoji(selectedRole)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-16 bg-white/5 backdrop-blur-sm p-6 rounded-lg">
        <Heading size="h3" className="mb-4">
          Technical Features
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Heading size="h4" className="mb-2">
              Role-Specific Behaviors
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Lightworker:</strong> Star-shaped particles with upward
                movement and golden colors
              </li>
              <li>
                <strong>Messenger:</strong> Triangle particles with dynamic
                movement in blue spectrum
              </li>
              <li>
                <strong>Witness:</strong> Circle particles with gentle floating
                in emerald tones
              </li>
              <li>
                <strong>Guardian:</strong> Pentagon particles with protective
                patterns in purple
              </li>
            </ul>
          </div>

          <div>
            <Heading size="h4" className="mb-2">
              Performance Features
            </Heading>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Auto-optimization:</strong> Adjusts particle count and
                effects based on FPS
              </li>
              <li>
                <strong>Reduced motion:</strong> Detects and respects user
                accessibility preferences
              </li>
              <li>
                <strong>Device detection:</strong> Scales complexity based on
                device capabilities
              </li>
              <li>
                <strong>Memory optimization:</strong> Prevents memory leaks with
                proper cleanup
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}

// Helper function to get role-specific emoji
function getRoleEmoji(role: DivineRole): string {
  switch (role) {
    case "lightworker":
      return "✨";
    case "messenger":
      return "📮";
    case "witness":
      return "👁️";
    case "guardian":
      return "🛡️";
    default:
      return "🔮";
  }
}

// Helper function to get role-specific gradient class
function getRoleGradient(role: DivineRole): string {
  switch (role) {
    case "lightworker":
      return "from-amber-500 via-orange-500 to-yellow-500";
    case "messenger":
      return "from-blue-500 via-indigo-500 to-purple-500";
    case "witness":
      return "from-emerald-500 via-teal-500 to-cyan-500";
    case "guardian":
      return "from-purple-500 via-pink-500 to-rose-500";
    default:
      return "from-gray-700 via-gray-800 to-gray-900";
  }
}
