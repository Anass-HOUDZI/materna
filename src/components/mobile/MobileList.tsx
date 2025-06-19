
import React, { ReactNode, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';

interface MobileListProps {
  children: ReactNode;
  className?: string;
  onRefresh?: () => Promise<void>;
  onLoadMore?: () => Promise<void>;
  loading?: boolean;
  refreshing?: boolean;
  hasMore?: boolean;
  refreshThreshold?: number;
  loadMoreThreshold?: number;
  emptyState?: ReactNode;
  skeleton?: ReactNode;
}

export default function MobileList({
  children,
  className,
  onRefresh,
  onLoadMore,
  loading = false,
  refreshing = false,
  hasMore = false,
  refreshThreshold = 60,
  loadMoreThreshold = 100,
  emptyState,
  skeleton,
}: MobileListProps) {
  const { isTouch } = useResponsive();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!onRefresh || !isTouch) return;
    
    const scrollTop = listRef.current?.scrollTop || 0;
    if (scrollTop === 0) {
      setStartY(e.touches[0].clientY);
      setIsDragging(true);
    }
  }, [onRefresh, isTouch]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !onRefresh) return;
    
    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - startY);
    
    if (distance > 0) {
      setPullDistance(Math.min(distance, refreshThreshold * 1.5));
      e.preventDefault();
    }
  }, [isDragging, startY, onRefresh, refreshThreshold]);

  const handleTouchEnd = useCallback(async () => {
    if (!isDragging || !onRefresh) return;
    
    setIsDragging(false);
    
    if (pullDistance >= refreshThreshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
  }, [isDragging, pullDistance, refreshThreshold, onRefresh]);

  const handleScroll = useCallback(async (e: React.UIEvent<HTMLDivElement>) => {
    if (!onLoadMore || loading || !hasMore) return;
    
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    
    if (distanceFromBottom < loadMoreThreshold) {
      await onLoadMore();
    }
  }, [onLoadMore, loading, hasMore, loadMoreThreshold]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      setPullDistance(0);
      setIsRefreshing(false);
      setIsDragging(false);
    };
  }, []);

  const pullProgress = Math.min(pullDistance / refreshThreshold, 1);
  const showPullIndicator = pullDistance > 10;

  return (
    <div 
      ref={listRef}
      className={cn(
        'relative overflow-auto',
        // iOS momentum scrolling
        'overflow-scrolling-touch',
        // Safe area padding
        'pb-safe-bottom',
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onScroll={handleScroll}
      style={{
        WebkitOverflowScrolling: 'touch',
        transform: isDragging ? `translateY(${pullDistance * 0.5}px)` : undefined,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Pull to refresh indicator */}
      {onRefresh && showPullIndicator && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 z-10"
          style={{
            transform: `translateY(-100%) translateY(${pullDistance * 0.5}px)`,
            opacity: pullProgress,
          }}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <div 
              className={cn(
                'w-6 h-6 border-2 border-current border-t-transparent rounded-full transition-transform duration-200',
                (isRefreshing || refreshing) ? 'animate-spin' : '',
                pullProgress >= 1 ? 'rotate-180' : `rotate-${Math.round(pullProgress * 180)}`
              )}
            />
            <span className="text-sm font-medium">
              {isRefreshing || refreshing 
                ? 'Actualisation...' 
                : pullProgress >= 1 
                  ? 'Relâchez pour actualiser' 
                  : 'Tirez pour actualiser'
              }
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {loading && skeleton ? (
          skeleton
        ) : React.Children.count(children) === 0 && emptyState ? (
          <div className="flex items-center justify-center py-12">
            {emptyState}
          </div>
        ) : (
          children
        )}
      </div>

      {/* Load more indicator */}
      {hasMore && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Chargement...</span>
          </div>
        </div>
      )}
    </div>
  );
}
