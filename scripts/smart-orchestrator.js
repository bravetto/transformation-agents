#!/usr/bin/env node

/**
 * 🧠 SMART SCRIPT ORCHESTRATION (SSO) SYSTEM
 * Intelligent automation that selects optimal scripts based on context and system state
 * 
 * Mission: Ensure championship-level automation for July 28th deadline
 * Architecture: Context-aware script selection with defensive protocols
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync, spawn } = require('child_process');

// System State Types
const SYSTEM_STATES = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded', 
  CRITICAL: 'critical',
  EMERGENCY: 'emergency'
};

const SCRIPT_CATEGORIES = {
  EMERGENCY: 'emergency',
  DEVELOPMENT: 'development',
  DEPLOYMENT: 'deployment',
  MAINTENANCE: 'maintenance',
  MONITORING: 'monitoring'
};

const PRIORITY_LEVELS = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
  BACKGROUND: 5
};

/**
 * Smart Script Orchestrator
 * Intelligently coordinates script execution based on system context
 */
class SmartScriptOrchestrator {
  constructor() {
    this.scriptsRegistry = new Map();
    this.executionHistory = [];
    this.systemState = SYSTEM_STATES.HEALTHY;
    this.currentContext = {};
    this.isRunning = false;
    
    this.initializeScriptsRegistry();
  }

