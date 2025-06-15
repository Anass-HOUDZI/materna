
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ChildNutritionCalculatorForm from "@/components/tools/ChildNutritionCalculatorForm";
import Footer from "@/components/ui/Footer";

export default function ChildNutritionCalculator() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-orange-50 via-white to-blue-50 py-10 px-2 animate-fade-in">
        <Card className="w-full max-w-lg shadow-xl rounded-2xl border-orange-100 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-orange-900">
              Calculateur Besoins Nutritionnels Enfant
            </CardTitle>
            <div className="text-muted-foreground text-sm mt-2">
              Calculez les besoins énergétiques et macronutriments quotidiens d’un enfant en fonction de son âge, poids, sexe et activité, avec des suggestions d’aliments équilibrés selon les recommandations OMS/ANSES.
            </div>
          </CardHeader>
          <CardContent>
            <ChildNutritionCalculatorForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
