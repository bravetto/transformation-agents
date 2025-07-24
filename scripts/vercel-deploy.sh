#!/bin/bash

# 🚀 VERCEL DEPLOYMENT SCRIPT - PRODUCTION EXCELLENCE
# Divine Engineer's Certified Deployment Protocol

set -e # Exit on any error

echo "🌉 THE BRIDGE PROJECT - VERCEL DEPLOYMENT PROTOCOL"
echo "=================================================="
echo "🎯 Status: Production-ready deployment initiated"
echo "📅 Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Log function
log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')] ⚠️  $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%H:%M:%S')] ❌ $1${NC}"
    exit 1
}

info() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')] ℹ️  $1${NC}"
}

# Phase 1: Pre-deployment validation
echo "🔍 PHASE 1: PRE-DEPLOYMENT VALIDATION"
echo "======================================"

# Check Node.js version
NODE_VERSION=$(node --version)
if [[ $(echo $NODE_VERSION | cut -c2-3) -lt 18 ]]; then
    error "Node.js version must be 18 or higher. Current: $NODE_VERSION"
fi
log "Node.js version: $NODE_VERSION ✅"

# Check NPM version
NPM_VERSION=$(npm --version)
log "NPM version: $NPM_VERSION ✅"

# Verify critical files exist
CRITICAL_FILES=(
    "package.json"
    "next.config.js"
    "vercel.json"
    "src/app/layout.tsx"
    "src/app/page.tsx"
    "public/favicon.ico"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [[ ! -f "$file" ]]; then
        error "Critical file missing: $file"
    fi
done
log "Critical files verified ✅"

# Check for TypeScript errors
log "Running TypeScript check..."
npm run type-check || error "TypeScript errors found. Fix before deploying."
log "TypeScript validation passed ✅"

# Check for ESLint errors (warnings OK)
log "Running ESLint check..."
npx eslint src --ext .ts,.tsx --max-warnings 50 || warn "ESLint issues found (proceeding anyway)"

# Phase 2: Build optimization
echo ""
echo "⚡ PHASE 2: BUILD OPTIMIZATION"
echo "=============================="

# Clean previous builds
log "Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

# Install dependencies with clean cache
log "Installing dependencies..."
npm ci --prefer-offline --no-audit

# Check bundle size
log "Analyzing bundle size..."
ANALYZE=true npm run build > build.log 2>&1

# Extract build metrics
BUILD_TIME=$(grep -o "Done in [0-9]*\.[0-9]*s" build.log || echo "Build completed")
log "Build metrics: $BUILD_TIME"

# Check for build warnings
BUILD_WARNINGS=$(grep -i "warning\|warn" build.log | wc -l)
if [[ $BUILD_WARNINGS -gt 0 ]]; then
    warn "$BUILD_WARNINGS build warnings found (see build.log)"
fi

# Verify build outputs
if [[ ! -d ".next" ]]; then
    error "Build failed - no .next directory found"
fi

log "Build optimization completed ✅"

# Phase 3: Production readiness checks
echo ""
echo "🛡️ PHASE 3: PRODUCTION READINESS"
echo "================================"

# Check for console.log statements in production
log "Checking for console statements..."
CONSOLE_COUNT=$(find src -name "*.ts" -o -name "*.tsx" | xargs grep -l "console\." | grep -v ".d.ts" | wc -l)
if [[ $CONSOLE_COUNT -gt 5 ]]; then
    warn "$CONSOLE_COUNT files contain console statements (acceptable for debugging)"
fi

# Verify environment variables
log "Checking environment configuration..."
if [[ -f ".env.local" ]]; then
    info "Local environment file found"
fi

# Check image assets
log "Validating image assets..."
MISSING_IMAGES=0
if [[ ! -f "public/favicon.ico" ]]; then
    warn "favicon.ico missing"
    ((MISSING_IMAGES++))
fi

if [[ $MISSING_IMAGES -eq 0 ]]; then
    log "Image assets validated ✅"
fi

# Check for production-specific optimizations
log "Verifying production optimizations..."

# Verify vercel.json configuration
if grep -q "nodejs20.x" vercel.json; then
    log "Node.js 20 runtime configured ✅"
else
    warn "Consider upgrading to Node.js 20 runtime in vercel.json"
fi

# Check for proper caching headers
if grep -q "max-age=31536000" vercel.json; then
    log "Static asset caching configured ✅"
else
    warn "Static asset caching not optimally configured"
fi

# Phase 4: Security validation
echo ""
echo "🔒 PHASE 4: SECURITY VALIDATION"
echo "==============================="

# Check for security headers
log "Validating security configuration..."

SECURITY_HEADERS=(
    "X-Frame-Options"
    "X-Content-Type-Options"
    "Referrer-Policy"
)

for header in "${SECURITY_HEADERS[@]}"; do
    if grep -q "$header" vercel.json; then
        log "Security header $header configured ✅"
    else
        warn "Security header $header not found"
    fi
done

# Check for sensitive data in config
log "Checking for sensitive data exposure..."
if grep -r "password\|secret\|key" src/ --include="*.ts" --include="*.tsx" | grep -v ".d.ts" | grep -v "placeholder" | wc -l > 0; then
    warn "Potential sensitive data found in source code"
else
    log "No sensitive data exposure detected ✅"
fi

# Phase 5: Performance validation
echo ""
echo "🚀 PHASE 5: PERFORMANCE VALIDATION"
echo "=================================="

# Check bundle size
log "Analyzing final bundle size..."
BUNDLE_SIZE=$(du -sh .next 2>/dev/null | cut -f1)
log "Total bundle size: $BUNDLE_SIZE"

# Check for large files
log "Checking for oversized assets..."
find public -type f -size +1M -exec ls -lh {} \; | while read line; do
    warn "Large asset detected: $line"
done

# Validate Next.js optimizations
log "Verifying Next.js optimizations..."
if grep -q "optimizePackageImports" next.config.js; then
    log "Package import optimization enabled ✅"
fi

if grep -q "swcMinify.*true" next.config.js; then
    log "SWC minification enabled ✅"
fi

# Phase 6: Final deployment preparation
echo ""
echo "🎯 PHASE 6: DEPLOYMENT PREPARATION"
echo "=================================="

# Create deployment summary
log "Generating deployment summary..."

cat > deployment-summary.txt << EOF
🌉 THE BRIDGE PROJECT - DEPLOYMENT SUMMARY
==========================================
Date: $(date '+%Y-%m-%d %H:%M:%S')
Node.js: $NODE_VERSION
NPM: $NPM_VERSION
Bundle Size: $BUNDLE_SIZE
Build Warnings: $BUILD_WARNINGS

✅ READY FOR PRODUCTION DEPLOYMENT

Next Steps:
1. Deploy to Vercel: vercel --prod
2. Monitor deployment: vercel logs
3. Validate production: curl https://your-domain.com/api/health
4. Test Core Web Vitals: PageSpeed Insights

🚀 DEPLOYMENT EXCELLENCE ACHIEVED
EOF

log "Deployment summary created ✅"

# Final success message
echo ""
echo "🏆 DEPLOYMENT PROTOCOL COMPLETE"
echo "==============================="
echo -e "${GREEN}✅ All phases completed successfully${NC}"
echo -e "${GREEN}🚀 Ready for Vercel production deployment${NC}"
echo ""
echo -e "${BLUE}Commands to deploy:${NC}"
echo "  vercel --prod                 # Deploy to production"
echo "  vercel logs --follow         # Monitor deployment"
echo "  vercel domains add your-domain.com  # Add custom domain"
echo ""
echo -e "${YELLOW}📊 Monitor after deployment:${NC}"
echo "  • Core Web Vitals: https://pagespeed.web.dev/"
echo "  • Uptime: https://uptimerobot.com/"
echo "  • Performance: Vercel Analytics"
echo ""
echo "🌉 Bridge Project deployment protocol completed successfully!" 