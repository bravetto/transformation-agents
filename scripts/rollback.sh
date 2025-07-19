#!/bin/bash
# Rollback to previous deployment

echo "🔄 Rolling back Freedom Portal deployment..."
echo "=========================================="

# List recent deployments
echo "Recent deployments:"
vercel ls

echo ""
echo "To rollback to a specific deployment:"
echo "1. Copy the deployment URL from above"
echo "2. Run: vercel alias set [DEPLOYMENT_URL] [YOUR_DOMAIN]"
echo ""
echo "Example: vercel alias set july28freedom-abc123.vercel.app july28freedom.vercel.app" 