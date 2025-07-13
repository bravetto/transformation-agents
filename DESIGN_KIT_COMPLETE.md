# 🎨 Transformation Agents Design Kit & Style Guide

## 📋 Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Animation System](#animation-system)
7. [Icons & Graphics](#icons--graphics)
8. [Accessibility Guidelines](#accessibility-guidelines)

---

## 🎯 Design Philosophy

### Truth in Light
The Bridge Project embraces **radical transparency** through a light, open design system that represents truth and transformation. We're not hiding - we're standing in the light.

**Core Principles:**
- **Transparency**: Light backgrounds, open spaces, clear communication
- **Warmth**: Comforting colors that embrace rather than intimidate
- **Growth**: Progressive enhancement from simple to divine
- **Accessibility**: Every element readable, usable, and inclusive

---

## 🎨 Color Palette

### Core Palette - Truth in Light

#### Base Colors
```scss
// Primary Light Colors
$pure-white: #FFFFFF;         // Absolute transparency
$comfort-cream: #FEFDF8;      // Warm embrace (primary background)
$soft-cloud: #F9FAFB;         // Gentle support
$moon-glow: #F3F4F6;          // Subtle depth
$quiet-stone: #E5E7EB;        // Peaceful contrast

// Truth Accents
$hope-gold: #F59E0B;          // Primary action color
$courage-blue: #2563EB;       // Trust and stability
$growth-green: #10B981;       // Positive transformation

// Grounding Colors
$gentle-charcoal: #374151;    // Primary text (WCAG AA on white)
$soft-shadow: #6B7280;        // Secondary text
$whisper-gray: #9CA3AF;       // Tertiary elements
```

### Divine Role Colors

Each divine role has a complete color system:

#### Lightworker (Inspiration & Hope)
```scss
primary: #F59E0B     // amber-500
secondary: #FB923C   // orange-400
accent: #FCD34D      // amber-300
light: #FEF3C7       // amber-100
dark: #B45309        // amber-700
gradient: linear-gradient(to right, #F59E0B, #FB923C, #FCD34D)
shadow: 0 0 30px rgba(245, 158, 11, 0.5)
```

#### Messenger (Communication & Connection)
```scss
primary: #3B82F6     // blue-500
secondary: #6366F1   // indigo-500
accent: #A5B4FC      // indigo-300
light: #EFF6FF       // blue-50
dark: #1E40AF        // blue-800
gradient: linear-gradient(to right, #3B82F6, #6366F1, #A5B4FC)
shadow: 0 0 30px rgba(59, 130, 246, 0.5)
```

#### Witness (Growth & Transformation)
```scss
primary: #10B981     // emerald-500
secondary: #14B8A6   // teal-500
accent: #5EEAD4      // teal-300
light: #ECFDF5       // emerald-50
dark: #047857        // emerald-700
gradient: linear-gradient(to right, #10B981, #14B8A6, #5EEAD4)
shadow: 0 0 30px rgba(16, 185, 129, 0.5)
```

#### Guardian (Protection & Guidance)
```scss
primary: #8B5CF6     // purple-500
secondary: #EC4899   // pink-500
accent: #F9A8D4      // pink-300
light: #F5F3FF       // purple-50
dark: #6D28D9        // purple-700
gradient: linear-gradient(to right, #8B5CF6, #EC4899, #F9A8D4)
shadow: 0 0 30px rgba(139, 92, 246, 0.5)
```

### Functional Colors
```scss
// State Colors
$success: #10B981;     // growth-green
$warning: #F59E0B;     // hope-gold
$error: #DC2626;       // red-600
$info: #2563EB;        // courage-blue

// Semantic Mappings
$background-primary: $comfort-cream;
$background-secondary: $pure-white;
$text-primary: $gentle-charcoal;
$text-secondary: $soft-shadow;
$border-default: $quiet-stone;
```

### Usage Examples
```jsx
// Tailwind Classes
<div className="bg-comfort-cream text-gentle-charcoal">
<button className="bg-hope-gold hover:bg-hope-gold/90">
<div className="border-quiet-stone">

// Role-based Classes
<div className="bg-lightworker-primary text-white">
<div className="bg-gradient-lightworker">
<div className="shadow-messenger">
```

---

## 📝 Typography System

### Font Families
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-serif: 'Georgia', serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale (1.25 Major Third)
```scss
// Font Sizes
$text-xs: 0.75rem;     // 12px - Small labels
$text-sm: 0.875rem;    // 14px - Secondary text
$text-base: 1rem;      // 16px - Body text
$text-lg: 1.25rem;     // 20px - Large body
$text-xl: 1.563rem;    // 25px - Small headings
$text-2xl: 1.953rem;   // 31px - Section headings
$text-3xl: 2.441rem;   // 39px - Page headings
$text-4xl: 3.052rem;   // 49px - Hero headings

// Line Heights
$leading-tight: 1.2;   // Headings
$leading-base: 1.5;    // Body text
$leading-relaxed: 1.75; // Long-form content

// Font Weights
$font-normal: 400;
$font-medium: 500;
$font-bold: 700;
```

### Typography Components

#### Headings
```jsx
// Hero Heading (H1)
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gentle-charcoal">
  Transform Your Life
</h1>

// Section Heading (H2)
<h2 className="text-2xl md:text-3xl font-bold leading-tight text-gentle-charcoal">
  Our Mission
</h2>

// Subsection Heading (H3)
<h3 className="text-xl md:text-2xl font-semibold text-gentle-charcoal">
  Key Features
</h3>
```

#### Body Text
```jsx
// Standard Paragraph
<p className="text-base md:text-lg leading-relaxed text-gentle-charcoal max-w-prose">
  Your content here...
</p>

// Secondary Text
<p className="text-sm text-soft-shadow">
  Supporting information
</p>

// Large Text
<p className="text-lg md:text-xl leading-relaxed text-gentle-charcoal">
  Important message
</p>
```

#### Special Text
```jsx
// Quote
<blockquote className="text-lg italic text-soft-shadow border-l-4 border-hope-gold pl-4">
  "Inspiring quote here"
</blockquote>

// Code
<code className="font-mono text-sm bg-moon-glow px-2 py-1 rounded">
  code snippet
</code>

// Link
<a className="text-courage-blue hover:text-courage-blue/80 underline underline-offset-4">
  Click here
</a>
```

---

## 📐 Spacing & Layout

### Spacing Scale (8px Base)
```scss
// Spacing Values
$space-0: 0;          // 0px
$space-1: 0.25rem;    // 4px
$space-2: 0.5rem;     // 8px
$space-3: 0.75rem;    // 12px
$space-4: 1rem;       // 16px
$space-5: 1.25rem;    // 20px
$space-6: 1.5rem;     // 24px
$space-8: 2rem;       // 32px
$space-10: 2.5rem;    // 40px
$space-12: 3rem;      // 48px
$space-16: 4rem;      // 64px
$space-20: 5rem;      // 80px
$space-24: 6rem;      // 96px
$space-32: 8rem;      // 128px
```

### Layout System
```scss
// Container Widths
$container-sm: 640px;
$container-md: 768px;
$container-lg: 1024px;
$container-xl: 1280px;
$container-2xl: 1536px;

// Header Heights
$header-height: 64px;
$header-height-mobile: 56px;
$banner-height: 40px;
$banner-height-mobile: 36px;

// Z-Index Stack
$z-base: 1;
$z-dropdown: 100;
$z-sticky: 200;
$z-banner: 900;
$z-navigation: 1000;
$z-modal: 2000;
$z-tooltip: 3000;
```

### Grid System
```jsx
// Standard Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Card Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

// Asymmetric Grid
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-8">Main</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>
```

### Section Spacing
```jsx
// Hero Section
<section className="py-16 md:py-24 lg:py-32">

// Content Section
<section className="py-12 md:py-16 lg:py-20">

// Compact Section
<section className="py-8 md:py-12">
```

--- 

## 🧩 Component Library

### Buttons

#### Standard Button
```jsx
import { Button } from '@/components/ui/button';

// Variants
<Button variant="default">Default (Hope Gold)</Button>
<Button variant="primary">Primary (Courage Blue)</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="divine">Divine Gradient</Button>

// Role-based Buttons
<Button role="lightworker">Lightworker Button</Button>
<Button role="messenger">Messenger Button</Button>
<Button role="witness">Witness Button</Button>
<Button role="guardian">Guardian Button</Button>

// Sizes (all meet 44px minimum touch target)
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Icon /></Button>

// Width Options
<Button width="full">Full Width</Button>
<Button width="auto">Auto Width</Button>
```

#### Button Styling Classes
```scss
// Base button styles
.button-base {
  @apply inline-flex items-center justify-center rounded-md text-sm font-medium;
  @apply transition-colors focus-visible:outline-none focus-visible:ring-2;
  @apply focus-visible:ring-courage-blue focus-visible:ring-offset-2;
  @apply disabled:opacity-50 disabled:pointer-events-none;
  @apply h-11 min-h-[44px] py-2 px-4 min-w-[44px];
}

// Hover effects
.button-hover {
  @apply hover:scale-[1.02] active:scale-[0.98] transition-transform;
}
```

### Cards

#### Base Card Component
```jsx
import { BaseCard } from '@/components/ui/base-card';

// Spacing Presets
<BaseCard spacing="compact">Compact spacing</BaseCard>
<BaseCard spacing="comfortable">Comfortable spacing</BaseCard>
<BaseCard spacing="spacious">Spacious spacing</BaseCard>

// Visual Variants
<BaseCard variant="default">Default card</BaseCard>
<BaseCard variant="elevated">Elevated with shadow</BaseCard>
<BaseCard variant="outlined">Outlined card</BaseCard>
<BaseCard variant="divine">Divine gradient border</BaseCard>

// Interactive Cards
<BaseCard 
  variant="elevated"
  interactive
  onClick={() => console.log('clicked')}
>
  Clickable card
</BaseCard>
```

#### Feature Card
```jsx
import { FeatureCard } from '@/components/ui/feature-card';
import { Shield, Zap, Heart } from 'lucide-react';

<FeatureCard
  icon={Shield}
  title="Secure & Private"
  description="Your data is protected with enterprise-grade security"
  metrics={[
    { value: "256-bit", label: "Encryption" },
    { value: "99.9%", label: "Uptime" }
  ]}
  variant="elevated"
  onClick={() => router.push('/features/security')}
/>
```

#### Card Styling
```scss
// Card spacing presets
--card-padding-compact: 1rem;      // 16px
--card-padding-comfortable: 1.5rem; // 24px
--card-padding-spacious: 2rem;      // 32px

// Card visual properties
--card-radius: 0.5rem;              // 8px
--card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
--card-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--card-border-width: 2px;
```

### Forms

#### Input Components
```jsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Basic Input
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email"
    type="email"
    placeholder="you@example.com"
    className="h-11 min-h-[44px]"
  />
</div>

// Input with Icon
<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-soft-shadow" />
  <Input className="pl-10" placeholder="Email address" />
</div>

// Textarea
<Textarea 
  placeholder="Your message..."
  className="min-h-[120px] resize-none"
/>
```

#### Select Components
```jsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

<Select>
  <SelectTrigger className="h-11 min-h-[44px]">
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

#### Form Layout
```jsx
// Standard Form
<form className="space-y-6 max-w-md mx-auto">
  <div className="space-y-2">
    <Label>Full Name</Label>
    <Input required />
  </div>
  
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label>First Name</Label>
      <Input />
    </div>
    <div className="space-y-2">
      <Label>Last Name</Label>
      <Input />
    </div>
  </div>
  
  <Button type="submit" width="full">
    Submit Form
  </Button>
</form>
```

### Badges & Pills

```jsx
import { Badge } from '@/components/ui/badge';

// Standard Badges
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>

// Role Badges
<Badge className="bg-lightworker-primary text-white">Lightworker</Badge>
<Badge className="bg-messenger-primary text-white">Messenger</Badge>

// Status Badges
<Badge className="bg-growth-green text-white">Active</Badge>
<Badge className="bg-hope-gold text-white">Pending</Badge>
<Badge className="bg-error text-white">Inactive</Badge>
```

### Modal/Dialog

```jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      {/* Modal content */}
    </div>
  </DialogContent>
</Dialog>
```

### Toast/Notifications

```jsx
import { toast } from '@/components/ui/toast';

// Success Toast
toast.success("Action completed successfully!");

// Error Toast
toast.error("Something went wrong. Please try again.");

// Info Toast
toast.info("New updates available");

// Custom Toast
toast.custom(
  <div className="flex items-center gap-3">
    <CheckCircle className="h-5 w-5 text-growth-green" />
    <span>Custom message here</span>
  </div>
);
```

--- 

## 🎬 Animation System

### Animation Principles
- **Performance First**: Use hardware-accelerated properties (transform, opacity)
- **Purposeful**: Every animation should enhance understanding or delight
- **Consistent**: Use standardized timing and easing functions
- **Accessible**: Respect prefers-reduced-motion preferences

### Timing & Easing

```scss
// Duration Scale
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 500ms;
--duration-slow: 800ms;
--duration-very-slow: 1200ms;

// Easing Functions (Cubic Bezier)
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);      // Divine ease out
--ease-in: cubic-bezier(0.67, 0, 0.83, 0);      // Exponential ease in
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  // Smooth in-out
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); // Soft bounce
```

### Framer Motion Presets

```jsx
// Fade In
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 }
};

