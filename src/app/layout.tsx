import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import "./accessibility.css";
import { PostHogProviderWrapper } from "./providers";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import { AnimationProvider } from "@/components/animation-context";
import { ProductionErrorBoundary } from "@/components/ui/production-error-boundary";
import { initializeProductionLogging } from "@/lib/production/console-log-sanitizer";
import ClientLayout from "@/components/client-layout";

// Initialize production security on app startup
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  initializeProductionLogging();
}

const inter = Inter({ subsets: ["latin"] });

// Google Analytics Configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-0JW7Z76D71';

export const metadata: Metadata = {
  metadataBase: new URL('https://transformation-agent-bridge-33928f4xe-bravetto.vercel.app'),
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
      <head>
        {/* Google Analytics - PROPER IMPLEMENTATION */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: 'JAHmere Webb Freedom Portal',
              custom_map: {'custom_parameter_1': 'july_28_mission'}
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ProductionErrorBoundary
          componentName="RootLayout"
          enableAnalytics={false}
        >
          <PostHogProviderWrapper>
            <AnimationProvider>
              <ClientLayout>
                <AnalyticsWrapper>
                  <ProductionErrorBoundary componentName="MainApp">
                    {children}
                  </ProductionErrorBoundary>
                </AnalyticsWrapper>
              </ClientLayout>
            </AnimationProvider>
          </PostHogProviderWrapper>
        </ProductionErrorBoundary>
      </body>
    </html>
  );
}
