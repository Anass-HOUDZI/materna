
import { ContractionTrackerForm } from "@/components/tools/ContractionTrackerForm";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function ContractionTracker() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Tracker Contractions Intelligent" },
      ]}
      title="Tracker Contractions Intelligent"
      description="Suivi intelligent : enregistrez vos contractions et recevez des recommandations médicales en temps réel."
    >
      <ToolCard variant="elevated" size="lg">
        <ContractionTrackerForm />
      </ToolCard>
    </ToolPageLayout>
  );
}
