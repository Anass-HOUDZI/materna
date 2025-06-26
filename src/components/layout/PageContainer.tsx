
import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  background?: "default" | "gradient" | "soft";
}

const PageContainer = React.memo(({ 
  children, 
  className,
  maxWidth = "2xl",
  padding = "md",
  background = "gradient"
}: PageContainerProps) => {
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
    sm: "px-3 mobile-s:px-4 sm:px-6",
    md: "px-4 mobile-s:px-6 sm:px-8 lg:px-12",
    lg: "px-6 mobile-s:px-8 sm:px-12 lg:px-16"
  };

  const backgroundClasses = {
    default: "bg-background",
    gradient: "bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30",
    soft: "bg-gradient-to-br from-blue-50/20 via-transparent to-rose-50/20"
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      backgroundClasses[background],
      className
    )}>
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 flex justify-center items-start py-8 mobile-s:py-12 sm:py-16 lg:py-20">
          <div className={cn(
            "w-full mx-auto",
            maxWidthClasses[maxWidth],
            paddingClasses[padding]
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
});

PageContainer.displayName = "PageContainer";

export default PageContainer;
