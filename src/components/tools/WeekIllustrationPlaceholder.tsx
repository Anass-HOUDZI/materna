
import React from "react";

export default function WeekIllustrationPlaceholder({ week }: { week: number }) {
  // Placeholder illustration (can be replaced by real image/data later)
  return (
    <div className="flex flex-col items-center justify-center py-4 mb-2">
      <svg width={100} height={100} aria-label="Illustration semaine grossesse">
        <circle cx={50} cy={50} r={44} fill="#e0e7ff" />
        <text x={50} y={60} fontSize={32} fill="#6366f1" textAnchor="middle" fontWeight="bold">
          {week}
        </text>
      </svg>
      <span className="text-xs mt-2 text-muted-foreground opacity-70">Semaine {week}</span>
    </div>
  );
}
