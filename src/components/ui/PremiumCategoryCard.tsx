
import React from "react";
import { ArrowRight, Star } from "lucide-react";
import ModernCard from "./ModernCard";
import { cn } from "@/lib/utils";

interface PremiumCategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  toolCount: number;
  gradient: string;
  imageUrl?: string;
  badge?: string;
  featured?: boolean;
}

const PremiumCategoryCard = React.memo<PremiumCategoryCardProps>(({
  title,
  description,
  href,
  icon,
  toolCount,
  gradient,
  imageUrl = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
  badge,
  featured = false
}) => {
  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <ModernCard
      variant="premium"
      hover3d={true}
      shine={true}
      onClick={handleClick}
      className={cn(
        "group cursor-pointer overflow-hidden h-full",
        featured && "ring-2 ring-yellow-500/50"
      )}
    >
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-60 transition-opacity duration-500",
          gradient
        )} />
        
        {/* Icon */}
        <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <div className="text-blue-600">
            {React.cloneElement(icon as React.ReactElement, { size: 24 })}
          </div>
        </div>

        {/* Badge */}
        {(badge || featured) && (
          <div className="absolute top-4 right-4">
            {featured ? (
              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                <Star className="w-3 h-3" />
                <span>POPULAIRE</span>
              </div>
            ) : badge ? (
              <div className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full">
                {badge}
              </div>
            ) : null}
          </div>
        )}

        {/* Tool Count */}
        <div className="absolute bottom-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
          <span className="text-sm font-bold text-gray-800">
            {toolCount} outil{toolCount > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            Découvrir les outils
          </span>
          
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
            <ArrowRight 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
            />
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      </div>
    </ModernCard>
  );
});

PremiumCategoryCard.displayName = "PremiumCategoryCard";

export default PremiumCategoryCard;
