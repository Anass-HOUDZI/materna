
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';
import Icon from '../Icon';
import ThemeToggle from '../ThemeToggle';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import HeaderActions from './HeaderActions';
import { AnimatedHeaderProps } from './types';
import { menuItems } from './constants';

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ className }) => {
  const { isMobile } = useResponsive();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'transform-gpu will-change-transform',
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg' 
            : 'bg-transparent',
          className
        )}
        style={{
          backdropFilter: isScrolled ? 'blur(20px) saturate(150%)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a 
                href="/" 
                className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors duration-200"
              >
                <span className="text-2xl">🤱</span>
                <span>MomTech</span>
              </a>
            </div>

            {/* Menu Desktop */}
            {!isMobile && (
              <DesktopMenu 
                menuItems={menuItems}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            )}

            {/* Actions Desktop */}
            <HeaderActions />

            {/* Bouton Menu Mobile */}
            {isMobile && (
              <div className="flex items-center gap-2 md:hidden">
                <ThemeToggle />
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
                  aria-label="Menu"
                >
                  <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      {isMobile && (
        <MobileMenu 
          menuItems={menuItems}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default AnimatedHeader;
