
import React, { useState } from "react";
import { PregnancyWeekDetail } from "./PregnancyWeekDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SoftButton from "@/components/ui/SoftButton";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

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
        ? "Début du suivi : fécondation et implantation, rien de mesurable."
        : `Développement du bébé : ${i < 13 ? "1er trimestre" : i < 28 ? "2e trimestre" : "3e trimestre"}. Croissance progressive, organes principaux, poids et taille augmentent.`,
    medical:
      i === 0
        ? "Consultation pré-conception possible."
        : i === 3
        ? "Prise de sang recommandée : βhCG. RDV médecin si symptômes."
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
        ? "Préparez la valise maternité !"
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
    <div className="w-full space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Semaine {week}</h2>
        <p className="text-slate-600 text-sm">
          Accédez semaine par semaine à votre suivi personnalisé
        </p>
      </div>

      {/* Timeline scrollable */}
      <div className="bg-gradient-to-r from-blue-50/80 to-pink-50/80 rounded-2xl p-4 border border-white/40 shadow-md">
        <div className="flex mb-4 overflow-x-auto gap-2 py-2 scrollbar-hide">
          {weeks.map((w, idx) => (
            <Button
              key={w.num}
              size="sm"
              className={`min-w-[3rem] px-3 py-2 rounded-xl font-semibold transition-all duration-300 ${
                week === w.num 
                  ? "text-white shadow-md scale-105" 
                  : "bg-white/80 text-slate-600 hover:bg-blue-50 shadow-sm"
              }`}
              style={week === w.num ? { background: 'linear-gradient(to right, #f953c6, #b91d73)' } : {}}
              variant={week === w.num ? "default" : "ghost"}
              onClick={() => setWeek(w.num)}
              aria-label={`Semaine ${w.num}`}
            >
              {w.num}
            </Button>
          ))}
        </div>
        
        {/* Repères trimestres */}
        <div className="flex justify-between text-xs text-slate-500 px-2 font-medium">
          <span>1er trimestre</span>
          <span>2ᵉ trimestre</span>
          <span>3ᵉ trimestre</span>
        </div>
      </div>

      {/* Détails de la semaine */}
      <PregnancyWeekDetail 
        week={weeks[week - 1]} 
        note={notes[week]} 
        onNoteChange={handleNotesChange} 
      />

      {/* Navigation et actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
        <div className="flex gap-3">
          <SoftButton 
            onClick={() => setWeek(Math.max(week - 1, 1))} 
            disabled={week === 1}
            gradient="blue"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Semaine précédente
          </SoftButton>
          
          <SoftButton 
            onClick={() => setWeek(Math.min(week + 1, 40))} 
            disabled={week === 40}
            gradient="rose"
            className="flex items-center gap-2"
          >
            Semaine suivante
            <ChevronRight className="w-4 h-4" />
          </SoftButton>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={handleExportPDF} 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 rounded-xl border-2 hover:bg-blue-50"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <span className="text-xs text-slate-500">Vos notes sont enregistrées localement</span>
        </div>
      </div>
    </div>
  );
}
