
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type Episode = {
  id: number;
  date: string;
  heure: string;
  intensite: number; // 1 (léger) à 10 (intense)
  humeur: "heureux" | "calme" | "agite" | "pleurs";
  note?: string;
};

const initialEpisodes: Episode[] = [];

export default function CryingMoodTabs() {
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: "",
    heure: "",
    intensite: 5,
    humeur: "pleurs",
    note: "",
  });
  // Ajout d'un épisode d'humeur/pleur
  const handleAddEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.heure) return;
    setEpisodes([
      ...episodes,
      {
        id: Date.now(),
        date: form.date,
        heure: form.heure,
        intensite: Number(form.intensite),
        humeur: form.humeur as Episode["humeur"],
        note: form.note,
      },
    ]);
    setShowForm(false);
    setForm({ date: "", heure: "", intensite: 5, humeur: "pleurs", note: "" });
  };

  return (
    <Tabs defaultValue="suivi" className="w-full">
      <TabsList className="flex w-full justify-between gap-1 mb-3 bg-muted">
        <TabsTrigger value="suivi" className="flex-1">
          Suivi
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex-1">
          Stats
        </TabsTrigger>
        <TabsTrigger value="conseils" className="flex-1">
          Conseils
        </TabsTrigger>
        <TabsTrigger value="bienetre" className="flex-1">
          Bien-être parents
        </TabsTrigger>
      </TabsList>

      <TabsContent value="suivi">
        <div>
          <div className="flex flex-col items-start gap-4">
            <Button onClick={() => setShowForm(!showForm)} variant="outline" size="sm" className="mb-2">
              {showForm ? "Annuler" : "Nouvel épisode"}
            </Button>
            {showForm && (
              <form className="bg-muted rounded p-4 space-y-3 w-full max-w-md" onSubmit={handleAddEpisode}>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm">Date *</label>
                    <input
                      type="date"
                      required
                      className="block border rounded w-full px-2 py-1 bg-background"
                      value={form.date}
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm">Heure *</label>
                    <input
                      type="time"
                      required
                      className="block border rounded w-full px-2 py-1 bg-background"
                      value={form.heure}
                      onChange={e => setForm(f => ({ ...f, heure: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>
                    <label className="text-sm">Intensité</label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={form.intensite}
                      onChange={e => setForm(f => ({ ...f, intensite: Number(e.target.value) }))}
                      className="w-24"
                    />
                    <span className="ml-2">{form.intensite}</span>
                  </div>
                  <div>
                    <label className="text-sm ml-2">Humeur</label>
                    <select
                      required
                      className="block border rounded w-full px-2 py-1 bg-background"
                      value={form.humeur}
                      onChange={e => setForm(f => ({ ...f, humeur: e.target.value }))}
                    >
                      <option value="heureux">Heureux·se</option>
                      <option value="calme">Calme</option>
                      <option value="agite">Agité·e</option>
                      <option value="pleurs">Pleurs</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm">Note (optionnelle)</label>
                  <input
                    type="text"
                    className="block border rounded w-full px-2 py-1 bg-background"
                    value={form.note}
                    onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  />
                </div>
                <Button type="submit" className="w-full mt-2">
                  Enregistrer
                </Button>
              </form>
            )}

            <div className="w-full mt-4">
              {episodes.length === 0 ? (
                <div className="text-muted-foreground mt-2">Aucun épisode enregistré pour l’instant.</div>
              ) : (
                <table className="w-full border bg-background rounded text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-2 py-1 text-left">Date</th>
                      <th className="px-2 py-1 text-left">Heure</th>
                      <th className="px-2 py-1 text-left">Humeur</th>
                      <th className="px-2 py-1 text-left">Intensité</th>
                      <th className="px-2 py-1 text-left">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {episodes.slice(-10).reverse().map(ep => (
                      <tr key={ep.id} className="border-t hover:bg-accent">
                        <td className="px-2 py-1">{ep.date}</td>
                        <td className="px-2 py-1">{ep.heure}</td>
                        <td className="px-2 py-1 capitalize">{ep.humeur}</td>
                        <td className="px-2 py-1">{ep.intensite}</td>
                        <td className="px-2 py-1">{ep.note || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="stats">
        <div className="p-3">
          <h3 className="text-lg font-semibold mb-2">Statistiques</h3>
          <div className="text-muted-foreground">
            Visualisez à terme les tendances : fréquence des pleurs, évolution de l’humeur bébé, pics, corélations… 
          </div>
          <div className="rounded bg-muted mt-4 p-4 text-center">📊 Module stats & graphiques à venir prochainement !</div>
        </div>
      </TabsContent>
      
      <TabsContent value="conseils">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Conseils apaisement & gestion des pleurs</h3>
          <ul className="ml-6 list-disc text-muted-foreground">
            <li>Vérifier besoins de base : faim, change, sommeil, température.</li>
            <li>Bercer doucement, voix rassurante, contact peau à peau.</li>
            <li>Limiter sur-stimulation : ambiance calme, lumière tamisée.</li>
            <li>Ne surtout pas culpabiliser face aux pleurs — bébé s’exprime !</li>
            <li>Si pleurs inhabituels/persistants : consulter professionnel·le.</li>
          </ul>
        </div>
      </TabsContent>
      
      <TabsContent value="bienetre">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Bien-être parental</h3>
          <ul className="ml-6 list-disc text-muted-foreground">
            <li>Prenez soin de vous : sommeil, alimentation, moments de pause.</li>
            <li>Partagez la charge : relais partenaire, famille, proches.</li>
            <li>Isolement ? Rejoignez groupes de soutien, parlez-en santé pro.</li>
            <li>En cas d’épuisement ou de signes dépressifs, osez demander de l’aide !</li>
          </ul>
          <div className="rounded bg-secondary p-3 mt-2 text-center text-xs">💡 Ici : ressources & contacts utiles à venir.</div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
