
import { useState, useCallback, useMemo } from "react";
import { ChildNutritionProfile, NutritionalNeeds, NutritionAnalysis, FoodItem } from "@/types/child-nutrition";
import { NUTRITIONAL_REFERENCES, FOOD_DATABASE } from "@/data/nutrition-data";

export function useChildNutrition() {
  const [profiles, setProfiles] = useState<ChildNutritionProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateNutritionalNeeds = useCallback((profile: ChildNutritionProfile): NutritionalNeeds => {
    const ageMonths = profile.ageUnit === 'years' ? profile.age * 12 : profile.age;
    
    // Trouver la tranche d'âge la plus proche
    const ageKeys = Object.keys(NUTRITIONAL_REFERENCES.calories.boys).map(Number).sort((a, b) => a - b);
    const closestAge = ageKeys.reduce((prev, curr) => 
      Math.abs(curr - ageMonths) < Math.abs(prev - ageMonths) ? curr : prev
    );

    // Calories de base
    const baseCalories = profile.gender === 'boy' 
      ? NUTRITIONAL_REFERENCES.calories.boys[closestAge as keyof typeof NUTRITIONAL_REFERENCES.calories.boys]
      : NUTRITIONAL_REFERENCES.calories.girls[closestAge as keyof typeof NUTRITIONAL_REFERENCES.calories.girls];

    // Ajustement selon l'activité
    const activityMultiplier = {
      low: 0.9,
      moderate: 1.0,
      high: 1.2,
    };

    const calories = Math.round(baseCalories * activityMultiplier[profile.activityLevel]);

    // Protéines
    const proteins = profile.gender === 'boy'
      ? NUTRITIONAL_REFERENCES.proteins.boys[closestAge as keyof typeof NUTRITIONAL_REFERENCES.proteins.boys]
      : NUTRITIONAL_REFERENCES.proteins.girls[closestAge as keyof typeof NUTRITIONAL_REFERENCES.proteins.girls];

    // Macronutriments
    const lipids = Math.round((calories * 0.35) / 9); // 35% des calories en lipides
    const carbohydrates = Math.round((calories * 0.55) / 4); // 55% des calories en glucides

    // Micronutriments
    const fiber = profile.gender === 'boy'
      ? NUTRITIONAL_REFERENCES.fiber.boys[closestAge as keyof typeof NUTRITIONAL_REFERENCES.fiber.boys]
      : NUTRITIONAL_REFERENCES.fiber.girls[closestAge as keyof typeof NUTRITIONAL_REFERENCES.fiber.girls];

    const calcium = NUTRITIONAL_REFERENCES.calcium[closestAge as keyof typeof NUTRITIONAL_REFERENCES.calcium] || 600;
    const iron = NUTRITIONAL_REFERENCES.iron[closestAge as keyof typeof NUTRITIONAL_REFERENCES.iron] || 8;
    const vitaminD = NUTRITIONAL_REFERENCES.vitaminD.all;
    const vitaminC = NUTRITIONAL_REFERENCES.vitaminC[closestAge as keyof typeof NUTRITIONAL_REFERENCES.vitaminC] || 30;
    const vitaminA = NUTRITIONAL_REFERENCES.vitaminA[closestAge as keyof typeof NUTRITIONAL_REFERENCES.vitaminA] || 350;

    return {
      calories,
      proteins,
      carbohydrates,
      lipids,
      fiber,
      calcium,
      iron,
      vitaminD,
      vitaminC,
      vitaminA,
    };
  }, []);

  const analyzeNutrition = useCallback((
    profile: ChildNutritionProfile,
    currentIntake: Partial<NutritionalNeeds>
  ): NutritionAnalysis => {
    const needs = calculateNutritionalNeeds(profile);
    const deficits: string[] = [];
    const excesses: string[] = [];
    const recommendations: string[] = [];
    const riskFactors: string[] = [];

    // Analyse des déficits (< 80% des besoins)
    Object.entries(needs).forEach(([nutrient, need]) => {
      const intake = currentIntake[nutrient as keyof NutritionalNeeds] || 0;
      const ratio = intake / need;

      if (ratio < 0.8) {
        deficits.push(`${nutrient}: ${Math.round((1 - ratio) * 100)}% en dessous des besoins`);
      } else if (ratio > 1.3) {
        excesses.push(`${nutrient}: ${Math.round((ratio - 1) * 100)}% au-dessus des besoins`);
      }
    });

    // Recommandations spécifiques
    if (deficits.some(d => d.includes('proteins'))) {
      recommendations.push("Augmentez les sources de protéines : œufs, poisson, légumineuses");
    }
    if (deficits.some(d => d.includes('calcium'))) {
      recommendations.push("Privilégiez les produits laitiers adaptés à l'âge");
    }
    if (deficits.some(d => d.includes('iron'))) {
      recommendations.push("Incluez plus de viandes maigres ou légumineuses");
      recommendations.push("Associez vitamine C pour améliorer l'absorption du fer");
    }
    if (deficits.some(d => d.includes('fiber'))) {
      recommendations.push("Augmentez les légumes et fruits dans l'alimentation");
    }

    // Facteurs de risque
    if (profile.specialConditions.includes('allergies')) {
      riskFactors.push("Surveillez les apports en nutriments des aliments évités");
    }
    if (profile.activityLevel === 'low') {
      riskFactors.push("Activité physique faible : surveillez les apports caloriques");
    }

    return {
      needs,
      deficits,
      excesses,
      recommendations,
      riskFactors,
    };
  }, [calculateNutritionalNeeds]);

  const getRecommendedFoods = useCallback((
    profile: ChildNutritionProfile,
    deficientNutrients: string[] = []
  ): FoodItem[] => {
    const ageMonths = profile.ageUnit === 'years' ? profile.age * 12 : profile.age;
    
    // Filtrer par âge
    let foods = FOOD_DATABASE.filter(food => food.ageMinMonths <= ageMonths);

    // Si déficits spécifiques, prioriser les aliments riches en ces nutriments
    if (deficientNutrients.length > 0) {
      foods = foods.sort((a, b) => {
        let scoreA = 0, scoreB = 0;
        
        deficientNutrients.forEach(nutrient => {
          if (nutrient.includes('calcium')) {
            scoreA += a.nutritionPer100g.calcium;
            scoreB += b.nutritionPer100g.calcium;
          }
          if (nutrient.includes('iron')) {
            scoreA += a.nutritionPer100g.iron * 10;
            scoreB += b.nutritionPer100g.iron * 10;
          }
          if (nutrient.includes('proteins')) {
            scoreA += a.nutritionPer100g.proteins * 5;
            scoreB += b.nutritionPer100g.proteins * 5;
          }
        });
        
        return scoreB - scoreA;
      });
    }

    return foods.slice(0, 12); // Top 12 recommandations
  }, []);

  const generateMealPlan = useCallback((
    profile: ChildNutritionProfile,
    preferences: string[] = []
  ) => {
    const needs = calculateNutritionalNeeds(profile);
    const ageMonths = profile.ageUnit === 'years' ? profile.age * 12 : profile.age;
    
    const availableFoods = FOOD_DATABASE.filter(food => 
      food.ageMinMonths <= ageMonths &&
      !preferences.some(pref => food.name.toLowerCase().includes(pref.toLowerCase()))
    );

    // Répartition calorique par repas
    const calorieDistribution = {
      breakfast: 0.25,
      lunch: 0.35,
      snack: 0.15,
      dinner: 0.25,
    };

    const mealPlan = {
      breakfast: [] as FoodItem[],
      lunch: [] as FoodItem[],
      snack: [] as FoodItem[],
      dinner: [] as FoodItem[],
    };

    // Sélection simplifiée d'aliments par repas
    Object.entries(calorieDistribution).forEach(([meal, ratio]) => {
      const targetCalories = needs.calories * ratio;
      let currentCalories = 0;
      const mealFoods: FoodItem[] = [];

      // Sélection aléatoire d'aliments jusqu'à atteindre les calories cibles
      const shuffledFoods = [...availableFoods].sort(() => Math.random() - 0.5);
      
      for (const food of shuffledFoods) {
        if (currentCalories >= targetCalories || mealFoods.length >= 4) break;
        
        const portionCalories = (food.nutritionPer100g.calories * food.typicalPortionChild) / 100;
        if (currentCalories + portionCalories <= targetCalories * 1.2) {
          mealFoods.push(food);
          currentCalories += portionCalories;
        }
      }

      mealPlan[meal as keyof typeof mealPlan] = mealFoods;
    });

    return mealPlan;
  }, [calculateNutritionalNeeds]);

  const saveProfile = useCallback((profile: ChildNutritionProfile) => {
    setProfiles(prev => [profile, ...prev.filter(p => p.id !== profile.id)]);
  }, []);

  return {
    profiles,
    loading,
    calculateNutritionalNeeds,
    analyzeNutrition,
    getRecommendedFoods,
    generateMealPlan,
    saveProfile,
  };
}
