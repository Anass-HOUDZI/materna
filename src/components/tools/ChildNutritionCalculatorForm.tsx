
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type ActivityLevel = "bas" | "modéré" | "élevé";

type FormFields = {
  age: number | "";
  ageUnit: "mois" | "années";
  weight: number | "";
  height: number | "";
  gender: "fille" | "garçon";
  activity: ActivityLevel;
};

const ALIMENTS: Record<"protéines" | "glucides" | "lipides", string[]> = {
  protéines: ["Œuf", "Poisson", "Viande maigre", "Légumineuses", "Yaourt", "Fromage"],
  glucides: ["Pain complet", "Pâtes", "Riz", "Pommes de terre", "Fruits", "Légumes"],
  lipides: ["Huile d’olive", "Beurre", "Poissons gras", "Noix", "Avocat", "Jaune d’œuf"],
};

// Valeurs OMS/ANSES recommandées pour les enfants :
// Ces formules sont simples et généralisées (plus détaillé possible si souhaité)
function calcNeeds(fields: FormFields) {
  // Conversion âge en années
  const ageY =
    fields.ageUnit === "années"
      ? Number(fields.age || 0)
      : Number(fields.age || 0) / 12;

  const weightKg = Number(fields.weight || 0);
  const heightCm = Number(fields.height || 0);

  // Calcul du besoin énergétique de base (simplifié Harris-Benedict pour enfant)
  // Coefficients enfant :  (proche OMS)
  let kcal = 0;
  switch (fields.activity) {
    case "élevé":
      kcal = fields.gender === "fille"
        ? 88 * ageY + 35 * weightKg + 16 * heightCm + 800
        : 90 * ageY + 40 * weightKg + 18 * heightCm + 900;
      break;
    case "modéré":
      kcal = fields.gender === "fille"
        ? 80 * ageY + 32 * weightKg + 14 * heightCm + 600
        : 82 * ageY + 36 * weightKg + 15 * heightCm + 700;
      break;
    default: // bas
      kcal = fields.gender === "fille"
        ? 70 * ageY + 28 * weightKg + 12 * heightCm + 400
        : 72 * ageY + 30 * weightKg + 13 * heightCm + 500;
  }

  kcal = Math.max(500, Math.round(kcal)); // Plancher

  // Macro-recommandations (en % des apports totaux, source OMS/PNNS enfants : 10-15% prot ; 50-55% gluc ; 30-35% lip.)
  const prot = Math.round((kcal * 0.12) / 4); // 4kcal/g protéine
  const gluc = Math.round((kcal * 0.53) / 4);
  const lip = Math.round((kcal * 0.34) / 9);

  return {
    kcal,
    prot,
    gluc,
    lip,
  };
}

export default function ChildNutritionCalculatorForm() {
  const [fields, setFields] = useState<FormFields>({
    age: "",
    ageUnit: "années",
    weight: "",
    height: "",
    gender: "fille",
    activity: "modéré",
  });
  const [submitted, setSubmitted] = useState(false);

  const valid =
    !!fields.age &&
    !!fields.weight &&
    !!fields.height &&
    Number(fields.age) > 0 &&
    Number(fields.weight) > 0 &&
    Number(fields.height) > 0;

  const needs = useMemo(() => (valid ? calcNeeds(fields) : null), [fields, valid]);

  function handleChange<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields(prev => ({
      ...prev,
      [key]: value,
    }));
    setSubmitted(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Âge</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Input
                type="number"
                min={0}
                max={16}
                value={fields.age}
                onChange={e => handleChange("age", e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="ex : 3"
                step="1"
              />
            </FormControl>
            <select
              value={fields.ageUnit}
              className={cn(
                "px-2 py-1 border rounded bg-muted text-base md:text-sm max-w-[80px]"
              )}
              onChange={e => handleChange("ageUnit", e.target.value as any)}
            >
              <option value="années">années</option>
              <option value="mois">mois</option>
            </select>
          </div>
        </FormItem>
        <FormItem>
          <FormLabel>Sexe</FormLabel>
          <FormControl>
            <RadioGroup
              value={fields.gender}
              onValueChange={v => handleChange("gender", v as any)}
              className="flex gap-4"
            >
              <RadioGroupItem value="fille" id="gender-fille" />
              <label htmlFor="gender-fille" className="mr-3 cursor-pointer">Fille</label>
              <RadioGroupItem value="garçon" id="gender-garçon" />
              <label htmlFor="gender-garçon" className="cursor-pointer">Garçon</label>
            </RadioGroup>
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Poids (kg)</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={2}
              max={70}
              step="0.1"
              value={fields.weight}
              onChange={e => handleChange("weight", e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="ex : 14.2"
            />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Taille (cm)</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={45}
              max={180}
              value={fields.height}
              onChange={e => handleChange("height", e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="ex : 98"
            />
          </FormControl>
        </FormItem>
        <FormItem className="md:col-span-2">
          <FormLabel>Niveau d’activité physique</FormLabel>
          <FormControl>
            <RadioGroup
              value={fields.activity}
              onValueChange={v => handleChange("activity", v as ActivityLevel)}
              className="flex gap-3"
            >
              <RadioGroupItem value="bas" id="activity-bas" />
              <label htmlFor="activity-bas" className="mr-5 cursor-pointer">Bas</label>
              <RadioGroupItem value="modéré" id="activity-modéré" />
              <label htmlFor="activity-modéré" className="mr-5 cursor-pointer">Modéré</label>
              <RadioGroupItem value="élevé" id="activity-élevé" />
              <label htmlFor="activity-élevé" className="cursor-pointer">Élevé</label>
            </RadioGroup>
          </FormControl>
        </FormItem>
      </div>
      <Button type="submit" disabled={!valid} className="w-full">
        Calculer les besoins
      </Button>
      {submitted && needs && (
        <div className="mt-6 p-4 border rounded-lg bg-accent/20">
          <div className="font-semibold mb-1 text-lg text-center">Besoins nutritionnels estimés</div>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center my-2">
            <div className="px-2"><span className="font-bold">{needs.kcal}</span> kcal / jour</div>
            <div className="px-2"><span className="font-bold">{needs.prot}</span> g protéines</div>
            <div className="px-2"><span className="font-bold">{needs.gluc}</span> g glucides</div>
            <div className="px-2"><span className="font-bold">{needs.lip}</span> g lipides</div>
          </div>
          <div className="text-muted-foreground text-sm mt-2 text-center">
            Ces valeurs sont des estimations.<br/>
            Un professionnel peut affiner selon pathologie/métabolisme personnel.
          </div>
          <div className="border-t mt-4 pt-3">
            <div className="font-semibold mb-1">Suggestions d’aliments équilibrés :</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              {Object.entries(ALIMENTS).map(([macro, aliments]) => (
                <div key={macro}>
                  <div className="font-medium underline mb-1">{macro.charAt(0).toUpperCase()+macro.slice(1)}</div>
                  <ul className="list-disc list-inside">
                    {aliments.map(a => <li key={a}>{a}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
