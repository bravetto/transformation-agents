// 🛡️ DEFENSIVE ARCHITECTURE - TEMPLATE B: Event Handler Patterns
// Use this template for mouse events, scroll events, and frequent updates

// ❌ BEFORE: Unthrottled event handlers causing excessive updates
function ComponentBefore() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // This causes setState on every mouse move = performance killer!
  document.addEventListener("mousemove", (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });

  return (
    <div>
      Position: {position.x}, {position.y}
    </div>
  );
}

// ✅ AFTER: Throttled event handler with cleanup
function ComponentAfter() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Cancel previous frame to throttle updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update for next frame
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []); // Empty dependency array - setup once

  return (
    <div>
      Position: {position.x}, {position.y}
    </div>
  );
}

// 🎯 COMMON EVENT PATTERNS TO FIX:

// Pattern 1: Mouse tracking with throttling
function MouseTracker() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const throttleRef = useRef<number>();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (throttleRef.current) return; // Already scheduled

    throttleRef.current = requestAnimationFrame(() => {
      setMousePos({ x: e.clientX, y: e.clientY });
      throttleRef.current = undefined;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (throttleRef.current) {
        cancelAnimationFrame(throttleRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <div>
      Mouse: {mousePos.x}, {mousePos.y}
    </div>
  );
}

// Pattern 2: Scroll events with debouncing
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce scroll updates
      timeoutRef.current = setTimeout(() => {
        setScrollY(window.scrollY);
      }, 10); // 10ms debounce
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <div>Scroll: {scrollY}px</div>;
}

// Pattern 3: Hover states with proper cleanup
function HoverComponent() {
  const [isHovered, setIsHovered] = useState(false);

  // Safe event handlers - setState in callbacks is fine!
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={isHovered ? "hovered" : ""}
    >
      Hover me!
    </div>
  );
}

// Pattern 4: Window resize with throttling
function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100); // 100ms debounce for resize
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      Window: {windowSize.width} x {windowSize.height}
    </div>
  );
}

// 🔧 QUICK FIX CHECKLIST:
// 1. Identify frequent events (mousemove, scroll, resize)
// 2. Add throttling with requestAnimationFrame or setTimeout
// 3. Use useCallback for event handlers
// 4. Always clean up listeners in useEffect return
// 5. Test performance in browser dev tools
