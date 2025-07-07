
import React from "react";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";
import BudgetSimulatorForm from "@/components/tools/BudgetSimulatorForm";

export default function BabyBudgetSimulator() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Simulateur Budget Bébé Année 1" },
      ]}
      title="Simulateur Budget Bébé Année 1"
      description="Anticipez et optimisez votre budget bébé avec des simulations précises basées sur les données officielles INSEE et CAF."
      maxWidth="xl"
    >
      <BaseToolForm
        title="Planification Budgétaire"
        description="Préparez sereinement l'arrivée de votre bébé"
      >
        <BudgetSimulatorForm />
      </BaseToolForm>
    </BasePageLayout>
  );
}
