
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
import ResponsiveGrid from "@/components/ui/ResponsiveGrid";
import ResponsiveContainer from "@/components/ui/ResponsiveContainer";

export type TrackingMethod = "Cardiff" | "Moore" | "Sadovsky";
const METHODS = [
  { value: "Cardiff", label: "Cardiff", description: "10 mouvements / 24h" },
  { value: "Moore", label: "Moore", description: "3 mouvements / 30 min" },
  { value: "Sadovsky", label: "Sadovsky", description: "4 mouvements / 1h" },
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
    <ResponsiveContainer maxWidth="full" padding="none">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl xs:text-3xl font-bold">
            🦶 Tracker Mouvements Bébé
          </CardTitle>
          <CardDescription className="text-base xs:text-lg leading-relaxed">
            Sélectionnez la méthode. Démarrez la session, cliquez à chaque mouvement ressenti, arrêtez pour enregistrer.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full space-y-6">
          {/* Sélection de méthode avec grille responsive */}
          <div className="w-full">
            <label className="font-medium text-sm xs:text-base mb-3 block">
              Méthode de comptage
            </label>
            <ResponsiveGrid 
              minItemWidth={120}
              gap="sm"
              className="w-full"
            >
              {METHODS.map(m => (
                <Button
                  key={m.value}
                  variant={method === m.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMethod(m.value as TrackingMethod)}
                  disabled={isTiming}
                  className="w-full min-h-[60px] xs:min-h-[68px] p-3 flex flex-col items-center justify-center text-center touch-target"
                >
                  <span className="font-semibold text-xs xs:text-sm leading-tight">
                    {m.label}
                  </span>
                  <span className="text-xs opacity-80 mt-1 leading-tight break-words">
                    {m.description}
                  </span>
                </Button>
              ))}
            </ResponsiveGrid>
          </div>

          {/* Date actuelle */}
          <div className="w-full">
            <div className="flex gap-2 items-center justify-center xs:justify-start">
              <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm xs:text-base">Semaine du </span>
              <span className="font-mono text-sm xs:text-base">
                {format(new Date(), "dd/MM/yyyy")}
              </span>
            </div>
          </div>

          {/* Session de tracking */}
          <div className="w-full border rounded-lg p-4 xs:p-6 bg-accent">
            {/* Compteurs */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
              <div className="flex-1 min-w-[120px]">
                <span className="text-xs text-muted-foreground block">Mouvements :</span>
                <span className="font-bold text-2xl xs:text-3xl">{movements}</span>
              </div>
              <div className="flex-1 min-w-[120px]">
                <span className="text-xs text-muted-foreground block">Durée :</span>
                <span className="font-mono text-xl xs:text-2xl">
                  {Math.floor(timer/60)}:{(timer%60).toString().padStart(2,"0")}
                </span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="w-full space-y-3">
              <ResponsiveGrid minItemWidth={160} gap="sm" className="w-full">
                <Button 
                  variant="secondary" 
                  onClick={() => setMovements(m => m+1)} 
                  disabled={!isTiming}
                  className="w-full touch-target min-h-[48px]"
                >
                  Ajouter un mouvement
                </Button>
                {!isTiming ? (
                  <Button 
                    variant="default" 
                    onClick={startSession}
                    className="w-full touch-target min-h-[48px]"
                  >
                    Commencer une session
                  </Button>
                ) : (
                  <Button 
                    variant="destructive" 
                    onClick={stopSession}
                    className="w-full touch-target min-h-[48px]"
                  >
                    Arrêter & Enregistrer
                  </Button>
                )}
              </ResponsiveGrid>

              {/* Note contextuelle */}
              <Textarea
                className="w-full text-xs xs:text-sm resize-none"
                placeholder="Note contexte (activité, position, etc - optionnel)"
                value={note}
                onChange={e => setNote(e.target.value)}
                disabled={!isTiming}
                rows={3}
              />
            </div>
          </div>

          {/* Alertes */}
          {alert && (
            <div className="w-full flex items-start text-destructive gap-3 p-4 bg-destructive/10 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm xs:text-base leading-relaxed break-words">
                {alert}
              </span>
            </div>
          )}
          
          {!alert && isTiming && (
            <div className="w-full flex items-start text-green-700 gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm xs:text-base leading-relaxed">
                Mouvements dans la norme pour cette méthode.
              </span>
            </div>
          )}

          {/* Historique */}
          <div className="w-full">
            <BabyMovementHistory history={history} method={method} />
          </div>
        </CardContent>
      </Card>
    </ResponsiveContainer>
  );
}
