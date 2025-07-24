#!/usr/bin/env node

/**
 * 🎯 Cursor-Specific MCP Setup Helper
 * Provides exact instructions for manual MCP server setup in Cursor IDE
 */

const path = require("path");
const fs = require("fs");

console.log("🌉 JAHmere Bridge MCP Server - Cursor Setup Helper");
console.log("=".repeat(55));
console.log("");

// Get absolute paths
const projectRoot = process.cwd();
const serverScript = path.join(
  projectRoot,
  "scripts/mcp/jahmere-bridge-server.js",
);

// Verify server script exists
if (!fs.existsSync(serverScript)) {
  console.log("❌ Server script not found at:", serverScript);
  process.exit(1);
}

console.log("📋 MANUAL SETUP INSTRUCTIONS FOR CURSOR IDE:");
console.log("");
console.log("1️⃣  In Cursor, go to Settings → Tools & Integrations");
console.log('2️⃣  Click "New MCP Server" button');
console.log("3️⃣  Enter these EXACT values:");
console.log("");
console.log("┌─────────────────────────────────────────────────────────┐");
console.log("│ Server Configuration                                    │");
console.log("├─────────────────────────────────────────────────────────┤");
console.log(`│ Name: jahmere-bridge                                    │`);
console.log(`│ Command: node                                           │`);
console.log(`│ Arguments: scripts/mcp/jahmere-bridge-server.js         │`);
console.log(`│ Working Directory: ${projectRoot.substring(0, 47)}...│`);
console.log(`│ Environment: NODE_ENV=development                       │`);
console.log("└─────────────────────────────────────────────────────────┘");
console.log("");
console.log('4️⃣  Click "Add Server"');
console.log("5️⃣  Toggle the switch to ENABLE the server");
console.log('6️⃣  You should see "jahmere-bridge" with X tools enabled');
console.log("");

// Copy paths to clipboard helper
console.log("📋 QUICK COPY VALUES:");
console.log("");
console.log("Name:");
console.log("jahmere-bridge");
console.log("");
console.log("Command:");
console.log("node");
console.log("");
console.log("Arguments:");
console.log("scripts/mcp/jahmere-bridge-server.js");
console.log("");
console.log("Working Directory:");
console.log(projectRoot);
console.log("");

console.log("🎯 DIVINE VERIFICATION:");
console.log("After setup, you should see these 6 tools available:");
console.log("✅ analyze_project_architecture");
console.log("✅ optimize_character_witness");
console.log("✅ check_divine_performance");
console.log("✅ generate_divine_component");
console.log("✅ analyze_spiritual_analytics");
console.log("✅ validate_production_readiness");
console.log("");

console.log("💡 USAGE EXAMPLE:");
console.log("After setup, press Cmd+L in Cursor and try:");
console.log('"@jahmere-bridge analyze the current architecture"');
console.log("");

console.log("🌉 Divine development intelligence awaits activation!");
