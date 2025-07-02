
import React from "react";
import { AccordionSimple, AccordionSimpleItem } from "@/components/ui/accordion-simple";
import Footer from "@/components/ui/Footer";
import FamilyIllustration from "@/components/home/FamilyIllustration";
import BaseLayout from "@/components/layout/BaseLayout";
import BaseCard from "@/components/ui/BaseCard";
import CategoryCard from "@/components/ui/CategoryCard";
import ToolCard from "@/components/ui/ToolCard";
import { CATEGORIES, TOOLS_DATA } from "@/data/categories";
import { useFavorites } from "@/hooks/useFavorites";

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
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  // Outils favoris pour affichage prioritaire
  const favoriteTools = TOOLS_DATA.filter(tool => favorites.includes(tool.link)).slice(0, 8);
  const hasCategories = CATEGORIES.length > 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30">
      <div className="w-full max-w-7xl mx-auto px-4 mobile-s:px-6 sm:px-8 pt-safe-top pb-safe-bottom">
        {/* Hero Section */}
        <div className="text-center py-16 mobile-s:py-20 sm:py-24">
          <div className="animate-fade-in mb-8">
            <FamilyIllustration className="w-full max-w-xs mobile-s:max-w-sm sm:max-w-md mx-auto" />
          </div>
          
          <div className="animate-fade-in space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100/80 text-blue-700 rounded-full text-sm font-medium">
              ⭐ Suite complète gratuite et professionnelle
            </div>
            
            <h1 className="text-4xl mobile-s:text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
              {WELCOME_CONTENT.title}
              <span className="block text-3xl mobile-s:text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent font-bold mt-2">
                {WELCOME_CONTENT.subtitle}
              </span>
            </h1>
            
            <p className="text-xl mobile-s:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {WELCOME_CONTENT.description}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button 
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🔍 Découvrir les outils
              </button>
              <div className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-semibold text-lg">
                ⚡ 100% Gratuit
              </div>
            </div>

            {/* Features Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto">
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
          </div>
        </div>

        {/* Categories Section */}
        {hasCategories && (
          <div id="categories" className="w-full space-y-12">
            <div className="text-center">
              <h2 className="text-3xl mobile-s:text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                Découvrez nos catégories
              </h2>
              <p className="text-lg mobile-s:text-xl text-slate-600 max-w-3xl mx-auto">
                Chaque catégorie regroupe des outils spécialisés pour répondre à vos besoins spécifiques
              </p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  href={category.href}
                  icon={React.createElement(category.icon, { size: 32 })}
                  toolCount={category.tools.length}
                  gradient={category.gradient}
                />
              ))}
            </div>
          </div>
        )}

        {/* Favorite Tools Section */}
        {favoriteTools.length > 0 && (
          <div className="w-full space-y-8">
            <div className="text-center">
              <h2 className="text-2xl mobile-s:text-3xl font-bold text-slate-900 mb-2">
                Vos outils favoris
              </h2>
              <p className="text-slate-600">
                Accédez rapidement à vos outils préférés
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favoriteTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  title={tool.label}
                  description={tool.description}
                  href={tool.link}
                  icon={React.createElement(tool.icon, { size: 24 })}
                  gradient={tool.gradient}
                  isFavorite={isFavorite(tool.link)}
                  onToggleFavorite={() => toggleFavorite(tool.link)}
                  difficulty={tool.difficulty}
                  rating={tool.rating}
                />
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl mobile-s:text-4xl font-bold text-center text-slate-800">
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
});

Index.displayName = "Index";

export default Index;
