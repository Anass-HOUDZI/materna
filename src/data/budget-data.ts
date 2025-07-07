
import { BudgetScenario, ExpenseCategory, RegionData } from '@/types/budget-simulator';

export const BUDGET_SCENARIOS: BudgetScenario[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Équilibre entre qualité et prix pour un confort normal',
    multiplier: 1.0,
    preferences: {
      secondHand: false,
      organic: false,
      premium: false,
      minimal: false
    }
  },
  {
    id: 'minimal',
    name: 'Minimaliste',
    description: 'Strict essentiel pour optimiser les coûts (-30%)',
    multiplier: 0.7,
    preferences: {
      secondHand: true,
      organic: false,
      premium: false,
      minimal: true
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Produits haut de gamme sans limite de budget',
    multiplier: 1.5,
    preferences: {
      secondHand: false,
      organic: true,
      premium: true,
      minimal: false
    }
  },
  {
    id: 'eco',
    name: 'Écologique',
    description: 'Produits durables, bio et respectueux de l\'environnement',
    multiplier: 1.2,
    preferences: {
      secondHand: true,
      organic: true,
      premium: false,
      minimal: false
    }
  }
];

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    id: 'health',
    name: 'Santé',
    icon: '🏥',
    monthlyMin: 80,
    monthlyMax: 150,
    yearTotal: 1200,
    description: 'Consultations, pharmacie, mutuelle bébé',
    items: [
      { name: 'Pédiatre consultations', cost: 300, frequency: 'yearly', optional: false },
      { name: 'Vaccinations', cost: 200, frequency: 'yearly', optional: false },
      { name: 'Pharmacie courante', cost: 50, frequency: 'monthly', optional: false },
      { name: 'Mutuelle bébé', cost: 30, frequency: 'monthly', optional: false }
    ]
  },
  {
    id: 'food',
    name: 'Alimentation',
    icon: '🍼',
    monthlyMin: 120,
    monthlyMax: 250,
    yearTotal: 1800,
    description: 'Lait, diversification, équipement repas',
    items: [
      { name: 'Lait infantile', cost: 80, frequency: 'monthly', optional: false },
      { name: 'Petits pots/purées', cost: 60, frequency: 'monthly', optional: false },
      { name: 'Équipement repas', cost: 150, frequency: 'once', optional: false },
      { name: 'Chaise haute', cost: 200, frequency: 'once', optional: false }
    ]
  },
  {
    id: 'hygiene',
    name: 'Hygiène',
    icon: '🧴',
    monthlyMin: 100,
    monthlyMax: 180,
    yearTotal: 1500,
    description: 'Couches, soins, produits d\'hygiène',
    items: [
      { name: 'Couches', cost: 70, frequency: 'monthly', optional: false },
      { name: 'Lingettes/coton', cost: 20, frequency: 'monthly', optional: false },
      { name: 'Produits de soin', cost: 25, frequency: 'monthly', optional: false },
      { name: 'Table à langer', cost: 150, frequency: 'once', optional: false }
    ]
  },
  {
    id: 'clothing',
    name: 'Vêtements',
    icon: '👶',
    monthlyMin: 80,
    monthlyMax: 200,
    yearTotal: 1200,
    description: 'Garde-robe évolutive par saison',
    items: [
      { name: 'Bodies/grenouillères', cost: 150, frequency: 'yearly', optional: false },
      { name: 'Vêtements saison', cost: 200, frequency: 'yearly', optional: false },
      { name: 'Chaussures/chaussons', cost: 80, frequency: 'yearly', optional: false },
      { name: 'Manteau/combinaison', cost: 100, frequency: 'yearly', optional: false }
    ]
  },
  {
    id: 'childcare',
    name: 'Mode de garde',
    icon: '🏠',
    monthlyMin: 200,
    monthlyMax: 1200,
    yearTotal: 6000,
    description: 'Crèche, assistante maternelle ou garde à domicile',
    items: [
      { name: 'Crèche publique', cost: 400, frequency: 'monthly', optional: true },
      { name: 'Assistante maternelle', cost: 600, frequency: 'monthly', optional: true },
      { name: 'Garde à domicile', cost: 1200, frequency: 'monthly', optional: true },
      { name: 'Frais d\'adaptation', cost: 200, frequency: 'once', optional: false }
    ]
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: '🚗',
    monthlyMin: 50,
    monthlyMax: 150,
    yearTotal: 800,
    description: 'Siège auto, poussette, équipement voyage',
    items: [
      { name: 'Siège auto groupe 0+', cost: 200, frequency: 'once', optional: false },
      { name: 'Poussette', cost: 400, frequency: 'once', optional: false },
      { name: 'Porte-bébé', cost: 100, frequency: 'once', optional: true },
      { name: 'Sac à langer', cost: 80, frequency: 'once', optional: false }
    ]
  },
  {
    id: 'equipment',
    name: 'Équipement',
    icon: '🛏️',
    monthlyMin: 100,
    monthlyMax: 300,
    yearTotal: 2000,
    description: 'Lit, mobilier, équipement sécurité',
    items: [
      { name: 'Lit bébé + matelas', cost: 400, frequency: 'once', optional: false },
      { name: 'Commode/plan à langer', cost: 300, frequency: 'once', optional: false },
      { name: 'Baignoire bébé', cost: 50, frequency: 'once', optional: false },
      { name: 'Monitor bébé', cost: 150, frequency: 'once', optional: true }
    ]
  },
  {
    id: 'toys',
    name: 'Jouets & Éveil',
    icon: '🧸',
    monthlyMin: 30,
    monthlyMax: 100,
    yearTotal: 600,
    description: 'Jouets d\'éveil et développement',
    items: [
      { name: 'Jouets 0-6 mois', cost: 100, frequency: 'once', optional: false },
      { name: 'Jouets 6-12 mois', cost: 150, frequency: 'once', optional: false },
      { name: 'Livres bébé', cost: 50, frequency: 'yearly', optional: false },
      { name: 'Tapis d\'éveil', cost: 80, frequency: 'once', optional: false }
    ]
  }
];

export const REGIONS_DATA: RegionData[] = [
  {
    id: 'ile-de-france',
    name: 'Île-de-France',
    costMultiplier: 1.3,
    averageChildcareCost: 800,
    averageRent: 1200
  },
  {
    id: 'provence-alpes-cote-azur',
    name: 'Provence-Alpes-Côte d\'Azur',
    costMultiplier: 1.15,
    averageChildcareCost: 650,
    averageRent: 900
  },
  {
    id: 'auvergne-rhone-alpes',
    name: 'Auvergne-Rhône-Alpes',
    costMultiplier: 1.1,
    averageChildcareCost: 600,
    averageRent: 800
  },
  {
    id: 'nouvelle-aquitaine',
    name: 'Nouvelle-Aquitaine',
    costMultiplier: 0.95,
    averageChildcareCost: 550,
    averageRent: 700
  },
  {
    id: 'occitanie',
    name: 'Occitanie',
    costMultiplier: 0.9,
    averageChildcareCost: 500,
    averageRent: 650
  },
  {
    id: 'hauts-de-france',
    name: 'Hauts-de-France',
    costMultiplier: 0.85,
    averageChildcareCost: 480,
    averageRent: 600
  }
];

export const GOVERNMENT_AID = {
  allocationFamiliale: 0, // Pas d'allocation pour 1 enfant
  complementFamilia: 171.74, // CMG si garde
  primeNaissance: 944.51, // Prime à la naissance CAF
  allocationRentree: 0, // Pas avant 6 ans
  creditImpot: 0.5 // 50% crédit d'impôt garde domicile
};
