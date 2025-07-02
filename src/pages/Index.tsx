
import React from "react";
import { AccordionSimple, AccordionSimpleItem } from "@/components/ui/accordion-simple";
import Footer from "@/components/ui/Footer";
import FamilyIllustration from "@/components/home/FamilyIllustration";
import OptimizedToolsGrid from "@/components/home/OptimizedToolsGrid";
import BaseLayout from "@/components/layout/BaseLayout";
import BaseCard from "@/components/ui/BaseCard";

const WELCOME_CONTENT = {
  title: "MomTech Suite",
  subtitle: "Suite complète et gratuite",
  description: "50 outils santé, grossesse, bébé, sécurité et parentalité 100% offline, gratuits, privacy-first.",
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 text-blue-700 rounded-full text-sm font-medium mb-4">
              ⭐ 50 outils SEO gratuits et professionnels
            </div>
            
            <h1 className="text-5xl mobile-s:text-6xl sm:text-7xl lg:text-8xl font-bold 
                           text-slate-900 leading-tight tracking-tight mb-4">
              {WELCOME_CONTENT.title}
              <span className="block text-4xl mobile-s:text-5xl sm:text-6xl lg:text-7xl 
                               bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent font-bold">
                {WELCOME_CONTENT.subtitle}
              </span>
            </h1>
            
            <p className="text-xl mobile-s:text-2xl sm:text-3xl text-slate-600 max-w-5xl leading-relaxed font-medium text-center">
              {WELCOME_CONTENT.description}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                🔍 Découvrir les outils
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105">
                ⚡ 100% Gratuit
              </button>
            </div>

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
