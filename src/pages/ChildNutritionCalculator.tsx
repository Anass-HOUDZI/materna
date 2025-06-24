
import React from "react";
import ChildNutritionCalculatorForm from "@/components/tools/ChildNutritionCalculatorForm";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function ChildNutritionCalculator() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Calculateur Besoins Nutritionnels Enfant" },
      ]}
      title="Calculateur Besoins Nutritionnels Enfant"
      description="Calculez les besoins énergétiques et macronutriments quotidiens d'un enfant en fonction de son âge, poids, sexe et activité, avec des suggestions d'aliments équilibrés selon les recommandations OMS/ANSES."
    >
      <ToolCard variant="elevated" size="lg">
        <ChildNutritionCalculatorForm />
      </ToolCard>
    </ToolPageLayout>
  );
}
