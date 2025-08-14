
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CATEGORIES } from '@/data/categories';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryHref: string) => {
    navigate(categoryHref);
    onOpenChange(false);
  };

  const categoryColors = {
    'grossesse': 'from-pink-500 to-rose-500',
    'enfant': 'from-emerald-500 to-green-500',  
    'sante': 'from-blue-500 to-cyan-500',
    'securite': 'from-violet-500 to-purple-500',
    'outils': 'from-orange-500 to-amber-500',
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className={cn(
          "w-full sm:max-w-md p-0",
          "bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700"
        )}
      >
        {/* Header sans croix personnalisée */}
        <SheetHeader className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <SheetTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent text-left">
            Navigation
          </SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Categories Section */}
          <div className="flex-1 px-6 py-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Catégories
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Explorez nos outils par domaine d'expertise
              </p>
            </div>

            <div className="space-y-3">
              {CATEGORIES.map((category, index) => {
                const gradientClass = categoryColors[category.id as keyof typeof categoryColors] || 
                                    'from-gray-500 to-slate-500';
                
                return (
                  <Button
                    key={category.id}
                    variant="ghost"
                    onClick={() => handleCategoryClick(category.href)}
                    className={cn(
                      "w-full p-4 h-auto rounded-2xl justify-start",
                      "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                      "hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-lg",
                      "transition-all duration-300 ease-out",
                      "group relative overflow-hidden"
                    )}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: open ? 'fade-in 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    {/* Background gradient overlay */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-10",
                      "bg-gradient-to-r transition-opacity duration-300",
                      gradientClass
                    )} />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      {/* Icon */}
                      <div className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-xl",
                        "bg-gradient-to-r text-white shadow-lg",
                        "group-hover:shadow-xl group-hover:scale-110",
                        "transition-all duration-300",
                        gradientClass
                      )}>
                        {React.createElement(category.icon, { 
                          className: "h-6 w-6",
                          strokeWidth: 1.5
                        })}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {category.title}
                          </h4>
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full font-medium border border-blue-200 dark:border-blue-700">
                            {category.tools.length}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Suite complète d'outils pour la famille
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
