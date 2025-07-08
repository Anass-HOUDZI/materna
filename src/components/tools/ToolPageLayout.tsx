
import React from "react";
import { Layout } from "@/components/ui/Layout";
import { Card } from "@/components/ui/Card";
import BasePageLayout from "@/components/ui/BasePageLayout";

interface ToolPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  crumbs: Array<{ href?: string; label: string }>;
  loading?: boolean;
}

const ToolPageLayout = React.memo<ToolPageLayoutProps>(({
  children,
  title,
  description,
  crumbs,
  loading = false
}) => {
  return (
    <BasePageLayout
      crumbs={crumbs}
      title={title}
      description={description}
      maxWidth="2xl"
      background="gradient"
    >
      <Layout direction="column" gap="xl" align="center">
        <Card 
          variant="elevated" 
          size="lg" 
          className="w-full max-w-4xl shadow-2xl border-0 bg-card/95 backdrop-blur-md"
          state={loading ? "loading" : "default"}
        >
          {children}
        </Card>
      </Layout>
    </BasePageLayout>
  );
});

ToolPageLayout.displayName = "ToolPageLayout";

export default ToolPageLayout;
