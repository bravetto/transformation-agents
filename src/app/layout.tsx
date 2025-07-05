import type { Metadata } from "next";
import { Analytics } from '@/components/analytics';
import "./globals.css";
import dynamic from 'next/dynamic';
import ErrorBoundaryWrapper from '@/components/error-boundary-wrapper';
import { Suspense } from 'react';

const Navigation = dynamic(() => import("@/components/navigation"), { ssr: false });
// Temporarily disabled the Impact Dashboard
// const ImpactDashboard = dynamic(() => import("@/components/impact-dashboard"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer"), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://thebridgeproject.org'),
  title: "THE BRIDGE - Building Justice from Day One",
  description: "Zero graduates. Infinite possibility. Join us in building a transparent approach to criminal justice reform.",
  keywords: ["criminal justice", "transparency", "youth mentorship", "transformation", "second chances", "community support"],
  authors: [{ name: "The Bridge Team" }],
  openGraph: {
    title: "THE BRIDGE PROJECT",
    description: "Building Justice from Day One - A Transparent Approach to Criminal Justice Reform",
    type: "website",
    locale: "en_US",
    url: "https://thebridgeproject.org",
    siteName: "The Bridge Project",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Bridge Project - Zero Graduates. Infinite Possibility.",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "THE BRIDGE PROJECT",
    description: "Building Justice from Day One - Zero Graduates. Infinite Possibility.",
    images: ['/og-image.png'],
    creator: '@thebridgeproject',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-comfort-cream text-gentle-charcoal antialiased">
        <ErrorBoundaryWrapper id="navigation">
          <Navigation />
        </ErrorBoundaryWrapper>
        
        <main className="min-h-screen pt-16">
          <ErrorBoundaryWrapper id="main-content">
            {children}
          </ErrorBoundaryWrapper>
        </main>
        
        {/* Impact Dashboard temporarily disabled 
        <ErrorBoundaryWrapper id="impact-dashboard">
          <ImpactDashboard />
        </ErrorBoundaryWrapper>
        */}
        
        <ErrorBoundaryWrapper id="footer">
          <Footer />
        </ErrorBoundaryWrapper>
        
        {/* Web Vitals & Analytics - Wrapped in Suspense */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
