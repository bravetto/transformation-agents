#!/usr/bin/env node

/**
 * 🤖 AI ALIGNMENT VALIDATOR
 * Real-time system health integration with AI guidance validation
 * 
 * Mission: Ensure AI guidance aligns with actual system state
 * Context: Based on 12+ Fast Refresh errors and 90+ TypeScript errors analysis
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bright: '\x1b[1m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(`🎯 ${message}`, 'bright');
  log('='.repeat(60), 'cyan');
}

function logSection(message) {
  log(`\n📊 ${message}`, 'blue');
  log('-'.repeat(50), 'blue');
}

class AIAlignmentValidator {
  constructor() {
    this.metrics = {
      typeScriptErrors: 0,
      fastRefreshErrors: 0,
      performanceMs: 0,
      incorrectErrorBoundaries: 0,
      lastValidation: new Date()
    };
    
    this.thresholds = {
      maxTypeScriptErrors: 0,      // Target: Zero errors
      maxPerformanceMs: 200,       // Target: <200ms responses
      maxFastRefreshErrors: 0      // Target: Zero Fast Refresh errors
    };
  }

  async validateTypeScriptErrors() {
    logSection('TypeScript Error Analysis');
    
    try {
      const result = execSync('npm run type-check 2>&1', { encoding: 'utf8' });
      
      // Extract error count from TypeScript output
      const errorMatch = result.match(/Found (\d+) errors?/);
      const errorCount = errorMatch ? parseInt(errorMatch[1]) : 0;
      
      this.metrics.typeScriptErrors = errorCount;
      
      if (errorCount === 0) {
        log('✅ TypeScript: Clean compilation - AI guidance effective', 'green');
        return true;
      } else {
        log(`❌ TypeScript: ${errorCount} errors found - AI guidance needs update`, 'red');
        
        // Check for withErrorBoundary pattern specifically
        const errorBoundaryErrors = (result.match(/withErrorBoundary/g) || []).length;
        if (errorBoundaryErrors > 0) {
          log(`   🔍 Detected ${errorBoundaryErrors} withErrorBoundary-related errors`, 'yellow');
          log('   📖 Solution: See docs/FAST_REFRESH_SOLUTIONS.md', 'yellow');
        }
        
        return false;
      }
    } catch (error) {
      log('⚠️ TypeScript check failed - Unable to validate', 'yellow');
      return false;
    }
  }

  async validateIncorrectErrorBoundaries() {
    logSection('Error Boundary Pattern Analysis');
    
    try {
      const result = execSync('grep -r "withErrorBoundary([^,]*, {" src/ 2>/dev/null || echo ""', { encoding: 'utf8' });
      const incorrectPatterns = result.trim().split('\n').filter(line => line.trim()).length;
      
      this.metrics.incorrectErrorBoundaries = incorrectPatterns;
      
      if (incorrectPatterns === 0) {
        log('✅ Error Boundaries: All patterns correct', 'green');
        return true;
      } else {
        log(`❌ Error Boundaries: ${incorrectPatterns} incorrect patterns found`, 'red');
        log('   🔧 Fix: Replace object parameters with string parameters', 'yellow');
        log('   📖 Guide: docs/FAST_REFRESH_SOLUTIONS.md', 'yellow');
        return false;
      }
    } catch (error) {
      log('⚠️ Error boundary check failed', 'yellow');
      return false;
    }
  }

  async validatePerformance() {
    logSection('Performance Validation');
    
    try {
      // Check if development server is running
      const result = execSync('curl -s -o /dev/null -w "%{http_code},%{time_total}" http://localhost:1437 2>/dev/null || echo "000,0"', { encoding: 'utf8' });
      const [statusCode, timeTotal] = result.trim().split(',');
      
      if (statusCode === '200') {
        const responseTimeMs = Math.round(parseFloat(timeTotal) * 1000);
        this.metrics.performanceMs = responseTimeMs;
        
        if (responseTimeMs <= this.thresholds.maxPerformanceMs) {
          log(`✅ Performance: ${responseTimeMs}ms - Championship level maintained`, 'green');
          return true;
        } else {
          log(`⚠️ Performance: ${responseTimeMs}ms - Above threshold (${this.thresholds.maxPerformanceMs}ms)`, 'yellow');
          return false;
        }
      } else {
        log('❌ Performance: Development server not responding', 'red');
        log('   🔧 Fix: Run `npm run dev` to start development server', 'yellow');
        return false;
      }
    } catch (error) {
      log('⚠️ Performance check failed - Server may not be running', 'yellow');
      return false;
    }
  }

  async validateAIGuidanceFiles() {
    logSection('AI Guidance File Validation');
    
    const requiredFiles = [
      { path: '.cursorrules', tier: 'TIER 1 (Critical)' },
      { path: 'docs/FAST_REFRESH_SOLUTIONS.md', tier: 'TIER 2 (Technical)' },
      { path: 'docs/DEVELOPMENT.md', tier: 'TIER 3 (Project)' },
      { path: 'docs/AI_ALIGNMENT_PROTOCOL.md', tier: 'TIER 3 (Project)' }
    ];
    
    let allFilesExist = true;
    
    for (const file of requiredFiles) {
      if (fs.existsSync(file.path)) {
        log(`✅ ${file.tier}: ${file.path} exists`, 'green');
      } else {
        log(`❌ ${file.tier}: ${file.path} missing`, 'red');
        allFilesExist = false;
      }
    }
    
    // Check for archived files that provide zero AI value
    const archivedPath = 'docs-consolidation-backup-20250721';
    if (fs.existsSync(archivedPath)) {
      const stats = execSync(`du -sh ${archivedPath} 2>/dev/null | cut -f1`, { encoding: 'utf8' }).trim();
      log(`⚠️ Archived docs detected: ${stats} (Zero AI impact)`, 'yellow');
      log('   💡 Consider: These files don\'t inform AI behavior', 'yellow');
    }
    
    return allFilesExist;
  }

  generateAlignmentReport() {
    logHeader('AI ALIGNMENT VALIDATION REPORT');
    
    const validations = [
      { name: 'TypeScript Errors', passed: this.metrics.typeScriptErrors === 0, value: this.metrics.typeScriptErrors },
      { name: 'Error Boundary Patterns', passed: this.metrics.incorrectErrorBoundaries === 0, value: this.metrics.incorrectErrorBoundaries },
      { name: 'Performance', passed: this.metrics.performanceMs <= this.thresholds.maxPerformanceMs && this.metrics.performanceMs > 0, value: `${this.metrics.performanceMs}ms` }
    ];
    
    const passedCount = validations.filter(v => v.passed).length;
    const totalCount = validations.length;
    
    log(`\n📈 ALIGNMENT SCORE: ${passedCount}/${totalCount} (${Math.round(passedCount/totalCount*100)}%)`, passedCount === totalCount ? 'green' : 'yellow');
    
    validations.forEach(validation => {
      const status = validation.passed ? '✅' : '❌';
      const color = validation.passed ? 'green' : 'red';
      log(`${status} ${validation.name}: ${validation.value}`, color);
    });
    
    // AI Guidance Effectiveness Assessment
    log('\n🤖 AI GUIDANCE EFFECTIVENESS:', 'cyan');
    
    if (passedCount === totalCount) {
      log('✅ EXCELLENT: AI guidance is fully aligned with system reality', 'green');
      log('   📈 All metrics within target thresholds', 'green');
      log('   🎯 Continue current development practices', 'green');
    } else if (passedCount >= totalCount * 0.7) {
      log('⚠️ MODERATE: AI guidance partially effective', 'yellow');
      log('   🔧 Some system issues persist despite documentation', 'yellow');
      log('   📖 Review and update AI guidance documents', 'yellow');
    } else {
      log('❌ POOR: AI guidance misaligned with system needs', 'red');
      log('   🚨 Critical disconnect between documentation and reality', 'red');
      log('   🔄 Immediate AI guidance system update required', 'red');
    }
    
    // Specific Recommendations
    log('\n💡 IMMEDIATE ACTIONS:', 'magenta');
    
    if (this.metrics.typeScriptErrors > 0) {
      log('   1. Fix TypeScript errors using docs/FAST_REFRESH_SOLUTIONS.md', 'white');
    }
    
    if (this.metrics.incorrectErrorBoundaries > 0) {
      log('   2. Apply withErrorBoundary fixes: replace objects with strings', 'white');
    }
    
    if (this.metrics.performanceMs > this.thresholds.maxPerformanceMs || this.metrics.performanceMs === 0) {
      log('   3. Check development server health and performance', 'white');
    }
    
    log('\n🎯 SUCCESS CRITERIA:', 'cyan');
    log('   • Zero TypeScript errors', 'white');
    log('   • Zero Fast Refresh runtime errors', 'white');
    log('   • <200ms response times', 'white');
    log('   • All error boundaries use string parameters', 'white');
  }

  async runFullValidation() {
    logHeader('AI ALIGNMENT VALIDATOR - JAHmere Webb Freedom Portal');
    log('Mission: Validate AI guidance effectiveness against system reality\n', 'cyan');
    
    // Run all validations
    await this.validateTypeScriptErrors();
    await this.validateIncorrectErrorBoundaries();
    await this.validatePerformance();
    await this.validateAIGuidanceFiles();
    
    // Generate comprehensive report
    this.generateAlignmentReport();
    
    // Update timestamp
    this.metrics.lastValidation = new Date();
    
    log(`\n⏰ Validation completed at: ${this.metrics.lastValidation.toLocaleString()}`, 'cyan');
    log('🔄 Run this script regularly to monitor AI alignment effectiveness\n', 'cyan');
  }
}

// CLI Interface
if (require.main === module) {
  const validator = new AIAlignmentValidator();
  
  // Handle command line arguments
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`\n🤖 AI Alignment Validator - Usage:\n\n  node scripts/ai-alignment-validator.js              # Run full validation\n  node scripts/ai-alignment-validator.js --typescript # Check TypeScript only\n  node scripts/ai-alignment-validator.js --performance # Check performance only\n  node scripts/ai-alignment-validator.js --help       # Show this help\n\nPurpose: Validate that AI guidance documents align with actual system state.\nContext: Based on Fast Refresh errors and TypeScript compilation issues.\n`);
    process.exit(0);
  }
  
  if (args.includes('--typescript')) {
    validator.validateTypeScriptErrors();
  } else if (args.includes('--performance')) {
    validator.validatePerformance();
  } else {
    validator.runFullValidation();
  }
}

module.exports = { AIAlignmentValidator }; 