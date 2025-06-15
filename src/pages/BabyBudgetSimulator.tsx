import { Baby, FileBarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/ui/Footer";

export default function BabyBudgetSimulator() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full min-h-[80vh] flex flex-col justify-center items-center px-3 pb-12 pt-8 bg-gradient-to-b from-accent to-background">
        <section className="flex flex-col items-center mb-16 max-w-2xl w-full">
          <div className="flex flex-col items-center gap-7">
            <FileBarChart2 size={60} className="text-primary animate-fade-in drop-shadow-2xl" />
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-primary text-center drop-shadow-lg">
              Simulateur&nbsp;<br className="hidden md:inline" />
              Budget Bébé Année 1
            </h1>
          </div>
          <div className="mt-10 space-y-3">
            <p className="text-lg md:text-xl text-muted-foreground text-center">
              Prévoyez les dépenses de la première année de bébé avec un outil ultra-précis, basé sur les données officielles INSEE et CAF.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground text-center">
              Renseignez votre profil familial et explorez différents scénarios pour optimiser votre budget, anticiper les postes de coûts et limiter les surprises financières.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <Badge variant="secondary" className="text-base px-4 py-2 rounded-full shadow">
              Sortie prochaine&nbsp;!
            </Badge>
            <span className="text-base text-muted-foreground">
              Fonctionnalités professionnelles en cours de développement.
            </span>
          </div>
        </section>
        <div className="max-w-xl p-5 md:p-8 bg-accent/60 rounded-2xl border text-center text-base md:text-lg shadow">
          <strong>À venir :</strong> 
          <ul className="mt-3 text-left list-disc list-inside space-y-1 text-muted-foreground text-base">
            <li>Simulation personnalisée selon votre profil et mode de garde</li>
            <li>Estimation des 15 postes de dépenses principaux</li>
            <li>Scénarios standard, minimaliste, premium, éco...</li>
            <li>Conseils pour optimiser votre budget bébé</li>
            <li>Export PDF du rapport budgétaire</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
