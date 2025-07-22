
import React from "react";
import { cn } from "@/lib/utils";
import { designSystem } from "@/theme/design-system";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = React.memo<ButtonProps>(({ 
  children, 
  className,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform";

  const variantStyles = {
    primary: "text-white shadow-lg hover:shadow-xl focus:ring-pink-400",
    secondary: "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg hover:shadow-xl focus:ring-slate-400",
    outline: "border-2 hover:bg-white/20 focus:ring-pink-400",
    ghost: "text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
    danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl focus:ring-red-400",
    success: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl focus:ring-green-400"
  };

  const sizeStyles = {
    xs: "px-3 py-1.5 text-xs min-h-[32px]",
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[48px]",
    xl: "px-10 py-5 text-xl min-h-[52px]"
  };

  // If only icon and no children, use smaller padding
  const isIconOnly = icon && !children;
  const finalSizeStyles = isIconOnly ? {
    xs: "p-1.5 min-h-[32px] min-w-[32px]",
    sm: "p-2 min-h-[36px] min-w-[36px]",
    md: "p-3 min-h-[44px] min-w-[44px]",
    lg: "p-4 min-h-[48px] min-w-[48px]",
    xl: "p-5 min-h-[52px] min-w-[52px]"
  } : sizeStyles;

  return (
    <button 
      className={cn(
        baseStyles,
        variantStyles[variant],
        finalSizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      style={{
        ...(variant === "primary" && { background: 'linear-gradient(to right, #f953c6, #b91d73)' }),
        ...(variant === "outline" && { borderColor: '#f953c6', color: '#f953c6' }),
        ...props.style
      }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {children && <span>Chargement...</span>}
        </div>
      ) : (
        <div className={cn("flex items-center", children && icon && "gap-2")}>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </div>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
