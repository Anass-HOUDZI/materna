
import { DueDateCalculatorForm } from "@/components/tools/DueDateCalculatorForm";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function PregnancyDueDateCalculator() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Calculateur de Date d'Accouchement" },
      ]}
      title="Calculateur de Date d'Accouchement"
      description="Estimez la date de votre accouchement facilement, méthode médicale Naegele (standard)."
    >
      <ToolCard variant="elevated" size="lg">
        <DueDateCalculatorForm />
      </ToolCard>
    </ToolPageLayout>
  );
}
