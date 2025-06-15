import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from "recharts";
import Dexie from "dexie";
import { TooltipInfo } from "@/components/ui/TooltipInfo";

const IOM_RECOMMENDATIONS = [
  { imcMin: 0, imcMax: 18.5, totalMin: 12.5, totalMax: 18 },
  { imcMin: 18.5, imcMax: 24.9, totalMin: 11.5, totalMax: 16 },
  { imcMin: 25, imcMax: 29.9, totalMin: 7, totalMax: 11.5 },
  { imcMin: 30, imcMax: 200, totalMin: 5, totalMax: 9 },
];

type HistoryEntry = {
  id?: number;
  createdAt: number;
  data: {
    preWeight: number;
    preHeight: number;
    currentWeight: number;
    week: number;
    imc: number;
    targetMin: number;
    targetMax: number;
    delta: number;
    alerts: string[];
  };
};

class WeightDB extends Dexie {
  history: Dexie.Table<HistoryEntry, number>;
  constructor() {
    super("pregnancy_weight_db");
    this.version(1).stores({
      history: '++id,createdAt',
    });
    this.history = this.table("history");
  }
}
const db = new WeightDB();

export function PregnancyWeightGainCalculatorForm() {
  // Pré-grossesse
  const [preWeight, setPreWeight] = useState<number | "">("");
  const [preHeight, setPreHeight] = useState<number | "">("");
  // Suivi courant
  const [currentWeight, setCurrentWeight] = useState<number | "">("");
  const [week, setWeek] = useState<number | "">("");
  // Historique local
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Ajout validation + feedback champ par champ
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  function getError(field: string): string | null {
    switch (field) {
      case "preWeight":
        if (touched.preWeight && (!preWeight || Number(preWeight) < 30))
          return "Poids requis (minimum 30 kg)";
        break;
      case "preHeight":
        if (touched.preHeight && (!preHeight || Number(preHeight) < 120))
          return "Taille requise (minimum 120 cm)";
        break;
      case "currentWeight":
        if (touched.currentWeight && (!currentWeight || Number(currentWeight) < 30))
          return "Poids actuel requis (minimum 30 kg)";
        break;
      case "week":
        if (touched.week && (!week || Number(week) < 4))
          return "Semaine grossesse requise (min. 4)";
        break;
    }
    return null;
  }

  // Calculs
  const imc =
    preWeight && preHeight
      ? Number((Number(preWeight) / Math.pow(Number(preHeight) / 100, 2)).toFixed(1))
      : null;
  const iom = IOM_RECOMMENDATIONS.find(r => imc !== null && imc >= r.imcMin && imc < r.imcMax);

  // Recos
  const targetMin = iom ? iom.totalMin : 0;
  const targetMax = iom ? iom.totalMax : 0;
  const bmiClass =
    imc == null
      ? "Non calculé"
      : imc < 18.5
      ? "Maigreur"
      : imc < 25
      ? "Normal"
      : imc < 30
      ? "Surpoids"
      : "Obésité";
  // Saisie poids actuel
  const delta =
    currentWeight && preWeight ? Number((Number(currentWeight) - Number(preWeight)).toFixed(1)) : null;
  const targetMinNow = targetMin && week ? Number((targetMin * Number(week) / 40).toFixed(1)) : null;
  const targetMaxNow = targetMax && week ? Number((targetMax * Number(week) / 40).toFixed(1)) : null;

  let weightZone: "green" | "orange" | "red" | undefined = undefined;
  if (delta != null && targetMinNow != null && targetMaxNow != null) {
    if (delta < targetMinNow - 1) weightZone = "orange";
    else if (delta > targetMaxNow + 1) weightZone = "red";
    else weightZone = "green";
  }

  // Alerts 
  const alerts: string[] = [];
  if (imc != null && (imc < 17 || imc >= 35)) {
    alerts.push("Votre IMC est en dehors des valeurs habituelles. Veuillez consulter un professionnel de santé.");
  }
  if (delta != null && weightZone === "red") {
    alerts.push("Prise de poids supérieure aux recommandations pour l’avancement actuel.");
  }
  if (delta != null && weightZone === "orange") {
    alerts.push("Prise de poids inférieure aux recommandations pour cette semaine.");
  }

  // Sauvegarder résultat
  async function saveHistory() {
    if (!preWeight || !preHeight || !currentWeight || !week) {
      toast({
        title: "Données incomplètes",
        description: "Merci de renseigner tous les champs pour enregistrer.",
        variant: "destructive",
      });
      return;
    }
    const entry: HistoryEntry = {
      createdAt: Date.now(),
      data: {
        preWeight: Number(preWeight),
        preHeight: Number(preHeight),
        currentWeight: Number(currentWeight),
        week: Number(week),
        imc: imc!,
        targetMin,
        targetMax,
        delta: delta!,
        alerts,
      },
    };
    await db.history.add(entry);
    setHistory(await db.history.orderBy('createdAt').reverse().toArray());
    toast({ title: "Donnée enregistrée !" });
  }

  // Charger historique au montage
  useEffect(() => {
    db.history.orderBy('createdAt').reverse().toArray().then(setHistory);
  }, []);

  // Export PDF
  function exportPDF() {
    window.print();
    toast({
      title: "Astuce",
      description:
        "Pour un PDF médical exportez via l’impression du navigateur : CTRL+P puis « Imprimer en PDF ». L’historique s’affichera aussi.",
    });
  }

  // Préparation données graphe
  const graphHistory = history
    .map(e => ({
      week: e.data.week,
      prise: e.data.delta,
      cibleMin: Number((e.data.targetMin * e.data.week / 40).toFixed(1)),
      cibleMax: Number((e.data.targetMax * e.data.week / 40).toFixed(1)),
    }))
    .sort((a, b) => a.week - b.week);

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle>
          Calculateur Prise de Poids Grossesse <span className="text-xs font-normal text-muted">(basé IOM/HAS)</span>
        </CardTitle>
        <div className="text-muted-foreground text-sm mt-2">
          Obtenez vos recommandations officielles personnalisées, visualisez votre évolution, alertez IMC extrêmes et exportez pour suivi médical.
        </div>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            saveHistory();
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1">
                <Label>Poids avant grossesse (kg)</Label>
                <TooltipInfo label="Poids réel avant le début de la grossesse. À mesurer idéalement sans vêtement et avec une balance fiable (le plus récent possible)." />
              </div>
              <Input
                type="number"
                step="0.1"
                value={preWeight}
                min="30"
                max="200"
                onChange={e => {
                  setPreWeight(e.target.value ? Number(e.target.value) : "");
                  setTouched(t => ({ ...t, preWeight: true }));
                }}
                onBlur={() => setTouched(t => ({ ...t, preWeight: true }))}
                required
                aria-describedby="form-preweight-message"
                aria-invalid={!!getError("preWeight")}
              />
              <div className="transition-all duration-300 min-h-[1.6em] text-xs" id="form-preweight-message">
                <span className={getError("preWeight") ? "text-destructive" : "text-muted-foreground"}>
                  {getError("preWeight") || "Exemple : 58.5 (en kg, sans vêtement si possible)."}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <Label>Taille (cm)</Label>
                <TooltipInfo label="Taille réelle (en centimètres) mesurée debout, sans chaussures. Permet de calculer l’IMC précis et d’adapter les recommandations." />
              </div>
              <Input
                type="number"
                step="1"
                value={preHeight}
                min="120"
                max="220"
                onChange={e => {
                  setPreHeight(e.target.value ? Number(e.target.value) : "");
                  setTouched(t => ({ ...t, preHeight: true }));
                }}
                onBlur={() => setTouched(t => ({ ...t, preHeight: true }))}
                required
                aria-describedby="form-preheight-message"
                aria-invalid={!!getError("preHeight")}
              />
              <div className="transition-all duration-300 min-h-[1.6em] text-xs" id="form-preheight-message">
                <span className={getError("preHeight") ? "text-destructive" : "text-muted-foreground"}>
                  {getError("preHeight") || "Exemple : 165 (en cm, sans chaussures)."}
                </span>
              </div>
            </div>
          </div>

          {imc && (
            <div className="bg-accent/30 p-3 rounded flex flex-col gap-2 mt-2">
              <div>
                <b>IMC pré-grossesse :</b> {imc} &nbsp;
                <span className="inline-block px-2 py-0.5 text-xs rounded bg-muted/60">
                  {bmiClass}
                </span>
              </div>
              <div>
                <b>Recommandation IOM/HAS :</b>{" "}
                {targetMin} à {targetMax} kg sur la grossesse
              </div>
            </div>
          )}

          <hr className="my-2" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1">
                <Label>Poids actuel (kg)</Label>
                <TooltipInfo label="Votre poids au jour de la saisie, mesuré exactement comme le poids d’avant grossesse (mêmes conditions, même balance)." />
              </div>
              <Input
                type="number"
                step="0.1"
                value={currentWeight}
                min="30"
                max="220"
                onChange={e => {
                  setCurrentWeight(e.target.value ? Number(e.target.value) : "");
                  setTouched(t => ({ ...t, currentWeight: true }));
                }}
                onBlur={() => setTouched(t => ({ ...t, currentWeight: true }))}
                required
                aria-describedby="form-currentweight-message"
                aria-invalid={!!getError("currentWeight")}
              />
              <div className="transition-all duration-300 min-h-[1.6em] text-xs" id="form-currentweight-message">
                <span className={getError("currentWeight") ? "text-destructive" : "text-muted-foreground"}>
                  {getError("currentWeight") || "Dernière pesée (ex : 64.7 kg)."}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <Label>Semaine grossesse</Label>
                <TooltipInfo label="Semaine d’aménorrhée au moment de la pesée (comptez chaque semaine entamée : 20 SA = début 5ème mois)." />
              </div>
              <Input
                type="number"
                step="1"
                value={week}
                min="4"
                max="42"
                onChange={e => {
                  setWeek(e.target.value ? Number(e.target.value) : "");
                  setTouched(t => ({ ...t, week: true }));
                }}
                onBlur={() => setTouched(t => ({ ...t, week: true }))}
                required
                aria-describedby="form-week-message"
                aria-invalid={!!getError("week")}
              />
              <div className="transition-all duration-300 min-h-[1.6em] text-xs" id="form-week-message">
                <span className={getError("week") ? "text-destructive" : "text-muted-foreground"}>
                  {getError("week") || "Saisie : 12 (en semaines complètes, mini 4)."}
                </span>
              </div>
            </div>
          </div>
          {delta !== null && (
            <div className="bg-accent/20 rounded p-2 mt-1 flex flex-col gap-1">
              <div>
                Prise de poids totale :{" "}
                <b>
                  {delta > 0 ? "+" : ""}
                  {delta} kg
                </b>
              </div>
              {targetMinNow != null && targetMaxNow != null && (
                <div>
                  Cible semaine {week} : {targetMinNow} à {targetMaxNow} kg
                </div>
              )}
              {weightZone && (
                <div>
                  Zone :{" "}
                  <span
                    className={
                      weightZone === "green"
                        ? "text-green-600 font-semibold"
                        : weightZone === "orange"
                        ? "text-orange-500 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {weightZone === "green"
                      ? "OK ✅"
                      : weightZone === "orange"
                      ? "Faible ⏳"
                      : "Trop élevé ⚠️"}
                  </span>
                </div>
              )}
            </div>
          )}

          {alerts.length > 0 && (
            <div className="p-2 bg-destructive/20 rounded text-destructive text-sm">
              {alerts.map(txt => (
                <div key={txt}>⚠ {txt}</div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full mt-2">
            Enregistrer le suivi
          </Button>
        </form>

        <div className="mt-8 mb-4">
          <div className="font-medium mb-2">Courbe de prise de poids</div>
          <div className="w-full h-60 bg-muted rounded p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" label={{ value: "Semaine", position: "insideBottom" }} />
                <YAxis
                  label={{ value: "kg", angle: -90, position: "insideLeft" }}
                  domain={['auto', 'auto']}
                  allowDecimals={true}
                />
                <Tooltip />
                <Line type="monotone" dataKey="prise" stroke="#2563eb" strokeWidth={2} name="Votre poids" dot />
                <Line type="monotone" dataKey="cibleMin" stroke="#22c55e" strokeDasharray="5 5" name="Cible min" />
                <Line type="monotone" dataKey="cibleMax" stroke="#f59e42" strokeDasharray="2 4" name="Cible max" />
                {graphHistory.length > 0 && (
                  <ReferenceArea
                    y1={Math.min(...graphHistory.map(d => d.cibleMin))}
                    y2={Math.max(...graphHistory.map(d => d.cibleMax))}
                    label="Zone cible"
                    fill="#bbf7d0"
                    fillOpacity={0.18}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button variant="outline" onClick={exportPDF} className="w-full">
          Exporter rapport PDF
        </Button>
        <div>
          <div className="font-medium mb-1">Historique dernières saisies</div>
          <div className="max-h-32 overflow-y-auto text-xs">
            {history.length === 0 && <div className="text-muted">Aucune donnée enregistrée pour l’instant.</div>}
            {history.map((h) => (
              <div key={h.createdAt} className="border-b py-1 last:border-none flex flex-row gap-3">
                <div>S{h.data.week}</div>
                <div>
                  {h.data.currentWeight} kg (
                  {h.data.delta > 0 ? "+" : ""}
                  {h.data.delta} kg)
                </div>
                <div>
                  <span className="italic text-muted-foreground">{new Date(h.createdAt).toLocaleDateString()}</span>
                </div>
                {h.data.alerts.length > 0 && (
                  <div className="text-destructive ml-2">
                    ⚠
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
