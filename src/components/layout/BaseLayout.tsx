
import React from "react";
import { cn } from "@/lib/utils";

interface BaseLayoutProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  className?: string;
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  maxWidth?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  centerContent?: boolean;
}

const BaseLayout = React.memo<BaseLayoutProps>(({
  children,
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  className,
  padding = "none",
  maxWidth = "none",
  centerContent = false
}) => {
  const gapStyles = {
    none: "gap-0",
    xs: "gap-1 mobile-s:gap-2",
    sm: "gap-2 mobile-s:gap-3",
    md: "gap-4 mobile-s:gap-6",
    lg: "gap-6 mobile-s:gap-8",
    xl: "gap-8 mobile-s:gap-12",
    "2xl": "gap-12 mobile-s:gap-16"
  };

  const alignStyles = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline"
  };

  const justifyStyles = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  };

  const paddingStyles = {
    none: "",
    xs: "p-2 mobile-s:p-3",
    sm: "p-3 mobile-s:p-4 sm:p-6",
    md: "p-4 mobile-s:p-6 sm:p-8",
    lg: "p-6 mobile-s:p-8 sm:p-12",
    xl: "p-8 mobile-s:p-12 sm:p-16"
  };

  const maxWidthStyles = {
    none: "",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full"
  };

  return (
    <div className={cn(
      "flex",
      direction === "row" ? "flex-row" : "flex-col",
      gapStyles[gap],
      alignStyles[align],
      justifyStyles[justify],
      wrap && "flex-wrap",
      paddingStyles[padding],
      maxWidthStyles[maxWidth],
      centerContent && "mx-auto",
      className
    )}>
      {children}
    </div>
  );
});

BaseLayout.displayName = "BaseLayout";

export default BaseLayout;
