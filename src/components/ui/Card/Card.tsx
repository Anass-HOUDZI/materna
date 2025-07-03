
import React from "react";
import { cn } from "@/lib/utils";
import { designSystem } from "@/theme/design-system";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass" | "outlined" | "interactive";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  state?: "default" | "hover" | "loading" | "disabled" | "success" | "error";
  onClick?: () => void;
  style?: React.CSSProperties;
  role?: string;
  ariaLabel?: string;
}

const Card = React.memo<CardProps>(({ 
  children, 
  className,
  variant = "default",
  size = "md",
  state = "default",
  onClick,
  style,
  role = "region",
  ariaLabel
}) => {
  const variantStyles = {
    default: "bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-md",
    elevated: "bg-white/98 backdrop-blur-md border border-slate-200/60 shadow-lg",
    glass: "bg-white/85 backdrop-blur-lg border border-white/30 shadow-xl",
    outlined: "bg-white/90 backdrop-blur-sm border-2 border-slate-300/70 shadow-sm",
    interactive: "bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-md hover:shadow-xl hover:border-blue-300/50 cursor-pointer"
  };

  const sizeStyles = {
    xs: "p-3",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };

  const stateStyles = {
    default: "",
    hover: "hover:-translate-y-1 hover:scale-[1.02]",
    loading: "animate-pulse opacity-75",
    disabled: "opacity-50 cursor-not-allowed",
    success: "border-green-300 bg-green-50/50",
    error: "border-red-300 bg-red-50/50"
  };

  const handleClick = React.useCallback(() => {
    if (state !== "disabled" && state !== "loading" && onClick) {
      onClick();
    }
  }, [state, onClick]);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && onClick) {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick, onClick]);

  return (
    <div 
      className={cn(
        "rounded-2xl overflow-hidden relative",
        "transition-all duration-300 ease-out transform-gpu",
        "focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2",
        variantStyles[variant],
        sizeStyles[size],
        stateStyles[state],
        className
      )}
      onClick={handleClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      style={style}
      role={onClick ? "button" : role}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      aria-disabled={state === "disabled"}
    >
      {state === "loading" && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

Card.displayName = "Card";

export default Card;
