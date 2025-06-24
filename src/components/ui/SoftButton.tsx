
import React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface SoftButtonProps extends ButtonProps {
  gradient?: "blue" | "rose" | "mint" | "lavender" | "peach";
  softShadow?: boolean;
}

export default function SoftButton({ 
  children, 
  className, 
  gradient = "blue",
  softShadow = true,
  ...props 
}: SoftButtonProps) {
  const gradientClasses = {
    blue: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
    rose: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white",
    mint: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white",
    lavender: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white",
    peach: "bg-gradient-to-r from-orange-400 to-rose-500 hover:from-orange-500 hover:to-rose-600 text-white"
  };

  return (
    <Button
      className={cn(
        // Soft, modern button design
        "rounded-2xl font-semibold text-base mobile-s:text-lg",
        "px-8 mobile-s:px-10 sm:px-12 py-4 mobile-s:py-5",
        "min-h-touch transition-all duration-300 ease-out",
        "transform hover:scale-105 active:scale-95",
        "focus:ring-4 focus:ring-offset-2 focus:ring-offset-white/50",
        
        // Gradient and shadow
        gradientClasses[gradient],
        softShadow && "shadow-lg hover:shadow-xl",
        softShadow && "shadow-blue-500/25 hover:shadow-blue-500/35",
        
        // Accessibility
        "focus-visible:outline-none focus-visible:ring-4",
        
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
