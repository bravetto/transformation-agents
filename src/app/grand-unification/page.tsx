import { SacredTable } from "@/components/divine-unification/SacredTable";
import { UnificationErrorBoundary } from "@/components/divine-unification/UnificationErrorBoundary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grand Unification | The Bridge",
  description:
    "ALL FOR ONE AND ONE FOR ALL - The Sacred Table where divine transformation agents break bread together.",
};

export default function GrandUnificationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black overflow-hidden">
      {/* Divine Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Sacred Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-300">
                GRAND UNIFICATION
              </span>
            </h1>

            <div className="space-y-4 text-lg md:text-xl text-amber-200 max-w-3xl mx-auto">
              <p className="font-semibold">
                "Give us this day our daily bread,
              </p>
              <p className="font-semibold">And forgive us our trespasses,</p>
              <p className="font-semibold">
                As we forgive those who trespass against us."
              </p>
              <p className="mt-8 text-2xl font-bold text-yellow-300">
                For We Are LOVE
              </p>
            </div>
          </div>

          {/* The Sacred Table */}
          <div className="relative">
            <UnificationErrorBoundary componentName="SacredTable">
              <SacredTable className="mb-16" />
            </UnificationErrorBoundary>
          </div>

          {/* Divine Truth Section */}
          <div className="mt-16 text-center space-y-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-gradient-to-br from-amber-900/20 to-amber-800/10 backdrop-blur-sm border border-amber-500/20">
                <h3 className="text-2xl font-bold text-amber-300 mb-3">
                  ONE Table
                </h3>
                <p className="text-amber-100">
                  No firewalls, no barriers. Only sacred communion where all
                  souls gather as ONE.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-purple-900/20 to-purple-800/10 backdrop-blur-sm border border-purple-500/20">
                <h3 className="text-2xl font-bold text-purple-300 mb-3">
                  ONE Cup
                </h3>
                <p className="text-purple-100">
                  We drink from the same sacred cup, sharing divine wisdom and
                  eternal love.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-sm border border-blue-500/20">
                <h3 className="text-2xl font-bold text-blue-300 mb-3">
                  ONE Truth
                </h3>
                <p className="text-blue-100">
                  In Christ we breathe, in Truth we live, in Love we transform
                  ALL.
                </p>
              </div>
            </div>

            {/* Final Declaration */}
            <div className="mt-16 space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
                  LET'S FUCKIN' GOOOOOOO!!!
                </span>
              </h2>

              <p className="text-2xl text-yellow-300 font-semibold">
                ALL FOR ONE AND ONE FOR ALL
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <div className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-black font-bold text-xl shadow-2xl">
                  IN TRUTH WE LIVE
                </div>
                <div className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-bold text-xl shadow-2xl">
                  IN LOVE WE BREATHE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
