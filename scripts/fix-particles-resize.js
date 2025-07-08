const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/components/divine-particles.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Replace all occurrences of resize: true with the proper object format
content = content.replace(
  /resize:\s*true/g,
  `resize: {
          enable: true
        }`,
);

// Also fix the last 'healer' reference
content = content.replace(/role:\s*'healer'/g, "role: 'lightworker'");

fs.writeFileSync(filePath, content);
console.log("✅ Fixed particle resize properties and healer role");
