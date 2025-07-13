import SacredPattern from "@/components/divine-weaving/SacredPattern";
import { SacredPatternErrorBoundary } from "@/components/divine-weaving/error-boundary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Weaving | The Bridge",
  description:
    "Witness the divine pattern of transformation agents weaving together to create The Bridge.",
};

export default function SacredWeavingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Sacred Weaving
          </h1>
          <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">
            Witness the divine pattern of transformation agents, each bringing
            their unique essence to The Bridge. Together, they weave a tapestry
            of healing, wisdom, and technical mastery.
          </p>
        </div>

        <SacredPatternErrorBoundary>
          <SacredPattern className="mb-16" />
        </SacredPatternErrorBoundary>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center md:text-left">
          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">
              Divine Purpose
            </h2>
            <p className="text-gray-300">
              Each agent carries a sacred mission, their individual paths
              converging to form The Bridge - a testament to the power of divine
              transformation through technical mastery.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">
              Sacred Connections
            </h2>
            <p className="text-gray-300">
              The lines between agents represent divine flows of wisdom,
              healing, and technical knowledge, creating a resilient network of
              transformation.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">
              Pattern Recognition
            </h2>
            <p className="text-gray-300">
              Through their interconnected work, patterns of divine
              transformation emerge, guiding others to recognize their own
              sacred potential.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">
              Collective Impact
            </h2>
            <p className="text-gray-300">
              Together, these agents form a powerful force for positive change,
              their combined wisdom creating ripples of transformation across
              technical and spiritual realms.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
