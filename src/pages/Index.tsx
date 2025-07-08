
import React from "react";
import { AccordionSimple, AccordionSimpleItem } from "@/components/ui/accordion-simple";
import Footer from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Layout } from "@/components/ui/Layout";
import CategoryCard from "@/components/ui/CategoryCard";
import ToolCard from "@/components/ui/ToolCard";
import HeroSection from "@/components/home/HeroSection";
import { CATEGORIES, TOOLS_DATA } from "@/data/categories";
import { useFavorites } from "@/hooks/useFavorites";
import { ChevronDown, Filter } from "lucide-react";

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

const Index = React.memo(() => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [showMobileFilter, setShowMobileFilter] = React.useState(false);
  
  const favoriteTools = TOOLS_DATA.filter(tool => favorites.includes(tool.link)).slice(0, 8);
  const filteredTools = selectedCategory === "all" 
    ? TOOLS_DATA 
    : TOOLS_DATA.filter(tool => tool.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-background">
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
            </Card>
          )}
        </div>

        {/* Categories Section */}
        {CATEGORIES.length > 0 && (
          <Layout direction="column" gap="3xl" id="categories" className="mb-16 mobile-s:mb-20 sm:mb-24">
            <Layout direction="column" gap="lg" align="center" className="text-center">
              <h2 className="text-2xl mobile-s:text-3xl sm:text-4xl md:text-5xl font-bold text-foreground px-4">
                Découvrez nos catégories
              </h2>
              <p className="text-base mobile-s:text-lg sm:text-xl text-muted-foreground max-w-3xl font-medium px-4">
                Chaque catégorie regroupe des outils spécialisés pour répondre à vos besoins spécifiques
              </p>
            </Layout>

            {/* Desktop Category Filter */}
            <div className="hidden sm:flex flex-wrap gap-3 justify-center px-4">
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

            <div className="grid gap-6 mobile-s:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
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
        <Layout direction="column" gap="2xl" className="my-20 mobile-s:my-24 sm:my-28 lg:my-32">
          <Layout direction="column" gap="md" align="center" className="text-center">
            <h2 className="text-2xl mobile-s:text-3xl sm:text-4xl font-bold text-foreground px-4">
              {selectedCategory === "all" ? "Tous nos outils" : 
               `Outils ${CATEGORIES.find(c => c.id === selectedCategory)?.title || ""}`}
            </h2>
            <p className="text-muted-foreground font-medium px-4">
              {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} disponible{filteredTools.length > 1 ? 's' : ''}
            </p>
          </Layout>

          <div className="grid gap-4 mobile-s:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
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
          <Layout direction="column" gap="2xl" className="mb-16 mobile-s:mb-20 sm:mb-24">
            <Layout direction="column" gap="md" align="center" className="text-center">
              <h2 className="text-xl mobile-s:text-2xl sm:text-3xl font-bold text-foreground px-4">
                Vos outils favoris
              </h2>
              <p className="text-muted-foreground font-medium px-4">
                Accédez rapidement à vos outils préférés
              </p>
            </Layout>

            <div className="grid gap-4 mobile-s:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
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
        <Layout direction="column" gap="2xl" className="w-full max-w-4xl mx-auto mt-24 mobile-s:mt-28 sm:mt-32 lg:mt-36">
          <h2 className="text-2xl mobile-s:text-3xl sm:text-4xl font-bold text-center text-foreground px-4">
            Questions fréquentes
          </h2>
          
          <Card variant="glass" size="lg" className="animate-fade-in mx-4">
            <AccordionSimple>
              {FAQ_DATA.map((item, index) => (
                <AccordionSimpleItem key={index} title={item.question}>
                  <p className="text-muted-foreground leading-relaxed font-medium">
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
