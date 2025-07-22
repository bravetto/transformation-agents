# Core Web Vitals Optimization Plan

This document outlines the strategy for optimizing Core Web Vitals metrics to ensure excellent user experience and better search engine rankings.

## Understanding Core Web Vitals

Core Web Vitals are a set of specific factors that Google considers important for overall user experience:

1. **Largest Contentful Paint (LCP)** - Loading performance
   - Good: ≤ 2.5 seconds
   - Needs Improvement: 2.5 - 4.0 seconds
   - Poor: > 4.0 seconds

2. **First Input Delay (FID)** - Interactivity
   - Good: ≤ 100 milliseconds
   - Needs Improvement: 100 - 300 milliseconds
   - Poor: > 300 milliseconds

3. **Cumulative Layout Shift (CLS)** - Visual stability
   - Good: ≤ 0.1
   - Needs Improvement: 0.1 - 0.25
   - Poor: > 0.25

## Current Status and Potential Issues

Based on our codebase analysis, we've identified the following potential issues:

### LCP (Largest Contentful Paint)
- Hero section loads dynamically and may take time to render
- Particles animation may delay rendering of main content
- Critical CSS might not be properly extracted

### CLS (Cumulative Layout Shift)
- Missing explicit width/height on some image components
- Dynamic content loading may cause layout shifts
- Font loading strategy may cause text shifts

### FID (First Input Delay)
- Heavy JavaScript execution for animations and particles
- No proper code splitting for interaction handlers
- Potential main thread blocking during initial load

## Optimization Plan

### 1. LCP Optimization

#### High Priority Actions:
- **Preload Hero Image Assets**
  ```js
  // Add to next.config.js
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '</images/logo-blue.png>; rel=preload; as=image',
          },
        ],
      },
    ];
  }
  ```

- **Prioritize Hero Section**
  ```jsx
  // Update src/components/hero.tsx
  <Image
    src="/images/logo-blue.png"
    alt="Bridge Project Logo"
    width={200}
    height={60}
    priority={true} // Add priority flag
  />
  ```

- **Defer Non-Critical JavaScript**
  ```jsx
  // Update DivineParticles to have a lower priority
  const DivineParticles = dynamic(() => import('@/components/divine-particles'), {
    ssr: false,
    loading: () => <div className="particles-placeholder" />,
    priority: false
  });
  ```

#### Medium Priority Actions:
- Implement server-side HTML caching for faster initial render
- Optimize webfonts loading with `font-display: swap`
- Move non-critical CSS to separate files loaded asynchronously

### 2. CLS Optimization

#### High Priority Actions:
- **Add Explicit Dimensions to All Images**
  ```jsx
  // Update all image components
  <DivineImage
    src={src}
    alt={alt}
    width={400} // Add explicit width
    height={300} // Add explicit height
    // Ensure aspect ratio is maintained
    className="object-cover"
  />
  ```

- **Reserve Space for Dynamic Content**
  ```jsx
  // Add minimum height containers for dynamic content
  <div className="min-h-[300px] md:min-h-[400px]">
    {loading ? <LoadingState /> : <DynamicContent />}
  </div>
  ```

- **Fix Font Loading Strategy**
  ```jsx
  // Add to _document.js or layout.tsx
  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap"
    rel="preload"
    as="style"
    onLoad="this.onload=null;this.rel='stylesheet'"
  />
  ```

#### Medium Priority Actions:
- Use aspect ratio boxes for media content
- Add skeleton placeholders with correct dimensions for async content
- Implement content-visibility for below-the-fold content

### 3. FID Optimization

#### High Priority Actions:
- **Optimize JavaScript Execution**
  ```jsx
  // Break long tasks into smaller chunks
  // Example for processing data
  function processLargeDataSet(items) {
    // Instead of processing all at once
    return new Promise(resolve => {
      // Process in chunks of 50 items
      const chunks = [];
      for (let i = 0; i < items.length; i += 50) {
        chunks.push(items.slice(i, i + 50));
      }
      
      let result = [];
      let index = 0;
      
      function processNextChunk() {
        if (index >= chunks.length) {
          resolve(result);
          return;
        }
        
        // Use requestIdleCallback or setTimeout to yield to browser
        setTimeout(() => {
          result = result.concat(processChunk(chunks[index++]));
          processNextChunk();
        }, 0);
      }
      
      processNextChunk();
    });
  }
  ```

- **Implement Web Workers for Heavy Computations**
  ```jsx
  // Create a web worker for particle calculations
  // particle-worker.js
  self.addEventListener('message', (e) => {
    const { particleData } = e.data;
    const result = performHeavyCalculations(particleData);
    self.postMessage({ result });
  });
  
  // In component
  const particleWorker = new Worker('/particle-worker.js');
  particleWorker.postMessage({ particleData });
  particleWorker.addEventListener('message', (e) => {
    const { result } = e.data;
    updateParticles(result);
  });
  ```

- **Implement Proper Code Splitting**
  ```jsx
  // Split components by route
  const DynamicComponent = dynamic(() => import('@/components/heavy-component'), {
    ssr: false,
    loading: () => <div className="loading-placeholder" />,
  });
  ```

#### Medium Priority Actions:
- Use the `requestIdleCallback` API for non-critical operations
- Implement proper event delegation instead of individual handlers
- Move non-UI critical operations to web workers

## Implementation Timeline

1. **Week 1: Measurement and Analysis**
   - Set up Lighthouse CI for automated testing
   - Establish performance budgets for each metric
   - Create performance monitoring dashboard

2. **Week 2: LCP Optimization**
   - Implement high priority LCP actions
   - Measure impact and refine approach
   - Document improvements

3. **Week 3: CLS Optimization**
   - Implement high priority CLS actions
   - Test across different viewport sizes
   - Fix any regressions

4. **Week 4: FID Optimization**
   - Implement high priority FID actions
   - Test with throttled CPU
   - Validate improvements across devices

## Measurement and Validation

After implementing each set of optimizations, we will:

1. Run Lighthouse tests in production environment
2. Collect field data using the Web Vitals API
3. Compare before/after metrics
4. Refine approach based on results

## Expected Results

By implementing this optimization plan, we expect to achieve:

- LCP: < 2.0 seconds (25% improvement)
- CLS: < 0.05 (50% improvement)
- FID: < 50ms (50% improvement)

These improvements will significantly enhance user experience and improve search engine rankings. 