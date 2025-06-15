
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TeethingTable from "@/components/tools/TeethingTable";
import Footer from "@/components/ui/Footer";

export default function TeethingCalculator() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-sky-50 via-white to-yellow-50 py-10 px-2 animate-fade-in">
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-yellow-100 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-yellow-800">
              Calculateur Poussées Dentaires
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-2">
              Visualisez le planning classique des 20 dents primaires, suivez la sortie de chaque dent et découvrez les conseils adaptés pour accompagner votre bébé pendant cette période clé.
            </div>
          </CardHeader>
          <CardContent>
            <TeethingTable />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
