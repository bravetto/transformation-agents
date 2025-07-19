# Animation Optimization Report

## Summary
- Scanned 75 files
- Found 46 files with animations
- 4 components support reduced motion (9%)
- 0 components are battery-conscious (0%)
- 39 components use Framer Motion
- 2 components use CSS animations

## Components Needing Reduced Motion Support
- src/components/youth-mentorship.tsx
- src/components/story-amplifier.tsx
- src/components/social-amplification.tsx
- src/components/smart-cta.tsx
- src/components/prophetic-moment.tsx
- src/components/prophetic-countdown.tsx
- src/components/navigation.tsx
- src/components/sacred-animations.tsx
- src/components/risk-mitigation.tsx
- src/components/michael-testament.tsx
- src/components/impact-dashboard.tsx
- src/components/letters-of-hope.tsx
- src/components/hero.tsx
- src/components/heartbeat-monitor.tsx
- src/components/footer.tsx
- src/components/divine-particles.tsx
- src/components/floating-testimony.tsx
- src/components/divine-letter-form.tsx
- src/components/divine-impact-dashboard.tsx
- src/components/ui/typography.tsx
- src/components/ui/switch.tsx
- src/components/ui/stack.tsx
- src/components/ui/radio-group.tsx
- src/components/ui/select.tsx
- src/components/ui/label.tsx
- src/components/ui/divine-image.tsx
- src/components/ui/input.tsx
- src/components/ui/container.tsx
- src/components/ui/badge.tsx
- src/components/ui/card.tsx
- src/components/people/person-video.tsx
- src/components/people/synchronicity-map.tsx
- src/components/ui/file-upload.tsx
- src/components/people/person-testimony.tsx
- src/components/people/person-custom.tsx
- src/components/people/person-impact.tsx
- src/components/people/FilterBar.tsx
- src/components/people/assessment-alignment.tsx
- src/components/people/person-hero.tsx
- src/components/people/GridView.tsx
- src/components/people/enhanced-person-hero.tsx
- src/components/people/interactive-person-grid.tsx

## Components With Expensive Animations
- src/components/story-amplifier.tsx
- src/components/prophetic-countdown.tsx
- src/components/michael-testament.tsx
- src/components/floating-testimony.tsx
- src/components/ui/divine-image.tsx
- src/components/ui/person-card.tsx
- src/components/ui/badge.tsx
- src/components/people/person-impact.tsx
- src/components/people/LoadingStates.tsx
- src/components/people/FilterBar.tsx
- src/components/people/person-hero.tsx
- src/components/people/enhanced-person-hero.tsx

## Components Missing Animation Cleanup
- src/components/smart-cta.tsx
- src/components/impact-dashboard.tsx
- src/components/heartbeat-monitor.tsx
- src/components/divine-impact-dashboard.tsx
- src/components/people/interactive-person-grid.tsx

## Components Not Using Animation Context
- src/components/youth-mentorship.tsx
- src/components/story-amplifier.tsx
- src/components/social-amplification.tsx
- src/components/smart-cta.tsx
- src/components/prophetic-moment.tsx
- src/components/prophetic-countdown.tsx
- src/components/navigation.tsx
- src/components/risk-mitigation.tsx
- src/components/michael-testament.tsx
- src/components/impact-dashboard.tsx
- src/components/letters-of-hope.tsx
- src/components/hero.tsx
- src/components/heartbeat-monitor.tsx
- src/components/floating-testimony.tsx
- src/components/divine-letter-form.tsx
- src/components/divine-impact-dashboard.tsx
- src/components/ui/stack.tsx
- src/components/ui/radio-group.tsx
- src/components/ui/select.tsx
- src/components/ui/label.tsx
- src/components/ui/divine-image.tsx
- src/components/ui/input.tsx
- src/components/ui/person-card.tsx
- src/components/ui/container.tsx
- src/components/ui/badge.tsx
- src/components/people/synchronicity-map.tsx
- src/components/ui/file-upload.tsx
- src/components/people/person-testimony.tsx
- src/components/people/person-custom.tsx
- src/components/people/person-impact.tsx
- src/components/people/LoadingStates.tsx
- src/components/people/FilterBar.tsx
- src/components/people/assessment-alignment.tsx
- src/components/people/person-hero.tsx
- src/components/people/enhanced-person-hero.tsx
- src/components/people/interactive-person-grid.tsx

## Specific Suggestions


### src/components/youth-mentorship.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/youth-mentorship.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/story-amplifier.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/story-amplifier.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/story-amplifier.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/social-amplification.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/social-amplification.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/smart-cta.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/smart-cta.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/smart-cta.tsx
**Suggestion:** Add proper cleanup for animations

```jsx
useEffect(() => {
  // Animation setup
  const animation = requestAnimationFrame(() => {
    // Animation code
  });
  
  // Proper cleanup
  return () => {
    cancelAnimationFrame(animation);
  };
}, [dependencies]);
```


