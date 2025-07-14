#!/usr/bin/env node

/**
 * CASCADE PREVENTION SYSTEM - QUANTUM PRODUCTION ARCHITECT v2
 * Monitors for webpack corruption patterns and implements automatic recovery
 */

const fs = require("fs");
const path = require("path");
const { spawn, exec } = require("child_process");

class CascadePreventionSystem {
  constructor() {
    this.corruptionPatterns = [
      /Cannot find module '\.\/\d+\.js'/,
      /EADDRINUSE.*:::3714/,
      /webpack.*MODULE_NOT_FOUND/,
      /vendor-chunks.*not found/,
      /Error: listen EADDRINUSE/,
    ];

    this.recoveryProtocols = {
      webpackCorruption: this.handleWebpackCorruption.bind(this),
      portCollision: this.handlePortCollision.bind(this),
      cachePoison: this.handleCachePoison.bind(this),
      vendorChunkFailure: this.handleVendorChunkFailure.bind(this),
    };

    this.isRecovering = false;
    this.maxRecoveryAttempts = 3;
    this.recoveryAttempts = 0;
  }

  /**
   * Monitor build output for corruption patterns
   */
  monitorBuildOutput(data) {
    const output = data.toString();
    console.log(`[MONITOR] ${output.trim()}`);

    // Check for corruption patterns
    for (const pattern of this.corruptionPatterns) {
      if (pattern.test(output)) {
        console.error(`🚨 CORRUPTION DETECTED: ${pattern}`);
        this.triggerRecovery(pattern, output);
        return;
      }
    }

    // Check for success patterns
    if (
      output.includes("✓ Ready in") ||
      output.includes("compiled successfully")
    ) {
      console.log("✅ BUILD SUCCESS - Resetting recovery counter");
      this.recoveryAttempts = 0;
      this.isRecovering = false;
    }
  }

  /**
   * Trigger recovery protocol based on detected pattern
   */
  async triggerRecovery(pattern, output) {
    if (this.isRecovering) {
      console.log("⏳ Recovery already in progress...");
      return;
    }

    if (this.recoveryAttempts >= this.maxRecoveryAttempts) {
      console.error(
        "❌ MAX RECOVERY ATTEMPTS REACHED - Manual intervention required",
      );
      process.exit(1);
    }

    this.isRecovering = true;
    this.recoveryAttempts++;

    console.log(
      `🔄 RECOVERY ATTEMPT ${this.recoveryAttempts}/${this.maxRecoveryAttempts}`,
    );

    // Determine recovery protocol
    if (pattern.toString().includes("Cannot find module")) {
      await this.recoveryProtocols.webpackCorruption(output);
    } else if (pattern.toString().includes("EADDRINUSE")) {
      await this.recoveryProtocols.portCollision(output);
    } else if (pattern.toString().includes("vendor-chunks")) {
      await this.recoveryProtocols.vendorChunkFailure(output);
    } else {
      await this.recoveryProtocols.cachePoison(output);
    }
  }

  /**
   * Handle webpack chunk corruption
   */
  async handleWebpackCorruption(output) {
    console.log("🔧 PROTOCOL: Webpack Corruption Recovery");

    // Extract missing module ID
    const match = output.match(/Cannot find module '\.\/(\d+)\.js'/);
    const moduleId = match ? match[1] : "unknown";

    console.log(`🎯 Missing module ID: ${moduleId}`);

    // Kill all processes
    await this.executeCommand('pkill -f "node.*3714" && pkill -f "next.*dev"');
    await this.sleep(2000);

    // Complete cache purge
    await this.executeCommand("rm -rf .next");
    await this.executeCommand("rm -rf node_modules/.cache");

    // Rebuild and restart
    console.log("🔄 Rebuilding from clean state...");
    await this.executeCommand("npm run build");

    // Restart dev server
    this.startDevServer();
  }

  /**
   * Handle port collision
   */
  async handlePortCollision(output) {
    console.log("🔧 PROTOCOL: Port Collision Recovery");

    // Kill all processes on port 3714
    await this.executeCommand("lsof -ti:3714 | xargs kill -9");
    await this.sleep(3000);

    // Verify port is free
    try {
      const portCheck = await this.executeCommand("lsof -i:3714");
      if (portCheck.includes("3714")) {
        console.error(
          "❌ Port 3714 still in use - MANUAL INTERVENTION REQUIRED",
        );
        console.log(
          "🔧 Please manually run: sudo lsof -ti:3714 | xargs sudo kill -9",
        );
        console.log(
          "🛑 Stopping automatic recovery to prevent system conflicts",
        );
        process.exit(1);
      }
    } catch (error) {
      // Port check failed, assume port is free
      console.log("✅ Port check completed (assuming free)");
    }

    this.startDevServer();
  }

