#!/usr/bin/env node
/**
 * 🤖 AI PROMPT VALIDATION SYSTEM v2.0
 * Comprehensive validation of AI-generated code against architectural patterns
 * Implements 2025 best practices for AI system alignment and prompt validation
 * 
 * Based on latest research:
 * - Chain-of-Verification (CoVe) prompting
 * - Trust-but-verify patterns
 * - Contextual AI alignment techniques
 */

import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface ValidationConfig {
  projectRoot: string;
  architecturalPatterns: ArchitecturalPattern[];
  validationRules: ValidationRule[];
  chainOfVerification: CoVeConfig;
  contextualAlignment: ContextAlignment;
}

interface ArchitecturalPattern {
  name: string;
  pattern: RegExp;
  description: string;
  required: boolean;
  examples: string[];
  antiPatterns: string[];
}

interface ValidationRule {
  id: string;
  name: string;
  description: string;
  validator: (code: string, context: ValidationContext) => ValidationResult;
  severity: 'error' | 'warning' | 'info';
  category: 'architecture' | 'security' | 'performance' | 'style' | 'alignment';
}

interface CoVeConfig {
  enabled: boolean;
  verificationSteps: VerificationStep[];
  confidenceThreshold: number;
  selfCorrectionEnabled: boolean;
}

interface VerificationStep {
  name: string;
  question: string;
  validator: (code: string, context: ValidationContext) => boolean;
  weight: number;
}

interface ContextAlignment {
  missionContext: string;
  techStackConstraints: string[];
  performanceRequirements: Record<string, number>;
  qualityGates: QualityGate[];
}

interface QualityGate {
  name: string;
  threshold: number;
  metric: string;
  blocker: boolean;
}

interface ValidationContext {
  filePath: string;
  fileContent: string;
  projectContext: ProjectContext;
  aiGeneratedSections: AISection[];
  previousValidations: ValidationResult[];
}

interface AISection {
  startLine: number;
  endLine: number;
  confidence: number;
  prompt: string;
  generatedBy: string;
}

interface ValidationResult {
  rule: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
  column?: number;
  suggestions: string[];
  confidence: number;
  verificationPassed: boolean;
}

interface ProjectContext {
  framework: string;
  language: string;
  patterns: string[];
  constraints: string[];
}

class AIPromptValidationSystem {
  private config: ValidationConfig;
  private validationHistory: Map<string, ValidationResult[]> = new Map();
  private contextDriftDetector: ContextDriftDetector;
  private architecturalPatternMatcher: ArchitecturalPatternMatcher;

  constructor(config: ValidationConfig) {
    this.config = config;
    this.contextDriftDetector = new ContextDriftDetector();
    this.architecturalPatternMatcher = new ArchitecturalPatternMatcher(config.architecturalPatterns);
  }

  /**
   * Main validation entry point implementing Chain-of-Verification pattern
   */
  async validateAIGeneratedCode(
    filePath: string, 
    aiSections: AISection[]
  ): Promise<ValidationResult[]> {
    console.log(`🔍 Validating AI-generated code in ${filePath}`);
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const context: ValidationContext = {
      filePath,
      fileContent,
      projectContext: await this.analyzeProjectContext(filePath),
      aiGeneratedSections: aiSections,
      previousValidations: this.validationHistory.get(filePath) || []
    };

    // Step 1: Initial validation pass
    const initialResults = await this.performInitialValidation(context);
    
    // Step 2: Chain-of-Verification validation
    const coveResults = await this.performCoVeValidation(context, initialResults);
    
    // Step 3: Context drift detection
    const driftResults = await this.detectContextDrift(context);
    
    // Step 4: Architectural pattern validation
    const architecturalResults = await this.validateArchitecturalPatterns(context);
    
    // Step 5: Self-correction if enabled
    const finalResults = this.config.chainOfVerification.selfCorrectionEnabled
      ? await this.applySelfCorrection([...initialResults, ...coveResults, ...driftResults, ...architecturalResults])
      : [...initialResults, ...coveResults, ...driftResults, ...architecturalResults];

    // Store validation history for drift detection
    this.validationHistory.set(filePath, finalResults);

    // Generate comprehensive report
    await this.generateValidationReport(filePath, finalResults, context);

    return finalResults;
  }

