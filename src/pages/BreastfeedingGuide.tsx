
import React from "react";
import BreastfeedingTabs from "@/components/tools/BreastfeedingTabs";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function BreastfeedingGuide() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Guide Allaitement Complet" },
      ]}
      title="Guide Allaitement Complet"
      description="Ressources complètes pour un allaitement réussi : diagnostic, conseils d'experts, suivi et communauté bienveillante."
      maxWidth="xl"
    >
      <BaseToolForm
        title="Votre Compagnon Allaitement"
        description="Tout ce dont vous avez besoin pour allaiter en confiance"
      >
        <BreastfeedingTabs />
      </BaseToolForm>
    </BasePageLayout>
  );
}
