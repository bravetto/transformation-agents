# Divine Animation System: Optimization Guide

This guide establishes performance-optimized animation standards for The Bridge Project, ensuring consistent, accessible, and efficient animations across all components.

## Core Animation Principles

1. **Standardization on Framer Motion**
   - All component animations must use Framer Motion for consistency
   - CSS animations should be migrated to Framer Motion equivalents
   - Exception: Simple CSS transitions for hover/focus states remain appropriate

2. **Performance Optimization**
   - Transform and opacity properties preferred over layout properties
   - GPU acceleration via `willChange`, `transform`, and `opacity` 
   - Reduced animation complexity on mobile and low-power devices
   - Animation performance monitoring with auto-adaptation

3. **Accessibility Compliance**
   - Honor reduced motion preferences
   - All animations must have fallbacks for reduced motion settings
   - No animations that could trigger vestibular disorders
   - No rapidly flashing content (3 flashes or below per second)

4. **Divine Timing and Easing**
   - Standard timing: 0.5s for page transitions, 0.3s for component animations
   - Divine ease: `[0.16, 1, 0.3, 1]` (Exponential ease out)
   - Consistent animation durations across similar components

5. **Memory and Battery Considerations**
   - Proper cleanup of all animation components
   - Reduction of particle counts on mobile and low-end devices
   - Animation pausing when tab/page not active

## Animation Types and Best Practices

### 1. Page Transitions

```jsx
// Standard page transition pattern
import { PageTransition } from '@/components/ui/page-transition';

export default function Page() {
  return (
    <PageTransition variant="fadeIn">
      <div>Page content</div>
    </PageTransition>
  );
}
```

**Best Practices:**
- Use consistent entry/exit animations for similar page types
- Avoid layout shifts during transitions
- Keep transitions under 500ms for perceived performance
- Use the shared `PageTransition` component

### 2. Component Animations

```jsx
// Standard component animation pattern
import { motion } from 'framer-motion';
import { animations } from '@/lib/design-system';

const { easings } = animations;

export default function AnimatedComponent() {
  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
      transition={{ 
        duration: 0.5, 
        ease: easings.easeOut // Divine ease
      }}
    >
      Component content
    </motion.div>
  );
}
```

**Best Practices:**
- Use `layoutId` for elements that move between states
- Prefer `AnimatePresence` for elements entering/exiting the DOM
- Use staggered animations for lists (stagger delay: 0.05-0.1s)
- Only animate necessary properties

### 3. Hover and Focus Animations

```jsx
// Standard hover animation pattern
import { motion } from 'framer-motion';

export default function HoverComponent() {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        transition: { 
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1] // Divine ease
        }
      }}
      whileTap={{ scale: 0.98 }}
    >
      Hoverable content
    </motion.div>
  );
}
```

**Best Practices:**
- Keep hover animations subtle (scale changes under 10%)
- Ensure hover effects have appropriate timing (200-300ms)
- Include `whileTap` state for interactive elements
- Use hardware-accelerated properties

### 4. Divine Particle Animations

The `DivineParticles` component already implements performance optimization. Use consistently with these settings:

```jsx
// Standard particle component usage
import DivineParticles from '@/components/divine-particles';

export default function Component() {
  return (
    <div className="relative h-64">
      <DivineParticles
        role="messenger"
        variant="minimal"
        intensity="auto" // Automatically adapts to device performance
        interactive={false} // Disable interaction for better performance
      />
      <div className="relative z-10">Content above particles</div>
    </div>
  );
}
```

**Best Practices:**
- Use `intensity="auto"` to enable performance scaling
- Set `interactive={false}` for decorative backgrounds
- Use `variant="minimal"` for better performance on mobile
- Place particles in a containing div with `relative` positioning

### 5. Loading State Animations

```jsx
// Standard loading animation pattern
import { motion } from 'framer-motion';
import { animations } from '@/lib/design-system';

export default function LoadingState() {
  return (
    <motion.div
      animate={{ 
        opacity: [0.5, 1, 0.5],
        scale: [0.98, 1, 0.98]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 2,
        ease: "linear"
      }}
      className="h-20 w-full bg-gray-200 rounded-md"
    />
  );
}
```

**Best Practices:**
- Use subtle animations for loading states
- Prefer skeleton loaders over spinners where appropriate
- Honor reduced motion preferences
- Keep loading animations running at lower framerate

## Performance Optimization Techniques

### 1. Hardware Acceleration

