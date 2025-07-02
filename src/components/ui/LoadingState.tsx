import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "card" | "inline";
}

const LoadingState = React.memo<LoadingStateProps>(({
  message = "Chargement...",
  className,
  size = "md",
  variant = "default"
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Loader2 className={cn("animate-spin text-blue-600", sizeClasses[size])} />
        <span className={cn("text-slate-600", textSizeClasses[size])}>
          {message}
        </span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-200 shadow-lg",
        className
      )}>
        <Loader2 className={cn("animate-spin text-blue-600 mb-4", sizeClasses[size])} />
        <p className={cn("text-slate-600 text-center", textSizeClasses[size])}>
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <Loader2 className={cn("animate-spin text-blue-600 mb-4", sizeClasses[size])} />
      <p className={cn("text-slate-600 text-center", textSizeClasses[size])}>
        {message}
      </p>
    </div>
  );
});

LoadingState.displayName = "LoadingState";

export default LoadingState;