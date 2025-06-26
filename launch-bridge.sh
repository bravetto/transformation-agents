#!/bin/bash

# 🔥 THE BRIDGE PROJECT LAUNCHER
# Never be confused again!

echo "🌉 THE BRIDGE PROJECT LAUNCHER 🌉"
echo "================================"
echo ""

# Colors for divine output
GOLD='\033[1;33m'
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Kill any existing processes on our ports
echo "🧹 Cleaning up existing processes..."
pkill -f "node.*3000" 2>/dev/null
pkill -f "node.*3001" 2>/dev/null
pkill -f "node.*3002" 2>/dev/null
pkill -f "node.*3003" 2>/dev/null
sleep 1

# Navigate to the correct directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${PURPLE}📍 Project Location:${NC} $SCRIPT_DIR"
echo ""

# Check if we're in the right place
if [ ! -f "package.json" ]; then
    echo -e "${GOLD}⚠️  ERROR: No package.json found!${NC}"
    echo "Make sure you're running this from The Bridge project directory."
    exit 1
fi

# Check project name
PROJECT_NAME=$(grep '"name"' package.json | head -1 | cut -d'"' -f4)
if [ "$PROJECT_NAME" != "the-bridge" ]; then
    echo -e "${GOLD}⚠️  WARNING: This might not be The Bridge project!${NC}"
    echo "Found project: $PROJECT_NAME"
    echo ""
fi

# Clean build and start
echo -e "${GREEN}🚀 Starting The Bridge Project...${NC}"
echo ""
rm -rf .next
npm run dev

# If npm run dev fails, try with explicit port
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${GOLD}💡 Trying alternative start method...${NC}"
    npx next dev -p 3000
fi 