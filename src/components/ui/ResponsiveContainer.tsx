
import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}

export default function ResponsiveContainer({ 
  children, 
  className,
  maxWidth = "2xl",
  padding = "md"
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full"
  };

  const paddingClasses = {
    none: "",
    sm: "px-2 mobile-s:px-3 sm:px-4",
    md: "px-3 mobile-s:px-4 sm:px-6 lg:px-8",
    lg: "px-4 mobile-s:px-6 sm:px-8 lg:px-12"
  };

  return (
    <div 
      className={cn(
        "w-full mx-auto",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
