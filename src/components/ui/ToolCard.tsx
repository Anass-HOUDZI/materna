
import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import FavoriteButton from "@/components/home/FavoriteButton";

interface ToolCardProps {
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  gradient?: string;
  className?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  difficulty?: "Facile" | "Moyen" | "Avancé";
  rating?: number;
}

const ToolCard = React.memo<ToolCardProps>(({
  title,
  description,
  href,
  icon,
  gradient = "from-blue-50 to-blue-100",
  className,
  isFavorite = false,
  onToggleFavorite,
  difficulty = "Facile",
  rating = 5
}) => {
  const handleClick = () => {
    window.location.href = href;
  };

  const difficultyColors = {
    "Facile": "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200",
    "Moyen": "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200", 
    "Avancé": "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200"
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl cursor-pointer",
        "bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg",
        "hover:shadow-2xl hover:border-blue-300/50 hover:bg-transparent",
        "transition-all duration-500 ease-out transform-gpu",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
        "active:scale-[0.98] active:shadow-xl",
        className
      )}
      tabIndex={0}
      role="button"
      aria-label={`Utiliser l'outil ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Favorite Button */}
      {onToggleFavorite && (
        <div className="absolute top-4 right-4 z-20">
          <FavoriteButton
            isActive={isFavorite}
            onClick={() => onToggleFavorite()}
          />
        </div>
      )}

      {/* Background Gradient with enhanced hover effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-40",
          "group-hover:opacity-0 transition-all duration-500",
          gradient
        )}
      />
      
      {/* Content Container */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Icon with enhanced animation */}
        {icon && (
          <div className="mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center 
                          group-hover:shadow-xl 
                          transition-all duration-500 ease-out border border-white/50">
              <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                {React.cloneElement(icon as React.ReactElement, { 
                  size: 32
                })}
              </div>
            </div>
          </div>
        )}

        {/* Title with improved typography */}
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300 mb-3 leading-tight">
          {title}
        </h3>

        {/* Description with better contrast */}
        {description && (
          <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3 group-hover:text-slate-700 transition-colors duration-300">
            {description}
          </p>
        )}

        {/* Enhanced badges with gradients */}
        <div className="flex items-center gap-3 mb-6">
          <span className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300",
            difficultyColors[difficulty]
          )}>
            {difficulty}
          </span>
          
          {/* Enhanced star rating */}
          <div className="flex items-center gap-1" role="img" aria-label={`Note: ${rating} sur 5 étoiles`}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                size={14} 
                className={cn(
                  "transition-all duration-300",
                  i < rating 
                    ? "text-yellow-400 fill-yellow-400 drop-shadow-sm" 
                    : "text-slate-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* Enhanced action button */}
        <button 
          className="w-full text-white py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 
                   hover:bg-white hover:shadow-xl transform group-hover:shadow-pink-500/30
                   focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:ring-offset-2 focus:ring-offset-white
                   active:scale-95"
          style={{ 
            background: 'linear-gradient(to right, #f953c6, #b91d73)',
            '--hover-color': '#f953c6'
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#f953c6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #f953c6, #b91d73)';
            e.currentTarget.style.color = 'white';
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          aria-label={`Accéder à l'outil ${title}`}
        >
          <span className="flex items-center justify-center gap-2">
            <span>Utiliser l'outil</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
          </span>
        </button>
      </div>

    </div>
  );
});

ToolCard.displayName = "ToolCard";

export default ToolCard;