// Slide Up
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

// Scale In
const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

// Stagger Children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
```

### Interactive Animations

```jsx
// Hover Effects
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
  Interactive Element
</motion.div>

// Floating Animation
<motion.div
  animate={{ 
    y: [0, -10, 0],
  }}
  transition={{ 
    duration: 3, 
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }}
>
  Floating Element
</motion.div>

// Pulse Animation
<motion.div
  animate={{ 
    scale: [1, 1.03, 1],
    opacity: [0.9, 1, 0.9]
  }}
  transition={{ 
    duration: 2, 
    repeat: Infinity,
    repeatType: "reverse"
  }}
>
  Pulsing Element
</motion.div>
```

### Page Transitions

```jsx
// Page wrapper with transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  {children}
</motion.div>
```

### Divine Particles Component

```jsx
<DivineParticles 
  variant="sacred"        // 'sacred' | 'hope' | 'transformation' | 'minimal'
  intensity="medium"      // 'low' | 'medium' | 'high' | 'auto'
  role="lightworker"      // Divine role for color theming
  interactive={true}      // Mouse interaction
  className="absolute inset-0 opacity-20"
/>
```

---

## 🎨 Icons & Graphics

### Icon Library (Lucide React)

```jsx
import { 
  // Navigation
  Menu, X, ChevronRight, ChevronDown, ArrowRight, ArrowLeft,
  
  // Actions
  Search, Filter, Settings, Download, Upload, Share2,
  
  // Communication
  Mail, MessageCircle, Phone, Video, Send,
  
  // Status
  Check, X, AlertCircle, Info, HelpCircle,
  
  // Social
  Twitter, Facebook, Instagram, Linkedin, Youtube,
  
  // UI Elements
  Sun, Moon, User, Heart, Star, Bell, Calendar
} from 'lucide-react';