  /**
   * Initialize the scripts registry with metadata and execution rules
   */
  initializeScriptsRegistry() {
    const scripts = [
      // LEVEL 1 - Emergency Response
      {
        id: 'clean-start',
        path: 'scripts/maintenance/clean-start.sh',
        category: SCRIPT_CATEGORIES.EMERGENCY,
        priority: PRIORITY_LEVELS.CRITICAL,
        description: 'Complete system reset and clean startup',
        triggers: ['system_crash', 'build_failure', 'port_conflict'],
        prerequisites: [],
        estimatedDuration: 30000, // 30 seconds
        autoExecute: true,
        conditions: {
          systemState: [SYSTEM_STATES.CRITICAL, SYSTEM_STATES.EMERGENCY],
          maxRetries: 3,
          cooldown: 60000 // 1 minute
        }
      },
      {
        id: 'build-health-monitor',
        path: 'scripts/build-health-monitor.js',
        category: SCRIPT_CATEGORIES.MONITORING,
        priority: PRIORITY_LEVELS.CRITICAL,
        description: 'Build validation and health monitoring',
        triggers: ['build_error', 'typescript_error', 'dependency_issue'],
        prerequisites: [],
        estimatedDuration: 15000, // 15 seconds
        autoExecute: true,
        conditions: {
          systemState: [SYSTEM_STATES.DEGRADED, SYSTEM_STATES.CRITICAL],
          maxRetries: 2,
          cooldown: 30000
        }
      },
      {
        id: 'divine-startup',
        path: 'scripts/divine-startup.sh',
        category: SCRIPT_CATEGORIES.EMERGENCY,
        priority: PRIORITY_LEVELS.HIGH,
        description: 'Defensive startup protocol with system validation',
        triggers: ['startup_failure', 'environment_issue'],
        prerequisites: [],
        estimatedDuration: 45000, // 45 seconds
        autoExecute: false,
        conditions: {
          systemState: [SYSTEM_STATES.DEGRADED, SYSTEM_STATES.CRITICAL],
          maxRetries: 2,
          cooldown: 120000 // 2 minutes
        }
      },

      // LEVEL 2 - Development Operations
      {
        id: 'environment-setup',
        path: 'scripts/environment-setup.js',
        category: SCRIPT_CATEGORIES.DEVELOPMENT,
        priority: PRIORITY_LEVELS.HIGH,
        description: 'Environment configuration and validation',
        triggers: ['env_missing', 'config_error', 'setup_required'],
        prerequisites: [],
        estimatedDuration: 60000, // 1 minute
        autoExecute: false,
        conditions: {
          systemState: [SYSTEM_STATES.HEALTHY, SYSTEM_STATES.DEGRADED],
          maxRetries: 1,
          cooldown: 300000 // 5 minutes
        }
      },
      {
        id: 'validate-environment',
        path: 'scripts/validate-environment.js',
        category: SCRIPT_CATEGORIES.DEVELOPMENT,
        priority: PRIORITY_LEVELS.MEDIUM,
        description: 'Comprehensive environment validation',
        triggers: ['validation_required', 'setup_complete'],
        prerequisites: ['environment-setup'],
        estimatedDuration: 30000,
        autoExecute: true,
        conditions: {
          systemState: [SYSTEM_STATES.HEALTHY, SYSTEM_STATES.DEGRADED],
          maxRetries: 1,
          cooldown: 600000 // 10 minutes
        }
      },
      {
        id: 'codebase-sanitizer',
        path: 'scripts/codebase-sanitizer.js',
        category: SCRIPT_CATEGORIES.MAINTENANCE,
        priority: PRIORITY_LEVELS.MEDIUM,
        description: 'Code cleanup and optimization',
        triggers: ['code_cleanup', 'optimization_needed'],
        prerequisites: [],
        estimatedDuration: 120000, // 2 minutes
        autoExecute: false,
        conditions: {
          systemState: [SYSTEM_STATES.HEALTHY],
          maxRetries: 1,
          cooldown: 3600000 // 1 hour
        }
      },

      // LEVEL 3 - Deployment Pipeline
      {
        id: 'production-deployment-checklist',
        path: 'scripts/production-deployment-checklist.sh',
        category: SCRIPT_CATEGORIES.DEPLOYMENT,
        priority: PRIORITY_LEVELS.HIGH,
        description: 'Pre-deployment validation checklist',
        triggers: ['pre_deploy', 'deployment_prep'],
        prerequisites: ['validate-environment'],
        estimatedDuration: 90000, // 1.5 minutes
        autoExecute: false,
        conditions: {
          systemState: [SYSTEM_STATES.HEALTHY],
          maxRetries: 1,
          cooldown: 300000
        }
      },
      {
        id: 'vercel-deploy',
        path: 'scripts/vercel-deploy.sh',
        category: SCRIPT_CATEGORIES.DEPLOYMENT,
        priority: PRIORITY_LEVELS.CRITICAL,
        description: 'Vercel deployment with validation',
        triggers: ['deploy_ready', 'manual_deploy'],
        prerequisites: ['production-deployment-checklist'],
        estimatedDuration: 180000, // 3 minutes
        autoExecute: false,
        conditions: {
          systemState: [SYSTEM_STATES.HEALTHY],
          maxRetries: 2,
          cooldown: 600000
        }
      }
    ];

    // Register all scripts
    scripts.forEach(script => {
      this.scriptsRegistry.set(script.id, {
        ...script,
        lastExecuted: null,
        executionCount: 0,
        successCount: 0,
        failureCount: 0,
        averageDuration: script.estimatedDuration,
        isExecuting: false
      });
    });

    console.log(`📋 Smart Orchestrator: Registered ${scripts.length} scripts`);
  }

