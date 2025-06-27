
import React from "react";
import { cn } from "@/lib/utils";

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass" | "outlined";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  loading?: boolean;
  disabled?: boolean;
  role?: string;
  ariaLabel?: string;
}

const BaseCard = React.memo<BaseCardProps>(({ 
  children, 
  className,
  variant = "default",
  size = "md",
  hover = true,
  onClick,
  style,
  loading = false,
  disabled = false,
  role = "region",
  ariaLabel
}) => {
  const variantStyles = {
    default: "bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-lg",
    elevated: "bg-white/98 backdrop-blur-md border border-gray-200/60 shadow-xl",
    glass: "bg-white/85 backdrop-blur-lg border border-white/30 shadow-2xl",
    outlined: "bg-white/90 backdrop-blur-sm border-2 border-gray-300/70 shadow-md"
  };

  const sizeStyles = {
    xs: "p-3 mobile-s:p-4",
    sm: "p-4 mobile-s:p-5 sm:p-6",
    md: "p-6 mobile-s:p-7 sm:p-8 lg:p-10",
    lg: "p-8 mobile-s:p-9 sm:p-10 lg:p-12",
    xl: "p-10 mobile-s:p-11 sm:p-12 lg:p-16"
  };

  const handleClick = React.useCallback(() => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  }, [disabled, loading, onClick]);

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
        hover && !disabled && !loading && "hover:shadow-2xl hover:ring-2 hover:ring-blue-300/40 hover:-translate-y-1 hover:scale-[1.02]",
        "focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2",
        onClick && !disabled && !loading && "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        loading && "animate-pulse",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onClick={handleClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      style={style}
      role={onClick ? "button" : role}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {loading && (
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

BaseCard.displayName = "BaseCard";

export default BaseCard;
