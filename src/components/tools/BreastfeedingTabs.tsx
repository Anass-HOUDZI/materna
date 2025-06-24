
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function BreastfeedingTabs() {
  return (
    <Tabs defaultValue="problems" className="w-full">
      <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 bg-gradient-to-r from-blue-50/80 to-pink-50/80 p-2 rounded-2xl border border-white/40 shadow-md">
        <TabsTrigger 
          value="problems" 
          className="rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700"
        >
          Problèmes
        </TabsTrigger>
        <TabsTrigger 
          value="advice"
          className="rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700"
        >
          Conseils
        </TabsTrigger>
        <TabsTrigger 
          value="tracking"
          className="rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700"
        >
          Tracking
        </TabsTrigger>
        <TabsTrigger 
          value="community"
          className="rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700"
        >
          Communauté
        </TabsTrigger>
      </TabsList>

      <TabsContent value="problems" className="mt-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Diagnostic Rapide</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Sélectionnez un symptôme ou une difficulté courante pour obtenir conseils immédiats (ex : douleurs, crevasses, montée de lait difficile, etc.).
          </p>
          <div className="space-y-4">
            {[
              {
                problem: "Douleurs à la tétée",
                solution: "corriger la position du bébé, vérifier la prise du sein."
              },
              {
                problem: "Faible production",
                solution: "fréquence, alimentation, stress, stimulation."
              },
              {
                problem: "Bébé s'endort au sein",
                solution: "stimuler doucement, changer de côté, pauses."
              },
              {
                problem: "Crevasses",
                solution: "laver à l'eau claire, exposer à l'air, crème à la lanoline."
              },
              {
                problem: "Fièvre ou rougeur sein",
                solution: "surveiller mastite, consulter au moindre doute."
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-2xl border border-blue-200/30 shadow-sm">
                <span className="font-semibold text-slate-800">{item.problem} :</span>
                <span className="text-slate-600 ml-2">{item.solution}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="advice" className="mt-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Conseils Pratiques & Vidéos</h3>
          <ul className="space-y-4">
            {[
              "Adopter une position confortable",
              "Trouver le rythme de bébé : pas d'horaires fixes",
              "Règle d'or : allaitement à la demande, surveiller les besoins",
              "Bien s'hydrater, varier son alimentation",
              "Regarder sa série vidéo préférée pour se détendre !"
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-mint-50/60 to-emerald-50/60 rounded-xl border border-emerald-200/30">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">{tip}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-2xl border border-purple-200/40 text-center shadow-md">
            🎥 <span className="font-semibold text-slate-800">À venir : vidéos d'experts et tutoriels pas à pas.</span>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="tracking" className="mt-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Suivi Allaitement</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Saisissez ou visualisez vos tétées du jour, durée ou côté : graphique et export PDF à venir.
          </p>
          <div className="p-8 bg-gradient-to-r from-orange-50/80 to-yellow-50/80 rounded-2xl border border-orange-200/40 text-center shadow-md">
            <span className="text-slate-600">Module interactif bientôt disponible (tracking séance, durée…) — restez connectée !</span>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="community" className="mt-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Communauté & FAQ</h3>
          <ul className="space-y-4">
            {[
              "Vos questions/réponses de mamans — bientôt en ligne !",
              "Modératrices IBCLC, soutien 24/7",
              "Partagez astuces, réussites… ou petits moments \"galère\"",
              "(À venir : chat communautaire anonyme, support pair à pair.)"
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-rose-50/60 to-pink-50/60 rounded-xl border border-rose-200/30">
                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-slate-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
}
