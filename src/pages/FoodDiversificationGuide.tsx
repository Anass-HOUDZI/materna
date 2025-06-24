
import React from "react";
import FoodDiversificationTabs from "@/components/tools/FoodDiversificationTabs";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function FoodDiversificationGuide() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Guide Diversification Alimentaire" },
      ]}
      title="Guide Diversification Alimentaire"
      description="Conseils d'experts et recettes validées par des nutritionnistes pédiatriques, pour accompagner chaque étape de l'introduction des aliments solides, en toute sécurité et avec plaisir."
    >
      <ToolCard variant="elevated" size="lg">
        <FoodDiversificationTabs />
      </ToolCard>
    </ToolPageLayout>
  );
}
