
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import BreastfeedingTabs from "@/components/tools/BreastfeedingTabs";

export default function BreastfeedingGuide() {
  return (
    <div className="flex flex-1 justify-center items-center bg-background py-10 px-2 animate-fade-in">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Guide Allaitement Complet</CardTitle>
          <div className="text-muted-foreground text-sm mt-2">
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
