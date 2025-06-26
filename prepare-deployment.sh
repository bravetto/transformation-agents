#!/bin/bash

echo "🌉 THE BRIDGE PROJECT - Deployment Preparation"
echo "============================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the-bridge directory"
    exit 1
fi

echo "📋 Pre-deployment Checklist:"
echo ""

# Check for Node.js
echo -n "✓ Checking Node.js... "
if command -v node &> /dev/null; then
    echo "$(node --version)"
else
    echo "❌ Not found"
fi

# Check for npm
echo -n "✓ Checking npm... "
if command -v npm &> /dev/null; then
    echo "$(npm --version)"
else
    echo "❌ Not found"
fi

# Check for Git
echo -n "✓ Checking Git... "
if command -v git &> /dev/null; then
    echo "$(git --version)"
else
    echo "❌ Not found"
fi

echo ""
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "📦 Git Commands for Deployment:"
echo "================================"
echo ""
echo "# Stage all changes"
echo "git add ."
echo ""
echo "# Commit with a meaningful message"
echo "git commit -m \"feat: The Bridge Project - Initial deployment\""
echo ""
echo "# Push to GitHub"
echo "git push origin main"
echo ""
echo "# Create a tag for this release"
echo "git tag -a v0.1.0 -m \"Initial beta release\""
echo "git push origin v0.1.0"
echo ""
echo "🚀 Deployment Options:"
echo "====================="
echo ""
echo "1. Deploy to Vercel:"
echo "   - Visit: https://vercel.com/new"
echo "   - Import your GitHub repository"
echo "   - Deploy with one click!"
echo ""
echo "2. Deploy to Netlify:"
echo "   - Visit: https://app.netlify.com/start"
echo "   - Connect your GitHub repository"
echo "   - Deploy automatically!"
echo ""
echo "📝 Remember to:"
echo "- Set up environment variables in your hosting platform"
echo "- Configure custom domain if desired"
echo "- Enable HTTPS (usually automatic)"
echo "- Set up monitoring and analytics"
echo ""
echo "✨ Good luck with your deployment! Building bridges, not walls. 🌉" 