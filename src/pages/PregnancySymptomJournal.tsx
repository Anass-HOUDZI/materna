
import PregnancySymptomJournalForm from "@/components/tools/PregnancySymptomJournalForm";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function PregnancySymptomJournal() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Journal Symptômes Grossesse" },
      ]}
      title="Journal des Symptômes de Grossesse"
      description="Notez quotidiennement vos symptômes, humeurs et événements marquants de votre grossesse. Suivez les tendances, identifiez les facteurs déclencheurs et partagez ces informations avec votre professionnel de santé."
    >
      <ToolCard variant="elevated" size="lg">
        <PregnancySymptomJournalForm />
      </ToolCard>
    </ToolPageLayout>
  );
}
