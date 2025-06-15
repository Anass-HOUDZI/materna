
import React, { useState } from "react";
import { PregnancyWeekDetail } from "./PregnancyWeekDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type WeekData = {
  num: number;
  label: string;
  size: string;
  weight: string;
  description: string;
  medical: string;
  advice: string;
};

const WEEK_INFOS: WeekData[] = Array.from({ length: 40 }, (_, i) => {
  // Ces données peuvent être enrichies, ici simplifiées
  return {
    num: i + 1,
    label: `Semaine ${i + 1}`,
    size: i < 13 ? `${6 + i * 3} mm` : `${6 + i * 3} cm`,
    weight: i < 13 ? `${(2 + i * 8).toFixed(1)} g` : `${(2 + i * 18).toFixed(1)} g`,
    description:
      i === 0
        ? "Début du suivi : fécondation et implantation, rien de mesurable."
        : `Développement du bébé : ${i < 13 ? "1er trimestre" : i < 28 ? "2e trimestre" : "3e trimestre"}. Croissance progressive, organes principaux, poids et taille augmentent.`,
    medical:
      i === 0
        ? "Consultation pré-conception possible."
        : i === 3
        ? "Prise de sang recommandée : βhCG. RDV médecin si symptômes."
        : i === 12
        ? "1re échographie obligatoire (11-13 SA)."
        : i === 22
        ? "2e échographie recommandée (morpho, 22 SA)."
        : i === 32
        ? "3e échographie obligatoire (32 SA)."
        : "-",
    advice:
      i === 0
        ? "Conseils nutritionnels, acide folique avant conception."
        : i === 36
        ? "Préparez la valise maternité !"
        : "Hydratez-vous et reposez-vous.",
  };
});

export function PregnancyWeeklyCalendarView() {
  const [week, setWeek] = useState(12);
  const weeks = WEEK_INFOS;

  // Notes personnelles par semaine (stockées localStorage)
  const [notes, setNotes] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(window.localStorage.getItem("pregnancyNotes") || "{}");
      } catch {
        return {};
      }
    }
    return {};
  });

  function handleNotesChange(newNote: string) {
    const upd = { ...notes, [week]: newNote };
    setNotes(upd);
    window.localStorage.setItem("pregnancyNotes", JSON.stringify(upd));
  }

  // Export PDF SEMAINE (simple, impression du composant)
  async function handleExportPDF() {
    window.print();
    // Pour une version avancée, intégrer une librairie d'export ou canvas
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle>Calendrier Grossesse semaine {week}</CardTitle>
        <div className="text-muted-foreground text-xs mt-1">
          Accédez semaine par semaine à votre suivi personnalisé
        </div>
      </CardHeader>
      <CardContent>
        {/* Timeline scrollable */}
        <div className="flex mb-4 overflow-x-auto gap-2 py-1">
          {weeks.map((w, idx) => (
            <Button
              key={w.num}
              size="sm"
              className={`min-w-[2.5rem] px-2 ${week === w.num ? "bg-primary text-white" : "bg-secondary"} rounded-md`}
              variant={week === w.num ? "default" : "ghost"}
              onClick={() => setWeek(w.num)}
              aria-label={`Semaine ${w.num}`}
              tabIndex={0}
            >
              {w.num}
            </Button>
          ))}
        </div>
        {/* Repères trimestres */}
        <div className="flex justify-between text-xs text-muted-foreground px-1 mb-2 select-none">
          <span>1er trimestre</span>
          <span>2ᵉ trimestre</span>
          <span>3ᵉ trimestre</span>
        </div>
        {/* Détails de la semaine */}
        <PregnancyWeekDetail week={weeks[week - 1]} note={notes[week]} onNoteChange={handleNotesChange} />
        {/* Actions */}
        <div className="flex justify-between mt-6">
          <Button onClick={handleExportPDF} variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <span className="text-xs text-muted-foreground">Vos notes sont enregistrées localement</span>
        </div>
      </CardContent>
    </Card>
  );
}
