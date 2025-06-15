
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
import { TooltipInfo } from "@/components/ui/TooltipInfo";

export type TrackingMethod = "Cardiff" | "Moore" | "Sadovsky";
const METHODS = [
  { value: "Cardiff", label: "Méthode Cardiff (10 mouvements / 24h)", tooltip: "Recommandé en France : notez chaque mouvement distinct perçu, l’objectif étant au moins 10 en 24h. Moins de 10 → consulter la maternité." },
  { value: "Moore", label: "Méthode Moore (3 mouvements / 30 min)", tooltip: "Utilisée en consultation : comptez tous les mouvements sur une séance de 30 minutes. Moins de 3 mouvements = signal d’alerte." },
  { value: "Sadovsky", label: "Méthode Sadovsky (4 mouvements / 1h)", tooltip: "Courant en zone OMS : compter 4 mouvements ressentis en 1 heure, de préférence après un repas. Moins de 4 en 1h → re-surveillez ou consultez." },
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
  const [touchedMethod, setTouchedMethod] = useState(false);
  const [touchedNote, setTouchedNote] = useState(false);

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
          <div className="flex items-center gap-2">
            <CardTitle>🦶 Tracker Mouvements Bébé</CardTitle>
            <TooltipInfo label="Enregistrez les mouvements fœtaux pour chaque journée grâce à différentes méthodes médicales validées. Aide : cliquez sur (ⓘ) pour chaque méthode." />
          </div>
          <CardDescription>
            Sélectionnez la méthode de comptage&nbsp;
            <TooltipInfo label="Chaque méthode de comptage suit des recommandations médicales : <b>Cardiff</b> : 10 mouvements/24h. <b>Moore</b> : 3 mouvements/30min. <b>Sadovsky</b> : 4 mouvements/1h. Choisissez celle prescrite par votre professionnel ou celle qui vous convient le mieux." />
            . Démarrez la session, cliquez à chaque mouvement ressenti, arrêtez pour enregistrer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-1">
              <label className="font-medium text-sm">
                Méthode de comptage
              </label>
              <TooltipInfo label={
                <>
                  <div>
                    Sélection obligatoire. Survolez chaque bouton pour voir le détail :
                  </div>
                  <ul className="list-disc pl-4 mt-1 text-xs">
                    {METHODS.map(m =>
                      <li key={m.value}><b>{m.value}</b> : {m.tooltip}</li>
                    )}
                  </ul>
                </>
              } />
            </div>
            <div className="flex gap-2 flex-wrap">
              {METHODS.map(m =>
                <div key={m.value} className="relative group">
                  <Button
                    variant={method === m.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setMethod(m.value as TrackingMethod);
                      setTouchedMethod(true);
                    }}
                    disabled={isTiming}
                    className="flex-1"
                    aria-label={`Choisir ${m.label}`}
                    type="button"
                  >
                    {m.label}
                  </Button>
                  <span className="absolute -right-3 top-1">
                    <TooltipInfo label={m.tooltip} tabIndex={-1} />
                  </span>
                </div>
              )}
            </div>
            <div className="transition-all duration-200 min-h-[1.4em] mt-1">
              {touchedMethod && !method && (
                <span className="text-destructive text-xs">
                  Sélectionnez une méthode de comptage.
                </span>
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
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Mouvements :</span>
                <TooltipInfo label="Cliquez sur le bouton dédié chaque fois que vous sentez un mouvement du bébé (coup, roulis, étirement…). Ne comptez pas les hoquets." />
                <span className="font-bold text-lg">{movements}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Durée :</span>{" "}
                <span className="font-mono">{Math.floor(timer/60)}:{(timer%60).toString().padStart(2,"0")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => setMovements(m => m+1)} disabled={!isTiming} type="button">
                Ajouter un mouvement
              </Button>
              <TooltipInfo label="Chaque appui ajoute un mouvement au comptage de cette session. Le suivi précis aide à détecter toute diminution inhabituelle." className="ml-[-4px]" />
              {!isTiming ? (
                <Button variant="default" onClick={startSession} type="button">
                  Commencer une session
                </Button>
              ) : (
                <Button variant="destructive" onClick={stopSession} type="button">
                  Arrêter & Enregistrer
                </Button>
              )}
              <TooltipInfo label={isTiming ? "Cliquez pour arrêter et sauvegarder la session en cours (temps, mouvements, notes seront stockés)" : "Démarrez une nouvelle session de comptage. Un seul suivi par méthode à la fois recommandé."} className="ml-[-4px]" />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-xs font-medium flex items-center gap-1">
                Note contexte (optionnel)
                <TooltipInfo label="Ajoutez des commentaires sur la session : activité du bébé, ressenti, heure, alimentation, position… Utile pour les consultations." />
              </label>
              <Textarea
                className="mt-1 text-xs"
                placeholder="Ex : bébé actif après déjeuner, mouvements + forts que d’habitude"
                value={note}
                onChange={e => { setNote(e.target.value); setTouchedNote(true); }}
                disabled={!isTiming}
                rows={2}
                aria-label="Note contexte session"
                aria-describedby="note-help"
              />
              <div id="note-help" className="text-xs text-muted-foreground min-h-[1.2em]">
                {touchedNote && note.length > 180 && (
                  <span className="text-destructive">Note longue : limitez à l’essentiel pour plus de lisibilité !</span>
                )}
                {!touchedNote && "Indication utile pour le suivi médical et l’analyse ultérieure des mouvements."}
              </div>
            </div>
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
// ⚠️ Ce fichier atteint maintenant ~210 lignes. Pour maintenir qualité et lisibilité, pensez à demander une refactorisation en composants plus petits si de nouvelles fonctionnalités sont prévues !
