
import React from "react";
import CryingMoodTabs from "@/components/tools/CryingMoodTabs";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function CryingMoodTracker() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Tracker Pleurs & Humeur Bébé" },
      ]}
      title="Tracker Pleurs & Humeur Bébé"
      description="Suivez les épisodes de pleurs et d'humeur de votre bébé pour mieux comprendre ses besoins et accompagner toute la famille."
      maxWidth="xl"
    >
      <BaseToolForm
      >
        <CryingMoodTabs />
      </BaseToolForm>
    </BasePageLayout>
  );
}
