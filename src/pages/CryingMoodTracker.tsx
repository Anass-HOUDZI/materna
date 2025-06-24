
import React from "react";
import CryingMoodTabs from "@/components/tools/CryingMoodTabs";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function CryingMoodTracker() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Tracker Pleurs & Humeur Bébé" },
      ]}
      title="Tracker Pleurs & Humeur Bébé"
      description="Enregistrez les épisodes de pleurs ou humeurs de bébé, visualisez tendances et accédez à des conseils bienveillants pour toute la famille."
    >
      <ToolCard variant="elevated" size="lg">
        <CryingMoodTabs />
      </ToolCard>
    </ToolPageLayout>
  );
}
