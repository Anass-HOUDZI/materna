
import React from "react";
import { ContractionTrackerForm } from "@/components/tools/ContractionTrackerForm";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function ContractionTracker() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Tracker Contractions Intelligent" },
      ]}
      title="Tracker Contractions Intelligent"
      description="Suivez vos contractions en temps réel et recevez des recommandations personnalisées pour savoir quand vous rendre à la maternité."
      maxWidth="xl"
    >
      <BaseToolForm
        title="Suivi des Contractions"
        description="Enregistrez la durée et l'intensité de vos contractions pour une analyse précise"
      >
        <ContractionTrackerForm />
      </BaseToolForm>
    </BasePageLayout>
  );
}
