
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
        <div className="w-full py-2">
          <div className={cn("mx-auto px-4 mobile-s:px-6 sm:px-8", maxWidthClasses[maxWidth])}>
            <div className="text-sm text-slate-500">
              <PageHeader crumbs={crumbs} />
            </div>
          </div>
        </div>
      )}

      {/* Title Section */}
      {(title || description) && (
        <div className="w-full bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 py-12 mobile-s:py-16 sm:py-20">
          <div className={cn("mx-auto px-4 mobile-s:px-6 sm:px-8", maxWidthClasses[maxWidth])}>
            <BaseLayout 
              direction="column" 
              gap="lg" 
              align="center" 
              className="text-center animate-fade-in"
            >
              {title && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 text-blue-700 rounded-full text-sm font-medium">
                    🛠️ Outil professionnel
                  </div>
                  <h1 className="text-4xl mobile-s:text-5xl sm:text-6xl lg:text-7xl font-bold 
                                 text-slate-900 leading-tight tracking-tight max-w-5xl">
                    {title}
                  </h1>
                </div>
              )}
              {description && (
                <p className="text-xl mobile-s:text-2xl sm:text-3xl text-slate-600 max-w-4xl 
                              leading-relaxed font-medium">
                  {description}
                </p>
              )}
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  ⚡ Rapide et Efficace
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  🔒 Sécurisé et Privé
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  ⭐ Qualité Professionnelle
                </div>
              </div>
            </BaseLayout>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className={cn("mx-auto px-4 mobile-s:px-6 sm:px-8 py-8 mobile-s:py-12", "max-w-full")}>
          <div className="animate-fade-in w-full">
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
