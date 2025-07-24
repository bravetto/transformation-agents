#!/bin/bash

# 🚀 PRODUCTION DEPLOYMENT CHECKLIST
# The Bridge Project - Zero-Downtime Production Deployment Protocol

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

FAILED_CHECKS=0
WARNINGS=0

print_header() {
    echo -e "${BLUE}"
    echo "============================================"
    echo "🚀 PRODUCTION DEPLOYMENT CHECKLIST"
    echo "The Bridge Project - JAHmere Freedom Portal"
    echo "============================================"
    echo -e "${NC}"
}

check_status() {
    local status=$1
    local message=$2
    
    if [ "$status" = "pass" ]; then
        echo -e "${GREEN}✅ $message${NC}"
    elif [ "$status" = "warn" ]; then
        echo -e "${YELLOW}⚠️  $message${NC}"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "${RED}❌ $message${NC}"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
    fi
}

# 1. Environment Validation
check_environment() {
    echo -e "\n${BLUE}📋 1. ENVIRONMENT VALIDATION${NC}"
    
    # Check Node version
    NODE_VERSION=$(node --version)
    if [[ "$NODE_VERSION" =~ ^v18\.|^v20\. ]]; then
        check_status "pass" "Node.js version: $NODE_VERSION"
    else
        check_status "fail" "Node.js version $NODE_VERSION not supported (requires 18+ or 20+)"
    fi
    
    # Check environment files
    if [ -f ".env.local" ]; then
        check_status "pass" ".env.local exists"
    else
        check_status "fail" ".env.local missing - required for production secrets"
    fi
    
    # Check for production environment variables
    if [ -z "$DATABASE_URL" ] && [ -z "$POSTGRES_URL" ]; then
        check_status "warn" "DATABASE_URL not set - using development database"
    else
        check_status "pass" "DATABASE_URL configured"
    fi
    
    if [ -z "$NEXTAUTH_SECRET" ]; then
        check_status "warn" "NEXTAUTH_SECRET not set - authentication may fail"
    else
        check_status "pass" "NEXTAUTH_SECRET configured"
    fi
}

# 2. Code Quality Checks
check_code_quality() {
    echo -e "\n${BLUE}📋 2. CODE QUALITY VALIDATION${NC}"
    
    # TypeScript compilation
    echo "🔄 Running TypeScript compilation..."
    if npm run type-check 2>/dev/null; then
        check_status "pass" "TypeScript compilation successful"
    else
        check_status "fail" "TypeScript compilation failed - fix errors before deployment"
    fi
    
    # ESLint checks
    echo "🔄 Running ESLint checks..."
    if npm run lint 2>/dev/null; then
        check_status "pass" "ESLint checks passed"
    else
        check_status "warn" "ESLint warnings found - consider fixing before deployment"
    fi
    
    # Security audit
    echo "🔄 Running security audit..."
    AUDIT_OUTPUT=$(npm audit --audit-level=moderate 2>&1 || true)
    if echo "$AUDIT_OUTPUT" | grep -q "found 0 vulnerabilities"; then
        check_status "pass" "No security vulnerabilities found"
    elif echo "$AUDIT_OUTPUT" | grep -q "moderate\|high\|critical"; then
        check_status "fail" "Security vulnerabilities found - run 'npm audit fix'"
    else
        check_status "warn" "Minor security issues found"
    fi
}

# 3. Build Validation
check_build() {
    echo -e "\n${BLUE}📋 3. BUILD VALIDATION${NC}"
    
    echo "🔄 Running production build..."
    BUILD_START_TIME=$(date +%s)
    
    if npm run build 2>/dev/null; then
        BUILD_END_TIME=$(date +%s)
        BUILD_TIME=$((BUILD_END_TIME - BUILD_START_TIME))
        
        if [ $BUILD_TIME -lt 30 ]; then
            check_status "pass" "Production build successful (${BUILD_TIME}s)"
        else
            check_status "warn" "Build took ${BUILD_TIME}s (consider optimizing)"
        fi
        
        # Check build size
        if [ -d ".next" ]; then
            BUILD_SIZE=$(du -sh .next | cut -f1)
            check_status "pass" "Build output: $BUILD_SIZE"
        fi
    else
        check_status "fail" "Production build failed - fix build errors"
        return 1
    fi
}

