# Responsive Design Guidelines

## Core Principles

1. **Mobile-First Approach**
   - Always start with mobile styles as the default
   - Add complexity progressively at larger breakpoints
   - Default styles should work well on small screens without media queries

2. **Standardized Breakpoints**
   - Use these Tailwind breakpoints consistently across all components:
     ```
     sm: 640px  (large phones/small tablets)
     md: 768px  (tablets/portrait)
     lg: 1024px (tablets/landscape, small laptops)
     xl: 1280px (laptops, desktops)
     2xl: 1536px (large screens)
     ```

3. **Touch-Optimized Targets**
   - Minimum 44px × 44px touch target for all interactive elements
   - Apply appropriate spacing between touch targets (minimum 8px)
   - No stacked touch targets without sufficient spacing

4. **Performance Considerations**
   - Lazy load images and heavy components
   - Optimize animations for lower-powered devices
   - Use responsive image techniques with srcset/sizes
   - Conditionally load certain features based on screen size

## Layout Patterns

### Containers
```jsx
// Responsive container with consistent padding
<div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Grid Layouts
```jsx
// Standard grid layout pattern - 1 column on mobile, 2 on tablet, 3+ on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
  {/* Grid items */}
</div>
```

### Stacking/Reordering
```jsx
// Responsive flex layout that changes direction and order
<div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
  <div className="lg:w-1/3 order-2 lg:order-1">
    {/* Sidebar that appears below content on mobile, beside on desktop */}
  </div>
  <div className="lg:w-2/3 order-1 lg:order-2">
    {/* Main content that appears first on mobile */}
  </div>
</div>
```

### Spacing Scale
Maintain consistent spacing using this scale:
```
0: 0
px: 1px
0.5: 0.125rem (2px)
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
5: 1.25rem (20px)
6: 1.5rem (24px)
8: 2rem (32px)
10: 2.5rem (40px)
12: 3rem (48px)
16: 4rem (64px)
20: 5rem (80px)
24: 6rem (96px)
```

## Typography

### Responsive Type Scale
```jsx
// Responsive heading that scales based on screen size
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Page Title
</h1>

// Body text
<p className="text-base md:text-lg">
  Regular content that's slightly larger on bigger screens
</p>
```

### Line Length Control
```jsx
// Control line length for better readability
<p className="max-w-prose mx-auto">
  Long-form content with optimal line length for readability
</p>
```

## Components

### Cards
```jsx
// Responsive card with consistent padding at all sizes
<div className="rounded-lg shadow-md p-4 md:p-6">
  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Card Title</h3>
  <p className="text-sm md:text-base">Card content</p>
</div>
```

### Buttons
```jsx
// Standard button sizes with appropriate touch targets
<button className="h-11 min-w-[44px] px-4 inline-flex items-center justify-center rounded-md">
  Button Text
</button>

// Small button that still meets touch target size
<button className="h-11 px-3 text-sm inline-flex items-center justify-center rounded-md">
  Small
</button>
```

### Forms
```jsx
// Responsive form layout
<form className="space-y-4 md:space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    <div className="space-y-2">
      <label className="text-sm font-medium">First Name</label>
      <input className="w-full h-11 px-3 rounded-md" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium">Last Name</label>
      <input className="w-full h-11 px-3 rounded-md" />
    </div>
  </div>
  
  <div className="space-y-2">
    <label className="text-sm font-medium">Email</label>
    <input className="w-full h-11 px-3 rounded-md" />
  </div>
  
  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
    <button className="h-11 px-4 rounded-md order-2 sm:order-1">Cancel</button>
    <button className="h-11 px-4 rounded-md order-1 sm:order-2">Submit</button>
  </div>
</form>
```

### Navigation
```jsx
// Mobile menu toggle with proper touch target
<button 
  className="h-11 w-11 flex items-center justify-center rounded-md"
  aria-label="Toggle menu"
>
  <MenuIcon className="w-5 h-5" />
</button>
```

## Testing & Validation

### Breakpoint Testing
- Test all breakpoints, not just mobile and desktop extremes
- Pay special attention to transition points between breakpoints
- Test common device sizes: 375px, 428px, 768px, 1024px, 1366px, 1920px

### Touch Target Validation
- Use browser DevTools to measure touch targets (should be 44px minimum)
- Test complex interactions on actual touch devices
- Ensure sufficient spacing between interactive elements

### Performance Metrics
- Measure CLS (Cumulative Layout Shift) using Lighthouse
- Target zero layout shift during responsive transitions
- Monitor render performance across device types

## Common Patterns

### Sidebar Layouts
```jsx
// Responsive sidebar layout
<div className="flex flex-col lg:flex-row gap-8">
  {/* Sidebar: Full width on mobile, fixed width on desktop */}
  <aside className="w-full lg:w-64 xl:w-80 mb-6 lg:mb-0">
    {/* Sidebar content */}
  </aside>
  
  {/* Main content: Takes remaining space */}
  <main className="flex-1 min-w-0">
    {/* Main content */}
  </main>
</div>
```

### Filter Patterns
```jsx
// Responsive filters that stack on mobile and show inline on desktop
<div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
  <div className="w-full sm:w-auto">
    <select className="w-full h-11 rounded-md">
      <option>Filter 1</option>
    </select>
  </div>
  <div className="w-full sm:w-auto">
    <select className="w-full h-11 rounded-md">
      <option>Filter 2</option>
    </select>
  </div>
  <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto">
    <button className="w-full sm:w-auto h-11 px-4 rounded-md">
      Apply Filters
    </button>
  </div>
</div>
```

### Fixed-Width Cards
```jsx
// Cards with consistent width regardless of screen size
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
  <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-md">
    {/* Card content */}
  </div>
  {/* More cards */}
</div>
```

## Accessibility Considerations

- Ensure text meets contrast requirements at all sizes
- Test keyboard navigation at all breakpoints
- Verify that focus states are visible at all screen sizes
- Use appropriate ARIA attributes for responsive behaviors
- Ensure proper heading hierarchy regardless of layout changes

## Implementation Checklist

- [ ] Set default styles for mobile
- [ ] Add breakpoint-specific styles using mobile-first approach
- [ ] Ensure all interactive elements meet 44px touch target minimum
- [ ] Test layouts at all standard breakpoints
- [ ] Verify no content overflow or horizontal scrolling
- [ ] Check for layout shifts during window resizing
- [ ] Validate performance on lower-powered devices
- [ ] Test with keyboard navigation at all sizes 