```jsx
// Using hardware acceleration correctly
<motion.div
  style={{ 
    willChange: isAnimating ? 'transform, opacity' : 'auto'
  }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

**Best Practices:**
- Only use `willChange` during animation
- Set `willChange` to `auto` when not animating
- Prefer transforms over animating physical properties (width, height)
- Use `transform-gpu` Tailwind class for GPU acceleration

### 2. Adaptive Performance

```jsx
// Performance monitoring and adaptation
import { useReducedMotion } from 'framer-motion';
import { useBreakpoints } from '@/lib/responsive';

export default function AdaptiveAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const { isMobile, isLowPowerMode } = useBreakpoints();
  
  // Adapt animation complexity based on device
  const particleCount = prefersReducedMotion ? 0 : 
    isMobile ? 20 : 
    isLowPowerMode ? 30 : 
    60;
  
  return (
    <ParticleSystem count={particleCount} />
  );
}
```

**Best Practices:**
- Always check for reduced motion preferences
- Scale animation complexity based on device capabilities
- Monitor FPS and adapt accordingly (as in DivineParticles)
- Disable non-essential animations on low-power devices

### 3. Animation Cleanup

```jsx
// Proper animation cleanup
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function CleanupExample() {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Start animation
    controls.start({
      opacity: [0, 1],
      y: [20, 0]
    });
    
    // Cleanup animation on unmount
    return () => {
      controls.stop();
    };
  }, [controls]);
  
  return isVisible ? (
    <motion.div animate={controls}>
      Animated content
    </motion.div>
  ) : null;
}
```

**Best Practices:**
- Always clean up animations in `useEffect` return function
- Use `controls.stop()` for Framer Motion animations
- Clear any animation-related intervals or timeouts
- Stop animations when component is hidden

## Implementation Examples

### Optimized Modal Animation

```jsx
// Before:
<div
  className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`}
>
  <div 
    className={`bg-white rounded-lg p-6 transition-all duration-500 ${
      isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
    }`}
  >
    Modal content
  </div>
</div>

// After (Optimized):
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

function OptimizedModal({ isOpen, onClose, children }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ 
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 0.95,
              y: prefersReducedMotion ? 0 : 10
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0 
            }}
            exit={{ 
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 0.95,
              y: prefersReducedMotion ? 0 : 10
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1] // Divine ease
            }}
            className="bg-white rounded-lg p-6 mx-auto my-16 max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Optimized List Animation

```jsx
// Before:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div 
      key={item.id}
      className="animate-fadeIn bg-white p-4 rounded-lg"
    >
      {item.content}
    </div>
  ))}
</div>

// After (Optimized):
import { motion } from 'framer-motion';

function OptimizedList({ items }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] // Divine ease
      }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map(item => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="bg-white p-4 rounded-lg"
          layout="position"
        >
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## Animation Performance Checklist

- [ ] All animations use Framer Motion consistently
- [ ] Reduced motion preferences are honored
- [ ] Hardware acceleration is used appropriately
- [ ] Animations have proper cleanup
- [ ] Page transitions use consistent patterns
- [ ] Mobile performance is tested and optimized
- [ ] Battery usage is monitored and minimized
- [ ] Animation timings are consistent
- [ ] Divine easing curve `[0.16, 1, 0.3, 1]` is used
- [ ] No layout shifts during animations
- [ ] Complex animations scale based on device capability

## Component-Specific Optimizations

### `DivineParticles` Component

- Already implements performance monitoring and auto-scaling
- Use `variant="minimal"` for better performance
- Set `intensity="auto"` to adapt to device capabilities
- Set `interactive={false}` for background decorations

### `PropheticCountdown` Component

- Reduce animation complexity on mobile devices
- Implement proper reduced motion support
- Use layout animations for smoother transitions

### `DivineImpactDashboard` Component

- Batch animations to reduce layout thrashing
- Implement virtualization for large metric lists
- Add animation pausing when dashboard is not visible

### `InteractivePersonGrid` Component

- Add virtualization for large person lists
- Implement intersection observer for animation triggers
- Optimize filter animations for smoother transitions

## Implementation Plan

1. **Create Animation Context Provider**
   - Provide device capability detection
   - Share animation preferences across components
   - Centralize reduced motion detection

2. **Update Animation Utilities**
   - Enhance `animations` in design system
   - Add performance monitoring utilities
   - Create adaptive animation hooks

3. **Standardize Component Animations**
   - Update all components to use Framer Motion
   - Implement consistent animation patterns
   - Add proper cleanup to all animations

4. **Optimize High-Impact Components**
   - Focus on components with the most animation complexity
   - Implement virtualization where needed
   - Add adaptive scaling based on device capabilities

5. **Measure and Validate**
   - Implement FPS monitoring
   - Test on various devices
   - Verify battery consumption

By following these guidelines, The Bridge Project will maintain divine aesthetic perfection while ensuring optimal performance across all devices. 