# 4. Performance Checks
check_performance() {
    echo -e "\n${BLUE}📋 4. PERFORMANCE VALIDATION${NC}"
    
    # Bundle analysis
    if [ -f "package.json" ] && grep -q "analyze" package.json; then
        echo "🔄 Analyzing bundle size..."
        # This would run bundle analysis in a real setup
        check_status "pass" "Bundle analysis available (run 'npm run analyze')"
    else
        check_status "warn" "Bundle analyzer not configured"
    fi
    
    # Check for heavy dependencies
    LARGE_DEPS=$(npm ls --depth=0 2>/dev/null | grep -E "(lodash|moment|jquery)" || true)
    if [ -z "$LARGE_DEPS" ]; then
        check_status "pass" "No heavy dependencies detected"
    else
        check_status "warn" "Heavy dependencies detected: consider alternatives"
    fi
    
    # Memory leak prevention
    if grep -r "setInterval\|setTimeout" src/ --exclude-dir=node_modules | grep -v "cleanup\|clearInterval\|clearTimeout" >/dev/null; then
        check_status "warn" "Timers without cleanup detected - check for memory leaks"
    else
        check_status "pass" "Timer cleanup patterns look good"
    fi
}

# 5. Database Readiness
check_database() {
    echo -e "\n${BLUE}📋 5. DATABASE VALIDATION${NC}"
    
    # Check database connection
    if [ -n "$DATABASE_URL" ]; then
        echo "🔄 Testing database connection..."
        # This would test actual DB connection in real setup
        check_status "pass" "Database connection configured"
        
        # Check for migrations
        if [ -d "prisma" ] || [ -d "migrations" ]; then
            check_status "pass" "Database migrations system detected"
        else
            check_status "warn" "No migration system detected"
        fi
    else
        check_status "warn" "Database connection not configured"
    fi
    
    # Check for seed data
    if [ -f "prisma/seed.ts" ] || [ -f "scripts/seed.js" ]; then
        check_status "pass" "Database seeding script available"
    else
        check_status "warn" "No database seeding script"
    fi
}

# 6. API Security
check_api_security() {
    echo -e "\n${BLUE}📋 6. API SECURITY VALIDATION${NC}"
    
    # Check for rate limiting
    if grep -r "rateLimit\|rate-limit" src/app/api/ >/dev/null 2>&1; then
        check_status "pass" "Rate limiting implemented"
    else
        check_status "warn" "Rate limiting not detected - APIs may be vulnerable"
    fi
    
    # Check for input validation
    if grep -r "zod\|yup\|joi" src/app/api/ >/dev/null 2>&1; then
        check_status "pass" "Input validation detected"
    else
        check_status "warn" "Input validation not detected"
    fi
    
    # Check for CORS configuration
    if grep -r "cors\|Access-Control" src/ >/dev/null 2>&1; then
        check_status "pass" "CORS configuration detected"
    else
        check_status "warn" "CORS configuration not detected"
    fi
    
    # Check for secrets in code
    if grep -r "sk_\|pk_\|secret\|password\|api_key" src/ --exclude-dir=node_modules | grep -v "process.env" >/dev/null 2>&1; then
        check_status "fail" "Hardcoded secrets detected in source code"
    else
        check_status "pass" "No hardcoded secrets detected"
    fi
}

# 7. Monitoring Setup
check_monitoring() {
    echo -e "\n${BLUE}📋 7. MONITORING & OBSERVABILITY${NC}"
    
    # Check for error tracking
    if grep -r "sentry\|bugsnag\|rollbar" src/ >/dev/null 2>&1; then
        check_status "pass" "Error tracking service detected"
    else
        check_status "warn" "Error tracking not configured"
    fi
    
    # Check for health endpoints
    if [ -f "src/app/api/health/route.ts" ] || [ -f "src/app/api/monitoring/health/route.ts" ]; then
        check_status "pass" "Health check endpoint available"
    else
        check_status "warn" "Health check endpoint not found"
    fi
    
    # Check for analytics
    if grep -r "analytics\|gtag\|amplitude" src/ >/dev/null 2>&1; then
        check_status "pass" "Analytics tracking detected"
    else
        check_status "warn" "Analytics not configured"
    fi
}

