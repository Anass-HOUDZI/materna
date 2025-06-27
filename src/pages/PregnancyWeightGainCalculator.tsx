
import React from "react";
import { PregnancyWeightGainCalculatorForm } from "@/components/tools/PregnancyWeightGainCalculatorForm";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function PregnancyWeightGainCalculator() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Calculateur Prise de Poids Grossesse" },
      ]}
      title="Calculateur Prise de Poids Grossesse"
      description="Suivez votre prise de poids pendant la grossesse selon les recommandations médicales IOM/HAS personnalisées à votre profil."
      maxWidth="xl"
    >
      <BaseToolForm
        title="Suivi Personnalisé"
        description="Surveillez votre prise de poids selon les recommandations médicales"
      >
        <PregnancyWeightGainCalculatorForm />
      </BaseToolForm>
    </BasePageLayout>
  );
}
