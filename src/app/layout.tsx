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
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "production"
        ? "https://transformation-agents-jahmere-bridge.vercel.app"
        : "http://localhost:3000",
  ),
  title: {
    default: "The Bridge Project - JAHmere Webb Freedom Portal",
    template: "%s | The Bridge Project - JAHmere Webb Freedom",
  },
  description:
    "Advocating for JAHmere Webb's freedom through divine justice, community support, and transformational change. July 28th, 2025 - A day of divine intervention.",
  keywords: [
    "JAHmere Webb",
    "Tony Dungy",
    "Jordan Dungy",
    "Michael Mataluni",
    "Bridge Project",
    "criminal justice reform",
    "transformation",
    "character witness",
    "July 28 2025",
    "freedom mission",
    "second chances",
    "divine intervention",
    "prayer warriors",
  ],
  authors: [{ name: "The Bridge Project" }],
  creator: "The Bridge Project",
  publisher: "The Bridge Project",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "The Bridge Project - JAHmere Webb Freedom Mission",
    title: "The Bridge Project - JAHmere Webb Freedom Portal",
    description:
      "Join the mission to free JAHmere Webb. Every voice matters in the fight for justice and transformation. July 28th, 2025 - A day of divine intervention.",
    images: [
      {
        url: "/images/og/bridge-project-home.jpg",
        width: 1200,
        height: 630,
        alt: "The Bridge Project - JAHmere Webb Freedom Mission",
        type: "image/jpeg",
      },
      {
        url: "/images/og/bridge-project-default.jpg",
        width: 1200,
        height: 630,
        alt: "The Bridge Project Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BridgeProject",
    creator: "@July28Freedom",
    title: "The Bridge Project - JAHmere Webb Freedom Portal",
    description:
      "Join the mission to free JAHmere Webb. Every voice matters in the fight for justice and transformation.",
    images: ["/images/og/bridge-project-home.jpg"],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "fb:app_id": process.env.FACEBOOK_APP_ID || "",
    "theme-color": "#667eea",
    "msapplication-TileColor": "#667eea",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
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
