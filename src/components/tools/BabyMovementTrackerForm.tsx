
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/storage/db";
import { format, isToday, subDays } from "date-fns";
import { Calendar, ListChecks, AlertCircle, CheckCircle2 } from "lucide-react";
import type { ToolCategory } from "@/types/models";

// -- Types & Methods
type TrackingMethod = "Cardiff" | "Moore" | "Sadovsky";
const METHODS = [
  { value: "Cardiff", label: "Méthode Cardiff (10 mouvements / 24h)" },
  { value: "Moore", label: "Méthode Moore (3 mouvements / 30 min)" },
  { value: "Sadovsky", label: "Méthode Sadovsky (4 mouvements / 1h)" },
];

// Local data for this tool
type MovementEntryRaw = {
  timestamp: number;
  date: string; // YYYY-MM-DD
  movements: number;
  duration: number; // seconds
  method: TrackingMethod;
  note?: string;
};

type MovementEntry = {
  id?: number;
  category: ToolCategory;
  toolKey: string;
  data: MovementEntryRaw;
};

function getInitialTodayMovements(history: MovementEntry[], method: TrackingMethod) {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const today = history.filter(
    e => e.data.date === todayStr && e.data.method === method
  );
  let count = 0;
  today.forEach(e => { count += e.data.movements });
  return count;
}

