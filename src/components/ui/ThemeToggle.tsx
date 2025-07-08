
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import Icon from './Icon';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'icon';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className, 
  variant = 'icon' 
}) => {
  const { theme, toggleTheme } = useTheme();

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg',
          'bg-background hover:bg-accent transition-colors duration-200',
          'border border-border text-foreground',
          className
        )}
        aria-label={`Changer vers le thème ${theme === 'light' ? 'sombre' : 'clair'}`}
      >
        <Icon name={theme === 'light' ? 'moon' : 'sun'} size={20} />
        <span className="text-sm font-medium">
          {theme === 'light' ? 'Mode sombre' : 'Mode clair'}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-lg transition-all duration-300',
        'hover:bg-accent hover:scale-110',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'text-foreground hover:text-foreground',
        className
      )}
      aria-label={`Changer vers le thème ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      <Icon 
        name={theme === 'light' ? 'moon' : 'sun'} 
        size={20}
        className="transition-transform duration-300 hover:rotate-12"
      />
    </button>
  );
};

export default ThemeToggle;
