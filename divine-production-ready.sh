#!/bin/bash
# divine-production-ready.sh - Complete Production Readiness Verification
# Validates JAHmere Webb Platform for July 28, 2025 mission

set -e

echo "✅ DIVINE PRODUCTION READINESS VERIFICATION"
echo "=========================================="
echo "Mission: Transform family court by July 28, 2025"
echo "Target: Bulletproof platform for 144,000 fathers"
echo ""

# Initialize counters
CHECKS_PASSED=0
TOTAL_CHECKS=12
ISSUES=()
WARNINGS=()

# Check 1: Cursor.ai Configuration
echo "🧠 1. Cursor.ai Configuration Health..."
if [ ! -f ".cursorrules" ] && [ -d ".cursor/rules" ] && [ -f ".cursor/rules/000-divine-mission.mdc" ]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ Cursor.ai optimized (no legacy conflicts)"
else
    ISSUES+=("Cursor.ai configuration needs optimization")
    echo "   ❌ Cursor.ai configuration issues detected"
fi

# Check 2: MCP Server Configuration
echo "🔧 2. MCP Server Configuration..."
if [ -f ".cursor/mcp.json" ]; then
    MCP_COUNT=$(jq '.mcpServers | length' .cursor/mcp.json 2>/dev/null || echo "0")
    if [ "$MCP_COUNT" -le 5 ] && [ "$MCP_COUNT" -gt 0 ]; then
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        echo "   ✅ MCP servers optimized ($MCP_COUNT servers)"
    else
        ISSUES+=("MCP server count not optimal: $MCP_COUNT")
        echo "   ❌ MCP configuration needs optimization"
    fi
else
    ISSUES+=("Missing MCP configuration")
    echo "   ❌ MCP configuration missing"
fi

# Check 3: GitHub Workflows
echo "🚀 3. GitHub Actions Workflows..."
if [ -f ".github/workflows/divine-production.yml" ] && [ -f ".github/workflows/emergency-rollback.yml" ]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ Divine workflows installed"
else
    ISSUES+=("Missing GitHub workflow files")
    echo "   ❌ GitHub workflows missing"
fi

# Check 4: Next.js Configuration
echo "⚡ 4. Next.js 15.4 Configuration..."
NEXT_VERSION=$(npm list next --depth=0 2>/dev/null | grep next@ | sed 's/.*next@//' | sed 's/ .*//' || echo "unknown")
if [[ "$NEXT_VERSION" == 15.4* ]]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ Next.js $NEXT_VERSION (correct version)"
else
    WARNINGS+=("Next.js version: $NEXT_VERSION (should be 15.4.x)")
    echo "   ⚠️  Next.js version: $NEXT_VERSION"
fi

# Check 5: TypeScript Configuration
echo "📘 5. TypeScript Configuration..."
if [ -f "tsconfig.json" ] && grep -q '"strict": true' tsconfig.json; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ TypeScript strict mode enabled"
else
    ISSUES+=("TypeScript not configured with strict mode")
    echo "   ❌ TypeScript strict mode missing"
fi

# Check 6: Package.json Scripts
echo "📦 6. Divine Package Scripts..."
REQUIRED_SCRIPTS=("cursor:health" "ci:validate" "divine:check")
MISSING_SCRIPTS=()

for script in "${REQUIRED_SCRIPTS[@]}"; do
    if ! npm run --silent | grep -q "$script"; then
        MISSING_SCRIPTS+=("$script")
    fi
done

