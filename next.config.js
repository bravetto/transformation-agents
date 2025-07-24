/** @type {import('next').NextConfig} */
const nextConfig = {
  // Latest Next.js 15.4.3 with React 19 and Turbopack integration

  // Updated: serverComponentsExternalPackages moved to top level
  serverExternalPackages: ["prisma", "bcryptjs"],

  // Updated: Turbopack configuration (no longer experimental)
  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.js",
    },
    // Fix hot reload instability
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  experimental: {
    // Enhanced streaming for better performance
    serverActions: {
      allowedOrigins: ["localhost:1357", "july28freedom.vercel.app"],
    },

    // Enhanced caching for divine performance (merged configuration)
    staleTimes: {
      dynamic: 0, // Fresh data for dynamic routes (championship setting)
      static: 300, // 5 minute cache for static content
    },

    // CSS and bundle optimizations
    optimizeCss: true,
    webVitalsAttribution: ["CLS", "LCP", "INP"],

    // 2025 Performance optimizations (merged and deduplicated)
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-popover",
      "@radix-ui/react-icons",
      "next/font",
      "@radix-ui/react-slot",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
    ],

    // Enable browser debug info forwarding
    browserDebugInfoInTerminal: true,
  },

  // Enhanced compiler options for React 19
  compiler: {
    // Remove console logs in production for divine cleanliness
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false, // Disable for performance

  // Development optimization to fix hot reload instability
  ...(process.env.NODE_ENV === "development" && {
    // Fix routes-manifest.json ENOENT errors
    generateBuildId: async () => {
      return "divine-development-build";
    },
  }),

  // Image optimization with 2024 best practices
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year for divine caching
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["images.unsplash.com", "picsum.photos"],
  },

  // Advanced bundling optimization (removed webpack config to avoid Turbopack conflicts)

  // Enhanced headers for performance and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Enhanced security headers for 2025
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
            value: "origin-when-cross-origin",
          },
          // Divine performance headers
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59",
          },
        ],
      },
      {
        source: "/images/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Optimized redirects for SEO
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
