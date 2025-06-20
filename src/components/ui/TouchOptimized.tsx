
import React from "react";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";

interface TouchOptimizedProps {
  children: React.ReactNode;
  className?: string;
  variant?: "button" | "card" | "link";
  size?: "sm" | "md" | "lg";
}

export default function TouchOptimized({ 
  children, 
  className,
  variant = "button",
  size = "md"
}: TouchOptimizedProps) {
  const { isTouch } = useResponsive();

  const baseClasses = cn(
    "transition-all duration-200 ease-out select-none",
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

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