  /**
   * Analyze current system state and context
   */
  async analyzeSystemState() {
    try {
      const context = {
        timestamp: Date.now(),
        nodeVersion: process.version,
        platform: process.platform,
        workingDirectory: process.cwd(),
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime()
      };

      // Check if development server is running
      try {
        const devServerCheck = execSync('lsof -ti:1437', { encoding: 'utf8', timeout: 5000 });
        context.devServerRunning = !!devServerCheck.trim();
      } catch {
        context.devServerRunning = false;
      }

      // Check build health
      try {
        await fs.access('.next/routes-manifest.json');
        context.buildHealthy = true;
      } catch {
        context.buildHealthy = false;
      }

      // Check package.json and dependencies
      try {
        const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
        context.hasPackageJson = true;
        context.projectName = packageJson.name;
        context.scripts = Object.keys(packageJson.scripts || {});
      } catch {
        context.hasPackageJson = false;
      }

      // Determine system state based on context
      let systemState = SYSTEM_STATES.HEALTHY;
      
      if (!context.hasPackageJson || !context.buildHealthy) {
        systemState = SYSTEM_STATES.CRITICAL;
      } else if (!context.devServerRunning) {
        systemState = SYSTEM_STATES.DEGRADED;
      }

      this.currentContext = context;
      this.systemState = systemState;

      console.log(`🔍 System Analysis Complete:`, {
        state: systemState,
        devServer: context.devServerRunning,
        buildHealth: context.buildHealthy,
        memory: `${Math.round(context.memoryUsage.used / 1024 / 1024)}MB`
      });

      return { context, systemState };

    } catch (error) {
      console.error('❌ System analysis failed:', error.message);
      this.systemState = SYSTEM_STATES.EMERGENCY;
      return { context: {}, systemState: SYSTEM_STATES.EMERGENCY };
    }
  }

