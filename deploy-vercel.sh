#!/bin/bash

# JAHmere Webb Freedom Portal - Vercel Deployment Script
# This script deploys the application to Vercel with proper configuration

echo "🚀 Deploying JAHmere Webb Freedom Portal to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel@latest
fi

# Set project name and configuration
export VERCEL_PROJECT_NAME="jahmere-webb-freedom-portal"
export VERCEL_ORG_ID="${VERCEL_ORG_ID:-}"

echo "📦 Building production-ready application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Deploying to Vercel..."
    
    # Deploy with environment variables
    vercel --prod \
        --name "$VERCEL_PROJECT_NAME" \
        --env NEXT_PUBLIC_POSTHOG_KEY="$NEXT_PUBLIC_POSTHOG_KEY" \
        --env NEXT_PUBLIC_POSTHOG_HOST="$NEXT_PUBLIC_POSTHOG_HOST" \
        --confirm
        
    echo "✅ Deployment complete!"
    echo "🌐 Visit your application at the URL provided above"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi 