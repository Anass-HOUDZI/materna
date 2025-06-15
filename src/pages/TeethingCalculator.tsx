
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TeethingTable from "@/components/tools/TeethingTable";

export default function TeethingCalculator() {
  return (
    <div className="flex flex-1 justify-center items-center bg-background px-2 py-10 animate-fade-in">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Calculateur Poussées Dentaires</CardTitle>
          <div className="text-sm text-muted-foreground mt-2">
            Visualisez le planning classique des 20 dents primaires, suivez la sortie de chaque dent et découvrez les conseils adaptés pour accompagner votre bébé pendant cette période clé.
          </div>
        </CardHeader>
        <CardContent>
          <TeethingTable />
        </CardContent>
      </Card>
    </div>
  );
}
