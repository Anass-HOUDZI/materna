
import React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface EnhancedButtonProps extends ButtonProps {
  gradient?: "blue" | "rose" | "mint" | "lavender" | "peach";
  loading?: boolean;
  fullWidth?: boolean;
}

const EnhancedButton = React.memo(({ 
  children, 
  className, 
  gradient = "blue",
  loading = false,
  fullWidth = false,
  disabled,
  ...props 
}: EnhancedButtonProps) => {
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
        "rounded-2xl font-semibold text-base mobile-s:text-lg",
        "px-6 mobile-s:px-8 py-3 mobile-s:py-4",
        "min-h-touch transition-all duration-300 ease-out",
        "transform hover:scale-105 active:scale-95",
        "focus:ring-4 focus:ring-offset-2 focus:ring-offset-white/50",
        "shadow-lg hover:shadow-xl",
        gradientClasses[gradient],
        fullWidth && "w-full",
        loading && "opacity-70 cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Chargement...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
});

EnhancedButton.displayName = "EnhancedButton";

export default EnhancedButton;
