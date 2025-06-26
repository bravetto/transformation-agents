# 🚀 THE BRIDGE - DESIGN QUICK REFERENCE

## 🎨 COLORS
```css
/* Primary */
sacred-midnight: #0A0E27
royal-purple: #5B21B6
holy-gold: #FCD34D

/* Gradients */
bg-gradient: linear-gradient(135deg, #5B21B6, #0A0E27)
```

## 📝 TEXT ON BACKGROUNDS
- **White Background**: `text-sacred-midnight`
- **Gradient Background**: `text-white` (automatically applied)
- **Gold Buttons**: `text-sacred-midnight` (for contrast)

## 🎯 COMMON PATTERNS

### Hero Section
```tsx
<section className="bg-gradient text-white py-20">
  <div className="container">
    <h2 className="text-holy-gold mb-6">Title</h2>
    <p>Content automatically white</p>
  </div>
</section>
```

### Feature Card
```tsx
<motion.div 
  whileHover={{ y: -4 }}
  className="card"
>
  {/* Content */}
</motion.div>
```

### CTA Button
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-holy-gold text-sacred-midnight px-6 py-3 rounded-lg font-bold"
>
  Action Text
</motion.button>
```

### Floating Widget
```tsx
<motion.div
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  className="fixed bottom-4 right-4 z-40 bg-white rounded-2xl shadow-2xl p-6"
>
  {/* Widget Content */}
</motion.div>
```

## 🎬 ANIMATIONS

### Fade In Up
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Continuous Pulse
```tsx
animate={{ scale: [1, 1.1, 1] }}
transition={{ duration: 2, repeat: Infinity }}
```

### Hover Effects
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

## 📏 SPACING
- Use multiples of 4px (4, 8, 12, 16, 20, 24, 32, 48, 64)
- Common padding: `p-4` (16px), `p-6` (24px), `p-8` (32px)
- Section padding: `py-16` (64px) mobile, `py-20` (80px) desktop

## 🔤 TYPOGRAPHY
```css
/* Headings */
h1: text-5xl md:text-6xl font-bold
h2: text-3xl md:text-4xl font-bold
h3: text-xl md:text-2xl font-bold

/* Body */
p: text-base (default)
small: text-sm
tiny: text-xs
```

## 🎭 SHADOWS
```css
shadow: 0 1px 3px rgba(0,0,0,0.1)
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
shadow-xl: 0 20px 25px rgba(0,0,0,0.1)
shadow-2xl: 0 25px 50px rgba(0,0,0,0.12)
```

## 📱 BREAKPOINTS
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

## ⚡ PERFORMANCE TIPS
1. Use `transform` and `opacity` for animations
2. Lazy load heavy components
3. Optimize images (WebP, proper sizing)
4. Debounce scroll handlers
5. Use CSS animations for simple effects

## 🚨 CRITICAL RULES
1. **ALL text on gradients MUST be white** (enforced by CSS)
2. **Gold buttons ALWAYS have dark text**
3. **Minimum touch target: 44x44px**
4. **Always include hover states**
5. **Test on mobile first**

## 🎯 QUICK WINS
- Add `group` class to parent for hover effects on children
- Use `backdrop-blur-sm` for glass effects
- Add `transition-all` for smooth state changes
- Use `will-change-transform` sparingly for performance
- Always wrap animations in `AnimatePresence` for exit animations

---

**Remember**: Every pixel should push toward transformation 🔥 