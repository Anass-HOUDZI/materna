
import React from "react";
import PregnancySymptomJournalForm from "@/components/tools/PregnancySymptomJournalForm";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function PregnancySymptomJournal() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Journal Symptômes Grossesse" },
      ]}
      title="Journal des Symptômes de Grossesse"
      description="Documentez votre grossesse au quotidien : symptômes, humeurs et événements marquants pour un suivi optimal avec votre professionnel de santé."
      maxWidth="xl"
    >
      <BaseToolForm
      >
        <PregnancySymptomJournalForm />
      </BaseToolForm>
    </BasePageLayout>
  );
}