  /**
   * Perform initial validation using standard rules
   */
  private async performInitialValidation(context: ValidationContext): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    for (const rule of this.config.validationRules) {
      try {
        const result = rule.validator(context.fileContent, context);
        if (result) {
          results.push({
            ...result,
            rule: rule.id,
            severity: rule.severity,
            verificationPassed: false // Will be verified in CoVe step
          });
        }
      } catch (error) {
        console.error(`Error applying rule ${rule.id}:`, error);
      }
    }

    return results;
  }

  /**
   * Implement Chain-of-Verification (CoVe) validation pattern
   */
  private async performCoVeValidation(
    context: ValidationContext, 
    initialResults: ValidationResult[]
  ): Promise<ValidationResult[]> {
    if (!this.config.chainOfVerification.enabled) {
      return [];
    }

    const coveResults: ValidationResult[] = [];

    for (const step of this.config.chainOfVerification.verificationSteps) {
      try {
        // Generate verification question for the code
        const verificationPassed = step.validator(context.fileContent, context);
        
        // If verification fails, create a validation result
        if (!verificationPassed) {
          coveResults.push({
            rule: `cove-${step.name}`,
            severity: 'warning',
            message: `Chain-of-Verification failed: ${step.question}`,
            suggestions: [
              'Review the AI-generated code for accuracy',
              'Verify against project requirements',
              'Consider manual review of this section'
            ],
            confidence: step.weight,
            verificationPassed: false
          });
        }
      } catch (error) {
        console.error(`CoVe validation error for step ${step.name}:`, error);
      }
    }

    return coveResults;
  }

  /**
   * Detect context drift in AI outputs
   */
  private async detectContextDrift(context: ValidationContext): Promise<ValidationResult[]> {
    return this.contextDriftDetector.detectDrift(context);
  }

  /**
   * Validate against architectural patterns
   */
  private async validateArchitecturalPatterns(context: ValidationContext): Promise<ValidationResult[]> {
    return this.architecturalPatternMatcher.validate(context);
  }

  /**
   * Apply self-correction to validation results
   */
  private async applySelfCorrection(results: ValidationResult[]): Promise<ValidationResult[]> {
    // Group results by severity and confidence
    const highConfidenceErrors = results.filter(r => 
      r.severity === 'error' && r.confidence > this.config.chainOfVerification.confidenceThreshold
    );

    // Apply corrections for high-confidence issues
    const correctedResults = results.map(result => {
      if (highConfidenceErrors.includes(result)) {
        return {
          ...result,
          suggestions: [
            ...result.suggestions,
            'AUTO-CORRECTION: This issue has high confidence and should be addressed immediately',
            'Consider regenerating this section with updated prompts'
          ]
        };
      }
      return result;
    });

    return correctedResults;
  }

  /**
   * Analyze project context for validation
   */
  private async analyzeProjectContext(filePath: string): Promise<ProjectContext> {
    const projectRoot = this.config.projectRoot;
    
    // Read package.json for framework detection
    const packageJsonPath = path.join(projectRoot, 'package.json');
    let framework = 'unknown';
    let language = 'typescript';

    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      
      if (packageJson.dependencies?.['next'] || packageJson.devDependencies?.['next']) {
        framework = 'next.js';
      } else if (packageJson.dependencies?.['react'] || packageJson.devDependencies?.['react']) {
        framework = 'react';
      }
    } catch (error) {
      console.warn('Could not read package.json for context analysis');
    }

    // Determine language from file extension
    const ext = path.extname(filePath);
    if (ext === '.js' || ext === '.jsx') {
      language = 'javascript';
    } else if (ext === '.ts' || ext === '.tsx') {
      language = 'typescript';
    }

    return {
      framework,
      language,
      patterns: this.config.architecturalPatterns.map(p => p.name),
      constraints: this.config.contextualAlignment.techStackConstraints
    };
  }

  /**
   * Generate comprehensive validation report
   */
  private async generateValidationReport(
    filePath: string, 
    results: ValidationResult[], 
    context: ValidationContext
  ): Promise<void> {
    const reportPath = path.join(this.config.projectRoot, 'validation-reports', `${path.basename(filePath)}-report.md`);
    
    const report = this.generateMarkdownReport(filePath, results, context);
    
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, report);
    
    console.log(`📋 Validation report generated: ${reportPath}`);
  }

  /**
   * Generate markdown validation report
   */
  private generateMarkdownReport(
    filePath: string, 
    results: ValidationResult[], 
    context: ValidationContext
  ): string {
    const errors = results.filter(r => r.severity === 'error');
    const warnings = results.filter(r => r.severity === 'warning');
    const infos = results.filter(r => r.severity === 'info');

    return `# AI Prompt Validation Report

## File: ${filePath}
**Generated:** ${new Date().toISOString()}
**Framework:** ${context.projectContext.framework}
**Language:** ${context.projectContext.language}

## Summary
- 🚨 **Errors:** ${errors.length}
- ⚠️ **Warnings:** ${warnings.length}
- ℹ️ **Info:** ${infos.length}
- 📊 **Total Issues:** ${results.length}

## Mission Alignment
**Context:** ${this.config.contextualAlignment.missionContext}

## Detailed Results

${results.map(result => `
### ${result.severity.toUpperCase()}: ${result.rule}
**Message:** ${result.message}
**Confidence:** ${(result.confidence * 100).toFixed(1)}%
**Verification Passed:** ${result.verificationPassed ? '✅' : '❌'}

${result.line ? `**Location:** Line ${result.line}${result.column ? `, Column ${result.column}` : ''}` : ''}

**Suggestions:**
${result.suggestions.map(s => `- ${s}`).join('\n')}

---
`).join('')}

## Chain-of-Verification Results
${this.config.chainOfVerification.enabled ? 
  `✅ CoVe validation enabled with ${this.config.chainOfVerification.verificationSteps.length} verification steps` :
  '❌ CoVe validation disabled'
}

## Context Drift Analysis
${this.contextDriftDetector.getLastAnalysis()}

## Architectural Pattern Compliance
${this.architecturalPatternMatcher.getComplianceReport()}

## Recommendations
${this.generateRecommendations(results)}
`;
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(results: ValidationResult[]): string {
    const recommendations: string[] = [];

    const highSeverityIssues = results.filter(r => r.severity === 'error').length;
    if (highSeverityIssues > 0) {
      recommendations.push('🚨 **CRITICAL**: Address all error-level issues before deployment');
    }

    const lowConfidenceResults = results.filter(r => r.confidence < 0.7).length;
    if (lowConfidenceResults > 3) {
      recommendations.push('🔍 **REVIEW**: Multiple low-confidence validations detected - consider manual review');
    }

    const coveFailures = results.filter(r => r.rule.startsWith('cove-')).length;
    if (coveFailures > 0) {
      recommendations.push('🔗 **VERIFICATION**: Chain-of-Verification detected issues - enhance AI prompts');
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ **EXCELLENT**: All validations passed successfully');
    }

    return recommendations.map(r => `- ${r}`).join('\n');
  }
}

