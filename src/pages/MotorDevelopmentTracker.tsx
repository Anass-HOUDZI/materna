
import React from "react";
import MotorDevelopmentTrackerForm from "@/components/tools/MotorDevelopmentTrackerForm";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function MotorDevelopmentTracker() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Tracker Développement Moteur 0-3 ans" },
      ]}
      title="Tracker Développement Moteur 0-3 ans"
      description="Évaluez les acquisitions motrices de votre enfant selon les références scientifiques internationales et accompagnez son développement."
      maxWidth="xl"
    >
      <BaseToolForm
        title="Évaluation du Développement"
        description="Suivez les étapes clés du développement moteur de votre enfant"
      >
        <MotorDevelopmentTrackerForm />
      </BaseToolForm>
    </BasePageLayout>
  );
}
