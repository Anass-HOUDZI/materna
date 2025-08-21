
import React from "react";
import { BabyMovementTrackerForm } from "@/components/tools/BabyMovementTrackerForm";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function BabyMovementTracker() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Tracker Mouvements Bébé" },
      ]}
      title="Tracker Mouvements Bébé"
      description="Suivez les mouvements fœtaux selon les méthodes médicales reconnues (Cardiff, Sadovsky, Moore) pour votre tranquillité d'esprit."
      maxWidth="xl"
    >
      <BaseToolForm
      >
        <BabyMovementTrackerForm />
      </BaseToolForm>
    </BasePageLayout>
  );
}
