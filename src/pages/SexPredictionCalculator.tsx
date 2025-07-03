
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Baby } from "lucide-react";
import BasePageLayout from "@/components/ui/BasePageLayout";
import BaseToolForm from "@/components/tools/BaseToolForm";
import { Button } from "@/components/ui/Button";
import { Layout } from "@/components/ui/Layout";

const EXPLANATIONS = [
  "Résultat basé sur des traditions populaires !",
  "Sélectionnez le bouton et découvrez le verdict fun du jour.",
  "🤭 Fiabilité scientifique : 50% ! Utilisez pour s'amuser en famille…"
];

export default function SexPredictionCalculator() {
  const [prediction, setPrediction] = useState<null | "Fille" | "Garçon">(null);

  const getRandomPrediction = React.useCallback(() => {
    setPrediction(Math.random() < 0.5 ? "Fille" : "Garçon");
  }, []);

  return (
    <BasePageLayout
      crumbs={[
        { label: "Calculateur Probabilité Sexe Bébé" },
      ]}
      title="Calculateur Probabilité Sexe Bébé"
      description="Amusez-vous en famille avec ce calculateur ludique basé sur les traditions populaires. Fiabilité : 50% ! 😄"
      maxWidth="xl"
    >
      <BaseToolForm
        title="Prédiction Amusante"
        description="Un moment de détente et de plaisir en attendant l'échographie officielle"
      >
        <Layout direction="column" gap="lg" align="center" className="text-center">
          <div className="p-8 bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl">
            <Baby size={80} className="mx-auto text-primary mb-6 drop-shadow-lg" />
            
            <Layout direction="column" gap="md">
              {EXPLANATIONS.map((line, i) => (
                <p key={i} className="text-lg mobile-s:text-xl text-slate-600 leading-relaxed">
                  {line}
                </p>
              ))}
            </Layout>
            
            <Button
              onClick={getRandomPrediction}
              size="lg"
              variant="primary"
              className="mt-8"
              fullWidth
            >
              Découvrir mon verdict 🎲
            </Button>
          </div>

          {prediction && (
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
              <div className={`text-4xl mobile-s:text-5xl font-bold mb-4 ${
                prediction === "Fille" ? "text-pink-500" : "text-blue-500"
              }`}>
                {prediction} !
              </div>
              <Badge variant="secondary" className="text-lg px-6 py-3 rounded-full shadow-md">
                Juste pour le fun ! 🎉
              </Badge>
            </div>
          )}
        </Layout>
      </BaseToolForm>
    </BasePageLayout>
  );
}
