
import { FoodItem, AllergenInfo, Recipe } from "@/types/food-diversification";

export const MAJOR_ALLERGENS: AllergenInfo[] = [
  {
    name: "Œuf",
    riskLevel: "high",
    introductionAge: 4,
    symptoms: ["Urticaire", "Vomissements", "Diarrhée", "Eczéma"],
    precautions: ["Commencer par le jaune cuit", "Surveiller 3 jours", "Éviter œuf cru"]
  },
  {
    name: "Lait de vache",
    riskLevel: "high", 
    introductionAge: 4,
    symptoms: ["Régurgitations", "Diarrhée", "Eczéma", "Coliques"],
    precautions: ["Yaourt nature d'abord", "Petites quantités", "Éviter si APLV"]
  },
  {
    name: "Gluten",
    riskLevel: "medium",
    introductionAge: 4,
    symptoms: ["Diarrhée chronique", "Ballonnements", "Retard croissance"],
    precautions: ["Introduction progressive", "Continuer l'allaitement", "Surveiller selles"]
  },
  {
    name: "Arachide",
    riskLevel: "high",
    introductionAge: 4,
    symptoms: ["Choc anaphylactique", "Urticaire", "Œdème", "Difficultés respiratoires"],
    precautions: ["Beurre de cacahuète dilué", "Très petite quantité", "Surveillance médicale si risque"]
  },
  {
    name: "Fruits à coque",
    riskLevel: "high",
    introductionAge: 6,
    symptoms: ["Œdème buccal", "Urticaire", "Difficultés respiratoires"],
    precautions: ["Poudres/purées d'abord", "Éviter entiers (étouffement)", "Un à la fois"]
  },
  {
    name: "Poisson",
    riskLevel: "medium",
    introductionAge: 4,
    symptoms: ["Urticaire", "Vomissements", "Diarrhée"],
    precautions: ["Bien cuit", "Débuter par poissons blancs", "Attention arêtes"]
  },
  {
    name: "Crustacés",
    riskLevel: "high",
    introductionAge: 12,
    symptoms: ["Choc anaphylactique", "Urticaire généralisée", "Œdème"],
    precautions: ["Éviter avant 1 an", "Introduction très progressive", "Surveillance médicale"]
  },
  {
    name: "Soja",
    riskLevel: "medium",
    introductionAge: 6,
    symptoms: ["Troubles digestifs", "Eczéma"],
    precautions: ["Éviter si APLV", "Produits fermentés d'abord", "Modération"]
  }
];

