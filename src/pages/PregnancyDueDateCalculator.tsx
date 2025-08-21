
import React from "react";
import { DueDateCalculatorForm } from "@/components/tools/DueDateCalculatorForm";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function PregnancyDueDateCalculator() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Calculateur de Date d'Accouchement" },
      ]}
      title="Calculateur de Date d'Accouchement"
      description="Estimez votre date d'accouchement avec précision grâce à la méthode médicale Naegele, adaptée à votre cycle personnel."
      maxWidth="xl"
    >
      <BaseToolForm
      >
        <DueDateCalculatorForm />
      </BaseToolForm>
    </BasePageLayout>
  );
}
