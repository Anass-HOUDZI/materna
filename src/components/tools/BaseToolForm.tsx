
import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Layout } from "@/components/ui/Layout";

interface BaseToolFormProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  loading?: boolean;
}

const BaseToolForm = React.memo<BaseToolFormProps>(({
  children,
  title,
  description,
  className,
  loading = false
}) => {
  return (
    <div className="w-full mx-auto">
      <Card 
        variant="elevated" 
        size="lg" 
        className={cn("w-full shadow-2xl border-0 bg-card/95 backdrop-blur-md", className)}
        state={loading ? "loading" : "default"}
      >
        <Layout direction="column" gap="xl">
          {(title || description) && (
            <Layout direction="column" gap="md" align="center" className="text-center border-b border-border pb-8">
              {title && (
                <h2 className="text-3xl mobile-s:text-4xl sm:text-5xl font-bold text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-xl mobile-s:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                  {description}
                </p>
              )}
            </Layout>
          )}
          
          <div className="w-full">
            {children}
          </div>
        </Layout>
      </Card>
    </div>
  );
});

BaseToolForm.displayName = "BaseToolForm";

export default BaseToolForm;
