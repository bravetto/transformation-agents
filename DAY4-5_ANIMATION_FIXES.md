# 🛡️ DAY 4-5: Animation Error Handling (3 hours)

## 1. Fix Divine Particles with Full Error Handling

```typescript
// Update src/components/divine-particles.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { withDivineErrorBoundary } from '@/components/ui/divine-error-boundary';
import { useAnimation } from '@/components/animation-context';

function DivineParticlesComponent() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const engineRef = useRef<Engine | null>(null);
  const { shouldSimplifyAnimations, deviceTier } = useAnimation();

  // Particle count based on device capability
  const getParticleCount = useCallback(() => {
    if (shouldSimplifyAnimations) return 20;
    switch (deviceTier) {
      case 'low': return 30;
      case 'medium': return 60;
      case 'high': return 100;
      default: return 50;
    }
  }, [shouldSimplifyAnimations, deviceTier]);

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      // Store engine reference for cleanup
      engineRef.current = engine;
      
      // Check WebGL support before loading
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.warn('WebGL not supported, skipping particles');
        setHasError(true);
        return;
      }
      
      await loadSlim(engine);
      setIsInitialized(true);
    } catch (error) {
      console.error('Particles initialization failed:', error);
      setHasError(true);
      // Report to analytics
      if (typeof window !== 'undefined' && window.reportError) {
        window.reportError(error as Error, { component: 'DivineParticles' });
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (engineRef.current) {
        try {
          // Clean up particles engine
          engineRef.current.destroy();
        } catch (error) {
          console.error('Particles cleanup error:', error);
        }
      }
    };
  }, []);

  // Performance monitoring
  useEffect(() => {
    if (!isInitialized) return;

    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Disable if FPS drops too low
        if (fps < 20) {
          console.warn(`Low FPS detected: ${fps}`);
          setHasError(true);
        }
      }
    };

    const interval = setInterval(checkPerformance, 100);
    return () => clearInterval(interval);
  }, [isInitialized]);

  const options: ISourceOptions = {
    particles: {
      number: {
        value: getParticleCount(),
        density: {
          enable: true,
          area: 800
        }
      },
      // ... rest of your particle options
    },
    detectRetina: true,
    fpsLimit: 60,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true
  };

  // Graceful fallback
  if (hasError || shouldSimplifyAnimations) {
    return (
      <div className="divine-particles-fallback absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse" />
      </div>
    );
  }

  return (
    <Particles
      id="tsparticles"
      onInit={particlesInit}
      options={options}
      className="absolute inset-0"
    />
  );
}

export default withDivineErrorBoundary(DivineParticlesComponent, {
  componentName: 'DivineParticles',
  fallback: <div className="divine-particles-static" />
});
```

## 2. Add Error Handling to Sacred Animations

```typescript
// Update src/components/sacred-animations.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useAnimation } from '@/components/animation-context';

export function SacredReveal({ children, delay = 0, className = "" }) {
  const [isReady, setIsReady] = useState(false);
  const { shouldSimplifyAnimations } = useAnimation();
  
  useEffect(() => {
    // Delay mounting to prevent hydration issues
    const timer = setTimeout(() => setIsReady(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const springs = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { 
      opacity: isReady ? 1 : 0, 
      transform: isReady ? 'translateY(0px)' : 'translateY(20px)' 
    },
    delay: shouldSimplifyAnimations ? 0 : delay,
    config: { tension: 200, friction: 20 },
    onRest: () => {
      // Cleanup after animation
    }
  });

  if (shouldSimplifyAnimations) {
    return <div className={className}>{children}</div>;
  }

  return (
    <animated.div style={springs} className={className}>
      {children}
    </animated.div>
  );
}

export function FloatingElement({ children, intensity = 'gentle', className = "" }) {
  const animationRef = useRef<any>();
  const { shouldSimplifyAnimations, isPaused } = useAnimation();
  
  const springs = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      if (shouldSimplifyAnimations || isPaused) return;
      
      try {
        while (true) {
          await next({ transform: 'translateY(-10px)' });
          await next({ transform: 'translateY(10px)' });
        }
      } catch (error) {
        console.error('FloatingElement animation error:', error);
      }
    },
    config: { duration: 3000 },
    pause: isPaused || shouldSimplifyAnimations
  });

  useEffect(() => {
    return () => {
      // Cancel animation on unmount
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  if (shouldSimplifyAnimations) {
    return <div className={className}>{children}</div>;
  }

  return (
    <animated.div ref={animationRef} style={springs} className={className}>
      {children}
    </animated.div>
  );
}
```

## 3. Create Animation Performance Monitor

