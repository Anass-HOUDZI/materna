import { useMemo, useCallback } from 'react';
import { debounce } from '@/utils/performance';

// Custom hook for optimized performance
export const useOptimizedPerformance = () => {
  // Memoized debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query: string, callback: (query: string) => void) => {
      callback(query);
    }, 300),
    []
  );

  // Optimized toggle function
  const createOptimizedToggle = useCallback((
    setter: (value: boolean | ((prev: boolean) => boolean)) => void
  ) => {
    return () => setter(prev => !prev);
  }, []);

  // Memoized filter function
  const createMemoizedFilter = useCallback((
    data: any[],
    filterFn: (item: any) => boolean,
    dependencies: any[]
  ) => {
    return useMemo(() => data.filter(filterFn), [data, ...dependencies]);
  }, []);

  // Performance monitoring
  const measurePerformance = useCallback((name: string, fn: () => void) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      fn();
      const end = performance.now();
      console.log(`${name} took ${end - start} milliseconds`);
    } else {
      fn();
    }
  }, []);

  return {
    debouncedSearch,
    createOptimizedToggle,
    createMemoizedFilter,
    measurePerformance,
  };
};

// Hook for lazy loading components
export const useLazyComponents = () => {
  const loadComponent = useCallback(async (componentPath: string) => {
    try {
      const component = await import(componentPath);
      return component.default;
    } catch (error) {
      console.error(`Failed to load component: ${componentPath}`, error);
      return null;
    }
  }, []);

  return { loadComponent };
};