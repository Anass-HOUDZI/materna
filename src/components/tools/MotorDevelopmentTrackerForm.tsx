
import React, { useState } from "react";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Milestone = {
  label: string;
  min: number; // âge mini en mois
  max: number; // âge maxi en mois (inclus)
};

const milestones: Milestone[] = [
  { label: "Tient sa tête", min: 1, max: 4 },
  { label: "S'assoit sans aide", min: 5, max: 9 },
  { label: "Rampe/se déplace au sol", min: 6, max: 10 },
  { label: "Se tient debout avec appui", min: 8, max: 12 },
  { label: "Marche avec appui", min: 10, max: 15 },
  { label: "Marche seul", min: 12, max: 20 },
  { label: "Monte les escaliers à 4 pattes", min: 15, max: 24 },
  { label: "Court sans tomber", min: 18, max: 30 },
  { label: "Saute sur place", min: 24, max: 36 },
];

function getMilestonesByAge(age: number) {
  return milestones.filter(m => age >= m.min && age <= m.max);
}

export default function MotorDevelopmentTrackerForm() {
  const [age, setAge] = useState<number | "">("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ total: number; ok: number } | null>(null);

  const currentMilestones = typeof age === "number" ? getMilestonesByAge(age) : [];

  function handleCheck(label: string, val: boolean) {
    setChecked(prev => ({ ...prev, [label]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (typeof age !== "number" || isNaN(age)) return;
    const milestonesThisAge = getMilestonesByAge(age);
    const ok = milestonesThisAge.filter(m => checked[m.label]).length;
    setResult({ total: milestonesThisAge.length, ok });
  }

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormItem>
          <FormLabel>Âge de l’enfant (mois)</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={1}
              max={36}
              value={age}
              onChange={e => {
                const val = e.target.value === "" ? "" : Number(e.target.value);
                setAge(val);
                setChecked({});
                setResult(null);
              }}
              placeholder="ex : 16"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {typeof age === "number" && !isNaN(age) && (
          <div className="space-y-2">
            <div className="font-semibold mb-1">Étapes motrices typiques à cet âge :</div>
            {currentMilestones.length === 0 && (
              <div className="text-muted-foreground text-sm">Aucune étape classique pour cet âge.</div>
            )}
            {currentMilestones.map(ms => (
              <FormItem key={ms.label} className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={!!checked[ms.label]}
                    onCheckedChange={val => handleCheck(ms.label, !!val)}
                    id={ms.label}
                  />
                </FormControl>
                <FormLabel htmlFor={ms.label} className="cursor-pointer">{ms.label}</FormLabel>
              </FormItem>
            ))}
          </div>
        )}

        {typeof age === "number" && currentMilestones.length > 0 && (
          <Button type="submit" className="w-full mt-2">Évaluer</Button>
        )}
      </form>

      {result && (
        <div className="mt-6 p-4 bg-accent/20 rounded-lg border text-center">
          <div className="font-semibold mb-2 text-lg">Résultat</div>
          <div>{result.ok} étape(s) validée(s) sur {result.total}</div>
          <div className="text-xs mt-2 text-muted-foreground">
            N.B. : Chaque enfant évolue à son rythme.<br/>
            Si vous avez un doute ou une inquiétude, parlez-en à votre professionnel de santé.
          </div>
        </div>
      )}
    </div>
  );
}
