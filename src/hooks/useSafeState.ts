import { useCallback, useRef, useState, useEffect } from "react";

export function useSafeState<T>(initialValue: T) {
  const mountedRef = useRef(true);

  const [state, setState] = useState(initialValue);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetState = useCallback((value: T | ((prev: T) => T)) => {
    if (mountedRef.current) {
      setState(value);
    }
  }, []);

  return [state, safeSetState] as const;
}