### src/components/prophetic-moment.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/prophetic-moment.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/prophetic-countdown.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/prophetic-countdown.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/prophetic-countdown.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/navigation.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/navigation.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/sacred-animations.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/risk-mitigation.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/risk-mitigation.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/michael-testament.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/michael-testament.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/michael-testament.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/impact-dashboard.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/impact-dashboard.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/impact-dashboard.tsx
**Suggestion:** Add proper cleanup for animations

```jsx
useEffect(() => {
  // Animation setup
  const animation = requestAnimationFrame(() => {
    // Animation code
  });
  
  // Proper cleanup
  return () => {
    cancelAnimationFrame(animation);
  };
}, [dependencies]);
```


### src/components/letters-of-hope.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/letters-of-hope.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/hero.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/hero.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/heartbeat-monitor.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/heartbeat-monitor.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/heartbeat-monitor.tsx
**Suggestion:** Add proper cleanup for animations

```jsx
useEffect(() => {
  // Animation setup
  const animation = requestAnimationFrame(() => {
    // Animation code
  });
  
  // Proper cleanup
  return () => {
    cancelAnimationFrame(animation);
  };
}, [dependencies]);
```


### src/components/footer.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/divine-particles.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/floating-testimony.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/floating-testimony.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/floating-testimony.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/divine-letter-form.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/divine-letter-form.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/divine-impact-dashboard.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/divine-impact-dashboard.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/divine-impact-dashboard.tsx
**Suggestion:** Add proper cleanup for animations

```jsx
useEffect(() => {
  // Animation setup
  const animation = requestAnimationFrame(() => {
    // Animation code
  });
  
  // Proper cleanup
  return () => {
    cancelAnimationFrame(animation);
  };
}, [dependencies]);
```


### src/components/ui/typography.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/switch.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/stack.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/stack.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/radio-group.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/radio-group.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/select.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/select.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/label.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/label.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/divine-image.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/divine-image.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/divine-image.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/ui/input.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/input.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/person-card.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/person-card.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/ui/container.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/container.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/badge.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/badge.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/badge.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/ui/card.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/person-video.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/synchronicity-map.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/synchronicity-map.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/ui/file-upload.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/ui/file-upload.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/person-testimony.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/person-testimony.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/person-custom.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/person-custom.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/person-impact.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/person-impact.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/person-impact.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/people/LoadingStates.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/LoadingStates.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/people/FilterBar.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/FilterBar.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/FilterBar.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/people/assessment-alignment.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/assessment-alignment.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/person-hero.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/person-hero.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/person-hero.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/people/GridView.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/enhanced-person-hero.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/enhanced-person-hero.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/enhanced-person-hero.tsx
**Suggestion:** Optimize expensive animations

```jsx
// Replace expensive CSS properties:
// Instead of filter/box-shadow animations, use:
transform: scale() and opacity

// Use will-change properly:
will-change: transform, opacity;
// But only when animating, remove it after
```


### src/components/people/interactive-person-grid.tsx
**Suggestion:** Add reduced motion support

```jsx
// Add this import
import { useReducedMotion } from 'framer-motion';
// Or use our context
import { useAnimation } from '@/components/animation-context';

// Then in your component:
const prefersReducedMotion = useReducedMotion();
// Or from context:
const { reducedMotion } = useAnimation();

// Then in your animations:
<motion.div
  animate={{ 
    y: reducedMotion ? 0 : 20,
    opacity: 1 
  }}
/>
```


### src/components/people/interactive-person-grid.tsx
**Suggestion:** Use Animation Context for better performance

```jsx
// Replace direct Framer Motion usage with our optimized context
import { useAnimation } from '@/components/animation-context';

// In your component:
const { 
  reducedMotion,
  shouldSimplifyAnimations,
  isPaused
} = useAnimation();

// Then in your animations:
<motion.div
  animate={isPaused ? undefined : { opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldSimplifyAnimations ? 0 : 20 }}
/>
```


### src/components/people/interactive-person-grid.tsx
**Suggestion:** Add proper cleanup for animations

```jsx
useEffect(() => {
  // Animation setup
  const animation = requestAnimationFrame(() => {
    // Animation code
  });
  
  // Proper cleanup
  return () => {
    cancelAnimationFrame(animation);
  };
}, [dependencies]);
```


## Recommended Next Steps

1. **Add Reduced Motion Support**: Prioritize adding reduced motion support to all components with animations
2. **Use Animation Context**: Replace direct Framer Motion usage with our optimized context
3. **Fix Missing Cleanup**: Ensure all animation effects have proper cleanup
4. **Optimize Expensive Animations**: Replace CPU-intensive animations with GPU-accelerated alternatives
5. **Monitor Battery Usage**: Add battery awareness to animation-heavy components

Run this script again after making changes to track your progress.
