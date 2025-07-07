
import { FoodItem, NutritionalNeeds } from "@/types/child-nutrition";

export const FOOD_DATABASE: FoodItem[] = [
  // Protéines
  {
    id: "egg",
    name: "Œuf entier",
    category: "proteins",
    nutritionPer100g: {
      calories: 155,
      proteins: 13,
      carbohydrates: 1,
      lipids: 11,
      fiber: 0,
      calcium: 50,
      iron: 1.2,
      vitaminD: 1.75,
      vitaminC: 0,
      vitaminA: 140,
    },
    typicalPortionChild: 50,
    ageMinMonths: 6,
  },
  {
    id: "chicken",
    name: "Blanc de poulet",
    category: "proteins", 
    nutritionPer100g: {
      calories: 165,
      proteins: 31,
      carbohydrates: 0,
      lipids: 3.6,
      fiber: 0,
      calcium: 15,
      iron: 1,
      vitaminD: 0.1,
      vitaminC: 0,
      vitaminA: 9,
    },
    typicalPortionChild: 40,
    ageMinMonths: 6,
  },
  {
    id: "fish",
    name: "Saumon",
    category: "proteins",
    nutritionPer100g: {
      calories: 208,
      proteins: 25,
      carbohydrates: 0,
      lipids: 12,
      fiber: 0,
      calcium: 9,
      iron: 0.34,
      vitaminD: 11,
      vitaminC: 0,
      vitaminA: 12,
    },
    typicalPortionChild: 35,
    ageMinMonths: 8,
  },
  {
    id: "lentils",
    name: "Lentilles cuites",
    category: "proteins",
    nutritionPer100g: {
      calories: 116,
      proteins: 9,
      carbohydrates: 20,
      lipids: 0.4,
      fiber: 8,
      calcium: 19,
      iron: 3.3,
      vitaminD: 0,
      vitaminC: 1.5,
      vitaminA: 8,
    },
    typicalPortionChild: 60,
    ageMinMonths: 8,
  },

  // Glucides
  {
    id: "rice",
    name: "Riz blanc cuit",
    category: "carbohydrates",
    nutritionPer100g: {
      calories: 130,
      proteins: 2.7,
      carbohydrates: 28,
      lipids: 0.3,
      fiber: 0.4,
      calcium: 10,
      iron: 0.8,
      vitaminD: 0,
      vitaminC: 0,
      vitaminA: 0,
    },
    typicalPortionChild: 80,
    ageMinMonths: 6,
  },
  {
    id: "pasta",
    name: "Pâtes cuites",
    category: "carbohydrates",
    nutritionPer100g: {
      calories: 131,
      proteins: 5,
      carbohydrates: 25,
      lipids: 1.1,
      fiber: 1.8,
      calcium: 7,
      iron: 0.9,
      vitaminD: 0,
      vitaminC: 0,
      vitaminA: 0,
    },
    typicalPortionChild: 85,
    ageMinMonths: 8,
  },
  {
    id: "bread",
    name: "Pain complet",
    category: "carbohydrates",
    nutritionPer100g: {
      calories: 247,
      proteins: 8,
      carbohydrates: 41,
      lipids: 4.2,
      fiber: 7,
      calcium: 54,
      iron: 2.5,
      vitaminD: 0,
      vitaminC: 0,
      vitaminA: 0,
    },
    typicalPortionChild: 25,
    ageMinMonths: 10,
  },
  {
    id: "potato",
    name: "Pomme de terre",
    category: "carbohydrates",
    nutritionPer100g: {
      calories: 77,
      proteins: 2,
      carbohydrates: 17,
      lipids: 0.1,
      fiber: 2.2,
      calcium: 12,
      iron: 0.8,
      vitaminD: 0,
      vitaminC: 20,
      vitaminA: 0,
    },
    typicalPortionChild: 100,
    ageMinMonths: 6,
  },

  // Légumes
  {
    id: "carrot",
    name: "Carotte cuite",
    category: "vegetables",
    nutritionPer100g: {
      calories: 35,
      proteins: 0.8,
      carbohydrates: 8,
      lipids: 0.2,
      fiber: 2.8,
      calcium: 30,
      iron: 0.3,
      vitaminD: 0,
      vitaminC: 5,
      vitaminA: 835,
    },
    typicalPortionChild: 60,
    ageMinMonths: 4,
  },
  {
    id: "broccoli",
    name: "Brocoli cuit",
    category: "vegetables",
    nutritionPer100g: {
      calories: 23,
      proteins: 2.3,
      carbohydrates: 4,
      lipids: 0.4,
      fiber: 3,
      calcium: 40,
      iron: 0.7,
      vitaminD: 0,
      vitaminC: 65,
      vitaminA: 77,
    },
    typicalPortionChild: 50,
    ageMinMonths: 6,
  },
  {
    id: "spinach",
    name: "Épinards cuits",
    category: "vegetables",
    nutritionPer100g: {
      calories: 23,
      proteins: 2.9,
      carbohydrates: 3.6,
      lipids: 0.4,
      fiber: 2.2,
      calcium: 136,
      iron: 3.6,
      vitaminD: 0,
      vitaminC: 9.8,
      vitaminA: 469,
    },
    typicalPortionChild: 40,
    ageMinMonths: 6,
  },

  // Fruits
  {
    id: "apple",
    name: "Pomme",
    category: "fruits",
    nutritionPer100g: {
      calories: 52,
      proteins: 0.3,
      carbohydrates: 14,
      lipids: 0.2,
      fiber: 2.4,
      calcium: 6,
      iron: 0.1,
      vitaminD: 0,
      vitaminC: 5,
      vitaminA: 3,
    },
    typicalPortionChild: 100,
    ageMinMonths: 6,
  },
  {
    id: "banana",
    name: "Banane",
    category: "fruits",
    nutritionPer100g: {
      calories: 89,
      proteins: 1.1,
      carbohydrates: 23,
      lipids: 0.3,
      fiber: 2.6,
      calcium: 5,
      iron: 0.3,
      vitaminD: 0,
      vitaminC: 9,
      vitaminA: 3,
    },
    typicalPortionChild: 80,
    ageMinMonths: 6,
  },
  {
    id: "orange",
    name: "Orange",
    category: "fruits",
    nutritionPer100g: {
      calories: 47,
      proteins: 0.9,
      carbohydrates: 12,
      lipids: 0.1,
      fiber: 2.4,
      calcium: 40,
      iron: 0.1,
      vitaminD: 0,
      vitaminC: 53,
      vitaminA: 11,
    },
    typicalPortionChild: 100,
    ageMinMonths: 10,
  },

  // Produits laitiers
  {
    id: "milk",
    name: "Lait entier",
    category: "dairy",
    nutritionPer100g: {
      calories: 61,
      proteins: 3.2,
      carbohydrates: 4.8,
      lipids: 3.2,
      fiber: 0,
      calcium: 113,
      iron: 0.03,
      vitaminD: 0.03,
      vitaminC: 0,
      vitaminA: 28,
    },
    typicalPortionChild: 150,
    ageMinMonths: 12,
  },
  {
    id: "yogurt",
    name: "Yaourt nature",
    category: "dairy",
    nutritionPer100g: {
      calories: 61,
      proteins: 5,
      carbohydrates: 4,
      lipids: 3.3,
      fiber: 0,
      calcium: 183,
      iron: 0.1,
      vitaminD: 0.04,
      vitaminC: 1,
      vitaminA: 27,
    },
    typicalPortionChild: 125,
    ageMinMonths: 6,
  },
  {
    id: "cheese",
    name: "Fromage râpé",
    category: "dairy",
    nutritionPer100g: {
      calories: 393,
      proteins: 35,
      carbohydrates: 4,
      lipids: 26,
      fiber: 0,
      calcium: 853,
      iron: 0.7,
      vitaminD: 0.5,
      vitaminC: 0,
      vitaminA: 330,
    },
    typicalPortionChild: 20,
    ageMinMonths: 8,
  },
];

