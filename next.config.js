/** @type {import('next').NextConfig} */
const nextConfig = {
  // DIVINE ENGINEERING: Turbopack Error Prevention Strategy
  experimental: {
    // Disable Turbopack temporarily due to critical chunk loading errors
    // Based on research: Next.js 15.4.3 has known issues with "Identifier 'x' has already been declared"
    // Reference: https://github.com/vercel/next.js/issues/68974

    // Enable browser debug info for better error tracking
    browserDebugInfoInTerminal: true,

    // Optimize for production stability over bleeding edge features
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@next/third-parties",
    ],

    // Enable persistent caching for standard webpack (more stable)
    webpackBuildWorker: true,

    // Disable experimental features that can cause chunk conflicts
    turbopackPersistentCaching: false,

    // Enhanced error recovery
    serverComponentsHmrCache: false,
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false, // Disable for performance

  // Advanced caching strategies for Next.js 15.4.3
  experimental: {
    // Next.js 15.4.3 stable features
    staleTimes: {
      dynamic: 0, // Fresh data for dynamic routes (championship setting)
      static: 300, // 5 minute cache for static content
    },

    // CSS and bundle optimizations
    optimizeCss: true,
    webVitalsAttribution: ["CLS", "LCP", "INP"],

    // Package import optimizations for common libraries
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-icons",
      "next/font",
      "@radix-ui/react-slot",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
    ],

    // Enable browser debug info forwarding
    browserDebugInfoInTerminal: true,
  },

  // Image optimization with 2024 best practices
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
  },

  // Advanced bundling optimization (removed webpack config to avoid Turbopack conflicts)

  // Enhanced headers for performance and security
  async headers() {
    return [
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
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
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