export const FOODS_DATABASE: FoodItem[] = [
  // LÉGUMES
  {
    id: "carotte",
    name: "Carotte",
    category: "legumes",
    subcategory: "orange",
    introductionAge: 4,
    allergens: [],
    benefits: ["Beta-carotène", "Fibres", "Goût sucré apprécié"],
    preparations: [
      { age: 4, texture: "lisse", description: "Purée très lisse à l'eau", portionSize: "2-3 cuillères" },
      { age: 6, texture: "moulinee", description: "Purée avec petits morceaux", portionSize: "4-6 cuillères" },
      { age: 8, texture: "ecrasee", description: "Écrasée à la fourchette", portionSize: "60-80g" },
      { age: 10, texture: "morceaux", description: "Petits dés cuits fondants", portionSize: "80-100g" },
      { age: 12, texture: "doigts", description: "Bâtonnets cuits pour la main", portionSize: "100g" }
    ],
    seasonality: ["septembre", "octobre", "novembre", "décembre", "janvier", "février"],
    nutritionalValue: {
      vitamins: ["A", "K", "C"],
      minerals: ["Potassium"],
      fiber: true,
      protein: false
    }
  },
  {
    id: "courgette",
    name: "Courgette",
    category: "legumes",
    subcategory: "verte",
    introductionAge: 4,
    allergens: [],
    benefits: ["Hydratation", "Fibres douces", "Goût neutre"],
    preparations: [
      { age: 4, texture: "lisse", description: "Purée sans peau ni pépins", portionSize: "2-3 cuillères" },
      { age: 6, texture: "moulinee", description: "Purée avec peau mixée", portionSize: "4-6 cuillères" },
      { age: 8, texture: "ecrasee", description: "Écrasée grossièrement", portionSize: "60-80g" },
      { age: 10, texture: "morceaux", description: "Dés fondants", portionSize: "80-100g" },
      { age: 12, texture: "doigts", description: "Bâtonnets grillés", portionSize: "100g" }
    ],
    seasonality: ["juin", "juillet", "août", "septembre"],
    nutritionalValue: {
      vitamins: ["C", "B9"],
      minerals: ["Potassium", "Magnésium"],
      fiber: true,
      protein: false
    }
  },
  {
    id: "petits-pois",
    name: "Petits pois",
    category: "legumes",
    subcategory: "verte",
    introductionAge: 5,
    allergens: [],
    benefits: ["Protéines végétales", "Fibres", "Vitamines B"],
    preparations: [
      { age: 5, texture: "lisse", description: "Purée très fine (retirer peaux)", portionSize: "2-3 cuillères" },
      { age: 7, texture: "moulinee", description: "Purée moins fine", portionSize: "4-6 cuillères" },
      { age: 9, texture: "ecrasee", description: "Écrasés grossièrement", portionSize: "60-80g" },
      { age: 11, texture: "morceaux", description: "Entiers bien cuits", portionSize: "80-100g" }
    ],
    seasonality: ["mai", "juin", "juillet"],
    nutritionalValue: {
      vitamins: ["C", "B1", "B9", "K"],
      minerals: ["Fer", "Magnésium", "Phosphore"],
      fiber: true,
      protein: true
    }
  },

  // FRUITS
  {
    id: "pomme",
    name: "Pomme",
    category: "fruits",
    subcategory: "pepins",
    introductionAge: 4,
    allergens: [],
    benefits: ["Pectine", "Fibres solubles", "Goût sucré"],
    preparations: [
      { age: 4, texture: "lisse", description: "Compote sans sucre très lisse", portionSize: "2-3 cuillères" },
      { age: 6, texture: "moulinee", description: "Compote avec morceaux", portionSize: "4-6 cuillères" },
      { age: 8, texture: "ecrasee", description: "Pomme cuite écrasée", portionSize: "60-80g" },
      { age: 10, texture: "morceaux", description: "Quartiers cuits fondants", portionSize: "80-100g" },
      { age: 12, texture: "doigts", description: "Quartiers crus pelés", portionSize: "1/2 pomme" }
    ],
    precautions: ["Toujours peler au début", "Retirer pépins"],
    nutritionalValue: {
      vitamins: ["C"],
      minerals: ["Potassium"],
      fiber: true,
      protein: false
    }
  },
  {
    id: "banane",
    name: "Banane",
    category: "fruits",
    subcategory: "exotique",
    introductionAge: 4,
    allergens: [],
    benefits: ["Potassium", "Sucres naturels", "Texture crémeuse"],
    preparations: [
      { age: 4, texture: "lisse", description: "Écrasée très fine", portionSize: "2-3 cuillères" },
      { age: 6, texture: "moulinee", description: "Écrasée grossièrement", portionSize: "1/3 banane" },
      { age: 8, texture: "morceaux", description: "Petits morceaux mous", portionSize: "1/2 banane" },
      { age: 10, texture: "doigts", description: "Rondelles pour la main", portionSize: "1/2 banane" }
    ],
    precautions: ["Choisir bien mûre", "Éviter si constipation"],
    nutritionalValue: {
      vitamins: ["B6", "C"],
      minerals: ["Potassium", "Magnésium"],
      fiber: true,
      protein: false
    }
  },

  // PROTÉINES
  {
    id: "poulet",
    name: "Poulet",
    category: "proteines",
    subcategory: "viande-blanche",
    introductionAge: 6,
    allergens: [],
    benefits: ["Protéines complètes", "Fer", "Zinc"],
    preparations: [
      { age: 6, texture: "lisse", description: "Mixé finement avec bouillon", portionSize: "10g (2 cuillères)" },
      { age: 8, texture: "moulinee", description: "Émietté finement", portionSize: "15g" },
      { age: 10, texture: "morceaux", description: "Petits morceaux fondants", portionSize: "20g" },
      { age: 12, texture: "doigts", description: "Lamelles pour la main", portionSize: "25-30g" }
    ],
    precautions: ["Bien cuit", "Retirer peau et gras", "Pas de poulet frit"],
    nutritionalValue: {
      vitamins: ["B3", "B6", "B12"],
      minerals: ["Fer", "Zinc", "Phosphore"],
      fiber: false,
      protein: true
    }
  },
  {
    id: "saumon",
    name: "Saumon",
    category: "proteines",
    subcategory: "poisson-gras",
    introductionAge: 6,
    allergens: ["Poisson"],
    benefits: ["Oméga-3", "Protéines", "Vitamine D"],
    preparations: [
      { age: 6, texture: "lisse", description: "Mixé finement, bien cuit", portionSize: "10g" },
      { age: 8, texture: "moulinee", description: "Émietté sans arêtes", portionSize: "15g" },
      { age: 10, texture: "morceaux", description: "Morceaux sans arêtes", portionSize: "20g" },
      { age: 12, texture: "doigts", description: "Lamelles cuites", portionSize: "25g" }
    ],
    precautions: ["Vérifier absence d'arêtes", "Bien cuit", "Fraîcheur importante"],
    nutritionalValue: {
      vitamins: ["D", "B12", "B6"],
      minerals: ["Iode", "Sélénium"],
      fiber: false,
      protein: true
    }
  },

  // CÉRÉALES
  {
    id: "riz",
    name: "Riz",
    category: "cereales",
    introductionAge: 4,
    allergens: [],
    benefits: ["Énergie", "Sans gluten", "Facile à digérer"],
    preparations: [
      { age: 4, texture: "lisse", description: "Bouilie de riz très liquide", portionSize: "2-3 cuillères" },
      { age: 6, texture: "moulinee", description: "Riz bien cuit mixé", portionSize: "4-6 cuillères" },
      { age: 8, texture: "ecrasee", description: "Riz bien cuit écrasé", portionSize: "60g" },
      { age: 10, texture: "morceaux", description: "Grains de riz cuits", portionSize: "80g" }
    ],
    nutritionalValue: {
      vitamins: ["B1", "B3"],
      minerals: ["Magnésium"],
      fiber: false,
      protein: true
    }
  },

  // LAITAGES
  {
    id: "yaourt-nature",
    name: "Yaourt nature",
    category: "laitages",
    introductionAge: 6,
    allergens: ["Lait de vache"],
    benefits: ["Probiotiques", "Calcium", "Protéines"],
    preparations: [
      { age: 6, texture: "lisse", description: "Nature sans sucre", portionSize: "2-3 cuillères" },
      { age: 8, texture: "lisse", description: "Mélangé avec fruits", portionSize: "1/2 pot" },
      { age: 10, texture: "lisse", description: "Nature ou avec compote", portionSize: "1 pot" }
    ],
    precautions: ["Sans sucre ajouté", "Surveiller réactions", "Pas avant 6 mois"],
    nutritionalValue: {
      vitamins: ["B2", "B12"],
      minerals: ["Calcium", "Phosphore"],
      fiber: false,
      protein: true
    }
  }
];

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: "puree-carotte-courgette",
    name: "Purée carotte-courgette",
    ageMin: 4,
    difficulty: "facile",
    prepTime: 10,
    cookTime: 20,
    portions: 4,
    ingredients: [
      { foodId: "carotte", quantity: "2 moyennes", preparation: "pelées et coupées" },
      { foodId: "courgette", quantity: "1/2", preparation: "lavée et coupée" }
    ],
    steps: [
      "Couper les légumes en petits morceaux",
      "Cuire à la vapeur 15-20 minutes jusqu'à tendreté",
      "Mixer finement avec un peu d'eau de cuisson",
      "Ajuster la texture selon l'âge de bébé"
    ],
    texture: "lisse",
    storage: {
      fridge: 2,
      freezer: 3
    },
    tips: [
      "Commencer par des textures très lisses",
      "Goûter pour vérifier qu'il n'y a pas de morceaux",
      "Réchauffer à température tiède avant service"
    ],
    variations: [
      "Ajouter un peu de pomme de terre pour la texture",
      "Incorporer une pincée de cumin après 8 mois"
    ],
    nutritionalBenefits: [
      "Riche en bêta-carotène",
      "Apport en fibres douces",
      "Bonne source d'hydratation"
    ]
  },
  {
    id: "compote-pomme-banane",
    name: "Compote pomme-banane",
    ageMin: 4,
    difficulty: "facile",
    prepTime: 5,
    cookTime: 15,
    portions: 3,
    ingredients: [
      { foodId: "pomme", quantity: "2", preparation: "pelées et coupées" },
      { foodId: "banane", quantity: "1", preparation: "épluchée" }
    ],
    steps: [
      "Couper les pommes en morceaux",
      "Cuire les pommes à la vapeur 10-15 minutes",
      "Ajouter la banane coupée en rondelles",
      "Cuire 2-3 minutes supplémentaires",
      "Mixer selon la texture souhaitée"
    ],
    texture: "lisse",
    storage: {
      fridge: 3,
      freezer: 6
    },
    tips: [
      "Pas besoin de sucre, les fruits sont naturellement sucrés",
      "La banane apporte la douceur et la texture crémeuse",
      "Servir à température ambiante ou légèrement tiède"
    ],
    variations: [
      "Ajouter un soupçon de vanille après 8 mois",
      "Incorporer des flocons d'avoine après 6 mois"
    ],
    nutritionalBenefits: [
      "Apport en vitamines C",
      "Potassium de la banane",
      "Fibres solubles des pommes"
    ]
  }
];

export const getDiversificationCalendar = (startAge: number) => {
  const calendar = [];
  
  // 4-6 mois : Premiers légumes et fruits
  if (startAge <= 4) {
    calendar.push({
      age: 4,
      title: "Premiers légumes",
      foods: ["carotte", "courgette", "panais", "potiron"],
      notes: "Un légume à la fois, 3 jours de suite pour tester"
    });
    
    calendar.push({
      age: 4.5,
      title: "Premiers fruits",
      foods: ["pomme", "poire", "banane"],
      notes: "En compote sans sucre, texture très lisse"
    });
  }
  
  // 5-6 mois : Diversification des légumes
  if (startAge <= 5) {
    calendar.push({
      age: 5,
      title: "Nouveaux légumes",
      foods: ["petits-pois", "haricots-verts", "brocoli"],
      notes: "Toujours bien mixés, un nouveau tous les 3 jours"
    });
  }
  
  // 6 mois : Introduction protéines
  calendar.push({
    age: 6,
    title: "Premières protéines",
    foods: ["poulet", "saumon", "yaourt-nature"],
    notes: "10g de viande/poisson par jour, surveiller allergies"
  });
  
  return calendar;
};
