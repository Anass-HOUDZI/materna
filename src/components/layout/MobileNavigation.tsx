
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/data/categories';
import { useResponsive } from '@/hooks/useResponsive';

interface MobileNavigationProps {
  className?: string;
  onItemClick?: () => void;
}

const MobileNavigation = React.memo<MobileNavigationProps>(({
  className,
  onItemClick
}) => {
  const location = useLocation();
  const { isMobile, isTablet } = useResponsive();

  if (!isMobile && !isTablet) return null;

  return (
    <nav className={cn('w-full', className)}>
      {/* Categories Grid avec auto-wrap */}
      <div className="responsive-grid px-4 py-6">
        {CATEGORIES.map((category, index) => {
          const isActive = location.pathname === category.href;
          
          return (
            <Link
              key={category.id}
              to={category.href}
              onClick={onItemClick}
              className={cn(
                // Base mobile-first styles
                'group relative p-4 rounded-2xl border transition-all duration-300',
                'touch-optimized min-h-[80px] w-full',
                'flex flex-col items-center justify-center text-center',
                'active:scale-95 active:brightness-95',
                
                // Colors and states
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 shadow-lg' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700',
                
                // Shadow and depth
                'shadow-sm hover:shadow-md',
                
                // Auto-wrap for content
                'auto-wrap'
              )}
              style={{ 
                animationDelay: `${index * 50}ms`,
                animation: 'fade-in 0.3s ease-out forwards'
              }}
            >
              {/* Icon */}
              <div className={cn(
                'flex items-center justify-center rounded-xl mb-2 transition-transform duration-300',
                'h-10 w-10 xs:h-12 xs:w-12',
                'group-hover:scale-110',
                isActive 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              )}>
                {React.createElement(category.icon, { 
                  className: "h-5 w-5 xs:h-6 xs:w-6",
                  strokeWidth: 1.5
                })}
              </div>
              
              {/* Title avec auto-wrap */}
              <h3 className={cn(
                'font-semibold text-xs xs:text-sm leading-tight',
                'auto-wrap-title max-w-full',
                isActive 
                  ? 'text-blue-700 dark:text-blue-300' 
                  : 'text-gray-900 dark:text-gray-100'
              )}>
                {category.title}
              </h3>
              
              {/* Badge count */}
              <span className={cn(
                'text-xs px-2 py-0.5 rounded-full font-medium mt-1',
                isActive 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              )}>
                {category.tools.length}
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* Bottom spacer for safe area */}
      <div className="h-safe-bottom" />
    </nav>
  );
});

MobileNavigation.displayName = 'MobileNavigation';

export default MobileNavigation;
