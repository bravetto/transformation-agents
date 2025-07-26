"use client";

// 🔥 CRITICAL FIX: Replace usePathname with useStableNavigation for production stability
import { useStableNavigation } from "@/hooks/useStableNavigation";
import { Suspense } from "react";
import Navigation from "./navigation";
import Footer from "./footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

function NavigationSkeleton() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo skeleton */}
          <div className="flex items-center">
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>

          {/* Desktop navigation skeleton */}
          <div className="hidden md:flex items-center space-x-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 w-16 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Mobile menu button skeleton */}
          <div className="md:hidden">
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  // 🔥 CRITICAL FIX: Use stable navigation hook to prevent re-render loops
  const { pathname } = useStableNavigation();

  return (
    <>
      <Suspense fallback={<NavigationSkeleton />}>
        <Navigation />
      </Suspense>
      <main className="min-h-screen">{children}</main>
    </>
  );
}
