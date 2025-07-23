/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// 🛡️ ROBUST CACHE HANDLER PATH RESOLUTION
function getCacheHandlerPath() {
  const path = require("path");
  const fs = require("fs");

  const cacheHandlerPath = path.resolve(__dirname, "lib/cache-handler.js");

  // Only enable cache handler if file exists (prevents dev mode issues)
  if (fs.existsSync(cacheHandlerPath)) {
    return cacheHandlerPath;
  }

  console.warn("⚠️ Cache handler file not found, using default caching");
  return undefined;
}

// 🛡️ DYNAMIC CONFIG BUILDER WITH CACHE HANDLER
const cacheHandlerPath = getCacheHandlerPath();
const nextConfig = {
  // 🚀 PERFORMANCE OPTIMIZATION
  experimental: {
    // Edge Runtime optimizations
    optimizePackageImports: ["@/components", "@/lib", "@/types"],
    optimizeCss: true,

    // 📊 PERFORMANCE MONITORING
    webVitalsAttribution: ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"],

    // 🚀 TURBOPACK OPTIMIZATIONS (Next.js 15.4+ stable)
    // turbopackPersistentCaching: true, // Requires canary - disabled for stable
  },

  // 🛡️ ADVANCED CACHING (Next.js 14.1+ stable API)
  cacheMaxMemorySize: 0, // disable default in-memory caching
  // Conditionally set cache handler only if file exists
  ...(cacheHandlerPath ? { cacheHandler: cacheHandlerPath } : {}),

  // 🛡️ SECURITY HARDENING
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
      {
        // Static assets caching
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // API routes optimized caching
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },

  // 📊 BUNDLE ANALYSIS (when ANALYZE=true)
  ...(process.env.ANALYZE === "true" && {
    experimental: {
      ...nextConfig.experimental,
      bundlePagesRouterDependencies: true,
    },
  }),

  // 🎯 IMAGE OPTIMIZATION
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 🏗️ BUILD OPTIMIZATION
  compress: true,

  // 🔧 TYPESCRIPT OPTIMIZATION
  typescript: {
    // Performance over strict checking in build
    ignoreBuildErrors: false,
  },

  // 📝 LOGGING OPTIMIZATION
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },

  // 🌍 I18N READY (future-proofing)
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },
};

// 🔥 TURBOPACK OPTIMIZATION
if (process.env.NODE_ENV === "development") {
  nextConfig.experimental = {
    ...nextConfig.experimental,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  };
}

module.exports = withBundleAnalyzer(nextConfig);
