
import React from "react";
import GrowthCurvesForm from "@/components/tools/GrowthCurvesForm";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function GrowthCurves() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Courbes Croissance OMS" },
      ]}
      title="Courbes de Croissance OMS"
      description="Visualisez les courbes de croissance de l'OMS pour suivre le développement de votre enfant, de la naissance à 5 ans, selon les normes internationales."
    >
      <ToolCard variant="elevated" size="lg">
        <GrowthCurvesForm />
      </ToolCard>
    </ToolPageLayout>
  );
}
