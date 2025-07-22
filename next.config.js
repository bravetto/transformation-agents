const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 TURBOPACK CONFIGURATION FOR MODULE RESOLUTION (2025 BEST PRACTICE)
  turbopack: {
    // Help Turbopack find Next.js package
    resolveAlias: {
      // Ensure Next.js is resolved correctly
      next: require.resolve("next"),
    },
    // Additional module resolution settings
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  // 🖼️ ADVANCED IMAGE OPTIMIZATION (2025 STANDARD)
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 📦 SERVER EXTERNAL PACKAGES (2025 BEST PRACTICE)
  serverExternalPackages: ["@prisma/client"],

  experimental: {
    // Next.js 15.4 Production Optimizations
    optimizeCss: true,
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "@radix-ui/react-tooltip",
    ],
    // Advanced 2025 Performance Features
    typedRoutes: false, // Keep false until fully stable
    // Performance Features from Research
    webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB", "INP"],
  },

  // 🛡️ PRODUCTION SECURITY & PERFORMANCE HEADERS (2025 STANDARD)
  async headers() {
    return [
      {
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
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(png|jpg|jpeg|gif|svg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  // Turbopack configuration (moved from experimental as it's now stable)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
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

  // 🚀 TURBOPACK OPTIMIZATION: Remove webpack config when using Turbopack
  // Turbopack handles chunk splitting and optimizations natively

  // Configure Turbopack-specific options
  turbopack: {
    // Turbopack handles module resolution and bundling automatically
    // Better performance than manual webpack configuration
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
    // Use git commit hash for better caching consistency
    if (process.env.VERCEL_GIT_COMMIT_SHA) {
      return process.env.VERCEL_GIT_COMMIT_SHA;
    }
    // Fallback for local development
    return "build-" + Date.now();
  },

  // SWC minification is now enabled by default in Next.js 15
  // swcMinify: true, // Removed - now default

  // Production optimizations
  ...(process.env.NODE_ENV === "production" && {
    compiler: {
      removeConsole: {
        exclude: ["error", "warn"],
      },
    },
    modularizeImports: {
      "@/components/ui": {
        transform: "@/components/ui/{{member}}",
        preventFullImport: true,
      },
      "lucide-react": {
        transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
        preventFullImport: true,
      },
    },
  }),

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
