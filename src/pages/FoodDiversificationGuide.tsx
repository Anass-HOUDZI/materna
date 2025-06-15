import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FoodDiversificationTabs from "@/components/tools/FoodDiversificationTabs";
import Footer from "@/components/ui/Footer";

export default function FoodDiversificationGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="flex flex-1 justify-center items-center bg-background py-10 px-2 animate-fade-in">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Guide Diversification Alimentaire</CardTitle>
              <div className="text-muted-foreground text-sm mt-2">
                Conseils d’experts et recettes validées par des nutritionnistes pédiatriques, pour accompagner chaque étape de l’introduction des aliments solides, en toute sécurité et avec plaisir.
              </div>
            </CardHeader>
            <CardContent>
              <FoodDiversificationTabs />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
