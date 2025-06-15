
import React, { useState } from "react";
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";

type DiversificationForm = {
  age: number;
  allergies: string;
  method: "classique" | "DME";
  preferences: string;
};

const foodStagesFR: { min: number; max: number; foods: string[] }[] = [
  {
    min: 4, max: 6,
    foods: [
      "Légumes cuits (carotte, courgette, patate douce, haricot vert…)",
      "Purée de pomme, poire, banane",
      "Viande bien cuite mixée (petite quantité)",
      "Purée de poisson blanc (colin, cabillaud)"
    ]
  },
  {
    min: 6, max: 8,
    foods: [
      "Jaune d’œuf cuit",
      "Fromage pasteurisé doux",
      "Pain maison sans croûte, semoule fine",
      "Introduire petits morceaux adaptés méthode"
    ]
  },
  {
    min: 8, max: 12,
    foods: [
      "Légumineuses bien cuites (lentilles, pois chiches, haricots rouges)",
      "Pâtes complètes",
      "Fruits frais écrasés/compote épaisse",
      "Petits morceaux de viande/poisson"
    ]
  },
  {
    min: 12, max: 36,
    foods: [
      "Œuf entier cuit",
      "Laitage entier",
      "Fruits secs moelleux finement coupés",
      "Riz, quinoa, maïs, légumes crus râpés"
    ]
  }
];

function getFoodSuggestions(age: number, allergies: string, method: string): string[] {
  // Recherche des stades valides
  const found = foodStagesFR.find(stage => age >= stage.min && age < stage.max);
  if (!found) return ["Aucune recommandation spécifique pour cet âge."];
  let suggestions = [...found.foods];
  // Suppression laitages & œufs si allergie
  if (allergies.toLowerCase().includes("lait")) {
    suggestions = suggestions.filter(f => !/lait|fromage|laitage/i.test(f));
  }
  if (allergies.toLowerCase().includes("œuf") || allergies.toLowerCase().includes("oeuf")) {
    suggestions = suggestions.filter(f => !/œuf|oeuf/i.test(f));
  }
  if (method === "DME") {
    // On favorise l'introduction de morceaux
    suggestions = suggestions.map(f =>
      f.includes("morceaux") || f.includes("petits morceaux")
        ? f + " (taille adaptée à la prise en main)"
        : f
    );
  }
  return suggestions;
}

export default function FoodDiversificationGuide() {
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [lastAge, setLastAge] = useState<number | null>(null);
  const form = useForm<DiversificationForm>({
    defaultValues: {
      age: 6,
      allergies: "",
      method: "classique",
      preferences: ""
    }
  });

  function handleSubmit(values: DiversificationForm) {
    setLastAge(values.age);
    setSuggestions(getFoodSuggestions(values.age, values.allergies, values.method));
  }

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center px-4 py-10 bg-gradient-to-b from-accent/30 to-background">
      <section className="flex flex-col items-center gap-3 mb-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
          Guide Diversification Alimentaire du Bébé
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground text-center">
          Renseignez l’âge, allergies et vos préférences alimentaires pour recevoir des suggestions adaptées !<br />
          <span className="font-medium">Recommandations inspirées du PNNS et ANSES.</span>
        </p>
      </section>
      <Card className="w-full max-w-lg p-6 mb-7">
        <Form {...form}>
          <form className="grid gap-5" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="age"
              rules={{ required: "Âge requis", min: 4, max: 36 }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Âge de l’enfant (mois)</FormLabel>
                  <FormControl>
                    <Input type="number" min={4} max={36} {...field} placeholder="ex : 8" />
                  </FormControl>
                  <FormDescription>Entre 4 et 36 mois</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Méthode de diversification</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-7 mt-1"
                      value={field.value}
                      onValueChange={val => field.onChange(val)}
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="classique" id="classique" />
                        </FormControl>
                        <FormLabel htmlFor="classique">Classique (purées puis morceaux)</FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="DME" id="DME" />
                        </FormControl>
                        <FormLabel htmlFor="DME">
                          DME (Diversification Menée par l’Enfant)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies connues (facultatif)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ex : lait, œuf, poisson" />
                  </FormControl>
                  <FormDescription>Séparez par virgule si plusieurs</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Préférences alimentaires (facultatif)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="ex : famille végétarienne, pas de porc…" rows={2} />
                  </FormControl>
                  <FormDescription>
                    Cela sera prochainement utilisé pour personnaliser plus précisément la liste.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2">Obtenir des suggestions</Button>
          </form>
        </Form>
      </Card>

      <div className="w-full max-w-lg text-base">
        {suggestions && (
          <Card className="p-5 mb-4 bg-accent/40 border-2 border-primary/30">
            <h2 className="font-bold text-lg text-primary mb-3 text-center flex items-center gap-2 justify-center">
              <Check className="text-green-600" /> Suggestions pour {lastAge} mois
            </h2>
            <ul className="space-y-2 list-disc ml-6">
              {suggestions.map((f, i) => (
                <li key={i} className="leading-relaxed">{f}</li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Les recommandations sont générales—toujours valider avec votre pédiatre en cas de doute ou d’antécédent médical particulier.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
