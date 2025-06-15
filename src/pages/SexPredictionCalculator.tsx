import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Baby } from "lucide-react";
import Footer from "@/components/ui/Footer";

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-3 pb-10 pt-8 bg-gradient-to-b from-accent to-background">
        <section className="w-full flex flex-col justify-center items-center mb-12 max-w-2xl">
          <div className="flex flex-col items-center gap-6">
            <Baby size={64} className="text-primary animate-fade-in drop-shadow-2xl" />
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-primary text-center drop-shadow-lg">
              Calculateur&nbsp;<br className="hidden md:inline" />
              Probabilité Sexe Bébé
            </h1>
          </div>
          <div className="mt-10 space-y-3">
            {explanations.map((line, i) => (
              <p key={i} className="text-lg md:text-xl text-muted-foreground text-center">
                {line}
              </p>
            ))}
          </div>
          <Button
            onClick={getRandomPrediction}
            className="mt-10 px-8 py-4 text-lg rounded-full shadow-lg animate-fade-in"
            size="lg"
          >
            Découvrir mon verdict&nbsp;🎲
          </Button>
        </section>

        {prediction && (
          <div className="mt-8 flex flex-col items-center">
            <div className={`text-3xl md:text-4xl font-bold ${prediction === "Fille" ? "text-pink-500" : "text-blue-500"} drop-shadow-lg`}>
              {prediction}
            </div>
            <Badge variant="secondary" className="mt-3 text-base px-4 py-2 rounded-full shadow">
              Juste pour le fun !
            </Badge>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
