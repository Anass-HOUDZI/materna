
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
import { ChevronDown, Filter } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [showMobileFilter, setShowMobileFilter] = React.useState(false);
  
  // Outils favoris pour affichage prioritaire
  const favoriteTools = TOOLS_DATA.filter(tool => favorites.includes(tool.link)).slice(0, 8);
  const hasCategories = CATEGORIES.length > 0;

  // Filter tools based on selected category
  const filteredTools = selectedCategory === "all" 
    ? TOOLS_DATA 
    : TOOLS_DATA.filter(tool => tool.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="w-full max-w-7xl mx-auto px-4 mobile-s:px-6 sm:px-8 pt-safe-top pb-safe-bottom">
        {/* Hero Section - Modernized */}
        <div className="text-center py-16 mobile-s:py-20 sm:py-24">
          <div className="animate-fade-in mb-8">
            <FamilyIllustration className="w-full max-w-xs mobile-s:max-w-sm sm:max-w-md mx-auto" />
          </div>
          
          <div className="animate-fade-in space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                            text-blue-700 rounded-full text-sm font-semibold border border-blue-200/50 backdrop-blur-sm">
              <span className="text-yellow-500" aria-hidden="true">⭐</span>
              <span>Suite complète gratuite et professionnelle</span>
            </div>
            
            <h1 className="text-4xl mobile-s:text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight tracking-tight">
              {WELCOME_CONTENT.title}
              <span className="block text-3xl mobile-s:text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold mt-2">
                {WELCOME_CONTENT.subtitle}
              </span>
            </h1>
            
            <p className="text-xl mobile-s:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              {WELCOME_CONTENT.description}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button 
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                         hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-semibold text-lg 
                         transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25
                         focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2"
                aria-label="Découvrir les outils disponibles"
              >
                <span aria-hidden="true">🔍</span>
                <span>Découvrir les outils</span>
              </button>
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 
                             text-slate-700 rounded-2xl font-semibold text-lg shadow-md">
                <span className="text-green-500" aria-hidden="true">⚡</span>
                <span>100% Gratuit</span>
              </div>
            </div>

            {/* Features Highlights - Enhanced */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto">
              {WELCOME_CONTENT.features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 
                           shadow-sm hover:bg-white/80 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Dropdown */}
        <div className="block sm:hidden mb-6">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm 
                     border border-slate-200 rounded-xl text-slate-700 font-medium shadow-sm
                     hover:bg-white hover:shadow-md transition-all duration-300"
            aria-expanded={showMobileFilter}
            aria-controls="mobile-filter-menu"
          >
            <div className="flex items-center gap-2">
              <Filter size={18} aria-hidden="true" />
              <span>Filtrer par catégorie</span>
            </div>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform duration-300 ${showMobileFilter ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          
          {showMobileFilter && (
            <div 
              id="mobile-filter-menu"
              className="mt-2 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg 
                       animate-fade-in overflow-hidden"
            >
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setShowMobileFilter(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-200 ${
                  selectedCategory === "all" ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700"
                }`}
              >
                Toutes les catégories
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setShowMobileFilter(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-200 ${
                    selectedCategory === category.id ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {React.createElement(category.icon, { size: 18, "aria-hidden": true })}
                    <span>{category.title}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Categories Section - Enhanced */}
        {hasCategories && (
          <div id="categories" className="w-full space-y-12">
            <div className="text-center">
              <h2 className="text-3xl mobile-s:text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
                Découvrez nos catégories
              </h2>
              <p className="text-lg mobile-s:text-xl text-slate-600 max-w-3xl mx-auto font-medium">
                Chaque catégorie regroupe des outils spécialisés pour répondre à vos besoins spécifiques
              </p>
            </div>

            {/* Desktop Category Filter */}
            <div className="hidden sm:flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white/80 text-slate-700 hover:bg-white hover:shadow-md border border-slate-200"
                }`}
              >
                Toutes les catégories
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-white/80 text-slate-700 hover:bg-white hover:shadow-md border border-slate-200"
                  }`}
                >
                  {React.createElement(category.icon, { size: 18, "aria-hidden": true })}
                  <span>{category.title}</span>
                </button>
              ))}
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  href={category.href}
                  icon={React.createElement(category.icon, { size: 32, "aria-hidden": true })}
                  toolCount={category.tools.length}
                  gradient={category.gradient}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tools Section - Enhanced with filtering */}
        <div className="w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl mobile-s:text-4xl font-bold text-slate-800 mb-2">
              {selectedCategory === "all" ? "Tous nos outils" : 
               `Outils ${CATEGORIES.find(c => c.id === selectedCategory)?.title || ""}`}
            </h2>
            <p className="text-slate-600 font-medium">
              {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} disponible{filteredTools.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                title={tool.label}
                description={tool.description}
                href={tool.link}
                icon={React.createElement(tool.icon, { size: 24, "aria-hidden": true })}
                gradient={tool.gradient}
                isFavorite={isFavorite(tool.link)}
                onToggleFavorite={() => toggleFavorite(tool.link)}
                difficulty={tool.difficulty}
                rating={tool.rating}
              />
            ))}
          </div>
        </div>

        {/* Favorite Tools Section - Enhanced */}
        {favoriteTools.length > 0 && (
          <div className="w-full space-y-8">
            <div className="text-center">
              <h2 className="text-2xl mobile-s:text-3xl font-bold text-slate-800 mb-2">
                Vos outils favoris
              </h2>
              <p className="text-slate-600 font-medium">
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
                  icon={React.createElement(tool.icon, { size: 24, "aria-hidden": true })}
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

        {/* FAQ Section - Enhanced */}
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl mobile-s:text-4xl font-bold text-center text-slate-800">
            Questions fréquentes
          </h2>
          
          <BaseCard 
            variant="glass" 
            size="lg"
            className="w-full animate-fade-in"
            style={{
              background: "linear-gradient(135deg, rgba(248, 250, 252, 0.95) 60%, rgba(241, 245, 249, 0.95) 100%)"
            }}
          >
            <AccordionSimple>
              {FAQ_ITEMS.map((item, index) => (
                <AccordionSimpleItem key={index} title={item.question}>
                  <p className="text-slate-700 leading-relaxed font-medium">
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