export function BabyMovementTrackerForm() {
  const [method, setMethod] = useState<TrackingMethod>("Cardiff");
  const [history, setHistory] = useState<MovementEntry[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const [isTiming, setIsTiming] = useState(false);
  const [movements, setMovements] = useState(0);
  const [note, setNote] = useState("");
  const [alert, setAlert] = useState<string | null>(null);

  // Charger historique 7 derniers jours
  useEffect(() => {
    let isMounted = true;
    db.tools
      .where("toolKey")
      .equals("baby-movement-tracker")
      .reverse()
      .sortBy("timestamp")
      .then(all =>
        isMounted
          ? setHistory(
              all
                // Here: expect e.data to be already MovementEntryRaw, not encrypted!
                .filter(e => e.data && (e.data as MovementEntryRaw).method && (e.data as MovementEntryRaw).date)
                .map((e: any) => ({
                  ...e,
                  data: e.data as MovementEntryRaw,
                }))
            )
          : undefined
      );
    return () => {
      isMounted = false;
    };
  }, []);

  // Timer: incremente chaque seconde si actif
  useEffect(() => {
    if (!isTiming) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isTiming]);

  // Détection alertes selon méthode et valeurs du jour
  useEffect(() => {
    const todayCount = getInitialTodayMovements(history, method) + movements;
    let recommend = "";
    switch (method) {
      case "Cardiff":
        recommend = todayCount < 10 ? "Pensez à surveiller les mouvements du bébé tout au long de la journée. Si moins de 10 mouvements sur 24h ou arrêt net, contactez la maternité." : "Patron de mouvements rassurant.";
        break;
      case "Moore":
        recommend = movements < 3 ? "Ajoutez les mouvements sur 30 minutes. Moins de 3 mouvements sur 30 min → consulter." : "Patron de mouvements rassurant.";
        break;
      case "Sadovsky":
        recommend = movements < 4 ? "Comptez sur 1h : moins de 4 mouvements = alerte. Recommencez plus tard si besoin." : "Patron de mouvements rassurant.";
        break;
    }
    if (
      (method === "Cardiff" && todayCount < 10)
      || (method === "Moore" && movements < 3 && !isTiming)
      || (method === "Sadovsky" && movements < 4 && !isTiming)
    ) {
      setAlert(recommend);
    } else {
      setAlert(null);
    }
  }, [history, method, movements, isTiming]);

  const startSession = () => {
    setIsTiming(true);
    setTimer(0);
    setMovements(0);
    setNote("");
  };

  const stopSession = async () => {
    setIsTiming(false);
    const entry: MovementEntryRaw = {
      timestamp: Date.now(),
      date: format(new Date(), "yyyy-MM-dd"),
      method,
      movements,
      duration: timer,
      note: note.trim() ? note.trim() : undefined,
    };
    // Save using { data: MovementEntryRaw, ... }
    await db.tools.add({
      toolKey: "baby-movement-tracker",
      category: "pregnancy",
      data: entry,
    });
    setHistory([
      { toolKey: "baby-movement-tracker", category: "pregnancy", data: entry },
      ...history,
    ]);
    setMovements(0);
    setTimer(0);
    setNote("");
  };

  // Pour affichage historique : 7 derniers jours, par méthode
  const weekHistory = (() => {
    const days: { date: string; total: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = subDays(new Date(), i);
      const dateStr = format(d, "yyyy-MM-dd");
      const total = history
        .filter(h => h.data.date === dateStr && h.data.method === method)
        .reduce((acc, h) => acc + h.data.movements, 0);
      days.push({ date: dateStr, total });
    }
    return days;
  })();

  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>🦶 Tracker Mouvements Bébé</CardTitle>
          <CardDescription>
            Sélectionnez la méthode. Démarrez la session, cliquez à chaque mouvement ressenti, arrêtez pour enregistrer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="font-medium text-sm mb-1 block">Méthode de comptage</label>
            <div className="flex gap-2 flex-wrap">
              {METHODS.map(m =>
                <Button
                  key={m.value}
                  variant={method === m.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMethod(m.value as TrackingMethod)}
                  disabled={isTiming}
                  className="flex-1"
                >
                  {m.label}
                </Button>
              )}
            </div>
          </div>
          <div className="my-4">
            <div className="flex gap-2 items-center">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Semaine du </span>
              <span className="font-mono">{format(new Date(), "dd/MM/yyyy")}</span>
            </div>
          </div>
          {/* Affichage session actuelle */}
          <div className="border rounded-lg p-3 mb-3 bg-accent flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 justify-between items-center">
              <div>
                <span className="text-xs text-muted-foreground">Mouvements :</span>{" "}
                <span className="font-bold text-lg">{movements}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Durée :</span>{" "}
                <span className="font-mono">{Math.floor(timer/60)}:{(timer%60).toString().padStart(2,"0")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => setMovements(m => m+1)} disabled={!isTiming}>
                Ajouter un mouvement
              </Button>
              {!isTiming ? (
                <Button variant="default" onClick={startSession}>
                  Commencer une session
                </Button>
              ) : (
                <Button variant="destructive" onClick={stopSession}>
                  Arrêter & Enregistrer
                </Button>
              )}
            </div>
            <Textarea
              className="mt-2 text-xs"
              placeholder="Note contexte (activité, position, etc - optionnel)"
              value={note}
              onChange={e => setNote(e.target.value)}
              disabled={!isTiming}
              rows={2}
            />
          </div>
          {alert && (
            <div className="flex items-center text-destructive gap-2 my-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{alert}</span>
            </div>
          )}
          {!alert && isTiming && (
            <div className="flex items-center text-green-700 gap-2 my-2 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Mouvements dans la norme pour cette méthode.</span>
            </div>
          )}
          {/* Historique visuel 7 jours */}
          <div className="mt-7">
            <div className="font-medium mb-2 flex items-center gap-2">
              <ListChecks className="w-4 h-4" />
              Historique 7 derniers jours ({METHODS.find(m=>m.value===method)?.label})
            </div>
            <div className="flex gap-1 text-[12px]">
              {weekHistory.map((d, i) => (
                <div
                  key={d.date}
                  className={`flex flex-col items-center px-1 py-1 rounded ${
                    isToday(new Date(d.date))
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                  style={{ minWidth: 44 }}
                >
                  <span className="font-mono font-semibold">{d.total}</span>
                  <span className="opacity-60">{format(new Date(d.date), "EE")}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Historique détaillé */}
          <details className="mt-6">
            <summary className="cursor-pointer text-muted-foreground">Voir sessions précédentes enregistrées</summary>
            <div className="mt-2 max-h-48 overflow-auto">
              <ul className="text-xs space-y-2">
                {history
                  .filter(e => e.data.method === method)
                  .slice(0, 10)
                  .map(e => (
                    <li key={e.data.timestamp} className="border-b pb-1">
                      <span className="font-mono">{format(new Date(e.data.timestamp), "dd/MM HH:mm")}</span> – 
                      <b>{e.data.movements} mouv.</b> ({Math.floor(e.data.duration/60)}:{(e.data.duration%60).toString().padStart(2,"0")}) 
                      {e.data.note && <span className="ml-1 italic opacity-60">({e.data.note})</span>}
                    </li>
                  ))}
                {history.filter(e => e.data.method === method).length === 0 && (
                  <li className="opacity-60">Aucune session enregistrée.</li>
                )}
              </ul>
            </div>
          </details>
        </CardContent>
      </Card>
    </div>
  );
}

// -- End of file --

