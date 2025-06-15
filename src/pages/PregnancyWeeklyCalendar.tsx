import React, { useState } from "react";
import ToolSectionCard from "@/components/tools/ToolSectionCard";
import WeekIllustrationPlaceholder from "@/components/tools/WeekIllustrationPlaceholder";
import Footer from "@/components/ui/Footer";

// Example: data ici, à remplacer plus tard par une vraie source.
const pregnancyWeeks = [
  {
    week: 12,
    fetal: "Le fœtus mesure 6 cm et commence à bouger ses bras et jambes.",
    exam: "Première échographie recommandée.",
    tips: "Continuez la supplémentation en acide folique.",
  },
  {
    week: 13,
    fetal: "Développement des empreintes digitales.",
    exam: "Surveillance des nausées.",
    tips: "Hydratez-vous, favorisez les aliments doux.",
  },
];

export default function PregnancyWeeklyCalendar() {
  const [current, setCurrent] = useState(0);
  const weekData = pregnancyWeeks[current];
  const atFirst = current === 0;
  const atLast = current === pregnancyWeeks.length - 1;
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <main className="flex-1 flex flex-col justify-center items-center py-10 px-2 animate-fade-in">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
          <WeekIllustrationPlaceholder week={weekData.week} />
          <ToolSectionCard title="Développement fœtal" bg="from-blue-100 to-violet-100">
            <p>{weekData.fetal}</p>
          </ToolSectionCard>
          <ToolSectionCard title="Examens médicaux" bg="from-sky-100 to-blue-50">
            <p>{weekData.exam}</p>
          </ToolSectionCard>
          <ToolSectionCard title="Conseils & astuces" bg="from-pink-100 to-yellow-50">
            <p>{weekData.tips}</p>
          </ToolSectionCard>
          <div className="flex justify-between gap-4 mt-4">
            <button
              className={`rounded-xl px-6 py-3 bg-blue-100 text-blue-900 shadow-md font-semibold transition disabled:opacity-40`}
              disabled={atFirst}
              onClick={() => setCurrent(v => Math.max(v - 1, 0))}
            >
              ← Semaine précédente
            </button>
            <button
              className={`rounded-xl px-6 py-3 bg-fuchsia-100 text-fuchsia-900 shadow-md font-semibold transition disabled:opacity-40`}
              disabled={atLast}
              onClick={() => setCurrent(v => Math.min(v + 1, pregnancyWeeks.length - 1))}
            >
              Semaine suivante →
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