/**
 * Context Drift Detection System
 */
class ContextDriftDetector {
  private driftHistory: Map<string, DriftMetric[]> = new Map();
  private lastAnalysis: string = '';

  async detectDrift(context: ValidationContext): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    const currentMetrics = this.calculateDriftMetrics(context);
    
    const filePath = context.filePath;
    const previousMetrics = this.driftHistory.get(filePath) || [];
    
    if (previousMetrics.length > 0) {
      const drift = this.calculateDriftScore(previousMetrics, currentMetrics);
      
      if (drift.semantic > 0.3) {
        results.push({
          rule: 'context-drift-semantic',
          severity: 'warning',
          message: `Semantic drift detected (${(drift.semantic * 100).toFixed(1)}%)`,
          suggestions: [
            'Review AI prompts for consistency',
            'Verify context alignment with project requirements',
            'Consider prompt reinforcement mechanisms'
          ],
          confidence: drift.confidence,
          verificationPassed: false
        });
      }

      if (drift.architectural > 0.4) {
        results.push({
          rule: 'context-drift-architectural',
          severity: 'error',
          message: `Architectural drift detected (${(drift.architectural * 100).toFixed(1)}%)`,
          suggestions: [
            'AI output deviates from architectural patterns',
            'Update prompts to reinforce architectural constraints',
            'Consider manual code review'
          ],
          confidence: drift.confidence,
          verificationPassed: false
        });
      }
    }

    // Store current metrics for future drift detection
    this.driftHistory.set(filePath, [...previousMetrics, currentMetrics].slice(-10)); // Keep last 10 measurements

