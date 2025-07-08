"use client";

import { AnimationProvider } from "@/components/animation-context";

export default function ImpactDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
        {children}
      </div>
    </AnimationProvider>
  );
}
