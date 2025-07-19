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
// 🚀 CHAMPIONSHIP FONT OPTIMIZATION
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import {
  EasterEggProvider,
  EasterEggTracker,
  KonamiCodeEgg,
  ResurrectionCelebration,
  TimeBasedEgg,
} from "@/components/divine-easter-eggs";
import DivineAnalytics from "@/components/divine-analytics";
import { TrinityPathProvider } from "@/features/trinity-paths/context";
import { logger } from "@/lib/logger";

// 🚀 CHAMPIONSHIP FONT CONFIGURATION WITH AGGRESSIVE OPTIMIZATION
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Critical for performance
  variable: "--font-inter",
  // Preload critical font weights
  weight: ["400", "500", "600", "700"],
  // Reduce layout shift
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
  // Performance optimizations
  preload: true,
  adjustFontFallback: false, // Let Next.js handle this
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  fallback: ["Menlo", "Monaco", "Consolas", "monospace"],
  preload: false, // Only preload if used above the fold
});

// Playfair Display for elegant headings - loaded on demand
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  fallback: ["Georgia", "Times New Roman", "serif"],
  preload: false, // Load when needed
});

// Metadata in a separate file
export { metadata } from "./metadata";

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
      suppressHydrationWarning
    >
      <head>
        {/* 🚀 CRITICAL FONT PRELOADING FOR CHAMPIONSHIP PERFORMANCE */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/inter-latin-500-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/inter-latin-600-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* 🎯 PERFORMANCE: Font Display Optimization */}
        <style>{`
          @font-face {
            font-family: 'Inter Fallback';
            src: local('Arial'), local('Helvetica'), local('sans-serif');
            font-display: swap;
            ascent-override: 90%;
            descent-override: 22%;
            line-gap-override: 0%;
            size-adjust: 107%;
          }
        `}</style>
      </head>
      <body
        className={cn(
          inter.className,
          "antialiased font-sans",
          // Prevent font loading flicker
          "min-h-screen",
        )}
        style={{
          // Critical CSS to prevent FOUC
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <TrinityPathProvider>
          <EasterEggProvider>
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

                  {/* Divine Analytics for Freedom Portal */}
                  <DivineAnalytics />

                  {/* Cache Buster for July 28th Update - Divine Protection */}
                  <CacheBusterClient />

                  {/* Divine Easter Egg System */}
                  <EasterEggTracker />
                  <KonamiCodeEgg />
                  <ResurrectionCelebration />
                  <TimeBasedEgg />
                </ErrorBoundaryWrapper>
              </DevPortalProvider>
            </AnimationProvider>
          </EasterEggProvider>
        </TrinityPathProvider>

        {/* 🛡️ CRITICAL: Error Interceptor Override - Prevent Cascade */}
        <Script
          id="error-interceptor-override"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent Next.js error interceptor from causing analytics cascade
              (function() {
                if (typeof window === 'undefined') return;
                
                // Store original console methods
                const originalError = console.error;
                const originalWarn = console.warn;
                
                // Override console.error to prevent analytics cascade
                console.error = function(...args) {
                  // Check if this is a 404 error from analytics
                  const message = args.join(' ');
                  if (message.includes('404') && message.includes('analytics')) {
                    // Log once but don't cascade
                    if (!window._analyticsErrorLogged) {
                      originalError('Analytics endpoint not ready, using fallback');
                      window._analyticsErrorLogged = true;
                    }
                    return;
                  }
                  
                  // Check if this is the intercept-console-error causing issues
                  if (message.includes('intercept-console-error') || 
                      message.includes('Failed to load resource') && message.includes('api/analytics')) {
                    // Silent ignore to prevent cascade
                    return;
                  }
                  
                  // Call original for other errors
                  originalError.apply(console, args);
                };
                
                // Override window.onerror to prevent cascade
                const originalOnError = window.onerror;
                window.onerror = function(message, source, lineno, colno, error) {
                  // Don't track errors from analytics endpoints
                  if (source && source.includes('analytics')) {
                    return true; // Prevent default error handling
                  }
                  
                  // Don't track 404 errors
                  if (message && message.includes('404')) {
                    return true;
                  }
                  
                  // Call original handler for other errors
                  if (originalOnError) {
                    return originalOnError(message, source, lineno, colno, error);
                  }
                  
                  return false;
                };
              })();
            `,
          }}
        />

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
