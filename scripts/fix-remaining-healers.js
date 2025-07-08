const fs = require("fs");
const path = require("path");

const filesToFix = [
  "src/components/sacred-protection.tsx",
  "src/components/sacred-surrender.tsx",
  "src/components/divine-scripture.tsx",
];

filesToFix.forEach((filePath) => {
  const fullPath = path.join(__dirname, "..", filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf8");

    // Replace all 'healer' with 'lightworker'
    content = content.replace(/'healer'/g, "'lightworker'");

    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed healer references in ${filePath}`);
  }
});

console.log("\n🎉 All healer references replaced with lightworker!");
