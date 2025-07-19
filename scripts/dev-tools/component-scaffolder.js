#!/usr/bin/env node

/**
 * 🛠️ DIVINE COMPONENT SCAFFOLDER
 * Automated component generation with tests, types, and best practices
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class DivineComponentScaffolder {
  constructor() {
    this.componentTypes = {
      ui: "src/components/ui",
      feature: "src/components",
      page: "src/app",
      api: "src/app/api",
    };

    this.templates = {
      component: this.getComponentTemplate(),
      test: this.getTestTemplate(),
      types: this.getTypesTemplate(),
      stories: this.getStoriesTemplate(),
    };
  }

  /**
   * Generate a new component with all necessary files
   */
  generateComponent(name, type = "ui", options = {}) {
    const {
      withTests = true,
      withStories = true,
      withTypes = true,
      withErrorBoundary = true,
      variant = "functional",
    } = options;

    console.log(`🔨 Generating ${type} component: ${name}`);

    // Validate component name
    if (!this.isValidComponentName(name)) {
      throw new Error(`Invalid component name: ${name}. Use PascalCase.`);
    }

    // Create component directory
    const componentDir = this.createComponentDirectory(name, type);

    // Generate files
    const files = [];

    // Main component file
    files.push(
      this.createComponentFile(componentDir, name, type, {
        withErrorBoundary,
        variant,
      }),
    );

    // Types file
    if (withTypes) {
      files.push(this.createTypesFile(componentDir, name));
    }

    // Test file
    if (withTests) {
      files.push(this.createTestFile(componentDir, name, type));
    }

    // Stories file
    if (withStories && type === "ui") {
      files.push(this.createStoriesFile(componentDir, name));
    }

    // Index file for clean imports
    files.push(this.createIndexFile(componentDir, name));

    // Update exports if UI component
    if (type === "ui") {
      this.updateUIExports(name);
    }

    console.log("✅ Component generated successfully:");
    files.forEach((file) => console.log(`   📄 ${file}`));

    // Run initial validation
    this.validateGeneration(componentDir, name);

    return {
      componentDir,
      files,
      name,
      type,
    };
  }

  /**
   * Generate API route with validation and error handling
   */
  generateAPIRoute(name, methods = ["GET"]) {
    console.log(`🔨 Generating API route: ${name}`);

    const routeDir = path.join(this.componentTypes.api, name);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    const routeFile = path.join(routeDir, "route.ts");
    const routeContent = this.generateAPIRouteContent(name, methods);

    fs.writeFileSync(routeFile, routeContent);

    // Generate API types
    const typesFile = path.join(routeDir, "types.ts");
    const typesContent = this.generateAPITypesContent(name);
    fs.writeFileSync(typesFile, typesContent);

    // Generate API tests
    const testFile = path.join(routeDir, "route.test.ts");
    const testContent = this.generateAPITestContent(name, methods);
    fs.writeFileSync(testFile, testContent);

    console.log("✅ API route generated successfully:");
    console.log(`   📄 ${routeFile}`);
    console.log(`   📄 ${typesFile}`);
    console.log(`   📄 ${testFile}`);

    return { routeDir, files: [routeFile, typesFile, testFile] };
  }

  /**
   * Generate page component with layout and metadata
   */
  generatePage(name, options = {}) {
    const {
      withLayout = true,
      withMetadata = true,
      withErrorBoundary = true,
      isProtected = false,
    } = options;

    console.log(`🔨 Generating page: ${name}`);

    const pageDir = path.join(this.componentTypes.page, name);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    const files = [];

    // Page component
    const pageFile = path.join(pageDir, "page.tsx");
    const pageContent = this.generatePageContent(name, {
      withLayout,
      withMetadata,
      isProtected,
    });
    fs.writeFileSync(pageFile, pageContent);
    files.push(pageFile);

    // Layout (if requested)
    if (withLayout) {
      const layoutFile = path.join(pageDir, "layout.tsx");
      const layoutContent = this.generateLayoutContent(name, { withMetadata });
      fs.writeFileSync(layoutFile, layoutContent);
      files.push(layoutFile);
    }

    // Error boundary
    if (withErrorBoundary) {
      const errorFile = path.join(pageDir, "error.tsx");
      const errorContent = this.generateErrorPageContent(name);
      fs.writeFileSync(errorFile, errorContent);
      files.push(errorFile);
    }

    console.log("✅ Page generated successfully:");
    files.forEach((file) => console.log(`   📄 ${file}`));

    return { pageDir, files };
  }

  /**
   * Create component directory structure
   */
  createComponentDirectory(name, type) {
    const baseDir = this.componentTypes[type] || this.componentTypes.feature;
    const componentDir = path.join(baseDir, this.kebabCase(name));

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    return componentDir;
  }

  /**
   * Create main component file
   */
  createComponentFile(componentDir, name, type, options) {
    const fileName = `${this.kebabCase(name)}.tsx`;
    const filePath = path.join(componentDir, fileName);

    const content = this.templates.component
      .replace(/{{COMPONENT_NAME}}/g, name)
      .replace(/{{COMPONENT_TYPE}}/g, type)
      .replace(/{{WITH_ERROR_BOUNDARY}}/g, options.withErrorBoundary)
      .replace(/{{VARIANT}}/g, options.variant)
      .replace(/{{KEBAB_NAME}}/g, this.kebabCase(name));

    fs.writeFileSync(filePath, content);
    return filePath;
  }

  /**
   * Create types file
   */
  createTypesFile(componentDir, name) {
    const fileName = "types.ts";
    const filePath = path.join(componentDir, fileName);

    const content = this.templates.types.replace(/{{COMPONENT_NAME}}/g, name);

    fs.writeFileSync(filePath, content);
    return filePath;
  }

  /**
   * Create test file
   */
  createTestFile(componentDir, name, type) {
    const fileName = `${this.kebabCase(name)}.test.tsx`;
    const filePath = path.join(componentDir, fileName);

    const content = this.templates.test
      .replace(/{{COMPONENT_NAME}}/g, name)
      .replace(/{{COMPONENT_TYPE}}/g, type)
      .replace(/{{KEBAB_NAME}}/g, this.kebabCase(name));

    fs.writeFileSync(filePath, content);
    return filePath;
  }

  /**
   * Create stories file for Storybook
   */
  createStoriesFile(componentDir, name) {
    const fileName = `${this.kebabCase(name)}.stories.tsx`;
    const filePath = path.join(componentDir, fileName);

    const content = this.templates.stories
      .replace(/{{COMPONENT_NAME}}/g, name)
      .replace(/{{KEBAB_NAME}}/g, this.kebabCase(name));

    fs.writeFileSync(filePath, content);
    return filePath;
  }

  /**
   * Create index file for clean imports
   */
  createIndexFile(componentDir, name) {
    const fileName = "index.ts";
    const filePath = path.join(componentDir, fileName);

    const content = `export { ${name} } from './${this.kebabCase(name)}';
export type { ${name}Props } from './types';
`;

    fs.writeFileSync(filePath, content);
    return filePath;
  }

  /**
   * Update UI component exports
   */
  updateUIExports(name) {
    const indexPath = path.join(this.componentTypes.ui, "index.ts");

    if (!fs.existsSync(indexPath)) {
      fs.writeFileSync(indexPath, "// UI Component Exports\n");
    }

    const exportLine = `export { ${name} } from './${this.kebabCase(name)}';\n`;
    fs.appendFileSync(indexPath, exportLine);
  }

  /**
   * Validate component generation
   */
  validateGeneration(componentDir, name) {
    try {
      // Check TypeScript compilation
      console.log("🔍 Validating TypeScript...");
      execSync("npm run type-check", { stdio: "pipe" });

      // Run tests if they exist
      const testFile = path.join(
        componentDir,
        `${this.kebabCase(name)}.test.tsx`,
      );
      if (fs.existsSync(testFile)) {
        console.log("🧪 Running tests...");
        execSync(`npm test -- ${testFile}`, { stdio: "pipe" });
      }

      console.log("✅ Validation successful");
    } catch (error) {
      console.warn("⚠️ Validation warnings (check manually):", error.message);
    }
  }

  /**
   * Generate API route content
   */
  generateAPIRouteContent(name, methods) {
    const methodHandlers = methods
      .map(
        (method) => `
export async function ${method}(request: NextRequest) {
  try {
    // TODO: Implement ${method} logic for ${name}
    return NextResponse.json({
      success: true,
      message: '${name} ${method} endpoint',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('${name} ${method} error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}`,
      )
      .join("\n");

    return `import { NextRequest, NextResponse } from 'next/server';
import { ${name}Request, ${name}Response } from './types';

/**
 * ${name} API Route
 * Generated by Divine Component Scaffolder
 */
${methodHandlers}
`;
  }

  /**
   * Generate API types content
   */
  generateAPITypesContent(name) {
    return `/**
 * ${name} API Types
 * Generated by Divine Component Scaffolder
 */

export interface ${name}Request {
  // TODO: Define request interface
}

export interface ${name}Response {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
  timestamp: string;
}

export interface ${name}ErrorResponse {
  success: false;
  error: string;
  timestamp: string;
}
`;
  }

  /**
   * Generate API test content
   */
  generateAPITestContent(name, methods) {
    const testCases = methods
      .map(
        (method) => `
  describe('${method}', () => {
    it('should handle ${method} request successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/${this.kebabCase(name)}', {
        method: '${method}',
      });

      const response = await ${method}(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should handle ${method} errors gracefully', async () => {
      // TODO: Implement error test case
    });
  });`,
      )
      .join("\n");

    return `import { NextRequest } from 'next/server';
import { ${methods.join(", ")} } from './route';

/**
 * ${name} API Tests
 * Generated by Divine Component Scaffolder
 */

describe('/api/${this.kebabCase(name)}', () => {${testCases}
});
`;
  }

  /**
   * Generate page content
   */
  generatePageContent(name, options) {
    const imports = [];
    const wrappers = [];

    if (options.withMetadata) {
      imports.push("import type { Metadata } from 'next';");
    }

    if (options.isProtected) {
      imports.push("import { redirect } from 'next/navigation';");
    }

    const metadataExport = options.withMetadata
      ? `
export const metadata: Metadata = {
  title: '${name} - The Bridge Project',
  description: '${name} page description',
};
`
      : "";

    return `${imports.join("\n")}
import { withDivineErrorBoundary } from '@/components/ui/divine-error-boundary';

${metadataExport}
/**
 * ${name} Page
 * Generated by Divine Component Scaffolder
 */
function ${name}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">${name}</h1>
      <p className="text-gray-600">
        Welcome to the ${name} page. This page was generated automatically.
      </p>
    </div>
  );
}

export default withDivineErrorBoundary(${name}Page, {
  componentName: '${name}Page',
  role: 'guardian'
});
`;
  }

  /**
   * Generate layout content
   */
  generateLayoutContent(name, options) {
    return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - ${name}',
    default: '${name} - The Bridge Project',
  },
  description: '${name} section of The Bridge Project',
};

