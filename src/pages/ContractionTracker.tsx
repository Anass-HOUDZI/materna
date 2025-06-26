
import { ContractionTrackerForm } from "@/components/tools/ContractionTrackerForm";
import OptimizedToolPageLayout from "@/components/ui/OptimizedToolPageLayout";
import OptimizedCard from "@/components/ui/OptimizedCard";

export default function ContractionTracker() {
  return (
    <OptimizedToolPageLayout
      crumbs={[
        { label: "Tracker Contractions Intelligent" },
      ]}
      title="Tracker Contractions Intelligent"
      description="Suivi intelligent : enregistrez vos contractions et recevez des recommandations médicales en temps réel."
    >
      <OptimizedCard variant="elevated" size="lg">
        <ContractionTrackerForm />
      </OptimizedCard>
    </OptimizedToolPageLayout>
  );
}
