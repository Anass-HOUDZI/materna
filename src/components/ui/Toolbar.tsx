import React from "react";
import { cn } from "@/lib/utils";
import { Calculator, RotateCcw, Share2, Printer, Download, Clock } from "lucide-react";
import BaseButton from "./BaseButton";

interface ToolbarProps {
  onCalculate?: () => void;
  onReset?: () => void;
  onShare?: () => void;
  onPrint?: () => void;
  onExport?: () => void;
  isCalculating?: boolean;
  lastUpdated?: string;
  className?: string;
  title?: string;
}

const Toolbar = React.memo<ToolbarProps>(({
  onCalculate,
  onReset,
  onShare,
  onPrint,
  onExport,
  isCalculating = false,
  lastUpdated,
  className,
  title = "Outil de calcul"
}) => {
  return (
    <div className={cn(
      "sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/50 shadow-lg",
      "transition-all duration-300 ease-out",
      className
    )}>
      <div className="max-w-full mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left Section - Title & Status */}
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
              {lastUpdated && (
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <Clock size={12} />
                  <span>Mis à jour: {lastUpdated}</span>
                </div>
              )}
            </div>
            
            {isCalculating && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Calcul en cours...</span>
              </div>
            )}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {onCalculate && (
              <BaseButton
                onClick={onCalculate}
                disabled={isCalculating}
                variant="primary"
                size="md"
                className="gap-2"
              >
                <Calculator size={16} />
                Calculer
              </BaseButton>
            )}
            
            {onReset && (
              <BaseButton
                onClick={onReset}
                variant="outline"
                size="md"
                className="gap-2"
              >
                <RotateCcw size={16} />
                Réinitialiser
              </BaseButton>
            )}

            <div className="flex items-center gap-1">
              {onShare && (
                <BaseButton
                  onClick={onShare}
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  aria-label="Partager"
                >
                  <Share2 size={16} />
                </BaseButton>
              )}
              
              {onPrint && (
                <BaseButton
                  onClick={onPrint}
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  aria-label="Imprimer"
                >
                  <Printer size={16} />
                </BaseButton>
              )}
              
              {onExport && (
                <BaseButton
                  onClick={onExport}
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  aria-label="Exporter"
                >
                  <Download size={16} />
                </BaseButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Toolbar.displayName = "Toolbar";

export default Toolbar;