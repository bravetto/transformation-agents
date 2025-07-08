const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Files to fix
const filesToFix = [
  "src/components/sacred-protection.tsx",
  "src/components/sacred-surrender.tsx",
  "src/components/divine-love.tsx",
  "src/components/divine-particles.tsx",
  "src/components/divine-scripture.tsx",
  "src/app/divine-love/page.tsx",
];

filesToFix.forEach((filePath) => {
  const fullPath = path.join(__dirname, "..", filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf8");

    // Replace role="healer" with role="lightworker"
    content = content.replace(
      /role\s*=\s*["']healer["']/g,
      'role="lightworker"',
    );

    // Replace role = 'healer' with role = 'lightworker'
    content = content.replace(/role\s*=\s*'healer'/g, "role = 'lightworker'");

    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed healer role in ${filePath}`);
  }
});

console.log("\n🎉 All healer roles replaced with lightworker!");
