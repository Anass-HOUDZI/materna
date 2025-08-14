
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useResponsive } from '@/hooks/useResponsive';
import MobileNavigation from './MobileNavigation';

export function ResponsiveHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile, isTablet, safeAreaTop } = useResponsive();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500 ease-out',
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-700/60 shadow-xl shadow-black/5' 
            : 'bg-transparent'
        )}
        style={{ paddingTop: safeAreaTop }}
      >
        <div className="mobile-container">
          <div className="flex items-center justify-between h-14 xs:h-16 nav-wrap">
            {/* Logo avec auto-wrap */}
            <Link 
              to="/" 
              className={cn(
                "flex items-center group flex-shrink-0",
                "hover:opacity-80 transition-all duration-300 ease-out",
                "auto-wrap"
              )}
            >
              <div className="relative">
                <img 
                  src="/lovable-uploads/9b95e222-c695-4858-89c2-a70b7e40a4e4.png" 
                  alt="Materna" 
                  className={cn(
                    "h-7 xs:h-8 w-auto transition-all duration-300",
                    "group-hover:scale-105"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </Link>

            {/* Navigation Desktop - Hidden on mobile */}
            {!isMobile && !isTablet && (
              <nav className="hidden md:flex items-center space-x-3 flex-wrap">
                <ThemeToggle />
              </nav>
            )}

            {/* Mobile Controls */}
            {(isMobile || isTablet) && (
              <div className="flex items-center gap-2 xs:gap-3 flex-shrink-0">
                <ThemeToggle />
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={cn(
                    "touch-optimized rounded-xl",
                    "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
                    "border border-gray-200/40 dark:border-gray-700/40",
                    "hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-200/60 dark:hover:border-gray-600/60 hover:shadow-md",
                    "transition-all duration-300 ease-out",
                    "focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-2"
                  )}
                  aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {(isMobile || isTablet) && isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            style={{ paddingTop: safeAreaTop }}
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div 
            className={cn(
              'fixed inset-x-0 top-0 z-50 bg-white dark:bg-gray-900',
              'border-b border-gray-200 dark:border-gray-700',
              'shadow-xl transform transition-transform duration-300 ease-out',
              isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
            )}
            style={{ 
              paddingTop: `calc(${safeAreaTop}px + 4rem)` // Header height + safe area
            }}
          >
            <MobileNavigation onItemClick={closeMobileMenu} />
          </div>
        </>
      )}
    </>
  );
}
