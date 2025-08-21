
import React from "react";
import TeethingTable from "@/components/tools/TeethingTable";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";

export default function TeethingCalculator() {
  return (
    <BasePageLayout
      crumbs={[
        { label: "Calculateur Poussées Dentaires" },
      ]}
      title="Calculateur Poussées Dentaires"
      description="Anticipez et accompagnez les poussées dentaires de votre bébé avec le calendrier des 20 dents primaires et nos conseils adaptés."
      maxWidth="xl"
    >
      <BaseToolForm
      >
        <TeethingTable />
      </BaseToolForm>
    </BasePageLayout>
  );
}
