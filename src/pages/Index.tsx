
import React from "react";
import { AccordionSimple, AccordionSimpleItem } from "@/components/ui/accordion-simple";
import Footer from "@/components/ui/Footer";
import { Layout } from "@/components/ui/Layout";
import PremiumCategoryCard from "@/components/ui/PremiumCategoryCard";
import ToolCard from "@/components/ui/ToolCard";
import HeroSection from "@/components/ui/HeroSection";
import ModernCard from "@/components/ui/ModernCard";
import { CATEGORIES, TOOLS_DATA } from "@/data/categories";
import { useFavorites } from "@/hooks/useFavorites";
import { ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

// Images Unsplash pour chaque catégorie
const CATEGORY_IMAGES = {
  grossesse: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
  enfant: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
  sante: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
  securite: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
  technique: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
};

const Index = React.memo(() => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [showMobileFilter, setShowMobileFilter] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const favoriteTools = TOOLS_DATA.filter(tool => favorites.includes(tool.link)).slice(0, 8);
  
  // Filtrage par catégorie et recherche
  let filteredTools = selectedCategory === "all" 
    ? TOOLS_DATA 
    : TOOLS_DATA.filter(tool => tool.category === selectedCategory);
    
  if (searchQuery) {
    filteredTools = filteredTools.filter(tool => 
      tool.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("all");
    // Scroll vers la section des outils
    document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Révolutionnaire */}
      <HeroSection onSearch={handleSearch} className="mb-20" />

      <div className="w-full max-w-7xl mx-auto px-4 mobile-s:px-6 sm:px-8 pb-safe-bottom">
        
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {searchQuery ? `Résultats pour "${searchQuery}"` : 
               selectedCategory === "all" ? "Tous nos outils" : 
               `Outils ${CATEGORIES.find(c => c.id === selectedCategory)?.title || ""}`}
            </h2>
            <p className="text-muted-foreground font-medium">
              {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} disponible{filteredTools.length > 1 ? 's' : ''}
            </p>
          </Layout>

          {filteredTools.length > 0 ? (
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
          ) : (
            <ModernCard variant="glass" className="p-12 text-center">
              <div className="space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-xl font-semibold">Aucun outil trouvé</h3>
                <p className="text-muted-foreground">
                  Essayez avec d'autres mots-clés ou explorez nos catégories
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Effacer la recherche
                </Button>
              </div>
            </ModernCard>
          )}
        </Layout>

        {/* Favorite Tools Section */}
        {favoriteTools.length > 0 && (
          <Layout direction="column" gap="2xl" className="mb-20">
            <Layout direction="column" gap="md" align="center" className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
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
