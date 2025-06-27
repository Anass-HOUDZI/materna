
import React from "react";
import { cn } from "@/lib/utils";

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  gradient?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const BaseButton = React.memo<BaseButtonProps>(({ 
  children, 
  className,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  gradient = false,
  icon,
  iconPosition = "left",
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95";

  const variantStyles = {
    primary: gradient 
      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-400"
      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-400",
    secondary: gradient
      ? "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl focus:ring-gray-400"
      : "bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl focus:ring-gray-400",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-400",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    danger: gradient
      ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-400"
      : "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-400",
    success: gradient
      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-400"
      : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-400"
  };

  const sizeStyles = {
    xs: "px-3 py-1.5 text-xs min-h-[32px]",
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[48px]",
    xl: "px-10 py-5 text-xl min-h-[52px]"
  };

  return (
    <button 
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
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
        <div className="flex items-center gap-2">
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </div>
      )}
    </button>
  );
});

BaseButton.displayName = "BaseButton";

export default BaseButton;
