import React, { useMemo, lazy, Suspense } from "react";
import { AccordionSimple, AccordionSimpleItem } from "@/components/ui/accordion-simple";
import Footer from "@/components/ui/Footer";
import { Layout } from "@/components/ui/Layout";
import ModernCard from "@/components/ui/ModernCard";
import CategoryCard from "@/components/ui/CategoryCard";
import { CATEGORIES, TOOLS_DATA } from "@/data/categories";
import { useFavorites } from "@/hooks/useFavorites";
import { ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GRADIENT_STYLES } from "@/utils/performance";

// Lazy load heavy components
const HeroSection = lazy(() => import("@/components/ui/HeroSection"));
const ToolCard = lazy(() => import("@/components/ui/ToolCard"));

const FAQ_DATA = [
  {
    question: "Comment fonctionne la suite ?",
    answer: "15 outils entièrement offline, gratuits, permettant de gérer santé, grossesse et parentalité avec des algorithmes validés médicalement."
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

// Optimized gradient styles
const GRADIENT_CLASS = "bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent";

const Index = React.memo(() => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [showMobileFilter, setShowMobileFilter] = React.useState(false);
  
  // Memoized computations for better performance
  const favoriteTools = useMemo(() => 
    TOOLS_DATA.filter(tool => favorites.includes(tool.link)).slice(0, 8),
    [favorites]
  );
  
  const filteredTools = useMemo(() => 
    selectedCategory === "all" 
      ? TOOLS_DATA 
      : TOOLS_DATA.filter(tool => tool.category === selectedCategory),
    [selectedCategory]
  );

  const categoryTitle = useMemo(() => 
    selectedCategory === "all" 
      ? "Tous nos outils" 
      : `Outils ${CATEGORIES.find(c => c.id === selectedCategory)?.title || ""}`,
    [selectedCategory]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Suspense */}
      <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-lg mb-20" />}>
        <HeroSection className="mb-20" />
      </Suspense>

      <div className="w-full max-w-7xl mx-auto px-4 mobile-s:px-6 sm:px-8 pb-safe-bottom">
        
        {/* Categories Section */}
        <Layout direction="column" gap="2xl" className="mb-20">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Categories individuelles */}
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                href={category.href}
                icon={React.createElement(category.icon, { size: 28 })}
                toolCount={category.tools.length}
                gradient={category.gradient}
              />
            ))}
          </div>
        </Layout>
        
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
            <ModernCard variant="glass" className="mt-2 p-4 animate-scale-in">
              <Layout direction="column" gap="xs">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => {
                    setSelectedCategory("all");
                    setShowMobileFilter(false);
                  }}
                  className={selectedCategory === "all" ? "bg-accent text-accent-foreground" : ""}
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
                    className={selectedCategory === category.id ? "bg-accent text-accent-foreground" : ""}
                    icon={React.createElement(category.icon, { size: 18 })}
                  >
                    {category.title}
                  </Button>
                ))}
              </Layout>
            </ModernCard>
          )}
        </div>

        {/* Tools Section */}
        <Layout direction="column" gap="2xl" id="tools-section" className="my-20">
          <Layout direction="column" gap="md" align="center" className="text-center">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${GRADIENT_CLASS}`}>
              {categoryTitle}
            </h2>
            <p className="text-muted-foreground font-medium">
              {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} disponible{filteredTools.length > 1 ? 's' : ''}
            </p>
          </Layout>

          {filteredTools.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Suspense fallback={
                <div className="col-span-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-64 animate-pulse bg-muted rounded-lg" />
                  ))}
                </div>
              }>
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
              </Suspense>
            </div>
          ) : (
            <ModernCard variant="glass" className="p-12 text-center">
              <div className="space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-xl font-semibold">Aucun outil trouvé</h3>
                <p className="text-muted-foreground">
                  Essayez une autre catégorie ou explorez nos sections
                </p>
              </div>
            </ModernCard>
          )}
        </Layout>

        {/* Favorite Tools Section */}
        {favoriteTools.length > 0 && (
          <Layout direction="column" gap="2xl" className="mb-20">
            <Layout direction="column" gap="md" align="center" className="text-center">
              <h2 className={`text-2xl md:text-3xl font-bold ${GRADIENT_CLASS}`}>
                ⭐ Vos outils favoris
              </h2>
              <p className="text-muted-foreground font-medium">
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
        <Layout direction="column" gap="2xl" className="w-full max-w-4xl mx-auto mt-24">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center ${GRADIENT_CLASS}`}>
            Questions fréquentes
          </h2>
          
          <ModernCard variant="premium" className="p-8 animate-fade-in">
            <AccordionSimple>
              {FAQ_DATA.map((item, index) => (
                <AccordionSimpleItem key={index} title={item.question}>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {item.answer}
                  </p>
                </AccordionSimpleItem>
              ))}
            </AccordionSimple>
          </ModernCard>
        </Layout>
      </div>
      
      <Footer />
    </div>
  );
});

Index.displayName = "Index";

export default Index;
