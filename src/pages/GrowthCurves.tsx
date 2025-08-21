
import React from "react";
import GrowthCurvesForm from "@/components/tools/GrowthCurvesForm";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function GrowthCurves() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Courbes Croissance OMS" },
      ]}
      title="Courbes de Croissance OMS"
      description="Suivez le développement de votre enfant avec les courbes de croissance officielles de l'OMS, personnalisées selon son profil."
      maxWidth="xl"
    >
      <BaseToolForm
      >
        <GrowthCurvesForm />
      </BaseToolForm>
    </BasePageLayout>
  );
}
