
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ChildNutritionCalculatorForm from "@/components/tools/ChildNutritionCalculatorForm";

export default function ChildNutritionCalculator() {
  return (
    <div className="flex flex-1 justify-center items-center bg-background py-10 px-2 animate-fade-in">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>Calculateur Besoins Nutritionnels Enfant</CardTitle>
          <div className="text-muted-foreground text-sm mt-2">
            Calculez les besoins énergétiques et macronutriments quotidiens d’un enfant en fonction de son âge, poids, sexe et activité, avec des suggestions d’aliments équilibrés selon les recommandations OMS/ANSES.
          </div>
        </CardHeader>
        <CardContent>
          <ChildNutritionCalculatorForm />
        </CardContent>
      </Card>
    </div>
  );
}
