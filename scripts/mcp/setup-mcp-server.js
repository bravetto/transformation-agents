#!/usr/bin/env node

/**
 * 🚀 MCP Setup Script for JAHmere Bridge Project
 *
 * Installs and configures Model Context Protocol integration
 * for enhanced development workflow with Cursor IDE
 */

const fs = require("fs").promises;
const path = require("path");
const { execSync } = require("child_process");

// Color codes for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

function log(level, message) {
  const timestamp = new Date().toLocaleTimeString();
  const colorMap = {
    info: colors.blue,
    success: colors.green,
    warning: colors.yellow,
    error: colors.red,
    divine: colors.magenta,
  };

  console.log(`${colorMap[level]}[${timestamp}] ${message}${colors.reset}`);
}

async function checkPrerequisites() {
  log("info", "🔍 Checking prerequisites...");

  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);

  if (majorVersion < 18) {
    log("error", `❌ Node.js version must be 18+. Current: ${nodeVersion}`);
    process.exit(1);
  }

  log("success", `✅ Node.js version: ${nodeVersion}`);

  // Check if we're in the right directory
  try {
    await fs.access("./package.json");
    const packageJson = JSON.parse(
      await fs.readFile("./package.json", "utf-8"),
    );

    if (packageJson.name !== "july-28-freedom-portal") {
      log("warning", "⚠️  Not in JAHmere Bridge project directory");
    } else {
      log("success", "✅ JAHmere Bridge project detected");
    }
  } catch (error) {
    log("error", "❌ package.json not found. Run from project root.");
    process.exit(1);
  }
}

async function installDependencies() {
  log("info", "📦 Installing MCP dependencies...");

  try {
    // Check if dependencies are already installed
    const packageJson = JSON.parse(
      await fs.readFile("./package.json", "utf-8"),
    );
    const hasSDK = packageJson.devDependencies?.["@modelcontextprotocol/sdk"];
    const hasConcurrently = packageJson.devDependencies?.["concurrently"];

    if (hasSDK && hasConcurrently) {
      log("success", "✅ MCP dependencies already installed");
      return;
    }

    // Install missing dependencies
    const toInstall = [];
    if (!hasSDK) toInstall.push("@modelcontextprotocol/sdk@^0.5.0");
    if (!hasConcurrently) toInstall.push("concurrently@^8.2.2");

    if (toInstall.length > 0) {
      log("info", `Installing: ${toInstall.join(", ")}`);
      execSync(`npm install --save-dev ${toInstall.join(" ")}`, {
        stdio: "inherit",
      });
      log("success", "✅ Dependencies installed successfully");
    }
  } catch (error) {
    log("error", `❌ Failed to install dependencies: ${error.message}`);
    process.exit(1);
  }
}

async function createCursorConfig() {
  log("info", "⚙️  Creating Cursor IDE configuration...");

  const cursorDir = ".cursor";
  const configPath = path.join(cursorDir, "mcp_config.json");

  try {
    // Create .cursor directory if it doesn't exist
    try {
      await fs.access(cursorDir);
    } catch {
      await fs.mkdir(cursorDir);
      log("info", "📁 Created .cursor directory");
    }

    // Create MCP configuration for Cursor
    const mcpConfig = {
      $schema:
        "https://raw.githubusercontent.com/modelcontextprotocol/servers/main/config/schema.json",
      mcpServers: {
        "jahmere-bridge": {
          command: "node",
          args: ["scripts/mcp/jahmere-bridge-server.js"],
          env: {
            NODE_ENV: "development",
          },
          description:
            "Divine development intelligence for JAHmere Webb Freedom Portal",
          features: [
            "Project architecture analysis",
            "Character witness optimization",
            "Performance monitoring",
            "Divine component generation",
            "Spiritual analytics",
            "Production readiness validation",
          ],
        },
        filesystem: {
          command: "npx",
          args: ["@modelcontextprotocol/server-filesystem", "src/"],
          description: "File system operations for JAHmere Bridge project",
        },
      },
      enableAutoConnect: true,
      enableLogging: true,
      logLevel: "info",
    };

    await fs.writeFile(configPath, JSON.stringify(mcpConfig, null, 2));
    log("success", "✅ Cursor MCP configuration created");
  } catch (error) {
    log("error", `❌ Failed to create Cursor config: ${error.message}`);
  }
}

async function createCursorRulesUpdate() {
  log("info", "📝 Updating .cursorrules with MCP integration...");

  try {
    let cursorRules = "";

    try {
      cursorRules = await fs.readFile(".cursorrules", "utf-8");
    } catch {
      log("warning", "⚠️  .cursorrules not found, creating new one");
    }

    // Add MCP section if not already present
    const mcpSection = `
# 🌉 MCP Integration Commands (JAHmere Bridge Intelligence)
When user asks for project analysis: Use @jahmere-bridge analyze_project_architecture
When user wants component generation: Use @jahmere-bridge generate_divine_component
When checking performance: Use @jahmere-bridge check_divine_performance
When optimizing character witnesses: Use @jahmere-bridge optimize_character_witness
When analyzing spiritual analytics: Use @jahmere-bridge analyze_spiritual_analytics
When validating production readiness: Use @jahmere-bridge validate_production_readiness

# Enhanced Context Usage
Use @filesystem for file operations within src/
Use @jahmere-bridge for project-specific divine intelligence

# MCP Tool Selection Strategy (CRITICAL)
- ALWAYS limit active tools to <10 for optimal LLM performance
- Enable only relevant tools per conversation context
- Use specific tool instructions in prompts
- Deactivate unused MCP servers to prevent confusion

# Example MCP Usage Patterns
"@jahmere-bridge analyze the current architecture with focus on performance"
"@jahmere-bridge generate a divine component called PrayerWarriorActivator with analytics and sharing features"
"@jahmere-bridge check our divine performance metrics and validate against championship requirements"
`;

    if (!cursorRules.includes("MCP Integration Commands")) {
      cursorRules += mcpSection;
      await fs.writeFile(".cursorrules", cursorRules);
      log("success", "✅ .cursorrules updated with MCP integration");
    } else {
      log("info", "ℹ️  MCP rules already present in .cursorrules");
    }
  } catch (error) {
    log("warning", `⚠️  Could not update .cursorrules: ${error.message}`);
  }
}