  /**
   * Handle cache poisoning
   */
  async handleCachePoison(output) {
    console.log("🔧 PROTOCOL: Cache Poison Recovery");

    // Nuclear cache cleaning
    await this.executeCommand("npm cache clean --force");
    await this.executeCommand("rm -rf .next");
    await this.executeCommand("rm -rf node_modules/.cache");
    await this.executeCommand("rm -rf ~/.npm/_cacache");

    // Reinstall dependencies
    console.log("🔄 Reinstalling dependencies...");
    await this.executeCommand("npm install --no-optional");

    this.startDevServer();
  }

  /**
   * Handle vendor chunk failure
   */
  async handleVendorChunkFailure(output) {
    console.log("🔧 PROTOCOL: Vendor Chunk Recovery");

    // Check for specific vendor chunk issues
    if (output.includes("framer-motion")) {
      console.log("🎯 Framer Motion vendor chunk corruption detected");

      // Remove framer-motion cache specifically
      await this.executeCommand("rm -rf node_modules/.cache/webpack");
      await this.executeCommand("rm -rf .next/cache");
    }

    await this.handleWebpackCorruption(output);
  }

  /**
   * Start development server with monitoring
   */
  startDevServer() {
    console.log("🚀 Starting monitored development server...");

    const devProcess = spawn("npm", ["run", "dev"], {
      stdio: "pipe",
      env: { ...process.env, PORT: "3714" },
    });

    devProcess.stdout.on("data", (data) => {
      this.monitorBuildOutput(data);
    });

    devProcess.stderr.on("data", (data) => {
      this.monitorBuildOutput(data);
    });

    devProcess.on("close", (code) => {
      if (code !== 0 && !this.isRecovering) {
        console.error(`❌ Dev server crashed with code ${code}`);
        this.triggerRecovery(
          /server crashed/,
          `Process exited with code ${code}`,
        );
      }
    });

    // Set recovery flag to false after startup delay
    setTimeout(() => {
      this.isRecovering = false;
    }, 10000);
  }

  /**
   * Execute command with promise wrapper
   */
  executeCommand(command) {
    return new Promise((resolve, reject) => {
      console.log(`🔧 Executing: ${command}`);

      exec(command, (error, stdout, stderr) => {
        if (error && !command.includes("pkill") && !command.includes("kill")) {
          console.error(`❌ Command failed: ${error.message}`);
          reject(error);
          return;
        }

        if (stdout) console.log(`✅ ${stdout.trim()}`);
        if (stderr && !stderr.includes("No such process")) {
          console.warn(`⚠️ ${stderr.trim()}`);
        }

        resolve(stdout);
      });
    });
  }

  /**
   * Sleep utility
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Validate system state before starting
   */
  async validateSystemState() {
    console.log("🔍 Validating system state...");

    // Check if .next exists and is healthy
    if (fs.existsSync(".next")) {
      const nextStats = fs.statSync(".next");
      const ageMs = Date.now() - nextStats.mtime.getTime();
      const ageMinutes = Math.floor(ageMs / 60000);

      console.log(`📁 .next directory age: ${ageMinutes} minutes`);

      if (ageMinutes > 60) {
        console.log("🔄 .next directory is old, cleaning...");
        await this.executeCommand("rm -rf .next");
      }
    }

    // Check for zombie processes
    try {
      const processes = await this.executeCommand("lsof -i:3714");
      if (processes.trim()) {
        console.log("🧟 Zombie processes detected on port 3714, cleaning...");
        await this.handlePortCollision("");
      }
    } catch (error) {
      // No processes found, which is good
      console.log("✅ Port 3714 is clean");
    }
  }

  /**
   * Start the cascade prevention system
   */
  async start() {
    console.log("🛡️ CASCADE PREVENTION SYSTEM ACTIVATED");
    console.log(
      "🎯 QUANTUM PRODUCTION ARCHITECT v2 - Webpack Corruption Protection",
    );

    await this.validateSystemState();
    this.startDevServer();

    // Keep process alive
    process.on("SIGINT", () => {
      console.log("\n🛑 Shutdown signal received");
      process.exit(0);
    });
  }
}

// Start the system if called directly
if (require.main === module) {
  const cascadePrevention = new CascadePreventionSystem();
  cascadePrevention.start().catch(console.error);
}

module.exports = CascadePreventionSystem;
