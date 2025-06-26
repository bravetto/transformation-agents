import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

// Dynamic imports for performance
const Navigation = dynamic(() => import("@/components/navigation"), {
  ssr: false,
});
const ImpactDashboard = dynamic(() => import("@/components/impact-dashboard"), {
  ssr: false,
});
const FloatingTestimony = dynamic(() => import("@/components/floating-testimony"), {
  ssr: false,
});
const CursorTrail = dynamic(() => import("@/components/cursor-trail"), {
  ssr: false,
});
const SocialAmplification = dynamic(() => import("@/components/social-amplification"), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thebridgeproject.org'),
  title: "THE BRIDGE - From System Survivor to Youth Guide",
  description: "Transforming lives through radical accountability and love. Clear Eyes. Full Hearts. Can't Lose.",
  keywords: ["criminal justice", "youth mentorship", "transformation", "second chances", "community support"],
  authors: [{ name: "The Bridge Team" }],
  openGraph: {
    title: "THE BRIDGE PROJECT",
    description: "From System Survivor to Youth Guide - Transforming Criminal Justice Through Divine Technology",
    type: "website",
    locale: "en_US",
    url: "https://thebridgeproject.org",
    siteName: "The Bridge Project",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Bridge Project - Clear Eyes. Full Hearts. Can't Lose.",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "THE BRIDGE PROJECT",
    description: "From System Survivor to Youth Guide - Transforming Criminal Justice",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <div className="flex-1">{children}</div>
          
          {/* NEXT LEVEL COMPONENTS */}
          <ImpactDashboard />
          <FloatingTestimony />
          <CursorTrail />
          <SocialAmplification />
        </div>
      </body>
    </html>
  );
}
