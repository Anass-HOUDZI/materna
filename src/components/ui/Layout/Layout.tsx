
import React from "react";
import { cn } from "@/lib/utils";

export interface LayoutProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  className?: string;
  id?: string;
}

const Layout = React.memo<LayoutProps>(({
  children,
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  className,
  id
}) => {
  const directionClasses = {
    row: "flex-row",
    column: "flex-col"
  };

  const gapClasses = {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
    "2xl": "gap-12",
    "3xl": "gap-16"
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch"
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  };

  return (
    <div 
      id={id}
      className={cn(
        "flex",
        directionClasses[direction],
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
