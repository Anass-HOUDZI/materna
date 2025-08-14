
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  minItemWidth?: number;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  autoFit?: boolean;
}

const ResponsiveGrid = React.memo<ResponsiveGridProps>(({
  children,
  className,
  minItemWidth = 280,
  gap = 'md',
  columns,
  autoFit = true
}) => {
  const gapClasses = {
    xs: 'gap-2 xs:gap-3',
    sm: 'gap-3 xs:gap-4',
    md: 'gap-4 xs:gap-5 sm:gap-6',
    lg: 'gap-5 xs:gap-6 sm:gap-8',
    xl: 'gap-6 xs:gap-8 sm:gap-10'
  };

  const gridStyle = autoFit ? {
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${minItemWidth}px, 100%), 1fr))`
  } : undefined;

  const manualColumns = columns ? {
    gridTemplateColumns: '1fr'
  } : undefined;

  return (
    <div 
      className={cn(
        'grid w-full',
        gapClasses[gap],
        // Colonnes manuelles si spécifiées
        columns && [
          'grid-cols-1',
          columns.mobile && `xs:grid-cols-${columns.mobile}`,
          columns.tablet && `sm:grid-cols-${columns.tablet}`,
          columns.desktop && `lg:grid-cols-${columns.desktop}`
        ],
        className
      )}
      style={autoFit ? gridStyle : manualColumns}
    >
      {children}
    </div>
  );
});

ResponsiveGrid.displayName = 'ResponsiveGrid';

export default ResponsiveGrid;
