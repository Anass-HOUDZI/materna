
import React from "react";
import { AccordionSimple, AccordionSimpleItem } from "@/components/ui/accordion-simple";
import Footer from "@/components/ui/Footer";
import FamilyIllustration from "@/components/home/FamilyIllustration";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Layout } from "@/components/ui/Layout";
import CategoryCard from "@/components/ui/CategoryCard";
import ToolCard from "@/components/ui/ToolCard";
import { CATEGORIES, TOOLS_DATA } from "@/data/categories";
import { useFavorites } from "@/hooks/useFavorites";
import { ChevronDown, Filter } from "lucide-react";

const HERO_CONTENT = {
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

const FAQ_DATA = [
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

const HeroSection = React.memo(() => (
  <div className="text-center py-16 mobile-s:py-20 sm:py-24">
    <div className="animate-fade-in mb-8">
      <FamilyIllustration className="w-full max-w-xs mobile-s:max-w-sm sm:max-w-md mx-auto" />
    </div>
    
    <Layout direction="column" gap="lg" align="center" className="animate-fade-in">
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                      text-blue-700 rounded-full text-sm font-semibold border border-blue-200/50 backdrop-blur-sm">
        <span className="text-yellow-500" aria-hidden="true">⭐</span>
        <span>Suite complète gratuite et professionnelle</span>
      </div>
      
      <h1 className="text-4xl mobile-s:text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight tracking-tight">
        {HERO_CONTENT.title}
        <span className="block text-3xl mobile-s:text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold mt-2">
          {HERO_CONTENT.subtitle}
        </span>
      </h1>
      
      <p className="text-xl mobile-s:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
        {HERO_CONTENT.description}
      </p>
      
      <Layout direction="row" gap="md" justify="center" wrap className="mt-8">
        <Button 
          size="lg"
          onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
          icon={<span aria-hidden="true">🔍</span>}
          className="gap-3"
        >
          Découvrir les outils
        </Button>
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 
                       text-slate-700 rounded-2xl font-semibold text-lg shadow-md">
          <span className="text-green-500" aria-hidden="true">⚡</span>
          <span>100% Gratuit</span>
        </div>
      </Layout>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto">
        {HERO_CONTENT.features.map((feature, index) => (
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
    </Layout>
  </div>
));

const Index = React.memo(() => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [showMobileFilter, setShowMobileFilter] = React.useState(false);
  
  const favoriteTools = TOOLS_DATA.filter(tool => favorites.includes(tool.link)).slice(0, 8);
  const filteredTools = selectedCategory === "all" 
    ? TOOLS_DATA 
    : TOOLS_DATA.filter(tool => tool.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="w-full max-w-7xl mx-auto px-4 mobile-s:px-6 sm:px-8 pt-safe-top pb-safe-bottom">
        <HeroSection />

        {/* Mobile Filter */}
        <div className="block sm:hidden mb-6">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            icon={<Filter size={18} />}
            className="justify-between"
          >
            <span>Filtrer par catégorie</span>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform duration-300 ${showMobileFilter ? 'rotate-180' : ''}`}
            />
          </Button>
          
          {showMobileFilter && (
            <Card variant="glass" size="sm" className="mt-2 animate-scale-in">
              <Layout direction="column" gap="xs">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => {
                    setSelectedCategory("all");
                    setShowMobileFilter(false);
                  }}
                  className={selectedCategory === "all" ? "bg-blue-50 text-blue-700" : ""}
                >
                  Toutes les catégories
                </Button>
                {CATEGORIES.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    fullWidth
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowMobileFilter(false);
                    }}
                    className={selectedCategory === category.id ? "bg-blue-50 text-blue-700" : ""}
                    icon={React.createElement(category.icon, { size: 18 })}
                  >
                    {category.title}
                  </Button>
                ))}
              </Layout>
            </Card>
          )}
        </div>

        {/* Categories Section */}
        {CATEGORIES.length > 0 && (
          <Layout direction="column" gap="3xl" id="categories">
            <Layout direction="column" gap="lg" align="center" className="text-center">
              <h2 className="text-3xl mobile-s:text-4xl sm:text-5xl font-bold text-slate-800">
                Découvrez nos catégories
              </h2>
              <p className="text-lg mobile-s:text-xl text-slate-600 max-w-3xl font-medium">
                Chaque catégorie regroupe des outils spécialisés pour répondre à vos besoins spécifiques
              </p>
            </Layout>

            {/* Desktop Category Filter */}
            <div className="hidden sm:flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === "all" ? "primary" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                Toutes les catégories
              </Button>
              {CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "primary" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  icon={React.createElement(category.icon, { size: 18 })}
                >
                  {category.title}
                </Button>
              ))}
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
          </Layout>
        )}

        {/* Tools Section */}
        <Layout direction="column" gap="2xl">
          <Layout direction="column" gap="md" align="center" className="text-center">
            <h2 className="text-3xl mobile-s:text-4xl font-bold text-slate-800">
              {selectedCategory === "all" ? "Tous nos outils" : 
               `Outils ${CATEGORIES.find(c => c.id === selectedCategory)?.title || ""}`}
            </h2>
            <p className="text-slate-600 font-medium">
              {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} disponible{filteredTools.length > 1 ? 's' : ''}
            </p>
          </Layout>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool) => (
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
        </Layout>

        {/* Favorite Tools Section */}
        {favoriteTools.length > 0 && (
          <Layout direction="column" gap="2xl">
            <Layout direction="column" gap="md" align="center" className="text-center">
              <h2 className="text-2xl mobile-s:text-3xl font-bold text-slate-800">
                Vos outils favoris
              </h2>
              <p className="text-slate-600 font-medium">
                Accédez rapidement à vos outils préférés
              </p>
            </Layout>

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
          </Layout>
        )}

        {/* FAQ Section */}
        <Layout direction="column" gap="2xl" className="w-full max-w-4xl mx-auto">
          <h2 className="text-3xl mobile-s:text-4xl font-bold text-center text-slate-800">
            Questions fréquentes
          </h2>
          
          <Card variant="glass" size="lg" className="animate-fade-in">
            <AccordionSimple>
              {FAQ_DATA.map((item, index) => (
                <AccordionSimpleItem key={index} title={item.question}>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {item.answer}
                  </p>
                </AccordionSimpleItem>
              ))}
            </AccordionSimple>
          </Card>
        </Layout>
      </div>
      
      <Footer />
    </div>
  );
});

Index.displayName = "Index";

export default Index;
