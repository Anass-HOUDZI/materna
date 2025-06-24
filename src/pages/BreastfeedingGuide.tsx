
import React from "react";
import BreastfeedingTabs from "@/components/tools/BreastfeedingTabs";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function BreastfeedingGuide() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Guide Allaitement Complet" },
      ]}
      title="Guide Allaitement Complet"
      description="Diagnostic interactif, conseils d'experts, tracking, et bientôt communauté : toutes les ressources dont vous avez besoin pour allaiter en confiance, validées par des consultantes IBCLC."
    >
      <ToolCard variant="elevated" size="lg">
        <BreastfeedingTabs />
      </ToolCard>
    </ToolPageLayout>
  );
}
