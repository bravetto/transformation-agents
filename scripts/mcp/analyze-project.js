#!/usr/bin/env node

/**
 * 📊 Project Analysis Script using MCP Intelligence
 */

const { JahmereBridgeServer } = require("./jahmere-bridge-server.js");

async function analyzeProject() {
  console.log("📊 Analyzing JAHmere Bridge Project...");

  try {
    const server = new JahmereBridgeServer();

    // Direct analysis call
    const analysis = await server.analyzeProjectArchitecture({
      focus: "all",
      include_metrics: true,
    });

    console.log("\n🌉 JAHmere Bridge Project Analysis:");
    console.log("=".repeat(50));
    console.log(analysis.content[0].text);
  } catch (error) {
    console.error("❌ Analysis failed:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  analyzeProject();
}
