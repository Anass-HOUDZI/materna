
import React from 'react';
import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useThemeContext } from './ThemeProvider';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useThemeContext();

  const themeOptions = [
    {
      value: 'light',
      label: 'Clair',
      icon: Sun,
      description: 'Interface lumineuse'
    },
    {
      value: 'dark',
      label: 'Sombre', 
      icon: Moon,
      description: 'Interface foncée'
    },
    {
      value: 'system',
      label: 'Système',
      icon: Monitor,
      description: 'Suivre le système'
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "relative w-10 h-10 p-0 rounded-xl",
            "bg-background/80 backdrop-blur-sm border border-border/40",
            "hover:bg-accent/80 hover:border-border/60 hover:shadow-md",
            "transition-all duration-300 ease-out",
            "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
          )}
        >
          <div className="relative">
            {isDark ? (
              <Moon className="h-4 w-4 text-foreground transition-transform duration-300 rotate-0 scale-100" />
            ) : (
              <Sun className="h-4 w-4 text-foreground transition-transform duration-300 rotate-0 scale-100" />
            )}
          </div>
          <span className="sr-only">Changer le thème</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className={cn(
          "w-56 p-2 mt-2",
          "bg-background/95 backdrop-blur-xl border border-border/60",
          "shadow-2xl rounded-2xl",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
      >
        <div className="px-2 py-1.5 mb-2">
          <p className="text-sm font-semibold text-foreground">Apparence</p>
          <p className="text-xs text-muted-foreground">Choisir le thème de l'interface</p>
        </div>
        
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.value;
          
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value as any)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer",
                "transition-all duration-200 ease-out",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-accent/60 text-foreground"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg",
                isActive 
                  ? "bg-primary/20 text-primary" 
                  : "bg-muted/60 text-muted-foreground"
              )}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{option.label}</span>
                  {isActive && <Check className="h-3 w-3 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
