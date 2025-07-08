#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const chalk = require("chalk");

class InteractionAnalyzer {
  constructor() {
    this.interactions = new Map();
    this.userJourneys = new Map();
    this.conversionPoints = new Set();
    this.accessibilityPoints = new Map();
  }

  async analyzeFile(filePath) {
    const content = await fs.readFile(filePath, "utf8");
    const ast = parser.parse(content, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    this.extractInteractions(ast, filePath);
    this.mapUserJourneys(ast, filePath);
    this.identifyConversionPoints(ast, filePath);
    this.checkAccessibility(ast, filePath);
  }

  extractInteractions(ast, filePath) {
    traverse(ast, {
      JSXElement: (path) => {
        // Extract click handlers
        const onClick = path.node.openingElement.attributes.find(
          (attr) => attr.name?.name === "onClick",
        );
        if (onClick) {
          this.recordInteraction("click", filePath, path.node);
        }

        // Extract form submissions
        const onSubmit = path.node.openingElement.attributes.find(
          (attr) => attr.name?.name === "onSubmit",
        );
        if (onSubmit) {
          this.recordInteraction("form_submit", filePath, path.node);
        }

        // Extract keyboard interactions
        const onKeyPress = path.node.openingElement.attributes.find(
          (attr) => attr.name?.name === "onKeyPress",
        );
        if (onKeyPress) {
          this.recordInteraction("keyboard", filePath, path.node);
        }
      },
    });
  }

  mapUserJourneys(ast, filePath) {
    traverse(ast, {
      JSXElement: (path) => {
        const href = path.node.openingElement.attributes.find(
          (attr) => attr.name?.name === "href",
        );
        if (href) {
          this.recordJourneyStep(filePath, href.value.value);
        }
      },
    });
  }

  identifyConversionPoints(ast, filePath) {
    const conversionKeywords = [
      "submit",
      "register",
      "signup",
      "subscribe",
      "purchase",
      "donate",
    ];

    traverse(ast, {
      JSXElement: (path) => {
        const text = this.getElementText(path.node);
        if (
          text &&
          conversionKeywords.some((keyword) =>
            text.toLowerCase().includes(keyword),
          )
        ) {
          this.conversionPoints.add({
            file: filePath,
            text: text,
            type: this.determineConversionType(text),
          });
        }
      },
    });
  }

  checkAccessibility(ast, filePath) {
    traverse(ast, {
      JSXElement: (path) => {
        // Check for aria labels
        const ariaLabel = path.node.openingElement.attributes.find(
          (attr) => attr.name?.name === "aria-label",
        );

        // Check for alt text
        const alt = path.node.openingElement.attributes.find(
          (attr) => attr.name?.name === "alt",
        );

        if (!ariaLabel && !alt && this.needsAccessibilityLabel(path.node)) {
          this.accessibilityPoints.set(filePath, {
            type: "missing_label",
            element: path.node.openingElement.name.name,
          });
        }
      },
    });
  }

  recordInteraction(type, file, node) {
    if (!this.interactions.has(type)) {
      this.interactions.set(type, []);
    }
    this.interactions.get(type).push({
      file,
      element: node.openingElement.name.name,
      context: this.getElementContext(node),
    });
  }

  recordJourneyStep(fromPage, toPage) {
    if (!this.userJourneys.has(fromPage)) {
      this.userJourneys.set(fromPage, new Set());
    }
    this.userJourneys.get(fromPage).add(toPage);
  }

  getElementText(node) {
    // Implementation to extract text content from JSX element
  }

  getElementContext(node) {
    // Implementation to get surrounding context of an element
  }

  needsAccessibilityLabel(node) {
    const needsLabelElements = ["button", "input", "img", "a"];
    return needsLabelElements.includes(node.openingElement.name.name);
  }

  determineConversionType(text) {
    // Implementation to categorize conversion type
  }

  async generateReport() {
    const report = {
      interactions: Object.fromEntries(this.interactions),
      userJourneys: this.mapJourneysToGraph(),
      conversionPoints: Array.from(this.conversionPoints),
      accessibilityIssues: Object.fromEntries(this.accessibilityPoints),
    };

    return report;
  }

  mapJourneysToGraph() {
    const graph = {
      nodes: [],
      edges: [],
    };

    // Convert user journeys to a graph visualization format
    for (const [from, toSet] of this.userJourneys) {
      graph.nodes.push({ id: from, label: from });
      for (const to of toSet) {
        graph.edges.push({ from, to });
        if (!graph.nodes.find((n) => n.id === to)) {
          graph.nodes.push({ id: to, label: to });
        }
      }
    }

    return graph;
  }
}

async function main() {
  const analyzer = new InteractionAnalyzer();
  const srcDir = path.join(process.cwd(), "src");

  try {
    // Recursively find all TypeScript/JavaScript files
    const files = await findSourceFiles(srcDir);

    // Analyze each file
    await Promise.all(files.map((file) => analyzer.analyzeFile(file)));

    // Generate and save the report
    const report = await analyzer.generateReport();
    await fs.writeFile(
      "docs/interaction-analysis.json",
      JSON.stringify(report, null, 2),
    );

    console.log(chalk.green("✓ Interaction analysis completed"));
    console.log(
      chalk.blue(`Found ${analyzer.interactions.size} interaction types`),
    );
    console.log(
      chalk.blue(`Mapped ${analyzer.userJourneys.size} user journeys`),
    );
    console.log(
      chalk.blue(
        `Identified ${analyzer.conversionPoints.size} conversion points`,
      ),
    );

    if (analyzer.accessibilityPoints.size > 0) {
      console.log(
        chalk.yellow(
          `⚠ Found ${analyzer.accessibilityPoints.size} accessibility issues`,
        ),
      );
    }
  } catch (error) {
    console.error(chalk.red("Error during analysis:"), error);
    process.exit(1);
  }
}

async function findSourceFiles(dir) {
  // Implementation to recursively find .ts/.tsx/.js/.jsx files
}

if (require.main === module) {
  main();
}
