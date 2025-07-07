
import { useState, useCallback, useMemo } from "react";
import { DiversificationProfile, WeeklyPlan, FoodItem } from "@/types/food-diversification";
import { FOODS_DATABASE, MAJOR_ALLERGENS, getDiversificationCalendar } from "@/data/diversification-data";

export function useFoodDiversification() {
  const [profile, setProfile] = useState<DiversificationProfile | null>(null);
  const [weeklyPlans, setWeeklyPlans] = useState<WeeklyPlan[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateCurrentAge = useCallback((birthDate: string): number => {
    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = now.getTime() - birth.getTime();
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44);
    return Math.max(0, Math.round(diffMonths * 10) / 10);
  }, []);

  const getWeeksSinceDiversification = useCallback((startDate: string): number => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = now.getTime() - start.getTime();
    const diffWeeks = diffTime / (1000 * 60 * 60 * 24 * 7);
    return Math.max(0, Math.floor(diffWeeks));
  }, []);

  const getAppropriteFoods = useCallback((ageMonths: number, introducedFoods: string[] = []): FoodItem[] => {
    return FOODS_DATABASE.filter(food => 
      food.introductionAge <= ageMonths && 
      (!food.maxAge || ageMonths <= food.maxAge) &&
      !introducedFoods.includes(food.id)
    );
  }, []);

  const checkAllergenRisk = useCallback((foodId: string, familyHistory: boolean): { risk: string; recommendations: string[] } => {
    const food = FOODS_DATABASE.find(f => f.id === foodId);
    if (!food) return { risk: 'unknown', recommendations: [] };

    const recommendations: string[] = [];
    let maxRisk = 'low';

    food.allergens.forEach(allergen => {
      const allergenInfo = MAJOR_ALLERGENS.find(a => a.name === allergen);
      if (allergenInfo) {
        if (allergenInfo.riskLevel === 'high') maxRisk = 'high';
        else if (allergenInfo.riskLevel === 'medium' && maxRisk !== 'high') maxRisk = 'medium';
        
        recommendations.push(...allergenInfo.precautions);
        
        if (familyHistory && allergenInfo.riskLevel === 'high') {
          recommendations.push("Consultation pédiatrique recommandée avant introduction");
        }
      }
    });

    return { risk: maxRisk, recommendations: [...new Set(recommendations)] };
  }, []);

  const generateWeeklyPlan = useCallback((
    currentProfile: DiversificationProfile,
    weekNumber: number
  ): WeeklyPlan => {
    const currentAge = calculateCurrentAge(currentProfile.birthDate);
    const appropriateFoods = getAppropriteFoods(currentAge, currentProfile.currentFoods);
    
    // Sélectionner 1-2 nouveaux aliments selon l'âge et la semaine
    const newFoodsCount = currentAge < 6 ? 1 : weekNumber < 4 ? 1 : 2;
    const newFoods = appropriateFoods
      .sort(() => Math.random() - 0.5)
      .slice(0, newFoodsCount)
      .map(f => f.id);

    const objectives: string[] = [];
    const tips: string[] = [];
    const warnings: string[] = [];

    // Objectifs selon l'âge
    if (currentAge < 5) {
      objectives.push("Découverte de nouvelles saveurs");
      objectives.push("Habituationtexture lisse");
      tips.push("Introduire un aliment à la fois");
      tips.push("Respecter la règle des 3 jours");
    } else if (currentAge < 7) {
      objectives.push("Introduction des protéines");
      objectives.push("Diversification des textures");
      tips.push("Surveiller les signes allergiques");
      tips.push("Commencer par de petites quantités");
    } else {
      objectives.push("Développement autonomie alimentaire");
      objectives.push("Exploration textures variées");
      tips.push("Encourager la préhension");
      tips.push("Varier les modes de cuisson");
    }

    // Vérifications allergènes
    newFoods.forEach(foodId => {
      const { risk, recommendations } = checkAllergenRisk(foodId, currentProfile.allergicHistory.family);
      if (risk === 'high') {
        warnings.push(`Attention: ${FOODS_DATABASE.find(f => f.id === foodId)?.name} contient des allergènes majeurs`);
        warnings.push(...recommendations);
      }
    });

    // Menu simple pour la semaine
    const baseMenu = {
      lundi: { lunch: [...currentProfile.currentFoods.slice(0, 2)] },
      mardi: { lunch: [...currentProfile.currentFoods.slice(0, 2)] },
      mercredi: { lunch: [...currentProfile.currentFoods.slice(0, 2), ...(newFoods.slice(0, 1))] },
      jeudi: { lunch: [...currentProfile.currentFoods.slice(0, 2), ...(newFoods.slice(0, 1))] },
      vendredi: { lunch: [...currentProfile.currentFoods.slice(0, 2), ...(newFoods.slice(0, 1))] },
      samedi: { lunch: [...currentProfile.currentFoods.slice(0, 3)] },
      dimanche: { lunch: [...currentProfile.currentFoods.slice(0, 3)] }
    };

    return {
      id: `plan-${currentProfile.id}-${weekNumber}`,
      profileId: currentProfile.id,
      weekNumber,
      ageMonths: currentAge,
      newFoodsToIntroduce: newFoods,
      dailyMenus: baseMenu,
      objectives,
      tips,
      warnings
    };
  }, [calculateCurrentAge, getAppropriteFoods, checkAllergenRisk]);

  const addFoodReaction = useCallback((foodId: string, reaction: 'accepted' | 'refused' | 'allergic' | 'digestive', notes?: string) => {
    if (!profile) return;

    const newReaction = {
      foodId,
      reaction,
      date: new Date().toISOString().split('T')[0],
      notes
    };

    const updatedProfile = {
      ...profile,
      reactions: [...profile.reactions, newReaction]
    };

    // Si accepté, ajouter aux aliments introduits
    if (reaction === 'accepted') {
      updatedProfile.currentFoods = [...new Set([...profile.currentFoods, foodId])];
    }

    setProfile(updatedProfile);
  }, [profile]);

  const getCurrentRecommendations = useCallback((): string[] => {
    if (!profile) return [];

    const currentAge = calculateCurrentAge(profile.birthDate);
    const recommendations: string[] = [];

    if (currentAge < 4) {
      recommendations.push("Allaitement exclusif ou lait infantile recommandé");
      recommendations.push("Attendre 4 mois révolus pour débuter");
    } else if (currentAge < 6) {
      recommendations.push("Introduction progressive des légumes et fruits");
      recommendations.push("Textures très lisses uniquement");
      recommendations.push("Un aliment nouveau tous les 3 jours");
    } else if (currentAge < 8) {
      recommendations.push("Introduction des protéines (viande, poisson, œuf)");
      recommendations.push("Début de diversification des textures");
      recommendations.push("Surveiller les réactions allergiques");
    } else {
      recommendations.push("Développement de l'autonomie alimentaire");
      recommendations.push("Introduction progressive des morceaux");
      recommendations.push("Encourager la découverte tactile");
    }

    // Recommandations spécifiques selon historique familial
    if (profile.allergicHistory.family) {
      recommendations.push("Consultation pédiatrique avant allergènes majeurs");
      recommendations.push("Introduction très progressive des allergènes");
    }

    return recommendations;
  }, [profile, calculateCurrentAge]);

  const getProgressReport = useCallback(() => {
    if (!profile) return null;

    const currentAge = calculateCurrentAge(profile.birthDate);
    const weeksSince = getWeeksSinceDiversification(profile.startDate);
    const introducedCount = profile.currentFoods.length;
    const availableFoods = getAppropriteFoods(currentAge);
    const progressPercentage = Math.min(100, (introducedCount / Math.max(1, availableFoods.length)) * 100);

    const acceptedFoods = profile.reactions.filter(r => r.reaction === 'accepted').length;
    const refusedFoods = profile.reactions.filter(r => r.reaction === 'refused').length;
    const allergicReactions = profile.reactions.filter(r => r.reaction === 'allergic').length;

    return {
      currentAge,
      weeksSinceDiversification: weeksSince,
      foodsIntroduced: introducedCount,
      progressPercentage: Math.round(progressPercentage),
      reactions: {
        accepted: acceptedFoods,
        refused: refusedFoods,
        allergic: allergicReactions
      },
      nextRecommendations: getCurrentRecommendations(),
      nextFoodsToTry: availableFoods.slice(0, 5).map(f => f.name)
    };
  }, [profile, calculateCurrentAge, getWeeksSinceDiversification, getAppropriteFoods, getCurrentRecommendations]);

  const exportDiversificationReport = useCallback(() => {
    if (!profile) return null;

    const report = {
      profile: {
        babyName: profile.babyName,
        currentAge: calculateCurrentAge(profile.birthDate),
        diversificationStart: profile.startDate,
        feedingMode: profile.feedingMode
      },
      progress: getProgressReport(),
      introducedFoods: profile.currentFoods.map(foodId => {
        const food = FOODS_DATABASE.find(f => f.id === foodId);
        return {
          name: food?.name,
          category: food?.category,
          introductionAge: food?.introductionAge
        };
      }),
      reactions: profile.reactions,
      recommendations: getCurrentRecommendations(),
      reportDate: new Date().toISOString()
    };

    return JSON.stringify(report, null, 2);
  }, [profile, calculateCurrentAge, getProgressReport, getCurrentRecommendations]);

  return {
    profile,
    weeklyPlans,
    loading,
    setProfile,
    setLoading,
    calculateCurrentAge,
    getAppropriteFoods,
    generateWeeklyPlan,
    addFoodReaction,
    getCurrentRecommendations,
    getProgressReport,
    exportDiversificationReport,
    checkAllergenRisk,
    foodsDatabase: FOODS_DATABASE,
    majorAllergens: MAJOR_ALLERGENS
  };
}
