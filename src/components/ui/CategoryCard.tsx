
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  toolCount: number;
  gradient?: string;
  className?: string;
}

const CategoryCard = React.memo<CategoryCardProps>(({
  title,
  description,
  href,
  icon,
  toolCount,
  gradient = "from-blue-50 to-blue-100",
  className
}) => {
  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl cursor-pointer",
        "bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg",
        "hover:shadow-2xl hover:border-blue-300/50 hover:bg-white",
        "transition-all duration-500 ease-out transform-gpu",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
        "active:scale-[0.98] active:shadow-xl",
        className
      )}
      tabIndex={0}
      role="button"
      aria-label={`Accéder à la catégorie ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Enhanced Background Gradient */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-40",
          "group-hover:opacity-60 transition-all duration-500",
          gradient
        )}
      />
      
      {/* Content Container */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Header with enhanced animations */}
        <div className="flex items-start justify-between mb-6">
          {icon && (
            <div className="flex-shrink-0 p-4 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg 
                          group-hover:shadow-xl 
                          transition-all duration-500 ease-out border border-white/50">
              <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                {React.cloneElement(icon as React.ReactElement, { size: 28 })}
              </div>
            </div>
          )}
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300 mb-3">
              {title}
            </h3>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100/90 to-indigo-100/90 
                          text-blue-700 rounded-full text-sm font-semibold border border-blue-200/50 backdrop-blur-sm
                          group-hover:from-blue-200/90 group-hover:to-indigo-200/90 transition-all duration-300">
              <span>{toolCount} outil{toolCount > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Description with improved readability */}
        <p className="text-slate-600 text-base leading-relaxed mb-8 flex-1 group-hover:text-slate-700 transition-colors duration-300">
          {description}
        </p>

        {/* Enhanced action section */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 font-semibold group-hover:text-slate-600 transition-colors duration-300">
            Découvrir les outils
          </span>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/95 shadow-lg 
                        group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-indigo-50 
                        group-hover:shadow-xl 
                        transition-all duration-500 border border-white/50">
            <ArrowRight 
              size={20} 
              className="text-slate-600 group-hover:text-blue-600 group-hover:translate-x-1 
                       transition-all duration-300" 
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Enhanced hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/8 to-indigo-500/0 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
});

CategoryCard.displayName = "CategoryCard";

export default CategoryCard;
