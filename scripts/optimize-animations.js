#!/usr/bin/env node

/**
 * Animation Optimization Script
 *
 * This script analyzes the codebase for animation usage and makes recommendations
 * for optimizing performance and accessibility.
 *
 * It checks for:
 * 1. Framer Motion animations without reduced motion support
 * 2. Components that could benefit from the Animation Context
 * 3. CSS animations without hardware acceleration
 * 4. Missing will-change and transform-gpu classes
 * 5. Animation-heavy components that should be split or lazy-loaded
 */

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const chalk = require("chalk");

// Configuration
const SRC_DIR = path.join(process.cwd(), "src");
const COMPONENT_DIRS = ["components", "app"];
const ANIMATION_LIBS = ["framer-motion", "animate.css", "gsap", "react-spring"];
const ANIMATION_HOOKS = [
  "useAnimation",
  "useSpring",
  "useTransition",
  "useAnimate",
];
const HARDWARE_ACCELERATION_CLASSES = [
  "transform-gpu",
  "will-change-transform",
];
const MAX_ANIMATIONS_PER_COMPONENT = 8;

// Results tracking
const results = {
  totalFiles: 0,
  filesWithAnimations: 0,
  filesNeedingReducedMotion: 0,
  filesNeedingAnimationContext: 0,
  filesNeedingHardwareAcceleration: 0,
  filesWithTooManyAnimations: 0,
  detailedFindings: [],
};

/**
 * Analyzes a file for animation usage
 */