    this.lastAnalysis = this.generateDriftAnalysis(currentMetrics, results);
    return results;
  }

  private calculateDriftMetrics(context: ValidationContext): DriftMetric {
    // Analyze various aspects of the code for drift indicators
    const content = context.fileContent;
    
    return {
      timestamp: Date.now(),
      semanticComplexity: this.calculateSemanticComplexity(content),
      architecturalCompliance: this.calculateArchitecturalCompliance(content, context),
      styleConsistency: this.calculateStyleConsistency(content),
      contextAlignment: this.calculateContextAlignment(content, context)
    };
  }

  private calculateDriftScore(previous: DriftMetric[], current: DriftMetric): DriftScore {
    if (previous.length === 0) {
      return { semantic: 0, architectural: 0, confidence: 1.0 };
    }

    const recent = previous.slice(-3); // Compare with last 3 measurements
    const avgPrevious = this.averageMetrics(recent);

    const semanticDrift = Math.abs(current.semanticComplexity - avgPrevious.semanticComplexity) / avgPrevious.semanticComplexity;
    const architecturalDrift = Math.abs(current.architecturalCompliance - avgPrevious.architecturalCompliance) / avgPrevious.architecturalCompliance;

    return {
      semantic: semanticDrift,
      architectural: architecturalDrift,
      confidence: Math.min(recent.length / 3, 1.0) // Higher confidence with more data points
    };
  }

  private calculateSemanticComplexity(content: string): number {
    // Simple heuristic for semantic complexity
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
    const functionCount = (content.match(/function\s+\w+|const\s+\w+\s*=/g) || []).length;
    
    return (avgLineLength * functionCount) / 1000; // Normalized score
  }

  private calculateArchitecturalCompliance(content: string, context: ValidationContext): number {
    let score = 1.0;

    // Check for Next.js patterns if in Next.js project
    if (context.projectContext.framework === 'next.js') {
      if (content.includes('getServerSideProps') || content.includes('getStaticProps')) {
        score -= 0.3; // Penalize deprecated patterns
      }
      if (content.includes('use client') && content.includes('useState')) {
        score += 0.1; // Reward proper client component usage
      }
    }

    // Check TypeScript usage
    if (context.projectContext.language === 'typescript') {
      const typeAnnotations = (content.match(/:\s*\w+/g) || []).length;
      const functions = (content.match(/function|=>/g) || []).length;
      if (functions > 0) {
        score += Math.min(typeAnnotations / functions, 0.5); // Reward type usage
      }
    }

    return Math.max(0, Math.min(1, score));
  }

  private calculateStyleConsistency(content: string): number {
    // Check for consistent indentation, naming, etc.
    const lines = content.split('\n');
    let consistencyScore = 1.0;

    // Check indentation consistency
    const indentations = lines
      .filter(line => line.trim().length > 0)
      .map(line => line.match(/^\s*/)?.[0].length || 0);
    
    const uniqueIndents = new Set(indentations);
    if (uniqueIndents.size > 5) {
      consistencyScore -= 0.2; // Penalize inconsistent indentation
    }

    return Math.max(0, consistencyScore);
  }

  private calculateContextAlignment(content: string, context: ValidationContext): number {
    // Check alignment with mission context and constraints
    let alignmentScore = 1.0;

    // Check for mission-critical patterns
    const missionKeywords = ['divine', 'freedom', 'july-28', 'jahmere'];
    const hasContextualRelevance = missionKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );

    if (!hasContextualRelevance && context.filePath.includes('app/')) {
      alignmentScore -= 0.1; // Slight penalty for missing context in app routes
    }

    return Math.max(0, alignmentScore);
  }

  private averageMetrics(metrics: DriftMetric[]): DriftMetric {
    if (metrics.length === 0) {
      return {
        timestamp: Date.now(),
        semanticComplexity: 0,
        architecturalCompliance: 1,
        styleConsistency: 1,
        contextAlignment: 1
      };
    }

    return {
      timestamp: Date.now(),
      semanticComplexity: metrics.reduce((sum, m) => sum + m.semanticComplexity, 0) / metrics.length,
      architecturalCompliance: metrics.reduce((sum, m) => sum + m.architecturalCompliance, 0) / metrics.length,
      styleConsistency: metrics.reduce((sum, m) => sum + m.styleConsistency, 0) / metrics.length,
      contextAlignment: metrics.reduce((sum, m) => sum + m.contextAlignment, 0) / metrics.length
    };
  }

  private generateDriftAnalysis(current: DriftMetric, results: ValidationResult[]): string {
    return `**Drift Analysis (${new Date().toISOString()})**
- Semantic Complexity: ${current.semanticComplexity.toFixed(3)}
- Architectural Compliance: ${(current.architecturalCompliance * 100).toFixed(1)}%
- Style Consistency: ${(current.styleConsistency * 100).toFixed(1)}%
- Context Alignment: ${(current.contextAlignment * 100).toFixed(1)}%
- Drift Issues Detected: ${results.length}`;
  }

  getLastAnalysis(): string {
    return this.lastAnalysis || 'No drift analysis performed yet';
  }
}

