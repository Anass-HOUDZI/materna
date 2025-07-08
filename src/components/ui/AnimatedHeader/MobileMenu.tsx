
import React from 'react';
import { cn } from '@/lib/utils';
import Icon from '../Icon';
import { MenuItem } from './types';

interface MobileMenuProps {
  menuItems: MenuItem[];
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  menuItems, 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  return (
    <div 
      className={cn(
        'fixed inset-0 z-40 transition-all duration-300 md:hidden',
        isMobileMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      )}
    >
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleMobileMenu}
      />
      
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
  );
};

export default MobileMenu;
