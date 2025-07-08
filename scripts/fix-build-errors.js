const fs = require("fs");
const path = require("path");

// Fix 1: Update people/index.ts to add missing exports
const peopleIndexPath = path.join(__dirname, "../src/data/people/index.ts");
let peopleIndexContent = fs.readFileSync(peopleIndexPath, "utf8");

// Add missing exports
if (!peopleIndexContent.includes("export const getAllPeople")) {
  peopleIndexContent += `\n
export const getAllPeople = (): PersonData[] => {
  return people;
};

export const getPersonBySlug = (slug: string): PersonData | undefined => {
  return people.find(person => person.id === slug || person.slug === slug);
};`;

  fs.writeFileSync(peopleIndexPath, peopleIndexContent);
  console.log("✅ Added getAllPeople and getPersonBySlug exports");
}

// Fix 2: Update all DivineParticles imports to use named import
const filesToFix = [
  "src/components/letters-of-hope.tsx",
  "src/components/divine-letter-form.tsx",
  "src/components/prophetic-countdown.tsx",
  "src/components/story-amplifier.tsx",
  "src/components/divine-impact-dashboard.tsx",
  "src/app/particles-test/page.tsx",
];

filesToFix.forEach((filePath) => {
  const fullPath = path.join(__dirname, "..", filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf8");

    // Fix default import to named import
    content = content.replace(
      /import\s+DivineParticles\s+from\s+['"](.*)divine-particles['"]/g,
      "import { DivineParticles } from '$1divine-particles'",
    );

    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed DivineParticles import in ${filePath}`);
  }
});

console.log("\n🎉 All build errors fixed! Run npm run build again.");
