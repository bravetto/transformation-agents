#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const markdownLinkCheck = require("markdown-link-check");
const { promisify } = require("util");

const checkMarkdownLinks = promisify(markdownLinkCheck);

class DocumentationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  async validateStructure(doc) {
    const requiredSections = [
      "# Website UX/UI State",
      "## Executive Summary",
      "## Current State Analysis",
      "## Page-by-Page Breakdown",
      "## User Journeys",
      "## Interaction Points",
      "## Ideal State Vision",
      "## Gap Analysis",
    ];

    for (const section of requiredSections) {
      if (!doc.includes(section)) {
        this.errors.push(`Missing required section: ${section}`);
      }
    }
  }

  async validateLinks(doc) {
    const links = await checkMarkdownLinks(doc);

    for (const link of links) {
      if (!link.ok) {
        this.errors.push(`Broken link found: ${link.link}`);
      }
    }
  }

  async validatePageConsistency(doc, pagesDir) {
    const actualPages = await this.getActualPages(pagesDir);
    const documentedPages = this.extractDocumentedPages(doc);

    for (const page of actualPages) {
      if (!documentedPages.includes(page)) {
        this.warnings.push(`Page exists but not documented: ${page}`);
      }
    }

    for (const page of documentedPages) {
      if (!actualPages.includes(page)) {
        this.errors.push(`Page documented but doesn't exist: ${page}`);
      }
    }
  }

  async validateComponentUsage(doc, componentsDir) {
    const actualComponents = await this.getActualComponents(componentsDir);
    const documentedComponents = this.extractDocumentedComponents(doc);

    for (const component of actualComponents) {
      if (!documentedComponents.includes(component)) {
        this.warnings.push(`Component exists but not documented: ${component}`);
      }
    }
  }

  async getActualPages(pagesDir) {
    // Implementation to get actual pages from the filesystem
  }

  extractDocumentedPages(doc) {
    // Implementation to extract documented pages from markdown
  }

  async getActualComponents(componentsDir) {
    // Implementation to get actual components from the filesystem
  }

  extractDocumentedComponents(doc) {
    // Implementation to extract documented components from markdown
  }

  printReport() {
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(chalk.green("✓ Documentation validation passed"));
      return true;
    }

    if (this.errors.length > 0) {
      console.log(chalk.red("\nErrors:"));
      this.errors.forEach((error) => console.log(chalk.red(`✗ ${error}`)));
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow("\nWarnings:"));
      this.warnings.forEach((warning) =>
        console.log(chalk.yellow(`⚠ ${warning}`)),
      );
    }

    return this.errors.length === 0;
  }
}

async function main() {
  const validator = new DocumentationValidator();
  const docPath = path.join(process.cwd(), "WEBSITE_UX_UI_STATE.md");
  const pagesDir = path.join(process.cwd(), "src/app");
  const componentsDir = path.join(process.cwd(), "src/components");

  try {
    const doc = await fs.readFile(docPath, "utf8");

    await Promise.all([
      validator.validateStructure(doc),
      validator.validateLinks(doc),
      validator.validatePageConsistency(doc, pagesDir),
      validator.validateComponentUsage(doc, componentsDir),
    ]);

    const success = validator.printReport();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error(chalk.red("Error during validation:"), error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
