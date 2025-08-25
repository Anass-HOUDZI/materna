import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import FavoriteButton from "@/components/home/FavoriteButton";
import { createOptimizedIcon } from "@/utils/performance";

interface OptimizedToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  gradient: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  difficulty: string;
  rating: number;
}

const OptimizedToolCard = memo<OptimizedToolCardProps>(({
  title,
  description,
  href,
  icon,
  gradient,
  isFavorite,
  onToggleFavorite,
  difficulty,
  rating
}) => {
  // Memoize the icon to prevent recreating on each render
  const iconElement = useMemo(() => 
    createOptimizedIcon(icon, { size: 24, className: "text-white" }),
    [icon]
  );

  // Memoize the gradient class
  const gradientClass = useMemo(() => 
    `w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-transform duration-300`,
    [gradient]
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <Link
      to={href}
      className="group block cursor-pointer transform-gpu will-change-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
      aria-label={title}
    >
      <Card
        variant="interactive"
        size="md"
        className="relative overflow-hidden transition-all duration-500 ease-out h-full"
      >
        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-20" onClick={handleFavoriteClick}>
          <FavoriteButton
            isActive={isFavorite}
            onClick={() => {}}
          />
        </div>
        
        {/* Icon Container */}
        <div className="relative z-10 mb-6">
          <div className={gradientClass}>
            {iconElement}
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight flex-grow">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
              ⭐ Excellent
            </span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              {difficulty}
            </span>
          </div>
          
          <div className="w-full text-white py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 
                           hover:shadow-lg transform text-center bg-gradient-to-r from-primary to-primary-foreground">
            Utiliser l&apos;outil →
          </div>
        </div>
        
        {/* Background decoration */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} 
                        opacity-20 rounded-full transform translate-x-8 -translate-y-8 
                        transition-transform duration-500`} />
      </Card>
    </Link>
  );
});

OptimizedToolCard.displayName = "OptimizedToolCard";

export default OptimizedToolCard;