```typescript
// Create src/lib/animation-monitor.ts
export class AnimationPerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private lowFpsCallback?: (fps: number) => void;
  private animationFrame?: number;

  constructor(lowFpsThreshold = 30) {
    this.monitor = this.monitor.bind(this);
  }

  start(onLowFps?: (fps: number) => void) {
    this.lowFpsCallback = onLowFps;
    this.monitor();
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private monitor() {
    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - this.lastTime >= 1000) {
      const fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      if (fps < 30 && this.lowFpsCallback) {
        this.lowFpsCallback(fps);
      }
    }
    
    this.animationFrame = requestAnimationFrame(this.monitor);
  }
}

// Usage in components
const monitor = new AnimationPerformanceMonitor();
monitor.start((fps) => {
  console.warn(`Low FPS detected: ${fps}`);
  // Disable animations or reduce quality
});
```

## 4. Add Progress Tracking Script

```bash
# Create scripts/track-progress.js
cat > scripts/track-progress.js << 'EOF'
const fs = require('fs');
const path = require('path');

function countFiles(dir, pattern) {
  let count = 0;
  
  function walk(currentDir) {
    const files = fs.readdirSync(currentDir, { withFileTypes: true });
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file.name);
      
      if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
        walk(filePath);
      } else if (file.isFile() && file.name.match(pattern)) {
        count++;
      }
    });
  }
  
  walk(dir);
  return count;
}

// Count error files
const errorFiles = countFiles('./src/app', /error\.tsx$/);
const testFiles = countFiles('./src', /\.test\.(tsx?|jsx?)$/);
const totalRoutes = 15;

console.log('📊 ERROR HANDLING & TEST PROGRESS');
console.log('==================================\n');

console.log('🛡️ ERROR BOUNDARIES:');
console.log(`   Coverage: ${errorFiles}/${totalRoutes} routes (${Math.round(errorFiles/totalRoutes*100)}%)`);
console.log(`   Target: 5 files by end of Week 1`);
console.log(`   Status: ${errorFiles >= 5 ? '✅ ACHIEVED' : `🔥 Need ${5 - errorFiles} more`}\n`);

console.log('🧪 TEST FILES:');
console.log(`   Total test files: ${testFiles}`);
console.log(`   Target: 20+ test files`);
console.log(`   Status: ${testFiles >= 20 ? '✅ ACHIEVED' : `🔥 Need ${20 - testFiles} more`}\n`);

// List missing error.tsx files
console.log('❌ ROUTES MISSING ERROR.TSX:');
const appDir = './src/app';
const routes = fs.readdirSync(appDir, { withFileTypes: true })
  .filter(file => file.isDirectory() && !file.name.startsWith('(') && !file.name.startsWith('_'))
  .filter(dir => !fs.existsSync(path.join(appDir, dir.name, 'error.tsx')));

routes.forEach(route => {
  console.log(`   - ${route.name}/`);
});

console.log('\n✅ NEXT STEPS:');
if (errorFiles < 5) {
  console.log('1. Add error.tsx to:', routes.slice(0, 5 - errorFiles).map(r => r.name).join(', '));
}
if (testFiles < 20) {
  console.log('2. Write tests for: divine-particles, forms, critical paths');
}
console.log('3. Run: npm run test:coverage');
EOF

# Add to package.json
npm pkg set scripts.progress="node scripts/track-progress.js"
```

## 5. Quick Validation Script

```bash
# Create validation script
cat > scripts/validate-fixes.sh << 'EOF'
#!/bin/bash

echo "🔍 Validating Error Handling Fixes..."

# Check for use client directives
echo -n "Checking 'use client' directives... "
missing=$(grep -r "useState\|useEffect" src/components/ | grep -v "use client" | wc -l)
if [ $missing -eq 0 ]; then
  echo "✅ All components have 'use client'"
else
  echo "❌ $missing components missing 'use client'"
fi

# Check error boundaries
echo -n "Checking error.tsx files... "
error_count=$(find src/app -name "error.tsx" | wc -l)
echo "Found $error_count/15 (${error_count}0%)"

# Check build
echo -n "Testing build... "
if npm run build > /dev/null 2>&1; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
fi

# Check tests
echo -n "Running tests... "
if npm test -- --passWithNoTests > /dev/null 2>&1; then
  echo "✅ Tests pass"
else
  echo "❌ Tests failing"
fi
EOF

chmod +x scripts/validate-fixes.sh
```

## ✅ Day 4-5 Success Metrics

- [ ] Divine particles has full error handling
- [ ] Animation components have fallbacks
- [ ] Performance monitoring implemented
- [ ] Progress tracking script working
- [ ] All animations gracefully degrade

## 🚀 Quick Commands

```bash
# Run progress check
npm run progress

# Validate all fixes
./scripts/validate-fixes.sh

# Test animations
npm test -- --testNamePattern="animation|particle"

# Check performance
npm run dev
# Open DevTools > Performance > Record while using the site
``` 