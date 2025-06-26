
import React from "react";
import { cn } from "@/lib/utils";

interface OptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass";
  size?: "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const OptimizedCard = React.memo(({ 
  children, 
  className,
  variant = "default",
  size = "md",
  hover = true,
  onClick,
  style
}: OptimizedCardProps) => {
  const variantStyles = {
    default: "bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg",
    elevated: "bg-white/95 backdrop-blur-md border border-white/40 shadow-xl",
    glass: "bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl"
  };

  const sizeStyles = {
    sm: "p-4 mobile-s:p-6 sm:p-8",
    md: "p-6 mobile-s:p-8 sm:p-10 lg:p-12",
    lg: "p-8 mobile-s:p-10 sm:p-12 lg:p-16"
  };

  return (
    <div 
      className={cn(
        "rounded-2xl ring-1 ring-gray-200/30 overflow-hidden",
        "transition-all duration-300 ease-out transform-gpu",
        hover && "hover:shadow-2xl hover:ring-blue-300/40 hover:-translate-y-1 hover:scale-[1.01]",
        "focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2",
        onClick && "cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onClick={onClick}
      style={style}
      role="region"
    >
      {children}
    </div>
  );
});

OptimizedCard.displayName = "OptimizedCard";

export default OptimizedCard;
