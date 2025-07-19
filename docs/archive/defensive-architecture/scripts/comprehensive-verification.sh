#!/bin/bash

# 🛡️ COMPREHENSIVE SYSTEM VERIFICATION
# Defensive Architecture - Complete Health Check
# 
# This script performs comprehensive validation including:
# - React hooks safety check
# - Browser console monitoring  
# - API health verification
# - Performance metrics
# - Build system validation

set -e

echo "🛡️  COMPREHENSIVE SYSTEM VERIFICATION"
echo "====================================="
echo "📅 $(date)"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "SUCCESS") echo -e "${GREEN}✅ $message${NC}" ;;
        "WARNING") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "ERROR") echo -e "${RED}❌ $message${NC}" ;;
        "INFO") echo -e "${BLUE}ℹ️  $message${NC}" ;;
    esac
}

# Function to check if server is running
check_server() {
    local port=$1
    if curl -s "http://localhost:$port/api/health" > /dev/null; then
        return 0
    else
        return 1
    fi
}

# Variables
PORT=${PORT:-1437}
VERIFICATION_FAILED=0

print_status "INFO" "Starting comprehensive verification on port $PORT"
echo ""

# Step 1: Check if development server is running
print_status "INFO" "Step 1: Checking development server..."
if check_server $PORT; then
    print_status "SUCCESS" "Development server is running on port $PORT"
else
    print_status "ERROR" "Development server is not running on port $PORT"
    print_status "INFO" "Please start the server with: PORT=$PORT npm run dev"
    exit 1
fi
echo ""

# Step 2: React Hooks Safety Check
print_status "INFO" "Step 2: React Hooks Safety Check..."
if npm run agents:hooks > hooks-check.log 2>&1; then
    violations=$(grep -o "setState-in-render violations found" hooks-check.log | wc -l || echo "0")
    if [ "$violations" -eq 0 ]; then
        print_status "SUCCESS" "No React hooks violations detected"
    else
        print_status "WARNING" "React hooks violations detected - see hooks-check.log"
        VERIFICATION_FAILED=1
    fi
else
    print_status "ERROR" "React hooks check failed"
    VERIFICATION_FAILED=1
fi
echo ""

# Step 3: API Health Check
print_status "INFO" "Step 3: API Health Verification..."
health_response=$(curl -s "http://localhost:$PORT/api/health" || echo "FAILED")
if [ "$health_response" != "FAILED" ]; then
    response_time=$(echo "$health_response" | jq -r '.responseTime' 2>/dev/null || echo "unknown")
    status=$(echo "$health_response" | jq -r '.status' 2>/dev/null || echo "unknown")
    
    if [ "$status" = "healthy" ]; then
        print_status "SUCCESS" "API health check passed (Response time: $response_time)"
    else
        print_status "ERROR" "API health check failed - Status: $status"
        VERIFICATION_FAILED=1
    fi
else
    print_status "ERROR" "Failed to connect to health API"
    VERIFICATION_FAILED=1
fi
echo ""

# Step 4: Critical Endpoint Tests
print_status "INFO" "Step 4: Testing critical endpoints..."

# Test analytics endpoint
analytics_test=$(curl -s -w "%{http_code}" -o /dev/null -X POST \
    "http://localhost:$PORT/api/analytics/user-journey" \
    -H "Content-Type: application/json" \
    -d '{"eventType":"verification_test","userType":"system","sessionId":"verification-test"}' || echo "000")

if [ "$analytics_test" = "200" ]; then
    print_status "SUCCESS" "Analytics endpoint responding correctly"
else
    print_status "ERROR" "Analytics endpoint failed (HTTP $analytics_test)"
    VERIFICATION_FAILED=1
fi

# Test homepage
homepage_test=$(curl -s -w "%{http_code}" -o /dev/null "http://localhost:$PORT/" || echo "000")
if [ "$homepage_test" = "200" ]; then
    print_status "SUCCESS" "Homepage responding correctly"
else
    print_status "ERROR" "Homepage failed (HTTP $homepage_test)"
    VERIFICATION_FAILED=1
