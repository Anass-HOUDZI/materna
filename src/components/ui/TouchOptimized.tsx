
import React from "react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";

interface TouchOptimizedProps {
  children: React.ReactNode;
  className?: string;
  variant?: "button" | "card" | "link" | "input";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
}

export default function TouchOptimized({ 
  children, 
  className,
  variant = "button",
  size = "md",
  disabled = false,
  loading = false
}: TouchOptimizedProps) {
  const { isTouch, isMobile } = useResponsive();

  const baseClasses = cn(
    // Base responsive classes
    "relative transition-all duration-200 ease-out select-none",
    // GPU acceleration
    "transform-gpu will-change-transform",
    // Touch optimizations
    isTouch && "touch-manipulation",
    // Disabled state
    disabled && "opacity-50 pointer-events-none cursor-not-allowed",
    // Loading state
    loading && "pointer-events-none"
  );
  
  const variantClasses = {
    button: cn(
      // Touch targets - mobile first
      "min-h-touch min-w-touch flex items-center justify-center",
      "rounded-lg border border-transparent",
      // Touch feedback
      "active:scale-95 active:brightness-95 transition-transform duration-150",
      // Hover effects (desktop only)
      "no-touch:hover:shadow-md no-touch:hover:scale-[1.02]",
      // Focus styles
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    ),
    card: cn(
      "min-h-touch rounded-xl border border-border bg-card", 
      "active:scale-[0.98] active:brightness-95 transition-transform duration-200",
      "no-touch:hover:shadow-lg no-touch:hover:border-primary/20",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    ), 
    link: cn(
      "min-h-[44px] inline-flex items-center justify-center",
      "rounded-md px-3 py-2",
      "active:opacity-70 transition-opacity duration-150",
      "no-touch:hover:opacity-80",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
    ),
    input: cn(
      "min-h-touch w-full rounded-lg border border-input bg-background",
      "px-3 py-2 text-base", // Larger text on mobile to prevent zoom
      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    )
  };

  const sizeClasses = {
    sm: cn(
      // Mobile first - larger on mobile for better touch
      "px-3 py-2 text-sm",
      "xs:px-2 xs:py-1 xs:text-xs",
      "sm:px-3 sm:py-2 sm:text-sm"
    ),
    md: cn(
      // Mobile first
      "px-4 py-3 text-base",
      "xs:px-3 xs:py-2 xs:text-sm",
      "sm:px-4 sm:py-3 sm:text-base"
    ), 
    lg: cn(
      // Mobile first
      "px-6 py-4 text-lg",
      "xs:px-4 xs:py-3 xs:text-base",
      "sm:px-6 sm:py-4 sm:text-lg"
    ),
    xl: cn(
      // Mobile first
      "px-8 py-6 text-xl",
      "xs:px-6 xs:py-4 xs:text-lg",
      "sm:px-8 sm:py-6 sm:text-xl"
    )
  };

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      role={variant === "button" ? "button" : variant === "link" ? "link" : undefined}
      tabIndex={variant === "button" || variant === "link" ? 0 : undefined}
      aria-disabled={disabled}
      aria-busy={loading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-inherit">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <div className={cn(
        "relative z-10 flex items-center justify-center w-full h-full",
        loading && "opacity-50"
      )}>
        {children}
      </div>
    </div>
  );
}
