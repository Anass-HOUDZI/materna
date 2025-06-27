
import React from "react";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/ui/PageHeader";
import Footer from "@/components/ui/Footer";
import BaseLayout from "@/components/layout/BaseLayout";

type Crumb = {
  href?: string;
  label: string;
};

interface BasePageLayoutProps {
  children: React.ReactNode;
  crumbs: Crumb[];
  className?: string;
  title?: string;
  description?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  background?: "default" | "gradient" | "soft";
  showHeader?: boolean;
  showFooter?: boolean;
}

const BasePageLayout = React.memo<BasePageLayoutProps>(({
  children,
  crumbs,
  className,
  title,
  description,
  maxWidth = "2xl",
  background = "gradient",
  showHeader = true,
  showFooter = true
}) => {
  const backgroundClasses = {
    default: "bg-gray-50",
    gradient: "bg-gradient-to-br from-blue-50/40 via-white to-rose-50/40",
    soft: "bg-gradient-to-br from-blue-50/20 via-transparent to-pink-50/20"
  };

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-4xl",
    full: "max-w-full"
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      backgroundClasses[background],
      className
    )}>
      {/* Header */}
      {showHeader && (
        <div className="w-full">
          <div className={cn("mx-auto px-4 mobile-s:px-6 sm:px-8", maxWidthClasses[maxWidth])}>
            <PageHeader crumbs={crumbs} />
          </div>
        </div>
      )}

      {/* Title Section */}
      {(title || description) && (
        <div className="w-full">
          <div className={cn("mx-auto px-4 mobile-s:px-6 sm:px-8", maxWidthClasses[maxWidth])}>
            <BaseLayout 
              direction="column" 
              gap="md" 
              align="center" 
              className="text-center animate-fade-in py-6 mobile-s:py-8"
            >
              {title && (
                <h1 className="text-3xl mobile-s:text-4xl sm:text-5xl lg:text-6xl font-bold font-playfair 
                               bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent 
                               leading-tight tracking-tight max-w-4xl">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-lg mobile-s:text-xl sm:text-2xl text-slate-600 max-w-3xl 
                              leading-relaxed font-medium">
                  {description}
                </p>
              )}
            </BaseLayout>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className={cn("mx-auto px-4 mobile-s:px-6 sm:px-8 py-8 mobile-s:py-12", maxWidthClasses[maxWidth])}>
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
});

BasePageLayout.displayName = "BasePageLayout";

export default BasePageLayout;
