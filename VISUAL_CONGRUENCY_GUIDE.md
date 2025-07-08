# Visual Congruency Guide

This guide ensures consistent visual design across all pages of the application. Following these principles will eliminate layout overlap, inconsistent spacing, and misaligned elements.

## 1. Layout Grid System

### Container Widths
- Use the standardized container with responsive padding:
```jsx
<div className="container mx-auto"> {/* Content */} </div>
```

### Maximum Widths
For different content types, use consistent max-width constraints:
- Text content: `max-w-prose` (65ch)
- Card grids: `max-w-5xl` (64rem)
- Full-width content: `max-w-7xl` (80rem)

### Grid Spacing
Use the standardized grid gap classes:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Grid items */} </div>
```

## 2. Vertical Rhythm System

### Section Padding
Always use the standardized section spacing:
```jsx
<Section padding="large" maxWidth="xl">
  {/* Content */}
</Section>
```

### Spacing Between Elements
Use consistent spacing between components:
- Small spacing: `mb-4` (1rem)
- Medium spacing: `mb-8` (2rem)
- Large spacing: `mb-12` (3rem)
- Extra-large spacing: `mb-16` (4rem)

### Content Margins
Use our standardized spacing system for consistent text margins:
```jsx
<Heading className="mb-6">Heading</Heading>
<Text className="mb-8">Description text</Text>
```

## 3. Card Layouts

### Equal Height Cards
Always use flex layout for cards to ensure equal heights:
```jsx
<Card className="h-full flex flex-col">
  <div>
    <Heading>Card Title</Heading>
    <Text>Card description that may vary in length</Text>
  </div>
  <div className="mt-auto pt-4">
    <Button>Action</Button>
  </div>
</Card>
```

### Card Grid Configuration
Use these standard grid configurations:
- 1 column on mobile (default)
- 2 columns on tablet: `md:grid-cols-2`
- 3 columns on desktop: `lg:grid-cols-3`

## 4. Typography Hierarchy

### Heading Sizes
- H1: `size="h1"` - Main page title
- H2: `size="h2"` - Section headers
- H3: `size="h3"` - Major subsections
- H4: `size="h4"` - Card titles
- H5: `size="h5"` - Minor subsections

### Text Sizes
- Extra large: `size="xl"` - Featured content
- Large: `size="lg"` - Important content
- Medium: `size="md"` - Regular content
- Small: `size="sm"` - Supporting content

### Line Heights
Use proper line heights to prevent text overlap:
- Headings: `leading-tight`
- Body text: `leading-relaxed`

## 5. Component Alignment

### Button Alignment
Always align buttons consistently:
- Single buttons: `justify-center` or `justify-start`
- Multiple buttons: `flex gap-4 justify-center` or `justify-between`

### Image Handling
Use these image display practices:
- Always specify both width and height
- Use `object-cover` for maintaining aspect ratios
- Add overflow protection: `overflow-hidden`

### Icon Alignment
Center icons with text using flexbox:
```jsx
<div className="flex items-center gap-2">
  <Icon /> <span>Label</span>
</div>
```

## 6. Responsive Design Principles

### Mobile-First Design
Start with mobile layouts, then add complexity:
```jsx
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
  {/* Content */}
</div>
```

### Breakpoint System
- Mobile (default): Up to 639px
- Tablet: `md:` - 768px and up
- Desktop: `lg:` - 1024px and up
- Large Desktop: `xl:` - 1280px and up
- Extra Large: `2xl:` - 1400px and up

### Responsive Padding
Use responsive padding that increases at larger screens:
```jsx
<div className="p-4 md:p-6 lg:p-8">
  {/* Content */}
</div>
```

## 7. Animation and Transitions

### Consistent Animation Timing
Use standardized animation durations:
- Fast: `duration-300` (300ms)
- Medium: `duration-500` (500ms)
- Slow: `duration-700` (700ms)

### Safe Animation Properties
Animate properties that don't cause layout shifts:
- ✅ Opacity, transform, colors
- ❌ Avoid animating width, height, margin, padding

### Staggered Animations
Use consistent delay increments of 0.1s:
```jsx
<RevealOnScroll delay={0.1}>
  {/* First item */}
</RevealOnScroll>
<RevealOnScroll delay={0.2}>
  {/* Second item */}
</RevealOnScroll>
```

## 8. Visual Quality Checks

### Overlap Prevention
- Use `min-height` for cards with variable content
- Add proper margin between sections
- Use flex layouts with `mt-auto` for buttons

### Alignment Verification
- Check text alignment (left/center) is consistent within sections
- Ensure grid items align properly
- Verify that headings and content maintain proper spacing

### Component Spacing
- Add proper padding inside components
- Use consistent margin between components
- Maintain vertical rhythm between sections

## 9. Implementation Checklist

Before deploying any page, verify these items:
- [ ] All section paddings use the standardized classes
- [ ] Grid layouts use consistent gap spacing
- [ ] Cards have equal heights within the same row
- [ ] Typography follows the established hierarchy
- [ ] Components maintain proper alignment
- [ ] No content overflow or text cutoff
- [ ] Proper responsiveness across all breakpoints
- [ ] Animations don't cause layout shifts

By following this guide, we'll maintain perfect visual congruency throughout the application, eliminating overlap and inconsistent spacing issues. 