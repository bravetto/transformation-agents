/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    // Add your production domain when ready
    // domains: ['images.unsplash.com', 'thebridgeproject.org'],
  },
  // Production optimizations
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  
  // Security headers are in vercel.json
};

module.exports = nextConfig;
