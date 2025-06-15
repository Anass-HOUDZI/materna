import { useState, useEffect } from "react";
import { db } from "@/storage/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import type { EncryptedToolData, SymptomEntry } from "@/types/models";
import Footer from "@/components/ui/Footer";

const symptomTypes = [
  { label: "Nausée", value: "nausea" },
  { label: "Fatigue", value: "fatigue" },
  { label: "Douleurs", value: "pain" },
  { label: "Œdèmes", value: "swelling" },
  { label: "Brûlure gastrique", value: "heartburn" },
  { label: "Autre", value: "other" }
] as const;

const SymptomFormSchema = z.object({
  date: z.string(),
  type: z.string(),
  intensity: z.number().min(1).max(10),
  note: z.string().optional()
});

export default function PregnancySymptomJournal() {
  const [entries, setEntries] = useState<SymptomEntry[]>([]);

  const form = useForm<z.infer<typeof SymptomFormSchema>>({
    resolver: zodResolver(SymptomFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      type: "nausea",
      intensity: 5,
      note: ""
    }
  });

  useEffect(() => {
    // Charger les symptômes existants depuis la DB
    db.tools
      .where({ toolKey: "symptom-journal" })
      .toArray()
      .then((data) => {
        setEntries(
          data
            .map((row) => {
              // row.data NON encryptée pour MVP (sinon on déchiffre ici)
              return row.data as unknown as SymptomEntry;
            })
            .sort((a, b) => b.date.localeCompare(a.date))
        );
      });
  }, []);

  const onSubmit = async (values: z.infer<typeof SymptomFormSchema>) => {
    try {
      const entry: SymptomEntry = {
        date: values.date,
        type: values.type,
        intensity: values.intensity,
        note: values.note,
      };
      await db.tools.add({
        category: "pregnancy",
        toolKey: "symptom-journal",
        data: entry as any, // TODO: chiffrer, ici MVP brut
      } as EncryptedToolData);
      setEntries((prev) => [entry, ...prev]);
      form.reset();
      toast({ title: "Symptôme enregistré" });
    } catch (e) {
      toast({ title: "Erreur", description: "Impossible d’enregistrer" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-lime-50 via-white to-pink-50 py-10 px-2 animate-fade-in">
        <div className="w-full max-w-2xl">
          <Card className="rounded-2xl shadow-xl border-lime-100 bg-white/90 mb-8">
            <CardHeader>
              <CardTitle>Journal Symptômes Grossesse</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de symptôme</FormLabel>
                        <FormControl>
                          <select className="w-full border p-2 rounded" {...field}>
                            {symptomTypes.map(s => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="intensity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intensité (1 = faible, 10 = forte)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={10}
                            {...field}
                            value={field.value}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note (facultatif)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Détails, contexte..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-2">Ajouter symptôme</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-lg border-pink-100 bg-white/80">
            <CardHeader>
              <CardTitle>Entrées récentes</CardTitle>
            </CardHeader>
            <CardContent>
              {entries.length === 0 ? (
                <div className="text-muted-foreground">Aucun symptôme enregistré</div>
              ) : (
                <ul className="space-y-2">
                  {entries.map((entry, idx) => (
                    <li key={idx} className="border rounded p-3 flex flex-col gap-1">
                      <span className="font-semibold">{symptomTypes.find(t => t.value === entry.type)?.label || entry.type}</span>
                      <span>Date : {entry.date}</span>
                      <span>Intensité : {entry.intensity}/10</span>
                      {entry.note && <span>Note : {entry.note}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
