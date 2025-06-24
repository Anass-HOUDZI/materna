
import { BabyMovementTrackerForm } from "@/components/tools/BabyMovementTrackerForm";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function BabyMovementTracker() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Tracker Mouvements Bébé" },
      ]}
      title="Tracker Mouvements Bébé"
      description="Comptabilisez les mouvements fœtaux selon la méthode Cardiff/Sadovsky/Moore. Soyez alertée en cas de changement ou diminution inhabituelle."
    >
      <ToolCard variant="elevated" size="lg">
        <BabyMovementTrackerForm />
      </ToolCard>
    </ToolPageLayout>
  );
}
