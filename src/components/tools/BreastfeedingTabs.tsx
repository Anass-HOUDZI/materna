
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function BreastfeedingTabs() {
  return (
    <Tabs defaultValue="problems" className="w-full">
      <TabsList className="w-full flex justify-around gap-2 mb-4 bg-muted">
        <TabsTrigger value="problems" className="flex-1">
          Problèmes
        </TabsTrigger>
        <TabsTrigger value="advice" className="flex-1">
          Conseils
        </TabsTrigger>
        <TabsTrigger value="tracking" className="flex-1">
          Tracking
        </TabsTrigger>
        <TabsTrigger value="community" className="flex-1">
          Communauté
        </TabsTrigger>
      </TabsList>

      <TabsContent value="problems">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Diagnostic Rapide</h3>
          <p>Sélectionnez un symptôme ou une difficulté courante pour obtenir conseils immédiats (ex : douleurs, crevasses, montée de lait difficile, etc.).</p>
          <ul className="list-disc ml-5 text-muted-foreground">
            <li>Douleurs à la tétée&nbsp;: <span className="text-foreground">corriger la position du bébé, vérifier la prise du sein.</span></li>
            <li>Faible production&nbsp;: <span className="text-foreground">fréquence, alimentation, stress, stimulation.</span></li>
            <li>Bébé s’endort au sein&nbsp;: <span className="text-foreground">stimuler doucement, changer de côté, pauses.</span></li>
            <li>Crevasses&nbsp;: <span className="text-foreground">laver à l’eau claire, exposer à l’air, crème à la lanoline.</span></li>
            <li>Fièvre ou rougeur sein&nbsp;: <span className="text-foreground">surveiller mastite, consulter au moindre doute.</span></li>
          </ul>
        </div>
      </TabsContent>
      
      <TabsContent value="advice">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Conseils Pratiques & Vidéos</h3>
          <ul className="ml-6 list-disc text-muted-foreground">
            <li>Adopter une position confortable</li>
            <li>Trouver le rythme de bébé&nbsp;: pas d’horaires fixes</li>
            <li>Règle d’or&nbsp;: allaitement à la demande, surveiller les besoins</li>
            <li>Bien s’hydrater, varier son alimentation</li>
            <li>Regarder sa série vidéo préférée pour se détendre&nbsp;!</li>
          </ul>
          <div className="rounded bg-secondary p-3 mt-2 text-center">🎥 <span className="font-medium">À venir&nbsp;: vidéos d’experts et tutoriels pas à pas.</span></div>
        </div>
      </TabsContent>
      
      <TabsContent value="tracking">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Suivi Allaitement</h3>
          <p>Saisissez ou visualisez vos tétées du jour, durée ou côté&nbsp;: graphique et export PDF à venir.</p>
          <div className="rounded bg-muted p-4 text-muted-foreground">Module interactif bientôt disponible (tracking séance, durée…) — restez connectée !</div>
        </div>
      </TabsContent>
      
      <TabsContent value="community">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Communauté & FAQ</h3>
          <ul className="ml-6 list-disc text-muted-foreground">
            <li>Vos questions/réponses de mamans — bientôt en ligne&nbsp;!</li>
            <li>Modératrices IBCLC, soutien 24/7</li>
            <li>Partagez astuces, réussites… ou petits moments “galère”</li>
            <li>
              <span className="text-xs">(À venir : chat communautaire anonyme, support pair à pair.)</span>
            </li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
}