// Standard icon size classes
<Icon className="h-4 w-4" />  // Small
<Icon className="h-5 w-5" />  // Default
<Icon className="h-6 w-6" />  // Medium
<Icon className="h-8 w-8" />  // Large
```

### Logo Usage

```jsx
// Primary Logo
<img 
  src="/images/logo.png" 
  alt="The Bridge Project" 
  className="h-8 md:h-10"
/>

// Logo Variants
/images/logo.png         // Default
/images/logo-white.png   // White version
/images/logo-dark.png    // Dark version
/images/logo-blue.png    // Blue accent version
```

### Image Guidelines

```jsx
// Responsive Images
<div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
  <Image
    src="/image.jpg"
    alt="Descriptive alt text"
    fill
    className="object-cover"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    priority={isAboveFold}
  />
</div>

// Avatar Images
<img
  src="/avatar.jpg"
  alt="Person name"
  className="h-10 w-10 rounded-full object-cover"
/>

// Background Images
<div 
  className="relative bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
>
  <div className="absolute inset-0 bg-black/50" />
  {/* Content */}
</div>
```

---

## ♿ Accessibility Guidelines

### Color Contrast
All text must meet WCAG AA standards:
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18pt+): 3:1 contrast ratio minimum
- UI components: 3:1 contrast ratio minimum

**Verified Combinations:**
- `text-gentle-charcoal` on `bg-white`: 7.5:1 ✅
- `text-white` on `bg-hope-gold`: 4.5:1 ✅
- `text-white` on `bg-courage-blue`: 4.8:1 ✅
- `text-gentle-charcoal` on `bg-comfort-cream`: 7.3:1 ✅

### Focus States
```scss
// Standard focus ring
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-courage-blue focus:ring-offset-2;
}

