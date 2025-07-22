
import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "caption" | "lead";
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Typography = React.memo(({ 
  variant = "p", 
  children, 
  className,
  as 
}: TypographyProps) => {
  const styles = {
    h1: "text-3xl mobile-s:text-4xl sm:text-5xl lg:text-6xl font-bold font-playfair bg-clip-text text-transparent leading-tight tracking-tight",
    h2: "text-2xl mobile-s:text-3xl sm:text-4xl font-semibold text-gray-800 leading-tight tracking-tight",
    h3: "text-xl mobile-s:text-2xl sm:text-3xl font-semibold text-gray-800 leading-tight",
    h4: "text-lg mobile-s:text-xl sm:text-2xl font-semibold text-gray-800",
    p: "text-base mobile-s:text-lg text-slate-600 leading-relaxed",
    caption: "text-sm mobile-s:text-base text-slate-500 leading-relaxed",
    lead: "text-lg mobile-s:text-xl sm:text-2xl text-slate-600 leading-relaxed font-medium"
  };

  const Component = as || (variant.startsWith('h') ? variant : 'p') as keyof JSX.IntrinsicElements;

  return (
    <Component 
      className={cn(styles[variant], className)}
      style={variant === 'h1' ? { background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' } : undefined}
    >
      {children}
    </Component>
  );
});

Typography.displayName = "Typography";

export default Typography;
