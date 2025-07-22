// 🛡️ DEFENSIVE ARCHITECTURE - TEMPLATE A: Simple State Migration
// Use this template for components with setState calls in render

// ❌ BEFORE: setState in render (causes infinite loops)
function ComponentBefore() {
  const [state, setState] = useState(initialValue);
  setState(newValue); // This causes infinite re-renders!

  return <div>{state}</div>;
}

// ✅ AFTER: setState in useEffect
function ComponentAfter() {
  const [state, setState] = useState(initialValue);

  // Move setState to useEffect with proper dependencies
  useEffect(() => {
    setState(newValue);
  }, []); // Add dependencies that should trigger the update

  return <div>{state}</div>;
}

// 🎯 COMMON PATTERNS TO FIX:

// Pattern 1: Initialization from props
function ComponentProps({ initialData }) {
  const [data, setData] = useState(null);

  // ❌ WRONG: setState in render
  // if (initialData && !data) {
  //   setData(initialData);
  // }

  // ✅ CORRECT: useState with function or useEffect
  useEffect(() => {
    if (initialData && !data) {
      setData(initialData);
    }
  }, [initialData, data]);

  return <div>{data}</div>;
}

// Pattern 2: Conditional state updates
function ComponentConditional({ condition }) {
  const [isActive, setIsActive] = useState(false);

  // ❌ WRONG: setState in render
  // if (condition) {
  //   setIsActive(true);
  // }

  // ✅ CORRECT: useEffect with dependencies
  useEffect(() => {
    setIsActive(condition);
  }, [condition]);

  return <div className={isActive ? "active" : ""}></div>;
}

// Pattern 3: Derived state (often no state needed!)
function ComponentDerived({ items }) {
  // ❌ WRONG: Unnecessary state for derived values
  // const [count, setCount] = useState(0);
  // setCount(items.length);

  // ✅ CORRECT: Direct derivation
  const count = items.length; // No state needed!

  return <div>Count: {count}</div>;
}

// 🔧 QUICK FIX CHECKLIST:
// 1. Find setState calls outside useEffect/event handlers
// 2. Move to useEffect with proper dependencies
// 3. Consider if state is actually needed (derived state)
// 4. Test with npm run agents:hooks
// 5. Verify no infinite loops in browser console
