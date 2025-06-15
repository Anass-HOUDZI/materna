
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Baby } from "lucide-react";

const explanations = [
  "Résultat basé sur des traditions populaires !",
  "Sélectionnez le bouton et découvrez le verdict fun du jour.",
  "🤭 Fiabilité scientifique : 50% ! Utilisez pour s'amuser en famille…"
];

export default function SexPredictionCalculator() {
  const [prediction, setPrediction] = useState<null | "Fille" | "Garçon">(null);

  function getRandomPrediction() {
    setPrediction(Math.random() < 0.5 ? "Fille" : "Garçon");
  }

  return (
    <div className="w-full max-w-md mx-auto py-10 flex flex-col items-center">
      <div className="flex items-center mb-4 gap-2">
        <Baby />
        <h1 className="text-3xl font-bold">Calculateur Probabilité Sexe Bébé</h1>
      </div>

      {explanations.map((line, i) => (
        <p key={i} className="text-muted-foreground text-center mb-2">{line}</p>
      ))}

      <Button onClick={getRandomPrediction} className="my-6" size="lg">
        Découvrir mon verdict&nbsp;🎲
      </Button>

      {prediction && (
        <div className="mt-6 flex flex-col items-center">
          <div className={`text-2xl font-bold ${prediction === "Fille" ? "text-pink-500" : "text-blue-500"}`}>
            {prediction}
          </div>
          <Badge variant="secondary" className="mt-2">Juste pour le fun !</Badge>
        </div>
      )}

      <div className="mt-8 p-3 bg-accent rounded text-center text-sm border">
        <strong>Disclaimer&nbsp;:</strong> Le seul moyen fiable est l'échographie médicale.
      </div>
    </div>
  );
}
