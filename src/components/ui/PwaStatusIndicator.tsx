
import React from 'react';
import { usePwaStatus } from '@/hooks/usePwaStatus';
import TouchOptimized from '@/components/ui/TouchOptimized';

export default function PwaStatusIndicator() {
  const { isOnline, updateAvailable } = usePwaStatus();

  // Couleurs
  const baseCls =
    'mx-auto rounded-full border shadow px-3 py-1 text-xs font-medium flex items-center gap-2 transition-all duration-200';

  // La carte est centrée, largeur limitée, marges latérales auto pour tous les statuts
  const CardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-full flex justify-center items-end mt-auto">
      <div className="mb-2 w-full max-w-xs sm:max-w-sm px-3">
        {children}
      </div>
    </div>
  );

  if (isOnline && !updateAvailable) {
    return (
      <CardWrapper>
        <div className={`${baseCls} bg-green-50 border-green-100 text-green-700 w-full`}>
          <span className="flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400 mr-1"></span>
            </span>
            En ligne&nbsp;: <span className="font-semibold">toutes fonctionnalités disponibles</span>
          </span>
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper>
      <div className={`${baseCls} bg-background/90 backdrop-blur-[2px] border w-full`}>
        {!isOnline && (
          <div className="flex items-center gap-1 text-yellow-700 font-semibold">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            Hors ligne&nbsp;: fonctionnalités limitées
          </div>
        )}
        {updateAvailable && (
          <TouchOptimized variant="link" size="sm" className="p-0">
            <button
              className="text-blue-600 font-semibold hover:underline text-xs"
              onClick={() => window.location.reload()}
            >
              Nouvelle version disponible&nbsp;: actualiser
            </button>
          </TouchOptimized>
        )}
      </div>
    </CardWrapper>
  );
}
