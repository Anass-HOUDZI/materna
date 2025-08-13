
import React, { useMemo } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import FavoriteButton from "@/components/home/FavoriteButton";
import { Card } from "@/components/ui/Card";
import { Link } from "react-router-dom";
import { TOOLS_DATA } from "@/data/categories";

const OptimizedToolsGrid = React.memo(() => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  const sortedTools = useMemo(() => [
    ...TOOLS_DATA.filter(tool => favorites.includes(tool.link)),
    ...TOOLS_DATA.filter(tool => !favorites.includes(tool.link)),
  ], [favorites]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mobile-s:px-6 sm:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl mobile-s:text-4xl sm:text-5xl font-bold bg-clip-text text-transparent mb-4" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
          Découvrez nos outils
        </h2>
        <p className="text-lg mobile-s:text-xl text-slate-600 max-w-3xl mx-auto">
          Chaque catégorie regroupe des outils spécialisés pour répondre à vos besoins spécifiques
        </p>
      </div>

      <div className="grid gap-6 mobile-s:gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTools.map((tool) => (
          <Link
            key={tool.link}
            to={tool.link}
            className="group block cursor-pointer transform-gpu will-change-transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
            aria-label={tool.label}
          >
            <Card
              variant="interactive"
              size="md"
              className="relative overflow-hidden transition-all duration-500 ease-out"
            >
              {/* Favorite Button - prevent navigation */}
              <div className="absolute top-4 right-4 z-20" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(tool.link); }}>
                <FavoriteButton
                  isActive={isFavorite(tool.link)}
                  onClick={() => {}}
                />
              </div>
              
              {/* Icon Container */}
              <div className="relative z-10 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient.replace('50', '500').replace('100', '600')} 
                                flex items-center justify-center shadow-lg transition-transform duration-300`}>
                  <div className="text-white transform transition-transform duration-300">
                    {React.createElement(tool.icon, { className: "text-white", size: 32 })}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg mobile-s:text-xl font-semibold text-slate-900 mb-3 leading-tight">
                  {tool.label}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    ⭐ Excellent
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {tool.difficulty}
                  </span>
                </div>
                <div className="w-full text-white py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 
                                 hover:shadow-lg transform text-center" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)' }}>
                  Utiliser l'outil →
                </div>
              </div>
              
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.gradient} 
                              opacity-20 rounded-full transform translate-x-8 -translate-y-8 
                              transition-transform duration-500`} />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
});

OptimizedToolsGrid.displayName = "OptimizedToolsGrid";

export default OptimizedToolsGrid;
