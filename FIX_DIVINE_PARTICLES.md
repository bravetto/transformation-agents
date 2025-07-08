# 🎯 Fix Divine Particles Component - Complete Solution

## The Problem
Your `divine-particles.tsx` component is missing error handling and crashes on low-end devices or when WebGL isn't available.

## The Solution - Copy & Paste Ready

### Option 1: Quick Fix (Add to existing component)

```typescript
// Add this to the TOP of src/components/divine-particles.tsx
'use client';

// Add these imports
import { useEffect, useState, useCallback, useRef } from 'react';
import { useAnimation } from '@/components/animation-context';

// Wrap your existing component with error handling
function DivineParticlesComponent() {
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { shouldSimplifyAnimations, deviceTier } = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      // Check WebGL support first
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.warn('WebGL not supported, using fallback');
        setHasError(true);
        return;
      }

      await loadSlim(engine);
      setIsInitialized(true);
    } catch (error) {
      console.error('Particles initialization failed:', error);
      setHasError(true);
      
      // Report to analytics if available
      if (typeof window !== 'undefined' && window.reportError) {
        window.reportError(error as Error, { component: 'DivineParticles' });
      }
    }
  }, []);

  // Fallback UI when there's an error
  if (hasError || shouldSimplifyAnimations) {
    return (
      <div className="divine-particles-fallback absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 animate-pulse" />
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .divine-particles-fallback::before,
          .divine-particles-fallback::after {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
          }
          .divine-particles-fallback::before {
            top: 20%;
            left: 30%;
            animation-delay: 0s;
          }
          .divine-particles-fallback::after {
            top: 60%;
            right: 40%;
            animation-delay: 3s;
          }
        `}</style>
      </div>
    );
  }

  // Your existing Particles component with options
  const options: ISourceOptions = {
    particles: {
      number: {
        value: deviceTier === 'low' ? 30 : deviceTier === 'medium' ? 60 : 100,
        density: { enable: true, area: 800 }
      },
      // ... rest of your options
    },
    detectRetina: true,
    fpsLimit: 60,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true
  };

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Particles
        id="tsparticles"
        onInit={particlesInit}
        options={options}
      />
    </div>
  );
}

// Export with error boundary
export default withDivineErrorBoundary(DivineParticlesComponent, {
  componentName: 'DivineParticles',
  fallback: <div className="divine-particles-static" />
});
```

### Option 2: Complete Replacement (Bulletproof Version)

Save this as `src/components/divine-particles-safe.tsx`:

```typescript
'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { withDivineErrorBoundary } from '@/components/ui/divine-error-boundary';

// Lazy load the actual particles to prevent SSR issues
const ParticlesEngine = dynamic(
  () => import('@tsparticles/react').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div className="particles-loading" />
  }
);

interface State {
  hasError: boolean;
  particleCount: number;
  isWebGLSupported: boolean;
}

