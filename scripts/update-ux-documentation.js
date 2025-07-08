const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const matter = require("gray-matter");
const glob = require("glob");

// Configuration
const CONFIG = {
  docsFile: "WEBSITE_UX_UI_STATE.md",
  watchDirs: ["src/app", "src/components", "src/lib", "public"],
  watchExtensions: [".tsx", ".ts", ".js", ".jsx", ".css", ".md"],
  excludePatterns: [
    "**/*.test.*",
    "**/*.spec.*",
    "**/node_modules/**",
    "**/.next/**",
  ],
};

class UXDocumentationUpdater {
  constructor() {
    this.pageRegistry = new Map();
    this.componentRegistry = new Map();
    this.linkRegistry = new Map();
    this.lastUpdate = new Date();
  }

  /**
   * Initialize the documentation updater
   */
  async init() {
    console.log("🚀 Initializing UX Documentation Updater...");

    // Initial scan
    await this.scanCodebase();

    // Set up file watchers
    this.initializeWatchers();

    // Schedule periodic full updates
    setInterval(() => this.performFullUpdate(), 1000 * 60 * 60); // Every hour
  }

  /**
   * Set up file watchers for real-time updates
   */
  initializeWatchers() {
    const watchPaths = CONFIG.watchDirs.map((dir) =>
      path.join(process.cwd(), dir),
    );

    const watcher = chokidar.watch(watchPaths, {
      ignored: CONFIG.excludePatterns,
      persistent: true,
      ignoreInitial: true,
    });

    watcher
      .on("add", (path) => this.handleFileChange("add", path))
      .on("change", (path) => this.handleFileChange("change", path))
      .on("unlink", (path) => this.handleFileChange("remove", path));
  }

  /**
   * Handle file changes
   */
  async handleFileChange(event, filePath) {
    console.log(`📝 Detected ${event} in ${filePath}`);

    // Determine file type and update appropriate registry
    if (this.isPageFile(filePath)) {
      await this.updatePageRegistry(filePath, event);
    } else if (this.isComponentFile(filePath)) {
      await this.updateComponentRegistry(filePath, event);
    }

    // Update documentation
    await this.updateDocumentation();
  }

  /**
   * Scan entire codebase and build registries
   */
  async scanCodebase() {
    console.log("🔍 Scanning codebase...");

    // Clear existing registries
    this.pageRegistry.clear();
    this.componentRegistry.clear();
    this.linkRegistry.clear();

    // Scan pages
    const pageFiles = glob.sync("src/app/**/*.tsx", {
      ignore: CONFIG.excludePatterns,
    });

    for (const file of pageFiles) {
      await this.updatePageRegistry(file, "add");
    }

    // Scan components
    const componentFiles = glob.sync("src/components/**/*.tsx", {
      ignore: CONFIG.excludePatterns,
    });

    for (const file of componentFiles) {
      await this.updateComponentRegistry(file, "add");
    }

    console.log("✅ Codebase scan complete");
  }

  /**
   * Update the page registry
   */
  async updatePageRegistry(filePath, event) {
    if (event === "remove") {
      this.pageRegistry.delete(filePath);
      return;
    }

    const content = await fs.promises.readFile(filePath, "utf8");
    const pageInfo = this.extractPageInfo(content, filePath);
    this.pageRegistry.set(filePath, pageInfo);
  }

  /**
   * Update the component registry
   */
  async updateComponentRegistry(filePath, event) {
    if (event === "remove") {
      this.componentRegistry.delete(filePath);
      return;
    }

    const content = await fs.promises.readFile(filePath, "utf8");
    const componentInfo = this.extractComponentInfo(content, filePath);
    this.componentRegistry.set(filePath, componentInfo);
  }

  /**
   * Extract page information from file content
   */
  extractPageInfo(content, filePath) {
    const info = {
      path: this.getRoutePath(filePath),
      title: this.extractTitle(content),
      links: this.extractLinks(content),
      components: this.extractComponents(content),
      interactions: this.extractInteractions(content),
    };

    return info;
  }

  /**
   * Extract component information from file content
   */
  extractComponentInfo(content, filePath) {
    const info = {
      name: this.extractComponentName(content),
      props: this.extractProps(content),
      interactions: this.extractInteractions(content),
      usage: this.extractUsage(content),
    };

    return info;
  }

