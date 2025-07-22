
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
      {/* Header */}
      {showHeader && (
        <div className="w-full py-2">
          <div className={cn("mx-auto px-4 mobile-s:px-6 sm:px-8", maxWidthClasses[maxWidth])}>
            <div className="text-sm text-muted-foreground">
              <PageHeader crumbs={crumbs} />
            </div>
          </div>
        </div>
      )}

      {/* Title Section */}
      {(title || description) && (
        <div className="w-full bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/10 py-12 mobile-s:py-16 sm:py-20">
          <div className={cn("mx-auto md:px-4 mobile-s:md:px-6 sm:md:px-8", maxWidthClasses[maxWidth])}>
            <Layout 
              direction="column" 
              gap="lg" 
              align="center" 
              className="text-center animate-fade-in"
            >
              {title && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                    🛠️ Outil professionnel
                  </div>
                  <h1 className="text-4xl mobile-s:text-5xl sm:text-6xl lg:text-7xl font-bold 
                                 leading-tight tracking-tight max-w-5xl bg-clip-text text-transparent"
                      style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                    {title}
                  </h1>
                </div>
              )}
              {description && (
                <p className="text-xl mobile-s:text-2xl sm:text-3xl text-muted-foreground max-w-4xl 
                              leading-relaxed font-medium">
                  {description}
                </p>
              )}
            </Layout>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className={cn("mx-auto py-8 mobile-s:py-12", "max-w-full", "px-4 mobile-s:px-6 sm:px-8 md:px-0")}>
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
