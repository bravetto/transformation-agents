#!/bin/bash
# Quick deployment script

echo "🚀 Quick Deployment to Vercel"
echo "============================"

# Check if production flag is passed
if [ "$1" == "--prod" ]; then
    echo "Deploying to PRODUCTION..."
    vercel --prod
else
    echo "Deploying to PREVIEW..."
    vercel
fi

echo ""
echo "✅ Deployment complete!"
echo "Check your Vercel dashboard for the URL" 