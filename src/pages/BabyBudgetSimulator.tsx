
import { FileBarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ToolCard from "@/components/ui/ToolCard";

export default function BabyBudgetSimulator() {
  return (
    <ToolPageLayout
      crumbs={[
        { label: "Simulateur Budget Bébé Année 1" },
      ]}
      title="Simulateur Budget Bébé Année 1"
      description="Prévoyez les dépenses de la première année de bébé avec un outil ultra-précis, basé sur les données officielles INSEE et CAF."
    >
      <ToolCard variant="elevated" size="lg">
        <div className="text-center space-y-8">
          <FileBarChart2 size={80} className="mx-auto text-blue-600 animate-fade-in drop-shadow-lg" />
          
          <div className="space-y-6">
            <p className="text-lg mobile-s:text-xl text-slate-600 leading-relaxed">
              Renseignez votre profil familial et explorez différents scénarios pour optimiser votre budget, anticiper les postes de coûts et limiter les surprises financières.
            </p>
            
            <div className="flex items-center gap-4 justify-center flex-wrap">
              <Badge variant="secondary" className="text-base px-6 py-3 rounded-full shadow-md">
                Sortie prochaine !
              </Badge>
              <span className="text-base text-slate-500">
                Fonctionnalités professionnelles en cours de développement.
              </span>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 
                          rounded-3xl border border-blue-200/50 shadow-lg">
            <h3 className="font-bold text-xl mb-6 text-slate-800">À venir :</h3>
            <ul className="text-left list-disc list-inside space-y-3 text-slate-600 text-base leading-relaxed">
              <li>Simulation personnalisée selon votre profil et mode de garde</li>
              <li>Estimation des 15 postes de dépenses principaux</li>
              <li>Scénarios standard, minimaliste, premium, éco...</li>
              <li>Conseils pour optimiser votre budget bébé</li>
              <li>Export PDF du rapport budgétaire</li>
            </ul>
          </div>
        </div>
      </ToolCard>
    </ToolPageLayout>
  );
}
