
import React from "react";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  week: {
    num: number;
    label: string;
    size: string;
    weight: string;
    description: string;
    medical: string;
    advice: string;
  };
  note: string;
  onNoteChange: (note: string) => void;
};

export function PregnancyWeekDetail({ week, note, onNoteChange }: Props) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <div className="text-lg font-semibold">{week.label}</div>
        <div className="flex flex-wrap gap-6 mt-2">
          <div>
            <span className="text-xs text-muted-foreground">Taille estimée :</span>
            <div className="font-mono">{week.size}</div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Poids estimé :</span>
            <div className="font-mono">{week.weight}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="font-medium mt-2">Développement fœtal</div>
        <p className="text-sm">{week.description}</p>
      </div>
      <div>
        <div className="font-medium mt-2">Examens médicaux</div>
        <p className="text-sm">{week.medical}</p>
      </div>
      <div>
        <div className="font-medium mt-2">Conseils</div>
        <p className="text-sm">{week.advice}</p>
      </div>
      <div>
        <div className="font-medium mt-4 mb-1 text-primary">Votre journal personnel</div>
        <Textarea
          className="w-full min-h-[60px] text-sm"
          placeholder="Ajoutez vos notes ou émotions cette semaine…"
          value={note || ""}
          onChange={e => onNoteChange(e.target.value)}
        />
      </div>
      {/* Zone future : upload photo ventre, etc. */}
    </div>
  );
}
