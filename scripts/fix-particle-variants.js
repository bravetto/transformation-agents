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

  // Replace invalid variants with valid ones
  const invalidVariants = ["minimal", "starfield", "flame", "rain"];
  const validVariant = "divine";

  invalidVariants.forEach((invalid) => {
    const regex = new RegExp(`variant\\s*=\\s*["']${invalid}["']`, "g");
    if (content.match(regex)) {
      content = content.replace(regex, `variant="${validVariant}"`);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed variants in ${path.basename(filePath)}`);
    fixedCount++;
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files with invalid particle variants!`);
