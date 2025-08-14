
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CATEGORIES } from '@/data/categories';
import { cn } from '@/lib/utils';

interface CategoriesDropdownProps {
  onCategoryClick?: (href: string) => void;
}

export function CategoriesDropdown({ onCategoryClick }: CategoriesDropdownProps) {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryHref: string) => {
    navigate(categoryHref);
    onCategoryClick?.(categoryHref);
  };

  const categoryColors = {
    'grossesse': 'from-pink-500/20 to-rose-500/20 border-pink-200/50 text-pink-700',
    'enfant': 'from-emerald-500/20 to-green-500/20 border-emerald-200/50 text-emerald-700',
    'sante': 'from-blue-500/20 to-cyan-500/20 border-blue-200/50 text-blue-700',
    'securite': 'from-violet-500/20 to-purple-500/20 border-violet-200/50 text-violet-700',
    'outils': 'from-orange-500/20 to-amber-500/20 border-orange-200/50 text-orange-700',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            "flex items-center gap-2 px-4 py-2 h-10 rounded-xl",
            "bg-background/80 backdrop-blur-sm border border-border/40",
            "hover:bg-accent/80 hover:border-border/60 hover:shadow-md",
            "transition-all duration-300 ease-out",
            "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
          )}
        >
          <span className="font-medium">Catégories</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className={cn(
          "w-80 p-3 mt-2",
          "bg-background/95 backdrop-blur-xl border border-border/60",
          "shadow-2xl rounded-2xl",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
      >
        <div className="px-2 py-1.5 mb-3">
          <p className="text-sm font-semibold text-foreground">Nos catégories</p>
          <p className="text-xs text-muted-foreground">Explorez nos outils par domaine</p>
        </div>

        <div className="space-y-1">
          {CATEGORIES.map((category) => {
            const colorClass = categoryColors[category.id as keyof typeof categoryColors] || 
                              'from-gray-500/20 to-slate-500/20 border-gray-200/50 text-gray-700';
            
            return (
              <DropdownMenuItem
                key={category.id}
                onClick={() => handleCategoryClick(category.href)}
                className={cn(
                  "flex items-center gap-4 px-3 py-4 rounded-xl cursor-pointer",
                  "transition-all duration-300 ease-out",
                  "hover:bg-accent/60 hover:shadow-md hover:scale-[1.02]",
                  "focus:bg-accent/60"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-xl",
                  "bg-gradient-to-br border backdrop-blur-sm",
                  colorClass
                )}>
                  {React.createElement(category.icon, { 
                    className: "h-6 w-6",
                    strokeWidth: 1.5
                  })}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm text-foreground truncate">
                      {category.title}
                    </h4>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      "bg-primary/10 text-primary border border-primary/20"
                    )}>
                      {category.tools.length}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
