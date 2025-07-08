
export interface ChildNutritionProfile {
  id: string;
  age: number;
  ageUnit: "months" | "years";
  weight: number;
  height: number;
  gender: "boy" | "girl";
  activityLevel: "low" | "moderate" | "high";
  specialConditions: string[];
  createdAt: number;
}

export interface NutritionalNeeds {
  calories: number;
  proteins: number;
  carbohydrates: number;
  lipids: number;
  fiber: number;
  calcium: number;
  iron: number;
  vitaminD: number;
  vitaminC: number;
  vitaminA: number;
}

export interface NutritionAnalysis {
  needs: NutritionalNeeds;
  deficits: string[];
  excesses: string[];
  recommendations: string[];
  riskFactors: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  nutritionPer100g: NutritionalNeeds;
  typicalPortionChild: number;
  ageMinMonths: number;
}
