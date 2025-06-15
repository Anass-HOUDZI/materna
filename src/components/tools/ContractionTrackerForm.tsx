
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { BadgeCheck, AlertTriangle, CheckCircle } from "lucide-react";

type Contraction = {
  start: number;
  end: number;
  duration: number; // sec
  intensity: number | null;
};

type PatternAnalysis = {
  score: number; // 0-100%
  state: "faux" | "pre" | "actif" | "urgence";
  advice: string;
  color: string;
};

function getAnalysis(contractions: Contraction[]): PatternAnalysis {
  if (contractions.length < 3) {
    return {
      score: 0,
      state: "faux",
      advice: "Trop peu de contractions enregistrées pour une analyse fiable. Surveillez l'évolution.",
      color: "gray",
    };
  }
  // Règle 5-1-1 et patterns
  const lastHour = Date.now() - 60 * 60 * 1000;
  const lastHourContractions = contractions.filter(
    c => c.start >= lastHour
  );
  if (lastHourContractions.length < 3)
    return {
      score: 10,
      state: "faux",
      advice: "Contractions espacées ou irrégulières. Pas de travail actif détecté.",
      color: "gray",
    };

  const intervals = lastHourContractions
    .slice(1)
    .map((c, i) => (c.start - lastHourContractions[i].end) / 1000); // en sec
  const meanInterval = intervals.length
    ? Math.round(intervals.reduce((a, b) => a + b, 0) / intervals.length)
    : 0;
  const durations = lastHourContractions.map(c => c.duration);
  const meanDuration = Math.round(
    durations.reduce((a, b) => a + b, 0) / durations.length
  );
  const meanIntensity = Math.round(
    lastHourContractions.map(c => c.intensity || 0).reduce((a, b) => a + b, 0) /
      lastHourContractions.length
  );

  // Critères 5-1-1 + intensité croissante
  let score = 0;
  let state: PatternAnalysis["state"] = "faux";
  let advice = "";
  let color = "gray";
  if (meanInterval <= 300 && meanDuration >= 60 && meanIntensity >= 6) {
    score = 95;
    state = "actif";
    advice =
      "Contractions régulières, rapprochées (>1h), intensité forte. Travail actif probable ! Contactez la maternité.";
    color = "red";
  } else if (meanInterval <= 420 && meanDuration >= 45 && meanIntensity >= 4) {
    score = 70;
    state = "pre";
    advice =
      "Contractions en phase de pré-travail, rapprochées et régulières. Rassemblez vos affaires et surveillez la suite.";
    color = "orange";
  } else if (meanInterval > 600) {
    score = 20;
    state = "faux";
    advice =
      "Contractions trop espacées/irrégulières, vraisemblablement faux travail. Restez à domicile, détendez-vous.";
    color = "gray";
  } else if (meanIntensity >= 8 && meanInterval <= 180 && meanDuration >= 90) {
    score = 99;
    state = "urgence";
    advice =
      "Contractions très rapprochées et intenses : appelez le 15 ou dirigez-vous à la maternité sans attendre !";
    color = "red";
  } else {
    score = Math.min(40 + meanIntensity * 4, 65);
    state = "faux";
    advice =
      "Patience, continuez à enregistrer vos contractions pour un suivi optimal.";
    color = "gray";
  }

  return { score, state, advice, color };
}

export function ContractionTrackerForm() {
  const [contractions, setContractions] = useState<Contraction[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [intensity, setIntensity] = useState<number>(5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer pour afficher durée live
  useEffect(() => {
    if (inProgress && startTime) {
      intervalRef.current = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTime) / 1000));
      }, 256);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inProgress, startTime]);

  // Action bouton principal
  function handleToggle() {
    if (!inProgress) {
      setStartTime(Date.now());
      setTimer(0);
      setIntensity(5);
      setInProgress(true);
    } else if (startTime) {
      setContractions(prev => [
        {
          start: startTime,
          end: Date.now(),
          duration: Math.floor((Date.now() - startTime) / 1000),
          intensity,
        },
        ...prev,
      ]);
      setStartTime(null);
      setTimer(0);
      setIntensity(5);
      setInProgress(false);
    }
  }

  // UI slider intensité
  function handleIntensityChange(v: number[]) {
    setIntensity(v[0]);
  }

  // Graphe durée & intervalle
  const chartData = contractions
    .slice(0, 10) // 10 dernières
    .reverse()
    .map((c, i, arr) => ({
      name: `${contractions.length - i}`,
      Durée: c.duration,
      Intervalle:
        i > 0 ? Math.floor((c.start - arr[i - 1].end) / 60 / 1000) : 0, // min
      Intensité: c.intensity,
    }));

  // Analyse pattern AI
  const analysis = getAnalysis(contractions);

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Enregistrez vos contractions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleToggle}
              size="lg"
              variant={inProgress ? "destructive" : "default"}
              className="text-lg font-bold w-full"
              data-testid="start-end-btn"
              aria-pressed={inProgress}
            >
              {inProgress ? "Fin Contraction" : "Début Contraction"}
            </Button>
            {inProgress && (
              <div className="flex flex-row gap-4 items-center justify-between mt-2">
                <div>
                  <span className="font-bold">Durée :</span>{" "}
                  <span className="text-xl tabular-nums">{timer}s</span>
                </div>
                <div className="flex flex-col items-end">
                  <span>
                    <span className="font-bold">Intensité </span>
                    <span>({intensity})</span>
                  </span>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[intensity]}
                    onValueChange={handleIntensityChange}
                    className="w-36"
                    aria-label="Intensité douleur"
                  />
                  <span className="text-xs text-muted-foreground">Glissez pour ajuster</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analyse IA et recommandations */}
      <Card>
        <CardHeader>
          <CardTitle>
            Analyse intelligente
            {analysis.state === "actif" && (
              <BadgeCheck className="inline ml-2 text-green-600" />
            )}
            {analysis.state === "urgence" && (
              <AlertTriangle className="inline ml-2 text-red-600 animate-pulse" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`mb-2 font-bold text-${analysis.color}-600`}>
            Score travail : {analysis.score}%
          </div>
          <div className="mb-2">{analysis.advice}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Graphique contractions (10 dernières)</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 230 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} />
                <YAxis yAxisId="left" domain={[0, 180]} label={{ value: "Durée (s)", angle: -90, position: "insideLeft" }} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 10]} label={{ value: "Intensité", angle: +90, position: "insideRight" }} />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="Durée" stroke="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="Intensité" stroke="#e46c79" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tableau contractions */}
      <Card>
        <CardHeader>
          <CardTitle>Historique contractions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Heure</TableHead>
                <TableHead>Durée (s)</TableHead>
                <TableHead>Intensité</TableHead>
                <TableHead>Intervalle (min)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractions.slice(0, 10).map((c, i) => {
                const date = new Date(c.start);
                const prev = contractions[i + 1];
                const intervalMin =
                  prev && prev.end
                    ? Math.floor((c.start - prev.end) / 60 / 1000)
                    : "-";
                return (
                  <TableRow key={c.start}>
                    <TableCell>
                      {date
                        .toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                    </TableCell>
                    <TableCell>{c.duration}</TableCell>
                    <TableCell>{c.intensity}</TableCell>
                    <TableCell>{intervalMin}</TableCell>
                  </TableRow>
                );
              })}
              {contractions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Aucune contraction enregistrée pour le moment.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContractionTrackerForm;
