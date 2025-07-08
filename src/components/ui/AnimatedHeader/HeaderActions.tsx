
import React from 'react';
import Icon from '../Icon';
import ThemeToggle from '../ThemeToggle';

const HeaderActions: React.FC = () => {
  return (
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
  );
};

export default HeaderActions;
