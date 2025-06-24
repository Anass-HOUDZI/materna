
import React from "react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass";
  size?: "sm" | "md" | "lg";
}

export default function ToolCard({ 
  children, 
  className,
  variant = "default",
  size = "md"
}: ToolCardProps) {
  const variantClasses = {
    default: "bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl",
    elevated: "bg-white/95 backdrop-blur-md border border-white/40 shadow-xl hover:shadow-2xl",
    glass: "bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl hover:shadow-3xl"
  };

  const sizeClasses = {
    sm: "p-6 mobile-s:p-8 sm:p-10",
    md: "p-8 mobile-s:p-10 sm:p-12 lg:p-16",
    lg: "p-10 mobile-s:p-12 sm:p-16 lg:p-20"
  };

  return (
    <div 
      className={cn(
        // Base styles with soft, rounded design
        "rounded-3xl ring-1 ring-gray-200/30 overflow-hidden",
        "transition-all duration-500 ease-out transform-gpu",
        "hover:ring-blue-300/40 hover:-translate-y-1 hover:scale-[1.01]",
        
        // Soft gradients and depth
        "relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/20 before:to-rose-50/20 before:opacity-0 before:transition-opacity before:duration-500",
        "hover:before:opacity-100",
        
        // Variant styles
        variantClasses[variant],
        
        // Size styles
        sizeClasses[size],
        
        // Focus and accessibility
        "focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2",
        "focus-within:ring-offset-white/50",
        
        className
      )}
      role="region"
      tabIndex={-1}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
