import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FoodDiversificationTabs from "@/components/tools/FoodDiversificationTabs";
import Footer from "@/components/ui/Footer";
import PageHeader from "@/components/ui/PageHeader";

export default function FoodDiversificationGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader crumbs={[
        { href: "/enfant", label: "Enfant" },
        { label: "Guide Diversification Alimentaire" },
      ]} />
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-yellow-50 via-white to-green-50 py-10 px-3 animate-fade-in">
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-green-100 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-green-800">
              Guide Diversification Alimentaire
            </CardTitle>
            <div className="text-muted-foreground text-sm mt-2">
              Conseils d’experts et recettes validées par des nutritionnistes pédiatriques, pour accompagner chaque étape de l’introduction des aliments solides, en toute sécurité et avec plaisir.
            </div>
          </CardHeader>
          <CardContent>
            <FoodDiversificationTabs />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
