
import React from "react";
import ChildNutritionCalculatorForm from "@/components/tools/ChildNutritionCalculatorForm";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function ChildNutritionCalculator() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Calculateur Besoins Nutritionnels Enfant" },
      ]}
      title="Calculateur Besoins Nutritionnels Enfant"
      description="Calculez les besoins nutritionnels personnalisés de votre enfant selon les recommandations OMS/ANSES avec des suggestions d'aliments équilibrés."
      maxWidth="xl"
    >
      <BaseToolForm
      >
        <ChildNutritionCalculatorForm />
      </BaseToolForm>
    </BasePageLayout>
  );
}
