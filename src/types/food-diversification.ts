
export interface AllergenInfo {
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  introductionAge: number; // mois
  symptoms: string[];
  precautions: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'fruits' | 'legumes' | 'cereales' | 'proteines' | 'laitages' | 'matieres-grasses';
  subcategory?: string;
  introductionAge: number; // mois minimum
  maxAge?: number; // si restriction âge max
  allergens: string[];
  benefits: string[];
  preparations: {
    age: number;
    texture: 'lisse' | 'moulinee' | 'ecrasee' | 'morceaux' | 'doigts';
    description: string;
    portionSize: string;
  }[];
  precautions?: string[];
  seasonality?: string[]; // mois de saison
  nutritionalValue: {
    vitamins: string[];
    minerals: string[];
    fiber: boolean;
    protein: boolean;
  };
}

export interface DiversificationProfile {
  id: string;
  babyName: string;
  birthDate: string;
  startDate: string; // date début diversification
  feedingMode: 'traditional' | 'dme' | 'mixed'; // DME = Diversification Menée par l'Enfant
  allergicHistory: {
    family: boolean;
    knownAllergies: string[];
    atopyHistory: boolean;
  };
  preferences: {
    organic: boolean;
    homemade: boolean;
    cultural: string;
  };
  currentFoods: string[]; // IDs des aliments déjà introduits
  reactions: {
    foodId: string;
    reaction: 'accepted' | 'refused' | 'allergic' | 'digestive';
    date: string;
    notes?: string;
  }[];
  createdAt: number;
}

export interface WeeklyPlan {
  id: string;
  profileId: string;
  weekNumber: number; // semaine depuis début diversification
  ageMonths: number;
  newFoodsToIntroduce: string[];
  dailyMenus: {
    [day: string]: {
      breakfast?: string[];
      lunch?: string[];
      snack?: string[];
      dinner?: string[];
    };
  };
  objectives: string[];
  tips: string[];
  warnings: string[];
}

export interface Recipe {
  id: string;
  name: string;
  ageMin: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  prepTime: number; // minutes
  cookTime: number; // minutes
  portions: number;
  ingredients: {
    foodId: string;
    quantity: string;
    preparation?: string;
  }[];
  steps: string[];
  texture: 'lisse' | 'moulinee' | 'ecrasee' | 'morceaux';
  storage: {
    fridge: number; // jours
    freezer: number; // mois
  };
  tips: string[];
  variations: string[];
  nutritionalBenefits: string[];
}