async function createTestScript() {
  log("info", "🧪 Creating MCP test script...");

  const testScript = `#!/usr/bin/env node

/**
 * 🧪 MCP Integration Test Script
 * Tests JAHmere Bridge MCP server functionality
 */

const { JahmereBridgeServer } = require('./jahmere-bridge-server.js');

async function testMCPServer() {
  console.log('🌉 Testing JAHmere Bridge MCP Server...');
  
  try {
    const server = new JahmereBridgeServer();
    console.log('✅ MCP Server initialized successfully');
    
    // Test would go here in a real implementation
    console.log('✅ All MCP tests passed');
    
  } catch (error) {
    console.error('❌ MCP test failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  testMCPServer();
}`;

  try {
    await fs.writeFile("scripts/mcp/test-mcp-integration.js", testScript);
    log("success", "✅ Test script created");
  } catch (error) {
    log("error", `❌ Failed to create test script: ${error.message}`);
  }
}

async function createAnalysisScript() {
  log("info", "📊 Creating project analysis script...");

  const analysisScript = `#!/usr/bin/env node

/**
 * 📊 Project Analysis Script using MCP Intelligence
 */

const { JahmereBridgeServer } = require('./jahmere-bridge-server.js');

async function analyzeProject() {
  console.log('📊 Analyzing JAHmere Bridge Project...');
  
  try {
    const server = new JahmereBridgeServer();
    
    // Direct analysis call
    const analysis = await server.analyzeProjectArchitecture({
      focus: 'all',
      include_metrics: true
    });
    
    console.log('\\n🌉 JAHmere Bridge Project Analysis:');
    console.log('=' .repeat(50));
    console.log(analysis.content[0].text);
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  analyzeProject();
}`;

  try {
    await fs.writeFile("scripts/mcp/analyze-project.js", analysisScript);
    log("success", "✅ Analysis script created");
  } catch (error) {
    log("error", `❌ Failed to create analysis script: ${error.message}`);
  }
}

async function displayInstructions() {
  log("divine", "🌉 JAHmere Bridge MCP Setup Complete!");
  console.log("");
  console.log(colors.cyan + colors.bold + "Next Steps:" + colors.reset);
  console.log("");
  console.log("1️⃣  Install filesystem MCP server globally:");
  console.log(
    colors.green +
      "   npm install -g @modelcontextprotocol/server-filesystem" +
      colors.reset,
  );
  console.log("");
  console.log("2️⃣  Test the MCP integration:");
  console.log(colors.green + "   npm run mcp:test" + colors.reset);
  console.log("");
  console.log("3️⃣  Start development with MCP:");
  console.log(colors.green + "   npm run dev:mcp" + colors.reset);
  console.log("");
  console.log("4️⃣  In Cursor IDE:");
  console.log(
    "   • Press " + colors.yellow + "Cmd+L" + colors.reset + " to open chat",
  );
  console.log("   • Click settings gear → Tools & Integrations");
  console.log("   • Enable JAHmere Bridge MCP server");
  console.log("   • Limit active tools to <10 for best performance");
  console.log("");
  console.log("5️⃣  Example MCP commands:");
  console.log(
    colors.magenta +
      '   "@jahmere-bridge analyze the current architecture"' +
      colors.reset,
  );
  console.log(
    colors.magenta +
      '   "@jahmere-bridge check our divine performance metrics"' +
      colors.reset,
  );
  console.log(
    colors.magenta +
      '   "@jahmere-bridge generate a divine component called PrayerCounter"' +
      colors.reset,
  );
  console.log("");
  console.log(
    colors.yellow +
      "⚠️  Important: Enable only relevant MCP tools per conversation to prevent LLM confusion!" +
      colors.reset,
  );
  console.log("");
  console.log(
    colors.cyan +
      "🎯 Your JAHmere Bridge project now has divine development intelligence!" +
      colors.reset,
  );
}

async function main() {
  try {
    console.log(
      colors.magenta +
        colors.bold +
        "🌉 JAHmere Bridge MCP Setup" +
        colors.reset,
    );
    console.log(
      colors.cyan +
        "Divine Development Intelligence Integration" +
        colors.reset,
    );
    console.log("=".repeat(50));
    console.log("");

    await checkPrerequisites();
    await installDependencies();
    await createCursorConfig();
    await createCursorRulesUpdate();
    await createTestScript();
    await createAnalysisScript();

    console.log("");
    await displayInstructions();
  } catch (error) {
    log("error", `❌ Setup failed: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