async function analyzeFile(filePath) {
  const content = await fs.promises.readFile(filePath, "utf8");
  const fileName = path.basename(filePath);
  const relativePath = path.relative(process.cwd(), filePath);

  // Skip if it's a test file
  if (fileName.includes(".test.") || fileName.includes(".spec.")) {
    return;
  }

  // Check if file has animations
  const hasAnimations =
    ANIMATION_LIBS.some((lib) => content.includes(lib)) ||
    ANIMATION_HOOKS.some((hook) => content.includes(hook)) ||
    content.includes("animate={") ||
    content.includes("animation:") ||
    content.includes("@keyframes");

  if (!hasAnimations) {
    return;
  }

  results.filesWithAnimations++;

  const findings = {
    file: relativePath,
    issues: [],
  };

  // Check for reduced motion support
  const hasReducedMotionSupport =
    content.includes("useReducedMotion") ||
    content.includes("prefersReducedMotion") ||
    content.includes("reducedMotion");

  if (!hasReducedMotionSupport) {
    findings.issues.push("Missing reduced motion support");
    results.filesNeedingReducedMotion++;
  }

  // Check for Animation Context usage
  const hasAnimationContext =
    content.includes("useAnimation(") ||
    content.includes("AnimationContext") ||
    content.includes("shouldSimplifyAnimations");

  if (!hasAnimationContext) {
    findings.issues.push(
      "Could benefit from Animation Context for optimized performance",
    );
    results.filesNeedingAnimationContext++;
  }

  // Check for hardware acceleration
  const hasHardwareAcceleration = HARDWARE_ACCELERATION_CLASSES.some((cls) =>
    content.includes(cls),
  );

  if (
    !hasHardwareAcceleration &&
    (content.includes("transform") || content.includes("opacity"))
  ) {
    findings.issues.push("Missing hardware acceleration classes");
    results.filesNeedingHardwareAcceleration++;
  }

  // Check for too many animations
  const animationCount =
    (content.match(/animate[=:{]/g) || []).length +
    (content.match(/transition[=:{]/g) || []).length +
    (content.match(/@keyframes/g) || []).length;

  if (animationCount > MAX_ANIMATIONS_PER_COMPONENT) {
    findings.issues.push(
      `High animation count (${animationCount}) - consider splitting component`,
    );
    results.filesWithTooManyAnimations++;
  }

  if (findings.issues.length > 0) {
    results.detailedFindings.push(findings);
  }
}

/**
 * Main function to run the analysis
 */
async function main() {
  console.log(chalk.blue("🔍 Analyzing animations in the codebase..."));

  try {
    // Find all React component files
    const filePatterns = COMPONENT_DIRS.map((dir) =>
      path.join(SRC_DIR, dir, "**/*.{jsx,tsx,js,ts}"),
    );

    const files = [];
    for (const pattern of filePatterns) {
      const matches = await glob(pattern);
      files.push(...matches);
    }

    results.totalFiles = files.length;

    // Analyze each file
    await Promise.all(files.map(analyzeFile));

    // Generate report
    console.log(chalk.green("\n✅ Animation Analysis Complete\n"));
    console.log(chalk.white("📊 Summary:"));
    console.log(chalk.white(`Total files analyzed: ${results.totalFiles}`));
    console.log(
      chalk.white(`Files with animations: ${results.filesWithAnimations}`),
    );
    console.log(
      chalk.yellow(
        `Files needing reduced motion support: ${results.filesNeedingReducedMotion}`,
      ),
    );
    console.log(
      chalk.yellow(
        `Files that could use Animation Context: ${results.filesNeedingAnimationContext}`,
      ),
    );
    console.log(
      chalk.yellow(
        `Files needing hardware acceleration: ${results.filesNeedingHardwareAcceleration}`,
      ),
    );
    console.log(
      chalk.yellow(
        `Files with too many animations: ${results.filesWithTooManyAnimations}`,
      ),
    );

    console.log(chalk.white("\n📋 Detailed Findings:"));
    results.detailedFindings.forEach((finding) => {
      console.log(chalk.cyan(`\n${finding.file}:`));
      finding.issues.forEach((issue) => {
        console.log(chalk.yellow(`  - ${issue}`));
      });
    });

    // Generate markdown report
    const markdownReport = generateMarkdownReport();
    const reportPath = path.join(process.cwd(), "ANIMATION_OPTIMIZATION.md");
    await fs.promises.writeFile(reportPath, markdownReport);

    console.log(chalk.green(`\n📄 Report saved to ${reportPath}`));
    console.log(chalk.blue("\n🚀 Next Steps:"));
    console.log(chalk.white("1. Add reduced motion support to all animations"));
    console.log(
      chalk.white(
        "2. Integrate with AnimationContext for performance optimizations",
      ),
    );
    console.log(
      chalk.white("3. Add hardware acceleration classes where needed"),
    );
    console.log(chalk.white("4. Split components with too many animations"));
  } catch (error) {
    console.error(chalk.red("Error analyzing animations:"), error);
    process.exit(1);
  }
}

/**
 * Generates a markdown report from the results
 */
function generateMarkdownReport() {
  const now = new Date().toLocaleDateString();

  return `# Animation Optimization Report
> Generated on ${now}

## Summary

| Metric | Count |
|--------|-------|
| Total files analyzed | ${results.totalFiles} |
| Files with animations | ${results.filesWithAnimations} |
| Files needing reduced motion support | ${results.filesNeedingReducedMotion} |
| Files that could use Animation Context | ${results.filesNeedingAnimationContext} |
| Files needing hardware acceleration | ${results.filesNeedingHardwareAcceleration} |
| Files with too many animations | ${results.filesWithTooManyAnimations} |

## Recommendations

### 1. Add Reduced Motion Support

${results.filesNeedingReducedMotion} files need reduced motion support for accessibility:

\`\`\`tsx
// Import the hook
import { useReducedMotion } from 'framer-motion';

// Inside your component
const prefersReducedMotion = useReducedMotion();

// Conditionally adjust animations
const animationVariants = prefersReducedMotion 
  ? { opacity: [0, 1] } // Simple fade only
  : { opacity: [0, 1], y: [50, 0] }; // Fade and move
\`\`\`

### 2. Utilize Animation Context

${results.filesNeedingAnimationContext} files could benefit from our AnimationContext:

\`\`\`tsx
// Import the hook
import { useAnimation } from '@/components/animation-context';

// Inside your component
const { 
  shouldSimplifyAnimations,
  reducedMotion,
  isPaused,
  isLowPerformance
} = useAnimation();

// Adapt animations based on context
const animationConfig = shouldSimplifyAnimations
  ? simpleAnimations
  : fullAnimations;
\`\`\`

### 3. Add Hardware Acceleration

${results.filesNeedingHardwareAcceleration} files need hardware acceleration classes:

\`\`\`tsx
// Add these classes to animated elements
<motion.div
  className="transform-gpu will-change-transform"
  animate={{ opacity: 1, y: 0 }}
>
  {children}
</motion.div>
\`\`\`

### 4. Split Animation-Heavy Components

${results.filesWithTooManyAnimations} files have too many animations and should be split:

- Extract animation logic into custom hooks
- Break down into smaller sub-components
- Consider lazy-loading complex animations

## Detailed Findings

${results.detailedFindings
  .map(
    (finding) => `
### ${finding.file}

${finding.issues.map((issue) => `- ${issue}`).join("\n")}
`,
  )
  .join("\n")}

## Next Steps

1. Fix high-priority issues in components on critical paths
2. Implement the AnimationContext provider at the app root
3. Add reduced motion support to all animation components
4. Test performance on low-end devices
`;
}

// Run the analysis
main();
