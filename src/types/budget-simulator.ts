
export interface FamilyProfile {
  id?: string;
  parentIncome: number;
  region: string;
  childcareMode: 'family' | 'daycare' | 'nanny' | 'home';
  housing: 'apartment' | 'house';
  familySupport: boolean;
  createdAt?: number;
}

export interface BudgetScenario {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  preferences: {
    secondHand: boolean;
    organic: boolean;
    premium: boolean;
    minimal: boolean;
  };
}

export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  monthlyMin: number;
  monthlyMax: number;
  yearTotal: number;
  description: string;
  items: ExpenseItem[];
}

export interface ExpenseItem {
  name: string;
  cost: number;
  frequency: 'monthly' | 'yearly' | 'once';
  optional: boolean;
}

export interface BudgetSimulation {
  id: string;
  familyProfile: FamilyProfile;
  scenario: BudgetScenario;
  categories: ExpenseCategory[];
  totalFirstYear: number;
  monthlyAverage: number;
  governmentAid: number;
  netCost: number;
  createdAt: number;
}

export interface RegionData {
  id: string;
  name: string;
  costMultiplier: number;
  averageChildcareCost: number;
  averageRent: number;
}