class DivineParticlesCore extends Component<{}, State> {
  private animationFrame: number | null = null;
  
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
      particleCount: 50,
      isWebGLSupported: true,
    };
  }

  componentDidMount() {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      this.setState({ isWebGLSupported: false });
      return;
    }

    // Detect device capabilities
    this.detectDeviceCapabilities();
    
    // Monitor performance
    this.startPerformanceMonitoring();
  }

  componentWillUnmount() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Divine Particles Error:', error, errorInfo);
    this.setState({ hasError: true });
  }

  detectDeviceCapabilities = () => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (performance as any).memory?.jsHeapSizeLimit || 0;
    
    let particleCount = 100;
    if (cores <= 2 || memory < 1000000000) {
      particleCount = 30; // Low-end
    } else if (cores <= 4) {
      particleCount = 60; // Mid-range
    }
    
    this.setState({ particleCount });
  };

  startPerformanceMonitoring = () => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const monitor = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Reduce particles if FPS is too low
        if (fps < 20 && this.state.particleCount > 20) {
          this.setState(prev => ({ particleCount: Math.max(20, prev.particleCount - 10) }));
        }
      }
      
      this.animationFrame = requestAnimationFrame(monitor);
    };
    
    monitor();
  };

  render() {
    const { hasError, isWebGLSupported, particleCount } = this.state;

    // CSS-only fallback
    if (hasError || !isWebGLSupported) {
      return (
        <div className="divine-particles-css-fallback">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
          <style jsx>{`
            .divine-particles-css-fallback {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
            }
            
            .stars {
              width: 1px;
              height: 1px;
              background: transparent;
              box-shadow: ${Array(50).fill(0).map(() => 
                `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`
              ).join(', ')};
              animation: animStar 50s linear infinite;
            }
            
            .stars2 {
              width: 2px;
              height: 2px;
              background: transparent;
              box-shadow: ${Array(30).fill(0).map(() => 
                `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`
              ).join(', ')};
              animation: animStar 100s linear infinite;
            }
            
            .stars3 {
              width: 3px;
              height: 3px;
              background: transparent;
              box-shadow: ${Array(20).fill(0).map(() => 
                `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`
              ).join(', ')};
              animation: animStar 150s linear infinite;
            }
            
            @keyframes animStar {
              from { transform: translateY(0px); }
              to { transform: translateY(-2000px); }
            }
          `}</style>
        </div>
      );
    }

    // Actual particles with dynamic config
    const options = {
      particles: {
        number: {
          value: particleCount,
          density: { enable: true, area: 800 }
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
          value: 0.5,
          random: true,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          animation: {
            enable: false
          }
        },
        links: {
          enable: false
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          outMode: "out",
          bounce: false
        }
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: false
          },
          onClick: {
            enable: false
          },
          resize: true
        }
      },
      detectRetina: true,
      fpsLimit: 60,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true
    };

    return (
      <ParticlesEngine
        id="tsparticles"
        options={options}
        className="absolute inset-0"
      />
    );
  }
}

// Export with divine error boundary
const DivineParticles = withDivineErrorBoundary(DivineParticlesCore, {
  componentName: 'DivineParticles',
  fallback: (
    <div className="divine-particles-fallback absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-blue-900/5" />
    </div>
  )
});

export default DivineParticles;
```

## How to Apply the Fix

### Step 1: Backup Current Component
```bash
cp src/components/divine-particles.tsx src/components/divine-particles.backup.tsx
```

### Step 2: Apply the Fix
Choose Option 1 (quick fix) or Option 2 (complete replacement):

```bash
# For Option 2 (recommended):
mv src/components/divine-particles.tsx src/components/divine-particles.old.tsx
mv src/components/divine-particles-safe.tsx src/components/divine-particles.tsx
```

### Step 3: Test the Fix
```bash
# Test in development
npm run dev
# Open browser and check console for errors

# Test the build
npm run build
```

### Step 4: Write a Test
```bash
cat > src/components/__tests__/divine-particles.test.tsx << 'EOF'
import { render, screen } from '@testing-library/react';
import DivineParticles from '../divine-particles';

// Mock the particles library
jest.mock('@tsparticles/react', () => ({
  __esModule: true,
  default: ({ id }: any) => <div data-testid={`particles-${id}`} />
}));

describe('DivineParticles', () => {
  it('renders without crashing', () => {
    const { container } = render(<DivineParticles />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles WebGL not supported gracefully', () => {
    // Mock WebGL not available
    HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
    
    const { container } = render(<DivineParticles />);
    expect(container.querySelector('.divine-particles-css-fallback')).toBeInTheDocument();
  });
});
EOF

npm test divine-particles
```

## Verify Success

After applying the fix, you should see:
- ✅ No console errors about particles
- ✅ Graceful fallback on devices without WebGL
- ✅ Reduced particle count on low-end devices
- ✅ Build passes without errors
- ✅ Component still looks good visually

## Common Issues & Solutions

### Issue: "Cannot find module '@tsparticles/react'"
```bash
npm install @tsparticles/react @tsparticles/slim
```

### Issue: "window is not defined"
Make sure you have `'use client'` at the top of the file.

### Issue: Performance still poor
Reduce the particle count further in the options:
```typescript
number: { value: 20 } // Even lower for very slow devices
``` 