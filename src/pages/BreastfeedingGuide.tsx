
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import BreastfeedingTabs from "@/components/tools/BreastfeedingTabs";

export default function BreastfeedingGuide() {
  return (
    <div className="flex flex-1 justify-center items-center bg-gradient-to-br from-fuchsia-50 via-white to-pink-100 py-10 px-2 animate-fade-in">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-fuchsia-100 bg-white/90">
        <CardHeader>
          <div className="flex items-center gap-4 mb-2">
            <Search size={32} className="text-fuchsia-500 drop-shadow-sm" />
            <CardTitle className="text-2xl md:text-3xl font-bold text-fuchsia-900">
              Guide Allaitement Complet
            </CardTitle>
          </div>
          <div className="text-muted-foreground text-sm mt-1 font-medium">
            Diagnostic interactif, conseils d’experts, tracking, et bientôt communauté&nbsp;: toutes les ressources dont vous avez besoin pour allaiter en confiance, validées par des consultantes IBCLC.
          </div>
        </CardHeader>
        <CardContent>
          <BreastfeedingTabs />
        </CardContent>
      </Card>
    </div>
  );
}
