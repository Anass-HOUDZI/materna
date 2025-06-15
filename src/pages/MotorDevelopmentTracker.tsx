
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotorDevelopmentTrackerForm from "@/components/tools/MotorDevelopmentTrackerForm";

export default function MotorDevelopmentTracker() {
  return (
    <div className="flex flex-1 justify-center items-center bg-background py-10 px-2 animate-fade-in">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>Tracker Développement Moteur 0-3 ans</CardTitle>
          <div className="text-muted-foreground text-sm mt-2">
            Évaluez les principales acquisitions motrices de votre enfant selon son âge entre 1 et 36 mois, selon les références scientifiques internationales.
          </div>
        </CardHeader>
        <CardContent>
          <MotorDevelopmentTrackerForm />
        </CardContent>
      </Card>
    </div>
  );
}
