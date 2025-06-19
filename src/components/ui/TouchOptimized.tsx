
import React from "react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";

interface TouchOptimizedProps {
  children: React.ReactNode;
  className?: string;
  variant?: "button" | "card" | "link";
  size?: "sm" | "md" | "lg";
  hapticFeedback?: boolean;
  ripple?: boolean;
}

export default function TouchOptimized({ 
  children, 
  className,
  variant = "button",
  size = "md",
  hapticFeedback = false,
  ripple = false
}: TouchOptimizedProps) {
  const { isTouch, isMobile } = useResponsive();

  const baseClasses = cn(
    "transition-all duration-200 ease-out select-none relative overflow-hidden",
    // GPU acceleration
    "transform-gpu will-change-transform",
    // Touch optimizations
    isTouch && "touch-manipulation"
  );
  
  const variantClasses = {
    button: cn(
      // Touch targets
      isTouch && "min-h-touch min-w-touch",
      // Feedback animations
      "active:scale-95 active:brightness-95",
      "hover:scale-[1.02] focus:scale-[1.02]",
      // Disabled on touch for hover effects
      isTouch && "hover:scale-100 focus:scale-100"
    ),
    card: cn(
      isTouch && "min-h-touch", 
      "active:scale-[0.98] active:brightness-95",
      "hover:scale-[1.01] focus:scale-[1.01]",
      isTouch && "hover:scale-100 focus:scale-100"
    ), 
    link: cn(
      isTouch && "min-h-[32px] py-2",
      "active:opacity-70 hover:opacity-90",
      "focus:opacity-90"
    )
  };

  const sizeClasses = {
    sm: cn(
      isTouch ? "p-2" : "p-1",
      "text-sm"
    ),
    md: cn(
      isTouch ? "p-3" : "p-2",
      "text-base"
    ), 
    lg: cn(
      isTouch ? "p-4" : "p-3",
      "text-lg"
    )
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Haptic feedback simulation
    if (hapticFeedback && navigator.vibrate) {
      navigator.vibrate(1);
    }
    
    // Ripple effect
    if (ripple && isTouch) {
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.touches[0].clientX - rect.left - size / 2;
      const y = e.touches[0].clientY - rect.top - size / 2;
      
      // Create ripple element
      const rippleElement = document.createElement('span');
      rippleElement.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: currentColor;
        border-radius: 50%;
        opacity: 0.3;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 0;
      `;
      
      // Add ripple styles if not already added
      if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      element.appendChild(rippleElement);
      
      // Remove ripple after animation
      setTimeout(() => {
        if (rippleElement.parentNode) {
          rippleElement.parentNode.removeChild(rippleElement);
        }
      }, 600);
    }
  };

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onTouchStart={handleTouchStart}
    >
      {children}
      
      {/* Static ripple overlay for consistent visual feedback */}
      {ripple && (
        <div className="absolute inset-0 bg-current opacity-0 transition-opacity duration-150 hover:opacity-5 active:opacity-10 pointer-events-none" />
      )}
    </div>
  );
}
