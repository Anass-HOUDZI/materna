import React from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "@/data/categories";
import BasePageLayout from "@/components/ui/BasePageLayout";
import ToolCard from "@/components/ui/ToolCard";
import { useFavorites } from "@/hooks/useFavorites";
import NotFound from "./NotFound";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  
  if (!category) {
    return <NotFound />;
  }

  const crumbs = [
    { href: "/", label: "Accueil" },
    { label: category.title }
  ];

  return (
    <BasePageLayout
      crumbs={crumbs}
      title={category.title}
      description={category.description}
      maxWidth="full"
      background="gradient"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Category Stats */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              {React.createElement(category.icon, { 
                size: 20, 
                className: "text-white" 
              })}
            </div>
            <span className="text-lg font-semibold text-slate-800">
              {category.tools.length} outil{category.tools.length > 1 ? 's' : ''} disponible{category.tools.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {category.tools.map((tool) => (
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

        {/* Empty State */}
        {category.tools.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              {React.createElement(category.icon, { 
                size: 48, 
                className: "text-slate-400" 
              })}
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Aucun outil disponible
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Les outils de cette catégorie sont en cours de développement. 
              Revenez bientôt pour découvrir de nouveaux outils !
            </p>
          </div>
        )}
      </div>
    </BasePageLayout>
  );
};

export default CategoryPage;