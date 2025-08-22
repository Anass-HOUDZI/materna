
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { CategoriesDropdown } from './CategoriesDropdown';
import { MobileMenu } from './MobileMenu';

export function AnimatedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500 ease-out',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-xl shadow-black/5' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-center gap-8 md:gap-16">
        {/* Logo */}
        <Link 
          to="/" 
          className={cn(
            "flex items-center space-x-3 group",
            "hover:opacity-80 transition-all duration-300 ease-out"
          )}
        >
          <div className="relative">
            <img 
              src="/lovable-uploads/9b95e222-c695-4858-89c2-a70b7e40a4e4.png" 
              alt="Materna" 
              className={cn(
                "h-8 w-auto transition-all duration-300",
                "group-hover:scale-105"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3">
          <CategoriesDropdown />
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "w-10 h-10 p-0 rounded-xl",
              "bg-background/80 backdrop-blur-sm border border-border/40",
              "hover:bg-accent/80 hover:border-border/60 hover:shadow-md",
              "transition-all duration-300 ease-out",
              "focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
            )}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Ouvrir le menu</span>
          </Button>
          
          <MobileMenu 
            open={isMobileMenuOpen} 
            onOpenChange={setIsMobileMenuOpen} 
          />
        </div>
      </div>
    </header>
  );
}
