
import React from "react";
import FoodDiversificationTabs from "@/components/tools/FoodDiversificationTabs";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function FoodDiversificationGuide() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Guide Diversification Alimentaire" },
      ]}
      title="Guide Diversification Alimentaire"
      description="Accompagnez votre bébé dans la découverte des aliments avec nos conseils d'experts et recettes validées par des nutritionnistes pédiatriques."
      maxWidth="xl"
    >
      <BaseToolForm
      >
        <FoodDiversificationTabs />
      </BaseToolForm>
    </BasePageLayout>
  );
}