fi
echo ""

# Step 5: Browser Console Monitoring (if puppeteer is available)
print_status "INFO" "Step 5: Browser Console Monitoring..."
if command -v node >/dev/null && [ -f "defensive-architecture/scripts/browser-console-monitor.js" ]; then
    if npm list puppeteer >/dev/null 2>&1; then
        if timeout 60 npm run agents:monitor:quick > browser-monitor.log 2>&1; then
            errors=$(grep "❌ Errors:" browser-monitor.log | grep -o "[0-9]*" || echo "unknown")
            status=$(grep "🏥 Status:" browser-monitor.log | awk '{print $3}' || echo "unknown")
            
            if [ "$status" = "HEALTHY" ]; then
                print_status "SUCCESS" "Browser console monitoring passed (0 errors)"
            else
                print_status "WARNING" "Browser console issues detected ($errors errors) - see browser-monitor.log"
                VERIFICATION_FAILED=1
            fi
        else
            print_status "WARNING" "Browser monitoring timed out or failed"
            VERIFICATION_FAILED=1
        fi
    else
        print_status "WARNING" "Puppeteer not installed - skipping browser console monitoring"
        print_status "INFO" "Install with: npm install --save-dev puppeteer"
    fi
else
    print_status "WARNING" "Browser monitoring script not found - skipping"
fi
echo ""

# Step 6: Build System Validation
print_status "INFO" "Step 6: Build System Validation..."
if npm run build > build-test.log 2>&1; then
    print_status "SUCCESS" "Production build completed successfully"
else
    print_status "ERROR" "Production build failed - see build-test.log"
    VERIFICATION_FAILED=1
fi
echo ""

# Step 7: Performance Metrics
print_status "INFO" "Step 7: Performance Metrics..."
if [ "$health_response" != "FAILED" ]; then
    uptime=$(echo "$health_response" | jq -r '.system.uptime' 2>/dev/null || echo "unknown")
    memory_used=$(echo "$health_response" | jq -r '.system.memory.heapUsed' 2>/dev/null || echo "unknown")
    
    print_status "INFO" "System uptime: ${uptime}s"
    print_status "INFO" "Memory usage: $memory_used bytes"
    
    # Check response time
    response_time_ms=$(echo "$response_time" | sed 's/ms//' || echo "999")
    if [ "$response_time_ms" -lt 100 ]; then
        print_status "SUCCESS" "Response time excellent: $response_time"
    elif [ "$response_time_ms" -lt 500 ]; then
        print_status "WARNING" "Response time acceptable: $response_time"
    else
        print_status "ERROR" "Response time too high: $response_time"
        VERIFICATION_FAILED=1
    fi
fi
echo ""

# Final Report
echo "📋 VERIFICATION SUMMARY"
echo "====================="
if [ $VERIFICATION_FAILED -eq 0 ]; then
    print_status "SUCCESS" "All verification checks passed!"
    print_status "SUCCESS" "System is ready for production"
    echo ""
    echo "🏆 DEFENSIVE ARCHITECTURE STATUS: OPERATIONAL"
    echo "🎯 Next steps: Monitor performance and continue development"
else
    print_status "ERROR" "Some verification checks failed"
    print_status "INFO" "Review the following log files for details:"
    [ -f hooks-check.log ] && echo "  - hooks-check.log (React hooks violations)"
    [ -f browser-monitor.log ] && echo "  - browser-monitor.log (Browser console errors)"
    [ -f build-test.log ] && echo "  - build-test.log (Build system issues)"
    echo ""
    echo "🛡️  DEFENSIVE ARCHITECTURE STATUS: ISSUES DETECTED"
    echo "🔧 Action required: Address failing checks before proceeding"
fi

echo ""
echo "📊 System Status Dashboard: http://localhost:$PORT/agents/performance"
echo "🏥 Health API: http://localhost:$PORT/api/health"

# Cleanup temporary files
rm -f hooks-check.log browser-monitor.log build-test.log

exit $VERIFICATION_FAILED 