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
import CacheBusterClient from "@/components/cache-buster-client";
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

              {/* Cache Buster for July 28th Update - Divine Protection */}
              <CacheBusterClient />
            </ErrorBoundaryWrapper>
          </DevPortalProvider>
        </AnimationProvider>

        {/* Divine Service Worker Registration - Cascade Immune */}
        <Script
          id="divine-service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                'use strict';
                
                // Only run in secure contexts and modern browsers
                if (!('serviceWorker' in navigator) || 
                    typeof window === 'undefined' || 
                    !window.location.protocol.startsWith('http')) {
                  return;
                }

                // Divine protection against errors
                function safeLog(message, data) {
                  try {
                    if (typeof console !== 'undefined' && console.log) {
                      console.log('[Divine SW]', message, data || '');
                    }
                  } catch (e) {
                    // Silent fail
                  }
                }

                // Listen for service worker messages with error protection
                try {
                  navigator.serviceWorker.addEventListener('message', (event) => {
                    try {
                      if (event.data && event.data.type === 'CACHE_UPDATED') {
                        safeLog('Cache updated - preparing refresh...');
                        setTimeout(() => {
                          try {
                            window.location.reload();
                          } catch (e) {
                            safeLog('Reload failed gracefully');
                          }
                        }, 1000);
                      }
                    } catch (e) {
                      safeLog('Message handling failed gracefully');
                    }
                  });
                } catch (e) {
                  safeLog('Message listener setup failed gracefully');
                }

                // Register service worker with divine protection
                window.addEventListener('load', async () => {
                  try {
                    // Check if service worker file exists
                    const swResponse = await fetch('/service-worker.js', { 
                      method: 'HEAD',
                      cache: 'no-cache'
                    });
                    
                    if (!swResponse.ok) {
                      safeLog('Service worker file not found, skipping registration');
                      return;
                    }

                    const registration = await navigator.serviceWorker.register('/service-worker.js', {
                      scope: '/',
                      updateViaCache: 'none'
                    });
                    
                    safeLog('Divine Service Worker registered successfully', registration.scope);
                    
                    // Check for updates with error protection
                    if (registration && typeof registration.update === 'function') {
                      try {
                        await registration.update();
                        safeLog('Service worker update check completed');
                      } catch (updateError) {
                        safeLog('Update check failed gracefully');
                      }
                    }
                  } catch (registrationError) {
                    safeLog('Service worker registration failed gracefully', registrationError.message);
                    // Continue without service worker - app should still work
                  }
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
