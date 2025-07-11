const fs = require("fs");
const path = require("path");

// Colors for output
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

// App directory
const APP_DIR = path.join(process.cwd(), "src", "app");

// Error page template
const ERROR_PAGE_TEMPLATE = `"use client";

import React from "react";
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
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="text-gray-600">
            We apologize for the inconvenience. Please try again.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-500">Error ID: {error.digest}</p>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <Button onClick={reset} variant="primary" className="mx-auto">
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
            className="mx-auto"
          >
            Return to home
          </Button>
        </div>
      </div>
    </div>
  );
}
`;

// Function to recursively find all directories
function findAllDirectories(dir) {
  const results = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip directories that start with underscore or dot
      if (item.startsWith("_") || item.startsWith(".")) {
        continue;
      }

      results.push(fullPath);
      results.push(...findAllDirectories(fullPath));
    }
  }

  return results;
}

// Main function
function addErrorPagesToAppRoutes() {
  console.log(`${BLUE}Finding all app routes...${RESET}`);

  // Get all directories in the app folder
  const directories = [APP_DIR, ...findAllDirectories(APP_DIR)];

  console.log(`${BLUE}Found ${directories.length} app routes${RESET}`);

  let added = 0;
  let skipped = 0;

  // Process each directory
  for (const dir of directories) {
    const errorFilePath = path.join(dir, "error.tsx");

    // Skip if error.tsx already exists
    if (fs.existsSync(errorFilePath)) {
      console.log(
        `${YELLOW}Skipping ${path.relative(process.cwd(), dir)} (error.tsx already exists)${RESET}`,
      );
      skipped++;
      continue;
    }

    // Check if the directory has a page.tsx or layout.tsx file
    const hasPage = fs.existsSync(path.join(dir, "page.tsx"));
    const hasLayout = fs.existsSync(path.join(dir, "layout.tsx"));

    if (!hasPage && !hasLayout) {
      console.log(
        `${YELLOW}Skipping ${path.relative(process.cwd(), dir)} (no page.tsx or layout.tsx)${RESET}`,
      );
      skipped++;
      continue;
    }

    // Create error.tsx
    try {
      fs.writeFileSync(errorFilePath, ERROR_PAGE_TEMPLATE);
      console.log(
        `${GREEN}Added error.tsx to ${path.relative(process.cwd(), dir)}${RESET}`,
      );
      added++;
    } catch (err) {
      console.error(
        `${RED}Error adding error.tsx to ${path.relative(process.cwd(), dir)}: ${err.message}${RESET}`,
      );
    }
  }

  // Print summary
  console.log(`\n${GREEN}=== Summary ===${RESET}`);
  console.log(`Total app routes: ${directories.length}`);
  console.log(`Error pages added: ${added}`);
  console.log(`Routes skipped: ${skipped}`);
}

// Run the function
addErrorPagesToAppRoutes();
