
import { useState, useEffect } from 'react';

export interface ResponsiveState {
  // Device types
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  
  // Specific breakpoints
  isMobileXs: boolean;
  isMobileSm: boolean;
  isMobileMd: boolean;
  isMobileLg: boolean;
  isTabletSm: boolean;
  isTabletLg: boolean;
  
  // Orientation
  isPortrait: boolean;
  isLandscape: boolean;
  
  // Capabilities
  isTouch: boolean;
  isRetina: boolean;
  
  // Dimensions
  width: number;
  height: number;
  
  // Safe area
  safeAreaTop: number;
  safeAreaBottom: number;
  safeAreaLeft: number;
  safeAreaRight: number;
}

const BREAKPOINTS = {
  mobileXs: 320,
  mobileSm: 375,
  mobileMd: 414,
  mobileLg: 480,
  tabletSm: 768,
  tabletLg: 1024,
  desktop: 1280,
} as const;

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isMobileXs: false,
        isMobileSm: false,
        isMobileMd: false,
        isMobileLg: false,
        isTabletSm: false,
        isTabletLg: false,
        isPortrait: false,
        isLandscape: true,
        isTouch: false,
        isRetina: false,
        width: 1920,
        height: 1080,
        safeAreaTop: 0,
        safeAreaBottom: 0,
        safeAreaLeft: 0,
        safeAreaRight: 0,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      // Device types
      isMobile: width < BREAKPOINTS.tabletSm,
      isTablet: width >= BREAKPOINTS.tabletSm && width < BREAKPOINTS.desktop,
      isDesktop: width >= BREAKPOINTS.desktop,
      
      // Specific breakpoints
      isMobileXs: width >= BREAKPOINTS.mobileXs && width < BREAKPOINTS.mobileSm,
      isMobileSm: width >= BREAKPOINTS.mobileSm && width < BREAKPOINTS.mobileMd,
      isMobileMd: width >= BREAKPOINTS.mobileMd && width < BREAKPOINTS.mobileLg,
      isMobileLg: width >= BREAKPOINTS.mobileLg && width < BREAKPOINTS.tabletSm,
      isTabletSm: width >= BREAKPOINTS.tabletSm && width < BREAKPOINTS.tabletLg,
      isTabletLg: width >= BREAKPOINTS.tabletLg && width < BREAKPOINTS.desktop,
      
      // Orientation
      isPortrait: height > width,
      isLandscape: width >= height,
      
      // Capabilities
      isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      isRetina: window.devicePixelRatio > 1,
      
      // Dimensions
      width,
      height,
      
      // Safe area (approximation si CSS env() non disponible)
      safeAreaTop: 0,
      safeAreaBottom: 0,
      safeAreaLeft: 0,
      safeAreaRight: 0,
    };
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const updateState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Obtenir les safe areas via getComputedStyle
      const rootStyle = getComputedStyle(document.documentElement);
      const safeAreaTop = parseInt(rootStyle.getPropertyValue('--safe-area-inset-top') || '0');
      const safeAreaBottom = parseInt(rootStyle.getPropertyValue('--safe-area-inset-bottom') || '0');
      const safeAreaLeft = parseInt(rootStyle.getPropertyValue('--safe-area-inset-left') || '0');
      const safeAreaRight = parseInt(rootStyle.getPropertyValue('--safe-area-inset-right') || '0');
      
      setState({
        // Device types
        isMobile: width < BREAKPOINTS.tabletSm,
        isTablet: width >= BREAKPOINTS.tabletSm && width < BREAKPOINTS.desktop,
        isDesktop: width >= BREAKPOINTS.desktop,
        
        // Specific breakpoints
        isMobileXs: width >= BREAKPOINTS.mobileXs && width < BREAKPOINTS.mobileSm,
        isMobileSm: width >= BREAKPOINTS.mobileSm && width < BREAKPOINTS.mobileMd,
        isMobileMd: width >= BREAKPOINTS.mobileMd && width < BREAKPOINTS.mobileLg,
        isMobileLg: width >= BREAKPOINTS.mobileLg && width < BREAKPOINTS.tabletSm,
        isTabletSm: width >= BREAKPOINTS.tabletSm && width < BREAKPOINTS.tabletLg,
        isTabletLg: width >= BREAKPOINTS.tabletLg && width < BREAKPOINTS.desktop,
        
        // Orientation
        isPortrait: height > width,
        isLandscape: width >= height,
        
        // Capabilities
        isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        isRetina: window.devicePixelRatio > 1,
        
        // Dimensions
        width,
        height,
        
        // Safe area
        safeAreaTop,
        safeAreaBottom,
        safeAreaLeft,
        safeAreaRight,
      });
    };

    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateState, 100);
    };

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', debouncedUpdate);

    // Initial update
    updateState();

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}