/**
 * Architectural Pattern Matching System
 */
class ArchitecturalPatternMatcher {
  private patterns: ArchitecturalPattern[];
  private lastComplianceReport: string = '';

  constructor(patterns: ArchitecturalPattern[]) {
    this.patterns = patterns;
  }

  async validate(context: ValidationContext): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    const complianceScores: Record<string, number> = {};

    for (const pattern of this.patterns) {
      const matches = context.fileContent.match(pattern.pattern);
      const hasPattern = matches !== null;
      
      if (pattern.required && !hasPattern) {
        results.push({
          rule: `pattern-${pattern.name}`,
          severity: 'error',
          message: `Required architectural pattern '${pattern.name}' not found`,
          suggestions: [
            `Implement ${pattern.name}: ${pattern.description}`,
            ...pattern.examples.map(example => `Example: ${example}`)
          ],
          confidence: 0.9,
          verificationPassed: false
        });
        complianceScores[pattern.name] = 0;
      } else if (hasPattern) {
        complianceScores[pattern.name] = 1;
      }

      // Check for anti-patterns
      for (const antiPattern of pattern.antiPatterns) {
        if (context.fileContent.includes(antiPattern)) {
          results.push({
            rule: `anti-pattern-${pattern.name}`,
            severity: 'warning',
            message: `Anti-pattern detected: ${antiPattern}`,
            suggestions: [
              `Avoid using ${antiPattern}`,
              `Follow ${pattern.name} pattern instead`,
              `See: ${pattern.description}`
            ],
            confidence: 0.8,
            verificationPassed: false
          });
        }
      }
    }

    this.lastComplianceReport = this.generateComplianceReport(complianceScores);
    return results;
  }

  private generateComplianceReport(scores: Record<string, number>): string {
    const totalPatterns = this.patterns.length;
    const compliantPatterns = Object.values(scores).filter(score => score > 0).length;
    const compliancePercentage = totalPatterns > 0 ? (compliantPatterns / totalPatterns) * 100 : 100;

    return `**Pattern Compliance: ${compliancePercentage.toFixed(1)}%** (${compliantPatterns}/${totalPatterns} patterns)

${Object.entries(scores).map(([pattern, score]) => 
  `- ${pattern}: ${score > 0 ? '✅' : '❌'} ${(score * 100).toFixed(0)}%`
).join('\n')}`;
  }

  getComplianceReport(): string {
    return this.lastComplianceReport || 'No compliance analysis performed yet';
  }
}

// Type definitions for drift detection
interface DriftMetric {
  timestamp: number;
  semanticComplexity: number;
  architecturalCompliance: number;
  styleConsistency: number;
  contextAlignment: number;
}

interface DriftScore {
  semantic: number;
  architectural: number;
  confidence: number;
}

// Export the main class and configuration factory
export { AIPromptValidationSystem, type ValidationConfig };

/**
 * Factory function to create JAHmere Bridge specific validation configuration
 */
