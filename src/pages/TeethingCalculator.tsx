
import React from "react";
import TeethingTable from "@/components/tools/TeethingTable";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function TeethingCalculator() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Calculateur Poussées Dentaires" },
      ]}
      title="Calculateur Poussées Dentaires"
      description="Visualisez le planning classique des 20 dents primaires, suivez la sortie de chaque dent et découvrez les conseils adaptés pour accompagner votre bébé pendant cette période clé."
    >
      <ToolCard variant="elevated" size="lg">
        <TeethingTable />
      </ToolCard>
    </ToolPageLayout>
  );
}
