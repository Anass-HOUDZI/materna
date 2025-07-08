
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

interface AnimatedHeaderProps {
  className?: string;
}

const menuItems: MenuItem[] = [
  { id: 'grossesse', label: 'Grossesse', icon: 'pregnancy', href: '/categorie/grossesse' },
  { id: 'enfant', label: 'Enfant', icon: 'child', href: '/categorie/enfant' },
  { id: 'sante', label: 'Santé', icon: 'health', href: '/categorie/sante' },
  { id: 'securite', label: 'Sécurité', icon: 'security', href: '/categorie/securite' },
  { id: 'outils', label: 'Outils', icon: 'tools', href: '/categorie/outils' },
];

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ className }) => {
  const { isMobile } = useResponsive();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Détecter le scroll avec debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 16); // 60fps
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
              <nav className="hidden md:flex items-center">
                <div className="flex items-center gap-1 p-2 rounded-xl bg-accent/20">
                  {menuItems.map((item, index) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className={cn(
                        'relative px-4 py-2 rounded-lg transition-all duration-500',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                        'group transform-gpu will-change-transform',
                        activeItem === item.id && 'bg-primary text-primary-foreground'
                      )}
                      onMouseEnter={() => setActiveItem(item.id)}
                      onMouseLeave={() => setActiveItem(null)}
                      style={{
                        transform: activeItem === item.id 
                          ? 'translateY(-2px) rotateX(5deg)' 
                          : 'translateY(0) rotateX(0deg)',
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon 
                          name={item.icon} 
                          size={18}
                          className={cn(
                            'transition-all duration-300',
                            activeItem === item.id && 'scale-110 rotate-6'
                          )}
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      
                      {/* Effet de profondeur */}
                      <div 
                        className={cn(
                          'absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black/20',
                          'opacity-0 transition-opacity duration-300',
                          activeItem === item.id && 'opacity-100'
                        )}
                        style={{
                          transform: 'translateZ(-1px)',
                        }}
                      />
                    </a>
                  ))}
                </div>
              </nav>
            )}

            {/* Actions Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <button
                className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
                aria-label="Rechercher"
              >
                <Icon name="search" size={20} />
              </button>
              
              <button
                className="p-2 rounded-lg hover:bg-accent transition-colors duration-200 relative"
                aria-label="Notifications"
              >
                <Icon name="bell" size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button
                className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
                aria-label="Profil"
              >
                <Icon name="user" size={20} />
              </button>
              
              <ThemeToggle />
            </div>

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
        <div 
          className={cn(
            'fixed inset-0 z-40 transition-all duration-300 md:hidden',
            isMobileMenuOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          )}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          
          {/* Menu Content */}
          <div 
            className={cn(
              'absolute top-16 left-4 right-4 bg-background/95 backdrop-blur-xl',
              'rounded-2xl border border-border shadow-2xl',
              'transform transition-all duration-300',
              isMobileMenuOpen 
                ? 'scale-100 opacity-100' 
                : 'scale-95 opacity-0'
            )}
          >
            <div className="p-6">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-around">
                  <button
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors duration-200"
                    aria-label="Rechercher"
                  >
                    <Icon name="search" size={20} />
                    <span className="text-xs">Recherche</span>
                  </button>
                  
                  <button
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors duration-200 relative"
                    aria-label="Notifications"
                  >
                    <Icon name="bell" size={20} />
                    <span className="text-xs">Notifications</span>
                    <span className="absolute top-1 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  <button
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors duration-200"
                    aria-label="Profil"
                  >
                    <Icon name="user" size={20} />
                    <span className="text-xs">Profil</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimatedHeader;
