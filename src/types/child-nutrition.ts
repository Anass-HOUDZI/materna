
export interface NutritionalNeeds {
  calories: number;
  proteins: number; // grammes
  carbohydrates: number; // grammes  
  lipids: number; // grammes
  fiber: number; // grammes
  calcium: number; // mg
  iron: number; // mg
  vitaminD: number; // μg
  vitaminC: number; // mg
  vitaminA: number; // μg
}

export interface ChildNutritionProfile {
  id: string;
  age: number;
  ageUnit: 'months' | 'years';
  weight: number; // kg
  height: number; // cm
  gender: 'boy' | 'girl';
  activityLevel: 'low' | 'moderate' | 'high';
  specialConditions: string[];
  createdAt: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'proteins' | 'carbohydrates' | 'lipids' | 'vegetables' | 'fruits' | 'dairy' | 'cereals';
  nutritionPer100g: {
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
  };
  typicalPortionChild: number; // grammes
  ageMinMonths: number;
}

export interface MealPlan {
  id: string;
  childProfileId: string;
  date: string;
  meals: {
    breakfast: FoodItem[];
    lunch: FoodItem[];
    snack: FoodItem[];
    dinner: FoodItem[];
  };
  totalNutrition: NutritionalNeeds;
  adherenceScore: number;
}

export interface NutritionAnalysis {
  needs: NutritionalNeeds;
  deficits: string[];
  excesses: string[];
  recommendations: string[];
  riskFactors: string[];
}
