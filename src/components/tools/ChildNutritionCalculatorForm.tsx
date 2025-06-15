import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TooltipInfo } from "@/components/ui/TooltipInfo";
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
  const [touched, setTouched] = useState<{[K in keyof FormFields]?: boolean}>({});

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

  // Utilitaire pour messages d’erreur
  function getError(field: keyof FormFields): string | null {
    switch (field) {
      case "age":
        if (touched.age && (!fields.age || Number(fields.age) <= 0)) return "Âge requis (> 0)";
        break;
      case "weight":
        if (touched.weight && (!fields.weight || Number(fields.weight) < 2)) return "Poids requis (kg, min. 2)";
        break;
      case "height":
        if (touched.height && (!fields.height || Number(fields.height) < 45)) return "Taille requise (cm, min. 45)";
        break;
      default:
        return null;
    }
    return null;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Âge</FormLabel>
            <TooltipInfo label="Indiquez l’âge de l’enfant en années ou mois révolus à la date du calcul. Utilisez la même unité que sur la courbe de croissance." />
          </div>
          <div className="flex gap-2">
            <FormControl>
              <Input
                type="number"
                min={0}
                max={16}
                value={fields.age}
                onChange={e => {
                  handleChange("age", e.target.value === "" ? "" : Number(e.target.value));
                  setTouched(t => ({ ...t, age: true }));
                }}
                onBlur={() => setTouched(t => ({ ...t, age: true }))}
                placeholder="ex : 3"
                step="1"
                aria-describedby="form-age-message"
                aria-invalid={!!getError("age")}
              />
            </FormControl>
            <select
              value={fields.ageUnit}
              className={cn(
                "px-2 py-1 border rounded bg-muted text-base md:text-sm max-w-[80px]"
              )}
              onChange={e => handleChange("ageUnit", e.target.value as any)}
              aria-label="Unité âge"
            >
              <option value="années">années</option>
              <option value="mois">mois</option>
            </select>
          </div>
          <div className="transition-all duration-300 min-h-[1.6em]" id="form-age-message">
            <span className={getError("age") ? "text-destructive text-sm" : "text-muted-foreground text-xs"}>
              {getError("age") || "Saisissez l’âge réel (arrondi inférieur)."}
            </span>
          </div>
        </FormItem>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Sexe</FormLabel>
            <TooltipInfo label="Sélectionnez « Fille » ou « Garçon » selon l’enfant évalué. Les besoins énergétiques diffèrent selon le sexe." />
          </div>
          <FormControl>
            <RadioGroup
              value={fields.gender}
              onValueChange={v => handleChange("gender", v as any)}
              className="flex gap-4"
              aria-label="Sexe de l’enfant"
            >
              <RadioGroupItem value="fille" id="gender-fille" />
              <label htmlFor="gender-fille" className="mr-3 cursor-pointer">Fille</label>
              <RadioGroupItem value="garçon" id="gender-garçon" />
              <label htmlFor="gender-garçon" className="cursor-pointer">Garçon</label>
            </RadioGroup>
          </FormControl>
          {/* Pas d’erreur possible ici */}
        </FormItem>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Poids (kg)</FormLabel>
            <TooltipInfo label="Poids actuel sans vêtement, à calibrer sur la même balance si possible. Utile pour des calculs précis des besoins quotidiens." />
          </div>
          <FormControl>
            <Input
              type="number"
              min={2}
              max={70}
              step="0.1"
              value={fields.weight}
              onChange={e => {
                handleChange("weight", e.target.value === "" ? "" : Number(e.target.value));
                setTouched(t => ({ ...t, weight: true }));
              }}
              onBlur={() => setTouched(t => ({ ...t, weight: true }))}
              placeholder="ex : 14.2"
              aria-describedby="form-weight-message"
              aria-invalid={!!getError("weight")}
            />
          </FormControl>
          <div className="transition-all duration-300 min-h-[1.6em]" id="form-weight-message">
            <span className={getError("weight") ? "text-destructive text-sm" : "text-muted-foreground text-xs"}>
              {getError("weight") || "Poids en kilogrammes (ex : 14,2)."}
            </span>
          </div>
        </FormItem>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Taille (cm)</FormLabel>
            <TooltipInfo label="Taille debout (ou allongé si <2 ans). Mesurez en centimètres pour une meilleure estimation." />
          </div>
          <FormControl>
            <Input
              type="number"
              min={45}
              max={180}
              value={fields.height}
              onChange={e => {
                handleChange("height", e.target.value === "" ? "" : Number(e.target.value));
                setTouched(t => ({ ...t, height: true }));
              }}
              onBlur={() => setTouched(t => ({ ...t, height: true }))}
              placeholder="ex : 98"
              aria-describedby="form-height-message"
              aria-invalid={!!getError("height")}
            />
          </FormControl>
          <div className="transition-all duration-300 min-h-[1.6em]" id="form-height-message">
            <span className={getError("height") ? "text-destructive text-sm" : "text-muted-foreground text-xs"}>
              {getError("height") || "Indiquez la taille en centimètres."}
            </span>
          </div>
        </FormItem>
        <FormItem className="md:col-span-2">
          <div className="flex items-center gap-1">
            <FormLabel>Niveau d’activité physique</FormLabel>
            <TooltipInfo label="Estimez l’activité quotidienne : Bas (sédentaire), Modéré (jeux quotidiens), Élevé (sport régulier ou activité très dynamique)." />
          </div>
          <FormControl>
            <RadioGroup
              value={fields.activity}
              onValueChange={v => handleChange("activity", v as ActivityLevel)}
              className="flex gap-3"
              aria-label="Niveau d’activité"
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
