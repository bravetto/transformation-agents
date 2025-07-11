const fs = require("fs");
const path = require("path");

// Colors for output
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

// App directory
const appDir = path.join(__dirname, "../src/app");

// Template for error.tsx
const errorTemplate = `"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="bg-red-50 border-2 border-red-100 rounded-lg p-8 max-w-xl w-full">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Something went wrong
        </h2>
        
        <p className="mb-6 text-gray-700">
          We apologize for the inconvenience. Please try again.
        </p>
        
        <div className="bg-white p-4 rounded mb-6 overflow-auto max-h-32">
          <p className="font-mono text-sm text-red-500">
            {error.message || "An unexpected error occurred"}
            {error.digest && <span className="block mt-1 text-gray-500">({error.digest})</span>}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="default"
            onClick={reset}
          >
            Try again
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            Return to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
`;

// Function to check if directory has an error.tsx file
function hasErrorPage(dir) {
  return fs.existsSync(path.join(dir, "error.tsx"));
}

// Function to add error.tsx to a directory
function addErrorPage(dir) {
  const errorFilePath = path.join(dir, "error.tsx");
  fs.writeFileSync(errorFilePath, errorTemplate);
  console.log(
    `${GREEN}Added error.tsx to ${path.relative(process.cwd(), dir)}${RESET}`,
  );
}

// Function to scan directory recursively
function scanDirectory(dir, routePaths = []) {
  // Skip if not a directory
  if (!fs.statSync(dir).isDirectory()) return routePaths;

  // Skip special directories
  const dirName = path.basename(dir);
  if (dirName.startsWith("_") || dirName.startsWith(".") || dirName === "api") {
    return routePaths;
  }

  // Check if this is a route directory (contains page.tsx)
  const isRoutePath = fs.existsSync(path.join(dir, "page.tsx"));
  if (isRoutePath) {
    routePaths.push(dir);
  }

  // Scan subdirectories
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      scanDirectory(itemPath, routePaths);
    }
  }

  return routePaths;
}

// Main function
function main() {
  console.log(`${BLUE}Scanning for app routes without error.tsx...${RESET}`);

  // Find all route paths
  const routePaths = scanDirectory(appDir);

  // Count variables
  let totalRoutes = routePaths.length;
  let routesWithErrorPages = 0;
  let routesAdded = 0;

  // Check each route path
  for (const routePath of routePaths) {
    if (hasErrorPage(routePath)) {
      routesWithErrorPages++;
      console.log(
        `${YELLOW}Route already has error.tsx: ${path.relative(process.cwd(), routePath)}${RESET}`,
      );
    } else {
      addErrorPage(routePath);
      routesAdded++;
    }
  }

  // Print summary
  console.log(`\n${GREEN}=== Error Pages Summary ===${RESET}`);
  console.log(`Total routes: ${totalRoutes}`);
  console.log(`Routes with error pages before: ${routesWithErrorPages}`);
  console.log(`Error pages added: ${routesAdded}`);
  console.log(
    `Routes with error pages after: ${routesWithErrorPages + routesAdded}`,
  );
  console.log(
    `Coverage: ${Math.round(((routesWithErrorPages + routesAdded) / totalRoutes) * 100)}%`,
  );
}

// Run the script
main();
