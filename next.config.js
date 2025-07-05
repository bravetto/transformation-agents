/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // Old configuration that's now deprecated:
    // domains: ['images.unsplash.com'],
  },
  // Production optimizations
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  
  // Security headers are in vercel.json
};

module.exports = nextConfig;