// Besoins nutritionnels par âge et sexe (sources ANSES/OMS)
export const NUTRITIONAL_REFERENCES = {
  // Besoins en calories par jour
  calories: {
    boys: {
      6: 650, 9: 750, 12: 900, 18: 1100, 24: 1300, 36: 1500, 48: 1700, 60: 1900,
    },
    girls: {
      6: 600, 9: 700, 12: 850, 18: 1050, 24: 1250, 36: 1450, 48: 1650, 60: 1850,
    },
  },
  // Protéines (g/jour)
  proteins: {
    boys: {
      6: 12, 9: 14, 12: 16, 18: 18, 24: 20, 36: 22, 48: 24, 60: 26,
    },
    girls: {
      6: 11, 9: 13, 12: 15, 18: 17, 24: 19, 36: 21, 48: 23, 60: 25,
    },
  },
  // Lipides (% des calories totales)
  lipidsPercent: { min: 30, max: 40 },
  // Glucides (% des calories totales)
  carbohydratesPercent: { min: 45, max: 65 },
  // Fibres (g/jour)
  fiber: {
    boys: {
      6: 8, 9: 10, 12: 12, 18: 14, 24: 16, 36: 18, 48: 20, 60: 22,
    },
    girls: {
      6: 8, 9: 10, 12: 12, 18: 14, 24: 16, 36: 18, 48: 20, 60: 22,
    },
  },
  // Calcium (mg/jour)
  calcium: {
    6: 400, 12: 500, 24: 600, 36: 700, 48: 800, 60: 900,
  },
  // Fer (mg/jour)
  iron: {
    6: 7, 12: 8, 24: 9, 36: 10, 48: 10, 60: 11,
  },
  // Vitamine D (μg/jour)
  vitaminD: { all: 10 },
  // Vitamine C (mg/jour)
  vitaminC: {
    6: 20, 12: 25, 24: 30, 36: 35, 48: 40, 60: 45,
  },
  // Vitamine A (μg/jour)
  vitaminA: {
    6: 250, 12: 300, 24: 350, 36: 400, 48: 450, 60: 500,
  },
};

export const FOOD_CATEGORIES = {
  proteins: {
    label: "Protéines",
    color: "bg-red-100 text-red-800",
    description: "Viandes, poissons, œufs, légumineuses",
  },
  carbohydrates: {
    label: "Glucides", 
    color: "bg-yellow-100 text-yellow-800",
    description: "Céréales, pain, pâtes, pommes de terre",
  },
  lipids: {
    label: "Lipides",
    color: "bg-orange-100 text-orange-800", 
    description: "Huiles, beurre, poissons gras, noix",
  },
  vegetables: {
    label: "Légumes",
    color: "bg-green-100 text-green-800",
    description: "Légumes frais, cuits ou crus",
  },
  fruits: {
    label: "Fruits",
    color: "bg-pink-100 text-pink-800",
    description: "Fruits frais, compotes sans sucre ajouté",
  },
  dairy: {
    label: "Produits laitiers",
    color: "bg-blue-100 text-blue-800",
    description: "Lait, yaourts, fromages adaptés",
  },
  cereals: {
    label: "Céréales",
    color: "bg-purple-100 text-purple-800",
    description: "Céréales complètes de préférence",
  },
};
