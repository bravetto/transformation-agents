import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Script from "next/script";
import "./globals.css";
import "./accessibility.css";
import { AnimationProvider } from "@/components/animation-context";
import ErrorBoundaryWrapper from "@/components/error-boundary-wrapper";
import { Analytics } from "@/components/analytics";
import { Suspense } from "react";
import { DevPortalProvider } from "@/components/dev-portal";
import { cn } from "@/lib/utils";
// Font configuration
import { Inter } from "next/font/google";

// Move font loader to module scope
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Metadata in a separate file
export { metadata } from "./metadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable)} suppressHydrationWarning>
      <body>
        <AnimationProvider>
          <DevPortalProvider>
            <ErrorBoundaryWrapper id="root-layout">
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

              {/* Analytics - No UI */}
              <Suspense fallback={null}>
                <Analytics />
              </Suspense>
            </ErrorBoundaryWrapper>
          </DevPortalProvider>
        </AnimationProvider>

        {/* Service Worker Registration */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', async () => {
                  try {
                    const registration = await navigator.serviceWorker.register('/service-worker.js', {
                      scope: '/'
                    });
                    console.log('SW registered:', registration.scope);
                  } catch (err) {
                    console.error('SW registration failed:', err);
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
