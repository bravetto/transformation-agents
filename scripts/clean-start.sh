#!/bin/bash
# 🛡️ Clean Start Protocol - Prevents Cascade Failures
# Bridge Project State Protection System

echo "🧹 Initiating Bridge Project clean start protocol..."

# Kill any existing Next.js processes
echo "🔄 Stopping existing development servers..."
pkill -f "next dev" || true
sleep 2

# Clear ALL cache locations to prevent state corruption
echo "🗑️  Clearing cache systems..."
rm -rf .next
rm -rf node_modules/.cache  
rm -rf .next/cache
rm -rf .swc

# Clear potentially corrupted browser storage warning
echo "⚠️  MANUAL ACTION REQUIRED:"
echo "   Clear browser localStorage/sessionStorage on first load"
echo "   Press F12 → Application → Storage → Clear All"

# Validate environment
echo "🔍 Validating environment..."
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in Bridge Project root directory"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Set preferred port (1437 = proven clean state)
export PORT=${PORT:-1437}

echo "🚀 Starting clean server on port $PORT"
echo "🌐 URL: http://localhost:$PORT"
echo "📊 Analytics: http://localhost:$PORT/analytics-dashboard"
echo ""
echo "✅ Clean start protocol complete"
echo "🎯 System ready for championship development"

# Start with clean environment
PORT=$PORT npm run dev 