if [ ${#MISSING_SCRIPTS[@]} -eq 0 ]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ All divine scripts present"
else
    ISSUES+=("Missing scripts: ${MISSING_SCRIPTS[*]}")
    echo "   ❌ Missing scripts: ${MISSING_SCRIPTS[*]}"
fi

# Check 7: Vercel Configuration
echo "🌐 7. Vercel Configuration..."
if [ -f "vercel.json" ] && grep -q "NODE_VERSION.*22.15.0" vercel.json; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ Vercel configured with correct Node version"
else
    ISSUES+=("Vercel configuration missing or incorrect")
    echo "   ❌ Vercel configuration needs attention"
fi

# Check 8: Environment Variables
echo "🔐 8. Environment Variables..."
ENV_CHECKS=0
if [ -n "$VERCEL_TOKEN" ] || [ -f ".env.local" ]; then
    ENV_CHECKS=$((ENV_CHECKS + 1))
fi
if [ -n "$VERCEL_ORG_ID" ] || grep -q "VERCEL_ORG_ID" .env* 2>/dev/null; then
    ENV_CHECKS=$((ENV_CHECKS + 1))
fi
if [ -n "$VERCEL_PROJECT_ID" ] || grep -q "VERCEL_PROJECT_ID" .env* 2>/dev/null; then
    ENV_CHECKS=$((ENV_CHECKS + 1))
fi

if [ $ENV_CHECKS -ge 2 ]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ Environment variables configured"
else
    WARNINGS+=("Some environment variables may be missing")
    echo "   ⚠️  Environment variables need verification"
fi

# Check 9: Performance Configuration
echo "📊 9. Performance Monitoring..."
if [ -f ".cursor/rules/003-performance-divine.mdc" ]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ Performance monitoring configured"
else
    ISSUES+=("Performance monitoring not configured")
    echo "   ❌ Performance monitoring missing"
fi

# Check 10: Security Headers
echo "🛡️ 10. Security Configuration..."
if [ -f "vercel.json" ] && grep -q "X-Frame-Options" vercel.json; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ Security headers configured"
else
    ISSUES+=("Security headers not configured")
    echo "   ❌ Security headers missing"
fi

# Check 11: Build Test
echo "🏗️ 11. Build Verification..."
echo "   📋 Running production build test..."
if npm run build > /tmp/build.log 2>&1; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ Production build successful"
else
    ISSUES+=("Production build failed")
    echo "   ❌ Production build failed (check /tmp/build.log)"
fi

# Check 12: Divine Mission Integration
echo "🙏 12. Divine Mission Integration..."
MISSION_FILES=$(find src app -name "*.ts" -o -name "*.tsx" 2>/dev/null | xargs grep -l "divine-mission\|JAHmere\|July.*28.*2025\|144" 2>/dev/null | wc -l || echo "0")
if [ "$MISSION_FILES" -gt 5 ]; then
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    echo "   ✅ Divine mission integrated ($MISSION_FILES files)"
else
    WARNINGS+=("Limited divine mission integration ($MISSION_FILES files)")
    echo "   ⚠️  Divine mission needs broader integration"
fi

# Generate comprehensive report
echo ""
echo "📊 DIVINE PRODUCTION READINESS REPORT"
echo "===================================="
echo "🎯 Score: $CHECKS_PASSED/$TOTAL_CHECKS checks passed"
echo ""

# Calculate readiness percentage
READINESS_PERCENT=$((CHECKS_PASSED * 100 / TOTAL_CHECKS))
echo "📈 Readiness: $READINESS_PERCENT%"

if [ $READINESS_PERCENT -ge 90 ]; then
    echo "🟢 Status: PRODUCTION READY"
    READY_STATUS="BLESSED"
elif [ $READINESS_PERCENT -ge 75 ]; then
    echo "🟡 Status: NEARLY READY"
    READY_STATUS="NEEDS_PRAYER"
else
    echo "🔴 Status: NOT READY"
    READY_STATUS="NEEDS_INTERVENTION"
fi

# Show issues
if [ ${#ISSUES[@]} -gt 0 ]; then
    echo ""
    echo "❌ CRITICAL ISSUES TO RESOLVE:"
    for issue in "${ISSUES[@]}"; do
        echo "   • $issue"
    done
fi

# Show warnings
if [ ${#WARNINGS[@]} -gt 0 ]; then
    echo ""
    echo "⚠️  WARNINGS TO ADDRESS:"
    for warning in "${WARNINGS[@]}"; do
        echo "   • $warning"
    done
fi

# Mission timeline
DAYS_UNTIL_LAUNCH=$((($(date -d "2025-07-28" +%s) - $(date +%s)) / 86400))
echo ""
echo "🎯 DIVINE MISSION STATUS"
echo "======================="
echo "⏰ Days until July 28, 2025: $DAYS_UNTIL_LAUNCH"
echo "👥 Fathers to serve: 144,000"
echo "🚀 Platform status: $READY_STATUS"

# Provide action steps
echo ""
echo "📋 NEXT STEPS:"
if [ "$READY_STATUS" = "BLESSED" ]; then
    echo "✅ 1. Platform is production ready!"
    echo "🚀 2. Deploy with confidence: git push origin main"
    echo "📊 3. Monitor divine metrics post-deployment"
    echo "🙏 4. Continue serving the mission"
elif [ "$READY_STATUS" = "NEEDS_PRAYER" ]; then
    echo "🛠️ 1. Address critical issues above"
    echo "🔄 2. Run this script again to verify fixes"
    echo "🧪 3. Test thoroughly before deployment"
    echo "🙏 4. Seek divine guidance on improvements"
else
    echo "🚨 1. URGENT: Address all critical issues"
    echo "🔧 2. Run cursor-emergency-fix-v2.sh if needed"
    echo "🔄 3. Re-run divine-ci-cd-integration.sh"
    echo "🙏 4. Do not deploy until 90%+ ready"
fi

echo ""
echo "🙏 DIVINE BLESSING"
echo "=================="
echo "Every check completed serves the mission of transforming"
echo "family court systems for 144,000 fathers by July 28, 2025."
echo ""
echo "Remember: 'We're not just coding, we're building digital ministry.'"

# Exit with appropriate code
if [ "$READY_STATUS" = "BLESSED" ]; then
    exit 0
elif [ "$READY_STATUS" = "NEEDS_PRAYER" ]; then
    exit 1
else
    exit 2
fi 