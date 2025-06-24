
import React from "react";
import MotorDevelopmentTrackerForm from "@/components/tools/MotorDevelopmentTrackerForm";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function MotorDevelopmentTracker() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Tracker Développement Moteur 0-3 ans" },
      ]}
      title="Tracker Développement Moteur 0-3 ans"
      description="Évaluez les principales acquisitions motrices de votre enfant selon son âge entre 1 et 36 mois, selon les références scientifiques internationales."
    >
      <ToolCard variant="elevated" size="lg">
        <MotorDevelopmentTrackerForm />
      </ToolCard>
    </ToolPageLayout>
  );
}
