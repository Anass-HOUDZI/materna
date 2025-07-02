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
        "bg-white border border-slate-200/50 shadow-lg",
        "hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300/50",
        "transition-all duration-500 ease-out transform-gpu",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50",
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
      {/* Background Gradient */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60",
          "group-hover:opacity-80 transition-opacity duration-500",
          gradient
        )}
      />
      
      {/* Content Container */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          {icon && (
            <div className="flex-shrink-0 p-3 rounded-2xl bg-white/80 shadow-md group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          )}
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors duration-300 mb-2">
              {title}
            </h3>
            <div className="inline-flex items-center px-3 py-1 bg-blue-100/80 text-blue-700 rounded-full text-sm font-medium">
              {toolCount} outil{toolCount > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-base leading-relaxed mb-6 flex-1">
          {description}
        </p>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 font-medium">
            Découvrir les outils
          </span>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-md group-hover:bg-blue-50 group-hover:shadow-lg transition-all duration-300">
            <ArrowRight 
              size={20} 
              className="text-slate-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" 
            />
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
});

CategoryCard.displayName = "CategoryCard";

export default CategoryCard;