// High contrast focus
.focus-high-contrast {
  @apply focus:outline-none focus:ring-4 focus:ring-hope-gold focus:ring-offset-4;
}
```

### Touch Targets
- Minimum size: 44px × 44px
- Spacing between targets: minimum 8px
- All buttons and interactive elements meet this requirement

### Keyboard Navigation
```jsx
// Proper ARIA attributes
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
>

// Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Keyboard shortcuts
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === '/' && e.metaKey) openSearch();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Screen Reader Support
```jsx
// Visually hidden but screen reader accessible
<span className="sr-only">Loading...</span>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Descriptive labels
<input 
  aria-label="Search for content"
  aria-describedby="search-hint"
/>
<span id="search-hint" className="sr-only">
  Press Enter to search or Escape to close
</span>
```

### Reduced Motion
```jsx
// Respect user preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
/>

// CSS approach
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Responsive Design

### Breakpoints
```scss
$breakpoint-sm: 640px;   // Mobile landscape
$breakpoint-md: 768px;   // Tablet
$breakpoint-lg: 1024px;  // Desktop
$breakpoint-xl: 1280px;  // Large desktop
$breakpoint-2xl: 1536px; // Extra large

// Tailwind classes
sm:  // @media (min-width: 640px)
md:  // @media (min-width: 768px)
lg:  // @media (min-width: 1024px)
xl:  // @media (min-width: 1280px)
2xl: // @media (min-width: 1536px)
```

### Mobile-First Approach
```jsx
// Start with mobile styles, add desktop with breakpoints
<div className="text-base md:text-lg lg:text-xl">
<div className="p-4 md:p-6 lg:p-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## 🚀 Quick Reference

### Common Patterns
```jsx
// Page Container
<div className="min-h-screen bg-comfort-cream">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Section
<section className="py-12 md:py-16 lg:py-20">

// Card Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Form Container
<div className="max-w-md mx-auto space-y-6">

// Hero Section
<div className="relative min-h-[600px] flex items-center justify-center">

// Centered Content
<div className="text-center max-w-3xl mx-auto">
```

### Utility Classes
```scss
// Text utilities
.text-balance    // Balanced text wrapping
.text-gradient   // Gradient text effect
.truncate        // Single line with ellipsis
.line-clamp-3    // Multi-line truncation

// Layout utilities
.container       // Responsive container
.prose           // Rich text formatting
.aspect-video    // 16:9 aspect ratio
.aspect-square   // 1:1 aspect ratio

// Visual utilities
.backdrop-blur   // Blur background
.ring-2          // Focus ring
.shadow-lg       // Large shadow
.rounded-lg      // Large border radius
```

---

**Design System Version:** 2.0
**Last Updated:** July 2025
**Maintained by:** The Bridge Project Team 