
import React from "react";
import { format, isToday } from "date-fns";
import { ListChecks } from "lucide-react";
import type { EncryptedToolData } from "@/types/models";
import { getBabyMovementData, isBabyMovementTool } from "@/utils/baby-movement";
import type { TrackingMethod } from "./BabyMovementTrackerForm";

type Props = {
  history: EncryptedToolData[];
  method: TrackingMethod;
};

export default function BabyMovementHistory({ history, method }: Props) {
  // Semaine glissante
  const weekHistory = (() => {
    const days: { date: string; total: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = format(d, "yyyy-MM-dd");
      const total = history
        .filter(
          e =>
            isBabyMovementTool(e) &&
            getBabyMovementData(e)?.method === method &&
            getBabyMovementData(e)?.date === dateStr
        )
        .reduce((acc, e) => acc + (getBabyMovementData(e)?.movements ?? 0), 0);
      days.push({ date: dateStr, total });
    }
    return days;
  })();

  return (
    <div className="mt-7">
      <div className="font-medium mb-2 flex items-center gap-2">
        <ListChecks className="w-4 h-4" />
        Historique 7 derniers jours
      </div>
      <div className="flex gap-1 text-[12px]">
        {weekHistory.map(({ date, total }) => (
          <div
            key={date}
            className={`flex flex-col items-center px-1 py-1 rounded ${
              isToday(new Date(date))
                ? "bg-primary text-white"
                : "bg-muted"
            }`}
            style={{ minWidth: 44 }}
          >
            <span className="font-mono font-semibold">{total}</span>
            <span className="opacity-60">{format(new Date(date), "EE")}</span>
          </div>
        ))}
      </div>
      {/* Liste détaillée */}
      <details className="mt-6">
        <summary className="cursor-pointer text-muted-foreground">Voir sessions précédentes enregistrées</summary>
        <div className="mt-2 max-h-48 overflow-auto">
          <ul className="text-xs space-y-2">
            {history
              .filter(
                e =>
                  isBabyMovementTool(e) &&
                  getBabyMovementData(e)?.method === method
              )
              .slice(0, 10)
              .map((e, idx) => {
                const d = getBabyMovementData(e);
                if (!d) return null;
                return (
                  <li key={d.timestamp + idx} className="border-b pb-1">
                    <span className="font-mono">{format(new Date(d.timestamp), "dd/MM HH:mm")}</span> – 
                    <b>{d.movements} mouv.</b> ({Math.floor(d.duration / 60)}:{(d.duration % 60).toString().padStart(2, "0")})
                    {d.note && <span className="ml-1 italic opacity-60">({d.note})</span>}
                  </li>
                );
              })}
            {history.filter(
              e =>
                isBabyMovementTool(e) &&
                getBabyMovementData(e)?.method === method
            ).length === 0 && (
              <li className="opacity-60">Aucune session enregistrée.</li>
            )}
          </ul>
        </div>
      </details>
    </div>
  );
}
