
import React from "react";
import { cn } from "@/lib/utils";

interface FlexibleLayoutProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  className?: string;
}

const FlexibleLayout = React.memo(({
  children,
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  className
}: FlexibleLayoutProps) => {
  const gapStyles = {
    sm: "gap-2 mobile-s:gap-3",
    md: "gap-4 mobile-s:gap-6",
    lg: "gap-6 mobile-s:gap-8",
    xl: "gap-8 mobile-s:gap-12"
  };

  const alignStyles = {
    start: "items-start",
    center: "items-center", 
    end: "items-end",
    stretch: "items-stretch"
  };

  const justifyStyles = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around"
  };

  return (
    <div className={cn(
      "flex",
      direction === "row" ? "flex-row" : "flex-col",
      gapStyles[gap],
      alignStyles[align],
      justifyStyles[justify],
      wrap && "flex-wrap",
      className
    )}>
      {children}
    </div>
  );
});

FlexibleLayout.displayName = "FlexibleLayout";

export default FlexibleLayout;
