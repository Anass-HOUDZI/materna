
import React from "react";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/ui/PageHeader";
import Footer from "@/components/ui/Footer";
import { Layout } from "@/components/ui/Layout";

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
    default: "bg-background",
    gradient: "bg-gradient-to-br from-blue-50/40 via-background to-rose-50/40 dark:from-blue-950/20 dark:via-background dark:to-purple-950/10",
    soft: "bg-gradient-to-br from-blue-50/20 via-transparent to-pink-50/20 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/5"
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
      "min-h-screen flex flex-col transition-colors duration-300",
      backgroundClasses[background],
      className
    )}>
      {/* Header - Mobile optimized */}
      {showHeader && (
        <div className="w-full py-2 xs:py-3 safe-area-padding">
          <div className={cn(
            "mx-auto responsive-container",
            maxWidthClasses[maxWidth]
          )}>
            <div className="text-xs xs:text-sm text-muted-foreground">
              <PageHeader crumbs={crumbs} />
            </div>
          </div>
        </div>
      )}

      {/* Title Section - Mobile-first typography */}
      {(title || description) && (
        <div className="w-full bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/10 py-8 xs:py-12 sm:py-16 md:py-20 safe-area-padding">
          <div className={cn(
            "mx-auto responsive-container",
            maxWidthClasses[maxWidth]
          )}>
            <Layout 
              direction="column" 
              gap="md" 
              align="center" 
              className="text-center animate-fade-in"
            >
              {title && (
                <div className="space-y-3 xs:space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 xs:px-4 xs:py-2 bg-primary/10 text-primary rounded-full text-xs xs:text-sm font-medium border border-primary/20">
                    🛠️ Outil professionnel
                  </div>
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold 
                                 leading-tight tracking-tight max-w-5xl bg-clip-text text-transparent px-4 xs:px-0"
                      style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                    {title}
                  </h1>
                </div>
              )}
              {description && (
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl 
                              leading-relaxed font-medium px-4 xs:px-0">
                  {description}
                </p>
              )}
            </Layout>
          </div>
        </div>
      )}

      {/* Main Content - Mobile-first container */}
      <main className="flex-1 w-full safe-area-padding">
        <div className={cn(
          "mx-auto responsive-container py-6 xs:py-8 sm:py-12",
          "max-w-full"
        )}>
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
