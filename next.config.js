/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // TODO: Remove this for production - fix TypeScript errors first
    ignoreBuildErrors: true,
  },
  eslint: {
    // TODO: Remove this for production - fix ESLint errors first
    ignoreDuringBuilds: true,
  },

  // Exclude backup files from build
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    // Exclude .bak files from being processed
    config.module.rules.push({
      test: /\.bak$/,
      type: "asset/resource",
      generator: {
        emit: false,
      },
    });
    return config;
  },

  // Enhanced image optimization for performance
  images: {
    // Modern image formats for better compression
    formats: ["image/avif", "image/webp"],

    // Optimized device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Enable responsive images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Add your production domain when ready
      // {
      //   protocol: 'https',
      //   hostname: 'thebridgeproject.org',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },

  // Experimental features for performance
  experimental: {
    // Optimize CSS for faster loading
    optimizeCss: true,

    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-dialog",
    ],
  },

  // Production optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // Webpack optimizations for bundle splitting
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting for better caching
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate vendor chunks for better caching
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          // Separate heavy animation libraries
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|@react-spring)[\\/]/,
            name: "animations",
            chunks: "all",
            priority: 20,
          },
          // Separate UI component libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
            name: "ui",
            chunks: "all",
            priority: 15,
          },
        },
      };
    }

    return config;
  },

  // Security headers are in vercel.json

  // Disable static optimization for dynamic pages
  output: "standalone",
};

module.exports = nextConfig;