export function createJAHmereBridgeValidationConfig(projectRoot: string): ValidationConfig {
  return {
    projectRoot,
    architecturalPatterns: [
      {
        name: 'server-components',
        pattern: /export\s+default\s+async\s+function/,
        description: 'Use async Server Components by default',
        required: true,
        examples: ['export default async function Component() {'],
        antiPatterns: ['getServerSideProps', 'getStaticProps']
      },
      {
        name: 'typescript-strict',
        pattern: /:\s*\w+/,
        description: 'Use TypeScript with proper type annotations',
        required: true,
        examples: ['const data: string = "value"'],
        antiPatterns: ['any', 'as any']
      },
      {
        name: 'use-client-minimal',
        pattern: /^['"]use client['"];?\s*$/m,
        description: 'Minimize use client directive usage',
        required: false,
        examples: ['"use client"'],
        antiPatterns: ['use client.*useState.*useEffect']
      }
    ],
    validationRules: [
      {
        id: 'mission-context-alignment',
        name: 'Mission Context Alignment',
        description: 'Ensure code aligns with July 28th mission context',
        validator: (code, context): ValidationResult => {
          const hasMissionContext = /july.?28|freedom|jahmere|divine/i.test(code);
          const isAppRoute = context.filePath.includes('app/');
          
          if (isAppRoute && !hasMissionContext) {
            return {
              rule: 'mission-context-alignment',
              severity: 'warning',
              message: 'App route missing mission context alignment',
              suggestions: ['Add mission-relevant context', 'Include July 28th deadline awareness'],
              confidence: 0.7,
              verificationPassed: false
            };
          }
          
          return {
            rule: 'mission-context-alignment',
            severity: 'info',
            message: 'Mission context alignment verified',
            suggestions: [],
            confidence: 1.0,
            verificationPassed: true
          };
        },
        severity: 'warning',
        category: 'alignment'
      },
      {
        id: 'performance-requirements',
        name: 'Performance Requirements',
        description: 'Validate against <7ms API and <5s build requirements',
        validator: (code, context): ValidationResult => {
          const hasSlowOperations = /setTimeout|setInterval|while\s*\(true\)|for\s*\(.*;\s*true/i.test(code);
          
          if (hasSlowOperations) {
            return {
              rule: 'performance-requirements',
              severity: 'warning',
              message: 'Potential performance issue detected',
              suggestions: ['Optimize loops and async operations', 'Consider performance impact'],
              confidence: 0.6,
              verificationPassed: false
            };
          }
          
          return {
            rule: 'performance-requirements',
            severity: 'info',
            message: 'Performance requirements validated',
            suggestions: [],
            confidence: 1.0,
            verificationPassed: true
          };
        },
        severity: 'warning',
        category: 'performance'
      }
    ],
    chainOfVerification: {
      enabled: true,
      verificationSteps: [
        {
          name: 'functional-correctness',
          question: 'Does this code meet the functional requirements?',
          validator: (code, context) => {
            // Basic syntax check
            try {
              // Simple validation - in production this would be more sophisticated
              return !code.includes('TODO') && !code.includes('FIXME');
            } catch {
              return false;
            }
          },
          weight: 0.9
        },
        {
          name: 'architectural-compliance',
          question: 'Does this code follow our architectural patterns?',
          validator: (code, context) => {
            if (context.projectContext.framework === 'next.js') {
              return !code.includes('getServerSideProps') && !code.includes('getStaticProps');
            }
            return true;
          },
          weight: 0.8
        },
        {
          name: 'security-check',
          question: 'Is this code free from obvious security issues?',
          validator: (code, context) => {
            const securityIssues = /eval\(|innerHTML\s*=|document\.write|dangerouslySetInnerHTML/i;
            return !securityIssues.test(code);
          },
          weight: 1.0
        }
      ],
      confidenceThreshold: 0.7,
      selfCorrectionEnabled: true
    },
    contextualAlignment: {
      missionContext: 'JAHmere Webb Freedom Portal - July 28, 2025 Mission',
      techStackConstraints: [
        'Next.js 15.4.3 App Router only',
        'TypeScript strict mode required',
        'React 19 Server Components preferred',
        'Tailwind CSS for styling',
        'Zustand for state management'
      ],
      performanceRequirements: {
        'api-response-time': 7, // ms
        'build-time': 5000, // ms
        'bundle-size': 200 // KB
      },
      qualityGates: [
        { name: 'type-coverage', threshold: 95, metric: 'percentage', blocker: true },
        { name: 'test-coverage', threshold: 80, metric: 'percentage', blocker: false },
        { name: 'performance-score', threshold: 90, metric: 'score', blocker: true }
      ]
    }
  };
}

// CLI interface if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const projectRoot = process.cwd();
  const config = createJAHmereBridgeValidationConfig(projectRoot);
  const validator = new AIPromptValidationSystem(config);

  console.log('🤖 AI Prompt Validation System v2.0');
  console.log('====================================');
  console.log('Ready for AI-generated code validation');
  console.log(`Project: ${config.contextualAlignment.missionContext}`);
  console.log(`Framework: ${config.contextualAlignment.techStackConstraints[0]}`);
  console.log(`Chain-of-Verification: ${config.chainOfVerification.enabled ? 'Enabled' : 'Disabled'}`);
} 