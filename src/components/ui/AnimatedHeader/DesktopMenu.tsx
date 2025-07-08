
import React from 'react';
import { cn } from '@/lib/utils';
import Icon from '../Icon';
import { MenuItem } from './types';

interface DesktopMenuProps {
  menuItems: MenuItem[];
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ 
  menuItems, 
  activeItem, 
  setActiveItem 
}) => {
  return (
    <nav className="hidden md:flex items-center">
      <div className="flex items-center gap-1 p-2 rounded-xl bg-accent/20">
        {menuItems.map((item) => (
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
  );
};

export default DesktopMenu;
