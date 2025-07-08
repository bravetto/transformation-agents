const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Find all files that might contain DivineParticles
const files = glob.sync("src/**/*.{ts,tsx}", {
  cwd: path.join(__dirname, ".."),
  absolute: true,
});

let fixedCount = 0;

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Remove intensity prop
  const intensityRegex = /\s*intensity\s*=\s*["'][^"']*["']\s*\n?/g;
  if (content.match(intensityRegex)) {
    content = content.replace(intensityRegex, "\n");
    modified = true;
  }

  // Remove interactive prop
  const interactiveRegex = /\s*interactive\s*=\s*\{[^}]*\}\s*\n?/g;
  if (content.match(interactiveRegex)) {
    content = content.replace(interactiveRegex, "\n");
    modified = true;
  }

  if (modified) {
    // Clean up extra newlines
    content = content.replace(/\n\s*\n\s*\n/g, "\n\n");
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed DivineParticles props in ${path.basename(filePath)}`);
    fixedCount++;
  }
});

console.log(
  `\n🎉 Fixed ${fixedCount} files with invalid DivineParticles props!`,
);
