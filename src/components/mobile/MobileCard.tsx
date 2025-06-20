
import React, { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const MobileCard = forwardRef<HTMLDivElement, MobileCardProps>(({
  children,
  className,
  onClick,
  loading = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  href,
  ...props
}, ref) => {
  const { isTouch } = useResponsive();

  const baseClasses = cn(
    // Base styles
    'relative rounded-xl transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    
    // Touch optimizations
    isTouch && [
      'min-h-touch', // 44px minimum
      'active:scale-[0.98] active:brightness-95',
      'touch-manipulation', // Disable double-tap zoom
    ],
    
    // GPU acceleration
    'transform-gpu will-change-transform',
    
    // Disabled state
    disabled && 'opacity-60 pointer-events-none',
    
    // Loading state
    loading && 'pointer-events-none',
  );

  const variantClasses = {
    default: 'bg-card border border-border shadow-sm hover:shadow-md',
    elevated: 'bg-card shadow-lg hover:shadow-xl border-0',
    outlined: 'bg-transparent border-2 border-border hover:bg-accent/50',
    ghost: 'bg-transparent hover:bg-accent/50 border-0',
  };

  const sizeClasses = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg',
  };

  const Component = href ? 'a' : 'div';
  const componentProps = href ? { href } : {};

  return (
    <Component
      ref={ref as any}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={disabled || loading ? undefined : onClick}
      {...componentProps}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <div className={cn(
        'relative z-10',
        loading && 'opacity-50'
      )}>
        {children}
      </div>
    </Component>
  );
});

MobileCard.displayName = 'MobileCard';

export default MobileCard;
