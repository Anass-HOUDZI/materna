
import React from "react";
import { cn } from "@/lib/utils";

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "glass" | "elevated" | "premium";
  hover3d?: boolean;
  shine?: boolean;
  onClick?: () => void;
}

const ModernCard = React.memo<ModernCardProps>(({
  children,
  className,
  variant = "glass",
  hover3d = true,
  shine = false,
  onClick
}) => {
  const baseClasses = "relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-500 ease-out transform-gpu";
  
  const variantClasses = {
    glass: "bg-white/10 border-white/20 shadow-2xl",
    elevated: "bg-white/95 border-slate-200/50 shadow-xl",
    premium: "bg-gradient-to-br from-white/95 via-white/90 to-white/80 border-white/30 shadow-2xl"
  };

  const hoverClasses = hover3d 
    ? "hover:shadow-3xl" 
    : "";

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hover3d && hoverClasses,
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      {shine && (
        <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-500">
          <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent transform skew-x-12 animate-shine" />
        </div>
      )}
      
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {variant === "premium" && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      )}
    </div>
  );
});

ModernCard.displayName = "ModernCard";

export default ModernCard;
