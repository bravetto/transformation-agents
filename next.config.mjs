/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  poweredByHeader: false,
  compress: true,

  // Build performance
  swcMinify: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.posthog.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://app.posthog.com https://api.openai.com wss://app.posthog.com",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // Performance optimizations
  experimental: {
    // Stable features
    serverComponentsExternalPackages: ["@prisma/client"],
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "@radix-ui/react-icons",
    ],

    // Advanced caching
    staleTimes: {
      dynamic: 30,
      static: 180,
    },

    // Development improvements
    browserDebugInfoInTerminal: process.env.NODE_ENV === "development",

    // Future-ready features (use with caution)
    ...(process.env.ENABLE_EXPERIMENTAL_FEATURES === "true" && {
      dynamicIO: true,
      clientSegmentCache: true,
      turbopackPersistentCaching: true,
    }),
  },

  // Bundle analyzer
  ...(process.env.ANALYZE === "true" && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        };
      }
      return config;
    },
  }),

  // Edge runtime support
  serverRuntimeConfig: {
    // Server-only configuration
  },
  publicRuntimeConfig: {
    // Client-side configuration
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },

  // Environment variable validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Output configuration for different deployment targets
  ...(process.env.BUILD_STANDALONE === "true" && {
    output: "standalone",
  }),

  // Redirects for legacy URLs
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true,
      },
    ];
  },

  // TypeScript configuration
  typescript: {
    // Production builds will fail on type errors
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Production builds will fail on lint errors
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
