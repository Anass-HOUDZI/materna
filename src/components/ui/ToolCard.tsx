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
    "Facile": "bg-green-100 text-green-700",
    "Moyen": "bg-yellow-100 text-yellow-700", 
    "Avancé": "bg-red-100 text-red-700"
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl cursor-pointer",
        "bg-white border border-slate-200/50 shadow-lg",
        "hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300/50",
        "transition-all duration-500 ease-out transform-gpu",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50",
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

      {/* Background Gradient */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60",
          "group-hover:opacity-80 transition-opacity duration-500",
          gradient
        )}
      />
      
      {/* Content Container */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Icon */}
        {icon && (
          <div className="mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/90 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {React.cloneElement(icon as React.ReactElement, { 
                className: "text-blue-600", 
                size: 28 
              })}
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors duration-300 mb-3 leading-tight">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {description}
          </p>
        )}

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span className={cn("px-2 py-1 rounded-full text-xs font-medium", difficultyColors[difficulty])}>
            {difficulty}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                size={12} 
                className={cn(
                  "transition-colors duration-200",
                  i < rating ? "text-yellow-400 fill-current" : "text-slate-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] group-hover:shadow-blue-500/25">
          Utiliser l'outil →
        </button>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
});

ToolCard.displayName = "ToolCard";

export default ToolCard;