
import { DueDateCalculatorForm } from "@/components/tools/DueDateCalculatorForm";
import OptimizedToolPageLayout from "@/components/ui/OptimizedToolPageLayout";
import OptimizedCard from "@/components/ui/OptimizedCard";

export default function PregnancyDueDateCalculator() {
  return (
    <OptimizedToolPageLayout
      crumbs={[
        { label: "Calculateur de Date d'Accouchement" },
      ]}
      title="Calculateur de Date d'Accouchement"
      description="Estimez la date de votre accouchement facilement, méthode médicale Naegele (standard)."
    >
      <OptimizedCard variant="elevated" size="lg">
        <DueDateCalculatorForm />
      </OptimizedCard>
    </OptimizedToolPageLayout>
  );
}
