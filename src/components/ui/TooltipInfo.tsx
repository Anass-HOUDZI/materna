
import * as React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// Props : label (contenu du tooltip), tabIndex (pour accessibilité, optionnel)
export function TooltipInfo({
  label,
  tabIndex = -1,
  className,
}: {
  label: React.ReactNode;
  tabIndex?: number;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          tabIndex={tabIndex}
          aria-label="Informations sur le champ"
          className={"p-0.5 " + (className || "")}
          style={{ lineHeight: 0, background: "transparent", border: "none", cursor: "pointer" }}
        >
          <Info className="w-4 h-4 text-blue-500" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">{label}</TooltipContent>
    </Tooltip>
  );
}
