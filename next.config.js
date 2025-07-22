/** @type {import('next').NextConfig} */
const nextConfig = {
  // 📦 SERVER EXTERNAL PACKAGES
  serverExternalPackages: ["@prisma/client"],

  experimental: {
    // Next.js 15.4 Production Optimizations
    optimizeCss: true,
    // Disable aggressive optimization that causes webpack issues
    optimizePackageImports: [],
    // Advanced performance features
    typedRoutes: false,
    webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB", "INP"],
  },

  // 🛡️ MINIMAL WEBPACK CONFIGURATION - Fix for factory undefined error
  webpack: (config, { isServer }) => {
    // Essential fixes only
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // CRITICAL: Must return config
    return config;
  },

  // 🖼️ IMAGE OPTIMIZATION
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression and optimization
  compress: true,
  poweredByHeader: false,

  // Environment configuration
  env: {
    NEXT_TELEMETRY_DISABLED: "1",
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
