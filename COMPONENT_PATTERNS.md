# 🧩 THE BRIDGE PROJECT - COMPONENT PATTERNS

## 📋 TABLE OF CONTENTS
1. [Hero Components](#hero-components)
2. [Interactive Cards](#interactive-cards)
3. [Floating Widgets](#floating-widgets)
4. [Form Elements](#form-elements)
5. [Animation Patterns](#animation-patterns)
6. [Real-time Elements](#real-time-elements)
7. [Navigation Components](#navigation-components)
8. [Social Proof Elements](#social-proof-elements)

## 🦸 HERO COMPONENTS

### Full-Screen Hero
```tsx
<section className="hero min-h-screen flex items-center justify-center relative overflow-hidden">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient" />
  
  {/* Particle/Glow Effects */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-holy-gold/20 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-royal-purple/20 rounded-full blur-3xl" />
  </div>
  
  {/* Content */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 text-center text-white px-4"
  >
    <h1 className="text-holy-gold mb-6">Powerful Headline</h1>
    <p className="text-xl mb-8 max-w-2xl mx-auto">Supporting message</p>
    <button className="bg-holy-gold text-sacred-midnight px-8 py-4 rounded-lg font-bold">
      Call to Action
    </button>
  </motion.div>
</section>
```

### Section Hero with Image
```tsx
<section className="relative py-20 overflow-hidden">
  <div className="container">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-sacred-midnight mb-4">Section Title</h2>
        <p className="text-lg mb-6">Description text</p>
        <Link href="/action" className="btn btn-primary">
          Learn More →
        </Link>
      </motion.div>
      
      {/* Image/Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <img src="/image.jpg" alt="" className="rounded-2xl shadow-2xl" />
        {/* Floating accent */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-holy-gold rounded-full opacity-20 blur-2xl" />
      </motion.div>
    </div>
  </div>
</section>
```

## 🃏 INTERACTIVE CARDS

### Feature Card
```tsx
<motion.div
  whileHover={{ y: -4 }}
  className="card group cursor-pointer"
>
  {/* Icon Container */}
  <div className="w-16 h-16 bg-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
    <Icon className="h-8 w-8 text-white" />
  </div>
  
  {/* Content */}
  <h3 className="text-xl font-bold text-sacred-midnight mb-2">Feature Title</h3>
  <p className="text-gray-600 mb-4">Feature description goes here</p>
  
  {/* Hidden CTA */}
  <div className="flex items-center text-royal-purple opacity-0 group-hover:opacity-100 transition-opacity">
    <span className="font-semibold">Learn more</span>
    <ArrowRight className="h-4 w-4 ml-2" />
  </div>
</motion.div>
```

### Stat Card with Live Updates
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  className="bg-gradient-to-br from-royal-purple to-sacred-midnight rounded-2xl p-6 text-white"
>
  {/* Live Indicator */}
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm opacity-75">Live Count</span>
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-2 h-2 bg-holy-gold rounded-full"
    />
  </div>
  
  {/* Main Stat */}
  <motion.div
    key={statValue}
    initial={{ scale: 1.2, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="text-5xl font-bold text-holy-gold mb-2"
  >
    {statValue}
  </motion.div>
  
  {/* Label */}
  <p className="text-lg">Active Supporters</p>
  
  {/* Progress Bar */}
  <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
    <motion.div
      className="h-full bg-holy-gold"
      initial={{ width: "0%" }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1 }}
    />
  </div>
</motion.div>
```

## 🎈 FLOATING WIDGETS

### Minimizable Widget
```tsx
const [isMinimized, setIsMinimized] = useState(false);

return (
  <>
    {/* Minimized State */}
    <AnimatePresence>
      {isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-4 right-4 z-40 bg-gradient rounded-full p-4 shadow-lg"
        >
          <Icon className="h-6 w-6 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
    
    {/* Expanded State */}
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 right-4 z-40 bg-white rounded-2xl shadow-2xl p-6 w-80"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
          
          {/* Widget Content */}
          <div>{/* Your content */}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
```

### Notification Toast
```tsx
<AnimatePresence>
  {showNotification && (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-sm"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sacred-midnight">Success!</p>
          <p className="text-sm text-gray-600">Your action was completed</p>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

## 📝 FORM ELEMENTS

### Floating Label Input
```tsx
<div className="relative">
  <input
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-royal-purple focus:outline-none"
    placeholder=" "
  />
  <label className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-xs peer-focus:text-royal-purple bg-white px-1">
    Your Name
  </label>
</div>
```

### Animated Submit Button
```tsx
<motion.button
  type="submit"
  disabled={isSubmitting}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full bg-gradient py-3 rounded-lg font-bold text-white relative overflow-hidden"
>
  {/* Loading State */}
  <AnimatePresence>
    {isSubmitting && (
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute inset-0 bg-white/20"
      />
    )}
  </AnimatePresence>
  
  {/* Button Text */}
  <span className="relative z-10">
    {isSubmitting ? "Sending..." : "Send Message"}
  </span>
</motion.button>
```

## 🎬 ANIMATION PATTERNS

### Stagger Children
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item, index) => (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Scroll Progress Indicator
```tsx
const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
  <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
    <motion.div
      className="h-full bg-gradient-to-r from-holy-gold to-royal-purple"
      style={{ width: `${scrollProgress}%` }}
    />
  </div>
);
```

## ⚡ REAL-TIME ELEMENTS

### Live Counter
```tsx
<div className="relative">
  {/* Background Pulse */}
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5]
    }}
    transition={{
      duration: 2,
      repeat: Infinity
    }}
    className="absolute inset-0 bg-holy-gold/20 rounded-full blur-xl"
  />
  
  {/* Counter */}
  <motion.div
    key={count}
    initial={{ scale: 1.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="relative text-6xl font-bold text-holy-gold"
  >
    {count}
  </motion.div>
  
  {/* Increment Animation */}
  <AnimatePresence>
    {showIncrement && (
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: -50, opacity: 0 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 right-0 text-2xl text-green-500"
      >
        +1
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

### Activity Feed
```tsx
<div className="space-y-2 max-h-64 overflow-y-auto">
  <AnimatePresence>
    {activities.map((activity) => (
      <motion.div
        key={activity.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
      >
        <div className="w-2 h-2 bg-holy-gold rounded-full" />
        <p className="text-sm text-white">
          <span className="font-semibold">{activity.user}</span> {activity.action}
        </p>
        <span className="text-xs opacity-60 ml-auto">{activity.time}</span>
      </motion.div>
    ))}
  </AnimatePresence>
</div>
```

## 🧭 NAVIGATION COMPONENTS

### Sticky Navigation Bar
```tsx
<motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled 
      ? 'bg-sacred-midnight/95 backdrop-blur-lg shadow-lg' 
      : 'bg-transparent'
  }`}
>
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8" />
        <span className="font-bold text-white">THE BRIDGE</span>
      </Link>
      
      {/* Nav Items */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-white/80 hover:text-holy-gold transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
      
      {/* CTA Button */}
      <button className="bg-holy-gold text-sacred-midnight px-6 py-2 rounded-lg font-bold">
        Support Now
      </button>
    </div>
  </div>
</motion.nav>
```

## 👥 SOCIAL PROOF ELEMENTS

### Testimonial Carousel
```tsx
<div className="relative">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-2xl p-8 shadow-xl"
    >
      <blockquote className="text-lg text-sacred-midnight mb-4">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center gap-4">
        <img 
          src={testimonial.avatar} 
          alt="" 
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
  
  {/* Navigation Dots */}
  <div className="flex justify-center gap-2 mt-4">
    {testimonials.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={`h-2 rounded-full transition-all ${
          index === currentIndex 
            ? 'w-8 bg-royal-purple' 
            : 'w-2 bg-gray-300'
        }`}
      />
    ))}
  </div>
</div>
```

## 🎯 BEST PRACTICES

### 1. Performance
- Use `will-change: transform` sparingly
- Prefer CSS animations for simple effects
- Lazy load heavy components
- Debounce scroll/resize handlers

### 2. Accessibility
- Always include focus states
- Provide keyboard navigation
- Use semantic HTML elements
- Include ARIA labels where needed

### 3. Responsive Design
- Mobile-first approach
- Touch-friendly tap targets (min 44px)
- Appropriate text sizes on small screens
- Simplified animations on mobile

### 4. Consistency
- Follow the color palette strictly
- Use consistent spacing (multiples of 4px)
- Maintain animation timing (0.2s, 0.3s, 0.6s)
- Keep border radius consistent (rounded-lg, rounded-2xl)

---

*Build with purpose. Every component should drive transformation.* 