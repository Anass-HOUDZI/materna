
import React from "react";
import { cn } from "@/lib/utils";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: "default" | "filled" | "outlined";
}

const BaseInput = React.memo<BaseInputProps>(({ 
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = false,
  variant = "default",
  className,
  id,
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const variantStyles = {
    default: "border-2 border-gray-300 focus:border-blue-500 bg-white",
    filled: "border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500",
    outlined: "border-2 border-gray-400 focus:border-blue-600 bg-transparent"
  };

  return (
    <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
      {label && (
        <label 
          htmlFor={inputId}
          className="text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-xl transition-all duration-300 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "placeholder:text-gray-400",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-red-500 focus:border-red-500 focus:ring-red-400",
            variantStyles[variant],
            className
          )}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          aria-invalid={!!error}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-sm text-gray-600">
          {hint}
        </p>
      )}
    </div>
  );
});

BaseInput.displayName = "BaseInput";

export default BaseInput;
