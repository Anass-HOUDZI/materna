
import React from "react";
import { cn } from "@/lib/utils";
import BaseLayout from "@/components/layout/BaseLayout";
import BaseCard from "@/components/ui/BaseCard";

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
    <div className="w-full max-w-none mx-auto">
      <BaseCard 
        variant="elevated" 
        size="lg" 
        className={cn("w-full max-w-none shadow-2xl border-0 bg-white/95 backdrop-blur-md", className)}
        loading={loading}
      >
        <BaseLayout direction="column" gap="xl">
          {(title || description) && (
            <BaseLayout direction="column" gap="md" align="center" className="text-center border-b border-slate-100 pb-8">
              {title && (
                <h2 className="text-3xl mobile-s:text-4xl sm:text-5xl font-bold text-slate-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-xl mobile-s:text-2xl text-slate-600 leading-relaxed max-w-3xl">
                  {description}
                </p>
              )}
            </BaseLayout>
          )}
          
          <div className="w-full">
            {children}
          </div>
        </BaseLayout>
      </BaseCard>
    </div>
  );
});

BaseToolForm.displayName = "BaseToolForm";

export default BaseToolForm;
