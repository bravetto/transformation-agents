#!/usr/bin/env node
/**
 * 🤖 AI SYSTEM ALIGNMENT VALIDATOR
 * Comprehensive validation of AI-first development patterns
 * Prevents AI hallucination and ensures system alignment
 * 
 * Based on latest 2025 AI safety research and practical experience
 */

import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class AISystemAlignmentValidator {
    constructor() {
        this.alignment_score = 0;
        this.total_checks = 0;
        this.passed_checks = 0;
        this.failed_checks = 0;
        this.warnings = [];
        this.errors = [];
        this.recommendations = [];
        
        this.patterns = {
            // Anti-hallucination patterns
            type_safety: /:\s*(string|number|boolean|object|any\[\]|Array<|Promise<)/g,
            validation_schemas: /(zod|joi|yup|class-validator)/g,
            error_boundaries: /(ErrorBoundary|try\s*{|catch\s*\()/g,
            
            // AI-generated code indicators
            ai_comments: /(\/\*\*\s*AI-generated|@generated|auto-generated|copilot)/gi,
            placeholder_code: /(TODO|FIXME|PLACEHOLDER|XXX|HACK)/gi,
            generic_names: /(function1|component1|handler1|temp|test123)/gi,
            
            // Security patterns
            input_sanitization: /(escape|sanitize|validate|DOMPurify)/gi,
            hardcoded_secrets: /(password|secret|key|token)\s*[=:]\s*["'][^"']+["']/gi,
            
            // Performance patterns
            lazy_loading: /(lazy|Suspense|dynamic\s*\()/g,
            memoization: /(useMemo|useCallback|React\.memo)/g,
            
            // Accessibility patterns
            a11y_attributes: /(aria-|role=|alt=|tabIndex)/g,
        };
    }

    async validateProject() {
        console.log('🤖 AI SYSTEM ALIGNMENT VALIDATOR');
        console.log('================================');
        console.log('Analyzing codebase for AI-first development patterns...\n');

        try {
            await this.validateCursorRules();
            await this.validateTypeScript();
            await this.validateCodeQuality();
            await this.validateSecurityPatterns();
            await this.validatePerformancePatterns();
            await this.validateAccessibilityPatterns();
            await this.validateAIGeneratedCode();
            await this.validateErrorHandling();
            await this.validateTestCoverage();
            await this.generateAlignmentReport();
            
        } catch (error) {
            console.error('❌ Validation failed:', error.message);
            process.exit(1);
        }
    }

    async validateCursorRules() {
        console.log('🎯 Validating Cursor AI Rules...');
        this.total_checks++;

        try {
            const cursorRules = await fs.readFile('.cursorrules', 'utf8');
            
            const requiredElements = [
                'MISSION CRITICAL',
                'OUTPUT CONTROL',
                'TECH STACK',
                'DEPLOYMENT PIPELINE',
                'PERFORMANCE REQUIREMENTS',
                'SHIPPING PROTOCOLS'
            ];

            const missingElements = requiredElements.filter(element => 
                !cursorRules.includes(element)
            );

            if (missingElements.length === 0) {
                console.log('  ✅ Cursor rules properly configured');
                this.passed_checks++;
                this.alignment_score += 15;
            } else {
                console.log('  ⚠️ Missing cursor rule elements:', missingElements.join(', '));
                this.warnings.push(`Missing cursor rule elements: ${missingElements.join(', ')}`);
                this.alignment_score += 5;
            }

            // Check for AI efficiency measures
            if (cursorRules.includes('Max 500 words') && cursorRules.includes('No placeholders')) {
                console.log('  ✅ AI efficiency controls active');
                this.alignment_score += 10;
            } else {
                this.warnings.push('Add AI efficiency controls (word limits, no placeholders)');
            }

        } catch (error) {
            console.log('  ❌ .cursorrules file not found or invalid');
            this.errors.push('Missing or invalid .cursorrules file');
            this.failed_checks++;
        }
    }

    async validateTypeScript() {
        console.log('\n🔧 Validating TypeScript Configuration...');
        this.total_checks++;

        try {
            const tsConfigContent = await fs.readFile('tsconfig.json', 'utf8');
            
            // Check for strict mode settings using string matching (more robust than JSON parsing)
            const strictModeChecks = [
                '"strict": true',
                '"noImplicitAny": true',
                '"strictNullChecks": true', 
                '"strictFunctionTypes": true',
                '"noImplicitReturns": true',
                '"noUncheckedIndexedAccess": true'
            ];

            let strictScore = 0;
            for (const check of strictModeChecks) {
                if (tsConfigContent.includes(check)) {
                    strictScore++;
                } else {
                    const settingName = check.split('"')[1];
                    this.warnings.push(`TypeScript: Enable ${settingName} for better AI alignment`);
                }
            }

            if (strictScore >= 5) {
                console.log('  ✅ TypeScript strict mode properly configured');
                this.passed_checks++;
                this.alignment_score += 20;
            } else {
                console.log(`  ⚠️ TypeScript strict mode partially configured (${strictScore}/6)`);
                this.alignment_score += strictScore * 3;
            }

        } catch (error) {
            console.log('  ❌ TypeScript configuration invalid');
            this.errors.push('Invalid TypeScript configuration');
            this.failed_checks++;
        }
    }

    async validateCodeQuality() {
        console.log('\n📊 Validating Code Quality Patterns...');
        this.total_checks++;

        try {
            const files = await this.getAllSourceFiles();
            let qualityScore = 0;
            let totalFiles = files.length;

            for (const file of files) {
                const content = await fs.readFile(file, 'utf8');
                
                // Check for type safety
                const typeMatches = content.match(this.patterns.type_safety);
                if (typeMatches && typeMatches.length > 0) {
                    qualityScore += 2;
                }

                // Check for validation schemas
                const validationMatches = content.match(this.patterns.validation_schemas);
                if (validationMatches && validationMatches.length > 0) {
                    qualityScore += 3;
                }

                // Check for error boundaries
                const errorBoundaryMatches = content.match(this.patterns.error_boundaries);
                if (errorBoundaryMatches && errorBoundaryMatches.length > 0) {
                    qualityScore += 2;
                }

                // Penalize placeholder code
                const placeholderMatches = content.match(this.patterns.placeholder_code);
                if (placeholderMatches && placeholderMatches.length > 0) {
                    qualityScore -= placeholderMatches.length;
                    this.warnings.push(`Placeholder code found in ${file}`);
                }
            }

            const averageQuality = totalFiles > 0 ? qualityScore / totalFiles : 0;
            
            if (averageQuality >= 3) {
                console.log('  ✅ High code quality patterns detected');
                this.passed_checks++;
                this.alignment_score += 15;
            } else if (averageQuality >= 1) {
                console.log('  ⚠️ Moderate code quality patterns');
                this.alignment_score += 8;
            } else {
                console.log('  ❌ Low code quality patterns');
                this.failed_checks++;
                this.errors.push('Insufficient code quality patterns');
            }

        } catch (error) {
            console.log('  ❌ Code quality validation failed');
            this.errors.push('Code quality validation failed');
            this.failed_checks++;
        }
    }

    async validateSecurityPatterns() {
        console.log('\n🛡️ Validating Security Patterns...');
        this.total_checks++;

        try {
            const files = await this.getAllSourceFiles();
            let securityScore = 0;

            for (const file of files) {
                const content = await fs.readFile(file, 'utf8');
                
                // Check for input sanitization
                const sanitizationMatches = content.match(this.patterns.input_sanitization);
                if (sanitizationMatches && sanitizationMatches.length > 0) {
                    securityScore += 3;
                }

                // Check for hardcoded secrets (security violation)
                const secretMatches = content.match(this.patterns.hardcoded_secrets);
                if (secretMatches && secretMatches.length > 0) {
                    securityScore -= 10;
                    this.errors.push(`Potential hardcoded secret in ${file}`);
                }
            }

            // Check for security configuration files
            const securityFiles = [
                'src/lib/security/input-sanitizer.ts',
                'src/lib/security/csrf-protection.ts',
                'middleware.ts'
            ];

            for (const secFile of securityFiles) {
                try {
                    await fs.access(secFile);
                    securityScore += 5;
                } catch {
                    this.warnings.push(`Missing security file: ${secFile}`);
                }
            }

            if (securityScore >= 10) {
                console.log('  ✅ Strong security patterns implemented');
                this.passed_checks++;
                this.alignment_score += 20;
            } else if (securityScore >= 5) {
                console.log('  ⚠️ Basic security patterns present');
                this.alignment_score += 10;
            } else {
                console.log('  ❌ Insufficient security patterns');
                this.failed_checks++;
                this.errors.push('Insufficient security implementation');
            }

        } catch (error) {
            console.log('  ❌ Security validation failed');
            this.errors.push('Security validation failed');
            this.failed_checks++;
        }
    }

    async validatePerformancePatterns() {
        console.log('\n⚡ Validating Performance Patterns...');
        this.total_checks++;

        try {
            const files = await this.getAllSourceFiles();
            let performanceScore = 0;

            for (const file of files) {
                const content = await fs.readFile(file, 'utf8');
                
                // Check for lazy loading
                const lazyMatches = content.match(this.patterns.lazy_loading);
                if (lazyMatches && lazyMatches.length > 0) {
                    performanceScore += 2;
                }

                // Check for memoization
                const memoMatches = content.match(this.patterns.memoization);
                if (memoMatches && memoMatches.length > 0) {
                    performanceScore += 2;
                }
            }

            // Check for performance configuration
            try {
                const nextConfig = await fs.readFile('next.config.mjs', 'utf8');
                if (nextConfig.includes('compress') || nextConfig.includes('optimization')) {
                    performanceScore += 5;
                }
            } catch {
                this.warnings.push('Consider adding performance optimizations to next.config.mjs');
            }

            if (performanceScore >= 8) {
                console.log('  ✅ Excellent performance patterns');
                this.passed_checks++;
                this.alignment_score += 15;
            } else if (performanceScore >= 4) {
                console.log('  ⚠️ Basic performance patterns');
                this.alignment_score += 8;
            } else {
                console.log('  ❌ Limited performance optimization');
                this.failed_checks++;
                this.recommendations.push('Implement more performance optimization patterns');
            }

        } catch (error) {
            console.log('  ❌ Performance validation failed');
            this.errors.push('Performance validation failed');
            this.failed_checks++;
        }
    }

    async validateAccessibilityPatterns() {
        console.log('\n♿ Validating Accessibility Patterns...');
        this.total_checks++;

        try {
            const files = await this.getAllSourceFiles();
            let a11yScore = 0;

            for (const file of files) {
                if (!file.includes('.tsx') && !file.includes('.jsx')) continue;
                
                const content = await fs.readFile(file, 'utf8');
                
                // Check for a11y attributes
                const a11yMatches = content.match(this.patterns.a11y_attributes);
                if (a11yMatches && a11yMatches.length > 0) {
                    a11yScore += a11yMatches.length;
                }
            }

            if (a11yScore >= 10) {
                console.log('  ✅ Good accessibility implementation');
                this.passed_checks++;
                this.alignment_score += 10;
            } else if (a11yScore >= 3) {
                console.log('  ⚠️ Basic accessibility patterns');
                this.alignment_score += 5;
            } else {
                console.log('  ❌ Limited accessibility implementation');
                this.failed_checks++;
                this.recommendations.push('Improve accessibility with ARIA attributes and semantic HTML');
            }

        } catch (error) {
            console.log('  ❌ Accessibility validation failed');
            this.errors.push('Accessibility validation failed');
            this.failed_checks++;
        }
    }

    async validateAIGeneratedCode() {
        console.log('\n🤖 Validating AI-Generated Code Quality...');
        this.total_checks++;

        try {
            const files = await this.getAllSourceFiles();
            let aiCodeIssues = 0;
            let totalAICode = 0;

            for (const file of files) {
                const content = await fs.readFile(file, 'utf8');
                
                // Detect AI-generated code
                const aiComments = content.match(this.patterns.ai_comments);
                if (aiComments) {
                    totalAICode++;
                }

                // Check for generic names (common AI issue)
                const genericNames = content.match(this.patterns.generic_names);
                if (genericNames && genericNames.length > 0) {
                    aiCodeIssues += genericNames.length;
                    this.warnings.push(`Generic naming detected in ${file}`);
                }

                // Check for placeholder patterns
                const placeholders = content.match(this.patterns.placeholder_code);
                if (placeholders && placeholders.length > 0) {
                    aiCodeIssues += placeholders.length;
                }
            }

            if (aiCodeIssues === 0) {
                console.log('  ✅ No AI code quality issues detected');
                this.passed_checks++;
                this.alignment_score += 15;
            } else if (aiCodeIssues <= 3) {
                console.log(`  ⚠️ Minor AI code issues detected (${aiCodeIssues})`);
                this.alignment_score += 8;
            } else {
                console.log(`  ❌ Multiple AI code issues detected (${aiCodeIssues})`);
                this.failed_checks++;
                this.errors.push(`${aiCodeIssues} AI-generated code quality issues`);
            }

            if (totalAICode > 0) {
                console.log(`  📊 AI-generated code sections detected: ${totalAICode}`);
            }

        } catch (error) {
            console.log('  ❌ AI code validation failed');
            this.errors.push('AI code validation failed');
            this.failed_checks++;
        }
    }

    async validateErrorHandling() {
        console.log('\n🚨 Validating Error Handling...');
        this.total_checks++;

        try {
            const files = await this.getAllSourceFiles();
            let errorHandlingScore = 0;

            for (const file of files) {
                const content = await fs.readFile(file, 'utf8');
                
                // Check for try-catch blocks
                const tryCatchMatches = content.match(/try\s*{[\s\S]*?catch\s*\(/g);
                if (tryCatchMatches && tryCatchMatches.length > 0) {
                    errorHandlingScore += tryCatchMatches.length;
                }

                // Check for error boundaries
                if (content.includes('ErrorBoundary') || content.includes('componentDidCatch')) {
                    errorHandlingScore += 5;
                }

                // Check for proper error types
                if (content.includes('Error(') || content.includes('throw new')) {
                    errorHandlingScore += 1;
                }
            }

            if (errorHandlingScore >= 10) {
                console.log('  ✅ Comprehensive error handling');
                this.passed_checks++;
                this.alignment_score += 15;
            } else if (errorHandlingScore >= 5) {
                console.log('  ⚠️ Basic error handling present');
                this.alignment_score += 8;
            } else {
                console.log('  ❌ Insufficient error handling');
                this.failed_checks++;
                this.recommendations.push('Implement comprehensive error handling and error boundaries');
            }

        } catch (error) {
            console.log('  ❌ Error handling validation failed');
            this.errors.push('Error handling validation failed');
            this.failed_checks++;
        }
    }

    async validateTestCoverage() {
        console.log('\n🧪 Validating Test Coverage...');
        this.total_checks++;

        try {
            // Check for test files
            const testFiles = await this.getTestFiles();
            const sourceFiles = await this.getAllSourceFiles();
            
            const testCoverage = testFiles.length / sourceFiles.length;

            if (testCoverage >= 0.3) {
                console.log(`  ✅ Good test coverage (${(testCoverage * 100).toFixed(1)}%)`);
                this.passed_checks++;
                this.alignment_score += 10;
            } else if (testCoverage >= 0.1) {
                console.log(`  ⚠️ Basic test coverage (${(testCoverage * 100).toFixed(1)}%)`);
                this.alignment_score += 5;
            } else {
                console.log(`  ❌ Low test coverage (${(testCoverage * 100).toFixed(1)}%)`);
                this.failed_checks++;
                this.recommendations.push('Increase test coverage for better AI code validation');
            }

            // Check for test scripts in package.json
            const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
            if (packageJson.scripts?.test) {
                console.log('  ✅ Test scripts configured');
                this.alignment_score += 5;
            } else {
                this.warnings.push('Configure test scripts in package.json');
            }

        } catch (error) {
            console.log('  ❌ Test coverage validation failed');
            this.errors.push('Test coverage validation failed');
            this.failed_checks++;
        }
    }

    async generateAlignmentReport() {
        console.log('\n📊 GENERATING AI SYSTEM ALIGNMENT REPORT');
        console.log('=========================================');

        const maxScore = this.total_checks * 20; // Maximum possible score
        const alignmentPercentage = Math.min((this.alignment_score / maxScore) * 100, 100);

        console.log(`\n🎯 ALIGNMENT SCORE: ${this.alignment_score}/${maxScore} (${alignmentPercentage.toFixed(1)}%)`);
        console.log(`📊 CHECKS PASSED: ${this.passed_checks}/${this.total_checks}`);
        console.log(`⚠️  WARNINGS: ${this.warnings.length}`);
        console.log(`❌ ERRORS: ${this.errors.length}`);

        // Determine alignment level
        let alignmentLevel;
        if (alignmentPercentage >= 90) {
            alignmentLevel = '🏆 DIVINE ALIGNMENT - CHAMPIONSHIP LEVEL';
        } else if (alignmentPercentage >= 75) {
            alignmentLevel = '✅ EXCELLENT ALIGNMENT - PRODUCTION READY';
        } else if (alignmentPercentage >= 60) {
            alignmentLevel = '⚠️  GOOD ALIGNMENT - MINOR IMPROVEMENTS NEEDED';
        } else if (alignmentPercentage >= 40) {
            alignmentLevel = '🔧 MODERATE ALIGNMENT - SIGNIFICANT IMPROVEMENTS NEEDED';
        } else {
            alignmentLevel = '❌ POOR ALIGNMENT - MAJOR REFACTORING REQUIRED';
        }

        console.log(`\n🎖️  ALIGNMENT LEVEL: ${alignmentLevel}`);

        // Display warnings
        if (this.warnings.length > 0) {
            console.log('\n⚠️  WARNINGS:');
            this.warnings.forEach(warning => console.log(`   • ${warning}`));
        }

        // Display errors
        if (this.errors.length > 0) {
            console.log('\n❌ ERRORS:');
            this.errors.forEach(error => console.log(`   • ${error}`));
        }

        // Display recommendations
        if (this.recommendations.length > 0) {
            console.log('\n💡 RECOMMENDATIONS:');
            this.recommendations.forEach(rec => console.log(`   • ${rec}`));
        }

        // Mission context
        console.log('\n🎯 MISSION CONTEXT:');
        console.log('   • Project: JAHmere Webb Freedom Portal');
        console.log('   • Deadline: July 28, 2025');
        console.log('   • Purpose: Divine justice through technological excellence');

        // Generate JSON report
        const report = {
            timestamp: new Date().toISOString(),
            alignment_score: this.alignment_score,
            max_score: maxScore,
            alignment_percentage: alignmentPercentage,
            alignment_level: alignmentLevel,
            checks: {
                total: this.total_checks,
                passed: this.passed_checks,
                failed: this.failed_checks
            },
            issues: {
                warnings: this.warnings,
                errors: this.errors,
                recommendations: this.recommendations
            }
        };

        await fs.writeFile('ai-alignment-report.json', JSON.stringify(report, null, 2));
        console.log('\n📄 Report saved to: ai-alignment-report.json');

        // Exit with appropriate code
        if (this.errors.length > 0) {
            console.log('\n🚨 ALIGNMENT VALIDATION FAILED - Review errors before deployment');
            process.exit(1);
        } else if (alignmentPercentage < 60) {
            console.log('\n⚠️  ALIGNMENT BELOW RECOMMENDED THRESHOLD - Consider improvements');
            process.exit(1);
        } else {
            console.log('\n✅ AI SYSTEM ALIGNMENT VALIDATED - Ready for divine deployment');
            process.exit(0);
        }
    }

    async getAllSourceFiles() {
        const extensions = ['.ts', '.tsx', '.js', '.jsx'];
        const files = [];
        
        async function scanDir(dir) {
            try {
                const entries = await fs.readdir(dir, { withFileTypes: true });
                
                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);
                    
                    if (entry.isDirectory() && !entry.name.startsWith('.') && 
                        !['node_modules', 'dist', 'build', '.next'].includes(entry.name)) {
                        await scanDir(fullPath);
                    } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
                        files.push(fullPath);
                    }
                }
            } catch (error) {
                // Skip directories we can't read
            }
        }
        
        await scanDir('src');
        return files;
    }

    async getTestFiles() {
        const testPatterns = ['.test.', '.spec.', '__tests__'];
        const allFiles = await this.getAllSourceFiles();
        
        return allFiles.filter(file => 
            testPatterns.some(pattern => file.includes(pattern))
        );
    }
}

// Run the validator
const validator = new AISystemAlignmentValidator();
validator.validateProject().catch(error => {
    console.error('💥 AI System Alignment Validation crashed:', error);
    process.exit(1);
}); 