  /**
   * Get recommended scripts based on current system state and triggers
   */
  getRecommendedScripts(triggers = []) {
    const recommendations = [];
    const now = Date.now();

    for (const [scriptId, script] of this.scriptsRegistry) {
      // Skip if script is currently executing
      if (script.isExecuting) continue;

      // Check if script is on cooldown
      if (script.lastExecuted && (now - script.lastExecuted) < script.conditions.cooldown) {
        continue;
      }

      // Check if system state matches script conditions
      if (!script.conditions.systemState.includes(this.systemState)) {
        continue;
      }

      // Check if any triggers match
      const hasMatchingTrigger = triggers.length === 0 || 
        triggers.some(trigger => script.triggers.includes(trigger));
      
      if (!hasMatchingTrigger) continue;

      // Check prerequisites
      const prerequisitesMet = script.prerequisites.every(prereqId => {
        const prereq = this.scriptsRegistry.get(prereqId);
        return prereq && prereq.lastExecuted && prereq.successCount > 0;
      });

      if (!prerequisitesMet) continue;

      // Calculate recommendation score
      const score = this.calculateRecommendationScore(script, triggers);
      
      recommendations.push({
        scriptId,
        script,
        score,
        reason: this.getRecommendationReason(script, triggers)
      });
    }

    // Sort by score (highest first) and priority (lowest number = highest priority)
    return recommendations.sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      return a.script.priority - b.script.priority;
    });
  }

  /**
   * Calculate recommendation score for a script
   */
  calculateRecommendationScore(script, triggers) {
    let score = 0;

    // Base score from priority (higher priority = higher score)
    score += (6 - script.priority) * 20;

    // Bonus for matching triggers
    const matchingTriggers = triggers.filter(t => script.triggers.includes(t)).length;
    score += matchingTriggers * 15;

    // Bonus for auto-executable scripts in critical situations
    if (script.autoExecute && this.systemState === SYSTEM_STATES.CRITICAL) {
      score += 25;
    }

    // Penalty for recent failures
    if (script.failureCount > script.successCount) {
      score -= 10;
    }

    // Bonus for reliable scripts
    if (script.successCount > 3 && script.failureCount === 0) {
      score += 10;
    }

    return score;
  }

  /**
   * Get human-readable reason for script recommendation
   */
  getRecommendationReason(script, triggers) {
    const reasons = [];

    if (this.systemState === SYSTEM_STATES.CRITICAL) {
      reasons.push('System in critical state');
    }
    
    const matchingTriggers = triggers.filter(t => script.triggers.includes(t));
    if (matchingTriggers.length > 0) {
      reasons.push(`Triggered by: ${matchingTriggers.join(', ')}`);
    }

    if (script.autoExecute) {
      reasons.push('Auto-executable');
    }

    if (script.priority <= PRIORITY_LEVELS.HIGH) {
      reasons.push('High priority');
    }

    return reasons.join('; ') || 'General system maintenance';
  }

  /**
   * Execute a script with monitoring and error handling
   */
  async executeScript(scriptId, options = {}) {
    const script = this.scriptsRegistry.get(scriptId);
    if (!script) {
      throw new Error(`Script not found: ${scriptId}`);
    }

    if (script.isExecuting) {
      throw new Error(`Script already executing: ${scriptId}`);
    }

    // Check retry limits
    if (script.failureCount >= script.conditions.maxRetries) {
      throw new Error(`Script exceeded max retries: ${scriptId}`);
    }

    console.log(`🚀 Executing script: ${scriptId} (${script.description})`);
    
    const execution = {
      scriptId,
      startTime: Date.now(),
      endTime: null,
      success: false,
      output: '',
      error: null,
      duration: 0
    };

    try {
      // Mark as executing
      script.isExecuting = true;
      script.executionCount++;

      // Execute the script
      const scriptPath = path.resolve(script.path);
      const isShellScript = scriptPath.endsWith('.sh');
      
      let command, args;
      if (isShellScript) {
        command = 'bash';
        args = [scriptPath];
      } else {
        command = 'node';
        args = [scriptPath];
      }

      // Execute with timeout
      const result = await this.executeWithTimeout(command, args, {
        timeout: script.estimatedDuration * 2, // 2x estimated duration as timeout
        cwd: process.cwd(),
        ...options
      });

      execution.endTime = Date.now();
      execution.duration = execution.endTime - execution.startTime;
      execution.output = result.stdout;
      execution.success = true;

      // Update script statistics
      script.successCount++;
      script.lastExecuted = execution.endTime;
      script.averageDuration = Math.round(
        (script.averageDuration + execution.duration) / 2
      );

      console.log(`✅ Script completed: ${scriptId} (${execution.duration}ms)`);

    } catch (error) {
      execution.endTime = Date.now();
      execution.duration = execution.endTime - execution.startTime;
      execution.error = error.message;
      execution.success = false;

      // Update script statistics
      script.failureCount++;
      script.lastExecuted = execution.endTime;

      console.error(`❌ Script failed: ${scriptId} - ${error.message}`);
      throw error;

    } finally {
      // Mark as no longer executing
      script.isExecuting = false;
      
      // Add to execution history
      this.executionHistory.push(execution);
      
      // Keep only last 100 executions
      if (this.executionHistory.length > 100) {
        this.executionHistory.splice(0, this.executionHistory.length - 100);
      }
    }

    return execution;
  }

  /**
   * Execute command with timeout
   */
  executeWithTimeout(command, args, options) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        ...options
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
        if (!options.silent) {
          process.stdout.write(data);
        }
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
        if (!options.silent) {
          process.stderr.write(data);
        }
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve({ stdout, stderr, code });
        } else {
          reject(new Error(`Process exited with code ${code}: ${stderr}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });

      // Set timeout
      if (options.timeout) {
        setTimeout(() => {
          child.kill('SIGTERM');
          reject(new Error(`Process timed out after ${options.timeout}ms`));
        }, options.timeout);
      }
    });
  }

  /**
   * Auto-execute recommended scripts based on system state
   */
  async autoExecuteRecommendations(triggers = []) {
    const recommendations = this.getRecommendedScripts(triggers);
    const autoExecutable = recommendations.filter(r => r.script.autoExecute);

    if (autoExecutable.length === 0) {
      console.log('📋 No auto-executable scripts recommended');
      return [];
    }

    console.log(`🤖 Auto-executing ${autoExecutable.length} recommended scripts`);
    
    const results = [];
    for (const recommendation of autoExecutable) {
      try {
        const result = await this.executeScript(recommendation.scriptId);
        results.push({ ...recommendation, execution: result });
      } catch (error) {
        results.push({ 
          ...recommendation, 
          execution: { success: false, error: error.message }
        });
      }
    }

    return results;
  }

  /**
   * Get system status and script recommendations
   */
  async getSystemStatus() {
    await this.analyzeSystemState();
    const recommendations = this.getRecommendedScripts();
    
    return {
      systemState: this.systemState,
      context: this.currentContext,
      recommendations: recommendations.slice(0, 5), // Top 5 recommendations
      executionHistory: this.executionHistory.slice(-10), // Last 10 executions
      scriptsStatus: Object.fromEntries(
        Array.from(this.scriptsRegistry.entries()).map(([id, script]) => [
          id,
          {
            isExecuting: script.isExecuting,
            executionCount: script.executionCount,
            successRate: script.executionCount > 0 
              ? Math.round((script.successCount / script.executionCount) * 100) 
              : 0,
            lastExecuted: script.lastExecuted
          }
        ])
      )
    };
  }

  /**
   * Emergency system recovery - execute critical scripts automatically
   */
  async emergencyRecovery() {
    console.log('🚨 EMERGENCY RECOVERY INITIATED');
    
    this.systemState = SYSTEM_STATES.EMERGENCY;
    
    const emergencyTriggers = [
      'system_crash',
      'build_failure', 
      'startup_failure',
      'emergency_recovery'
    ];

    const results = await this.autoExecuteRecommendations(emergencyTriggers);
    
    console.log(`🚨 Emergency recovery completed: ${results.length} scripts executed`);
    return results;
  }
}

// CLI Interface
async function main() {
  const orchestrator = new SmartScriptOrchestrator();
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'status':
        const status = await orchestrator.getSystemStatus();
        console.log('\n📊 SYSTEM STATUS REPORT');
        console.log('========================');
        console.log(`System State: ${status.systemState}`);
        console.log(`Dev Server: ${status.context.devServerRunning ? '✅' : '❌'}`);
        console.log(`Build Health: ${status.context.buildHealthy ? '✅' : '❌'}`);
        console.log(`\n🎯 TOP RECOMMENDATIONS:`);
        status.recommendations.forEach((rec, i) => {
          console.log(`${i + 1}. ${rec.scriptId} (Score: ${rec.score}) - ${rec.reason}`);
        });
        break;

      case 'execute':
        const scriptId = args[1];
        if (!scriptId) {
          console.error('❌ Please specify a script ID to execute');
          process.exit(1);
        }
        await orchestrator.executeScript(scriptId);
        break;

      case 'auto':
        const triggers = args.slice(1);
        console.log(`🤖 Auto-executing with triggers: [${triggers.join(', ')}]`);
        const results = await orchestrator.autoExecuteRecommendations(triggers);
        console.log(`✅ Auto-execution completed: ${results.length} scripts`);
        break;

      case 'emergency':
        await orchestrator.emergencyRecovery();
        break;

      case 'analyze':
        await orchestrator.analyzeSystemState();
        console.log('✅ System analysis completed');
        break;

      default:
        console.log(`
🧠 SMART SCRIPT ORCHESTRATION (SSO) SYSTEM

Usage:
  node scripts/smart-orchestrator.js <command> [options]

Commands:
  status      - Show system status and script recommendations
  execute <id> - Execute specific script by ID
  auto [triggers] - Auto-execute recommended scripts with optional triggers
  emergency   - Emergency system recovery
  analyze     - Analyze current system state

Examples:
  node scripts/smart-orchestrator.js status
  node scripts/smart-orchestrator.js execute clean-start
  node scripts/smart-orchestrator.js auto build_failure env_missing
  node scripts/smart-orchestrator.js emergency

Mission: Supporting JAHmere Webb's freedom through intelligent automation
        `);
        break;
    }
  } catch (error) {
    console.error('❌ Orchestrator error:', error.message);
    process.exit(1);
  }
}

// Export for programmatic use
module.exports = { SmartScriptOrchestrator, SYSTEM_STATES, SCRIPT_CATEGORIES, PRIORITY_LEVELS };

// Run CLI if called directly
if (require.main === module) {
  main();
} 