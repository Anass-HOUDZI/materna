
import { useState, useCallback, useMemo } from 'react';
import { FamilyProfile, BudgetSimulation, BudgetScenario } from '@/types/budget-simulator';
import { BUDGET_SCENARIOS, EXPENSE_CATEGORIES, REGIONS_DATA, GOVERNMENT_AID } from '@/data/budget-data';

export function useBudgetSimulator() {
  const [simulations, setSimulations] = useState<BudgetSimulation[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateBudget = useCallback((
    profile: FamilyProfile,
    scenario: BudgetScenario
  ): BudgetSimulation => {
    const regionData = REGIONS_DATA.find(r => r.id === profile.region) || REGIONS_DATA[0];
    
    // Calcul des catégories avec ajustements
    const calculatedCategories = EXPENSE_CATEGORIES.map(category => {
      let adjustedCost = category.yearTotal;
      
      // Ajustement selon le scénario
      adjustedCost *= scenario.multiplier;
      
      // Ajustement selon la région
      adjustedCost *= regionData.costMultiplier;
      
      // Ajustement spécifique mode de garde
      if (category.id === 'childcare') {
        switch (profile.childcareMode) {
          case 'family':
            adjustedCost = 0; // Garde familiale gratuite
            break;
          case 'daycare':
            adjustedCost = regionData.averageChildcareCost * 12;
            break;
          case 'nanny':
            adjustedCost = regionData.averageChildcareCost * 1.5 * 12;
            break;
          case 'home':
            adjustedCost = regionData.averageChildcareCost * 2 * 12;
            break;
        }
      }
      
      // Support familial réduit certains coûts
      if (profile.familySupport) {
        if (['equipment', 'clothing', 'toys'].includes(category.id)) {
          adjustedCost *= 0.7; // -30% si support familial
        }
      }
      
      return {
        ...category,
        yearTotal: Math.round(adjustedCost),
        monthlyMin: Math.round(adjustedCost / 12 * 0.8),
        monthlyMax: Math.round(adjustedCost / 12 * 1.2)
      };
    });
    
    const totalFirstYear = calculatedCategories.reduce((sum, cat) => sum + cat.yearTotal, 0);
    
    // Calcul des aides
    let governmentAid = GOVERNMENT_AID.primeNaissance;
    if (profile.childcareMode === 'nanny' || profile.childcareMode === 'home') {
      governmentAid += GOVERNMENT_AID.complementFamilia * 12;
    }
    if (profile.childcareMode === 'home') {
      const homecareCost = calculatedCategories.find(c => c.id === 'childcare')?.yearTotal || 0;
      governmentAid += homecareCost * GOVERNMENT_AID.creditImpot;
    }
    
    const netCost = totalFirstYear - governmentAid;
    
    return {
      id: Date.now().toString(),
      familyProfile: profile,
      scenario,
      categories: calculatedCategories,
      totalFirstYear,
      monthlyAverage: Math.round(totalFirstYear / 12),
      governmentAid: Math.round(governmentAid),
      netCost: Math.round(netCost),
      createdAt: Date.now()
    };
  }, []);

  const createSimulation = useCallback(async (
    profile: FamilyProfile,
    scenario: BudgetScenario
  ): Promise<BudgetSimulation> => {
    setLoading(true);
    
    try {
      // Simulation du temps de calcul pour UX réaliste
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const simulation = calculateBudget(profile, scenario);
      
      setSimulations(prev => [simulation, ...prev.slice(0, 9)]); // Garder 10 max
      
      return simulation;
    } finally {
      setLoading(false);
    }
  }, [calculateBudget]);

  const deleteSimulation = useCallback((id: string) => {
    setSimulations(prev => prev.filter(sim => sim.id !== id));
  }, []);

  const getOptimizationTips = useCallback((simulation: BudgetSimulation) => {
    const tips: string[] = [];
    
    if (simulation.familyProfile.childcareMode === 'home') {
      tips.push("Considérez une assistante maternelle pour réduire les coûts de garde de 40%");
    }
    
    if (!simulation.familyProfile.familySupport) {
      tips.push("Le support familial peut réduire vos coûts d'équipement de 30%");
    }
    
    if (simulation.scenario.id === 'premium') {
      tips.push("Le scénario standard vous ferait économiser " + 
        Math.round((simulation.totalFirstYear - simulation.totalFirstYear / 1.5)).toLocaleString() + "€");
    }
    
    const expensiveCategories = simulation.categories
      .filter(cat => cat.yearTotal > 2000)
      .map(cat => cat.name);
    
    if (expensiveCategories.length > 0) {
      tips.push(`Priorisez l'optimisation de : ${expensiveCategories.join(', ')}`);
    }
    
    return tips;
  }, []);

  return {
    simulations,
    loading,
    createSimulation,
    deleteSimulation,
    getOptimizationTips,
    scenarios: BUDGET_SCENARIOS,
    regions: REGIONS_DATA
  };
}
