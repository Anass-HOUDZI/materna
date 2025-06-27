
import React from "react";
import { AccordionSimple, AccordionSimpleItem } from "@/components/ui/accordion-simple";
import Footer from "@/components/ui/Footer";
import FamilyIllustration from "@/components/home/FamilyIllustration";
import OptimizedToolsGrid from "@/components/home/OptimizedToolsGrid";
import BaseLayout from "@/components/layout/BaseLayout";
import BaseCard from "@/components/ui/BaseCard";

const WELCOME_CONTENT = {
  title: "Bienvenue sur MomTech Suite 👶",
  subtitle: "50 outils santé, grossesse, bébé, sécurité et parentalité 100% offline, gratuits, privacy-first.",
  features: [
    "Outils médicaux validés scientifiquement",
    "100% offline et privacy-first",
    "Interface optimisée mobile",
    "Données chiffrées localement"
  ]
};

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne la suite ?",
    answer: "50 outils entièrement offline, gratuits, permettant de gérer santé, grossesse et parentalité avec des algorithmes validés médicalement."
  },
  {
    question: "Mes données sont-elles privées ?",
    answer: "Oui, tout est traité en local sur votre appareil, aucune donnée n'est transmise ni stockée à l'extérieur. Vos informations restent 100% privées."
  },
  {
    question: "Comment ajouter aux favoris ?",
    answer: "Cliquez sur l'étoile jaune en haut à droite de chaque outil pour le retrouver en priorité dans votre liste personnalisée."
  },
  {
    question: "L'application fonctionne-t-elle hors ligne ?",
    answer: "Oui, tous les outils fonctionnent entièrement hors ligne une fois l'application chargée. Parfait pour les déplacements ou les zones à faible connexion."
  }
];

const Index = React.memo(() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30">
      <BaseLayout 
        direction="column" 
        gap="xl" 
        align="center" 
        padding="md"
        className="pt-safe-top pb-safe-bottom"
      >
        {/* Hero Section */}
        <BaseLayout 
          direction="column" 
          gap="lg" 
          align="center" 
          maxWidth="2xl" 
          centerContent
          className="text-center"
        >
          <div className="animate-fade-in">
            <FamilyIllustration className="w-full max-w-xs mobile-s:max-w-sm sm:max-w-md mx-auto mb-8" />
          </div>
          
          <BaseLayout direction="column" gap="md" align="center" className="animate-fade-in">
            <h1 className="text-4xl mobile-s:text-5xl sm:text-6xl lg:text-7xl font-bold font-playfair 
                           bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent 
                           leading-tight tracking-tight">
              {WELCOME_CONTENT.title}
            </h1>
            
            <p className="text-xl mobile-s:text-2xl sm:text-3xl text-slate-600 max-w-4xl leading-relaxed font-medium">
              {WELCOME_CONTENT.subtitle}
            </p>

            {/* Features Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
              {WELCOME_CONTENT.features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </BaseLayout>
        </BaseLayout>

        {/* Tools Grid */}
        <div className="w-full max-w-6xl animate-fade-in">
          <OptimizedToolsGrid />
        </div>

        {/* FAQ Section */}
        <BaseLayout 
          direction="column" 
          gap="lg" 
          maxWidth="2xl" 
          centerContent 
          className="w-full"
        >
          <h2 className="text-3xl mobile-s:text-4xl font-bold text-center text-slate-800 mb-4">
            Questions fréquentes
          </h2>
          
          <BaseCard 
            variant="glass" 
            size="lg"
            className="w-full animate-fade-in"
            style={{
              background: "linear-gradient(135deg, rgba(240, 247, 255, 0.95) 60%, rgba(226, 234, 255, 0.95) 100%)"
            }}
          >
            <AccordionSimple>
              {FAQ_ITEMS.map((item, index) => (
                <AccordionSimpleItem key={index} title={item.question}>
                  <p className="text-slate-700 leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionSimpleItem>
              ))}
            </AccordionSimple>
          </BaseCard>
        </BaseLayout>
      </BaseLayout>
      
      <Footer />
    </div>
  );
});

Index.displayName = "Index";

export default Index;
