
import React from 'react';
import { usePwaStatus } from '@/hooks/usePwaStatus';
import TouchOptimized from '@/components/ui/TouchOptimized';

export default function PwaStatusIndicator() {
  const { isOnline, updateAvailable } = usePwaStatus();

  if (isOnline && !updateAvailable) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex items-center justify-center p-3 z-50 pointer-events-none">
      <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm border shadow-lg pointer-events-auto">
        {!isOnline && (
          <div className="flex items-center gap-2 text-yellow-700 font-semibold text-xs animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            Mode hors ligne
          </div>
        )}
        {updateAvailable && (
            <TouchOptimized variant="link" size="sm" className="p-0">
              <button
                className="text-blue-600 font-semibold text-xs hover:underline"
                onClick={() => window.location.reload()}
              >
                Mettre à jour
              </button>
            </TouchOptimized>
        )}
      </div>
    </div>
  );
}
