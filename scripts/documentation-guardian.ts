#!/usr/bin/env tsx

import { promises as fs } from "fs";
import { glob } from "glob";

const LIMITS = {
  maxFiles: 8,
  maxLines: {
    "README.md": 100,
    "ARCHITECTURE.md": 500,
    "DEVELOPMENT.md": 300,
    ".mdc": 50,
  },
};

async function guardDocumentation() {
  console.log("🛡️ Documentation Guardian Active\n");

  // Count documentation files
  const docFiles = await glob("**/*.{md,mdc}", {
    ignore: ["node_modules/**", ".next/**"],
    dot: true,
  });

  if (docFiles.length > LIMITS.maxFiles) {
    console.error(
      `❌ Too many docs: ${docFiles.length} (max: ${LIMITS.maxFiles})`,
    );
    process.exit(1);
  }

  // Check file lengths
  for (const file of docFiles) {
    const content = await fs.readFile(file, "utf-8");
    const lines = content.split("\n").length;
    const fileName = file.split("/").pop()!;
    const limit = file.endsWith(".mdc")
      ? LIMITS.maxLines[".mdc"]
      : (LIMITS.maxLines as any)[fileName] || Infinity;

    if (lines > limit) {
      console.error(`❌ ${file}: ${lines} lines (max: ${limit})`);
      process.exit(1);
    }
  }

  // Check for forbidden patterns
  const forbidden = ["TODO", "FIXME", "ask ", "contact ", "@gmail", "@outlook"];
  for (const file of docFiles) {
    const content = await fs.readFile(file, "utf-8");
    for (const pattern of forbidden) {
      if (content.includes(pattern)) {
        console.error(`❌ ${file} contains forbidden pattern: "${pattern}"`);
        process.exit(1);
      }
    }
  }

  console.log("✅ Documentation is pristine!");
  console.log(`📊 Total files: ${docFiles.length}/${LIMITS.maxFiles}`);
}

guardDocumentation().catch(console.error);
