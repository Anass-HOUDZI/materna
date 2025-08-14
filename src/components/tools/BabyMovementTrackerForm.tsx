
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/storage/db";
import { format } from "date-fns";
import { Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import type { EncryptedToolData } from "@/types/models";
import BabyMovementHistory from "./BabyMovementHistory";
import type { BabyMovementEntry } from "@/types/movement-entry";
import { isBabyMovementTool, getBabyMovementData, wrapBabyMovementEntry } from "@/utils/baby-movement";

export type TrackingMethod = "Cardiff" | "Moore" | "Sadovsky";
const METHODS = [
  { value: "Cardiff", label: "Méthode Cardiff (10 mouvements / 24h)" },
  { value: "Moore", label: "Méthode Moore (3 mouvements / 30 min)" },
  { value: "Sadovsky", label: "Méthode Sadovsky (4 mouvements / 1h)" },
];

// Utilitaire pour mouvements du jour
function movementsToday(history: EncryptedToolData[], method: TrackingMethod) {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  return history
    .filter(
      e =>
        isBabyMovementTool(e) &&
        getBabyMovementData(e)?.method === method &&
        getBabyMovementData(e)?.date === todayStr
    )
    .reduce((acc, e) => acc + (getBabyMovementData(e)?.movements ?? 0), 0);
}

export function BabyMovementTrackerForm() {
  const [method, setMethod] = useState<TrackingMethod>("Cardiff");
  const [history, setHistory] = useState<EncryptedToolData[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const [isTiming, setIsTiming] = useState(false);
  const [movements, setMovements] = useState(0);
  const [note, setNote] = useState("");
  const [alert, setAlert] = useState<string | null>(null);

  // Charger l'historique (7 derniers jours)
  useEffect(() => {
    let mounted = true;
    db.tools
      .where("toolKey")
      .equals("baby-movement-tracker")
      .reverse()
      .sortBy("timestamp")
      .then((all) => {
        if (!mounted) return;
        setHistory(all.filter(isBabyMovementTool));
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Timer
  useEffect(() => {
    if (!isTiming) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isTiming]);

  // Détection alertes
  useEffect(() => {
    const todayCount = movementsToday(history, method) + movements;
    let recommend = "";
    switch (method) {
      case "Cardiff":
        recommend = todayCount < 10
          ? "Pensez à surveiller les mouvements du bébé. Si moins de 10 mouvements sur 24h, contactez la maternité."
          : "Patron de mouvements rassurant.";
        break;
      case "Moore":
        recommend = movements < 3 && !isTiming
          ? "Ajoutez les mouvements sur 30 min. Moins de 3 mouvements sur 30 min → consulter."
          : "Patron de mouvements rassurant.";
        break;
      case "Sadovsky":
        recommend = movements < 4 && !isTiming
          ? "Comptez 1h : moins de 4 mouvements = alerte. Recommencez plus tard."
          : "Patron de mouvements rassurant.";
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
    const entry: BabyMovementEntry = {
      timestamp: Date.now(),
      date: format(new Date(), "yyyy-MM-dd"),
      method,
      movements,
      duration: timer,
      note: note.trim() ? note.trim() : undefined,
    };
    await db.tools.add(wrapBabyMovementEntry(entry));
    setHistory([{ ...wrapBabyMovementEntry(entry) }, ...history]);
    setMovements(0);
    setTimer(0);
    setNote("");
  };

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
          {/* Historique - composant dédié */}
          <BabyMovementHistory history={history} method={method} />
        </CardContent>
      </Card>
    </div>
  );
}
