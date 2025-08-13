
import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "@/components/home/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import { TOOLS_DATA } from "@/data/categories";

interface ToolsGridProps {}

export default function ToolsGrid({}: ToolsGridProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const filtered = TOOLS_DATA;
  const sorted = [
    ...filtered.filter(tool => favorites.includes(tool.link)),
    ...filtered.filter(tool => !favorites.includes(tool.link)),
  ];

  return (
    <div className="grid gap-8 mobile-s:gap-10 sm:gap-12 lg:gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl px-4 mobile-s:px-6 sm:px-8">
      {sorted.map((tool) => (
        <Link
          key={tool.link}
          to={tool.link}
          className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out 
                     bg-white/90 backdrop-blur-sm border border-white/20 ring-1 ring-gray-200/50 hover:ring-blue-300/50
                     flex flex-col items-center gap-6 p-8 mobile-s:p-10 sm:p-12 lg:p-14 
                     overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     touch-manipulation transform-gpu will-change-transform"
          style={{ minHeight: 220 }}
          aria-label={tool.label}
        >
          {/* Empêcher la navigation lors du toggle favori */}
          <div
            className="absolute top-4 right-4 z-20"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(tool.link); }}
          >
            <FavoriteButton
              isActive={isFavorite(tool.link)}
              onClick={() => {}}
            />
          </div>
          
          {/* Gradient background with blur effect */}
          <div
            className={`absolute top-0 left-0 w-full h-20 rounded-t-3xl opacity-60 backdrop-blur-sm bg-gradient-to-br ${tool.gradient}`}
          />
          
          {/* Enhanced icon container */}
          <div className="relative z-10 flex items-center justify-center w-20 h-20 mobile-s:w-24 mobile-s:h-24 
                          rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-gray-50/95 
                          shadow-lg border border-white/30 ring-1 ring-gray-100/50
                          group-hover:shadow-xl transition-all duration-300 ease-out
                          mt-6">
            <div className="transform transition-transform duration-300 ease-out">
              {React.createElement(tool.icon, { size: 42, className: "text-blue-600" })}
            </div>
          </div>
          
          {/* Enhanced text */}
          <span className="relative z-10 text-lg mobile-s:text-xl sm:text-xl lg:text-2xl font-semibold 
                          text-gray-800 text-center leading-tight tracking-tight
                          group-hover:text-blue-700 transition-colors duration-300 ease-out
                          max-w-full break-words hyphens-auto">
            {tool.label}
          </span>
          
          {/* Subtle hover glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 to-purple-400/0 
                          group-hover:from-blue-400/5 group-hover:to-purple-400/5 
                          transition-all duration-500 ease-out pointer-events-none" />
        </Link>
      ))}
    </div>
  );
}
