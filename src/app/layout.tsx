import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./accessibility.css";
import { PostHogProviderWrapper } from "./providers";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import { AnimationProvider } from "@/components/animation-context";
import { ProductionErrorBoundary } from "@/components/ui/production-error-boundary";
import { initializeProductionLogging } from "@/lib/production/console-log-sanitizer";
import dynamic from "next/dynamic";

// Dynamic import of Navigation to avoid hydration issues
const Navigation = dynamic(() => import("@/components/navigation"), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 animate-pulse"></div>
  ),
});

// Initialize production security on app startup
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  initializeProductionLogging();
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JAHmere Webb - July 28th Freedom Portal",
  description:
    "Supporting JAHmere Webb's journey to freedom through community advocacy and legal support.",
  keywords: [
    "JAHmere Webb",
    "Justice Reform",
    "Community Support",
    "Legal Advocacy",
    "Second Chances",
    "Criminal Justice",
    "July 28th",
    "Freedom Portal",
  ],
  authors: [{ name: "JAHmere Webb Freedom Coalition" }],
  openGraph: {
    title: "JAHmere Webb - July 28th Freedom Portal",
    description:
      "Supporting JAHmere Webb's journey to freedom through community advocacy and legal support.",
    url: "https://july28freedom.vercel.app",
    siteName: "JAHmere Webb Freedom Portal",
    images: [
      {
        url: "/images/og/freedom-portal.jpg",
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
    title: "JAHmere Webb - July 28th Freedom Portal",
    description:
      "Supporting JAHmere Webb's journey to freedom through community advocacy and legal support.",
    images: ["/images/og/freedom-portal.jpg"],
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ProductionErrorBoundary
          componentName="RootLayout"
          enableAnalytics={false}
        >
          <PostHogProviderWrapper>
            <AnimationProvider>
              <Navigation />
              <ProductionErrorBoundary componentName="MainApp">
                {children}
              </ProductionErrorBoundary>
            </AnimationProvider>
          </PostHogProviderWrapper>
          <AnalyticsWrapper>{children}</AnalyticsWrapper>
        </ProductionErrorBoundary>
      </body>
    </html>
  );
}
