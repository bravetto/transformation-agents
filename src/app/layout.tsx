import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./accessibility.css";
import { cn } from "@/lib/utils";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import Navigation from "@/components/navigation";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import ClientLayoutWrapper from "@/components/client-layout-wrapper";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Bridge Project - JAHmere Webb Freedom Portal",
  description:
    "Advocating for JAHmere Webb's freedom through divine justice, community support, and transformational change. July 28th, 2025 - A day of divine intervention.",
  keywords: [
    "JAHmere Webb",
    "Freedom Portal",
    "Divine Justice",
    "July 28 2025",
    "Community Support",
    "Transformation",
    "Character Witnesses",
    "Legal Advocacy",
    "Prayer Warriors",
    "Bridge Project",
  ],
  authors: [{ name: "The Bridge Project Team" }],
  creator: "The Bridge Project",
  publisher: "The Bridge Project",
  openGraph: {
    title: "JAHmere Webb Freedom Portal - The Bridge Project",
    description: "Join the movement for JAHmere's freedom on July 28th, 2025",
    url: "https://transformation-agents-jahmere-bridge.vercel.app",
    siteName: "The Bridge Project",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "JAHmere Webb Freedom Portal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JAHmere Webb Freedom Portal",
    description: "Advocating for divine justice and transformational change",
    images: ["/images/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://transformation-agents-jahmere-bridge.vercel.app",
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
      </body>
    </html>
  );
}
