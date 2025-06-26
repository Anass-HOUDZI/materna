
import React from "react";
import GrowthCurvesForm from "@/components/tools/GrowthCurvesForm";
import OptimizedToolPageLayout from "@/components/ui/OptimizedToolPageLayout";
import OptimizedCard from "@/components/ui/OptimizedCard";

export default function GrowthCurves() {
  return (
    <OptimizedToolPageLayout
      crumbs={[
        { label: "Courbes Croissance OMS" },
      ]}
      title="Courbes de Croissance OMS"
      description="Visualisez les courbes de croissance de l'OMS pour suivre le développement de votre enfant, de la naissance à 5 ans, selon les normes internationales."
    >
      <OptimizedCard variant="elevated" size="lg">
        <GrowthCurvesForm />
      </OptimizedCard>
    </OptimizedToolPageLayout>
  );
}
