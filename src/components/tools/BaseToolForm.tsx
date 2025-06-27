
import React from "react";
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
    <BaseCard 
      variant="elevated" 
      size="lg" 
      className={className}
      loading={loading}
    >
      <BaseLayout direction="column" gap="lg">
        {(title || description) && (
          <BaseLayout direction="column" gap="sm" align="center" className="text-center">
            {title && (
              <h2 className="text-2xl mobile-s:text-3xl font-bold text-slate-800">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-slate-600 leading-relaxed">
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
  );
});

BaseToolForm.displayName = "BaseToolForm";

export default BaseToolForm;
