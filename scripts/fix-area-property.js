const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/components/divine-particles.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Replace area: with value_area:
content = content.replace(/area:\s*800/g, "value_area: 800");

fs.writeFileSync(filePath, content);
console.log("✅ Fixed area property to value_area");
