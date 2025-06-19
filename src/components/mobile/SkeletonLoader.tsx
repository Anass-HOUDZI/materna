
import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animated?: boolean;
}

export function SkeletonLoader({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animated = true,
}: SkeletonLoaderProps) {
  const baseClasses = cn(
    'bg-muted',
    animated && 'relative overflow-hidden',
    className
  );

  const shimmerClasses = animated ? 'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer' : '';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    card: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'circular' ? height : '100%'),
    height: height || (variant === 'text' ? '1em' : variant === 'circular' ? width : '200px'),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              shimmerClasses,
              index === lines - 1 && 'w-3/4' // Dernière ligne plus courte
            )}
            style={{
              height: height || '1em',
              width: index === lines - 1 ? '75%' : width || '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        shimmerClasses
      )}
      style={style}
    />
  );
}

// Composants pré-configurés
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3 p-4', className)}>
      <SkeletonLoader variant="rectangular" height={200} />
      <SkeletonLoader variant="text" lines={2} />
      <div className="flex items-center space-x-2">
        <SkeletonLoader variant="circular" width={32} height={32} />
        <SkeletonLoader variant="text" width="60%" />
      </div>
    </div>
  );
}

export function SkeletonList({ items = 3, className }: { items?: number; className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-3">
          <SkeletonLoader variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <SkeletonLoader variant="text" width="80%" />
            <SkeletonLoader variant="text" width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonGrid({ items = 6, className }: { items?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export default SkeletonLoader;
