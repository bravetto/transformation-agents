/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Webpack configuration for better chunk handling
  webpack: (config, { dev, isServer }) => {
    // Optimize chunk splitting
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
          // Commons chunk for shared code
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
          // Shared vendor chunks
          shared: {
            name: (module, chunks) => {
              const hash = require("crypto")
                .createHash("sha1")
                .update(module.context)
                .digest("hex");
              return `shared-${hash.substring(0, 8)}`;
            },
            test: /[\\/]node_modules[\\/]/,
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // Improve module resolution and caching
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
    }

    // Optimize development experience
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };

      // Use memory cache in development
      config.cache = {
        type: "memory",
      };
    }

    return config;
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    esmExternals: true,
    webpackBuildWorker: true,
  },

  // Disable source maps in production for smaller builds
  productionBrowserSourceMaps: false,

  // Image optimization settings
  images: {
    domains: ["localhost"],
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

  // Redirects for service worker and manifest
  async redirects() {
    return [
      {
        source: "/manifest.json",
        destination: "/api/manifest",
        permanent: false,
      },
      {
        source: "/service-worker.js",
        destination: "/_next/static/service-worker.js",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
