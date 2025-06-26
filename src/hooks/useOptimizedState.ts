
import { useState, useCallback, useMemo } from 'react';

export function useOptimizedState<T>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);

  const updateState = useCallback((newValue: T | ((prev: T) => T)) => {
    setState(newValue);
  }, []);

  const memoizedState = useMemo(() => state, [state]);

  return [memoizedState, updateState] as const;
}

export function useToggle(initialValue = false) {
  const [state, setState] = useOptimizedState(initialValue);

  const toggle = useCallback(() => {
    setState(prev => !prev);
  }, [setState]);

  const setTrue = useCallback(() => {
    setState(true);
  }, [setState]);

  const setFalse = useCallback(() => {
    setState(false);
  }, [setState]);

  return { state, toggle, setTrue, setFalse };
}
