/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Fix for framer-motion and other large dependency chunk errors
  webpack: (config, { dev, isServer }) => {
    // Optimize chunk splitting to prevent vendor chunk errors
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework chunks
          framework: {
            name: "framework",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Framer Motion specific handling
          framerMotion: {
            name: "framer-motion",
            test: /[\\/]node_modules[\\/](framer-motion|popmotion)[\\/]/,
            chunks: "all",
            priority: 30,
            enforce: true,
          },
          // Other large libraries
          lib: {
            test(module) {
              return (
                module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier())
              );
            },
            name(module) {
              const hash = require("crypto").createHash("sha1");
              hash.update(module.identifier());
              return hash.digest("hex").substring(0, 8);
            },
            priority: 20,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // Commons chunk
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
          // Shared modules
          shared: {
            name(module, chunks) {
              return "shared";
            },
            priority: 10,
            test: /[\\/]node_modules[\\/]/,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // Fix file system watching issues
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }

    // Disable filesystem cache in development to prevent ENOENT errors
    if (dev && !isServer) {
      config.cache = {
        type: "memory",
      };
    }

    return config;
  },

  // Experimental features
  experimental: {
    // Enable CSS optimization
    optimizeCss: true,
    // Improve module resolution
    esmExternals: true,
    // Better error handling in development
    webpackBuildWorker: true,
  },

  // Disable source maps in production for smaller builds
  productionBrowserSourceMaps: false,

  // Image optimization
  images: {
    domains: ["localhost", "transformation-agents-jahmere-bridge.vercel.app"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for common errors
  async redirects() {
    return [
      {
        source: "/manifest.json",
        destination: "/api/manifest",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
