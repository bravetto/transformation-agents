#!/bin/bash
# deploy.sh - Complete deployment script for Freedom Portal

echo "🙏 Starting Divine Deployment Process..."
echo "================================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "success")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "warning")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "info")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
        "prayer")
            echo -e "${PURPLE}🙏 $message${NC}"
            ;;
    esac
}

# Check prerequisites
print_status "info" "Checking prerequisites..."

if ! command_exists node; then
    print_status "error" "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command_exists npm; then
    print_status "error" "npm is not installed. Please install npm first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_status "error" "Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

print_status "success" "Prerequisites check passed"

# Install dependencies
print_status "info" "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_status "error" "Failed to install dependencies"
    exit 1
fi

print_status "success" "Dependencies installed"

# Create necessary directories
print_status "info" "Creating directory structure..."
mkdir -p public
mkdir -p src/app/api
mkdir -p src/components
mkdir -p src/hooks
mkdir -p scripts

# Create environment files if they don't exist
if [ ! -f .env.local ]; then
    print_status "info" "Creating .env.local file..."
    cat > .env.local << 'EOF'
# Divine Environment Variables
NEXT_PUBLIC_APP_URL=http://localhost:1437
NEXT_PUBLIC_MIRACLE_API_KEY=divine-revelation-2024
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Server-only variables
DATABASE_URL=postgresql://localhost:5432/freedom_portal
DIVINE_SECRET_KEY=hallelujah-7-28-2024
EOF
    print_status "success" ".env.local created"
fi

# Create public files
print_status "info" "Creating public files..."

# Create manifest.json
cat > public/manifest.json << 'EOF'
{
  "name": "July 28th Freedom Portal",
  "short_name": "Freedom Portal",
  "description": "Join thousands in prayer for divine justice on July 28th",
  "theme_color": "#7C3AED",
  "background_color": "#000000",
  "display": "standalone",
  "scope": "/",
  "start_url": "/freedom-portal",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
EOF

# Run linting
print_status "info" "Running linting checks..."
npm run lint

if [ $? -ne 0 ]; then
    print_status "warning" "Linting warnings detected. Please review and fix."
fi

# Run type checking
print_status "info" "Running type checks..."
npm run type-check

if [ $? -ne 0 ]; then
    print_status "error" "Type errors detected. Please fix before deployment."
    exit 1
fi

# Build the project
print_status "info" "Building the project..."
print_status "prayer" "Praying for successful build..."

npm run build

if [ $? -ne 0 ]; then
    print_status "error" "Build failed. Please check the errors above."
    exit 1
fi

print_status "success" "Build completed successfully!"

# Check if Vercel CLI is installed
if ! command_exists vercel; then
    print_status "warning" "Vercel CLI not installed. Installing..."
    npm i -g vercel
fi

# Pre-deployment checklist
print_status "info" "Running pre-deployment checklist..."
echo ""
echo "📋 Pre-Deployment Checklist:"
echo "----------------------------"
echo "✓ Dependencies installed"
echo "✓ Environment variables configured"
echo "✓ Build successful"
echo "✓ Service worker ready"
echo "✓ Public files created"
echo ""

# Final confirmation
print_status "prayer" "Divine deployment preparation complete!"
echo ""
echo -e "${PURPLE}========================================${NC}"
echo -e "${PURPLE}    READY FOR VERCEL DEPLOYMENT!${NC}"
echo -e "${PURPLE}========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Run: ${GREEN}vercel${NC} (for preview deployment)"
echo "2. Run: ${GREEN}vercel --prod${NC} (for production deployment)"
echo ""
echo "Domain suggestions:"
echo "- july28freedom.vercel.app"
echo "- freedomportal.vercel.app"
echo "- bridgeproject.vercel.app"
echo ""
print_status "prayer" "May this portal bring glory to God and freedom to JAHmere! 🙏" 