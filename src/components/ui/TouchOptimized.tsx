
import React from "react";
import { cn } from "@/lib/utils";

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
  const baseClasses = "transition-all duration-200 ease-out select-none";
  
  const variantClasses = {
    button: "touch:min-h-[44px] touch:min-w-[44px] active:scale-95 hover:scale-[1.02] focus:scale-[1.02]",
    card: "touch:min-h-[44px] active:scale-[0.98] hover:scale-[1.01] focus:scale-[1.01]", 
    link: "touch:min-h-[32px] touch:py-2 active:opacity-70 hover:opacity-90"
  };

  const sizeClasses = {
    sm: "touch:p-2 no-touch:p-1",
    md: "touch:p-3 no-touch:p-2", 
    lg: "touch:p-4 no-touch:p-3"
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
