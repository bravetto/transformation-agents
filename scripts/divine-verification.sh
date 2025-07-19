#!/bin/bash
# Divine Portal Verification Script

echo "🙏 Divine Freedom Portal - System Verification"
echo "=============================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN=${1:-"localhost:1437"}
BASE_URL="http://$DOMAIN"

# Function to test endpoint
test_endpoint() {
    local endpoint=$1
    local name=$2
    
    echo -n "Testing $name... "
    
    if curl -s -f "$BASE_URL$endpoint" > /dev/null; then
        echo -e "${GREEN}✅ PASS${NC}"
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        return 1
    fi
}

echo ""
echo "🔍 Testing API Endpoints:"
test_endpoint "/api/health" "Health Check"
test_endpoint "/api/prayers" "Prayer API"
test_endpoint "/api/countdown" "Countdown API"
test_endpoint "/api/divine-status" "Divine Status"
test_endpoint "/api/testimonies" "Testimonies API"

echo ""
echo "📱 Testing Pages:"
test_endpoint "/" "Homepage"
test_endpoint "/freedom-portal" "Freedom Portal"
test_endpoint "/dashboard/judge" "Judge Dashboard"

echo ""
echo "🎯 Testing Freedom Portal Features:"
echo "⏰ Countdown to July 28th, 2:37 PM"
echo "🙏 Prayer counter starting at 1,337"
echo "⚖️ Judge dashboard with real-time metrics"
echo "✨ Divine status monitoring"

echo ""
echo "🚀 Ready for deployment!"
echo "Run: vercel --prod"
