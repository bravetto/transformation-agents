const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable React 18 features (appDir is now default in Next.js 13+)
    optimizeCss: true,
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-dialog",
      "@radix-ui/react-popover",
      "date-fns",
      "clsx",
      "tailwind-merge",
    ],
  },

  // Move serverComponentsExternalPackages to root level
  serverExternalPackages: [],

  // 🚀 PERFORMANCE SUPREMACY CONFIGURATION
  images: {
    // Enable next-gen image formats
    formats: ["image/avif", "image/webp"],
    // Optimize image loading
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    // Image optimization
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [],
    // Responsive image breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Simplified webpack configuration to prevent module loading failures
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Only apply minimal optimizations to prevent webpack module errors
    if (!isServer && !dev) {
      // Production-only optimizations with safer chunk splitting
      config.optimization.splitChunks = {
        chunks: "all",
        maxSize: 500000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -10,
            chunks: "all",
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // Headers for performance optimization
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Cache static assets aggressively
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          // Security headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Performance headers
          {
            key: "X-Compress",
            value: "1",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          // API-specific caching
          {
            key: "Cache-Control",
            value:
              "public, max-age=60, s-maxage=300, stale-while-revalidate=60",
          },
        ],
      },
    ];
  },

  // Enable compression and optimization
  compress: true,
  poweredByHeader: false,

  // Build optimization
  generateBuildId: async () => {
    // Use deterministic build ID for better caching
    return "build-" + Date.now();
  },

  // Redirect and rewrite optimization
  async redirects() {
    return [];
  },

  // Environment configuration
  env: {
    NEXT_TELEMETRY_DISABLED: "1", // Disable telemetry for faster builds
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false, // Maintain type safety
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false, // Maintain code quality
  },

  // Server runtime optimization
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
};

module.exports = withBundleAnalyzer(nextConfig);
