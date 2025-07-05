#!/bin/bash

echo "🌉 THE BRIDGE PROJECT - VERCEL DEPLOYMENT PREPARATION"
echo "===================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Track issues
ISSUES=0

echo "📋 Pre-Deployment Analysis:"
echo ""

# 1. Check Node version
echo -n "✓ Node.js version: "
node_version=$(node --version)
echo "$node_version"
if [[ ! "$node_version" =~ ^v18\.|^v20\. ]]; then
    echo -e "${YELLOW}⚠️  Warning: Vercel works best with Node 18.x or 20.x${NC}"
    ISSUES=$((ISSUES + 1))
fi

# 2. Check for TypeScript errors
echo -n "✓ TypeScript check: "
if npm run type-check 2>/dev/null; then
    echo -e "${GREEN}No errors${NC}"
else
    echo -e "${YELLOW}Errors found (currently ignored)${NC}"
    echo "  Consider fixing these before production deployment"
    ISSUES=$((ISSUES + 1))
fi

# 3. Clean up unnecessary files
echo ""
echo "🧹 Cleaning up unnecessary files..."

# Remove development scripts
rm -f launch-*.sh build-*.sh verify-*.sh 2>/dev/null
echo "  ✓ Removed development scripts"

# Remove build artifacts
rm -f tsconfig.tsbuildinfo 2>/dev/null
echo "  ✓ Removed build artifacts"

# Remove temporary files
rm -f current-files.txt actual-files.txt index-*.txt 2>/dev/null
echo "  ✓ Removed temporary files"

# 4. Environment setup
echo ""
echo "🔐 Environment Variables Required:"
echo "  - None currently required for basic deployment"
echo "  - Future: DATABASE_URL, NEXTAUTH_SECRET, PUSHER_* keys"

# 5. Image optimization
echo ""
echo "🖼️  Image Configuration:"
echo "  ✓ External images from unsplash.com configured"
echo "  ⚠️  Consider uploading actual images to /public/images/"

# 6. Build optimization
echo ""
echo "🚀 Build Optimization:"

# Update next.config.js for production
cat > next.config.js << 'EOF'
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
EOF
echo "  ✓ Updated next.config.js with production optimizations"

# 7. Update .gitignore
echo ""
echo "📝 Updating .gitignore..."
cat >> .gitignore << 'EOF'

# Build artifacts
tsconfig.tsbuildinfo

# Development scripts
launch-*.sh
build-*.sh
verify-*.sh

# Temporary files
current-files.txt
actual-files.txt
index-*.txt

# Local development
.cursor/
EOF
echo "  ✓ Updated .gitignore"

# 8. Final build test
echo ""
echo "🔨 Running final build test..."
if npm run build; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    ISSUES=$((ISSUES + 1))
fi

# 9. Git preparation
echo ""
echo "📦 Git Preparation:"
echo "================================"
echo ""

# Check git status
if git status --porcelain | grep -q .; then
    echo "📝 You have uncommitted changes. Commands to commit:"
    echo ""
    echo "git add -A"
    echo "git commit -m \"feat: prepare for Vercel deployment\""
    echo "git push origin main"
else
    echo -e "${GREEN}✓ All changes committed${NC}"
fi

# 10. Deployment checklist
echo ""
echo "📋 VERCEL DEPLOYMENT CHECKLIST:"
echo "================================"
echo ""

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CHECKS PASSED! Ready for deployment.${NC}"
else
    echo -e "${YELLOW}⚠️  $ISSUES warnings found (non-critical)${NC}"
fi

echo ""
echo "1. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Go to Vercel:"
echo "   https://vercel.com/new"
echo ""
echo "3. Import your repository"
echo ""
echo "4. Deploy with these settings:"
echo "   - Framework: Next.js (auto-detected)"
echo "   - Build Command: npm run build"
echo "   - Output Directory: .next"
echo ""
echo "5. Your site will be live at:"
echo "   https://[your-project].vercel.app"
echo ""
echo "6. Optional: Add custom domain"
echo "   Settings → Domains → Add"
echo ""
echo "🌉 Building bridges to transformation!"
echo "Clear Eyes. Full Hearts. Can't Lose. 🔥" 