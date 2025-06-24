
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
    <div className="mt-8 space-y-6">
      <div className="font-semibold mb-4 flex items-center gap-3 text-slate-800">
        <ListChecks className="w-5 h-5 text-blue-600" />
        Historique 7 derniers jours
      </div>
      
      <div className="flex gap-2 justify-center">
        {weekHistory.map(({ date, total }) => (
          <div
            key={date}
            className={`flex flex-col items-center px-3 py-3 rounded-2xl transition-all duration-300 shadow-sm min-w-[56px] ${
              isToday(new Date(date))
                ? "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-md scale-105"
                : "bg-gradient-to-b from-slate-100 to-slate-200 text-slate-700 hover:from-blue-50 hover:to-blue-100 hover:shadow-md"
            }`}
          >
            <span className="font-bold text-lg">{total}</span>
            <span className="text-xs opacity-80 font-medium">{format(new Date(date), "EE")}</span>
          </div>
        ))}
      </div>
      
      {/* Liste détaillée */}
      <details className="mt-8">
        <summary className="cursor-pointer text-slate-600 hover:text-slate-800 transition-colors font-medium py-2 px-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 hover:border-gray-300">
          Voir sessions précédentes enregistrées
        </summary>
        <div className="mt-4 max-h-64 overflow-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
          <ul className="text-sm space-y-2 p-4">
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
                  <li key={d.timestamp + idx} className="p-3 border-b border-gray-100 last:border-0 hover:bg-blue-50/50 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-slate-600">{format(new Date(d.timestamp), "dd/MM HH:mm")}</span>
                      <div className="text-right">
                        <span className="font-bold text-blue-600">{d.movements} mouv.</span>
                        <span className="text-slate-500 text-xs ml-2">({Math.floor(d.duration / 60)}:{(d.duration % 60).toString().padStart(2, "0")})</span>
                      </div>
                    </div>
                    {d.note && <div className="mt-1 text-xs italic text-slate-500 bg-gray-50 px-2 py-1 rounded-lg">{d.note}</div>}
                  </li>
                );
              })}
            {history.filter(
              e =>
                isBabyMovementTool(e) &&
                getBabyMovementData(e)?.method === method
            ).length === 0 && (
              <li className="text-center p-8 text-slate-500">
                <div className="text-4xl mb-2">📊</div>
                Aucune session enregistrée.
              </li>
            )}
          </ul>
        </div>
      </details>
    </div>
  );
}
