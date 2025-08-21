
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
          "w-full sm:max-w-sm p-0",
          "bg-background border-l border-border"
        )}
      >
        {/* Header sans croix personnalisée */}
        <SheetHeader className="px-4 py-4 border-b border-border">
          <SheetTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent text-left">
            Navigation
          </SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Categories Section */}
          <div className="flex-1 px-4 py-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Catégories
              </h3>
              <p className="text-sm text-muted-foreground">
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
                      "w-full p-3 h-auto rounded-xl justify-start",
                      "bg-card border border-border",
                      "hover:bg-accent hover:shadow-md",
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
                    
                    <div className="flex items-start gap-3 relative z-10">
                      {/* Icon */}
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0",
                        "bg-gradient-to-r text-white shadow-md",
                        "group-hover:shadow-lg group-hover:scale-105",
                        "transition-all duration-300",
                        gradientClass
                      )}>
                        {React.createElement(category.icon, { 
                          className: "h-5 w-5",
                          strokeWidth: 1.5
                        })}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-foreground text-sm leading-tight">
                            {category.title}
                          </h4>
                          <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-full font-medium border border-primary/20 flex-shrink-0">
                            {category.tools.length}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed break-words">
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
          <div className="px-4 py-3 border-t border-border bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              Suite complète d'outils pour la famille
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