  /**
   * Update the documentation file
   */
  async updateDocumentation() {
    console.log("📝 Updating documentation...");

    try {
      // Read current documentation
      const docPath = path.join(process.cwd(), CONFIG.docsFile);
      const currentDoc = await fs.promises.readFile(docPath, "utf8");

      // Generate new content
      const newContent = this.generateDocumentation();

      // Update the file
      await fs.promises.writeFile(docPath, newContent, "utf8");

      // Update timestamp
      this.lastUpdate = new Date();

      console.log("✅ Documentation updated successfully");
    } catch (error) {
      console.error("❌ Error updating documentation:", error);
    }
  }

  /**
   * Generate documentation content
   */
  generateDocumentation() {
    const sections = [
      this.generateHeader(),
      this.generateExecutiveSummary(),
      this.generateCurrentState(),
      this.generatePageBreakdown(),
      this.generateUserJourneys(),
      this.generateInteractionPoints(),
      this.generateIdealState(),
      this.generateGapAnalysis(),
      this.generateImplementationPriorities(),
    ];

    return sections.join("\n\n");
  }

  /**
   * Generate documentation header
   */
  generateHeader() {
    return `# The Bridge Project - Website UX/UI State Documentation

## 🔄 Last Updated
${this.lastUpdate.toISOString()}

This document is automatically updated whenever changes are made to the public-facing codebase.`;
  }

  /**
   * Helper: Get route path from file path
   */
  getRoutePath(filePath) {
    return filePath
      .replace(/^src\/app/, "")
      .replace(/\/page\.tsx$/, "")
      .replace(/\/layout\.tsx$/, "")
      .replace(/\[([^\]]+)\]/g, ":$1");
  }

  /**
   * Helper: Extract title from content
   */
  extractTitle(content) {
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    if (titleMatch) return titleMatch[1];

    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) return h1Match[1];

    return "Untitled";
  }

  /**
   * Helper: Extract links from content
   */
  extractLinks(content) {
    const links = new Set();
    const linkPattern = /<Link[^>]+href=["']([^"']+)["'][^>]*>/g;
    let match;

    while ((match = linkPattern.exec(content)) !== null) {
      links.add(match[1]);
    }

    return Array.from(links);
  }

  /**
   * Helper: Extract components used in content
   */
  extractComponents(content) {
    const components = new Set();
    const importPattern = /import\s+{\s*([^}]+)}\s+from/g;
    let match;

    while ((match = importPattern.exec(content)) !== null) {
      match[1].split(",").forEach((comp) => {
        components.add(comp.trim());
      });
    }

    return Array.from(components);
  }

  /**
   * Helper: Extract interactions from content
   */
  extractInteractions(content) {
    const interactions = new Set();
    const patterns = [
      /onClick=/g,
      /onSubmit=/g,
      /onChange=/g,
      /onBlur=/g,
      /onFocus=/g,
    ];

    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        interactions.add(pattern.source.replace(/[=]/g, ""));
      }
    });

    return Array.from(interactions);
  }

  /**
   * Helper: Extract component name
   */
  extractComponentName(content) {
    const match = content.match(/export\s+(?:default\s+)?function\s+(\w+)/);
    return match ? match[1] : "UnnamedComponent";
  }

  /**
   * Helper: Extract props interface
   */
  extractProps(content) {
    const props = new Set();
    const propsPattern = /interface\s+\w+Props\s*{([^}]+)}/;
    const match = content.match(propsPattern);

    if (match) {
      const propsContent = match[1];
      const propLines = propsContent.split("\n");
      propLines.forEach((line) => {
        const propMatch = line.match(/^\s*(\w+)[\?:]*/);
        if (propMatch) {
          props.add(propMatch[1]);
        }
      });
    }

    return Array.from(props);
  }

  /**
   * Helper: Extract component usage
   */
  extractUsage(content) {
    const usage = new Set();
    const componentName = this.extractComponentName(content);
    const usagePattern = new RegExp(`<${componentName}[^>]*>`, "g");
    let match;

    while ((match = usagePattern.exec(content)) !== null) {
      usage.add(match[0]);
    }

    return Array.from(usage);
  }

  /**
   * Perform a full update of the documentation
   */
  async performFullUpdate() {
    console.log("🔄 Performing full documentation update...");
    await this.scanCodebase();
    await this.updateDocumentation();
  }
}

// Export the updater
module.exports = UXDocumentationUpdater;

// If running directly, initialize the updater
if (require.main === module) {
  const updater = new UXDocumentationUpdater();
  updater.init().catch(console.error);
}
