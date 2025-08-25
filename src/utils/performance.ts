// Performance optimizations utilities

import { useMemo } from 'react';
import React from 'react';

// Memoized gradient styles to avoid inline styles
export const GRADIENT_STYLES = {
  primary: 'linear-gradient(to right, #f953c6, #b91d73)',
  secondary: 'linear-gradient(to right, #667eea, #764ba2)',
  accent: 'linear-gradient(to right, #ffecd2, #fcb69f)',
  success: 'linear-gradient(to right, #a8edea, #fed6e3)',
  warning: 'linear-gradient(to right, #ffd89b, #19547b)',
} as const;

// Optimized icon creation with memoization
export const createOptimizedIcon = (IconComponent: any, props: any = {}) => {
  return useMemo(() => {
    return React.createElement(IconComponent, props);
  }, [IconComponent, props]);
};

// Debounced search function
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
};

// Image preloader
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Bundle analyzer for development
export const logBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in production build');
  }
};

// Memoized gradient class generator
export const getGradientClass = (type: keyof typeof GRADIENT_STYLES = 'primary') => {
  return `bg-gradient-to-r from-${type} to-${type}-foreground bg-clip-text text-transparent`;
};