export default function ${name}Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="${this.kebabCase(name)}-layout">
      {children}
    </div>
  );
}
`;
  }

  /**
   * Generate error page content
   */
  generateErrorPageContent(name) {
    return `'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ${name}Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('${name} page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">
        An error occurred while loading the ${name} page.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
`;
  }

  /**
   * Component template
   */
  getComponentTemplate() {
    return `"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { {{COMPONENT_NAME}}Props } from './types';

/**
 * {{COMPONENT_NAME}} Component
 * Generated by Divine Component Scaffolder
 */
export function {{COMPONENT_NAME}}({
  className,
  children,
  ...props
}: {{COMPONENT_NAME}}Props) {
  return (
    <div 
      className={cn(
        "{{KEBAB_NAME}}",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

{{COMPONENT_NAME}}.displayName = '{{COMPONENT_NAME}}';
`;
  }

  /**
   * Types template
   */
  getTypesTemplate() {
    return `import { ReactNode } from 'react';

/**
 * {{COMPONENT_NAME}} Props
 * Generated by Divine Component Scaffolder
 */
export interface {{COMPONENT_NAME}}Props {
  className?: string;
  children?: ReactNode;
  // TODO: Add component-specific props
}
`;
  }

  /**
   * Test template
   */
  getTestTemplate() {
    return `import { render, screen } from '@testing-library/react';
import { {{COMPONENT_NAME}} } from './{{KEBAB_NAME}}';

/**
 * {{COMPONENT_NAME}} Tests
 * Generated by Divine Component Scaffolder
 */
describe('{{COMPONENT_NAME}}', () => {
  it('renders without crashing', () => {
    render(<{{COMPONENT_NAME}}>Test content</{{COMPONENT_NAME}}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <{{COMPONENT_NAME}} className="custom-class">
        Test
      </{{COMPONENT_NAME}}>
    );
    
    const element = screen.getByText('Test');
    expect(element).toHaveClass('custom-class');
  });

  // TODO: Add component-specific tests
});
`;
  }

  /**
   * Stories template
   */
  getStoriesTemplate() {
    return `import type { Meta, StoryObj } from '@storybook/react';
import { {{COMPONENT_NAME}} } from './{{KEBAB_NAME}}';

/**
 * {{COMPONENT_NAME}} Stories
 * Generated by Divine Component Scaffolder
 */
const meta: Meta<typeof {{COMPONENT_NAME}}> = {
  title: 'UI/{{COMPONENT_NAME}}',
  component: {{COMPONENT_NAME}},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default {{COMPONENT_NAME}}',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom styled {{COMPONENT_NAME}}',
    className: 'border-2 border-blue-500 p-4',
  },
};
`;
  }

  /**
   * Utility functions
   */
  isValidComponentName(name) {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name);
  }

  kebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }
}

// CLI Interface
if (require.main === module) {
  const scaffolder = new DivineComponentScaffolder();

  const args = process.argv.slice(2);
  const command = args[0];
  const name = args[1];
  const type = args[2] || "ui";

  if (!command || !name) {
    console.log(`
🛠️ Divine Component Scaffolder

Usage:
  node component-scaffolder.js component <name> [type]
  node component-scaffolder.js api <name> [methods]
  node component-scaffolder.js page <name> [options]

Examples:
  node component-scaffolder.js component Button ui
  node component-scaffolder.js api users GET,POST
  node component-scaffolder.js page dashboard
    `);
    process.exit(1);
  }

  try {
    switch (command) {
      case "component":
        scaffolder.generateComponent(name, type);
        break;
      case "api":
        const methods = (args[2] || "GET").split(",");
        scaffolder.generateAPIRoute(name, methods);
        break;
      case "page":
        scaffolder.generatePage(name);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

module.exports = { DivineComponentScaffolder };
