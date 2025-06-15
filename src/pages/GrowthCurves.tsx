import React, { useState } from "react";
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useForm, Controller } from "react-hook-form";
import { Baby } from "lucide-react";
import Footer from "@/components/ui/Footer";

type GrowthEntry = {
  age: number; // mois
  weight: number; // kg
  height: number; // cm
  headCirc: number; // cm
};

export default function GrowthCurves() {
  const [entries, setEntries] = useState<GrowthEntry[]>([]);
  const form = useForm<GrowthEntry>({
    defaultValues: { age: undefined, weight: undefined, height: undefined, headCirc: undefined }
  });

  // OMS "boys 0-24 mois" références poids en kg (courbe médiane)
  // Format: [{ age: 0, median: 3.3 }, ...]
  const omsWeightBoys = [
    { age: 0, median: 3.3 }, { age: 1, median: 4.5 }, { age: 2, median: 5.6 },
    { age: 3, median: 6.4 }, { age: 4, median: 7 }, { age: 5, median: 7.5 },
    { age: 6, median: 7.9 }, { age: 7, median: 8.3 }, { age: 8, median: 8.6 },
    { age: 9, median: 8.9 }, { age: 10, median: 9.2 }, { age: 11, median: 9.4 },
    { age: 12, median: 9.6 }, { age: 18, median: 10.9 }, { age: 24, median: 12.2 }
  ];

  const dataChart = omsWeightBoys.map(ref => ({
    age: ref.age,
    reference: ref.median,
    ...(entries.find(e => e.age === ref.age) && { user: entries.find(e => e.age === ref.age)!.weight }),
  }));

  const onSubmit = (values: GrowthEntry) => {
    // Remplace si age déjà saisi, sinon ajoute
    setEntries(prev => {
      const filtered = prev.filter(e => e.age !== values.age);
      return [...filtered, values].sort((a, b) => a.age - b.age);
    });
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full min-h-[80vh] flex flex-col items-center px-2 pt-10 pb-12 bg-gradient-to-b from-accent/30 to-background">
        <section className="flex flex-col items-center mb-10 max-w-2xl w-full">
          <div className="flex flex-col items-center gap-6">
            <Baby size={54} className="text-primary drop-shadow-xl" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center">
              Courbes Croissance OMS Personnalisées
            </h1>
          </div>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground text-center">
            Entrez les mesures pour visualiser la courbe de poids de votre enfant, comparée aux standards OMS.
          </p>
        </section>

        <Card className="w-full max-w-md p-6 mb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="age"
                rules={{ required: "Âge (mois) requis", min: 0, max: 24 }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Âge (en mois)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} max={24} step={1} placeholder="ex: 8" {...field} />
                    </FormControl>
                    <FormDescription>Entre 0 et 24 mois</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                rules={{ required: "Poids requis" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poids (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} step="0.01" placeholder="ex: 8.7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taille (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" min={40} max={110} step="0.1" placeholder="ex: 72" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headCirc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Périmètre crânien (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" min={30} max={55} step="0.1" placeholder="ex: 44" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-2">Ajouter la mesure</Button>
            </form>
          </Form>
        </Card>

        <div className="w-full max-w-xl bg-background rounded-xl border p-4 shadow-md">
          <h2 className="font-bold mb-3 text-lg text-primary text-center">Courbe de poids (OMS vs. Enfant)</h2>
          <ResponsiveContainer width="100%" height={270}>
            <LineChart data={dataChart} margin={{ top: 20, bottom: 14, left: 0, right: 12 }}>
              <XAxis dataKey="age" label={{ value: "Mois", position: "insideBottom", offset: -6 }} />
              <YAxis
                label={{ value: "Poids (kg)", angle: -90, position: "insideLeft" }}
                domain={[2.5, 14]}
                tickCount={7}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="reference" stroke="#38bdf8" strokeWidth={3}
                name="OMS (médiane)" dot={false} />
              <Line type="monotone" dataKey="user" stroke="#10b981" strokeWidth={3}
                name="Votre enfant" dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
          {entries.length === 0 && (
            <p className="text-muted-foreground text-sm mt-5 text-center">Ajoutez une ou plusieurs mesures pour afficher votre courbe.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
