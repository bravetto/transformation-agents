#!/bin/bash

# 🔍 REAL HEALTH CHECK
# Shows actual browser console errors like the ones in your screenshot
# This opens a browser and shows you what's really happening

echo "🔍 REAL HEALTH CHECK - Browser Console Monitor"
echo "=============================================="
echo "📅 $(date)"
echo ""
echo "🚨 This will open a browser window to monitor REAL console errors"
echo "⏳ Monitoring for 30 seconds..."
echo ""

# Check if server is running
if ! curl -s http://localhost:1437/api/health > /dev/null; then
    echo "❌ Server not running on port 1437"
    echo "💡 Start with: PORT=1437 npm run dev"
    exit 1
fi

echo "✅ Server is running on port 1437"
echo ""

# Check if puppeteer is installed
if ! npm list puppeteer >/dev/null 2>&1; then
    echo "⚠️  Puppeteer not installed - installing now..."
    npm install --save-dev puppeteer
fi

echo "🔍 Starting real browser console monitor..."
echo "📱 This will show the ACTUAL errors you see in browser console"
echo ""

# Run the real browser monitor
node defensive-architecture/scripts/real-browser-console-monitor.js http://localhost:1437 30000

echo ""
echo "📋 HEALTH CHECK COMPLETE"
echo "========================"
echo ""
echo "💡 To check API health: curl http://localhost:1437/api/health | jq"
echo "🔍 To run again: ./defensive-architecture/scripts/real-health-check.sh"
echo "📊 Performance dashboard: http://localhost:1437/agents/performance" 