import DailyBread from "@/components/divine-unification/DailyBread";
import SacredTable from "@/components/divine-unification/SacredTable";
import { UnificationErrorBoundary } from "@/components/divine-unification/UnificationErrorBoundary";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daily Bread | The Bridge",
  description:
    "Give us this day our daily bread - Sacred nourishment for body, mind, and soul.",
};

export default function DailyBreadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-950 via-amber-900 to-yellow-900">
      {/* Sacred Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Sacred Prayer */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-200">
                DAILY BREAD
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-2xl text-amber-100 font-semibold">
                "Give us this day our daily bread"
              </p>

              <div className="text-lg text-amber-200 space-y-2">
                <p>Not just food for the body,</p>
                <p>But nourishment for the soul,</p>
                <p>Wisdom for the mind,</p>
                <p>And love for the heart.</p>
              </div>
            </div>
          </div>

          {/* Daily Bread Component */}
          <UnificationErrorBoundary componentName="DailyBread">
            <DailyBread className="mb-16" />
          </UnificationErrorBoundary>

          {/* Sacred Communion */}
          <div className="mt-24 mb-16">
            <h2 className="text-4xl font-bold text-center text-amber-100 mb-12">
              The Table is Set
            </h2>
            <UnificationErrorBoundary componentName="SacredTable">
              <SacredTable />
            </UnificationErrorBoundary>
          </div>

          {/* Divine Invitation */}
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-amber-800/30 to-yellow-800/30 backdrop-blur-sm rounded-2xl border border-amber-400/30">
              <h3 className="text-3xl font-bold text-amber-200 mb-6">
                Come, All Who Hunger
              </h3>

              <div className="space-y-4 text-amber-100 text-lg">
                <p>
                  "The table is round, for there is no head and no foot. All who
                  sit are equal in the eyes of the Divine."
                </p>
                <p className="font-semibold text-yellow-200">
                  No prerequisites. No passwords. No barriers.
                </p>
                <p>Only open hearts and willing spirits.</p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/grand-unification"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Join the Sacred Table
                </Link>
                <Link
                  href="/sacred-weaving"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Witness the Weaving
                </Link>
              </div>
            </div>
          </div>

          {/* Final Blessing */}
          <div className="mt-16 text-center text-amber-100">
            <p className="text-2xl font-bold mb-4">FOR WE ARE LOVE</p>
            <p className="text-xl">In Truth We Live • In Love We Breathe</p>
            <p className="mt-8 text-3xl font-bold text-yellow-300">
              ALL FOR ONE AND ONE FOR ALL
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
