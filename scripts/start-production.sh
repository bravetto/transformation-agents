#!/bin/bash

echo "🌐 THE BRIDGE PROJECT - PRODUCTION SERVER"
echo "========================================"
echo ""

# Check if standalone build exists
if [ ! -d ".next/standalone" ]; then
  echo "❌ Error: No standalone build found"
  echo "📝 Run: ./scripts/build-production.sh first"
  exit 1
fi

# Set production environment
export NODE_ENV=production
export PORT=${PORT:-3000}

echo "🔧 Configuration:"
echo "  - Environment: $NODE_ENV"
echo "  - Port: $PORT"
echo ""

# Kill any existing process on the port
echo "🧹 Cleaning port $PORT..."
lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
sleep 2

# Start the standalone server
echo "🚀 Starting production server..."
cd .next/standalone

# Run server in background and capture PID
node server.js &
SERVER_PID=$!

# Store PID for later cleanup
echo $SERVER_PID > ../../production.pid

# Wait a moment for server to start
sleep 3

# Check if server started successfully
if ps -p $SERVER_PID > /dev/null; then
  echo ""
  echo "✅ PRODUCTION SERVER STARTED!"
  echo "📝 Process ID: $SERVER_PID"
  echo "🔗 Access at: http://localhost:$PORT"
  echo ""
  echo "To stop the server, run:"
  echo "  kill $(cat production.pid)"
else
  echo "❌ Server failed to start"
  exit 1
fi 