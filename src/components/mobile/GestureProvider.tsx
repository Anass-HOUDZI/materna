
import React, { createContext, useContext, useRef, useCallback, ReactNode } from 'react';

interface GestureState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  startTime: number;
  distance: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

interface GestureCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onTap?: () => void;
  onLongPress?: () => void;
}

interface GestureContextValue {
  registerGesture: (element: HTMLElement, callbacks: GestureCallbacks) => () => void;
}

const GestureContext = createContext<GestureContextValue | null>(null);

export const useGestures = () => {
  const context = useContext(GestureContext);
  if (!context) {
    throw new Error('useGestures must be used within a GestureProvider');
  }
  return context;
};

interface GestureProviderProps {
  children: ReactNode;
  swipeThreshold?: number;
  tapThreshold?: number;
  longPressThreshold?: number;
}

export default function GestureProvider({
  children,
  swipeThreshold = 50,
  tapThreshold = 10,
  longPressThreshold = 500,
}: GestureProviderProps) {
  const gestureState = useRef<GestureState | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const touchCount = useRef(0);

  const calculateDistance = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }, []);

  const getDirection = useCallback((deltaX: number, deltaY: number) => {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }, []);

  const registerGesture = useCallback((element: HTMLElement, callbacks: GestureCallbacks) => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchCount.current = e.touches.length;
      
      gestureState.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        deltaX: 0,
        deltaY: 0,
        startTime: Date.now(),
        distance: 0,
        direction: null,
      };

      // Long press detection
      if (callbacks.onLongPress) {
        longPressTimer.current = setTimeout(() => {
          callbacks.onLongPress?.();
        }, longPressThreshold);
      }

      // Prevent default pour éviter le scroll
      if (touchCount.current > 1) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!gestureState.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - gestureState.current.startX;
      const deltaY = touch.clientY - gestureState.current.startY;
      const distance = calculateDistance(
        gestureState.current.startX,
        gestureState.current.startY,
        touch.clientX,
        touch.clientY
      );

      gestureState.current.currentX = touch.clientX;
      gestureState.current.currentY = touch.clientY;
      gestureState.current.deltaX = deltaX;
      gestureState.current.deltaY = deltaY;
      gestureState.current.distance = distance;
      gestureState.current.direction = getDirection(deltaX, deltaY);

      // Clear long press si mouvement détecté
      if (distance > tapThreshold && longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      // Pinch detection
      if (e.touches.length === 2 && callbacks.onPinch) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = calculateDistance(
          touch1.clientX,
          touch1.clientY,
          touch2.clientX,
          touch2.clientY
        );
        
        // Simplification : on utilise la distance actuelle comme scale
        const scale = currentDistance / 100; // Normalisation basique
        callbacks.onPinch(scale);
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!gestureState.current) return;

      const { deltaX, deltaY, distance, direction, startTime } = gestureState.current;
      const duration = Date.now() - startTime;

      // Clear long press timer
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      // Tap detection
      if (distance < tapThreshold && duration < 300 && callbacks.onTap) {
        callbacks.onTap();
      }
      // Swipe detection
      else if (distance > swipeThreshold && duration < 1000) {
        switch (direction) {
          case 'left':
            callbacks.onSwipeLeft?.();
            break;
          case 'right':
            callbacks.onSwipeRight?.();
            break;
          case 'up':
            callbacks.onSwipeUp?.();
            break;
          case 'down':
            callbacks.onSwipeDown?.();
            break;
        }
      }

      gestureState.current = null;
      touchCount.current = 0;
    };

    // Gestion des événements souris pour desktop
    const handleMouseDown = (e: MouseEvent) => {
      gestureState.current = {
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
        deltaX: 0,
        deltaY: 0,
        startTime: Date.now(),
        distance: 0,
        direction: null,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!gestureState.current) return;

      const deltaX = e.clientX - gestureState.current.startX;
      const deltaY = e.clientY - gestureState.current.startY;
      const distance = calculateDistance(
        gestureState.current.startX,
        gestureState.current.startY,
        e.clientX,
        e.clientY
      );

      gestureState.current.currentX = e.clientX;
      gestureState.current.currentY = e.clientY;
      gestureState.current.deltaX = deltaX;
      gestureState.current.deltaY = deltaY;
      gestureState.current.distance = distance;
      gestureState.current.direction = getDirection(deltaX, deltaY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!gestureState.current) return;

      const { distance, direction, startTime } = gestureState.current;
      const duration = Date.now() - startTime;

      // Click detection
      if (distance < tapThreshold && duration < 300 && callbacks.onTap) {
        callbacks.onTap();
      }

      gestureState.current = null;
    };

    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUp);

    // Cleanup function
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseup', handleMouseUp);

      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [calculateDistance, getDirection, swipeThreshold, tapThreshold, longPressThreshold]);

  const contextValue: GestureContextValue = {
    registerGesture,
  };

  return (
    <GestureContext.Provider value={contextValue}>
      {children}
    </GestureContext.Provider>
  );
}
