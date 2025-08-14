
import React from "react";
import { BabyMovementTrackerForm } from "@/components/tools/BabyMovementTrackerForm";
import BasePageLayout from "@/components/ui/BasePageLayout";

export default function BabyMovementTracker() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Tracker Mouvements Bébé" },
      ]}
      title="Tracker Mouvements Bébé"
      description="Suivez les mouvements fœtaux selon les méthodes médicales reconnues (Cardiff, Sadovsky, Moore) pour votre tranquillité d'esprit."
      maxWidth="full"
    >
      <div className="w-full">
        <BabyMovementTrackerForm />
      </div>
    </BasePageLayout>
  );
}
