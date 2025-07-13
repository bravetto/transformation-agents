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
  images: {
    domains: ["images.unsplash.com"],
    // Add your production domain when ready
    // domains: ['images.unsplash.com', 'thebridgeproject.org'],
  },
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // Security headers are in vercel.json

  // Disable static optimization for dynamic pages
  output: "standalone",
};

module.exports = nextConfig;
