
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useChildNutrition } from "@/hooks/useChildNutrition";
import { ChildNutritionProfile } from "@/types/child-nutrition";
import { FOOD_CATEGORIES } from "@/data/nutrition-data";
import { Calculator, TrendingUp, UtensilsCrossed, FileText, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChildNutritionCalculatorForm() {
  const {
    calculateNutritionalNeeds,
    analyzeNutrition,
    getRecommendedFoods,
    generateMealPlan,
    saveProfile,
  } = useChildNutrition();

  const [formData, setFormData] = useState({
    age: "",
    ageUnit: "years" as "months" | "years",
    weight: "",
    height: "",
    gender: "girl" as "boy" | "girl",
    activityLevel: "moderate" as "low" | "moderate" | "high",
  });

  const [activeTab, setActiveTab] = useState("calculator");
  const [nutritionResults, setNutritionResults] = useState<any>(null);
  const [mealPlan, setMealPlan] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: ChildNutritionProfile = {
      id: `profile-${Date.now()}`,
      age: Number(formData.age),
      ageUnit: formData.ageUnit,
      weight: Number(formData.weight),
      height: Number(formData.height),
      gender: formData.gender,
      activityLevel: formData.activityLevel,
      specialConditions: [],
      createdAt: Date.now(),
    };

    const needs = calculateNutritionalNeeds(profile);
    const analysis = analyzeNutrition(profile, {});
    const recommendedFoods = getRecommendedFoods(profile);
    const generatedMealPlan = generateMealPlan(profile);

    setNutritionResults({
      profile,
      needs,
      analysis,
      recommendedFoods,
    });
    setMealPlan(generatedMealPlan);
    saveProfile(profile);
    setActiveTab("results");
  };

  const isFormValid = useMemo(() => {
    return formData.age && formData.weight && formData.height &&
           Number(formData.age) > 0 && Number(formData.weight) > 0 && Number(formData.height) > 0;
  }, [formData]);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculateur</TabsTrigger>
          <TabsTrigger value="results" disabled={!nutritionResults}>Résultats</TabsTrigger>
          <TabsTrigger value="meal-plan" disabled={!mealPlan}>Menu Type</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <Card variant="outlined" size="md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calculator size={20} />
                Profil Nutritionnel de l'Enfant
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Âge</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={18}
                          value={formData.age}
                          onChange={e => setFormData(prev => ({ ...prev, age: e.target.value }))}
                          placeholder="3"
                          step="1"
                        />
                      </FormControl>
                      <select
                        value={formData.ageUnit}
                        className="px-3 py-2 border rounded bg-background text-sm min-w-[80px]"
                        onChange={e => setFormData(prev => ({ ...prev, ageUnit: e.target.value as any }))}
                      >
                        <option value="years">ans</option>
                        <option value="months">mois</option>
                      </select>
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Sexe</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={v => setFormData(prev => ({ ...prev, gender: v as any }))}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="girl" id="gender-girl" />
                          <label htmlFor="gender-girl" className="cursor-pointer">Fille</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="boy" id="gender-boy" />
                          <label htmlFor="gender-boy" className="cursor-pointer">Garçon</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Poids (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={2}
                        max={100}
                        step="0.1"
                        value={formData.weight}
                        onChange={e => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                        placeholder="14.2"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Taille (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={45}
                        max={200}
                        value={formData.height}
                        onChange={e => setFormData(prev => ({ ...prev, height: e.target.value }))}
                        placeholder="98"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="md:col-span-2">
                    <FormLabel>Niveau d'activité physique</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={formData.activityLevel}
                        onValueChange={v => setFormData(prev => ({ ...prev, activityLevel: v as any }))}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="activity-low" />
                          <label htmlFor="activity-low" className="cursor-pointer">Faible</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="moderate" id="activity-moderate" />
                          <label htmlFor="activity-moderate" className="cursor-pointer">Modéré</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="activity-high" />
                          <label htmlFor="activity-high" className="cursor-pointer">Élevé</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                </div>

                <Button type="submit" disabled={!isFormValid} className="w-full">
                  Calculer les besoins nutritionnels
                </Button>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {nutritionResults && (
            <>
              <Card variant="outlined" size="md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp size={20} />
                    Besoins Nutritionnels Quotidiens
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {nutritionResults.needs.calories}
                      </div>
                      <div className="text-sm text-blue-800 dark:text-blue-200">kcal/jour</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {nutritionResults.needs.proteins}g
                      </div>
                      <div className="text-sm text-red-800 dark:text-red-200">Protéines</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {nutritionResults.needs.carbohydrates}g
                      </div>
                      <div className="text-sm text-yellow-800 dark:text-yellow-200">Glucides</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {nutritionResults.needs.lipids}g
                      </div>
                      <div className="text-sm text-orange-800 dark:text-orange-200">Lipides</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="text-center p-2 border rounded">
                      <div className="font-semibold">{nutritionResults.needs.fiber}g</div>
                      <div className="text-xs text-muted-foreground">Fibres</div>
                    </div>
                    <div className="text-center p-2 border rounded">
                      <div className="font-semibold">{nutritionResults.needs.calcium}mg</div>
                      <div className="text-xs text-muted-foreground">Calcium</div>
                    </div>
                    <div className="text-center p-2 border rounded">
                      <div className="font-semibold">{nutritionResults.needs.iron}mg</div>
                      <div className="text-xs text-muted-foreground">Fer</div>
                    </div>
                    <div className="text-center p-2 border rounded">
                      <div className="font-semibold">{nutritionResults.needs.vitaminC}mg</div>
                      <div className="text-xs text-muted-foreground">Vitamine C</div>
                    </div>
                  </div>
                </div>
              </Card>

              {nutritionResults.analysis.recommendations.length > 0 && (
                <Card variant="outlined" size="md">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recommandations Nutritionnelles</h3>
                    <ul className="space-y-2">
                      {nutritionResults.analysis.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )}

              <Card variant="outlined" size="md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Aliments Recommandés</h3>
                  <div className="grid gap-4">
                    {Object.entries(
                      nutritionResults.recommendedFoods.reduce((acc: any, food: any) => {
                        if (!acc[food.category]) acc[food.category] = [];
                        acc[food.category].push(food);
                        return acc;
                      }, {})
                    ).map(([category, foods]: [string, any]) => (
                      <div key={category} className="space-y-2">
                        <Badge className={FOOD_CATEGORIES[category as keyof typeof FOOD_CATEGORIES].color}>
                          {FOOD_CATEGORIES[category as keyof typeof FOOD_CATEGORIES].label}
                        </Badge>
                        <div className="flex flex-wrap gap-2">
                          {foods.slice(0, 4).map((food: any) => (
                            <span 
                              key={food.id}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                            >
                              {food.name} ({food.typicalPortionChild}g)
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Ces recommandations sont indicatives et basées sur les références ANSES/OMS. 
                  Consultez un professionnel de santé pour un suivi personnalisé, 
                  notamment en cas d'allergies ou de conditions particulières.
                </AlertDescription>
              </Alert>
            </>
          )}
        </TabsContent>

        <TabsContent value="meal-plan" className="space-y-4">
          {mealPlan && nutritionResults && (
            <>
              <Card variant="outlined" size="md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <UtensilsCrossed size={20} />
                    Menu Type Journalier
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Suggestion de menu équilibré pour {nutritionResults.profile.age} {nutritionResults.profile.ageUnit === 'years' ? 'ans' : 'mois'}
                  </p>

                  <div className="space-y-6">
                    {Object.entries(mealPlan).map(([mealName, foods]: [string, any]) => (
                      <div key={mealName} className="space-y-3">
                        <h4 className="font-semibold text-base capitalize border-b pb-1">
                          {mealName === 'breakfast' ? 'Petit-déjeuner' :
                           mealName === 'lunch' ? 'Déjeuner' :
                           mealName === 'snack' ? 'Goûter' : 'Dîner'}
                        </h4>
                        
                        <div className="grid gap-2">
                          {foods.map((food: any) => (
                            <div key={food.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                              <div className="flex items-center gap-3">
                                <Badge 
                                  className={cn(
                                    "text-xs",
                                    FOOD_CATEGORIES[food.category as keyof typeof FOOD_CATEGORIES].color
                                  )}
                                >
                                  {FOOD_CATEGORIES[food.category as keyof typeof FOOD_CATEGORIES].label}
                                </Badge>
                                <span className="font-medium">{food.name}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {food.typicalPortionChild}g • {Math.round((food.nutritionPer100g.calories * food.typicalPortionChild) / 100)} kcal
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card variant="outlined" size="md">
                <div className="p-6">
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      const mealPlanText = Object.entries(mealPlan).map(([meal, foods]: [string, any]) => {
                        const mealTitle = meal === 'breakfast' ? 'Petit-déjeuner' :
                                         meal === 'lunch' ? 'Déjeuner' :
                                         meal === 'snack' ? 'Goûter' : 'Dîner';
                        const foodsList = foods.map((f: any) => `- ${f.name} (${f.typicalPortionChild}g)`).join('\n');
                        return `${mealTitle}:\n${foodsList}`;
                      }).join('\n\n');

                      const blob = new Blob([
                        `Menu Type pour ${nutritionResults.profile.age} ${nutritionResults.profile.ageUnit === 'years' ? 'ans' : 'mois'}\n\n${mealPlanText}\n\nBesoins nutritionnels:\n- Calories: ${nutritionResults.needs.calories} kcal\n- Protéines: ${nutritionResults.needs.proteins}g\n- Glucides: ${nutritionResults.needs.carbohydrates}g\n- Lipides: ${nutritionResults.needs.lipids}g`
                      ], { type: 'text/plain' });
                      
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `menu-nutritionnel-${nutritionResults.profile.age}${nutritionResults.profile.ageUnit}.txt`;
                      a.click();
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Télécharger le menu type
                  </Button>
                </div>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
