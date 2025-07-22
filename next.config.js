const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB", "INP"],
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
