
import React, { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';
import { Search, Menu, X } from 'lucide-react';
import TouchOptimized from '@/components/ui/TouchOptimized';

interface MobileLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  bottomNav?: ReactNode;
  className?: string;
  sidebarCollapsible?: boolean;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export default function MobileLayout({
  children,
  sidebar,
  header,
  bottomNav,
  className,
  sidebarCollapsible = true,
  showSearch = false,
  onSearch,
  searchPlaceholder = "Rechercher...",
}: MobileLayoutProps) {
  const { isMobile, isTablet, safeAreaTop, safeAreaBottom } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div 
      className={cn(
        'min-h-screen flex flex-col bg-background',
        'relative overflow-hidden',
        className
      )}
      style={{
        paddingTop: safeAreaTop,
        paddingBottom: safeAreaBottom,
      }}
    >
      {/* Mobile Header */}
      {(isMobile || isTablet) && (
        <header className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="flex items-center gap-3 px-4 py-3">
            {/* Menu button */}
            {sidebar && sidebarCollapsible && (
              <TouchOptimized variant="button" size="sm">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 -ml-2 rounded-lg hover:bg-accent touch:min-h-touch touch:min-w-touch"
                  aria-label="Ouvrir le menu"
                >
                  <Menu size={20} />
                </button>
              </TouchOptimized>
            )}

            {/* Search - Hidden on mobile */}
            {showSearch && !isMobile && (
              <div className="flex-1 relative">
                <div className="relative">
                  <Search 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder={searchPlaceholder}
                    className={cn(
                      'w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background',
                      'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                      'transition-all duration-200',
                      searchFocused && 'shadow-sm',
                      'touch:min-h-touch'
                    )}
                  />
                </div>
              </div>
            )}

            {/* Custom header content */}
            {header}
          </div>
        </header>
      )}

      {/* Main Layout */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {sidebar && (
          <>
            {/* Sidebar Overlay */}
            {sidebarOpen && (isMobile || isTablet) && (
              <div 
                className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                onClick={closeSidebar}
                style={{ paddingTop: safeAreaTop }}
              />
            )}

            {/* Sidebar Content */}
            <aside 
              className={cn(
                'bg-card border-r border-border transform transition-transform duration-300 ease-in-out',
                // Desktop
                !isMobile && !isTablet && 'relative flex-shrink-0 w-64',
                // Mobile/Tablet
                (isMobile || isTablet) && [
                  'fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50',
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                ]
              )}
              style={{
                paddingTop: (isMobile || isTablet) ? safeAreaTop : 0,
              }}
            >
              {/* Sidebar Header */}
              {(isMobile || isTablet) && (
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="font-semibold bg-clip-text text-transparent" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Menu</h2>
                  <TouchOptimized variant="button" size="sm">
                    <button
                      onClick={closeSidebar}
                      className="p-2 rounded-lg hover:bg-accent touch:min-h-touch touch:min-w-touch"
                      aria-label="Fermer le menu"
                    >
                      <X size={20} />
                    </button>
                  </TouchOptimized>
                </div>
              )}

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto">
                {sidebar}
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 relative">
          {/* Desktop Header */}
          {!isMobile && !isTablet && header && (
            <header className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-30">
              {header}
            </header>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation */}
      {bottomNav && (isMobile || isTablet) && (
        <nav 
          className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-t border-border"
          style={{ paddingBottom: safeAreaBottom }}
        >
          {bottomNav}
        </nav>
      )}
    </div>
  );
}
