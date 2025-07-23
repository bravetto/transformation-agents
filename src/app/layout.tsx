import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./accessibility.css";
import { cn } from "@/lib/utils";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import Navigation from "@/components/navigation";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import ClientLayoutWrapper from "@/components/client-layout-wrapper";
import PerformanceMonitor from "@/components/analytics/performance-monitor";
import { enhancedINPOptimizer } from "@/lib/performance/enhanced-inp-optimizer";

// Optimized font loading with 2024 best practices
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents FOIT (Flash of Invisible Text)
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true, // Reduces layout shift
  fallback: ["system-ui", "arial"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: false, // Only preload when needed
  adjustFontFallback: true,
  fallback: ["ui-monospace", "Consolas", "Monaco"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  preload: false, // Only preload when needed
  adjustFontFallback: true,
  fallback: ["Georgia", "Times New Roman"],
});

export const metadata: Metadata = {
  title: "The Bridge Project - JAHmere Webb Freedom Portal",
  description:
    "Advocating for JAHmere Webb's freedom through divine justice, community support, and transformational change. July 28th, 2025 - A day of divine intervention.",
  keywords: [
    "JAHmere Webb",
    "Tony Dungy",
    "Jordan Dungy",
    "Freedom Portal",
    "Divine Justice",
    "July 28 2025",
    "The Bridge Project",
    "Criminal Justice Reform",
    "Faith-Based Transformation",
    "Character Witness Letters",
    "Prison Ministry",
    "NFL Authority",
    "Second Chances",
  ],
  authors: [{ name: "The Bridge Project Team" }],
  openGraph: {
    title: "JAHmere Webb Freedom Portal - July 28th, 2025",
    description:
      "Join the divine mission for JAHmere Webb's freedom through prayer, advocacy, and community support.",
    images: ["/images/og-image.png"],
    url: "https://transformation-agents-jahmere-bridge.vercel.app",
    siteName: "JAHmere Webb Freedom Portal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JAHmere Webb Freedom Portal",
    description:
      "Divine justice, community support, and transformational change for JAHmere Webb's freedom.",
    images: ["/images/twitter-image.png"],
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://transformation-agents-jahmere-bridge.vercel.app",
  },
  category: "Social Justice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        jetbrainsMono.variable,
        playfairDisplay.variable,
      )}
      suppressHydrationWarning={true}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e40af" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes"
        />
      </head>
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        <ClientLayoutWrapper>
          <AnalyticsWrapper>
            {/* Banner - Positioned above navigation */}
            <Banner />

            {/* Navigation */}
            <Navigation />

            {/* Main content */}
            <main id="main-content" className="min-h-screen">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </AnalyticsWrapper>
        </ClientLayoutWrapper>

        {/* Vercel Speed Insights for Core Web Vitals monitoring */}
        <SpeedInsights />

        {/* Comprehensive Performance Monitor */}
        <PerformanceMonitor />

        {/* Enhanced INP Optimizer (2025) - Latest performance optimization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize Enhanced INP Optimizer on page load  
              if (typeof window !== 'undefined' && window.enhancedINPOptimizer) {
                console.log('🚀 Enhanced INP Optimizer (2025) activated - scheduler.yield(), AbortController patterns ready');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
