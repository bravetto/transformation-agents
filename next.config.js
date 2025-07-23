/** @type {import('next').NextConfig} */
const nextConfig = {
  // 📦 SERVER EXTERNAL PACKAGES
  serverExternalPackages: ["@prisma/client"],

  // 🚀 TURBOPACK CONFIGURATION (SIMPLIFIED - BUILT-IN CSS PROCESSING)
  experimental: {
    // ✅ STABLE FEATURES ONLY (Next.js 15.4.3 compatible)
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // 🔧 TURBOPACK RULES (SIMPLIFIED FOR BUILT-IN SUPPORT)
  turbopack: {
    rules: {
      // CSS processing handled automatically by Turbopack
      // No need to specify postcss-loader explicitly
    },
    resolveAlias: {
      "@": "./src",
    },
  },

  // 🔧 WEBPACK CONFIGURATION FALLBACK
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Ensure PostCSS is properly configured for both webpack and turbopack
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },

  // 📊 PERFORMANCE OPTIMIZATIONS
  compress: true,
  poweredByHeader: false,

  // 🌐 HEADERS FOR PRODUCTION PERFORMANCE
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
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
