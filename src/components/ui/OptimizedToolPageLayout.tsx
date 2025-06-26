
import React from "react";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/ui/PageHeader";
import Footer from "@/components/ui/Footer";
import PageContainer from "@/components/layout/PageContainer";
import FlexibleLayout from "@/components/ui/FlexibleLayout";
import Typography from "@/components/ui/Typography";

type Crumb = {
  href?: string;
  label: string;
};

interface OptimizedToolPageLayoutProps {
  children: React.ReactNode;
  crumbs: Crumb[];
  className?: string;
  title?: string;
  description?: string;
}

const OptimizedToolPageLayout = React.memo(({
  children,
  crumbs,
  className,
  title,
  description,
}: OptimizedToolPageLayoutProps) => {
  return (
    <PageContainer background="gradient" className={cn("pt-safe-top pb-safe-bottom", className)}>
      <FlexibleLayout direction="column" gap="xl" className="min-h-screen">
        <PageHeader crumbs={crumbs} />

        {/* Title Section */}
        {(title || description) && (
          <FlexibleLayout direction="column" gap="md" align="center" className="text-center animate-fade-in">
            {title && (
              <Typography variant="h1" className="px-4">
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="lead" className="max-w-3xl mx-auto px-4">
                {description}
              </Typography>
            )}
          </FlexibleLayout>
        )}

        {/* Main Content */}
        <div className="flex-1 animate-fade-in">
          {children}
        </div>

        <Footer />
      </FlexibleLayout>
    </PageContainer>
  );
});

OptimizedToolPageLayout.displayName = "OptimizedToolPageLayout";

export default OptimizedToolPageLayout;
