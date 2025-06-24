
import { PregnancyWeightGainCalculatorForm } from "@/components/tools/PregnancyWeightGainCalculatorForm";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function PregnancyWeightGainCalculator() {
  return (
    <ToolPageLayout
      crumbs={[
        { href: "/grossesse", label: "Grossesse" },
        { label: "Calculateur Prise de Poids" },
      ]}
      title="Calculateur Prise de Poids Grossesse"
      description="Suivez votre prise de poids pendant la grossesse selon les recommandations médicales personnalisées"
    >
      <ToolCard variant="elevated" size="lg">
        <PregnancyWeightGainCalculatorForm />
      </ToolCard>
    </ToolPageLayout>
  );
}
