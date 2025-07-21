#!/bin/bash
# Monitor the live deployment

DOMAIN=${1:-"july28freedom.vercel.app"}

echo "🔍 Monitoring Freedom Portal at: $DOMAIN"
echo "========================================"

# Function to check endpoint
check_endpoint() {
    local endpoint=$1
    local start_time=$(date +%s%N)
    local http_code=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN$endpoint")
    local end_time=$(date +%s%N)
    local duration=$(( ($end_time - $start_time) / 1000000 ))
    
    if [ "$http_code" == "200" ]; then
        echo "✅ $endpoint - Status: $http_code - Time: ${duration}ms"
    else
        echo "❌ $endpoint - Status: $http_code"
    fi
}

# Check main endpoints
check_endpoint "/freedom-portal"
check_endpoint "/api/health"
check_endpoint "/api/prayers"

echo ""
echo "📊 Monitoring complete!" 