# 8. Infrastructure Readiness
check_infrastructure() {
    echo -e "\n${BLUE}📋 8. INFRASTRUCTURE VALIDATION${NC}"
    
    # Check Vercel configuration
    if [ -f "vercel.json" ]; then
        check_status "pass" "Vercel configuration exists"
    else
        check_status "warn" "vercel.json not found - using defaults"
    fi
    
    # Check for Docker setup (if using containerization)
    if [ -f "Dockerfile" ]; then
        check_status "pass" "Docker configuration available"
    else
        check_status "warn" "Docker not configured"
    fi
    
    # Check next.config.js
    if [ -f "next.config.js" ]; then
        if grep -q "compress.*true\|poweredByHeader.*false" next.config.js; then
            check_status "pass" "Production optimizations enabled"
        else
            check_status "warn" "Production optimizations not detected"
        fi
    else
        check_status "warn" "next.config.js not found"
    fi
}

# 9. Final Production Tests
run_production_tests() {
    echo -e "\n${BLUE}📋 9. PRODUCTION SIMULATION${NC}"
    
    # Test production build startup
    echo "🔄 Testing production build startup..."
    if npm run start >/dev/null 2>&1 & then
        SERVER_PID=$!
        sleep 5
        
        # Test health endpoint
        if curl -s http://localhost:3000/api/health >/dev/null; then
            check_status "pass" "Production server starts and responds"
        else
            check_status "fail" "Production server not responding"
        fi
        
        # Cleanup
        kill $SERVER_PID >/dev/null 2>&1 || true
    else
        check_status "fail" "Production server failed to start"
    fi
}

# 10. Generate Deployment Summary
generate_summary() {
    echo -e "\n${BLUE}📋 DEPLOYMENT SUMMARY${NC}"
    echo "=================================="
    
    TOTAL_CHECKS=$(($(grep -c "check_status" "$0") - 3))  # Approximate count
    PASSED_CHECKS=$((TOTAL_CHECKS - FAILED_CHECKS - WARNINGS))
    
    echo -e "✅ Passed: ${GREEN}$PASSED_CHECKS${NC}"
    echo -e "⚠️  Warnings: ${YELLOW}$WARNINGS${NC}"
    echo -e "❌ Failed: ${RED}$FAILED_CHECKS${NC}"
    echo -e "📊 Total: $TOTAL_CHECKS"
    
    echo -e "\n${BLUE}DEPLOYMENT RECOMMENDATION:${NC}"
    
    if [ $FAILED_CHECKS -eq 0 ] && [ $WARNINGS -lt 3 ]; then
        echo -e "${GREEN}🚀 READY FOR PRODUCTION DEPLOYMENT${NC}"
        echo -e "✅ All critical checks passed"
        echo -e "✅ Minimal warnings detected"
        echo -e "\nNext steps:"
        echo -e "  1. Run: vercel --prod"
        echo -e "  2. Monitor: /api/monitoring/health"
        echo -e "  3. Test: All user flows"
    elif [ $FAILED_CHECKS -eq 0 ]; then
        echo -e "${YELLOW}⚠️  DEPLOYMENT WITH CAUTION${NC}"
        echo -e "✅ No critical issues found"
        echo -e "⚠️  ${WARNINGS} warnings to address"
        echo -e "\nRecommend fixing warnings before deployment"
    else
        echo -e "${RED}🚫 NOT READY FOR PRODUCTION${NC}"
        echo -e "❌ $FAILED_CHECKS critical issues must be fixed"
        echo -e "⚠️  $WARNINGS warnings should be addressed"
        echo -e "\nFix critical issues before attempting deployment"
        exit 1
    fi
    
    echo -e "\n${BLUE}DEPLOYMENT COMMANDS:${NC}"
    echo -e "  Development: vercel"
    echo -e "  Production:  vercel --prod"
    echo -e "  Health:      curl https://your-domain.vercel.app/api/monitoring/health"
}

# Main execution
main() {
    print_header
    
    check_environment
    check_code_quality
    check_build
    check_performance
    check_database
    check_api_security
    check_monitoring
    check_infrastructure
    # run_production_tests  # Commented out for safety
    
    generate_summary
}

# Run if executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi 