const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Find all TSX files
const files = glob.sync("src/**/*.tsx", {
  cwd: path.join(__dirname, ".."),
  absolute: true,
});

let fixedCount = 0;

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Replace onAnimationError with onAnimationComplete
  if (content.includes("onAnimationError")) {
    content = content.replace(
      /onAnimationError={[^}]+}/g,
      "onAnimationComplete={() => {}}",
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed animation error in ${path.basename(filePath)}`);
    fixedCount++;
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files with animation errors!`);
